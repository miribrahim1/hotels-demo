// src/components/Gallery.jsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { heroJourney } from '@/data/hotelData';

export default function Gallery() {
  const images = heroJourney; // reuse the same 5 images for now

  return (
    <section className="bg-gray-50 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-14"
        >
          <span className="text-sm font-medium text-gray-500 tracking-wide uppercase mb-2">
            Gallery
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold text-gray-900">
            A Glimpse Inside
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[220px] md:auto-rows-[260px]">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative overflow-hidden rounded-2xl group ${
                i === 0 ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <Image
                src={img.image}
                alt={img.title}
                fill
                sizes={i === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 50vw, 33vw'}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              <span className="absolute bottom-4 left-4 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {img.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}