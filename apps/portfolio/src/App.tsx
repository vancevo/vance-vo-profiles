import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useQuery } from '@tanstack/react-query';
import { Menu, X, Moon, Sun, ArrowRight, ArrowUp } from 'lucide-react';

import { useAppStore } from './store/useAppStore';
import { translations } from './locales';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Portfolio from './components/Portfolio';
import ExperienceSection from './components/Experience';
import Activity from './components/Activity';
import GithubHighlight from './components/GithubHighlight';
import Footer from './components/Footer';

// Mock dataloader until backend routes are fully seeded
const fetchPortfolioData = async () => {
  return {
    projects: [
      {
        id: "1",
        title: "Nexus Dashboard",
        description: "A high-performance real-time analytics interface built for global editorial teams. Optimized for 120Hz displays.",
        year: "2024",
        tags: ["TYPESCRIPT", "NEXT.JS", "WEBGL"],
        image: "https://picsum.photos/seed/nexus/1200/800"
      },
      {
        id: "2",
        title: "Synthetix OS",
        description: "A browser-based design system environment with integrated code-to-design synchronization.",
        year: "2023",
        tags: ["TAILWIND", "RUST", "FIGMA API"],
        image: "https://picsum.photos/seed/synthetix/1200/800"
      }
    ],
    experiences: [
      {
        id: "1",
        company: "Lumina Digital Agency",
        role: "Senior Frontend Developer",
        period: "2022 — PRESENT",
        description: [
          "Leading the frontend engineering team in developing high-performance web applications API.",
          "Architecture of micro-frontend systems"
        ]
      }
    ],
    techStack: [
      {
        id: "1",
        name: "Programming",
        iconName: "Terminal",
        items: ["TypeScript", "JavaScript (ES6+)", "Python", "Rust (Basics)"]
      },
      {
        id: "2",
        name: "Frameworks",
        iconName: "Layers",
        items: ["React 19", "Next.js 14", "Zustand", "Express"]
      }
    ],
    github: [
      {
        id: 1,
        name: "precision-ui",
        description: "High performance UI primitives.",
        html_url: "#",
        stargazers_count: 120,
        language: "TypeScript",
        updated_at: new Date().toISOString()
      }
    ]
  };
};

export default function App() {
  const { theme, isMenuOpen, setMenuOpen, toggleTheme, language, setLanguage } = useAppStore();
  const [activeSection, setActiveSection] = useState('philosophy');
  const t = translations[language];

  const { data, isLoading } = useQuery({
    queryKey: ['portfolioData'],
    queryFn: fetchPortfolioData,
  });

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  // Intersection Observer for Active Navigation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = ['philosophy', 'portfolio', 'experience', 'github', 'activity'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (isLoading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const getNavClass = (id: string) => 
    activeSection === id 
      ? "text-primary border-b-2 border-primary pb-1" 
      : "hover:text-primary transition-colors";

  return (
    <div className="min-h-screen selection:bg-primary/30 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/30 h-16 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter text-primary font-headline uppercase">
            PRECISION.DEV
          </div>

          <div className="hidden md:flex items-center gap-8 font-headline text-xs font-bold uppercase tracking-widest">
            <a href="#philosophy" onClick={() => setActiveSection('philosophy')} className={getNavClass('philosophy')}>{t.nav.philosophy}</a>
            <a href="#portfolio" onClick={() => setActiveSection('portfolio')} className={getNavClass('portfolio')}>{t.nav.portfolio}</a>
            <a href="#experience" onClick={() => setActiveSection('experience')} className={getNavClass('experience')}>{t.nav.experience}</a>
            <a href="#activity" onClick={() => setActiveSection('activity')} className={getNavClass('activity')}>{t.nav.activity}</a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === 'EN' ? 'VN' : 'EN')}
              className="hidden sm:block text-[10px] font-headline font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
            >
              {language === 'EN' ? 'Language (EN)' : 'Ngôn Ngữ (VN)'}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 text-primary hover:bg-surface-container-high transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              className="md:hidden p-2 text-primary"
              onClick={() => setMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-surface pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 font-headline text-2xl font-bold uppercase tracking-tighter">
              <a href="#philosophy" onClick={() => { setActiveSection('philosophy'); setMenuOpen(false); }}>{t.nav.philosophy}</a>
              <a href="#portfolio" onClick={() => { setActiveSection('portfolio'); setMenuOpen(false); }}>{t.nav.portfolio}</a>
              <a href="#experience" onClick={() => { setActiveSection('experience'); setMenuOpen(false); }}>{t.nav.experience}</a>
              <a href="#activity" onClick={() => { setActiveSection('activity'); setMenuOpen(false); }}>{t.nav.activity}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-16">
        <Hero />
        <Philosophy techStack={data.techStack} />
        <Portfolio projects={data.projects} />
        <ExperienceSection experiences={data.experiences} />
        <GithubHighlight repos={data.github} />
        <Activity />
      </main>

      <Footer />

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-16 h-16 bg-primary text-white flex items-center justify-center shadow-2xl hover:bg-primary/90 transition-all active:scale-90 group rounded-none"
        >
          <ArrowUp className="w-8 h-8 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
