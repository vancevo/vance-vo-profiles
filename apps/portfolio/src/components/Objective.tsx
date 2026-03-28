import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Terminal, Layers, Wrench, Code } from 'lucide-react';
import { TechCategory, ObjectiveData } from '@workspace/shared';
import { useAppStore } from '../store/useAppStore';
import { tData } from '../utils/i18n';
import { translations } from '../locales';

const getIcon = (iconName: string, className: string) => {
  switch (iconName) {
    case 'Terminal': return <Terminal className={className} />;
    case 'Layers': return <Layers className={className} />;
    case 'Wrench': return <Wrench className={className} />;
    default: return <Code className={className} />;
  }
};

interface Props {
  techStack: TechCategory[];
  objectiveData: ObjectiveData;
}

export default function Objective({ techStack, objectiveData }: Props) {
  const [stackIndex, setStackIndex] = useState(0);
  const { language } = useAppStore();
  const t = objectiveData;
  const tStatic = translations[language].objective;

  useEffect(() => {
    if (!techStack || techStack.length <= 1) return;
    const interval = setInterval(() => {
      setStackIndex((prev) => (prev + 1) % techStack.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [techStack]);

  if (!techStack || techStack.length === 0) return null;

  const nextStack = () => setStackIndex((prev) => (prev + 1) % techStack.length);
  const prevStack = () => setStackIndex((prev) => (prev - 1 + techStack.length) % techStack.length);

  return (
    <section id="objective" className="py-16 sm:py-32 bg-surface-container-low overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="col-span-12 lg:col-span-5 text-center lg:text-left">
            <h2 className="font-headline text-2xl sm:text-4xl font-bold mb-6 sm:mb-8 text-primary uppercase tracking-tight">{tStatic.title}</h2>
            <div className="space-y-4 sm:space-y-6 text-on-surface-variant leading-relaxed text-sm sm:text-lg opacity-90">
              <p>{tData(t.p1, language)}</p>
              <p>{tData(t.p2, language)}</p>
            </div>
          </div>
          
          <div className="col-span-12 lg:col-span-7">
            <div className="bg-surface-container p-5 sm:p-10 relative overflow-hidden min-h-[280px] sm:min-h-[320px] flex flex-col justify-between border border-outline-variant/20 shadow-sm">
              <div className="flex justify-between items-center mb-8 sm:mb-12">
                <h3 className="font-headline text-base sm:text-xl font-bold uppercase tracking-tighter text-outline">{tStatic.coreStack}</h3>
                <div className="flex gap-1.5 sm:gap-2">
                  <button 
                    onClick={prevStack}
                    className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center border border-outline-variant hover:border-primary hover:text-primary transition-all active:scale-90 bg-surface/50"
                    aria-label="Previous stack"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button 
                    onClick={nextStack}
                    className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center border border-outline-variant hover:border-primary hover:text-primary transition-all active:scale-90 bg-surface/50"
                    aria-label="Next stack"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={stackIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1"
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-8">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 bg-primary/10 flex items-center justify-center">
                      {getIcon(techStack[stackIndex].iconName || 'Terminal', "w-5 h-5 sm:w-7 sm:h-7 text-primary")}
                    </div>
                    <span className="text-primary font-headline font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs">{tData(techStack[stackIndex].name, language)}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {techStack[stackIndex].items.map((item, i) => (
                      <span key={i} className="px-3 py-1.5 sm:px-5 sm:py-2.5 bg-surface-container-high border border-outline-variant/30 text-[9px] sm:text-[11px] font-bold uppercase tracking-widest text-on-surface/80 hover:text-primary transition-colors">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
