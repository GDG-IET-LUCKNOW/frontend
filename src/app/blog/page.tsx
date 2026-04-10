"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TextScramble } from "@/components/ui/text-scramble";
import { fetchBlogs } from "@/api/api";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600";

export default function BlogPage() {
  const [posts, setPosts] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    const loadBlogs = async () => {
      try {
        setIsLoading(true);
        const data = await fetchBlogs();
        if (data && data.length > 0) {
           const mappedBlogs = data.map((b: any) => ({
             id: b._id || b.id,
             title: b.title || "Untitled",
             excerpt: b.content ? b.content.substring(0, 120) + "..." : "A deep dive into how changing the way we build modern web applications and optimizing bundle sizes.",
             author: b.author || "GDG Team",
             date: new Date(b.createdAt || Date.now()).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
             readTime: "5 min read",
             category: "Tech",
             image: (b.media && b.media.length > 0 && b.media[0].url) ? b.media[0].url : FALLBACK_IMAGE
           }));
           setPosts(mappedBlogs);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadBlogs();
  }, []);

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
          {isLoading ? (
            <div className="col-span-full h-40 flex items-center justify-center border border-glass-border/30 rounded-[2rem] bg-glass backdrop-blur">
              <p className="text-lg md:text-xl font-medium text-foreground/60 tracking-wide">Loading insights...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="col-span-full h-40 flex items-center justify-center border border-glass-border/30 rounded-[2rem] bg-glass backdrop-blur">
              <p className="text-lg md:text-xl font-medium text-foreground/60 tracking-wide">No insights published yet. Check back soon!</p>
            </div>
          ) : (
            posts.map((post, idx) => (
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
          )))}
        </div>
      </div>
    </main>
  );
}
