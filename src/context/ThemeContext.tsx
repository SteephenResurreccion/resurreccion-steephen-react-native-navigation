import React, { createContext, useContext, useMemo, useState } from "react";
import { DarkTheme, DefaultTheme, Theme as NavTheme } from "@react-navigation/native";

type AppTheme = "light" | "dark";

type ThemeTokens = {
  background: string;
  card: string;
  text: string;
  mutedText: string;
  border: string;
  primary: string;
  danger: string;
};

type ThemeContextValue = {
  theme: AppTheme;
  colors: ThemeTokens;
  toggleTheme: () => void;
  navTheme: NavTheme;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const lightTokens: ThemeTokens = {
  background: "#FFFFFF",
  card: "#F6F7F9",
  text: "#101114",
  mutedText: "#5B616E",
  border: "#E3E5EA",
  primary: "#2563EB",
  danger: "#DC2626",
};

const darkTokens: ThemeTokens = {
  background: "#0B0D12",
  card: "#141824",
  text: "#F3F4F6",
  mutedText: "#A3AAB8",
  border: "#263043",
  primary: "#60A5FA",
  danger: "#F87171",
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<AppTheme>("light");

  const toggleTheme = () => {
    // Straight toggle: predictable and easy to test
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  const colors = theme === "light" ? lightTokens : darkTokens;

  const navTheme = useMemo<NavTheme>(() => {
    // Keep navigation colors aligned with our tokens
    const base = theme === "light" ? DefaultTheme : DarkTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        background: colors.background,
        card: colors.card,
        text: colors.text,
        border: colors.border,
        primary: colors.primary,
      },
    };
  }, [theme, colors]);

  const value: ThemeContextValue = { theme, colors, toggleTheme, navTheme };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
