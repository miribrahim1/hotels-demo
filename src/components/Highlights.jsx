// src/components/Highlights.jsx
'use client';

import { motion } from 'framer-motion';
import { Wifi, Waves, UtensilsCrossed, Clock } from 'lucide-react';

const HIGHLIGHTS = [
  { icon: Wifi, title: 'Free WiFi', description: 'High-speed internet throughout' },
  { icon: Waves, title: 'Infinity Pool', description: 'Open sunrise to midnight' },
  { icon: UtensilsCrossed, title: 'Garden Dining', description: 'Evening barbeques under the stars' },
  { icon: Clock, title: '24/7 Service', description: 'Round-the-clock guest assistance' },
];

export default function Highlights() {
  return (
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {HIGHLIGHTS.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center gap-3"
          >
            <div className="w-14 h-14 rounded-full bg-gray-900 text-white flex items-center justify-center">
              <item.icon size={22} />
            </div>
            <h3 className="text-gray-900 font-semibold">{item.title}</h3>
            <p className="text-gray-500 text-sm">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}