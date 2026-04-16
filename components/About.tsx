'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState, useEffect, useRef } from 'react';
import { Code, Users, Rocket, Shield, ArrowRight, ArrowLeft } from 'lucide-react';

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
          <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>What We Do</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className={`p-6 ${isDark ? 'glass' : 'bg-white border border-black/10'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 accent-gradient flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{feature.title}</h4>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{feature.desc}</p>
              </motion.div>
            ))}
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
                className={`px-5 py-4 flex items-center gap-3 ${isDark ? 'glass' : 'bg-white border border-black/10'}`}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-2xl">{tech.icon}</span>
                <span className={`font-medium text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}