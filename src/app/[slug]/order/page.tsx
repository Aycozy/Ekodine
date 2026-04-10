"use client";

import { useState } from "react";
import { ArrowLeft, CreditCard, Banknote, CheckCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function OrderPage({ params }: { params: { slug: string } }) {
  const [step, setStep] = useState<"checkout" | "confirmed">("checkout");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "counter">("card");
  const [tableNumber, setTableNumber] = useState("");
  const [note, setNote] = useState("");

  // Demo cart items
  const cartItems = [
    { name: "Jollof Rice & Chicken", quantity: 2, price: 18.5 },
    { name: "Abacha (African Salad)", quantity: 1, price: 12.0 },
    { name: "Zobo Drink", quantity: 2, price: 11.0 },
  ];
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (step === "confirmed") {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl border shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-stone-900">Order Confirmed!</h1>
          <p className="text-stone-500 mt-2">Your order has been placed successfully</p>
          <div className="bg-stone-50 rounded-xl p-4 mt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Order Number</span>
              <span className="font-bold text-stone-900">#ORD-{Math.floor(Math.random() * 900 + 100)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Estimated Time</span>
              <span className="font-medium text-stone-900">15-25 minutes</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Total</span>
              <span className="font-bold text-stone-900">${total.toFixed(2)}</span>
            </div>
          </div>
          <Link
            href={`/${params.slug}/menu`}
            className="block w-full mt-6 py-3 bg-primary hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors"
          >
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link href={`/${params.slug}/menu`} className="p-2 rounded-xl hover:bg-stone-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-stone-600" />
          </Link>
          <h1 className="font-heading font-bold text-lg">Checkout</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">
        {/* Cart Summary */}
        <div className="bg-white rounded-xl border p-6">
          <h2 className="font-semibold text-stone-900 mb-4">Order Summary</h2>
          <div className="space-y-3">
            {cartItems.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-stone-600">
                  {item.name} <span className="text-stone-400">×{item.quantity}</span>
                </span>
                <span className="font-medium text-stone-900">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-3 flex justify-between font-bold text-stone-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Table Number */}
        <div className="bg-white rounded-xl border p-6">
          <h2 className="font-semibold text-stone-900 mb-3">Table Number</h2>
          <input
            type="text"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            placeholder="e.g. Table 5"
            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>

        {/* Special Instructions */}
        <div className="bg-white rounded-xl border p-6">
          <h2 className="font-semibold text-stone-900 mb-3">Special Instructions</h2>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Any allergies or special requests?"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
          />
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-xl border p-6">
          <h2 className="font-semibold text-stone-900 mb-3">Payment Method</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setPaymentMethod("card")}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl border-2 transition-all",
                paymentMethod === "card"
                  ? "border-primary bg-primary/5"
                  : "border-stone-200 hover:border-stone-300"
              )}
            >
              <CreditCard className={cn("w-5 h-5", paymentMethod === "card" ? "text-primary" : "text-stone-400")} />
              <div className="text-left">
                <p className="font-medium text-sm text-stone-900">Pay with Card</p>
                <p className="text-xs text-stone-500">Stripe Checkout</p>
              </div>
            </button>
            <button
              onClick={() => setPaymentMethod("counter")}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl border-2 transition-all",
                paymentMethod === "counter"
                  ? "border-primary bg-primary/5"
                  : "border-stone-200 hover:border-stone-300"
              )}
            >
              <Banknote className={cn("w-5 h-5", paymentMethod === "counter" ? "text-primary" : "text-stone-400")} />
              <div className="text-left">
                <p className="font-medium text-sm text-stone-900">Pay at Counter</p>
                <p className="text-xs text-stone-500">Cash or card</p>
              </div>
            </button>
          </div>
        </div>

        <button
          onClick={() => setStep("confirmed")}
          className="w-full py-3.5 bg-primary hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-primary/25 text-lg"
        >
          Place Order &middot; ${total.toFixed(2)}
        </button>
      </div>
    </div>
  );
}
