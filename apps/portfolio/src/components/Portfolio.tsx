import { motion } from 'motion/react';
import { ExternalLink, Code } from 'lucide-react';
import { Project } from '@workspace/shared';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../locales';

interface Props {
  projects: Project[];
}

export default function Portfolio({ projects }: Props) {
  const { language } = useAppStore();
  const t = translations[language].portfolio;

  if (!projects || projects.length === 0) return null;

  return (
    <section id="portfolio" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-20">
        <div>
          <span className="font-headline font-bold text-xs tracking-[0.3em] uppercase text-outline mb-4 block">{t.label}</span>
          <h2 className="font-headline text-5xl font-bold uppercase">{t.title} <span className="text-primary">{t.titleHighlight}</span></h2>
        </div>
        <div className="hidden md:block font-headline text-sm font-bold text-outline uppercase tracking-widest">
          [ 2022 - 2024 ]
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {projects.map((project, idx) => (
          <motion.div 
            key={project.id || idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`group ${idx % 2 !== 0 ? 'md:mt-24' : ''}`}
          >
            <div className="aspect-video bg-surface-container-highest overflow-hidden relative mb-8">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-surface/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button className="bg-primary text-white p-4 hover:bg-primary/90 transition-all">
                  <ExternalLink className="w-6 h-6" />
                </button>
                <button className="bg-primary text-white p-4 hover:bg-primary/90 transition-all">
                  <Code className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-headline text-2xl font-bold mb-2 group-hover:text-primary transition-colors uppercase">{project.title}</h3>
                <p className="text-on-surface-variant mb-6">{project.description}</p>
                <div className="flex gap-4">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-bold tracking-widest text-outline uppercase">{tag}</span>
                  ))}
                </div>
              </div>
              <span className="font-headline text-[10px] font-bold text-primary border border-primary/30 px-3 py-1">{project.year}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
