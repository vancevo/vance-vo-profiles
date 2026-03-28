import { motion } from 'motion/react';
import { ExternalLink, Code } from 'lucide-react';
import { Project } from '@workspace/shared';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../locales';
import { tData } from '../utils/i18n';

interface Props {
  projects: Project[];
}

export default function Portfolio({ projects }: Props) {
  const { language } = useAppStore();
  const t = translations[language].portfolio;

  if (!projects || projects.length === 0) return null;

  return (
    <section id="portfolio" className="py-20 sm:py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 sm:mb-20">
        <div className="mb-6 md:mb-0">
          <span className="font-headline font-bold text-xs tracking-[0.3em] uppercase text-outline mb-4 block">{t.label}</span>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold uppercase leading-tight">{t.title} <span className="text-primary">{t.titleHighlight}</span></h2>
        </div>
        <div className="font-headline text-xs sm:text-sm font-bold text-outline uppercase tracking-widest border border-outline-variant px-4 py-2">
          [ 2021 - Present ]
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 sm:gap-y-24">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[4/3] mb-6 sm:mb-8 overflow-hidden bg-surface-container group-hover:bg-surface-container-high transition-colors p-3 sm:p-4">
              <img
                src={project.image}
                alt={tData(project.title, language)}
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
              />
              <div className="absolute inset-0 border border-outline-variant group-hover:border-primary/50 transition-colors pointer-events-none" />

              <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-surface text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 shadow-xl border border-outline-variant">
                <ExternalLink className="w-5 h-5" />
              </div>
            </div>

            <div className="flex justify-between items-start mb-4 gap-4">
              <h3 className="font-headline text-2xl sm:text-3xl font-bold group-hover:text-primary transition-colors leading-tight">{tData(project.title, language)}</h3>
              <span className="font-mono text-[10px] sm:text-xs text-outline-variant whitespace-nowrap pt-2">{project.year}</span>
            </div>

            <p className="text-on-surface-variant text-sm sm:text-base mb-8 line-clamp-3 leading-relaxed">
              {tData(project.description, language)}
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {project.tags.map((tag, i) => (
                <span key={i} className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] px-2 py-1 sm:px-3 sm:py-1 border border-outline-variant uppercase text-outline group-hover:border-primary/30 transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
