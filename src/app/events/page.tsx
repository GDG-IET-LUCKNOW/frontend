"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TextScramble } from "@/components/ui/text-scramble";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";

const allEvents = [
  {
    id: 1,
    title: "Intro to GenAI with Google",
    date: "Oct 12, 2026",
    time: "10:00 AM",
    venue: "Main Auditorium",
    image: "/hero-image.png",
    type: "Workshop",
    status: "Upcoming"
  },
  {
    id: 2,
    title: "Web3 & Blockchain Basics",
    date: "Oct 20, 2026",
    time: "2:00 PM",
    venue: "Lab 04",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f4ec651?auto=format&fit=crop&q=80&w=600",
    type: "Seminar",
    status: "Upcoming"
  },
  {
    id: 3,
    title: "Hacktoberfest Open Source",
    date: "Oct 25, 2026",
    time: "All Day",
    venue: "Virtual",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600",
    type: "Hackathon",
    status: "Upcoming"
  },
  {
    id: 4,
    title: "Cloud Computing 101",
    date: "Nov 05, 2026",
    time: "11:00 AM",
    venue: "Room 302",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
    type: "Workshop",
    status: "Upcoming"
  },
  {
    id: 5,
    title: "IETECH Orientation 2026",
    date: "Sep 15, 2026",
    time: "4:00 PM",
    venue: "Main Auditorium",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600",
    type: "Community",
    status: "Past"
  }
];

export default function EventsPage() {
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
          {allEvents.map((event, idx) => (
            <Link key={event.id} href={`/events/${event.id}`}>
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
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
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
                    className={`w-full py-4 rounded-xl border flex items-center justify-center space-x-2 font-medium transition-all ${
                      event.status === 'Past' 
                      ? 'bg-background/20 border-glass-border text-foreground/50 cursor-not-allowed' 
                      : 'bg-primary/10 border-primary/30 hover:bg-primary hover:text-primary-foreground text-primary'
                    }`}
                  >
                    <span>{event.status === 'Past' ? 'View Details' : 'Register Now'}</span>
                    {event.status !== 'Past' && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
