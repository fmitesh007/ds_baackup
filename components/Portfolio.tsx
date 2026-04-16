'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const portfolios = [
  { title: 'Elissa-DI', desc: 'Unrivaled Gym. Unparalleled Training Fitness Classes.', site: 'https://fitpulse1.netlify.app/', img: 'https://fitpulse1.netlify.app/assets/HomePageGraphic-JlZ3Ss5z.png' },
  { title: 'AI Visuage', desc: 'AI Visuage', site: 'https://ai-visuage.netlify.app/', img: 'https://ai-visuage.netlify.app/assets/logo-3d2a5717.png' },
  { title: 'Family Plan', desc: 'Family Plan', site: 'https://traileress.vercel.app/', img: 'https://image.tmdb.org/t/p/w500/a6syn9qcU4a54Lmi3JoIr1XvhFU.jpg' },
  { title: 'Teamate', desc: 'Hire super Humans', site: 'https://teammate-xh9u.vercel.app/', img: 'https://teammate-xh9u.vercel.app/images/superHumans.png' },
  { title: 'Games Hub', desc: 'Games Hub', site: 'https://game-hub-rho-ochre.vercel.app/', img: 'https://game-hub-rho-ochre.vercel.app/assets/logo-ff4914e6.webp' },
  { title: 'World Cities', desc: 'World Cities', site: 'https://world-cities-chi.vercel.app/', img: 'https://world-cities-chi.vercel.app/Images/tokyo.jpg' },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 accent-gradient text-white text-sm font-semibold uppercase tracking-wider rounded-full mb-4">
            Our Work
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-accent">Projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((project, i) => (
            <motion.a
              key={i}
              href={project.site}
              target="_blank"
              className="group block relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="aspect-video bg-slate-800/50 relative overflow-hidden">
                <img src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-3">{project.desc}</p>
                <span className="inline-flex items-center gap-2 text-indigo-400 text-sm font-medium">
                  Visit Site <ExternalLink className="w-4 h-4" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}