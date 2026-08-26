// src/app/contact/page.js
import { MapPin, Phone, Mail } from 'lucide-react';
import { hotelInfo } from '@/data/hotelData';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with The Verandah — questions, planning a stay, or just say hello.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-semibold text-gray-900">Get in Touch</h1>
          <p className="text-gray-500 mt-4 max-w-md mx-auto">
            Have a question, or planning a stay? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: info */}
          <div className="space-y-8">
            <InfoRow icon={MapPin} label="Address" value={hotelInfo.address} />
            <InfoRow icon={Phone} label="Phone" value={hotelInfo.phone} />
            <InfoRow icon={Mail} label="Email" value={hotelInfo.email} />

            <div className="rounded-2xl overflow-hidden aspect-video mt-10">
              <iframe
                title="Location map"
                className="w-full h-full border-0"
                loading="lazy"
                src="https://www.google.com/maps?q=Shantiniketan,West+Bengal&output=embed"
              />
            </div>
          </div>

          {/* Right: form */}
          <ContactForm />
        </div>
      </div>
    </main>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-4">
      <span className="w-11 h-11 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
        <Icon size={18} className="text-white" />
      </span>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-gray-900 font-medium">{value}</p>
      </div>
    </div>
  );
}
