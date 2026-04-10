import { CalendarDays, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const reservations = [
  { id: "1", name: "John Smith", time: "7:00 PM", partySize: 4, status: "CONFIRMED" },
  { id: "2", name: "Emily Davis", time: "7:30 PM", partySize: 2, status: "PENDING" },
  { id: "3", name: "Michael Brown", time: "8:00 PM", partySize: 6, status: "CONFIRMED" },
  { id: "4", name: "Sarah Wilson", time: "8:30 PM", partySize: 3, status: "PENDING" },
  { id: "5", name: "David Lee", time: "9:00 PM", partySize: 2, status: "CONFIRMED" },
];

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export function UpcomingReservations() {
  return (
    <div className="bg-white rounded-xl border h-full">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-stone-900">Upcoming Reservations</h2>
        <p className="text-sm text-stone-500">Today&apos;s bookings</p>
      </div>
      <div className="divide-y">
        {reservations.map((res) => (
          <div key={res.id} className="p-4 hover:bg-stone-50/50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-stone-900 text-sm">{res.name}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-xs text-stone-500">
                    <Clock className="w-3 h-3" /> {res.time}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-stone-500">
                    <Users className="w-3 h-3" /> {res.partySize} guests
                  </span>
                </div>
              </div>
              <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", statusColors[res.status])}>
                {res.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
