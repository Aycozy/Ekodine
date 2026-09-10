import Link from 'next/link';
import { Phone, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Assuming a simple button component or standard HTML button

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary-600 text-white p-2 rounded-lg">
              <span className="font-bold text-xl">P</span>
            </div>
            <span className="font-bold text-2xl text-gray-900 tracking-tight">Premcare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-gray-600 hover:text-primary-600 font-medium transition">About Us</Link>
            <Link href="/services" className="text-gray-600 hover:text-primary-600 font-medium transition">Services</Link>
            <Link href="/conditions" className="text-gray-600 hover:text-primary-600 font-medium transition">Conditions</Link>
            <Link href="/new-patients" className="text-gray-600 hover:text-primary-600 font-medium transition">New Patients</Link>
          </div>

          {/* CTA & Contact */}
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:08023331387" className="flex items-center gap-2 text-gray-600 hover:text-primary-600">
              <Phone className="w-4 h-4" />
              <span className="font-medium">Call Us</span>
            </a>
            <Link href="/contact" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-full font-semibold transition shadow-lg shadow-primary-500/30">
              Book Appointment
            </Link>
          </div>

          {/* Mobile Menu Trigger (Implementation required) */}
          <div className="md:hidden">
            <Menu className="w-6 h-6 text-gray-600" />
          </div>
        </div>
      </div>
    </nav>
  );
}