"use client";
import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TextScramble } from "@/components/ui/text-scramble";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76 0-1.5-.5-2.8-1.4-3.8.1-.3.6-1.8-.1-3.8 0 0-1.2-.4-3.9 1.4a12.3 12.3 0 0 0-7 0C4.3 2.5 3 2.9 3 2.9c-.7 2-.2 3.5-.1 3.8-.9 1-1.4 2.3-1.4 3.8 0 5.2 3 6.4 6 6.76-.9.8-1.1 2-1.2 2.8v4" />
    <path d="M9 20c-3 1-5-1-6-3" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const team = [
  {
    name: "Alex Rivera",
    role: "Lead Organizer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
  },
  {
    name: "Samantha Lee",
    role: "Tech Lead - AI/ML",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300",
  },
  {
    name: "Marcus Johnson",
    role: "Tech Lead - Web",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
  },
  {
    name: "Elena Rodriguez",
    role: "UI/UX Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300",
  },
  {
    name: "David Kim",
    role: "Event Coordinator",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300",
  },
  {
    name: "Priya Patel",
    role: "Marketing Manager",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
  }
];

export default function TeamPage() {
  return (
    <main className="flex-1 w-full flex flex-col items-center pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none z-0" />
      
      <div className="max-w-6xl mx-auto px-4 z-10 w-full relative">
        <div className="text-center mb-20">
          <TextScramble as="h1" className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Meet the Team</TextScramble>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            The passionate developers and designers driving the IETECH community forward.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {team.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group flex flex-col items-center text-center p-10 rounded-[2.5rem] bg-glass border border-glass-border backdrop-blur-xl shadow-2xl hover:border-primary/50 transition-all duration-500"
            >
              <h3 className="text-3xl font-bold mb-3 group-hover:text-primary transition-colors">{member.name}</h3>
              <p className="text-primary/70 font-semibold mb-8 uppercase tracking-widest text-xs">{member.role}</p>
              
              <div className="flex items-center justify-center space-x-4">
                <button className="w-10 h-10 rounded-full bg-background/40 border border-glass-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors shadow-lg">
                   <TwitterIcon className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full bg-background/40 border border-glass-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors shadow-lg">
                   <GithubIcon className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full bg-background/40 border border-glass-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors shadow-lg">
                   <LinkedinIcon className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
