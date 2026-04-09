"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full p-2 bg-glass border border-glass-border backdrop-blur-md hover:bg-glass/80 transition-all duration-300 relative group"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 text-foreground transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 top-2 left-2 text-foreground transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
    </button>
  );
}
