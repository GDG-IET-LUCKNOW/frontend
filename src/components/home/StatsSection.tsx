"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { Users, BookOpen, Trophy, CalendarCheck } from "lucide-react";

const stats = [
  { label: "Members", value: "500+", icon: Users },
  { label: "Workshops", value: "30+", icon: BookOpen },
  { label: "Hackathons", value: "10+", icon: Trophy },
  { label: "Events Hosted", value: "120+", icon: CalendarCheck },
];

export function StatsSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 z-10 relative">
        <div 
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex flex-col items-center justify-center p-8 rounded-3xl bg-glass border border-glass-border backdrop-blur-md relative overflow-hidden group hover:border-primary/50 transition-colors"
              >
                {/* Subtle Glow inside the card */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <Icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
                  {stat.value}
                </h3>
                <p className="mt-2 text-sm font-medium text-foreground/60 uppercase tracking-widest">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
