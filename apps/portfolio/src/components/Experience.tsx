import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Experience } from '@workspace/shared';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../locales';
import { tData } from '../utils/i18n';

interface Props {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: Props) {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(experiences?.[0]?.id || null);
  const { language } = useAppStore();
  const t = translations[language].experience;

  if (!experiences || experiences.length === 0) return null;

  return (
    <section id="experience" className="py-20 sm:py-32 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          <div className="col-span-12 lg:col-span-4 text-center lg:text-left mb-8 lg:mb-0">
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 uppercase leading-tight md:leading-[0.9]">
              {t.titlePart1} <br className="hidden lg:block"/><span className="text-primary">{t.titlePart2}</span>
            </h2>
            <p className="text-on-surface-variant text-base sm:text-lg max-w-xl mx-auto lg:mx-0">{t.desc}</p>
          </div>
          
          <div className="col-span-12 lg:col-span-8 space-y-4 sm:space-y-6">
            {experiences.map((exp, index) => (
              <motion.div 
                key={exp.id || index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`border border-outline-variant bg-surface transition-all duration-300 ${activeAccordion === exp.id ? 'border-primary ring-1 ring-primary/20 shadow-xl' : 'hover:border-primary/50'}`}
              >
                <div 
                  className="p-6 sm:p-8 cursor-pointer flex justify-between items-center group gap-4"
                  onClick={() => setActiveAccordion(activeAccordion === exp.id ? null : (exp.id || null))}
                >
                  <div className="flex-1">
                    <h3 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold mb-2 group-hover:text-primary transition-colors leading-tight">{tData(exp.company, language)}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <p className="text-primary font-mono text-[10px] sm:text-xs uppercase tracking-widest font-bold">{tData(exp.role, language)}</p>
                      <span className="sm:hidden font-mono text-[10px] text-outline font-bold uppercase tracking-widest">{exp.period}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="hidden sm:block font-headline text-[10px] sm:text-sm font-bold text-outline uppercase tracking-widest whitespace-nowrap">
                      [ {exp.period} ]
                    </span>
                    <motion.div
                      animate={{ rotate: activeAccordion === exp.id ? 90 : 0 }}
                      className={`w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 flex items-center justify-center border transition-colors ${activeAccordion === exp.id ? 'border-primary text-primary bg-primary/5' : 'border-outline-variant text-on-surface'}`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </div>

                <AnimatePresence>
                  {activeAccordion === exp.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 sm:p-8 pt-0 text-on-surface-variant text-sm sm:text-base md:text-lg">
                        <ul className="space-y-4">
                          {exp.description.map((desc, i) => (
                            <li key={i} className="flex items-start gap-3 sm:gap-4 group/item">
                              <span className="text-primary mt-1.5 sm:mt-2 flex-shrink-0 group-hover/item:translate-x-1 transition-transform">―</span>
                              <span className="leading-relaxed">{tData(desc, language)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
