'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Max Newcomer",
    role: "Founder",
    company: "Mimir",
    companyUrl: "https://www.mimirml.com/",
    img: "/MAX.jpg",
    text: "Datascon delivered an exceptional product that exceeded our expectations. Their technical expertise and commitment to quality are unmatched."
  },
  {
    name: "Firas AlMohasen",
    role: "Founder",
    company: "Sinbad HQ",
    companyUrl: "https://sinbadhq.com/",
    img: "/Firas.jpg",
    text: "Working with Datascon was a game-changer for our startup. They understood our vision and brought it to life beautifully."
  },
  {
    name: "Ollie Martynov",
    role: "Founder",
    company: "Text to Design",
    companyUrl: "https://www.texttodesign.ai/",
    img: "/Olesky.jpg",
    text: "Pruthviraj has been amazing to work with; he completed the project quickly and went above and beyond, with excellent documentation."
  },
  {
    name: "Timothy Lim",
    role: "Head of Engineering",
    company: "interintellect",
    companyUrl: "https://interintellect.com/",
    img: "/Timothy-Lim.jpg",
    text: "It's been a pleasure working with this team. Quick, professional, and highly skilled. Would definitely recommend!"
  },
  {
    name: "Davey Morse",
    role: "Founder",
    company: "Plexus",
    companyUrl: "https://plexus.earth/",
    img: "/Davey.jpg",
    text: "The team's attention to detail and problem-solving skills are exceptional. They delivered a robust solution on time."
  },
  {
    name: "Alistair Pullen",
    role: "Co-Founder",
    company: "Cosine (YC W23)",
    companyUrl: "https://cosine.sh/",
    img: "/Alistair.jpg",
    text: "Outstanding work from the Datascon team. Their expertise in modern technologies helped us launch faster."
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isDark = !mounted || theme === 'dark' || !theme;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);
  
  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const current = testimonials[activeIndex];

  if (!mounted) return null;

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[150px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            What Our <span className="text-accent">Clients Say</span>
          </h2>
        </motion.div>

        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className={`p-8 md:p-12 ${isDark ? 'glass border-l-4 border-indigo-500' : 'bg-white border border-black/10 border-l-4 border-indigo-500'}`}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <Quote className={`w-12 h-12 ${isDark ? 'text-indigo-500/30' : 'text-indigo-500/20'}`} />
              </motion.div>
              
              <motion.p 
                className={`text-xl md:text-2xl font-medium leading-relaxed mb-8 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                "{current.text}"
              </motion.p>

              <motion.div 
                className="flex items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="w-16 h-16 rounded-none border-2 border-indigo-500 overflow-hidden shadow-lg">
                  <img 
                    src={current.img} 
                    alt={current.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(current.name)}&background=6366f1&color=fff`;
                    }}
                  />
                </div>
                <div>
                  <h4 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{current.name}</h4>
                  <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                    <span className="text-indigo-500">{current.role}</span> at <a href={current.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition-colors">{current.company}</a>
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className="relative h-1 bg-transparent flex items-center"
                  style={{ width: index === activeIndex ? '40px' : '12px' }}
                >
                  <div className={`absolute inset-0 ${isDark ? 'bg-white/20' : 'bg-slate-300'}`}></div>
                  {index === activeIndex && (
                    <motion.div 
                      className="absolute inset-0 bg-indigo-500"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 3, ease: 'linear' }}
                      style={{ animation: isPaused ? 'none' : undefined }}
                    />
                  )}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={prevSlide}
                className={`w-12 h-12 flex items-center justify-center border transition-colors ${isDark ? 'border-white/10 hover:border-indigo-500 hover:bg-indigo-500/10' : 'border-black/10 hover:border-indigo-500'}`}
              >
                <ChevronLeft className={`w-5 h-5 ${isDark ? 'text-white' : 'text-slate-900'}`} />
              </button>
              <button 
                onClick={nextSlide}
                className={`w-12 h-12 flex items-center justify-center border transition-colors ${isDark ? 'border-white/10 hover:border-indigo-500 hover:bg-indigo-500/10' : 'border-black/10 hover:border-indigo-500'}`}
              >
                <ChevronRight className={`w-5 h-5 ${isDark ? 'text-white' : 'text-slate-900'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}