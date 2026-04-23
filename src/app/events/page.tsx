"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TextScramble } from "@/components/ui/text-scramble";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { fetchEvents, formatImageUrl } from "@/api/api";

const FALLBACK_IMAGE = "/hero-image.png";

export default function EventsPage() {
  const [events, setEvents] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadEvents = async () => {
      try {
        setIsLoading(true);
        const data = await fetchEvents();
        if (data && data.length > 0) {
           const mappedEvents = data.map((e: any) => ({
             id: e._id || e.id,
             title: e.title || "Untitled Event",
             date: e.isTBA ? "To Be Announced" : new Date(e.date || Date.now()).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
             time: e.isTBA ? "To Be Announced" : (e.time && e.time.trim() !== "" ? e.time : "To Be Announced"),
             venue: e.isTBA ? "To Be Announced" : (e.location && e.location.trim() !== "" ? e.location : "Virtual"),
             image: (e.media && e.media.length > 0 && e.media[0].url) ? formatImageUrl(e.media[0].url) : FALLBACK_IMAGE,
             type: e.type || "Event",
             registrationLink: e.registrationLink,
             isTBA: e.isTBA || false,
             status: e.isTBA ? "Upcoming" : (new Date(e.date || Date.now()) < new Date() ? "Past" : "Upcoming")
           }));
           setEvents(mappedEvents);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadEvents();
  }, []);

  return (
    <main className="flex-1 w-full flex flex-col items-center pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-primary/15 rounded-full blur-[150px] pointer-events-none z-0" />
      
      <div className="max-w-6xl mx-auto px-4 z-10 w-full relative">
        <div className="text-center mb-16">
          <TextScramble as="h1" className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Events Calendar</TextScramble>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Join our upcoming workshops, hackathons, and community sessions to accelerate your learning and networking.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-full h-40 flex items-center justify-center border border-glass-border/30 rounded-[2rem] bg-glass backdrop-blur">
              <p className="text-lg md:text-xl font-medium text-foreground/60 tracking-wide">Loading events...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="col-span-full h-40 flex items-center justify-center border border-glass-border/30 rounded-[2rem] bg-glass backdrop-blur">
              <p className="text-lg md:text-xl font-medium text-foreground/60 tracking-wide">No upcoming events listed yet. Check back soon!</p>
            </div>
          ) : (
            events.map((event, idx) => (
            <Link key={event.id} href={`/events/${event.id}`} prefetch={false}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group h-full flex flex-col bg-glass border border-glass-border backdrop-blur-xl rounded-[2rem] overflow-hidden hover:border-primary/50 transition-colors duration-500 shadow-xl"
              >
                <div className="relative w-full h-56 overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur border border-glass-border px-3 py-1 rounded-full text-xs font-semibold">
                    {event.type}
                  </div>
                  {event.status === "Past" && (
                    <div className="absolute top-4 right-4 z-10 bg-foreground text-background px-3 py-1 rounded-full text-xs font-semibold">
                      Past Event
                    </div>
                  )}
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                </div>
                
                <div className="p-8 flex flex-col flex-grow relative -mt-6 rounded-t-[2rem] bg-background/80 backdrop-blur-md border-t border-glass-border/50">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{event.title}</h3>
                  
                  <div className="flex flex-col space-y-3 mt-auto mb-8 text-sm text-foreground/70">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-primary/80" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-primary/80" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-primary/80" />
                      <span>{event.venue}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={(e) => {
                      if (event.status !== 'Past' && event.registrationLink) {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open(event.registrationLink, "_blank");
                      }
                    }}
                    className={`w-full py-4 rounded-xl border flex items-center justify-center space-x-2 font-medium transition-all ${
                      event.status === 'Past' 
                      ? 'bg-background/20 border-glass-border text-foreground/50 cursor-not-allowed' 
                      : 'bg-primary/10 border-primary/30 hover:bg-primary hover:text-primary-foreground text-primary'
                    }`}
                  >
                    <span>{event.status === 'Past' ? 'View Details' : (event.isTBA ? 'To Be Announced' : 'Register Now')}</span>
                    {event.status !== 'Past' && !event.isTBA && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>
            </Link>
          )))}
        </div>
      </div>
    </main>
  );
}
