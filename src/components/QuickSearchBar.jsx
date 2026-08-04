// src/components/QuickSearchBar.jsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Calendar, Users, Search, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];
const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function formatDate(date) {
    if (!date) return '';
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function MiniCalendar({ selected, onSelect, minDate }) {
  const [viewDate, setViewDate] = useState(selected || new Date());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isDisabled = (d) => {
    if (!minDate) return false;
    const cellDate = new Date(year, month, d);
    return cellDate < new Date(minDate.toDateString());
  };

  const isSelected = (d) =>
    selected &&
    selected.getDate() === d &&
    selected.getMonth() === month &&
    selected.getFullYear() === year;

  return (
    <div className="p-4 w-72">
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() => setViewDate(new Date(year, month - 1, 1))}
          className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
        >
          <ChevronLeft size={15} className="text-gray-600" />
        </button>
        <span className="text-sm font-semibold text-gray-900">
          {MONTH_NAMES[month]} {year}
        </span>
        <button
          type="button"
          onClick={() => setViewDate(new Date(year, month + 1, 1))}
          className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
        >
          <ChevronRight size={15} className="text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAY_LABELS.map((d, i) => (
          <span key={i} className="text-[11px] font-medium text-gray-400 text-center py-1">
            {d}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) =>
          d === null ? (
            <span key={i} />
          ) : (
            <button
              type="button"
              key={i}
              disabled={isDisabled(d)}
              onClick={() => onSelect(new Date(year, month, d))}
              className={`h-8 w-8 rounded-full text-sm font-semibold transition-colors ${
                isSelected(d)
                  ? 'bg-gray-900 text-white'
                  : isDisabled(d)
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {d}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default function QuickSearchBar() {
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const [guests, setGuests] = useState(2);

    const [openField, setOpenField] = useState(null); // 'checkIn' | 'checkOut' | 'guests' | null
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOpenField(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCheck = () => {
        const message = `Hi The Verandah! 👋 I'm planning a stay and would love to check availability.

📅 Check-in: ${checkIn ? formatDate(checkIn) : 'Not selected yet'}
📅 Check-out: ${checkOut ? formatDate(checkOut) : 'Not selected yet'}
👥 Guests: ${guests}

Could you let me know what's available for these dates?`;

        const whatsappNumber = '919635320549';
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    };

    return (
        <div
            ref={wrapperRef}
            className="w-full max-w-3xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl md:rounded-full p-3 flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-2 relative"
        >
            {/* Check-in */}
            <div className="relative flex-1">
                <div
                    onClick={() => setOpenField(openField === 'checkIn' ? null : 'checkIn')}
                    className="flex items-center gap-3 px-4 py-2 cursor-pointer rounded-xl hover:bg-white/10 transition-colors"
                >
                    <Calendar size={16} className="text-white/60 shrink-0" />
                    <div className="flex-1">
                        <p className="text-xs font-semibold text-white/60">Check-in</p>
                        <p className="text-sm font-semibold text-white">
                            {checkIn ? formatDate(checkIn) : 'Add date'}
                        </p>
                    </div>
                </div>

                {openField === 'checkIn' && (
                    <div className="absolute top-[calc(100%+8px)] left-0 bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.2)] z-50">
                        <MiniCalendar
                            selected={checkIn}
                            minDate={new Date()}
                            onSelect={(d) => {
                                setCheckIn(d);
                                setOpenField(null);
                            }}
                        />
                    </div>
                )}
            </div>

            <div className="hidden md:block w-px h-8 bg-white/20" />

            {/* Check-out */}
            <div className="relative flex-1">
                <div
                    onClick={() => setOpenField(openField === 'checkOut' ? null : 'checkOut')}
                    className="flex items-center gap-3 px-4 py-2 cursor-pointer rounded-xl hover:bg-white/10 transition-colors"
                >
                    <Calendar size={16} className="text-white/60 shrink-0" />
                    <div className="flex-1">
                        <p className="text-xs font-semibold text-white/60">Check-out</p>
                        <p className="text-sm font-semibold text-white">
                            {checkOut ? formatDate(checkOut) : 'Add date'}
                        </p>
                    </div>
                </div>

                {openField === 'checkOut' && (
                    <div className="absolute top-[calc(100%+8px)] left-0 bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.2)] z-50">
                        <MiniCalendar
                            selected={checkOut}
                            minDate={checkIn || new Date()}
                            onSelect={(d) => {
                                setCheckOut(d);
                                setOpenField(null);
                            }}
                        />
                    </div>
                )}
            </div>

            <div className="hidden md:block w-px h-8 bg-white/20" />

            {/* Guests */}
            <div className="relative flex-1">
                <div
                    onClick={() => setOpenField(openField === 'guests' ? null : 'guests')}
                    className="flex items-center gap-3 px-4 py-2 cursor-pointer rounded-xl hover:bg-white/10 transition-colors"
                >
                    <Users size={16} className="text-white/60 shrink-0" />
                    <div className="flex-1">
                        <p className="text-xs font-semibold text-white/60">Guests</p>
                        <p className="text-sm font-semibold text-white">
                            {guests} {guests === 1 ? 'Guest' : 'Guests'}
                        </p>
                    </div>
                </div>

                {openField === 'guests' && (
                    <div className="absolute top-[calc(100%+8px)] left-0 right-0 md:left-auto md:right-0 md:w-56 bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.2)] p-4 z-50">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-900">Guests</span>
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                >
                                    <Minus size={14} className="text-gray-700" />
                                </button>
                                <span className="text-sm font-semibold text-gray-900 w-4 text-center">
                                    {guests}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setGuests((g) => Math.min(10, g + 1))}
                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                >
                                    <Plus size={14} className="text-gray-700" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <button
                onClick={handleCheck}
                className="bg-white text-gray-900 px-6 py-3.5 rounded-full font-semibold text-sm hover:bg-gray-100 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
                <Search size={16} />
                Check Availability
            </button>
        </div>
    );
}