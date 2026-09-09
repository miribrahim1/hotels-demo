'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Users, Search } from 'lucide-react';
import { hotelToday, nextDate, validateStay } from '@/lib/validation.mjs';

export default function QuickSearchBar() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [errors, setErrors] = useState({});

  const handleCheck = (event) => {
    event.preventDefault();
    const validation = validateStay({ checkIn, checkOut, guests });
    setErrors(validation);
    if (Object.keys(validation).length) return;
    const query = new URLSearchParams({ checkIn, checkOut, guests });
    router.push(`/?${query.toString()}#booking`);
  };

  return (
    <form noValidate onSubmit={handleCheck} className="w-full max-w-3xl mx-auto">
      <div className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl md:rounded-full p-3 grid grid-cols-2 md:grid-cols-[1fr_1fr_0.7fr_auto] items-center gap-3">
        <label htmlFor="search-check-in" className="min-w-0 px-2 text-left">
          <span className="flex gap-2 items-center text-xs font-medium text-white/80 mb-1"><Calendar size={14} /> Check-in</span>
          <input id="search-check-in" type="date" value={checkIn} min={hotelToday()} aria-invalid={!!errors.checkIn} aria-describedby={errors.checkIn ? 'search-errors' : undefined} onChange={(e) => { setCheckIn(e.target.value); if (checkOut <= e.target.value) setCheckOut(''); setErrors({}); }} className="block w-full min-w-0 bg-transparent text-white text-sm [color-scheme:dark]" />
        </label>
        <label htmlFor="search-check-out" className="min-w-0 px-2 text-left">
          <span className="flex gap-2 items-center text-xs font-medium text-white/80 mb-1"><Calendar size={14} /> Check-out</span>
          <input id="search-check-out" type="date" value={checkOut} min={nextDate(checkIn || hotelToday())} aria-invalid={!!errors.checkOut} aria-describedby={errors.checkOut ? 'search-errors' : undefined} onChange={(e) => { setCheckOut(e.target.value); setErrors({}); }} className="block w-full min-w-0 bg-transparent text-white text-sm [color-scheme:dark]" />
        </label>
        <label htmlFor="search-guests" className="min-w-0 px-2 text-left">
          <span className="flex gap-2 items-center text-xs font-medium text-white/80 mb-1"><Users size={14} /> Guests</span>
          <select id="search-guests" value={guests} onChange={(e) => setGuests(e.target.value)} className="w-full bg-transparent text-white text-sm [color-scheme:dark]">
            {Array.from({ length: 10 }, (_, i) => <option key={i + 1} value={i + 1} className="bg-gray-900">{i + 1} {i ? 'Guests' : 'Guest'}</option>)}
          </select>
        </label>
        <button type="submit" className="bg-white text-gray-900 px-4 py-3.5 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
          <Search size={16} className="shrink-0" /> Plan Your Stay
        </button>
      </div>
      {Object.keys(errors).length > 0 && <p id="search-errors" role="alert" className="mt-3 text-sm text-white bg-red-950/80 rounded-xl p-3">{Object.values(errors).join(' ')}</p>}
    </form>
  );
}
