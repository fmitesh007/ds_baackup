'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Globe, Smartphone, Users, TrendingUp, Palette, Clock } from 'lucide-react';

const services = [
  { icon: Globe, color: '#ff6896', title: 'Web Development', desc: 'High-quality and fault-tolerant web solutions crucial for user experience.' },
  { icon: Smartphone, color: '#e9bf06', title: 'Mobile Development', desc: 'Mobile applications tailored to your needs and audience preferences.' },
  { icon: Users, color: '#3fcdc7', title: 'Dedicated Team', desc: 'Hire a team of pros working under your direct supervision.' },
  { icon: TrendingUp, color: '#41cf2e', title: 'Business Analysis', desc: 'Test your project idea with our professional business analysis services.' },
  { icon: Palette, color: '#d6ff22', title: 'UI / UX Design', desc: 'Create elegant and responsive UI/UX with latest market tendencies.' },
  { icon: Clock, color: '#4680ff', title: 'MVP Development', desc: 'Resource efficient approach to test your business idea viability.' },
];

export default function Services() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isDark = !mounted || theme === 'dark' || !theme;

  if (!mounted) return null;

  return (
    <section id="services" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 accent-gradient text-white text-sm font-semibold uppercase tracking-wider rounded-sm mb-4">
            Services
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Core <span className="text-accent">Expertise</span>
          </h2>
          <div className="w-24 h-1 accent-gradient"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0">
          {services.map((s, i) => (
            <motion.div
              key={i}
              className={`p-8 group transition-all ${isDark ? 'glass border-r border-b border-white/10 hover:bg-white/5' : 'bg-white border-r border-b border-black/10 hover:bg-slate-50'}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div 
                className="w-14 h-14 flex items-center justify-center mb-6"
                style={{ backgroundColor: `${s.color}20` }}
              >
                <s.icon className="w-7 h-7" style={{ color: s.color }} />
              </div>
              <h3 className={`text-xl font-bold mb-3 uppercase tracking-wide ${isDark ? 'text-white' : 'text-slate-900'}`}>{s.title}</h3>
              <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{s.desc}</p>
              <div 
                className="w-8 h-1 transition-all duration-500 group-hover:w-full"
                style={{ backgroundColor: s.color }}
              ></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}