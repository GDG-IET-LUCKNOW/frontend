"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden flex items-center justify-center">
      {/* Intense Glowing Portal Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] pointer-events-none animate-pulse" />
      
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-1 px-6 rounded-full bg-glass border border-glass-border backdrop-blur-md mb-8 inline-block"
        >
          <span className="text-sm font-medium">Join the next generation of builders</span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50"
        >
          Ready to Join <br /> the Future?
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a href="https://chat.whatsapp.com/DNRnsEzErLAGTgKQsyKrCb" target="_blank" rel="noreferrer" className="group relative px-8 py-4 rounded-full font-bold text-lg overflow-hidden bg-foreground text-background transition-transform hover:scale-105 active:scale-95 inline-block cursor-pointer">
            <span className="relative z-10">Become a Member</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
