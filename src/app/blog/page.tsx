"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TextScramble } from "@/components/ui/text-scramble";

const posts = [
  {
    id: 1,
    title: "Mastering React Server Components",
    excerpt: "A deep dive into how RSCs are changing the way we build modern web applications and optimizing bundle sizes.",
    author: "Alice Johnson",
    date: "Oct 05, 2026",
    readTime: "5 min read",
    category: "Web Dev",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    title: "Getting Started with Jetpack Compose",
    excerpt: "Learn how to build native Android UI with declarative components and accelerate your app development.",
    author: "Mark Smith",
    date: "Sep 28, 2026",
    readTime: "8 min read",
    category: "Android",
    image: "https://images.unsplash.com/photo-1607252656733-fd7427187c33?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 3,
    title: "The Future of GenAI in Code Generation",
    excerpt: "Exploring the capabilities of LLMs as pair programmers and what it means for the future of software engineering.",
    author: "Sarah Lewis",
    date: "Sep 15, 2026",
    readTime: "6 min read",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 4,
    title: "Building Scalable Architectures",
    excerpt: "How to leverage microservices and modern container orchestration for robust global deployments.",
    author: "David Chen",
    date: "Sep 02, 2026",
    readTime: "12 min read",
    category: "Cloud",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600"
  }
];

export default function BlogPage() {
  return (
    <main className="flex-1 w-full flex flex-col items-center pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none z-0" />
      
      <div className="max-w-6xl mx-auto px-4 z-10 w-full relative">
        <div className="text-center mb-16">
          <TextScramble as="h1" className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Latest Insights</TextScramble>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Read articles and tutorials written by our core team and community members.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, idx) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group h-full flex flex-col bg-glass border border-glass-border backdrop-blur-xl rounded-[2rem] overflow-hidden hover:border-primary/50 transition-colors shadow-2xl cursor-pointer"
              >
                <div className="relative w-full h-64 overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur border border-glass-border px-4 py-1 rounded-full text-xs font-semibold text-primary">
                    {post.category}
                  </div>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-primary transition-colors leading-snug">{post.title}</h3>
                  <p className="text-foreground/70 mb-8 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-glass-border/60 text-sm text-foreground/60 font-medium">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        {post.author[0]}
                      </div>
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-glass-border" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
