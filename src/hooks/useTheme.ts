import { create } from 'zustand';

interface ThemeStore {
  theme: string | null;
  setTheme: (theme: string) => void;
}

const useTheme = create<ThemeStore>((set) => ({
  theme: null,
  setTheme: (theme: string) => {
    set({ theme: theme });
  },
}));

export default useTheme;
