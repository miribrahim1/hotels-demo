// src/app/gallery/page.js
import { heroJourney } from '@/data/hotelData';

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-semibold text-gray-900">Gallery</h1>
          <p className="text-gray-500 mt-4 max-w-md mx-auto">
            A closer look at The Verandah — from the entrance to the evenings by the pool.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[220px] md:auto-rows-[280px]">
          {heroJourney.map((img, i) => (
            <div
              key={img.id}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${
                i === 0 ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <img
                src={img.image}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              <span className="absolute bottom-4 left-4 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {img.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}