"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Building, CreditCard, Bell, Upload, Check, ExternalLink, Crown } from "lucide-react";
import toast from "react-hot-toast";

const tabs = [
  { id: "profile", label: "Restaurant Profile", icon: Building },
  { id: "billing", label: "Billing & Plan", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
];

const plans = [
  {
    name: "Free",
    price: "₦0",
    period: "/mo",
    features: ["Up to 20 menu items", "Basic order tracking", "5 reservations/day", "Email support"],
    current: false,
    popular: false,
  },
  {
    name: "Pro",
    price: "₦29",
    period: "/mo",
    features: ["Unlimited menu items", "Advanced analytics", "Unlimited reservations", "Staff management", "Priority support"],
    current: true,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "₦99",
    period: "/mo",
    features: ["Everything in Pro", "Custom domain", "White-label branding", "API access", "Dedicated account manager"],
    current: false,
    popular: false,
  },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({
    name: "Iya Basira Buka",
    address: "No 45 Allen Avenue, Ikeja, Lagos 100281",
    phone: "+1 (555) 123-4567",
    hours: "Mon-Sun: 11:00 AM - 10:00 PM",
  });
  const [notifications, setNotifications] = useState({
    newOrders: true,
    reservations: true,
    lowStock: false,
    weeklyReport: true,
    marketing: false,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-stone-500 mt-1">Manage your restaurant profile and preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b pb-0 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap",
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-stone-500 hover:text-stone-700"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Restaurant Profile Tab */}
      {activeTab === "profile" && (
        <div className="bg-white rounded-xl border p-6 space-y-6 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Restaurant Logo</label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-amber-100 rounded-2xl flex items-center justify-center text-3xl">
                🥘
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-stone-200 rounded-xl text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors">
                <Upload className="w-4 h-4" /> Upload new logo
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Restaurant Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Address</label>
            <input
              type="text"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Phone</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Hours</label>
              <input
                type="text"
                value={profile.hours}
                onChange={(e) => setProfile({ ...profile, hours: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          </div>

          <button
            onClick={() => toast.success("Profile saved!")}
            className="px-6 py-2.5 bg-primary hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-primary/25"
          >
            Save Changes
          </button>
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === "billing" && (
        <div className="space-y-6">
          {/* Current Plan Banner */}
          <div className="bg-gradient-to-r from-primary via-amber-400 to-orange-400 rounded-xl p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-5 h-5" />
              <span className="text-sm font-medium opacity-90">Current Plan</span>
            </div>
            <h2 className="text-2xl font-bold">Pro Plan</h2>
            <p className="opacity-80 mt-1">Your next billing date is May 9, 2026</p>
            <button className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
              <ExternalLink className="w-4 h-4" /> Manage Billing
            </button>
          </div>

          {/* Plan Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "rounded-xl border-2 p-6 relative transition-shadow hover:shadow-lg",
                  plan.current ? "border-primary bg-primary/5" : "border-stone-200 bg-white",
                  plan.popular && "ring-2 ring-primary ring-offset-2"
                )}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    POPULAR
                  </span>
                )}
                <h3 className="text-lg font-bold text-stone-900">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-stone-900">{plan.price}</span>
                  <span className="text-stone-500">{plan.period}</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-stone-600">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={cn(
                    "w-full mt-6 py-2.5 rounded-xl font-medium text-sm transition-colors",
                    plan.current
                      ? "bg-stone-200 text-stone-500 cursor-default"
                      : "bg-primary hover:bg-amber-600 text-white shadow-lg shadow-primary/25"
                  )}
                  disabled={plan.current}
                >
                  {plan.current ? "Current Plan" : "Upgrade"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="bg-white rounded-xl border p-6 max-w-2xl">
          <h2 className="text-lg font-semibold text-stone-900 mb-1">Email Notifications</h2>
          <p className="text-sm text-stone-500 mb-6">Choose which notifications you&apos;d like to receive</p>
          <div className="space-y-4">
            {[
              { key: "newOrders", label: "New Orders", desc: "Get notified when a new order comes in" },
              { key: "reservations", label: "Reservations", desc: "Alerts for new and updated reservations" },
              { key: "lowStock", label: "Low Stock Alerts", desc: "When menu items are running low" },
              { key: "weeklyReport", label: "Weekly Report", desc: "Revenue and performance summary every Monday" },
              { key: "marketing", label: "Marketing Emails", desc: "Tips, features, and product updates" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-3 border-b last:border-0">
                <div>
                  <p className="font-medium text-stone-900 text-sm">{item.label}</p>
                  <p className="text-xs text-stone-500 mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() =>
                    setNotifications((prev) => ({
                      ...prev,
                      [item.key]: !prev[item.key as keyof typeof prev],
                    }))
                  }
                  className={cn(
                    "relative w-12 h-6 rounded-full transition-colors",
                    notifications[item.key as keyof typeof notifications] ? "bg-primary" : "bg-stone-300"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform",
                      notifications[item.key as keyof typeof notifications] && "translate-x-6"
                    )}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
