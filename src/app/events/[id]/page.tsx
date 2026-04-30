"use client";
import * as React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { TextScramble } from "@/components/ui/text-scramble";
import { Calendar, MapPin, Clock, ArrowLeft, ArrowRight, User, Users, ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { fetchEventById, formatImageUrl } from "@/api/api";

export default function EventDetailPage() {
  const params = useParams();
  const { id } = params;

  const [event, setEvent] = React.useState<any>(null);
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
      fetchEventById(id as string).then(data => {
        setEvent(data);
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

  if (!event) {
    return (
      <main className="flex-1 w-full flex flex-col items-center justify-center pt-32 pb-24 h-screen">
        <TextScramble as="h1" className="text-4xl font-bold tracking-tight mb-8 leading-tight">Event not found</TextScramble>
        <Link href="/events" className="inline-flex items-center space-x-2 text-primary hover:underline transition-colors mt-4 font-medium">
           <ArrowLeft className="w-4 h-4" />
           <span>Back to Events</span>
        </Link>
      </main>
    );
  }

  const title = event.title || "Untitled Event";
  const isTBA = event.isTBA || false;
  const dateStr = isTBA ? "To Be Announced" : (event.date ? new Date(event.date).toLocaleDateString() : (event.createdAt ? new Date(event.createdAt).toLocaleDateString() : "To Be Announced"));
  const timeStr = isTBA ? "To Be Announced" : (event.time || "To Be Announced");
  const location = isTBA ? "To Be Announced" : (event.location || "To Be Announced");
  const capacity = isTBA ? "To Be Announced" : (event.capacity || "N/A");
  const description = event.description || "No description provided.";
  const type = event.type || "Event";
  
  let coverImage = "https://images.unsplash.com/photo-1639762681485-074b7f4ec651?auto=format&fit=crop&q=80&w=1200";
  const allImages: string[] = [];
  
  if (event.media && event.media.length > 0) {
    event.media.forEach((m: any) => {
      if (m.url) allImages.push(formatImageUrl(m.url));
    });
  } else if (event.mediaUrl) {
    allImages.push(formatImageUrl(event.mediaUrl));
  }

  if (allImages.length > 0) {
    coverImage = allImages[0];
  }
  
  return (
    <main className="flex-1 w-full flex flex-col items-center pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[140px] pointer-events-none z-0" />
      
      <div className="max-w-5xl mx-auto px-4 z-10 w-full relative">
        <Link href="/events" className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors mb-8 font-medium">
           <ArrowLeft className="w-4 h-4" />
           <span>Back to Events</span>
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 flex flex-col">
            <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60 mb-6 font-medium">
              <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20">{type}</div>
            </div>
            
            <TextScramble as="h1" className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-tight break-normal text-balance">{title}</TextScramble>
            
            <div 
               className="w-full relative rounded-[2rem] overflow-hidden mb-12 border border-glass-border shadow-2xl cursor-pointer group bg-black/5"
               onClick={() => setLightboxIndex(0)}
            >
               <img 
                 src={coverImage} 
                 alt="Event Cover" 
                 className="w-full h-auto block transition-transform group-hover:scale-105 duration-700" 
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 font-bold text-white shadow-xl">View Full Image</span>
               </div>
            </div>
            
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
               className="prose prose-invert prose-lg max-w-none mb-12 text-foreground/80 leading-relaxed"
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">About this Event</h2>
              <div 
                className="mb-6 break-words whitespace-pre-wrap [&>*]:break-words [&>*]:whitespace-pre-wrap overflow-hidden"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </motion.div>

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
                      <Image 
                        src={img} 
                        alt={`Gallery ${i}`} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-110" 
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ArrowRight className="w-6 h-6 text-white -rotate-45" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
          
          <div className="lg:col-span-1">
             <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="sticky top-32 flex flex-col bg-glass border border-glass-border backdrop-blur-xl rounded-[2rem] p-8 shadow-2xl"
             >
                <h3 className="text-2xl font-bold mb-8">Event Details</h3>
                
                <div className="space-y-6 mb-10">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mt-1">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold">Date</div>
                      <div className="text-foreground/70">{dateStr}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mt-1">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold">Time</div>
                      <div className="text-foreground/70">{timeStr}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mt-1">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold">Location</div>
                      <div className="text-foreground/70">{location}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mt-1">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold">Capacity</div>
                      <div className="text-foreground/70 text-sm">{capacity} attendees</div>
                    </div>
                  </div>
                </div>
                
                {(event.registrationLink || isTBA) && (!event.date || new Date(event.date) >= new Date() || isTBA) && (
                  <button 
                    onClick={() => { if (!isTBA && event.registrationLink) window.open(event.registrationLink, "_blank"); }}
                    className={`group w-full py-4 rounded-xl flex items-center justify-center space-x-2 font-bold transition-all shadow-xl border ${isTBA || !event.registrationLink ? 'bg-background/20 border-glass-border text-foreground/50 cursor-not-allowed' : 'bg-primary hover:bg-primary/90 text-primary-foreground border-transparent cursor-pointer'}`}
                  >
                    <span>{isTBA ? 'To Be Announced' : (event.registrationLink ? 'Register Now' : 'Registration Closed')}</span>
                    {!isTBA && event.registrationLink && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                  </button>
                )}
             </motion.div>
          </div>
          
        </div>
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
                  unoptimized
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
