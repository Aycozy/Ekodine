"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, LayoutDashboard, Menu as MenuIcon, ClipboardList, CalendarDays, Users, Settings, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Menu", href: "/dashboard/menu", icon: MenuIcon },
  { name: "Orders", href: "/dashboard/orders", icon: ClipboardList },
  { name: "Reservations", href: "/dashboard/reservations", icon: CalendarDays },
  { name: "Staff", href: "/dashboard/staff", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl flex flex-col animate-slide-in">
        <div className="p-6 border-b flex items-center justify-between">
          <h1 className="text-2xl font-heading font-bold text-primary">Ekodine</h1>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-stone-100 transition-colors">
            <X className="w-5 h-5 text-stone-500" />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors",
                  isActive
                    ? "bg-primary text-white"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-stone-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
