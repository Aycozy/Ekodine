"""
clean_data.py

Transforms a flat, messy legacy export (one row per order line item, with
customer + product info repeated/inconsistent on every row) into three
normalized tables ready for Airtable import:

    customers.csv   - one row per unique customer
    products.csv    - one row per unique product/SKU
    orders.csv      - one row per order line item, referencing customers.csv
                      and products.csv by a stable key (used to build linked
                      records in Airtable after import)

Run:
    python clean_data.py sample-messy-data.csv

Design notes (the part that matters more than the code):
- Every cleaning decision here is a judgment call a real migration requires
  explicit rules for - each one is commented so they're auditable/reviewable
  by the client rather than silently baked in.
- This script produces the *inputs* to the Airtable base described in
  airtable-schema.md. Linked records and rollups are configured in Airtable
  itself after import (see that file) - this script only needs to get the
  data into a clean, de-duplicated, three-table shape with matching keys.
"""

import csv
import re
import sys
from collections import OrderedDict


def normalize_whitespace(s: str) -> str:
    return re.sub(r"\s+", " ", s or "").strip()


def normalize_email(s: str) -> str:
    return normalize_whitespace(s).lower()


def parse_money(s: str) -> float:
    """Strip $ signs, commas, stray whitespace. Return float."""
    cleaned = re.sub(r"[^\d.]", "", s or "")
    return float(cleaned) if cleaned else 0.0


def parse_date(s: str) -> str:
    """
    Normalize inconsistent date formats (1/5/2024, 01/06/2024, 2024-01-08,
    1/9/24) to ISO 8601 (YYYY-MM-DD), which Airtable's date field expects
    for reliable import and sorting.
    """
    s = normalize_whitespace(s)
    for fmt_parts in ["-", "/"]:
        if fmt_parts in s:
            parts = s.split(fmt_parts)
            if len(parts) == 3:
                if len(parts[0]) == 4:  # already YYYY-MM-DD
                    y, m, d = parts
                else:  # M/D/YYYY or M/D/YY
                    m, d, y = parts
                    if len(y) == 2:
                        y = "20" + y  # assumption: all 2-digit years are 2000s
                return f"{int(y):04d}-{int(m):02d}-{int(d):02d}"
    return s  # fallback: leave as-is and flag for manual review


def split_company_and_name(raw_customer: str):
    """
    Handles the 'Acme Corp / Mary Johnson' pattern - a company name and a
    contact name jammed into one field. Rule: if a '/' is present, treat the
    left side as Company and right side as the contact Name. This is a
    judgment call worth confirming with the client on a real project rather
    than assuming silently.
    """
    raw_customer = normalize_whitespace(raw_customer)
    if "/" in raw_customer:
        company, name = [p.strip() for p in raw_customer.split("/", 1)]
        return name, company
    return raw_customer, ""


def make_customer_key(name: str, email: str) -> str:
    """
    Matching key for de-duplicating customers across rows.
    Rule: prefer email (case-insensitive) as the identity key since it's
    more reliable than name matching (handles 'jane doe' vs 'Jane Doe').
    Falls back to normalized name only when email is missing entirely -
    flagged in the output so these can be manually verified/merged, since
    name-only matching risks false positives (two different "John Smith"s).
    """
    email = normalize_email(email)
    if email:
        return f"email:{email}"
    return f"name:{normalize_whitespace(name).lower()}"


def main(input_path: str):
    customers = OrderedDict()   # key -> dict
    products = OrderedDict()    # sku -> dict
    order_lines = []
    review_flags = []

    with open(input_path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        seen_line_signatures = set()

        for row_num, row in enumerate(reader, start=2):  # header is row 1
            order_id = normalize_whitespace(row["Order ID"])
            raw_customer = row["Customer"]
            email = row.get("customer email", "")
            product_name = normalize_whitespace(row["Product"])
            sku = normalize_whitespace(row["product sku"]).upper()
            # Normalize inconsistent SKU formatting: "sku-101" / "SKU102" -> "SKU-102"
            sku = re.sub(r"^SKU-?", "SKU-", sku) if sku else sku
            qty_raw = normalize_whitespace(row["Qty"])
            unit_price = parse_money(row["Unit Price"])
            order_date = parse_date(row["Order Date"])
            status = normalize_whitespace(row["Status"]).capitalize()

            # --- Exact-duplicate row detection ---
            # Rule: if order_id + sku + qty + price + date are all identical
            # to a row already seen, treat as a double-export artifact and skip it.
            signature = (order_id, sku, qty_raw, unit_price, order_date)
            if signature in seen_line_signatures:
                review_flags.append(f"Row {row_num}: skipped exact duplicate of an earlier row (order {order_id}, {sku})")
                continue
            seen_line_signatures.add(signature)

            # --- Missing quantity ---
            # Rule: don't silently default to 0 or 1 - flag for human review.
            # A wrong assumption here directly corrupts revenue rollups.
            if not qty_raw:
                review_flags.append(f"Row {row_num}: missing Qty on order {order_id} ({sku}) - defaulted to 1, NEEDS MANUAL VERIFICATION")
                qty = 1
            else:
                qty = int(float(qty_raw))

            # --- Missing customer name ---
            if not normalize_whitespace(raw_customer):
                review_flags.append(f"Row {row_num}: missing customer name on order {order_id} - using email as placeholder name, NEEDS MANUAL VERIFICATION")
                raw_customer = email or "UNKNOWN"

            name, company = split_company_and_name(raw_customer)
            customer_key = make_customer_key(name, email)

            if not normalize_email(email):
                review_flags.append(f"Row {row_num}: no email on file for '{name}' (order {order_id}) - matched by name only, verify this isn't a different person with the same name")

            # --- Upsert customer ---
            if customer_key not in customers:
                customers[customer_key] = {
                    "customer_key": customer_key,
                    "name": normalize_whitespace(name),
                    "email": normalize_email(email),
                    "company": company,
                }
            else:
                # Fill in gaps if a later row has info an earlier row lacked
                existing = customers[customer_key]
                if not existing["email"] and normalize_email(email):
                    existing["email"] = normalize_email(email)
                if not existing["company"] and company:
                    existing["company"] = company

            # --- Upsert product ---
            if sku not in products:
                products[sku] = {"sku": sku, "name": product_name, "unit_price": unit_price}
            else:
                if products[sku]["unit_price"] != unit_price:
                    review_flags.append(
                        f"Row {row_num}: price mismatch for {sku} - saw {unit_price}, "
                        f"already recorded {products[sku]['unit_price']}. Using first-seen price; verify which is current."
                    )

            # --- Order line item ---
            order_lines.append({
                "order_id": order_id,
                "customer_key": customer_key,
                "sku": sku,
                "qty": qty,
                "order_date": order_date,
                "status": status,
                "line_total": round(qty * unit_price, 2),
            })

    # --- Write outputs ---
    with open("customers.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["customer_key", "name", "email", "company"])
        w.writeheader()
        w.writerows(customers.values())

    with open("products.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["sku", "name", "unit_price"])
        w.writeheader()
        w.writerows(products.values())

    with open("orders.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["order_id", "customer_key", "sku", "qty", "order_date", "status", "line_total"])
        w.writeheader()
        w.writerows(order_lines)

    with open("review-flags.txt", "w", encoding="utf-8") as f:
        f.write("Items below need a human decision before/after Airtable import:\n\n")
        f.write("\n".join(review_flags) if review_flags else "No flags.")

    print(f"Done. {len(customers)} customers, {len(products)} products, {len(order_lines)} order lines.")
    print(f"{len(review_flags)} rows flagged for manual review - see review-flags.txt")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "sample-messy-data.csv")
