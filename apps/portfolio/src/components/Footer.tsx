import { ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-outline-variant/30 py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="text-xl font-bold tracking-tighter text-on-surface font-headline uppercase">
            PRECISION EDITORIAL
          </div>
          <p className="text-[10px] font-headline font-bold uppercase tracking-[0.3em] text-outline">
            © 2024 PRECISION EDITORIAL. ALL RIGHTS RESERVED.
          </p>
        </div>

        <div className="flex gap-12 font-headline text-[10px] font-bold uppercase tracking-widest">
          <a href="#" className="text-outline hover:text-primary transition-colors">Github</a>
          <a href="#" className="text-outline hover:text-primary transition-colors">LinkedIn</a>
          <a href="#" className="text-outline hover:text-primary transition-colors">Twitter</a>
          <a href="#" className="text-outline hover:text-primary transition-colors">Dribbble</a>
        </div>

        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 border border-outline-variant flex items-center justify-center text-outline hover:text-primary hover:border-primary transition-all group"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
