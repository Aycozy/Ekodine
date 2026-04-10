import { cn } from "@/lib/utils";

const orders = [
  { id: "ORD-001", customer: "Table 5", items: "Jollof Rice & Chicken, Abacha (African Salad)", total: "₦34.50", status: "PREPARING", time: "2 min ago" },
  { id: "ORD-002", customer: "Table 12", items: "Pounded Yam & Egusi x2, Coke", total: "₦41.00", status: "PENDING", time: "5 min ago" },
  { id: "ORD-003", customer: "Table 3", items: "Grilled Catfish (Point & Kill), White Wine", total: "₦52.80", status: "READY", time: "12 min ago" },
  { id: "ORD-004", customer: "Table 8", items: "Chicken Wings, Beer x3", total: "₦28.50", status: "DELIVERED", time: "25 min ago" },
  { id: "ORD-005", customer: "Table 1", items: "Tomato Soup, Bread Basket", total: "₦18.00", status: "PREPARING", time: "8 min ago" },
];

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PREPARING: "bg-blue-100 text-blue-700",
  READY: "bg-green-100 text-green-700",
  DELIVERED: "bg-stone-100 text-stone-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export function RecentOrders() {
  return (
    <div className="bg-white rounded-xl border">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-stone-900">Recent Orders</h2>
        <p className="text-sm text-stone-500">Latest orders from your restaurant</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-stone-50/50">
              <th className="text-left px-6 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Order</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Table</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider hidden md:table-cell">Items</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Total</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider hidden sm:table-cell">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-stone-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-stone-900">{order.id}</td>
                <td className="px-6 py-4 text-sm text-stone-600">{order.customer}</td>
                <td className="px-6 py-4 text-sm text-stone-600 hidden md:table-cell max-w-[200px] truncate">{order.items}</td>
                <td className="px-6 py-4 text-sm font-semibold text-stone-900">{order.total}</td>
                <td className="px-6 py-4">
                  <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium", statusColors[order.status])}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-stone-500 hidden sm:table-cell">{order.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
