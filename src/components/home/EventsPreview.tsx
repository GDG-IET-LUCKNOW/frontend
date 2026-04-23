"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { TextScramble } from "@/components/ui/text-scramble";
import { fetchEvents } from "@/api/api";

const FALLBACK_IMAGE = "/hero-image.png";

export function EventsPreview() {
  const [events, setEvents] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadEvents = async () => {
      try {
        setIsLoading(true);
        const data = await fetchEvents();
        if (data && data.length > 0) {
           const mappedEvents = data.slice(0, 3).map((e: any) => ({
             id: e._id || e.id,
             title: e.title || "Untitled",
             date: e.isTBA ? "To Be Announced" : new Date(e.date || Date.now()).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
             venue: e.isTBA ? "To Be Announced" : (e.location && e.location.trim() !== "" ? e.location : "Virtual"),
             registrationLink: e.isTBA ? undefined : e.registrationLink,
             isTBA: e.isTBA || false,
             status: e.isTBA ? "Upcoming" : (new Date(e.date || Date.now()) < new Date() ? "Past" : "Upcoming"),
             image: (e.media && e.media.length > 0 && e.media[0].url) ? e.media[0].url : FALLBACK_IMAGE
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
    <section className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 z-10 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <TextScramble as="h2" duration={1.2} className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Upcoming Events</TextScramble>
            <p className="text-foreground/60 max-w-xl">
              Don't miss out on our latest workshops, hackathons, and speaker sessions.
            </p>
          </div>
          <Link href="/events" prefetch={false} className="mt-6 md:mt-0 px-6 py-2 rounded-full border border-glass-border bg-glass backdrop-blur hover:bg-glass/80 transition text-sm font-medium inline-block cursor-pointer">
            View All Events
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full h-40 flex items-center justify-center border border-glass-border/30 rounded-[2rem] bg-glass backdrop-blur">
              <p className="text-lg md:text-xl font-medium text-foreground/60 tracking-wide">Loading upcoming events...</p>
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
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group h-full flex flex-col bg-glass border border-glass-border backdrop-blur-xl rounded-[2rem] overflow-hidden hover:border-primary/50 transition-colors duration-500 shadow-xl"
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{event.title}</h3>
                  <div className="flex flex-col space-y-2 mt-auto mb-6 text-sm text-foreground/70">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{event.venue}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={(e) => {
                      if (event.status !== 'Past' && !event.isTBA && event.registrationLink) {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open(event.registrationLink, "_blank");
                      } else if (event.status !== 'Past' || event.isTBA) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    }}
                    className={`w-full py-3 rounded-xl border flex items-center justify-center space-x-2 font-medium transition-all ${
                      event.status === 'Past' 
                      ? 'bg-background/20 border-glass-border text-foreground/50 cursor-not-allowed' 
                      : 'bg-primary/10 border-primary/30 hover:bg-primary hover:text-primary-foreground text-primary'
                    }`}
                  >
                    {event.status === 'Past' ? 'View Details' : (event.isTBA ? 'To Be Announced' : 'Register Now')}
                  </button>
                </div>
              </motion.div>
            </Link>
          )))}
        </div>
      </div>
    </section>
  );
}
