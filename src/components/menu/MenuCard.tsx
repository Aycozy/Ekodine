"use client";

import { cn } from "@/lib/utils";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface MenuCardProps {
  item: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    category: string;
    available: boolean;
    image: string | null;
  };
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function MenuCard({ item, onToggle, onEdit, onDelete }: MenuCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Image placeholder */}
      <div className="h-40 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center relative">
        <span className="text-5xl">
          {item.category === "Mains" ? "🥘" : item.category === "Starters" ? "🥗" : item.category === "Desserts" ? "🥯" : item.category === "Drinks" ? "🍹" : "🍟"}
        </span>
        {/* Availability toggle */}
        <button
          onClick={onToggle}
          className={cn(
            "absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors",
            item.available ? "bg-green-500 text-white" : "bg-red-500 text-white"
          )}
        >
          {item.available ? "Available" : "Unavailable"}
        </button>
        {/* Menu button */}
        <div className="absolute top-3 right-3" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 bg-white/80 backdrop-blur-sm rounded-lg hover:bg-white transition-colors shadow-sm"
          >
            <MoreVertical className="w-4 h-4 text-stone-600" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-10 bg-white border rounded-xl shadow-lg py-1 w-36 z-10 animate-in fade-in slide-in-from-top-1">
              <button
                onClick={() => { onEdit(); setMenuOpen(false); }}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
              >
                <Pencil className="w-4 h-4" /> Edit
              </button>
              <button
                onClick={() => { onDelete(); setMenuOpen(false); }}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-stone-900">{item.name}</h3>
            <p className="text-xs text-primary font-medium mt-0.5">{item.category}</p>
          </div>
          <p className="text-lg font-bold text-stone-900">${item.price.toFixed(2)}</p>
        </div>
        {item.description && (
          <p className="text-sm text-stone-500 mt-2 line-clamp-2">{item.description}</p>
        )}
      </div>
    </div>
  );
}
