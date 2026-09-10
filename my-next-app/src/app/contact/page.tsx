import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">

        {/* Contact Info */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Get in Touch</h1>
          <p className="text-lg text-gray-600 mb-8">
            Fill out the form to request an appointment. We will call you back within 2 hours to confirm a time slot.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary-100 p-3 rounded-lg text-primary-600">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Phone</h3>
                <p className="text-gray-600">0802 333 1387</p>
                <p className="text-sm text-gray-500">Call for immediate assistance.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary-100 p-3 rounded-lg text-primary-600">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Service Area</h3>
                <p className="text-gray-600">Lagos, Nigeria</p>
                <p className="text-sm text-gray-500">Clinic appointments & Home Service available.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition" placeholder="Jane" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition" placeholder="Doe" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition" placeholder="080..." />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit</label>
              <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition">
                <option>Back Pain</option>
                <option>Sports Injury</option>
                <option>Post-Surgery Rehab</option>
                <option>General Checkup</option>
                <option>Other</option>
              </select>
            </div>

            <button type="submit" className="w-full bg-primary-600 text-white font-bold py-4 rounded-lg hover:bg-primary-700 transition">
              Request Appointment
            </button>
            <p className="text-xs text-center text-gray-500">
              Your information is secure. We will contact you shortly.
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}