"use client";

import React, { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import { useTheme } from "next-themes";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 127.14 96.36"
    className={className}
    fill="currentColor"
  >
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
  </svg>
);

export function Footer() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const logoSrc = mounted && currentTheme === "dark" ? "/logo-dark.png" : "/logo-light.jpg";

  return (
    <footer className="border-t border-glass-border bg-background/50 backdrop-blur-lg pt-24 pb-8 px-4 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-16 relative z-10">
        
        {/* Left Side: Branding & Tagline */}
        <div className="flex flex-col items-center md:items-start space-y-6 max-w-xl text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-end items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-3">
              {mounted && <img src={logoSrc} alt="IETECH Logo" className="w-10 h-10 object-contain drop-shadow-md rounded-lg" />}
              {!mounted && <div className="w-10 h-10 bg-transparent" />}
              <span className="font-extrabold text-4xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary">IETECH</span>
            </div>
            <div className="h-6 w-px bg-glass-border hidden md:block"></div>
            <span className="text-foreground/70 font-semibold text-xl tracking-wide">IET Lucknow</span>
          </div>
          
          <h2 className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60 leading-relaxed md:leading-tight">
            Empowering the next generation of developers and tech innovators.
          </h2>
        </div>

        {/* Right Side: Contact & Socials */}
        <div className="flex flex-col items-center md:items-start space-y-10">
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="text-sm font-bold tracking-widest uppercase text-foreground/40">Drop us a line</h3>
            <a 
              href="mailto:gdgietlucknow@gmail.com" 
              className="inline-flex items-center justify-center space-x-3 px-8 py-3.5 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all duration-300 font-bold text-sm w-max group"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Contact Us</span>
            </a>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-5 w-full md:w-auto">
             <h3 className="text-sm font-bold tracking-widest uppercase text-foreground/40">Connect With Us</h3>
             <div className="flex items-center space-x-4 text-foreground/70">
                <a href="#" aria-label="Instagram" className="p-3.5 bg-glass border border-glass-border rounded-xl hover:text-[#E1306C] hover:border-[#E1306C]/50 hover:bg-[#E1306C]/10 transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md">
                  <InstagramIcon className="w-6 h-6" />
                </a>
                <a href="#" aria-label="LinkedIn" className="p-3.5 bg-glass border border-glass-border rounded-xl hover:text-[#0077b5] hover:border-[#0077b5]/50 hover:bg-[#0077b5]/10 transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md">
                  <LinkedinIcon className="w-6 h-6" />
                </a>
                <a href="#" aria-label="Discord" className="p-3.5 bg-glass border border-glass-border rounded-xl hover:text-[#5865F2] hover:border-[#5865F2]/50 hover:bg-[#5865F2]/10 transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md">
                  <DiscordIcon className="w-6 h-6" />
                </a>
             </div>
          </div>
        </div>

      </div>
      
      {/* Copyright Banner */}
      <div className="border-t border-glass-border/30 pt-8 mt-16 flex flex-col justify-center items-center text-sm text-foreground/40 font-medium text-center relative z-10 w-full tracking-wide">
        &copy; {new Date().getFullYear()} IETECH | IET Lucknow. All rights reserved.
      </div>
    </footer>
  );
}
