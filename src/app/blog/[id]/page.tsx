"use client";
import * as React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { TextScramble } from "@/components/ui/text-scramble";
import { Calendar, Clock, ArrowLeft, ArrowRight, User, ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { fetchBlogById } from "@/api/api";

export default function BlogDetailPage() {
  const params = useParams();
  const { id } = params;

  const [blog, setBlog] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % allImages.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + allImages.length) % allImages.length);
    }
  };

  React.useEffect(() => {
    if (id) {
      setLoading(true);
      fetchBlogById(id as string).then(data => {
        setBlog(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <main className="flex-1 w-full flex flex-col items-center justify-center pt-32 pb-24 h-screen">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="flex-1 w-full flex flex-col items-center justify-center pt-32 pb-24 h-screen">
        <TextScramble as="h1" className="text-4xl font-bold tracking-tight mb-8 leading-tight">Article not found</TextScramble>
        <Link href="/blog" className="inline-flex items-center space-x-2 text-primary hover:underline transition-colors mt-4 font-medium">
           <ArrowLeft className="w-4 h-4" />
           <span>Back to Articles</span>
        </Link>
      </main>
    );
  }

  const title = blog.title || "Untitled Article";
  const author = blog.author || "Admin";
  const dateStr = blog.createdAt ? new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : "TBA";
  const content = blog.content || "";
  const allImages: string[] = [];
  
  if (blog.media && blog.media.length > 0) {
    blog.media.forEach((m: any) => {
      if (m.url) allImages.push(m.url);
    });
  } else if (blog.mediaUrl) {
    allImages.push(blog.mediaUrl);
  }

  return (
    <main className="flex-1 w-full flex flex-col items-center pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-[5%] left-[20%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px] pointer-events-none z-0" />
      
      <div className="max-w-4xl mx-auto px-4 z-10 w-full relative">
        <Link href="/blog" className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors mb-8 font-medium">
           <ArrowLeft className="w-4 h-4" />
           <span>Back to Articles</span>
        </Link>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60 mb-6 font-medium">
          <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20">Article</div>
          <div className="flex items-center space-x-2"><Calendar className="w-4 h-4" /><span>{dateStr}</span></div>
          <div className="flex items-center space-x-2"><Clock className="w-4 h-4" /><span>{Math.ceil(content.length / 500)} min read</span></div>
        </div>
        
        <TextScramble as="h1" className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">{title}</TextScramble>
        
        <div className="flex items-center space-x-4 mb-12 border-b border-glass-border/50 pb-8">
           <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg border border-primary/30 shadow-lg">
              {author[0].toUpperCase()}
           </div>
           <div>
             <div className="font-bold text-lg">{author}</div>
             <div className="text-sm text-foreground/60">Community Contributor</div>
           </div>
        </div>
        
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="prose prose-invert prose-lg max-w-none prose-headings:text-foreground hover:prose-a:text-primary/80"
        >
          {allImages.length > 0 && (
            <div 
              className="w-full h-[400px] md:h-[500px] relative rounded-[2rem] overflow-hidden mb-12 border border-glass-border shadow-2xl cursor-pointer group"
              onClick={() => setLightboxIndex(0)}
            >
               <Image src={allImages[0]} alt="Blog Header" fill className="object-cover transition-transform group-hover:scale-105 duration-700" />
               <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 font-bold text-white shadow-xl">View Full Image</span>
               </div>
            </div>
          )}
          
          <div className="text-foreground/80 leading-relaxed space-y-6">
            {content.split('\n').map((paragraph: string, i: number) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {allImages.length > 1 && (
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
              {allImages.slice(1).map((img, i) => (
                <div 
                  key={i} 
                  className="aspect-video relative rounded-2xl overflow-hidden border border-glass-border shadow-xl hover:shadow-primary/10 transition-all group cursor-pointer"
                  onClick={() => setLightboxIndex(i + 1)}
                >
                  <Image src={img} alt={`Gallery ${i}`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ArrowRight className="w-8 h-8 text-white -rotate-45" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <motion.button
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
            >
              <X className="w-8 h-8" />
            </motion.button>

            <button
              className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors z-[110]"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
            >
              <ChevronLeft className="w-12 h-12" />
            </button>

            <div 
              className="relative w-full max-w-5xl aspect-video md:aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 1.1, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <Image 
                  src={allImages[lightboxIndex]} 
                  alt={`Lightbox ${lightboxIndex}`} 
                  fill 
                  className="object-contain" 
                />
              </motion.div>
            </div>

            <button
              className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors z-[110]"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
            >
              <ChevronRight className="w-12 h-12" />
            </button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 font-mono text-sm">
              {lightboxIndex + 1} / {allImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
