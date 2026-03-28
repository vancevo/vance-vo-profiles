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
    <section id="experience" className="py-32 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-12 lg:col-span-4">
            <h2 className="font-headline text-5xl font-bold mb-8 uppercase leading-[0.9]">{t.titlePart1} <br/><span className="text-primary">{t.titlePart2}</span></h2>
            <p className="text-on-surface-variant text-lg">{t.desc}</p>
          </div>
          
          <div className="col-span-12 lg:col-span-8 space-y-4">
            {experiences.map((exp, index) => (
              <motion.div 
                key={exp.id || index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`border border-outline-variant bg-surface transition-colors ${activeAccordion === exp.id ? 'border-primary shadow-[0_0_30px_rgba(251,84,43,0.1)]' : 'hover:border-primary/50'}`}
              >
                <div 
                  className="p-8 cursor-pointer flex justify-between items-center group"
                  onClick={() => setActiveAccordion(activeAccordion === exp.id ? null : (exp.id || null))}
                >
                  <div>
                    <h3 className="font-headline text-3xl font-bold mb-2 group-hover:text-primary transition-colors">{tData(exp.company, language)}</h3>
                    <p className="text-primary font-mono text-sm uppercase tracking-widest">{tData(exp.role, language)}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="hidden md:block font-headline text-sm font-bold text-outline uppercase tracking-widest">
                      [ {exp.period} ]
                    </span>
                    <motion.div
                      animate={{ rotate: activeAccordion === exp.id ? 90 : 0 }}
                      className={`w-12 h-12 flex items-center justify-center border ${activeAccordion === exp.id ? 'border-primary text-primary' : 'border-outline-variant text-on-surface'}`}
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
                      <div className="p-8 pt-0 text-on-surface-variant text-lg">
                        <ul className="space-y-4">
                          {exp.description.map((desc, i) => (
                            <li key={i} className="flex items-start gap-4">
                              <span className="text-primary mt-2 flex-shrink-0">―</span>
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
