"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<string>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (isDark ? "dark" : systemPrefersDark ? "dark" : "light");

    setTheme(initialTheme);
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(initialTheme);
    setMounted(true);

    // Skru på transitions igjen etter at første rendering er ferdig tegnet
    requestAnimationFrame(() => {
      root.classList.remove("disable-transitions");
    });
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme må brukes på innsiden av en ThemeProvider");
  }
  return context;
}
