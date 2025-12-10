'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Link from 'next/link';

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const shouldEnableDark = stored ? stored === 'dark' : prefersDark;
    root.classList.toggle('dark', shouldEnableDark);
    setDarkMode(shouldEnableDark);
  }, []);

  const toggleDarkMode = () => {
    if (typeof window === 'undefined') return;
    setDarkMode((prev) => {
      const next = !prev;
      const root = document.documentElement;
      if (next) {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '#features' },
    { name: 'Preview', href: '#preview' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  const shellClasses = isScrolled
    ? 'bg-white/90 dark:bg-gray-900/80 backdrop-blur border border-gray-200/70 dark:border-gray-800 shadow-lg'
    : 'bg-transparent';

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92vw] max-w-6xl rounded-2xl transition-all duration-300 ${shellClasses}`}
    >
      <div className="px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* --- App Name / Logo --- */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-2xl font-black tracking-tight text-gray-900 dark:text-gray-50"
            >
              MyOrbit
            </Link>
            <span className="hidden sm:inline-flex text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">
              Productivity App
            </span>
          </div>

          {/* --- Desktop Nav Items --- */}
          <div className="hidden md:flex items-center justify-center gap-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* --- Right Actions --- */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              aria-pressed={darkMode}
              className={`p-2 rounded-xl border transition shadow-sm ${
                darkMode
                  ? 'border-emerald-400 text-emerald-200 bg-emerald-500/10'
                  : 'border-gray-200 text-gray-700 hover:border-emerald-400 hover:text-emerald-500'
              } dark:border-gray-700 dark:text-gray-200`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link
              href="#contact"
              className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-semibold shadow-lg shadow-emerald-500/30 hover:opacity-90 transition"
            >
              Talk to us
            </Link>

            {/* --- Mobile Menu Button --- */}
            <button
              className="md:hidden p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile Sidebar Menu --- */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-b-2xl">
          <div className="flex flex-col space-y-4 px-6 py-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-800 dark:text-gray-100 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold text-center shadow-lg shadow-emerald-500/30"
            >
              Book a call
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
