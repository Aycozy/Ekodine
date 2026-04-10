"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Clock, Eye, ChevronRight } from "lucide-react";

type Status = "PENDING" | "PREPARING" | "READY" | "DELIVERED";

interface OrderItem {
  id: string;
  orderId: string;
  orderNumber: string;
  table: string;
  items: string;
  total: number;
  note?: string;
  status: Status;
  time: string;
}

const initialOrders: OrderItem[] = [
  { id: "1", orderId: "ORD-001", orderNumber: "#001", table: "Table 5", items: "Jollof Rice & Chicken, Abacha (African Salad)", total: 34.5, status: "PENDING", time: "2 min ago" },
  { id: "2", orderId: "ORD-002", orderNumber: "#002", table: "Table 12", items: "Pounded Yam & Egusi x2, Coke", total: 41.0, note: "No onions please", status: "PENDING", time: "5 min ago" },
  { id: "3", orderId: "ORD-003", orderNumber: "#003", table: "Table 3", items: "Grilled Catfish (Point & Kill), White Wine", total: 52.8, status: "PREPARING", time: "12 min ago" },
  { id: "4", orderId: "ORD-004", orderNumber: "#004", table: "Table 8", items: "Chicken Wings, Beer x3", total: 28.5, status: "PREPARING", time: "15 min ago" },
  { id: "5", orderId: "ORD-005", orderNumber: "#005", table: "Table 1", items: "Tomato Soup, Bread Basket", total: 18.0, status: "READY", time: "22 min ago" },
  { id: "6", orderId: "ORD-006", orderNumber: "#006", table: "Table 7", items: "Steak Medium-Rare, Truffle Fries", total: 45.0, status: "READY", time: "28 min ago" },
  { id: "7", orderId: "ORD-007", orderNumber: "#007", table: "Table 2", items: "Puff Puff, Espresso", total: 15.5, status: "DELIVERED", time: "35 min ago" },
  { id: "8", orderId: "ORD-008", orderNumber: "#008", table: "Table 10", items: "Burger Combo, Milkshake", total: 22.0, status: "DELIVERED", time: "45 min ago" },
];

const columns: { key: Status; label: string; color: string; bgColor: string }[] = [
  { key: "PENDING", label: "Pending", color: "text-yellow-700", bgColor: "bg-yellow-50 border-yellow-200" },
  { key: "PREPARING", label: "Preparing", color: "text-blue-700", bgColor: "bg-blue-50 border-blue-200" },
  { key: "READY", label: "Ready", color: "text-green-700", bgColor: "bg-green-50 border-green-200" },
  { key: "DELIVERED", label: "Delivered", color: "text-stone-700", bgColor: "bg-stone-50 border-stone-200" },
];

const statusBadgeColors: Record<Status, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PREPARING: "bg-blue-100 text-blue-700",
  READY: "bg-green-100 text-green-700",
  DELIVERED: "bg-stone-100 text-stone-700",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);

  const moveOrder = (orderId: string, direction: "forward" | "back") => {
    const statusOrder: Status[] = ["PENDING", "PREPARING", "READY", "DELIVERED"];
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const currentIndex = statusOrder.indexOf(order.status);
          const nextIndex = direction === "forward" ? currentIndex + 1 : currentIndex - 1;
          if (nextIndex >= 0 && nextIndex < statusOrder.length) {
            return { ...order, status: statusOrder[nextIndex] };
          }
        }
        return order;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-stone-500 mt-1">Track and manage incoming orders in real-time</p>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {columns.map((col) => {
          const colOrders = orders.filter((o) => o.status === col.key);
          return (
            <div key={col.key} className={cn("rounded-xl border p-4", col.bgColor)}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={cn("font-semibold text-sm", col.color)}>{col.label}</h3>
                <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", statusBadgeColors[col.key])}>
                  {colOrders.length}
                </span>
              </div>
              <div className="space-y-3">
                {colOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-xl p-4 border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-stone-900">{order.orderId}</span>
                      <span className="text-xs text-stone-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {order.time}
                      </span>
                    </div>
                    <p className="text-sm text-stone-600 line-clamp-1">{order.items}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-stone-500">{order.table}</span>
                      <span className="font-semibold text-sm text-stone-900">${order.total.toFixed(2)}</span>
                    </div>
                    {order.note && (
                      <p className="text-xs text-amber-600 mt-2 bg-amber-50 px-2 py-1 rounded-lg">📝 {order.note}</p>
                    )}
                    {col.key !== "DELIVERED" && (
                      <button
                        onClick={(e) => { e.stopPropagation(); moveOrder(order.id, "forward"); }}
                        className="mt-3 w-full py-1.5 text-xs font-medium bg-stone-50 hover:bg-stone-100 rounded-lg text-stone-700 transition-colors flex items-center justify-center gap-1"
                      >
                        Move to {columns[columns.findIndex((c) => c.key === col.key) + 1]?.label}
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
                {colOrders.length === 0 && (
                  <div className="text-center py-8 text-stone-400 text-sm">No orders</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Order Detail Drawer */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl animate-in slide-in-from-right">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-heading font-bold">{selectedOrder.orderId}</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-lg hover:bg-stone-100 transition-colors text-stone-500"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <span className={cn("px-3 py-1 rounded-full text-sm font-medium", statusBadgeColors[selectedOrder.status])}>
                  {selectedOrder.status}
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Table</span>
                  <span className="font-medium text-stone-900">{selectedOrder.table}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Items</span>
                  <span className="font-medium text-stone-900 text-right max-w-[200px]">{selectedOrder.items}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Time</span>
                  <span className="font-medium text-stone-900">{selectedOrder.time}</span>
                </div>
                {selectedOrder.note && (
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Note</span>
                    <span className="font-medium text-amber-600">{selectedOrder.note}</span>
                  </div>
                )}
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-medium text-stone-700">Total</span>
                  <span className="text-xl font-bold text-stone-900">${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex gap-3">
                {selectedOrder.status !== "PENDING" && (
                  <button
                    onClick={() => { moveOrder(selectedOrder.id, "back"); setSelectedOrder(null); }}
                    className="flex-1 py-2.5 border border-stone-200 text-stone-700 font-medium rounded-xl hover:bg-stone-50 transition-colors text-sm"
                  >
                    Move Back
                  </button>
                )}
                {selectedOrder.status !== "DELIVERED" && (
                  <button
                    onClick={() => { moveOrder(selectedOrder.id, "forward"); setSelectedOrder(null); }}
                    className="flex-1 py-2.5 bg-primary hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors text-sm"
                  >
                    Move Forward
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
