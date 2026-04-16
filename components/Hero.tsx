'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  useEffect(() => setMounted(true), []);

  const isDark = !mounted || theme === 'dark' || !theme;
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  if (!mounted) return null;

  return (
    <section id="hero" ref={containerRef} className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y }}
      >
        <motion.div 
          className={`absolute inset-0 ${isDark ? 'bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.08)_0%,_transparent_70%)]' : 'bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.05)_0%,_transparent_70%)]'}`}
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div 
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] ${isDark ? 'bg-indigo-600/20' : 'bg-indigo-500/15'}`}
          animate={{ 
            x: [0, 30, 0], 
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div 
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] ${isDark ? 'bg-cyan-500/20' : 'bg-cyan-400/15'}`}
          animate={{ 
            x: [0, -40, 0], 
            y: [0, 30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        <motion.div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] ${isDark ? 'bg-purple-500/10' : 'bg-purple-400/10'}`}
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div style={{ opacity, scale }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className={`inline-flex items-center gap-2 px-4 py-2 glass rounded-sm mb-8`}>
                <span className={`text-sm font-medium uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Engineering the Future</span>
              </div>
            </motion.div>

            <motion.h1 
              className={`text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Empowering
              <br />
              <span className="text-accent">Innovative Ideas</span>
              <br />
              with Solutions
            </motion.h1>

            <motion.p 
              className={`text-lg md:text-xl max-w-2xl mb-10 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              We transform complex business requirements into high-performance digital ecosystems. 
              Let's collaborate and build products that deliver awe-inspiring experiences.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold uppercase tracking-widest text-sm"
                whileHover={{ scale: 1.02, boxShadow: '0 0 50px rgba(99, 102, 241, 0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                Get In Touch
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#services"
                className={`inline-flex items-center gap-3 px-8 py-4 border-2 font-bold uppercase tracking-widest text-sm transition-colors ${
                  isDark 
                    ? 'border-white/20 text-slate-300 hover:border-indigo-500 hover:text-white' 
                    : 'border-slate-300 text-slate-700 hover:border-indigo-500 hover:text-slate-900'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Our Services
              </motion.a>
            </motion.div>

            <motion.div 
              className="flex flex-wrap gap-12 mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {[
                { num: '50+', label: 'Projects' },
                { num: '5+', label: 'Years' },
                { num: '30+', label: 'Clients' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
                >
                  <div className={`text-4xl md:text-5xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{stat.num}</div>
                  <div className={`text-sm uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              className="relative cursor-pointer group"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{ 
                  boxShadow: ['0 0 20px rgba(255,200,100,0.3)', '0 0 60px rgba(255,200,100,0.6)', '0 0 20px rgba(255,200,100,0.3)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <svg viewBox="0 0 200 300" className="w-48 h-72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="100" cy="220" rx="35" ry="8" fill="#2a2a2a"/>
                <rect x="85" y="195" width="30" height="25" rx="2" fill="#4a4a4a"/>
                <rect x="90" y="175" width="20" height="22" rx="1" fill="#5a5a5a"/>
                <path d="M75 95 C75 50 85 35 100 35 C115 35 125 50 125 95 C125 115 115 130 100 130 C85 130 75 115 75 95Z" fill="#f5f5f5" stroke="#e0e0e0" strokeWidth="1" opacity="0.9"/>
                <path d="M80 90 C80 55 88 42 100 42 C112 42 120 55 120 90 C120 105 112 118 100 118 C88 118 80 105 80 90Z" fill="#fff8e0" opacity="0.8"/>
                <path d="M85 85 C85 58 91 48 100 48 C109 48 115 58 115 85" stroke="#ffb347" strokeWidth="1" opacity="0.6"/>
                <path d="M88 80 C88 62 93 52 100 52 C107 52 112 62 112 80" stroke="#ffd080" strokeWidth="1" opacity="0.4"/>
                <path d="M90 75 C90 65 94 58 100 58 C106 58 110 65 110 75" stroke="#ffe0a0" strokeWidth="0.5" opacity="0.3"/>
                <path d="M95 90 C95 75 97 65 100 65 C103 65 105 75 105 90" stroke="#ffb347" strokeWidth="1.5" opacity="0.5"/>
                <path d="M92 100 C92 88 95 78 100 78 C105 78 108 88 108 100" stroke="#ffb347" strokeWidth="1" opacity="0.4"/>
                <circle cx="100" cy="90" r="3" fill="#ffe0a0" opacity="0.6"/>
                <rect x="88" y="195" width="24" height="3" rx="1" fill="#3a3a3a"/>
                <rect x="91" y="190" width="18" height="6" rx="1" fill="#4a4a4a"/>
                <ellipse cx="100" cy="50" rx="2" ry="3" fill="#ffd080" opacity="0.5"/>
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className={`w-6 h-10 rounded-full border-2 flex justify-center pt-2 ${isDark ? 'border-white/30' : 'border-slate-400/50'}`}>
          <motion.div 
            className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-white/50' : 'bg-slate-500'}`}
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}