"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CopySlash, Cpu, Smartphone, Cloud, PenTool, GitBranch } from "lucide-react";
import { HolographicCard } from "@/components/ui/holographic-card";
import { TextScramble } from "@/components/ui/text-scramble";

const domains = [
  { 
    title: "Web Development", 
    icon: CopySlash, 
    description: "Master modern web frameworks, frontend architecture, and robust backends.", 
    span: "col-span-1 md:col-span-2 row-span-2",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600"
  },
  { 
    title: "AI / ML", 
    icon: Cpu, 
    description: "Dive into machine learning, deep neural networks, and generative AI.", 
    span: "col-span-1 md:col-span-1",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600"
  },
  { 
    title: "Android", 
    icon: Smartphone, 
    description: "Build scalable and performant mobile experiences.", 
    span: "col-span-1 md:col-span-1",
    image: "https://images.unsplash.com/photo-1607252656733-fd7427187c33?auto=format&fit=crop&q=80&w=600"
  },
  { 
    title: "Cloud", 
    icon: Cloud, 
    description: "Deploy globally with modern cloud infrastructure.", 
    span: "col-span-1 md:col-span-1",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600"
  },
  { 
    title: "UI / UX", 
    icon: PenTool, 
    description: "Design beautiful, functional user interfaces.", 
    span: "col-span-1 md:col-span-1 w-full",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600"
  },
  { 
    title: "Open Source", 
    icon: GitBranch, 
    description: "Contribute to the global developer ecosystem.", 
    span: "col-span-1 md:col-span-2",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600"
  },
];

export function DomainsSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 z-10 relative">
        
        <div className="text-center mb-16">
          <TextScramble as="h2" className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Our Domains</TextScramble>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            We provide deep-dives and extensive workshops across various tech domains. Find your passion and start building.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[280px] gap-8">
          {domains.map((domain, idx) => {
            return (
              <motion.div
                key={domain.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="col-span-1 w-full h-full"
              >
                <HolographicCard 
                   title={domain.title}
                   description={domain.description}
                   icon={domain.icon}
                   span="w-full h-full"
                   image={domain.image}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
