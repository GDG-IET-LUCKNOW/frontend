"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { TextScramble } from "@/components/ui/text-scramble";
import { Users, Globe2, Code, Megaphone } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="flex-1 w-full flex flex-col items-center pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-32 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px] pointer-events-none z-0" />
      
      <div className="max-w-6xl mx-auto px-4 z-10 w-full relative">
        <TextScramble as="h1" className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-center">ABOUT IETECH</TextScramble>
        
        <div className="bg-glass border border-glass-border backdrop-blur-xl rounded-[3rem] p-8 md:p-20 shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-background/50 to-transparent pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 space-y-8 text-lg text-foreground/80 leading-relaxed max-w-4xl mx-auto"
          >
            <p className="text-xl md:text-2xl text-foreground font-medium">
              IETECH is an independent, dynamic university-based technology community focused on architecting the next era of engineering and scientific innovation.
            </p>
            <p className="text-foreground/70">
              Students from all undergraduate or graduate programs with an interest in growing as developers, engineers, and researchers are welcome. By joining IETECH, members elevate their foundational knowledge within a peer-to-peer intensive lab environment and formulate breakthrough solutions addressing highly complex localized and global constraints.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
              {[
                { icon: Code, title: "Learn via Workshops", desc: "Gain hands-on experience covering the latest trends in UI/UX, Cloud, AI, and Android." },
                { icon: Users, title: "Connect with Peers", desc: "Meet students interested in developer technologies at your university." },
                { icon: Megaphone, title: "Innovate Solutions", desc: "Apply new learnings to build great solutions for local problems." },
                { icon: Globe2, title: "Global Network", desc: "Gain connections that can lead to potential career and industry placements." }
              ].map((item, idx) => (
                 <div key={item.title} className="flex flex-col space-y-4 p-8 rounded-3xl bg-background/40 border border-glass-border hover:bg-glass/80 transition-all duration-300 group">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-sm text-foreground/60 leading-relaxed">{item.desc}</p>
                 </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
