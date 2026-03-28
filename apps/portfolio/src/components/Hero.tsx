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
    <section className="min-h-[80vh] lg:min-h-[90vh] flex flex-col justify-center px-6 max-w-7xl mx-auto py-12 sm:py-20 lg:py-10">
      <div className="grid grid-cols-12 lg:gap-10 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="col-span-12 lg:col-span-4 order-first lg:order-last flex justify-center lg:block"
        >
          <div className="relative w-32 h-32 sm:w-48 sm:h-48 lg:w-full lg:h-full lg:aspect-[4/5] bg-surface-container-low overflow-hidden group border border-outline-variant/30 lg:border-none rounded-full lg:rounded-none">
            <img
              src="https://picsum.photos/seed/profile/800/1000"
              alt="Profile"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="hidden lg:block absolute inset-0 border-[16px] border-surface-container-low/50 pointer-events-none" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="col-span-12 lg:col-span-8 text-center lg:text-left flex flex-col items-center lg:items-start"
        >
          <div className="max-w-[200px] sm:max-w-none">
            <span className="text-primary font-headline font-bold text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-4 sm:mb-6 block">
              {tData(t.role, language)}
            </span>
            <h1 className="font-headline text-3xl sm:text-6xl lg:text-8xl font-bold tracking-tighter leading-[1.2] lg:leading-[0.9] mb-6 sm:mb-8 uppercase">
              <> <br className="sm:hidden" /><span className="text-primary italic text-glow">{tData(t.titleHighlight, language)}</span> {tData(t.titleSuffix, language)}</>
            </h1>
            <p className="text-on-surface-variant text-xs sm:text-base lg:text-lg mb-10 sm:mb-12 leading-relaxed opacity-80 lg:max-w-xl">
              {tData(t.description, language)}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
              <button className="w-full sm:w-auto bg-primary text-white font-headline font-bold px-8 py-4 flex items-center justify-center gap-3 hover:bg-primary/90 transition-all active:scale-95 uppercase tracking-wide text-[10px] sm:text-sm">
                {tStatic.download} <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <a href="#portfolio" className="font-headline font-bold uppercase text-[9px] sm:text-xs tracking-widest border-b-2 border-outline-variant hover:border-primary transition-all py-2">
                {tStatic.viewWorks}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
