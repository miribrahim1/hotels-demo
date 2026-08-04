
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export default function Testimonials({ testimonials }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[index];

  return (
    <section className="bg-gray-900 py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-10"
        >
          <span className="text-sm font-medium text-white/50 tracking-wide uppercase mb-2">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold text-white">What Guests Say</h2>
        </motion.div>

        <div className="relative min-h-[220px] flex items-center justify-center">
          <Quote className="absolute -top-4 left-1/2 -translate-x-1/2 text-white/10" size={64} />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              <div className="flex justify-center gap-1 mb-5">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-white text-xl md:text-2xl font-medium leading-relaxed mb-6">
                "{current.quote}"
              </p>

              <p className="text-white/60 text-sm">
                {current.name} <span className="text-white/40">— {current.location}</span>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}