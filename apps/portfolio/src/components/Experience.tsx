import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Experience } from '@workspace/shared';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../locales';

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
            {experiences.map((exp) => (
              <div 
                key={exp.id}
                className={`bg-surface-container border-l-4 transition-all duration-300 ${activeAccordion === exp.id ? 'border-primary' : 'border-outline-variant'}`}
              >
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === exp.id ? null : (exp.id || null))}
                  className="w-full text-left p-8 flex justify-between items-center"
                >
                  <div>
                    <span className={`font-headline font-bold text-[10px] tracking-[0.2em] mb-2 block uppercase ${activeAccordion === exp.id ? 'text-primary' : 'text-outline'}`}>
                      {exp.period}
                    </span>
                    <h3 className="font-headline text-2xl font-bold uppercase">{exp.role}</h3>
                    <p className="text-outline font-bold uppercase tracking-widest text-xs mt-1">{exp.company}</p>
                  </div>
                  <motion.div
                    animate={{ rotate: activeAccordion === exp.id ? 180 : 0 }}
                    className={activeAccordion === exp.id ? 'text-primary' : 'text-outline'}
                  >
                    <ChevronRight className="w-6 h-6 rotate-90" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {activeAccordion === exp.id && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 space-y-4 text-on-surface-variant leading-relaxed">
                        <ul className="list-disc list-inside space-y-2">
                          {exp.description.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
