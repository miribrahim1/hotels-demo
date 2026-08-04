// src/components/RoomsPreview.jsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
// import { rooms } from '@/data/hotelData';

export default function RoomsPreview({ rooms }) {
  const [featured, ...rest] = rooms;

  return (
    <section className="bg-gray-50 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4"
        >
          <div>
            <span className="text-sm font-medium text-gray-500 tracking-wide uppercase mb-2 block">
              Accommodations
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold text-gray-900">
              Rooms Designed for Rest
            </h2>
          </div>
          <Link
            href="/rooms"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-gray-900 border-b border-gray-900 pb-0.5 hover:gap-3 transition-all w-fit"
          >
            View All Rooms →
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Featured large card */}
          <RoomCard room={featured} index={0} large />

          {/* Two smaller stacked cards */}
          <div className="grid grid-rows-2 gap-6">
            {rest.map((room, i) => (
              <RoomCard key={room.slug} room={room} index={i + 1} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex md:hidden justify-center mt-10"
        >
          <Link
            href="/rooms"
            className="bg-gray-900 text-white px-7 py-3 rounded-full font-medium text-sm hover:bg-gray-800 transition-all"
          >
            View All Rooms
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function RoomCard({ room, index, large = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Link href={`/rooms/${room.slug}`} className="block h-full">
        <div
          className={`relative overflow-hidden rounded-2xl ${
            large ? 'aspect-[4/5] md:h-full' : 'aspect-[16/9]'
          }`}
        >
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Index number */}
          <span className="absolute top-5 left-5 text-white/70 text-sm font-mono">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Capacity pill */}
          <span className="absolute top-5 right-5 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium px-3 py-1.5 rounded-full">
            {room.capacity}
          </span>

          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            <div className="flex items-end justify-between mb-2">
              <h3 className="text-white text-xl md:text-2xl font-semibold">{room.name}</h3>
              <p className="text-white text-lg font-semibold whitespace-nowrap ml-4">
                ₹{room.price.toLocaleString('en-IN')}
                <span className="text-white/60 text-xs font-normal">/night</span>
              </p>
            </div>

            {/* Amenities reveal on hover */}
            <div className="flex flex-wrap gap-2 max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
              {room.amenities.slice(0, 3).map((a) => (
                <span
                  key={a}
                  className="text-xs text-white/90 border border-white/30 rounded-full px-2.5 py-1"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}