"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { TextScramble } from "@/components/ui/text-scramble";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Neon Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 w-full relative z-10">

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center space-y-8"
        >
          <div className="inline-flex items-center space-x-3 px-5 py-2 md:px-6 md:py-2.5 rounded-full bg-glass border border-glass-border backdrop-blur-md">
            <span className="flex h-3 w-3 rounded-full bg-primary animate-pulse" />
            <span className="text-sm md:text-lg font-medium text-foreground/90 tracking-wide">Welcome to IETECH</span>
          </div>

          <h1 className="text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[7.5rem] font-bold tracking-tighter leading-[1.05] w-full whitespace-nowrap flex flex-wrap justify-center sm:block">
            <TextScramble as="span" duration={1.2}>Build.</TextScramble>
            {" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
              <TextScramble as="span" duration={1.6}>Learn. Connect.</TextScramble>
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-foreground/70 max-w-4xl leading-relaxed mx-auto">
            IETECH is IET Lucknow's premier tech community, where dynamic developers, creatives, and innovators converge to explore the frontiers of technology and build the future on campus.
          </p>

          <div className="flex items-center space-x-6 pt-8">
            <a href="https://chat.whatsapp.com/DNRnsEzErLAGTgKQsyKrCb" target="_blank" rel="noreferrer" className="group relative px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium overflow-hidden inline-block cursor-pointer text-lg">
              <span className="relative z-10 flex items-center">
                Join Community
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <Link href="/events" className="px-8 py-4 rounded-full bg-glass border border-glass-border backdrop-blur-md font-medium hover:bg-glass/80 transition-colors inline-block cursor-pointer text-lg">
              Explore Events
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
