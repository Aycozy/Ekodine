import Link from "next/link";
import { ChefHat, LayoutDashboard, ShoppingCart, CalendarDays, Users, BarChart3, ArrowRight, Check, Star } from "lucide-react";

const features = [
  { icon: LayoutDashboard, title: "Unified Dashboard", desc: "Real-time overview of orders, revenue, and reservations." },
  { icon: ShoppingCart, title: "Order Management", desc: "Kanban board for live order tracking and status updates." },
  { icon: CalendarDays, title: "Reservations", desc: "Calendar view with table assignment and email notifications." },
  { icon: Users, title: "Staff Management", desc: "Invite team members, assign roles, and manage access." },
  { icon: BarChart3, title: "Analytics", desc: "Insights into revenue, order trends, and customer behavior." },
  { icon: ChefHat, title: "Public Storefront", desc: "Branded menu page where customers can order and reserve." },
];

const plans = [
  { name: "Free", price: "₦0", features: ["20 menu items", "Basic orders", "5 reservations/day", "Email support"] },
  { name: "Pro", price: "₦29", features: ["Unlimited items", "Advanced analytics", "Staff management", "Priority support"], popular: true },
  { name: "Enterprise", price: "₦99", features: ["Everything in Pro", "Custom domain", "White-label", "Dedicated manager"] },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Nav */}
      <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-heading font-bold text-stone-900">Ekodine</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-stone-600">
            <a href="#features" className="hover:text-stone-900 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-stone-900 transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors hidden sm:block">
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-5 py-2.5 bg-primary hover:bg-amber-600 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-primary/25"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 via-transparent to-orange-50/50" />
        <div className="absolute top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -left-20 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
              <Star className="w-3.5 h-3.5 fill-primary" /> #1 Restaurant Management Platform
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-stone-900 leading-[1.1]">
              Run your restaurant{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-500 to-orange-500">
                smarter.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 mt-6 max-w-xl leading-relaxed">
              The all-in-one SaaS platform for restaurant owners to manage menus, orders, reservations, staff, and analytics from a single dashboard.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-3 mt-8">
              <Link
                href="/register"
                className="px-8 py-3.5 bg-primary hover:bg-amber-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary/30 flex items-center gap-2 text-lg"
              >
                Start for free <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/login"
                className="px-8 py-3.5 bg-white border border-stone-200 text-stone-700 font-semibold rounded-xl hover:bg-stone-50 transition-colors text-lg"
              >
                View Demo
              </Link>
            </div>
            <p className="text-sm text-stone-400 mt-4">No credit card required &middot; Free plan forever</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-stone-900">Everything you need to manage your restaurant</h2>
          <p className="text-stone-500 mt-3 max-w-xl mx-auto">From menu management to real-time order tracking, Ekodine has all the tools you need.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white rounded-2xl border p-6 hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <feature.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-stone-900">{feature.title}</h3>
              <p className="text-sm text-stone-500 mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-white border-y py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-stone-900">Simple, transparent pricing</h2>
            <p className="text-stone-500 mt-3">Start free and scale as your restaurant grows.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border-2 p-8 relative ${
                  plan.popular ? "border-primary ring-2 ring-primary ring-offset-4 shadow-xl" : "border-stone-200"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-xl font-bold text-stone-900">{plan.name}</h3>
                <div className="mt-3">
                  <span className="text-4xl font-bold text-stone-900">{plan.price}</span>
                  <span className="text-stone-500">/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-stone-600">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className={`block w-full mt-8 py-3 text-center font-semibold rounded-xl transition-colors ${
                    plan.popular
                      ? "bg-primary hover:bg-amber-600 text-white shadow-lg shadow-primary/25"
                      : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 rounded-3xl p-12 md:p-16 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiIGZpbGw9InJnYmEoMjQ1LDE1OCwxMSwwLjA4KSIvPjwvc3ZnPg==')] opacity-60" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-heading font-bold">Ready to transform your restaurant?</h2>
            <p className="text-stone-400 mt-3 max-w-lg mx-auto">
              Join 2,500+ restaurants already using Ekodine to streamline their operations.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 bg-primary hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-primary/30 text-lg"
            >
              Get Started for Free <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <ChefHat className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-stone-900">Ekodine</span>
          </div>
          <p className="text-sm text-stone-500">&copy; 2026 Ekodine. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
