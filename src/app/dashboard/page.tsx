"use client";

import { StatCard } from "@/components/dashboard/StatCard";
import { ShoppingCart, DollarSign, CalendarDays, TrendingUp } from "lucide-react";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { UpcomingReservations } from "@/components/dashboard/UpcomingReservations";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-stone-500 mt-1">Welcome back! Here&apos;s your restaurant overview.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Orders"
          value="38"
          change="+12% from yesterday"
          trend="up"
          icon={ShoppingCart}
        />
        <StatCard
          title="Revenue"
          value="₦1,249"
          change="+8% from yesterday"
          trend="up"
          icon={DollarSign}
        />
        <StatCard
          title="Reservations"
          value="12"
          change="+3 new today"
          trend="up"
          icon={CalendarDays}
        />
        <StatCard
          title="Avg. Order Value"
          value="₦32.87"
          change="-2% from yesterday"
          trend="down"
          icon={TrendingUp}
        />
      </div>

      {/* Charts & Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <UpcomingReservations />
        </div>
      </div>

      {/* Recent Orders */}
      <RecentOrders />
    </div>
  );
}
