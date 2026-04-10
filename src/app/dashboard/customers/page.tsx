"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Search, Mail, Phone, ShoppingCart, CalendarDays } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  lastVisit: string;
}

const demoCustomers: Customer[] = [
  { id: "1", name: "John Smith", email: "john@email.com", phone: "+1 555-0101", orders: 12, totalSpent: 456.80, lastVisit: "Today" },
  { id: "2", name: "Emily Davis", email: "emily@email.com", phone: "+1 555-0102", orders: 8, totalSpent: 312.50, lastVisit: "Yesterday" },
  { id: "3", name: "Michael Brown", email: "michael@email.com", phone: "+1 555-0103", orders: 24, totalSpent: 892.30, lastVisit: "2 days ago" },
  { id: "4", name: "Sarah Wilson", email: "sarah@email.com", phone: "+1 555-0104", orders: 5, totalSpent: 178.00, lastVisit: "1 week ago" },
  { id: "5", name: "David Lee", email: "david@email.com", phone: "+1 555-0105", orders: 15, totalSpent: 623.40, lastVisit: "3 days ago" },
  { id: "6", name: "Anna Taylor", email: "anna@email.com", phone: "+1 555-0106", orders: 3, totalSpent: 96.50, lastVisit: "2 weeks ago" },
  { id: "7", name: "James Moore", email: "james@email.com", phone: "+1 555-0107", orders: 19, totalSpent: 745.20, lastVisit: "Today" },
  { id: "8", name: "Lisa Chen", email: "lisa@email.com", phone: "+1 555-0108", orders: 7, totalSpent: 284.00, lastVisit: "5 days ago" },
];

export default function CustomersPage() {
  const [search, setSearch] = useState("");

  const filtered = demoCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Customers</h1>
        <p className="text-stone-500 mt-1">{demoCustomers.length} customers in your database</p>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-4 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary w-full transition-all"
        />
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-stone-50/50">
                <th className="text-left px-6 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Customer</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider hidden md:table-cell">Contact</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Orders</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Total Spent</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider hidden sm:table-cell">Last Visit</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((customer) => (
                <tr key={customer.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-amber-100 rounded-xl flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-stone-900 text-sm">{customer.name}</p>
                        <p className="text-xs text-stone-500 md:hidden">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="space-y-0.5">
                      <p className="text-sm text-stone-600 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-stone-400" /> {customer.email}
                      </p>
                      <p className="text-sm text-stone-600 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-stone-400" /> {customer.phone}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-sm text-stone-700">
                      <ShoppingCart className="w-3.5 h-3.5 text-stone-400" /> {customer.orders}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-stone-900 text-sm">${customer.totalSpent.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <span className="text-sm text-stone-500">{customer.lastVisit}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
