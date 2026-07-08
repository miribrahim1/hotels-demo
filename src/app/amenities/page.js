// src/app/amenities/page.js
import { Wifi, Waves, UtensilsCrossed, Clock, Sparkles, Car } from 'lucide-react';
import { amenitiesList, heroJourney } from '@/data/hotelData';

const ICONS = [Wifi, Waves, UtensilsCrossed, Clock, Sparkles, Car];

export default function AmenitiesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Page header */}
      <div className="pt-40 pb-20 px-6 text-center">
        <span className="text-gray-400 text-sm tracking-[0.3em] uppercase mb-4 block">
          The Verandah
        </span>
        <h1 className="text-gray-900 text-6xl md:text-8xl font-semibold tracking-tight">
          Amenities
        </h1>
      </div>

      {/* Alternating rows */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        {amenitiesList.map((item, i) => {
          const Icon = ICONS[i % ICONS.length];
          const img = heroJourney[i % heroJourney.length];
          const reversed = i % 2 !== 0;

          return (
            <div
              key={item.title}
              className={`flex flex-col md:flex-row ${
                reversed ? 'md:flex-row-reverse' : ''
              } items-center gap-8 md:gap-16 py-14 border-b border-gray-100`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src={img.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="w-full md:w-1/2 flex flex-col items-start">
                <span className="text-gray-300 font-mono text-sm mb-4">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="w-11 h-11 rounded-full bg-gray-900 flex items-center justify-center mb-6">
                  <Icon size={18} className="text-white" />
                </div>
                <h2 className="text-gray-900 text-3xl md:text-4xl font-semibold mb-4">
                  {item.title}
                </h2>
                <p className="text-gray-500 text-base leading-relaxed max-w-sm">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}