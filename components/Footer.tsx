'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isDark = !mounted || theme === 'dark' || !theme;
  const currentYear = new Date().getFullYear();

  if (!mounted) return null;

  return (
    <footer className={`grid grid-cols-1 md:grid-cols-2 items-end w-full px-6 md:px-12 py-20 border-t ${
      isDark 
        ? 'bg-[#0a0a0f] border-white/5' 
        : 'bg-[#f0f2f5] border-black/5'
    }`}>
      <div className="space-y-12 order-2 md:order-1">
        <div className={`text-6xl md:text-8xl font-black tracking-tighter leading-none select-none ${
          isDark ? 'text-white/[0.06]' : 'text-slate-800/[0.08]'
        }`}>
          DATASCON
        </div>
        <div className="space-y-4">
          <p className={`text-xs tracking-widest uppercase ${isDark ? 'text-slate-600' : 'text-slate-500'}`}>
            © {currentYear} DATASCON. ALL RIGHTS RESERVED.
          </p>
          <div className={`flex gap-6 text-xs tracking-widest uppercase ${isDark ? 'text-slate-700' : 'text-slate-500'}`}>
            <a href="#" className="hover:text-indigo-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-500 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-indigo-500 transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start md:items-end gap-8 mb-12 md:mb-0 order-1 md:order-2">
        <div className="grid grid-cols-3 gap-x-8 gap-y-4 text-center md:text-left">
          <div>
            <h4 className={`text-[10px] font-bold tracking-[0.3em] uppercase mb-4 ${isDark ? 'text-white/30' : 'text-slate-600/70'}`}>Headquarters</h4>
            <p className={`text-sm ${isDark ? 'text-slate-600' : 'text-slate-600'}`}>
              Akurdi, Pimpri Chinchad<br />
              Pune 411035, India
            </p>
          </div>
          <div>
            <h4 className={`text-[10px] font-bold tracking-[0.3em] uppercase mb-4 ${isDark ? 'text-white/30' : 'text-slate-600/70'}`}>Contact</h4>
            <ul className={`text-sm space-y-1 ${isDark ? 'text-slate-600' : 'text-slate-600'}`}>
              <li><a href="mailto:info@datascon.com" className="hover:text-indigo-500 transition-colors">info@datascon.com</a></li>
              <li><a href="tel:+917499748443" className="hover:text-indigo-500 transition-colors">+91 7499748443</a></li>
            </ul>
          </div>
          <div>
            <h4 className={`text-[10px] font-bold tracking-[0.3em] uppercase mb-4 ${isDark ? 'text-white/30' : 'text-slate-600/70'}`}>Social</h4>
            <ul className={`text-sm space-y-1 ${isDark ? 'text-slate-600' : 'text-slate-600'}`}>
              <li><a href="https://twitter.com/datascon" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition-colors">Twitter</a></li>
              <li><a href="https://www.linkedin.com/company/datacon-solutions/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className={`w-full h-px md:hidden ${isDark ? 'bg-white/5' : 'bg-black/10'}`}></div>
        <p className={`text-sm max-w-xs md:text-right ${isDark ? 'text-slate-700' : 'text-slate-500'}`}>
          Empowering innovative ideas with cutting-edge digital solutions.
        </p>
      </div>
    </footer>
  );
}