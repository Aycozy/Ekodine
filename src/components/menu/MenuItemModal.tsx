"use client";

import { X, Upload } from "lucide-react";
import { useState, useEffect } from "react";

interface MenuItemModalProps {
  open: boolean;
  onClose: () => void;
  item?: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    category: string;
    available: boolean;
    image: string | null;
  } | null;
}

const categories = ["Starters", "Mains", "Desserts", "Drinks", "Sides"];

export function MenuItemModal({ open, onClose, item }: MenuItemModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Mains",
    available: true,
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        description: item.description || "",
        price: item.price.toString(),
        category: item.category,
        available: item.available,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "Mains",
        available: true,
      });
    }
  }, [item, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
        <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
          <h2 className="text-xl font-heading font-bold text-stone-900">
            {item ? "Edit Menu Item" : "Add Menu Item"}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-stone-100 transition-colors">
            <X className="w-5 h-5 text-stone-500" />
          </button>
        </div>

        <form className="p-6 space-y-5" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Image</label>
            <div className="border-2 border-dashed border-stone-200 rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-stone-400 mx-auto" />
              <p className="text-sm text-stone-500 mt-2">Click to upload or drag and drop</p>
              <p className="text-xs text-stone-400 mt-1">PNG, JPG up to 5MB</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Jollof Rice & Chicken"
              required
              className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the dish"
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Price (₦)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
                required
                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-stone-700">Available for ordering</span>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, available: !formData.available })}
              className={`relative w-12 h-6 rounded-full transition-colors ${formData.available ? "bg-primary" : "bg-stone-300"}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${formData.available ? "translate-x-6" : ""}`} />
            </button>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-stone-200 text-stone-700 font-medium rounded-xl hover:bg-stone-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-primary hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-primary/25"
            >
              {item ? "Save Changes" : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
