// src/components/Footer.jsx
import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
import { hotelInfo } from '@/data/hotelData';
import { isDemo } from '@/lib/site-config.mjs';

const QUICK_LINKS = [
  { label: 'Rooms', href: '/rooms' },
  { label: 'Amenities', href: '/amenities' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-semibold mb-3">{hotelInfo.name}</h3>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              {hotelInfo.description}
            </p>
            {isDemo && <p className="mt-5 text-sm text-white/70">Portfolio concept by @codebymir. Sample hotel details, imagery and guest reviews; no real reservations.</p>}
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wide mb-4">
              Explore
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wide mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>{hotelInfo.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0" />
                <span>{hotelInfo.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0" />
                <span>{hotelInfo.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} {hotelInfo.name}. All rights reserved.</p>
          <a href="https://github.com/miribrahim1" target="_blank" rel="noopener noreferrer" className="hover:text-white underline underline-offset-4">Designed & built by @codebymir</a>
        </div>
      </div>
    </footer>
  );
}