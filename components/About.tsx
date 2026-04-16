'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState, useEffect, useRef } from 'react';
import { Code, Users, Rocket, Shield, Zap, Globe, Cpu, Brain, Cloud, Database, Server } from 'lucide-react';

const features = [
  { icon: Code, title: 'Digital Products', desc: 'Architectural consultation and reference architectures for robust software ecosystems.' },
  { icon: Users, title: 'Architecture as a Service', desc: 'Technology stack decisions that complement architecture for optimal performance.' },
  { icon: Rocket, title: 'App Modernization', desc: 'Transform legacy software with migration, refactoring, and integration expertise.' },
  { icon: Shield, title: 'MVP Development', desc: 'Quickly launch your idea with agile MVP development and rapid iteration.' },
];

const floatingIcons = [
  { icon: Zap, x: '5%', y: '15%', size: 28, delay: 0 },
  { icon: Globe, x: '90%', y: '10%', size: 32, delay: 0.3 },
  { icon: Cpu, x: '80%', y: '80%', size: 24, delay: 0.6 },
  { icon: Code, x: '10%', y: '85%', size: 26, delay: 0.9 },
  { icon: Rocket, x: '50%', y: '5%', size: 20, delay: 1.2 },
  { icon: Shield, x: '95%', y: '50%', size: 30, delay: 1.5 },
  { icon: Brain, x: '25%', y: '35%', size: 22, delay: 0.4 },
  { icon: Cloud, x: '70%', y: '25%', size: 26, delay: 0.7 },
  { icon: Database, x: '35%', y: '65%', size: 24, delay: 1.0 },
  { icon: Server, x: '60%', y: '55%', size: 28, delay: 1.3 },
];

const circuitLines = [
  { x1: '10%', y1: '20%', x2: '30%', y2: '20%', x3: '40%', y3: '35%' },
  { x1: '90%', y1: '15%', x2: '70%', y2: '15%', x3: '60%', y3: '30%' },
  { x1: '85%', y1: '85%', x2: '65%', y2: '85%', x3: '55%', y3: '70%' },
  { x1: '15%', y1: '80%', x2: '35%', y2: '80%', x3: '45%', y3: '65%' },
  { x1: '50%', y1: '95%', x2: '50%', y2: '75%', x3: '35%', y3: '60%' },
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
            <div className="absolute inset-0">
              <div className={`absolute inset-0 ${isDark ? 'bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)]' : 'bg-[linear-gradient(rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.02)_1px,transparent_1px)]'} bg-[size:40px_40px]`}></div>
            </div>

            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              {circuitLines.map((line, i) => (
                <motion.path
                  key={i}
                  d={`M ${line.x1} ${line.y1} L ${line.x2} ${line.y2} L ${line.x3} ${line.y3}`}
                  fill="none"
                  stroke={isDark ? "rgba(99,102,241,0.3)" : "rgba(99,102,241,0.2)"}
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: i * 0.2 }}
                />
              ))}
              {circuitLines.map((line, i) => (
                <motion.circle
                  key={`dot-${i}`}
                  cx={line.x3}
                  cy={line.y3}
                  r="3"
                  fill={isDark ? "#6366f1" : "#4f46e5"}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: [0, 1.5, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 + 0.8 }}
                />
              ))}
            </svg>

            <div className="relative h-[500px] flex items-center justify-center" style={{ zIndex: 2 }}>
              <motion.div 
                className="relative"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                <div className={`w-56 h-56 border-2 ${isDark ? 'border-indigo-500/30' : 'border-indigo-500/20'} rounded-none`} style={{ animation: 'spin 20s linear infinite' }}></div>
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 border ${isDark ? 'border-cyan-500/30' : 'border-cyan-500/20'} rounded-none`} style={{ animation: 'spin 15s linear infinite reverse' }}></div>
                
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 accent-gradient"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    boxShadow: ['0 0 20px rgba(99,102,241,0.3)', '0 0 40px rgba(99,102,241,0.5)', '0 0 20px rgba(99,102,241,0.3)']
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className={`w-full h-full flex flex-col items-center justify-center ${isDark ? 'bg-[#0a0a0f]' : 'bg-white'}`}>
                    <motion.div
                      animate={{ rotate: [0, -360] }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 accent-gradient flex items-center justify-center mb-3"
                    >
                      <Code className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>DATASCON</h3>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>TECH LAB</p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div 
                className={`absolute top-4 left-4 glass px-4 py-3 flex items-center gap-3`}
                animate={{ y: [0, 12, 0], x: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                style={{ zIndex: 10 }}
              >
                <Users className="w-5 h-5 text-indigo-500" />
                <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Expert Team</span>
              </motion.div>

              <motion.div 
                className={`absolute top-20 -right-4 glass px-4 py-3 flex items-center gap-3`}
                animate={{ y: [0, -12, 0], x: [0, -5, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                whileHover={{ scale: 1.1, rotate: -5 }}
                style={{ zIndex: 10 }}
              >
                <Rocket className="w-5 h-5 text-cyan-500" />
                <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Fast Delivery</span>
              </motion.div>

              <motion.div 
                className={`absolute bottom-20 left-0 glass px-4 py-3 flex items-center gap-3`}
                animate={{ y: [0, 10, 0], x: [0, 8, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                style={{ zIndex: 10 }}
              >
                <Shield className="w-5 h-5 text-purple-500" />
                <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Secure</span>
              </motion.div>

              <motion.div 
                className={`absolute bottom-4 right-2 glass px-4 py-3 flex items-center gap-3`}
                animate={{ y: [0, -15, 0], x: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                whileHover={{ scale: 1.1, rotate: -5 }}
                style={{ zIndex: 10 }}
              >
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Innovation</span>
              </motion.div>

              <motion.div 
                className={`absolute top-1/3 right-8 glass px-3 py-2`}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                style={{ zIndex: 10 }}
              >
                <Brain className="w-4 h-4 text-pink-500" />
              </motion.div>

              <motion.div 
                className={`absolute bottom-1/3 left-4 glass px-3 py-2`}
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                style={{ zIndex: 10 }}
              >
                <Cloud className="w-4 h-4 text-emerald-500" />
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