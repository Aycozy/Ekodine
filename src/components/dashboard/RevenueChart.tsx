"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const data = [
  { date: "Mar 10", revenue: 890 },
  { date: "Mar 11", revenue: 1200 },
  { date: "Mar 12", revenue: 980 },
  { date: "Mar 13", revenue: 1400 },
  { date: "Mar 14", revenue: 1100 },
  { date: "Mar 15", revenue: 1600 },
  { date: "Mar 16", revenue: 1350 },
  { date: "Mar 17", revenue: 950 },
  { date: "Mar 18", revenue: 1250 },
  { date: "Mar 19", revenue: 1450 },
  { date: "Mar 20", revenue: 1680 },
  { date: "Mar 21", revenue: 1320 },
  { date: "Mar 22", revenue: 1050 },
  { date: "Mar 23", revenue: 1550 },
  { date: "Mar 24", revenue: 1780 },
  { date: "Mar 25", revenue: 1200 },
  { date: "Mar 26", revenue: 1900 },
  { date: "Mar 27", revenue: 1650 },
  { date: "Mar 28", revenue: 1400 },
  { date: "Mar 29", revenue: 1250 },
  { date: "Mar 30", revenue: 1050 },
  { date: "Mar 31", revenue: 1350 },
  { date: "Apr 1", revenue: 1550 },
  { date: "Apr 2", revenue: 1800 },
  { date: "Apr 3", revenue: 1650 },
  { date: "Apr 4", revenue: 1950 },
  { date: "Apr 5", revenue: 1400 },
  { date: "Apr 6", revenue: 1750 },
  { date: "Apr 7", revenue: 2100 },
  { date: "Apr 8", revenue: 1249 },
];

export function RevenueChart() {
  return (
    <div className="bg-white rounded-xl border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-stone-900">Revenue</h2>
          <p className="text-sm text-stone-500">Last 30 days</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-stone-900">₦41,674</p>
          <p className="text-sm text-green-600 font-medium">+14.2% vs last month</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f4" />
          <XAxis
            dataKey="date"
            tick={{ fill: "#78716c", fontSize: 12 }}
            axisLine={{ stroke: "#e7e5e4" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#78716c", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(val) => `₦${val}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1C1917",
              border: "none",
              borderRadius: "12px",
              color: "#fff",
              fontSize: "14px",
            }}
            formatter={(value: number) => [`₦${value}`, "Revenue"]}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#F59E0B"
            strokeWidth={2.5}
            fill="url(#colorRevenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
