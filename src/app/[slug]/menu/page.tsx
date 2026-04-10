"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ShoppingCart, Plus, Minus, X, ArrowLeft } from "lucide-react";
import Link from "next/link";

const categories = ["All", "Starters", "Mains", "Desserts", "Drinks", "Sides"];

const menuItems = [
  { id: "1", name: "Jollof Rice & Chicken", description: "Creamy Nigerian classic with pancetta and parmesan.", price: 18.5, category: "Mains", emoji: "🥘" },
  { id: "2", name: "Abacha (African Salad)", description: "Romaine lettuce, croutons, parmesan, and caesar dressing.", price: 12.0, category: "Starters", emoji: "🥗" },
  { id: "3", name: "Pounded Yam & Egusi", description: "Fresh mozzarella, tomato sauce, and basil on a thin crust.", price: 16.0, category: "Mains", emoji: "🍲" },
  { id: "4", name: "Grilled Catfish (Point & Kill)", description: "Atlantic salmon with lemon butter sauce and seasonal vegetables.", price: 24.0, category: "Mains", emoji: "🐟" },
  { id: "5", name: "Puff Puff", description: "Classic Nigerian dessert with espresso-soaked ladyfingers.", price: 9.5, category: "Desserts", emoji: "🥯" },
  { id: "6", name: "Chicken Wings", description: "Crispy buffalo wings with ranch dipping sauce.", price: 14.0, category: "Starters", emoji: "🍗" },
  { id: "7", name: "Zobo Drink", description: "Fresh mint, lime, white rum, and soda water.", price: 11.0, category: "Drinks", emoji: "🍹" },
  { id: "8", name: "Chocolate Lava Cake", description: "Warm chocolate cake with a molten center.", price: 10.5, category: "Desserts", emoji: "🍫" },
  { id: "9", name: "Truffle Fries", description: "Hand-cut fries with truffle oil and parmesan.", price: 8.0, category: "Sides", emoji: "🍟" },
  { id: "10", name: "Bruschetta", description: "Toasted bread topped with tomatoes, garlic, and basil.", price: 9.0, category: "Starters", emoji: "🥖" },
  { id: "11", name: "Espresso", description: "Rich Nigerian espresso shot.", price: 3.5, category: "Drinks", emoji: "☕" },
  { id: "12", name: "Panna Cotta", description: "Vanilla cream dessert with berry compote.", price: 8.5, category: "Desserts", emoji: "🍮" },
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function PublicMenuPage({ params }: { params: { slug: string } }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = menuItems.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  const addToCart = (item: typeof menuItems[0]) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, quantity: c.quantity + delta } : c))
        .filter((c) => c.quantity > 0)
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/${params.slug}`} className="p-2 rounded-xl hover:bg-stone-100 transition-colors">
              <ArrowLeft className="w-5 h-5 text-stone-600" />
            </Link>
            <div>
              <h1 className="font-heading font-bold text-lg text-stone-900">Iya Basira Buka</h1>
              <p className="text-xs text-stone-500">Menu</p>
            </div>
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2.5 bg-primary text-white rounded-xl hover:bg-amber-600 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="sticky top-[65px] z-10 bg-stone-50 border-b">
        <div className="max-w-5xl mx-auto px-6 py-3">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                  activeCategory === cat
                    ? "bg-primary text-white"
                    : "bg-white border text-stone-600 hover:bg-stone-100"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => {
            const inCart = cart.find((c) => c.id === item.id);
            return (
              <div key={item.id} className="bg-white rounded-xl border overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-32 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center text-5xl">
                  {item.emoji}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-stone-900">{item.name}</h3>
                      <p className="text-xs text-primary font-medium">{item.category}</p>
                    </div>
                    <p className="text-lg font-bold text-stone-900">${item.price.toFixed(2)}</p>
                  </div>
                  <p className="text-sm text-stone-500 mt-2 line-clamp-2">{item.description}</p>
                  <div className="mt-3">
                    {inCart ? (
                      <div className="flex items-center justify-between bg-primary/5 rounded-xl px-3 py-1.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold text-primary">{inCart.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item)}
                        className="w-full py-2 text-sm font-medium bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl transition-colors"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Cart Button (mobile) */}
      {cartCount > 0 && !cartOpen && (
        <div className="fixed bottom-6 left-6 right-6 sm:hidden z-30">
          <button
            onClick={() => setCartOpen(true)}
            className="w-full py-3.5 bg-primary text-white font-semibold rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            View Cart ({cartCount}) &middot; ${cartTotal.toFixed(2)}
          </button>
        </div>
      )}

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-heading font-bold">Your Cart</h2>
              <button onClick={() => setCartOpen(false)} className="p-1.5 rounded-lg hover:bg-stone-100">
                <X className="w-5 h-5 text-stone-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingCart className="w-12 h-12 text-stone-300 mx-auto" />
                  <p className="text-stone-500 mt-3">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-stone-900 text-sm">{item.name}</p>
                        <p className="text-sm text-stone-500">${item.price.toFixed(2)} each</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 rounded-lg border hover:bg-stone-50"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 rounded-lg border hover:bg-stone-50"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="font-semibold text-stone-900 w-16 text-right">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-6 border-t space-y-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <Link
                  href={`/${params.slug}/order`}
                  className="block w-full py-3 bg-primary hover:bg-amber-600 text-white text-center font-semibold rounded-xl transition-colors shadow-lg shadow-primary/25"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
