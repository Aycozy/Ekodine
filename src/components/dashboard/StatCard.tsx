import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: LucideIcon;
}

export function StatCard({ title, value, change, trend = "neutral", icon: Icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border p-6 hover:shadow-md transition-shadow group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-stone-500">{title}</p>
          <p className="text-3xl font-bold mt-2 text-stone-900">{value}</p>
          {change && (
            <p
              className={cn(
                "text-sm mt-1 font-medium",
                trend === "up" && "text-green-600",
                trend === "down" && "text-red-600",
                trend === "neutral" && "text-stone-500"
              )}
            >
              {change}
            </p>
          )}
        </div>
        <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
