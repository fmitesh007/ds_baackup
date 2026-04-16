'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = theme === 'dark' || !theme;

  if (!mounted) return null;

  return (
    <>
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? isDark 
              ? 'bg-[#0a0a0f]/90 backdrop-blur-xl border-white/10' 
              : 'bg-[#f8fafc]/90 backdrop-blur-xl border-black/5'
            : 'bg-transparent border-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <motion.a 
              href="/" 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 flex items-center justify-center accent-gradient">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                  <path d="M8 16L12 20L24 8" stroke="white" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter"/>
                </svg>
              </div>
              <span className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>DATASCON</span>
            </motion.a>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className={`px-5 py-2 text-sm font-medium transition-colors relative ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                  whileHover="hover"
                >
                  {link.label}
                  <motion.div 
                    className="absolute bottom-0 left-5 right-5 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`w-10 h-10 flex items-center justify-center border transition-colors ${
                  isDark 
                    ? 'bg-white/5 border-white/10 hover:border-indigo-500' 
                    : 'bg-black/5 border-black/10 hover:border-indigo-500'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-indigo-600" />
                )}
              </motion.button>

              <motion.button
                className="hidden lg:block px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold text-sm tracking-wide hover:shadow-lg hover:shadow-indigo-500/25"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                GET STARTED
              </motion.button>

              <button 
                className="lg:hidden w-10 h-10 flex items-center justify-center"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className={`w-6 h-6 ${isDark ? 'text-white' : 'text-slate-900'}`} /> : <Menu className={`w-6 h-6 ${isDark ? 'text-white' : 'text-slate-900'}`} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className={`absolute top-0 right-0 w-72 h-full backdrop-blur-xl border-l ${
                isDark 
                  ? 'bg-[#0a0a0f]/95 border-white/10' 
                  : 'bg-[#f8fafc]/95 border-black/10'
              }`}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="p-6">
                <div className="flex justify-end mb-8">
                  <button onClick={() => setMobileOpen(false)}>
                    <X className={`w-6 h-6 ${isDark ? 'text-white' : 'text-slate-900'}`} />
                  </button>
                </div>
                <nav className="space-y-2">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      className={`block px-4 py-3 text-lg font-medium ${
                        isDark 
                          ? 'text-slate-300 hover:text-white hover:bg-white/5' 
                          : 'text-slate-700 hover:text-slate-900 hover:bg-black/5'
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}