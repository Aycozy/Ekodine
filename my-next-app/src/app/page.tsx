import Link from 'next/link';
import { CheckCircle2, ArrowRight, MapPin, Clock } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-blue-50 pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-primary-700 text-sm font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              Accepting New Patients
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Restore Movement. <br />
              <span className="text-primary-600">Reclaim Your Life.</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
              Expert physiotherapy in Lagos. We treat the root cause of your pain with modern manual therapy and rehabilitation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="inline-flex justify-center items-center px-8 py-4 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition shadow-xl shadow-blue-500/20">
                Book Your Assessment
              </Link>
              <Link href="/services" className="inline-flex justify-center items-center px-8 py-4 bg-white text-gray-700 font-bold rounded-lg border border-gray-200 hover:border-gray-300 transition">
                View Services
              </Link>
            </div>

            {/* Trust Signals */}
            <div className="pt-8 flex items-center gap-6 text-sm font-medium text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary-500" />
                Licensed Pros
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary-500" />
                Insurance Accepted
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary-500" />
                Home Visits
              </div>
            </div>
          </div>

          {/* Hero Image / Graphic */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-cyan-400 rounded-2xl blur-2xl opacity-20"></div>
            <div className="relative bg-gray-200 rounded-2xl aspect-[4/3] overflow-hidden">
              {/* Replace with actual clinic image */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Comprehensive Care</h2>
            <p className="mt-4 text-gray-600">Specialized treatments tailored to your recovery goals.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Sports Rehabilitation", desc: "Return to play faster with targeted performance recovery." },
              { title: "Manual Therapy", desc: "Hands-on treatment to mobilize joints and reduce soft tissue pain." },
              { title: "Post-Op Rehab", desc: "Structured recovery plans following surgical procedures." },
            ].map((service, i) => (
              <div key={i} className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary-200 hover:shadow-lg transition group">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition">{service.title}</h3>
                <p className="mt-3 text-gray-600">{service.desc}</p>
                <Link href="/services" className="mt-6 inline-flex items-center text-primary-600 font-semibold text-sm">
                  Learn more <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logistics / Location Preview */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary-400" /> Opening Hours
            </h3>
            <ul className="space-y-2 text-primary-100">
              <li className="flex justify-between"><span>Mon - Fri</span> <span>8:00 AM - 6:00 PM</span></li>
              <li className="flex justify-between"><span>Saturday</span> <span>9:00 AM - 2:00 PM</span></li>
              <li className="flex justify-between"><span>Sunday</span> <span>Closed</span></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary-400" /> Our Location
            </h3>
            <p className="text-primary-100 mb-4">
              Available for home visits and at our clinic in Lagos.
            </p>
            <Link href="/contact" className="text-white underline decoration-primary-400 underline-offset-4 hover:text-primary-200">
              Get Directions
            </Link>
          </div>
          <div className="bg-primary-800 p-6 rounded-xl">
            <h3 className="text-lg font-bold mb-2">Ready to feel better?</h3>
            <p className="text-primary-200 text-sm mb-4">Book your initial consultation today.</p>
            <Link href="/contact" className="block w-full text-center bg-white text-primary-900 font-bold py-3 rounded-lg hover:bg-gray-50 transition">
              Book Appointment
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}