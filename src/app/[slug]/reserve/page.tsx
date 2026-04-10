"use client";

import { useState } from "react";
import { ArrowLeft, CalendarDays, Clock, Users, CheckCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const timeSlots = [
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM",
  "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM",
];

const partySizes = [1, 2, 3, 4, 5, 6, 7, 8];

export default function ReservePage({ params }: { params: { slug: string } }) {
  const [step, setStep] = useState<"form" | "confirmed">("form");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPartySize, setSelectedPartySize] = useState(2);
  const [guestInfo, setGuestInfo] = useState({ name: "", email: "", phone: "" });

  // Generate next 14 days for date picker
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      value: d.toISOString().split("T")[0],
      day: d.toLocaleDateString("en-US", { weekday: "short" }),
      date: d.getDate(),
      month: d.toLocaleDateString("en-US", { month: "short" }),
    };
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      toast.error("Please select a date and time");
      return;
    }
    setStep("confirmed");
  };

  if (step === "confirmed") {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl border shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-stone-900">Reservation Confirmed!</h1>
          <p className="text-stone-500 mt-2">We&apos;ve sent a confirmation to your email</p>
          <div className="bg-stone-50 rounded-xl p-4 mt-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-stone-500">Name</span>
              <span className="font-medium text-stone-900">{guestInfo.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Date</span>
              <span className="font-medium text-stone-900">{selectedDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Time</span>
              <span className="font-medium text-stone-900">{selectedTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Party Size</span>
              <span className="font-medium text-stone-900">{selectedPartySize} guests</span>
            </div>
          </div>
          <Link
            href={`/${params.slug}`}
            className="block w-full mt-6 py-3 bg-primary hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors"
          >
            Back to Restaurant
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link href={`/${params.slug}`} className="p-2 rounded-xl hover:bg-stone-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-stone-600" />
          </Link>
          <div>
            <h1 className="font-heading font-bold text-lg">Reserve a Table</h1>
            <p className="text-xs text-stone-500">Iya Basira Buka</p>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-6 py-8 space-y-6">
        {/* Date Picker */}
        <div className="bg-white rounded-xl border p-6">
          <h2 className="font-semibold text-stone-900 mb-4 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-primary" /> Select Date
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {dates.map((d) => (
              <button
                type="button"
                key={d.value}
                onClick={() => setSelectedDate(d.value)}
                className={cn(
                  "flex flex-col items-center min-w-[64px] px-3 py-3 rounded-xl text-sm transition-colors flex-shrink-0",
                  selectedDate === d.value
                    ? "bg-primary text-white"
                    : "bg-stone-50 border text-stone-600 hover:bg-stone-100"
                )}
              >
                <span className="text-xs font-medium opacity-70">{d.day}</span>
                <span className="text-lg font-bold">{d.date}</span>
                <span className="text-xs opacity-70">{d.month}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div className="bg-white rounded-xl border p-6">
          <h2 className="font-semibold text-stone-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" /> Select Time
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {timeSlots.map((time) => (
              <button
                type="button"
                key={time}
                onClick={() => setSelectedTime(time)}
                className={cn(
                  "py-2.5 rounded-xl text-sm font-medium transition-colors",
                  selectedTime === time
                    ? "bg-primary text-white"
                    : "bg-stone-50 border text-stone-600 hover:bg-stone-100"
                )}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Party Size */}
        <div className="bg-white rounded-xl border p-6">
          <h2 className="font-semibold text-stone-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" /> Party Size
          </h2>
          <div className="flex gap-2 flex-wrap">
            {partySizes.map((size) => (
              <button
                type="button"
                key={size}
                onClick={() => setSelectedPartySize(size)}
                className={cn(
                  "w-12 h-12 rounded-xl text-sm font-bold transition-colors",
                  selectedPartySize === size
                    ? "bg-primary text-white"
                    : "bg-stone-50 border text-stone-600 hover:bg-stone-100"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Guest Info */}
        <div className="bg-white rounded-xl border p-6 space-y-4">
          <h2 className="font-semibold text-stone-900">Guest Information</h2>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Full Name</label>
            <input
              type="text"
              value={guestInfo.name}
              onChange={(e) => setGuestInfo({ ...guestInfo, name: e.target.value })}
              placeholder="John Doe"
              required
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Email</label>
              <input
                type="email"
                value={guestInfo.email}
                onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                placeholder="john@email.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Phone</label>
              <input
                type="tel"
                value={guestInfo.phone}
                onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-primary hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-primary/25 text-lg"
        >
          Confirm Reservation
        </button>
      </form>
    </div>
  );
}
