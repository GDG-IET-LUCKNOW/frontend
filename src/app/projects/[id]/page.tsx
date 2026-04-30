"use client";
import * as React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { TextScramble } from "@/components/ui/text-scramble";
import { ArrowLeft, ArrowRight, Globe, ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { fetchProjectById, formatImageUrl } from "@/api/api";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export default function ProjectDetailPage() {
  const params = useParams();
  const { id } = params;

  const [project, setProject] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  const allImages: string[] = React.useMemo(() => {
    if (!project) return [];
    const imgs: string[] = [];
    if (project.media && project.media.length > 0) {
      project.media.forEach((m: any) => { if (m.url) imgs.push(formatImageUrl(m.url)); });
    } else if (project.mediaUrl) {
      imgs.push(formatImageUrl(project.mediaUrl));
    }
    return imgs;
  }, [project]);

  const nextImage = () => {
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex + 1) % allImages.length);
  };
  const prevImage = () => {
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex - 1 + allImages.length) % allImages.length);
  };

  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") setLightboxIndex(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, allImages.length]);

  React.useEffect(() => {
    if (id) {
      setLoading(true);
      fetchProjectById(id as string).then(data => {
        setProject(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <main className="flex-1 w-full flex flex-col items-center justify-center pt-32 pb-24 h-screen">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (!project) {
    return (
      <main className="flex-1 w-full flex flex-col items-center justify-center pt-32 pb-24 h-screen">
        <TextScramble as="h1" className="text-4xl font-bold tracking-tight mb-8 leading-tight">Project not found</TextScramble>
        <Link href="/projects" className="inline-flex items-center space-x-2 text-primary hover:underline transition-colors mt-4 font-medium">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>
      </main>
    );
  }

  const techStack: string[] = Array.isArray(project.techStack) ? project.techStack : [];
  const coverImage = allImages[0] || "https://images.unsplash.com/photo-1604933762023-7213af7ff7a7?auto=format&fit=crop&q=80&w=1200";

  return (
    <main className="flex-1 w-full flex flex-col items-center pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto px-4 z-10 w-full relative">
        <Link href="/projects" className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main Content */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20">
                Open Source
              </div>
            </div>

            <TextScramble as="h1" className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
              {project.title}
            </TextScramble>

            {/* Cover Image */}
            <div
              className="w-full h-[320px] md:h-[420px] relative rounded-[2rem] overflow-hidden mb-10 border border-glass-border shadow-2xl cursor-pointer group"
              onClick={() => setLightboxIndex(0)}
            >
              <Image src={coverImage} alt="Project Cover" fill className="object-cover transition-transform group-hover:scale-105 duration-700" unoptimized />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 font-bold text-white shadow-xl">View Full Image</span>
              </div>
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="prose prose-invert prose-lg max-w-none mb-12 text-foreground/80 leading-relaxed"
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">About this Project</h2>
              <div 
                className="mb-6 break-words whitespace-pre-wrap [&>*]:break-words [&>*]:whitespace-pre-wrap overflow-hidden"
                dangerouslySetInnerHTML={{ __html: project.description || "No description provided." }}
              />
            </motion.div>

            {/* Gallery */}
            {allImages.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-foreground mb-6">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {allImages.slice(1).map((img, i) => (
                    <div
                      key={i}
                      className="aspect-square relative rounded-2xl overflow-hidden border border-glass-border shadow-lg group cursor-pointer"
                      onClick={() => setLightboxIndex(i + 1)}
                    >
                      <Image src={img} alt={`Gallery ${i + 1}`} fill className="object-cover transition-transform duration-500 group-hover:scale-110" unoptimized />
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ArrowRight className="w-6 h-6 text-white -rotate-45" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-32 flex flex-col bg-glass border border-glass-border backdrop-blur-xl rounded-[2rem] p-8 shadow-2xl space-y-6"
            >
              <h3 className="text-2xl font-bold">Project Info</h3>

              {/* Tech Stack */}
              {techStack.length > 0 && (
                <div>
                  <div className="text-xs uppercase tracking-widest font-bold text-foreground/50 mb-3">Tech Stack</div>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech, i) => (
                      <span key={i} className="text-xs px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Image count */}
              {allImages.length > 0 && (
                <div>
                  <div className="text-xs uppercase tracking-widest font-bold text-foreground/50 mb-1">Media</div>
                  <div className="text-foreground/70 text-sm">{allImages.length} image{allImages.length !== 1 ? "s" : ""}</div>
                </div>
              )}

              {/* GitHub (Source) Button */}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="group w-full py-4 rounded-xl flex items-center justify-center space-x-2 font-bold transition-all bg-white/5 hover:bg-white/10 text-foreground shadow-xl border border-glass-border cursor-pointer"
                >
                  <GithubIcon className="w-5 h-5" />
                  <span>View Source</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              )}

              {/* Live Preview Button */}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="group w-full py-4 rounded-xl flex items-center justify-center space-x-2 font-bold transition-all bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl border border-transparent cursor-pointer"
                >
                  <Globe className="w-5 h-5" />
                  <span>Live Preview</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && allImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]" onClick={e => { e.stopPropagation(); setLightboxIndex(null); }}>
              <X className="w-8 h-8" />
            </button>

            <button className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors z-[110]" onClick={e => { e.stopPropagation(); prevImage(); }}>
              <ChevronLeft className="w-12 h-12" />
            </button>

            <div className="relative w-full max-w-5xl aspect-video md:aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 shadow-2xl" onClick={e => e.stopPropagation()}>
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 1.1, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <Image src={allImages[lightboxIndex]} alt={`Lightbox ${lightboxIndex}`} fill className="object-contain" unoptimized />
              </motion.div>
            </div>

            <button className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors z-[110]" onClick={e => { e.stopPropagation(); nextImage(); }}>
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
