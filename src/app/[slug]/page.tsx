import Link from "next/link";
import { MapPin, Phone, Clock, Star } from "lucide-react";

// In production, this would fetch from DB via slug param
export default function RestaurantPublicPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <header className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
                🥘
              </div>
              <div>
                <h1 className="text-4xl font-heading font-bold">Iya Basira Buka</h1>
                <div className="flex items-center gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < 4 ? "fill-primary text-primary" : "text-stone-600"}`} />
                  ))}
                  <span className="text-sm text-stone-400 ml-2">4.8 (230 reviews)</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/${params.slug}/login`} className="text-stone-300 hover:text-white font-medium transition-colors">
                Sign In
              </Link>
              <Link href={`/${params.slug}/register`} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors backdrop-blur-sm border border-white/10">
                Sign Up
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 mt-6 text-sm text-stone-300">
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> No 45 Allen Avenue, Ikeja, Lagos</span>
            <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> +1 (555) 123-4567</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Mon-Sun: 11 AM – 10 PM</span>
          </div>
          <div className="flex gap-3 mt-8">
            <Link
              href={`/${params.slug}/menu`}
              className="px-6 py-3 bg-primary hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-primary/30"
            >
              View Menu
            </Link>
            <Link
              href={`/${params.slug}/order`}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors backdrop-blur-sm"
            >
              Order Now
            </Link>
            <Link
              href={`/${params.slug}/reserve`}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors backdrop-blur-sm"
            >
              Reserve a Table
            </Link>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-heading font-bold mb-4">About Us</h2>
        <p className="text-stone-600 max-w-2xl leading-relaxed">
          Welcome to Iya Basira Buka, where authentic Nigerian cuisine meets modern dining. 
          Our chef brings decades of experience from the heart of Lagos, crafting dishes 
          that celebrate tradition while embracing innovation. Every ingredient is thoughtfully 
          sourced, every plate is a work of art.
        </p>
      </section>

      {/* Featured Items */}
      <section className="max-w-5xl mx-auto px-6 pb-12">
        <h2 className="text-2xl font-heading font-bold mb-6">Popular Dishes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "Jollof Rice & Chicken", price: 18.5, emoji: "🥘", category: "Mains" },
            { name: "Pounded Yam & Egusi", price: 16.0, emoji: "🍲", category: "Mains" },
            { name: "Puff Puff", price: 9.5, emoji: "🥯", category: "Desserts" },
            { name: "Abacha (African Salad)", price: 12.0, emoji: "🥗", category: "Starters" },
            { name: "Grilled Catfish (Point & Kill)", price: 24.0, emoji: "🐟", category: "Mains" },
            { name: "Zobo Drink", price: 11.0, emoji: "🍹", category: "Drinks" },
          ].map((item) => (
            <div key={item.name} className="bg-white rounded-xl border p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl flex items-center justify-center text-2xl">
                  {item.emoji}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-stone-900">{item.name}</h3>
                  <p className="text-xs text-primary font-medium">{item.category}</p>
                </div>
                <p className="text-lg font-bold text-stone-900">${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm text-stone-500">
          <p>Powered by <span className="font-semibold text-primary">Ekodine</span></p>
        </div>
      </footer>
    </div>
  );
}
