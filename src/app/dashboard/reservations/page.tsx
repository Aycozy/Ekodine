"use client";

import { useState } from "react";
import { cn, formatDate } from "@/lib/utils";
import { CalendarDays, Check, X, Clock, Users, ChevronLeft, ChevronRight } from "lucide-react";

interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  partySize: number;
  date: string;
  time: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  table?: string;
}

const demoReservations: Reservation[] = [
  { id: "1", name: "John Smith", email: "john@email.com", phone: "+1 555-0101", partySize: 4, date: "2026-04-09", time: "7:00 PM", status: "CONFIRMED", table: "Table 5" },
  { id: "2", name: "Emily Davis", email: "emily@email.com", phone: "+1 555-0102", partySize: 2, date: "2026-04-09", time: "7:30 PM", status: "PENDING" },
  { id: "3", name: "Michael Brown", email: "michael@email.com", phone: "+1 555-0103", partySize: 6, date: "2026-04-09", time: "8:00 PM", status: "CONFIRMED", table: "Table 10" },
  { id: "4", name: "Sarah Wilson", email: "sarah@email.com", phone: "+1 555-0104", partySize: 3, date: "2026-04-10", time: "6:30 PM", status: "PENDING" },
  { id: "5", name: "David Lee", email: "david@email.com", phone: "+1 555-0105", partySize: 2, date: "2026-04-10", time: "8:00 PM", status: "CONFIRMED", table: "Table 3" },
  { id: "6", name: "Anna Taylor", email: "anna@email.com", phone: "+1 555-0106", partySize: 5, date: "2026-04-10", time: "9:00 PM", status: "CANCELLED" },
  { id: "7", name: "James Moore", email: "james@email.com", phone: "+1 555-0107", partySize: 8, date: "2026-04-11", time: "7:00 PM", status: "PENDING" },
  { id: "8", name: "Lisa Chen", email: "lisa@email.com", phone: "+1 555-0108", partySize: 2, date: "2026-04-11", time: "8:30 PM", status: "CONFIRMED", table: "Table 8" },
];

const statusConfig = {
  PENDING: { color: "bg-yellow-100 text-yellow-700", label: "Pending" },
  CONFIRMED: { color: "bg-green-100 text-green-700", label: "Confirmed" },
  CANCELLED: { color: "bg-red-100 text-red-700", label: "Cancelled" },
};

const tables = ["Table 1", "Table 2", "Table 3", "Table 5", "Table 7", "Table 8", "Table 10", "Table 12"];

export default function ReservationsPage() {
  const [reservations, setReservations] = useState(demoReservations);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [selectedDate, setSelectedDate] = useState("2026-04-09");

  const filtered = reservations.filter((r) => {
    const matchStatus = filterStatus === "ALL" || r.status === filterStatus;
    const matchDate = selectedDate ? r.date === selectedDate : true;
    return matchStatus && matchDate;
  });

  const handleConfirm = (id: string) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "CONFIRMED" as const } : r))
    );
  };

  const handleCancel = (id: string) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "CANCELLED" as const } : r))
    );
  };

  const handleAssignTable = (id: string, table: string) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, table } : r))
    );
  };

  // Generate date tabs
  const dates = ["2026-04-09", "2026-04-10", "2026-04-11", "2026-04-12", "2026-04-13"];
  const dayNames = ["Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Reservations</h1>
          <p className="text-stone-500 mt-1">Manage table bookings and guest reservations</p>
        </div>
        <div className="flex gap-2">
          {(["ALL", "PENDING", "CONFIRMED", "CANCELLED"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                filterStatus === status
                  ? "bg-primary text-white"
                  : "bg-white border text-stone-600 hover:bg-stone-50"
              )}
            >
              {status === "ALL" ? "All" : statusConfig[status].label}
            </button>
          ))}
        </div>
      </div>

      {/* Date Selector */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {dates.map((date, i) => {
          const day = date.split("-")[2];
          return (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={cn(
                "flex flex-col items-center min-w-[80px] px-4 py-3 rounded-xl text-sm transition-colors",
                selectedDate === date
                  ? "bg-primary text-white"
                  : "bg-white border text-stone-600 hover:bg-stone-50"
              )}
            >
              <span className="text-xs font-medium opacity-70">{dayNames[i]}</span>
              <span className="text-lg font-bold">{day}</span>
              <span className="text-xs mt-0.5">
                {reservations.filter((r) => r.date === date).length} bookings
              </span>
            </button>
          );
        })}
      </div>

      {/* Reservation List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CalendarDays className="w-8 h-8 text-stone-400" />
          </div>
          <h3 className="text-lg font-semibold text-stone-900">No reservations</h3>
          <p className="text-stone-500 mt-1">No bookings found for this date and filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((res) => (
            <div key={res.id} className="bg-white rounded-xl border p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-stone-900">{res.name}</h3>
                  <p className="text-sm text-stone-500 mt-0.5">{res.email}</p>
                </div>
                <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium", statusConfig[res.status].color)}>
                  {statusConfig[res.status].label}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-4 text-sm text-stone-600">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-stone-400" /> {res.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-stone-400" /> {res.partySize} guests
                </span>
                {res.phone && (
                  <span className="text-stone-400">📞 {res.phone}</span>
                )}
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-stone-500">Table:</span>
                  <select
                    value={res.table || ""}
                    onChange={(e) => handleAssignTable(res.id, e.target.value)}
                    className="text-sm border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="">Unassigned</option>
                    {tables.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                {res.status === "PENDING" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleConfirm(res.id)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Check className="w-4 h-4" /> Confirm
                    </button>
                    <button
                      onClick={() => handleCancel(res.id)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors"
                    >
                      <X className="w-4 h-4" /> Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
