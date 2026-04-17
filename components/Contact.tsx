'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { MapPin, Mail, Phone, Send } from 'lucide-react';

const contactInfo = [
  { icon: MapPin, label: 'Location', value: 'Akurdi, Pune, India' },
  { icon: Mail, label: 'Email', value: 'info@datascon.com' },
  { icon: Phone, label: 'Call', value: '+91 7499748443' },
];

export default function Contact() {
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSubmitting(true);
    try {
      await emailjs.sendForm(
        'service_j1965gh',
        'template_cyv4ytw',
        form.current,
        'LigY8f94bxkuETr6z'
      );
      setIsSuccess(true);
      form.current.reset();
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error('EmailJS error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDark = !mounted || theme === 'dark' || !theme;

  if (!mounted) return null;

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute -right-32 -bottom-32 w-[500px] h-[500px] rounded-full blur-[120px] ${isDark ? 'bg-cyan-500/20' : 'bg-cyan-400/15'}`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 accent-gradient text-white text-sm font-semibold uppercase tracking-wider rounded-sm mb-4">
            Get In Touch
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Let's Work <span className="text-accent">Together</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Get ready to meet your next proactive tech partner. Tell us about your project.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {contactInfo.map((info, i) => (
              <motion.div
                key={i}
                className={`flex items-start gap-5 p-6 transition-all hover:border-indigo-500 ${isDark ? 'glass' : 'bg-white border border-black/10'}`}
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 accent-gradient flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className={`text-lg font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{info.label}</h4>
                  <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>{info.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.form
            ref={form}
            onSubmit={sendEmail}
            className={`p-8 ${isDark ? 'glass' : 'bg-white border border-black/10'}`}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {isSuccess && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 text-green-400 rounded-lg text-center">
                Message sent successfully!
              </div>
            )}
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Your Name</label>
                <input type="text" name="name" required placeholder="John Doe" className="w-full px-5 py-4" />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Your Email</label>
                <input type="email" name="email" required placeholder="john@example.com" className="w-full px-5 py-4" />
              </div>
            </div>
            <div className="mb-6">
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Subject</label>
              <input type="text" name="subject" required placeholder="How can we help?" className="w-full px-5 py-4" />
            </div>
            <div className="mb-8">
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Message</label>
              <textarea name="message" required rows={5} placeholder="Tell us about your project..." className="w-full px-5 py-4 resize-none"></textarea>
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 disabled:opacity-70"
              whileHover={!isSubmitting ? { scale: 1.02, boxShadow: '0 0 40px rgba(99, 102, 241, 0.4)' } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              {!isSubmitting && <Send className="w-5 h-5" />}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}