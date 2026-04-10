"use client";

import { useState } from "react";
import { Plus, Search, Grid3X3, List, ChevronDown } from "lucide-react";
import { MenuCard } from "@/components/menu/MenuCard";
import { MenuItemModal } from "@/components/menu/MenuItemModal";
import { cn } from "@/lib/utils";

const categories = ["All", "Starters", "Mains", "Desserts", "Drinks", "Sides"];

// Demo data
const demoItems = [
  { id: "1", name: "Jollof Rice & Chicken", description: "Creamy Nigerian classic with pancetta and parmesan.", price: 18.5, category: "Mains", available: true, image: null },
  { id: "2", name: "Abacha (African Salad)", description: "Romaine lettuce, croutons, parmesan, and caesar dressing.", price: 12.0, category: "Starters", available: true, image: null },
  { id: "3", name: "Pounded Yam & Egusi", description: "Fresh mozzarella, tomato sauce, and basil on a thin crust.", price: 16.0, category: "Mains", available: true, image: null },
  { id: "4", name: "Grilled Catfish (Point & Kill)", description: "Atlantic salmon with lemon butter sauce and seasonal vegetables.", price: 24.0, category: "Mains", available: false, image: null },
  { id: "5", name: "Puff Puff", description: "Classic Nigerian dessert with espresso-soaked ladyfingers.", price: 9.5, category: "Desserts", available: true, image: null },
  { id: "6", name: "Chicken Wings", description: "Crispy buffalo wings with ranch dipping sauce.", price: 14.0, category: "Starters", available: true, image: null },
  { id: "7", name: "Zobo Drink", description: "Fresh mint, lime, white rum, and soda water.", price: 11.0, category: "Drinks", available: true, image: null },
  { id: "8", name: "Chocolate Lava Cake", description: "Warm chocolate cake with a molten center and vanilla ice cream.", price: 10.5, category: "Desserts", available: true, image: null },
  { id: "9", name: "Truffle Fries", description: "Hand-cut fries with truffle oil and parmesan shavings.", price: 8.0, category: "Sides", available: true, image: null },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [items, setItems] = useState(demoItems);

  const filtered = items.filter((item) => {
    const matchCategory = activeCategory === "All" || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleToggleAvailability = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, available: !item.available } : item))
    );
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Menu</h1>
          <p className="text-stone-500 mt-1">{items.length} items across {categories.length - 1} categories</p>
        </div>
        <button
          id="add-menu-item"
          onClick={() => {
            setEditingItem(null);
            setModalOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-primary/25"
        >
          <Plus className="w-5 h-5" />
          Add Item
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex gap-2 overflow-x-auto pb-1 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors",
                activeCategory === cat
                  ? "bg-primary text-white"
                  : "bg-white border text-stone-600 hover:bg-stone-50"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 ml-auto w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search menu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary w-full sm:w-56 transition-all"
            />
          </div>
          <div className="flex bg-white border rounded-xl overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={cn("p-2 transition-colors", viewMode === "grid" ? "bg-primary text-white" : "text-stone-500 hover:text-stone-700")}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn("p-2 transition-colors", viewMode === "list" ? "bg-primary text-white" : "text-stone-500 hover:text-stone-700")}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-stone-400" />
          </div>
          <h3 className="text-lg font-semibold text-stone-900">No items found</h3>
          <p className="text-stone-500 mt-1">Try changing the category or search term</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              onToggle={() => handleToggleAvailability(item.id)}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border divide-y">
          {filtered.map((item) => (
            <div key={item.id} className="flex items-center justify-between px-6 py-4 hover:bg-stone-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl flex items-center justify-center text-lg">
                  🍽️
                </div>
                <div>
                  <p className="font-medium text-stone-900">{item.name}</p>
                  <p className="text-sm text-stone-500">{item.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <p className="font-semibold text-stone-900">${item.price.toFixed(2)}</p>
                <button
                  onClick={() => handleToggleAvailability(item.id)}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                    item.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  )}
                >
                  {item.available ? "Available" : "Unavailable"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <MenuItemModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        item={editingItem}
      />
    </div>
  );
}
