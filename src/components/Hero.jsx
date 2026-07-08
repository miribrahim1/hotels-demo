// src/components/Hero.jsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { heroFinal, hotelInfo } from '@/data/hotelData';
import QuickSearchBar from './QuickSearchBar';

export default function Hero() {
  const [isNight, setIsNight] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouse.current = { x, y };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const loop = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.06;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.06;
      setOffset({ x: smooth.current.x, y: smooth.current.y });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section id="hero-section" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: 1 }}
        initial={{ scale: 1.15 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          x: offset.x * -18,
          y: offset.y * -12,
        }}
      >
        <img
          src={isNight ? heroFinal.night : heroFinal.day}
          alt={hotelInfo.name}
          className="w-full h-full object-cover scale-110 transition-opacity duration-700"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />

      {/* Foreground content */}
      <motion.div
        className="relative h-full w-full flex flex-col items-center justify-center text-center px-5 pt-16 pb-10"
        style={{
          x: offset.x * 8,
          y: offset.y * 6,
        }}
      >
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/70 text-sm tracking-[0.3em] uppercase mb-4"
        >
          Shantiniketan, West Bengal
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-white text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1.05] mb-6"
        >
          {hotelInfo.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/80 text-base md:text-lg max-w-md mb-8"
        >
          {hotelInfo.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-10"
        >
          <button className="bg-white text-gray-900 px-8 py-3.5 rounded-full font-medium hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all">
            Book Now
          </button>
          <button
            onClick={() => setIsNight((v) => !v)}
            className="border border-white/40 text-white px-6 py-3.5 rounded-full text-sm hover:bg-white/10 hover:scale-105 active:scale-95 transition-all"
          >
            {isNight ? '☀️ Day View' : '🌙 Night View'}
          </button>
        </motion.div>

        {/* Quick search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <QuickSearchBar />
        </motion.div>
      </motion.div>
    </section>
  );
}