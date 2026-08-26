
'use client';

import { motion } from 'framer-motion';
import { Wifi, Waves, UtensilsCrossed, Clock, Sparkles, Car } from 'lucide-react';


const ICONS = [Wifi, Waves, UtensilsCrossed, Clock, Sparkles, Car];

export default function Amenities({ amenitiesList }) {
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
            Amenities
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold text-gray-900">
            Everything You Need, Nothing You Don&apos;t
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {amenitiesList.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group bg-gray-50 rounded-2xl p-6 md:p-8 hover:bg-gray-900 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-5 group-hover:bg-white/10 transition-colors duration-300">
                  <Icon size={20} className="text-gray-900 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-gray-900 group-hover:text-white font-semibold mb-1.5 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-500 group-hover:text-white/70 text-sm transition-colors duration-300">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}