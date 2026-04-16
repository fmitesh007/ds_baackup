'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState, useEffect, useRef } from 'react';
import { Code, Users, Rocket, Shield, Zap, Globe, Cpu, ArrowRight, ArrowLeft } from 'lucide-react';

const features = [
  { icon: Code, title: 'Digital Products', desc: 'Architectural consultation and reference architectures for robust software ecosystems.' },
  { icon: Users, title: 'Architecture as a Service', desc: 'Technology stack decisions that complement architecture for optimal performance.' },
  { icon: Rocket, title: 'App Modernization', desc: 'Transform legacy software with migration, refactoring, and integration expertise.' },
  { icon: Shield, title: 'MVP Development', desc: 'Quickly launch your idea with agile MVP development and rapid iteration.' },
];

const techStack = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Docker', icon: '🐳' },
  { name: 'AWS', icon: '☁️' },
  { name: 'GraphQL', icon: '◼️' },
];

export default function About() {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => setMounted(true), []);

  const isDark = !mounted || theme === 'dark' || !theme;
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % features.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + features.length) % features.length);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  if (!mounted) return null;

  return (
    <section id="about" ref={containerRef} className="py-32 relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: y1 }}
      >
        <motion.div 
          className={`absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] ${isDark ? 'bg-indigo-600/20' : 'bg-indigo-500/15'}`}
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className={`absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] ${isDark ? 'bg-cyan-500/20' : 'bg-cyan-400/15'}`}
          animate={{ scale: [1, 1.3, 1], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 accent-gradient text-white text-sm font-semibold uppercase tracking-wider rounded-sm mb-6"
        >
          About Us
        </motion.div>
        
        <motion.h2 
          className={`text-4xl md:text-5xl font-bold mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          A Cutting Edge <span className="text-accent">Tech Lab</span>
        </motion.h2>

        <motion.p 
          className={`text-lg leading-relaxed mb-12 max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Our unwavering dedication to our clients drives us to create opportunities and offer 
          innovative solutions that transcend their challenges. Let's collaborate, ideate, and 
          craft products that deliver awe-inspiring experiences.
        </motion.p>

        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>What We Do</h3>
            <div className="flex gap-2">
              <button 
                onClick={prevSlide}
                className={`w-10 h-10 flex items-center justify-center border ${isDark ? 'border-white/10 hover:border-indigo-500' : 'border-black/10 hover:border-indigo-500'}`}
              >
                <ArrowLeft className={`w-4 h-4 ${isDark ? 'text-white' : 'text-slate-900'}`} />
              </button>
              <button 
                onClick={nextSlide}
                className={`w-10 h-10 flex items-center justify-center border ${isDark ? 'border-white/10 hover:border-indigo-500' : 'border-black/10 hover:border-indigo-500'}`}
              >
                <ArrowRight className={`w-4 h-4 ${isDark ? 'text-white' : 'text-slate-900'}`} />
              </button>
            </div>
          </div>

          <div 
            className="relative overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="flex gap-4">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  className={`flex-shrink-0 w-full md:w-[calc(50%-8px)] lg:w-[calc(33%-16px)] p-6 ${
                    i === activeIndex 
                      ? 'block' 
                      : 'hidden'
                  } ${isDark ? 'glass' : 'bg-white border border-black/10'}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: i === activeIndex ? 1 : 0, x: i === activeIndex ? 0 : 50 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-12 h-12 accent-gradient flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{feature.title}</h4>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {features.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1 transition-all ${i === activeIndex ? 'w-8 bg-indigo-500' : isDark ? 'w-2 bg-white/20' : 'w-2 bg-slate-300'}`}
                />
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Tech Stack</h3>
          <div className="flex flex-wrap gap-4">
            {techStack.map((tech, i) => (
              <motion.div
                key={i}
                className={`px-4 py-3 flex items-center gap-2 ${isDark ? 'glass' : 'bg-white border border-black/10'}`}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-xl">{tech.icon}</span>
                <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}