import { GitBranch } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../locales';
import { ActivityData } from '@workspace/shared';
import { useEffect, useState } from 'react';

interface ContributionGraphProps {
  contributions: ActivityData['contributions'];
}

const ContributionGraph = ({ contributions }: ContributionGraphProps) => {
  const getColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-surface-container-highest';
      case 1: return 'bg-primary/20';
      case 2: return 'bg-primary/40';
      case 3: return 'bg-primary/70';
      case 4: return 'bg-primary';
      default: return 'bg-surface-container-highest';
    }
  };
  const [cells, setCells] = useState<number[]>([]);

  useEffect(() => {
    // Generate random contribution levels (0-4)
    const newCells = Array.from({ length: 20 * 7 }, () => Math.floor(Math.random() * 4));
    setCells(newCells);
  }, []);

  // Flatten the 2D array of weeks/days into a single list
  const flatCells = contributions.flat();

  return (
    <div className="overflow-x-auto pb-4 hide-scrollbar">
      <div className="grid grid-cols-[repeat(52,minmax(12px,1fr))] gap-1 min-w-[800px]">
        {cells.map((level, i) => (
          <div key={i} className={`aspect-square ${getColor(level)}`} />
        ))}
        {/* {flatCells.map((day, i) => (
          <div 
            key={i} 
            className={`aspect-square ${getColor(day.level)}`} 
            title={`${day.date}: ${day.count} contributions`}
          />
        ))} */}
      </div>
    </div>
  );
};

interface Props {
  activityData: ActivityData;
}

export default function Activity({ activityData }: Props) {
  const { language } = useAppStore();
  const t = translations[language].activity;

  return (
    <section id="activity" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="font-headline font-bold text-xs tracking-[0.3em] text-primary uppercase mb-4 block">{t.label}</span>
        <h2 className="font-headline text-4xl font-bold italic uppercase">{t.title}</h2>
      </div>

      <div className="bg-surface-container-low border border-outline-variant p-10">
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div className="flex items-center gap-4">
              <GitBranch className="w-6 h-6 text-primary" />
              <span className="font-headline font-bold uppercase tracking-tighter text-xl">Github / vancevo</span>
            </div>
            <div className="text-[10px] font-bold tracking-widest uppercase text-outline">
              {/* {t.commits} <span className="text-on-surface">{activityData.totalContributions.toLocaleString()}</span> */}
              Total commits: <span className="text-on-surface">121</span>
            </div>
          </div>

          {/* <ContributionGraph contributions={activityData.contributions} /> */}
          <ContributionGraph contributions={[]} />
          <div className="flex flex-wrap justify-between items-center pt-6 border-t border-outline-variant/30 gap-6">
            <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-outline">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-surface-container-highest" /> {t.less}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary/20" />
                <div className="w-3 h-3 bg-primary/60" />
                <div className="w-3 h-3 bg-primary" /> {t.more}
              </div>
            </div>
            <div className="text-[10px] font-bold tracking-widest uppercase text-primary">
              {/* {t.streak} */}
              Consistency Level: High
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
