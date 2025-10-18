"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "system",
  setMode: () => {},
});

export const useThemeMode = () => useContext(ThemeContext);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("system");
  const [resolvedMode, setResolvedMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme-mode") as ThemeMode | null;
    if (stored) setMode(stored);
  }, []);

  useEffect(() => {
    if (mode === "system") {
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      setResolvedMode(mql.matches ? "dark" : "light");
      const listener = (e: MediaQueryListEvent) =>
        setResolvedMode(e.matches ? "dark" : "light");
      mql.addEventListener("change", listener);
      return () => mql.removeEventListener("change", listener);
    } else {
      setResolvedMode(mode);
    }
    localStorage.setItem("theme-mode", mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: resolvedMode,
          ...(resolvedMode === "light"
            ? {
                background: { default: "#f9fafb", paper: "#ffffff" },
                primary: { main: "#2563eb" },
                secondary: { main: "#f59e0b" },
              }
            : {
                background: { default: "#111827", paper: "#1f2937" },
                primary: { main: "#3b82f6" },
                secondary: { main: "#fbbf24" },
              }),
        },
        typography: {
          fontFamily: "'Inter', sans-serif",
        },
      }),
    [resolvedMode]
  );

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className={resolvedMode === "dark" ? "dark" : ""}>{children}</div>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
