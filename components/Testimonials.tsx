'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: "Max Newcomer",
    role: "Founder",
    company: "Mimir",
    companyUrl: "https://www.mimirml.com/",
    img: "https://raw.githubusercontent.com/pruthvirajjadhav1/Datascon-Site/main/public/MAX.jpg",
    text: "Datascon delivered an exceptional product that exceeded our expectations. Their technical expertise and commitment to quality are unmatched."
  },
  {
    name: "Firas AlMohasen",
    role: "Founder",
    company: "Sinbad HQ",
    companyUrl: "https://sinbadhq.com/",
    img: "https://raw.githubusercontent.com/pruthvirajjadhav1/Datascon-Site/main/public/Firas.jpg",
    text: "Working with Datascon was a game-changer for our startup. They understood our vision and brought it to life beautifully."
  },
  {
    name: "Ollie Martynov",
    role: "Founder",
    company: "Text to Design",
    companyUrl: "https://www.texttodesign.ai/",
    img: "https://raw.githubusercontent.com/pruthvirajjadhav1/Datascon-Site/main/public/Olesky.jpg",
    text: "Pruthviraj has been amazing to work with; he completed the project quickly and went above and beyond, with excellent documentation."
  },
  {
    name: "Timothy Lim",
    role: "Head of Engineering",
    company: "interintellect",
    companyUrl: "https://interintellect.com/",
    img: "https://raw.githubusercontent.com/pruthvirajjadhav1/Datascon-Site/main/public/Timothy-Lim.jpg",
    text: "It's been a pleasure working with this team. Quick, professional, and highly skilled. Would definitely recommend!"
  },
  {
    name: "Davey Morse",
    role: "Founder",
    company: "Plexus",
    companyUrl: "https://plexus.earth/",
    img: "https://raw.githubusercontent.com/pruthvirajjadhav1/Datascon-Site/main/public/Davey.jpg",
    text: "The team's attention to detail and problem-solving skills are exceptional. They delivered a robust solution on time."
  },
  {
    name: "Alistair Pullen",
    role: "Co-Founder",
    company: "Cosine (YC W23)",
    companyUrl: "https://cosine.sh/",
    img: "https://raw.githubusercontent.com/pruthvirajjadhav1/Datascon-Site/main/public/Alistair.jpg",
    text: "Outstanding work from the Datascon team. Their expertise in modern technologies helped us launch faster."
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isDark = !mounted || theme === 'dark' || !theme;

  if (!mounted) return null;

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const current = testimonials[activeIndex];

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[150px]"></div>
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

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className={`p-8 md:p-12 ${isDark ? 'glass border-l-4 border-indigo-500' : 'bg-white border border-black/10 border-l-4 border-indigo-500'}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <p className={`text-xl md:text-2xl font-medium leading-relaxed mb-8 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                "{current.text}"
              </p>

              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full border-2 border-indigo-500 overflow-hidden shadow-lg">
                  <img 
                    src={current.img} 
                    alt={current.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${current.name}&background=6366f1&color=fff`;
                    }}
                  />
                </div>
                <div>
                  <h4 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{current.name}</h4>
                  <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                    <span className="text-indigo-500">{current.role}</span> at <a href={current.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition-colors">{current.company}</a>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button 
              onClick={prevSlide}
              className={`w-12 h-12 flex items-center justify-center border transition-colors ${isDark ? 'border-white/10 hover:border-indigo-500' : 'border-black/10 hover:border-indigo-500'}`}
            >
              <ChevronLeft className={`w-5 h-5 ${isDark ? 'text-white' : 'text-slate-900'}`} />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 transition-all ${
                    index === activeIndex 
                      ? 'bg-indigo-500 w-8' 
                      : isDark ? 'bg-white/20 hover:bg-white/40' : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextSlide}
              className={`w-12 h-12 flex items-center justify-center border transition-colors ${isDark ? 'border-white/10 hover:border-indigo-500' : 'border-black/10 hover:border-indigo-500'}`}
            >
              <ChevronRight className={`w-5 h-5 ${isDark ? 'text-white' : 'text-slate-900'}`} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}