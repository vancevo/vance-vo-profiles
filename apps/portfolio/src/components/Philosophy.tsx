import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Terminal, Layers, Wrench, Code } from 'lucide-react';
import { TechCategory } from '@workspace/shared';
import { useAppStore } from '../store/useAppStore';
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
}

export default function Philosophy({ techStack }: Props) {
  const [stackIndex, setStackIndex] = useState(0);
  const { language } = useAppStore();
  const t = translations[language].philosophy;

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
    <section id="philosophy" className="py-32 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-12 items-start">
          <div className="col-span-12 md:col-span-5">
            <h2 className="font-headline text-4xl font-bold mb-8 text-primary uppercase">{t.title}</h2>
            <div className="space-y-6 text-on-surface-variant leading-relaxed text-lg">
              <p>{t.p1}</p>
              <p>{t.p2}</p>
            </div>
          </div>
          
          <div className="col-span-12 md:col-span-7">
            <div className="bg-surface-container p-8 relative overflow-hidden min-h-[300px] flex flex-col justify-between">
              <div className="flex justify-between items-center mb-12">
                <h3 className="font-headline text-xl font-bold uppercase tracking-tight">{t.coreStack}</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={prevStack}
                    className="w-10 h-10 flex items-center justify-center border border-outline-variant hover:border-primary hover:text-primary transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={nextStack}
                    className="w-10 h-10 flex items-center justify-center border border-outline-variant hover:border-primary hover:text-primary transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
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
                  <div className="flex items-center gap-4 mb-6">
                    {getIcon(techStack[stackIndex].iconName || 'Terminal', "w-8 h-8 text-primary")}
                    <span className="text-primary font-headline font-bold uppercase tracking-widest">{techStack[stackIndex].name}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {techStack[stackIndex].items.map((item, i) => (
                      <span key={i} className="px-4 py-2 bg-surface-container-high border border-outline-variant text-xs font-bold uppercase tracking-widest">
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
