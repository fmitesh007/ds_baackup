'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

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
        <div className="grid lg:grid-cols-1 gap-12 items-center">
          <motion.div style={{ opacity, scale }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className={`inline-flex items-center gap-2 px-4 py-2 glass rounded-sm mb-8`}>
                <Sparkles className={`w-4 h-4 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
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