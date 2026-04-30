"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TextScramble } from "@/components/ui/text-scramble";
import { ArrowRight } from "lucide-react";
import { fetchProjects, formatImageUrl } from "@/api/api";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1604933762023-7213af7ff7a7?auto=format&fit=crop&q=80&w=800";

export default function ProjectsPage() {
  const [projects, setProjects] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetchProjects().then((data: any[]) => {
      setProjects(data || []);
      setIsLoading(false);
    });
  }, []);

  return (
    <main className="flex-1 w-full flex flex-col items-center pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-[15%] right-[5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[0%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-4 z-10 w-full relative">
        <div className="text-center mb-16">
          <TextScramble as="h1" className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Open Source
          </TextScramble>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Explore the projects built and maintained by our community — from campus tools to production-grade open source software.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-72 rounded-[2rem] bg-glass border border-glass-border animate-pulse" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="h-40 flex items-center justify-center border border-glass-border/30 rounded-[2rem] bg-glass backdrop-blur">
            <p className="text-lg md:text-xl font-medium text-foreground/60 tracking-wide">No projects published yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => {
              const images: string[] = project.media?.map((m: any) => m.url).filter(Boolean) || [];
              const cover = images[0] ? formatImageUrl(images[0]) : FALLBACK_IMAGE;
              const techStack: string[] = Array.isArray(project.techStack) ? project.techStack : [];

              return (
                <Link key={project._id} href={`/projects/${project._id}`} prefetch={false}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="group h-full flex flex-col bg-glass border border-glass-border backdrop-blur-xl rounded-[2rem] overflow-hidden hover:border-primary/50 transition-all duration-500 shadow-xl hover:shadow-primary/10 cursor-pointer"
                  >
                    {/* Cover Image */}
                    <div className="relative w-full h-52 overflow-hidden">
                      <img
                        src={cover}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                      {images.length > 1 && (
                        <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full border border-white/20">
                          +{images.length - 1} photos
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-foreground/60 text-sm leading-relaxed mb-4 line-clamp-3">
                        {(project.description || "No description provided.").replace(/<[^>]*>?/gm, '')}
                      </p>

                      {/* Tech Stack */}
                      {techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {techStack.slice(0, 4).map((tech: string, i: number) => (
                            <span key={i} className="text-[11px] px-2 py-0.5 rounded-full border border-primary/20 bg-primary/10 text-primary font-medium">
                              {tech}
                            </span>
                          ))}
                          {techStack.length > 4 && (
                            <span className="text-[11px] px-2 py-0.5 rounded-full border border-glass-border bg-white/5 text-foreground/60 font-medium">
                              +{techStack.length - 4} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* CTA */}
                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-glass-border/50 text-sm font-semibold text-primary">
                        <span>View Project</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
