"use client";

import { Bell, Search, Menu as MenuIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { MobileNav } from "./MobileNav";

export function Topbar() {
  const { data: session } = useSession();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <header className="h-16 bg-white border-b flex items-center justify-between px-6 sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileNavOpen(true)}
            className="md:hidden p-2 rounded-xl hover:bg-stone-100 transition-colors"
          >
            <MenuIcon className="w-5 h-5 text-stone-600" />
          </button>
          <div className="relative hidden sm:block">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary w-64 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-xl hover:bg-stone-100 transition-colors">
            <Bell className="w-5 h-5 text-stone-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {session?.user?.name?.charAt(0) || "U"}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-stone-900">{session?.user?.name || "User"}</p>
              <p className="text-xs text-stone-500 capitalize">{(session?.user as any)?.role?.toLowerCase() || "staff"}</p>
            </div>
          </div>
        </div>
      </header>
      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  );
}
