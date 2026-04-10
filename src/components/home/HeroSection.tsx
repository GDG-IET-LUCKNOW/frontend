"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import { BubbleScene } from "./BubbleScene";
import { BorderRotate } from "@/components/ui/animated-gradient-border";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Neon Elements */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start space-y-6"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-glass border border-glass-border backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-foreground/80 tracking-wide">Welcome to IETECH</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1]">
            Build. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
              Learn. <br /> Connect.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/70 max-w-lg leading-relaxed">
            IETECH is a dynamic community where developers, designers, and innovators come together to explore the future of technology.
          </p>
          
          <div className="flex items-center space-x-4 pt-4">
            <Link href="/join" className="group relative px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium overflow-hidden inline-block cursor-pointer">
              <span className="relative z-10 flex items-center">
                Join Community
                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
            <Link href="/events" className="px-6 py-3 rounded-full bg-glass border border-glass-border backdrop-blur-md font-medium hover:bg-glass/80 transition-colors inline-block cursor-pointer">
              Explore Events
            </Link>
          </div>
        </motion.div>

        {/* Right Content / 3D Canvas */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute inset-y-12 right-0 md:left-[55%] pointer-events-none md:-mr-12"
        >
          {/* We turn pointer-events-auto just on the Canvas container so user can interact */}
          <BorderRotate
            backgroundColor="transparent"
            animationMode="auto-rotate"
            animationSpeed={6}
            borderRadius={32}
            borderWidth={1}
            gradientColors={{
              primary: '#3b82f6',
              secondary: 'transparent',
              accent: '#8b5cf6'
            }}
            className="w-full h-full pointer-events-auto backdrop-blur-xl bg-white/5"
          >
            <BubbleScene />
          </BorderRotate>
        </motion.div>

      </div>
    </section>
  );
}
