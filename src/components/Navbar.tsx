"use client";

import * as React from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import Image from "next/image";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();

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
            <Link key={link.href} href={link.href} prefetch={false} className="relative group py-1">
              <span className={cn(
                "relative z-10 transition-colors duration-300",
                (pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href))) ? "text-primary" : "hover:text-primary"
              )}>
                {link.label}
              </span>
              <span className={cn(
                "absolute -bottom-1 left-0 w-full h-[2px] bg-primary transition-transform duration-300 origin-left rounded-full",
                (pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href))) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              )} />
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
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
              return (
              <Link 
                key={link.href} 
                href={link.href} 
                prefetch={false}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-lg font-medium py-3 transition-colors border-b border-glass-border/30 last:border-0 relative flex items-center justify-between group",
                  isActive ? "text-primary" : "text-foreground hover:text-primary"
                )}
              >
                <span>{link.label}</span>
                {isActive ? (
                  <motion.div layoutId="mobile-nav-indicator" className="w-2 h-2 rounded-full bg-primary" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-50 transition-opacity" />
                )}
              </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
