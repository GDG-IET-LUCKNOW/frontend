"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { TextScramble } from "@/components/ui/text-scramble";
import { BorderRotate } from "@/components/ui/animated-gradient-border";
import { ArrowRight, Mail, User, BookOpen } from "lucide-react";

export default function JoinPage() {
  return (
    <main className="flex-1 w-full flex flex-col items-center pt-32 pb-24 relative overflow-hidden min-h-screen justify-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/15 rounded-full blur-[200px] pointer-events-none z-0" />
      
      <div className="max-w-2xl mx-auto px-4 z-10 w-full relative">
        <div className="text-center mb-12">
          <TextScramble as="h1" className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Join IETECH</TextScramble>
          <p className="text-foreground/70 text-lg">
            Become a part of our developer ecosystem today.
          </p>
        </div>
        
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.6 }}
        >
          <BorderRotate 
            borderRadius={32}
            borderWidth={3}
            animationMode="auto-rotate"
            gradientColors={{ primary: "#3b82f6", secondary: "#8b5cf6", accent: "#06b6d4" }}
            className="w-full bg-glass backdrop-blur-2xl shadow-2xl"
          >
            <form className="p-8 md:p-12 space-y-6 rounded-[32px] flex flex-col relative bg-background/40 backdrop-blur-3xl">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground/80 pl-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                  <input type="text" placeholder="John Doe" className="w-full bg-background/50 border border-glass-border rounded-xl py-4 pl-12 pr-4 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-foreground placeholder:text-foreground/30" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground/80 pl-1">University Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                  <input type="email" placeholder="john.doe@university.edu" className="w-full bg-background/50 border border-glass-border rounded-xl py-4 pl-12 pr-4 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-foreground placeholder:text-foreground/30" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground/80 pl-1">Major / Course</label>
                <div className="relative">
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                  <input type="text" placeholder="Computer Science" className="w-full bg-background/50 border border-glass-border rounded-xl py-4 pl-12 pr-4 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-foreground placeholder:text-foreground/30" />
                </div>
              </div>
              
              <button type="button" className="group relative w-full flex justify-center py-4 px-4 border border-transparent rounded-xl text-md font-bold text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all mt-4 overflow-hidden">
                <span className="relative z-10 flex items-center space-x-2">
                   <span>Submit Application</span>
                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              </button>
            </form>
          </BorderRotate>
        </motion.div>
      </div>
    </main>
  );
}
