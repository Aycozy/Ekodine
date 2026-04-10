"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Menu as MenuIcon, ClipboardList, CalendarDays, Users, Settings, LogOut, Contact } from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Menu", href: "/dashboard/menu", icon: MenuIcon },
  { name: "Orders", href: "/dashboard/orders", icon: ClipboardList },
  { name: "Reservations", href: "/dashboard/reservations", icon: CalendarDays },
  { name: "Staff", href: "/dashboard/staff", icon: Users },
  { name: "Customers", href: "/dashboard/customers", icon: Contact },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r h-screen hidden md:flex flex-col flex-shrink-0 sticky top-0">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-heading font-bold text-primary">Ekodine</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
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
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-stone-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign out</span>
        </button>
      </div>
    </aside>
  );
}
