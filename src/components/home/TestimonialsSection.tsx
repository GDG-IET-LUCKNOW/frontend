"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "IETECH helped me connect with amazing people, attend top-tier workshops, and grow immensely as a developer.",
    author: "Ath Tripathi",
    role: "Web Development"
  },
  {
    quote: "The hackathons organized by IETECH were the highlight of my semester. I learned more in 48 hours than in months of classes.",
    author: "Mayank Tripathi",
    role: "Web Development"
  },
  {
    quote: "Joining the community gave me the mentorship I needed to land my first real internship in tech.",
    author: "Adarsh Gupta",
    role: "Web Development"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 z-10 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Community Stories</h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Hear from our members about their journey and experiences with IETECH.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="p-8 rounded-[2rem] bg-glass border border-glass-border backdrop-blur-md relative"
            >
              <Quote className="w-8 h-8 text-primary/40 mb-6" />
              <p className="text-foreground/80 font-medium leading-relaxed mb-8">
                "{test.quote}"
              </p>
              <div className="mt-auto">
                <p className="font-bold">{test.author}</p>
                <p className="text-sm text-primary">{test.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
