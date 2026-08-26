// src/components/PageLoader.jsx
'use client';

import { useEffect, useState } from 'react';
import { hotelInfo } from '@/data/hotelData';

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const hide = () => {
      setFading(true);
      setTimeout(() => setVisible(false), 500);
    };

    // Wait for everything (including the large hero images) to finish
    // loading, with a short buffer so the fade never feels abrupt.
    const onLoad = () => setTimeout(hide, 300);

    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad);
    }

    // Safety net so the loader never gets stuck if something stalls.
    const fallback = setTimeout(hide, 5000);

    return () => {
      window.removeEventListener('load', onLoad);
      clearTimeout(fallback);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-5 bg-gray-950 transition-opacity duration-500 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <p className="text-white text-2xl md:text-3xl font-semibold tracking-wide">
        {hotelInfo.name}
      </p>
      <div className="w-9 h-9 border-2 border-white/20 border-t-white rounded-full animate-spin" />
    </div>
  );
}
