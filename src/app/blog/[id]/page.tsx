"use client";
import * as React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { TextScramble } from "@/components/ui/text-scramble";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BlogDetailPage() {
  const params = useParams();
  const { id } = params;
  
  return (
    <main className="flex-1 w-full flex flex-col items-center pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-[5%] left-[20%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px] pointer-events-none z-0" />
      
      <div className="max-w-4xl mx-auto px-4 z-10 w-full relative">
        <Link href="/blog" className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors mb-8 font-medium">
           <ArrowLeft className="w-4 h-4" />
           <span>Back to Articles</span>
        </Link>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60 mb-6 font-medium">
          <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20">Web Dev</div>
          <div className="flex items-center space-x-2"><Calendar className="w-4 h-4" /><span>Oct 05, 2026</span></div>
          <div className="flex items-center space-x-2"><Clock className="w-4 h-4" /><span>5 min read</span></div>
        </div>
        
        <TextScramble as="h1" className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">Mastering React Server Components {id ? `(Post ${id})` : ''}</TextScramble>
        
        <div className="flex items-center space-x-4 mb-12 border-b border-glass-border/50 pb-8">
           <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg border border-primary/30 shadow-lg">
              A
           </div>
           <div>
             <div className="font-bold text-lg">Alice Johnson</div>
             <div className="text-sm text-foreground/60">Senior Frontend Engineer</div>
           </div>
        </div>
        
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="prose prose-invert prose-lg max-w-none prose-headings:text-foreground hover:prose-a:text-primary/80"
        >
          <div className="w-full h-[400px] md:h-[500px] relative rounded-[2rem] overflow-hidden mb-12 border border-glass-border shadow-2xl">
             <Image src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200" alt="React Server Components" fill className="object-cover" />
          </div>
          
          <p className="text-xl text-foreground/80 leading-relaxed mb-8">
            React Server Components (RSCs) represent one of the most significant paradigm shifts in the React ecosystem since hooks. By allowing components to render exclusively on the server, we can radically reduce client-side bundle sizes and significantly decrease Data fetching waterfalls.
          </p>
          
          <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">The Bundle Size Dilemma</h2>
          <p className="text-foreground/70 leading-relaxed mb-6">
            Historically, importing heavy libraries like markdown parsers or syntax highlighters meant shipping thousands of kilobytes of JavaScript directly to your user's browser. With RSCs, the heavy lifting occurs exactly where it should: on your server. The client receives only the fully hydrated, lightweight HTML resulting from the component execution.
          </p>
          
          <div className="bg-glass border border-glass-border p-8 rounded-2xl my-8 font-mono text-sm text-primary shadow-xl">
             // Example RSC Data Fetching<br/>
             export default async function Page() &#123;<br/>
             &nbsp;&nbsp;const data = await fetchDatabaseQuery();<br/>
             &nbsp;&nbsp;return &lt;ServerDataDisplay data=&#123;data&#125; /&gt;;<br/>
             &#125;
          </div>
          
          <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">Embracing the Edge</h2>
          <p className="text-foreground/70 leading-relaxed mb-6">
             When deploying RSCs on edge infrastructural tiers, Time-To-First-Byte (TTFB) shrinks dramatically. Components aren't just rendered server-side; they're rendered directly in the CDN pop nearest to your requesting user. 
          </p>
        </motion.div>
      </div>
    </main>
  );
}
