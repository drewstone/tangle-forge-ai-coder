
import { create } from "zustand";
import { useEffect } from 'react';

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useTheme = create<ThemeStore>((set) => ({
  theme: "dark",
  setTheme: (theme) => {
    set({ theme });
    
    // Apply theme to document
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    
    // Save theme preference
    localStorage.setItem('theme', theme);
  },
}));

// Hook to initialize theme from saved preferences
export const ThemeInitializer = () => {
  const { setTheme } = useTheme();
  
  useEffect(() => {
    // Check for saved theme or use system preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Use system preference as fallback
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDarkMode ? 'dark' : 'light');
    }
  }, [setTheme]);
  
  return null;
};
