"use client";
import * as React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { TextScramble } from "@/components/ui/text-scramble";
import { Calendar, MapPin, Clock, ArrowLeft, ArrowRight, User, Users } from "lucide-react";
import Link from "next/link";

export default function EventDetailPage() {
  const params = useParams();
  const { id } = params;
  
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
              <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20">Workshop</div>
            </div>
            
            <TextScramble as="h1" className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">Intro to GenAI with Google {id ? `(#${id})` : ''}</TextScramble>
            
            <div className="w-full h-[350px] md:h-[450px] relative rounded-[2rem] overflow-hidden mb-12 border border-glass-border shadow-2xl">
               <Image src="https://images.unsplash.com/photo-1639762681485-074b7f4ec651?auto=format&fit=crop&q=80&w=1200" alt="Event Cover" fill className="object-cover transition-transform hover:scale-105 duration-700" />
            </div>
            
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
               className="prose prose-invert prose-lg max-w-none mb-12 text-foreground/80 leading-relaxed"
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">About this Event</h2>
              <p className="mb-6">
                Generative AI is changing the landscape of software development faster than ever before. Join us for this comprehensive technical deep dive into Google's latest Gemini models and Vertex AI infrastructure. We will cover the mechanics of LLMs, effective prompt engineering strategies, and how to programmatically integrate these models into your own applications using Python and Node.js.
              </p>
              <p>
                This workshop is designed for developers of all skill levels. Whether you have never interacted with an AI API before, or you are looking to build complex RAG (Retrieval-Augmented Generation) pipelines, there is something here for you. Food and beverages will be provided.
              </p>
              
              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">What you will learn</h3>
              <ul className="list-disc pl-6 space-y-2 text-primary/90 font-medium">
                <li>Fundamentals of transformer architectures</li>
                <li>API integrations with Vertex AI and Google AI Studio</li>
                <li>Building custom AI Agents for web apps</li>
                <li>Best practices for safety and context window management</li>
              </ul>
            </motion.div>
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
                      <div className="text-foreground/70">October 12, 2026</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mt-1">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold">Time</div>
                      <div className="text-foreground/70">10:00 AM - 2:00 PM PST</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mt-1">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold">Location</div>
                      <div className="text-foreground/70">Main Auditorium, Building C</div>
                      <Link href="#" className="text-primary text-sm hover:underline mt-1 inline-block font-medium">View Map on Google</Link>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mt-1">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold">Capacity</div>
                      <div className="text-foreground/70 text-sm">Limited to 150 attendees</div>
                    </div>
                  </div>
                </div>
                
                <button className="group w-full py-4 rounded-xl flex items-center justify-center space-x-2 font-bold transition-all bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl border border-transparent">
                  <span>RSVP Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
             </motion.div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
