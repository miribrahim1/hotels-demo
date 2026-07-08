// src/components/Navbar.jsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { hotelInfo } from '@/data/hotelData';

const NAV_LINKS = [
    { label: 'Rooms', href: '/rooms' },
    { label: 'Amenities', href: '/amenities' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const pathname = usePathname();
    const isHome = pathname === '/';

    const [scrolled, setScrolled] = useState(!isHome); // non-home pages start solid
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (!isHome) {
            setScrolled(true); // always solid on inner pages
            return;
        }

        const handleScroll = () => {
            const hero = document.getElementById('hero-section');
            if (!hero) {
                setScrolled(true);
                return;
            }
            setScrolled(hero.getBoundingClientRect().bottom <= 0);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHome]);

    return (
        <>
            <motion.nav
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-0 left-0 right-0 z-[100] px-5 pt-5"
            >
                <div
                    className={`max-w-6xl mx-auto flex items-center justify-between rounded-full px-6 transition-all duration-500 ${scrolled
                        ? 'bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] py-2.5 border border-black/[0.06]'
                        : 'bg-white/10 backdrop-blur-md border border-white/20 py-3.5'
                        }`}
                >
                    <a href="/" className="flex items-center gap-2 group">
                        <span
                            className={`grid place-items-center w-8 h-8 rounded-full transition-colors ${scrolled ? 'bg-gray-900' : 'bg-white/20'
                                }`}
                        >
                            <Sparkles
                                size={15}
                                className="text-white transition-transform duration-500 group-hover:rotate-180"
                            />
                        </span>
                        <span
                            className={`text-lg font-semibold tracking-tight transition-colors ${scrolled ? 'text-gray-900' : 'text-white'
                                }`}
                        >
                            {hotelInfo.name}
                        </span>
                    </a>

                    <div className="hidden md:flex items-center gap-1 relative">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'
                                    }`}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            className={`hidden md:inline-flex px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${scrolled
                                ? 'bg-gray-900 text-white hover:bg-gray-800'
                                : 'bg-white text-gray-900 hover:bg-gray-100'
                                }`}
                        >
                            Book Now
                        </button>
                        <button
                            onClick={() => setMenuOpen(true)}
                            className={`md:hidden transition-transform hover:scale-110 ${scrolled ? 'text-gray-900' : 'text-white'
                                }`}
                            aria-label="Open menu"
                        >
                            <Menu size={22} />
                        </button>
                    </div>
                </div>
            </motion.nav>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-white flex flex-col"
                    >
                        <div className="flex items-center justify-between px-5 py-5">
                            <span className="text-xl font-semibold text-gray-900">{hotelInfo.name}</span>
                            <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                                <X size={24} className="text-gray-900" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-2 px-5 mt-6">
                            {NAV_LINKS.map((link, i) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.06 }}
                                    className="text-3xl font-medium text-gray-900 py-2"
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                            <button className="mt-6 bg-gray-900 text-white px-6 py-3 rounded-full font-medium w-fit hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all">
                                Book Now
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}