"use client";

import * as React from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import Image from "next/image";
import { useTheme } from "next-themes";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const logoSrc = mounted && currentTheme === "dark" ? "/logo-dark.png" : "/logo-light.jpg";

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/events", label: "Events" },
    { href: "/blog", label: "Blog" },
    { href: "/projects", label: "Projects" },
    { href: "/team", label: "Team" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 py-4 md:py-6 transition-all duration-300">
      <div className="max-w-6xl mx-auto rounded-2xl bg-glass border border-glass-border backdrop-blur-xl shadow-lg flex items-center justify-between px-6 py-3 relative z-50">
        <Link href="/" prefetch={false} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-2">
          {mounted && <img src={logoSrc} alt="IETECH Logo" className="w-8 h-8 object-contain drop-shadow-md rounded-lg" />}
          {!mounted && <div className="w-8 h-8 bg-transparent" /> /* placeholder to prevent shifting */}
          <span className="font-bold text-lg tracking-tight">IETECH</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} prefetch={false} className="hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center space-x-3 md:space-x-4">
          <ThemeToggle />
          
          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden p-2 text-foreground/80 hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-4 right-4 mt-2 p-6 bg-background/95 border border-glass-border backdrop-blur-3xl rounded-2xl shadow-2xl flex flex-col space-y-4 md:hidden z-40"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                prefetch={false}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-foreground hover:text-primary py-3 transition-colors border-b border-glass-border/30 last:border-0"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
