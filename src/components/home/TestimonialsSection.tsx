"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { TextScramble } from "@/components/ui/text-scramble";
import { fetchCommunityStories } from "@/api/api";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCommunityStories();
        if (data && data.length > 0) {
          const storiesArr = data.data || data; 
          setTestimonials(storiesArr);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTestimonials();
  }, []);

  return (
    <section className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 z-10 relative">
        <div className="text-center mb-16">
          <TextScramble as="h2" className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Community Stories</TextScramble>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Hear from our members about their journey and experiences with IETECH.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full h-40 flex items-center justify-center border border-glass-border/30 rounded-[2rem] bg-glass backdrop-blur">
              <p className="text-lg md:text-xl font-medium text-foreground/60 tracking-wide">Loading stories...</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="col-span-full h-40 flex items-center justify-center border border-glass-border/30 rounded-[2rem] bg-glass backdrop-blur">
              <p className="text-lg md:text-xl font-medium text-foreground/60 tracking-wide">No community stories listed yet!</p>
            </div>
          ) : (
            testimonials.map((test, idx) => {
              const formatUrl = (url: string) => {
                if (!url) return "#";
                return url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
              };

              return (
                <motion.div
                  key={test._id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  className="p-8 rounded-[2rem] bg-glass border border-glass-border backdrop-blur-md relative flex flex-col"
                >
                  <Quote className="w-8 h-8 text-primary/40 mb-6" />
                  <p className="text-foreground/80 font-medium leading-relaxed mb-8">
                    &ldquo;{test.quote}&rdquo;
                  </p>
                  <div className="mt-auto flex items-end justify-between">
                    <div>
                      <p className="font-bold">{test.name}</p>
                      <p className="text-sm text-primary">{test.domain}</p>
                    </div>
                    
                    {(test.github || test.linkedin) && (
                      <div className="flex space-x-3 shrink-0">
                        {test.github && (
                          <a href={formatUrl(test.github)} target="_blank" rel="noopener noreferrer" className="text-foreground/40 hover:text-foreground transition-colors inline-block">
                            <GithubIcon className="w-5 h-5" />
                          </a>
                        )}
                        {test.linkedin && (
                          <a href={formatUrl(test.linkedin)} target="_blank" rel="noopener noreferrer" className="text-foreground/40 hover:text-[#0077b5] transition-colors inline-block">
                            <LinkedinIcon className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
