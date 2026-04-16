'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useTheme } from 'next-themes';

const techStack = [
  { name: 'Node.js', img: 'https://keenethics.com/wp-content/uploads/2023/07/Node.js_color_icon-1.svg' },
  { name: 'Python', img: 'https://www.python.org/static/community_logos/python-logo-master-v3-TM-flattened.png' },
  { name: 'Next.js', img: 'https://keenethics.com/wp-content/uploads/2022/07/IconNext.js_icon-TypeColor.svg' },
  { name: 'React', img: 'https://keenethics.com/wp-content/uploads/2023/07/React_native_color_icon.svg' },
  { name: 'Flutter', img: 'https://keenethics.com/wp-content/uploads/2023/07/Flutter_color_icon.svg' },
  { name: 'Angular', img: 'https://keenethics.com/wp-content/uploads/2022/07/IconAngular_icon-TypeColor.svg' },
  { name: 'MongoDB', img: 'https://keenethics.com/wp-content/uploads/2023/07/MongoDB_color_icon.svg' },
  { name: 'MySQL', img: 'https://keenethics.com/wp-content/uploads/2023/07/MySQL_color_icon.svg' },
  { name: 'TensorFlow', img: 'https://cdn.icon-icons.com/icons2/2699/PNG/512/tensorflow_logo_icon_170598.png' },
  { name: 'AWS', img: 'https://logohistory.net/wp-content/uploads/2023/06/AWS-Emblem.png' },
];

const clientsData = [
  { name: 'Mimir', founder: 'Max Newcomer', url: 'https://www.mimirml.com/' },
  { name: 'Sinbad HQ', founder: 'Firas AlMohasen', url: 'https://sinbadhq.com/' },
  { name: 'Text to Design', founder: 'Ollie Martynov', url: 'https://www.texttodesign.ai/' },
  { name: 'interintellect', founder: 'Timothy Lim', url: 'https://interintellect.com/' },
  { name: 'Plexus', founder: 'Davey Morse', url: 'https://plexus.earth/' },
  { name: 'Cosine (YC W23)', founder: 'Alistair Pullen', url: 'https://cosine.sh/' },
];

export default function Clients() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isDark = !mounted || theme === 'dark' || !theme;
  const [activeIndex, setActiveIndex] = useState(0);

  if (!mounted) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      const newIndex = direction === 'left' 
        ? Math.max(0, activeIndex - 1) 
        : Math.min(clientsData.length - 1, activeIndex + 1);
      setActiveIndex(newIndex);
      scrollRef.current.scrollTo({
        left: newIndex * scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="clients" className="py-32 border-t border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[150px]"></div>
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          className="mb-12 flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Trusted <span className="text-accent">Clients</span>
            </h2>
            <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Companies we've worked with</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => scroll('left')}
              className={`w-10 h-10 flex items-center justify-center border ${isDark ? 'border-white/10 hover:border-indigo-500' : 'border-black/10 hover:border-indigo-500'} transition-colors`}
            >
              <ChevronLeft className={`w-5 h-5 ${isDark ? 'text-white' : 'text-slate-900'}`} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className={`w-10 h-10 flex items-center justify-center border ${isDark ? 'border-white/10 hover:border-indigo-500' : 'border-black/10 hover:border-indigo-500'} transition-colors`}
            >
              <ChevronRight className={`w-5 h-5 ${isDark ? 'text-white' : 'text-slate-900'}`} />
            </button>
          </div>
        </motion.div>

        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {clientsData.map((client, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 w-80"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <a 
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block p-6 border transition-all group h-full ${isDark ? 'border-white/10 hover:border-indigo-500 bg-white/5' : 'border-black/10 hover:border-indigo-500 bg-white'}`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 flex items-center justify-center ${isDark ? 'bg-white/10' : 'bg-slate-100'} text-2xl font-bold`}>
                    {client.name[0]}
                  </div>
                  <div>
                    <h4 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{client.name}</h4>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{client.founder}</p>
                  </div>
                </div>
                <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  View Company →
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <p className={`text-sm text-center mb-8 uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Technology Stack</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {techStack.map((tech, i) => (
              <motion.div
                key={i}
                className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity"
                initial={{ opacity: 0.3 }}
                whileInView={{ opacity: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ opacity: 1 }}
              >
                <img src={tech.img} alt={tech.name} className="w-full h-full object-contain" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}