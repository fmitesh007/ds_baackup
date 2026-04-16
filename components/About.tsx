'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState, useEffect, useRef } from 'react';
import { Code, Users, Rocket, Shield, Zap, Globe, Cpu } from 'lucide-react';

const features = [
  { icon: Code, title: 'Digital Products', desc: 'Architectural consultation and reference architectures for robust software ecosystems.' },
  { icon: Users, title: 'Architecture as a Service', desc: 'Technology stack decisions that complement architecture for optimal performance.' },
  { icon: Rocket, title: 'App Modernization', desc: 'Transform legacy software with migration, refactoring, and integration expertise.' },
  { icon: Shield, title: 'MVP Development', desc: 'Quickly launch your idea with agile MVP development and rapid iteration.' },
];

const floatingIcons = [
  { icon: Zap, x: '10%', y: '20%', size: 24, delay: 0 },
  { icon: Globe, x: '85%', y: '15%', size: 28, delay: 0.5 },
  { icon: Cpu, x: '75%', y: '70%', size: 20, delay: 1 },
  { icon: Code, x: '15%', y: '75%', size: 22, delay: 1.5 },
  { icon: Rocket, x: '50%', y: '10%', size: 18, delay: 2 },
  { icon: Shield, x: '90%', y: '45%', size: 26, delay: 0.8 },
];

export default function About() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => setMounted(true), []);

  const isDark = !mounted || theme === 'dark' || !theme;
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  if (!mounted) return null;

  return (
    <section id="about" ref={containerRef} className="py-32 relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: y1 }}
      >
        <motion.div 
          className={`absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] ${isDark ? 'bg-indigo-600/20' : 'bg-indigo-500/15'}`}
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className={`absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] ${isDark ? 'bg-cyan-500/20' : 'bg-cyan-400/15'}`}
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </motion.div>

      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          className={`absolute pointer-events-none ${isDark ? 'text-indigo-500/20' : 'text-indigo-500/10'}`}
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: item.delay, duration: 0.5 }}
        >
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 15, -15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 4 + i * 0.5, 
              repeat: Infinity, 
              delay: item.delay 
            }}
          >
            <item.icon style={{ width: item.size, height: item.size }} />
          </motion.div>
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative h-[400px]">
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 accent-gradient p-[2px]"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ rotate }}
              >
                <div className={`w-full h-full flex flex-col items-center justify-center p-6 ${isDark ? 'bg-[#0a0a0f]' : 'bg-white'}`}>
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 accent-gradient flex items-center justify-center mb-4 rounded-full"
                  >
                    <Code className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Tech Lab</h3>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Building the future</p>
                </div>
              </motion.div>

              <motion.div 
                className={`absolute top-5 left-0 glass px-4 py-3 flex items-center gap-3`}
                animate={{ y: [0, 10, 0], x: [0, 5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                whileHover={{ scale: 1.1 }}
              >
                <Users className="w-5 h-5 text-indigo-500" />
                <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Expert Team</span>
              </motion.div>

              <motion.div 
                className={`absolute top-1/2 right-0 glass px-4 py-3 flex items-center gap-3`}
                animate={{ y: [0, -10, 0], x: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                whileHover={{ scale: 1.1 }}
              >
                <Rocket className="w-5 h-5 text-cyan-500" />
                <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Fast Delivery</span>
              </motion.div>

              <motion.div 
                className={`absolute bottom-10 left-10 glass px-4 py-3 flex items-center gap-3`}
                animate={{ y: [0, 8, 0], x: [0, 8, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                whileHover={{ scale: 1.1 }}
              >
                <Shield className="w-5 h-5 text-purple-500" />
                <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Secure</span>
              </motion.div>

              <motion.div 
                className={`absolute bottom-5 right-10 glass px-4 py-3 flex items-center gap-3`}
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                whileHover={{ scale: 1.1 }}
              >
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Innovation</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
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
              className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              A Cutting Edge <motion.span 
                className="text-accent"
                animate={{ 
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Tech Lab
              </motion.span>
            </motion.h2>
            <motion.p 
              className={`text-lg leading-relaxed mb-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our unwavering dedication to our clients drives us to create opportunities and offer 
              innovative solutions that transcend their challenges. Let's collaborate, ideate, and 
              craft products that deliver awe-inspiring experiences.
            </motion.p>

            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  className={`p-6 transition-all group ${isDark ? 'glass hover:border-indigo-500' : 'bg-white border border-black/10 hover:border-indigo-500'}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <motion.div 
                    className="w-12 h-12 accent-gradient flex items-center justify-center mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h4 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{feature.title}</h4>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}