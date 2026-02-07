import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";

type AppTheme = "light" | "dark";

type ThemeColors = {
  background: string;
  card: string;
  text: string;
  mutedText: string;
  border: string;
  primary: string;
};

type ThemeContextValue = {
  theme: AppTheme;
  colors: ThemeColors;
  toggleTheme: () => void;
  navTheme: Theme;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const STORAGE_KEY = "@light_sweet_theme";

const light = {
  background: "#FFF7ED",
  card: "#FFFFFF",
  text: "#1F2937",
  mutedText: "#6B7280",
  border: "#FED7AA",
  primary: "#E11D48",
};

const dark = {
  background: "#120B0A",
  card: "#1C1210",
  text: "#F9FAFB",
  mutedText: "#9CA3AF",
  border: "#3B2A24",
  primary: "#FB7185",
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<AppTheme>("light");
  const colors = theme === "light" ? light : dark;

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((v) => {
      if (v === "light" || v === "dark") setTheme(v);
    });
  }, []);

  const toggleTheme = () => {
    setTheme((t) => {
      const next = t === "light" ? "dark" : "light";
      AsyncStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  };

  const navTheme = useMemo(
    () => ({
      ...(theme === "light" ? DefaultTheme : DarkTheme),
      colors: {
        ...(theme === "light" ? DefaultTheme.colors : DarkTheme.colors),
        background: colors.background,
        card: colors.card,
        text: colors.text,
        border: colors.border,
        primary: colors.primary,
      },
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, navTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
