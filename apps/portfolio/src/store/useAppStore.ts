import { create } from 'zustand';

interface AppState {
  language: 'EN' | 'VN';
  theme: 'dark' | 'light';
  isMenuOpen: boolean;
  setLanguage: (lang: 'EN' | 'VN') => void;
  toggleTheme: () => void;
  setMenuOpen: (isOpen: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  language: 'EN',
  theme: 'dark',
  isMenuOpen: false,
  setLanguage: (language) => set({ language }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  setMenuOpen: (isMenuOpen) => set({ isMenuOpen }),
}));
