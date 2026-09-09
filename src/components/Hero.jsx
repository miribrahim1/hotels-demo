// src/components/Hero.jsx
'use client';

import { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { isDemo } from '@/lib/site-config.mjs';
import Link from 'next/link';
import Image from 'next/image';
import { heroFinal, hotelInfo } from '@/data/hotelData';
import QuickSearchBar from './QuickSearchBar';

export default function Hero() {
  const [isNight, setIsNight] = useState(false);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 70, damping: 25 });
  const smoothY = useSpring(pointerY, { stiffness: 70, damping: 25 });
  const backgroundX = useTransform(smoothX, (value) => value * -18);
  const backgroundY = useTransform(smoothY, (value) => value * -12);

  const move = (event) => {
    if (reduceMotion || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
  };

  return (
    <section id="hero-section" onPointerMove={move} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }} className="relative min-h-[max(680px,100svh)] w-full overflow-hidden bg-black">
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: 1 }}
        initial={{ scale: 1.15 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          x: backgroundX,
          y: backgroundY,
        }}
      >
        <Image
          src={isNight ? heroFinal.night : heroFinal.day}
          alt={hotelInfo.name}
          fill
          priority
          sizes="100vw"
          className="object-cover scale-110 transition-opacity duration-700"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />

      {/* Foreground content */}
      <motion.div
        className="relative min-h-[max(680px,100svh)] w-full flex flex-col items-center justify-center text-center px-5 pt-32 pb-12"
      >
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/70 text-sm tracking-[0.3em] uppercase mb-4"
        >
          {isDemo ? 'Boutique Hotel · Portfolio Concept' : 'Shantiniketan, West Bengal'}
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
          className="flex flex-wrap justify-center items-center gap-3 mb-10"
        >
          <Link
            href="/#booking"
            className="bg-white text-gray-900 px-8 py-3.5 rounded-full font-medium hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all"
          >
            Book Now
          </Link>
          <button
            aria-pressed={isNight}
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