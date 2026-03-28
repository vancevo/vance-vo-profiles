import { motion } from 'motion/react';
import { Download } from 'lucide-react';
import { HeroData } from '@workspace/shared';
import { useAppStore } from '../store/useAppStore';
import { tData } from '../utils/i18n';
import { translations } from '../locales';

interface Props {
  heroData: HeroData;
}

export default function Hero({ heroData }: Props) {
  const { language } = useAppStore();
  const t = heroData;
  const tStatic = translations[language].hero;

  return (
    <section className="min-h-[90vh] flex flex-col justify-center px-6 max-w-7xl mx-auto py-20">
      <div className="grid grid-cols-12 gap-8 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="col-span-12 lg:col-span-8"
        >
          <span className="text-primary font-headline font-bold text-xs tracking-[0.3em] uppercase mb-6 block">
            {tData(t.role, language)}
          </span>
          <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 uppercase">
            {tData(t.titleHighlight, language).toLowerCase() === 'precision' ? (
              <>Crafting <span className="text-primary italic text-glow">{tData(t.titleHighlight, language)}</span> {tData(t.titleSuffix, language)}</>
            ) : (
              <><span className="text-primary italic text-glow">{tData(t.titleHighlight, language)}</span> {tData(t.titleSuffix, language)}</>
            )}
          </h1>
          <p className="text-on-surface-variant text-lg max-w-xl mb-12 leading-relaxed">
            {tData(t.description, language)}
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <button className="bg-primary text-white font-headline font-bold px-8 py-4 flex items-center gap-3 hover:bg-primary/90 transition-all active:scale-95 uppercase tracking-tight">
              {tStatic.download} <Download className="w-5 h-5" />
            </button>
            <a href="#portfolio" className="font-headline font-bold uppercase text-sm border-b-2 border-outline-variant hover:border-primary transition-all py-2">
              {tStatic.viewWorks}
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="hidden lg:block col-span-4"
        >
          <div className="aspect-[4/5] bg-surface-container-low relative overflow-hidden group">
            <img 
              src="https://picsum.photos/seed/profile/800/1000" 
              alt="Profile" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 border-[16px] border-surface-container-low/50 pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
