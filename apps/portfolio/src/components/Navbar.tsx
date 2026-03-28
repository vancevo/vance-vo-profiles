import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { translations } from '../locales';

interface Props {
  language: 'EN' | 'VN';
  setLanguage: (lang: 'EN' | 'VN') => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isMenuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  activeSection: string;
  setActiveSection: (id: string) => void;
}

export default function Navbar({
  language,
  setLanguage,
  theme,
  toggleTheme,
  isMenuOpen,
  setMenuOpen,
  activeSection,
  setActiveSection,
}: Props) {
  const t = translations[language];

  const getNavClass = (id: string) =>
    activeSection === id
      ? "text-primary border-b-2 border-primary pb-1"
      : "hover:text-primary transition-colors";

  const navLinks = [
    { id: 'objective', label: t.nav.objective },
    { id: 'portfolio', label: t.nav.portfolio },
    { id: 'experience', label: t.nav.experience },
    { id: 'activity', label: t.nav.activity },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/30 h-16 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter text-primary font-headline uppercase whitespace-nowrap">
            {language === 'EN' ? 'VANCE VO' : 'VINH VÕ'}
          </div>

          <div className="hidden md:flex items-center gap-8 font-headline text-xs font-bold uppercase tracking-widest">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setActiveSection(link.id)}
                className={getNavClass(link.id)}
              >
                {link.label}
              </a>
            ))}
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
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              className="md:hidden p-2 text-primary"
              onClick={() => setMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-surface pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 font-headline text-2xl font-bold uppercase tracking-tighter">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => { setActiveSection(link.id); setMenuOpen(false); }}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { setLanguage(language === 'EN' ? 'VN' : 'EN'); setMenuOpen(false); }}
                className="text-left font-headline text-sm font-bold uppercase tracking-widest opacity-60"
              >
                {language === 'EN' ? 'Switch to VN' : 'Chuyển sang EN'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
