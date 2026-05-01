"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CopySlash, Cpu, Smartphone, Cloud, PenTool, GitBranch, Terminal, ShieldCheck, MonitorSmartphone, X } from "lucide-react";
import { HolographicCard } from "@/components/ui/holographic-card";
import Image from "next/image";
import { TextScramble } from "@/components/ui/text-scramble";

const domains = [
  { 
    title: "Web Development", 
    icon: CopySlash, 
    description: "Master modern web frameworks, frontend architecture, and robust backends.", 
    longDescription: "Web development is the art and science of building modern web applications. From crafting beautiful, responsive user interfaces with React and Next.js to building highly scalable backend services with Node.js, Python, or Go. In this domain, you'll learn how to structure databases, design RESTful and GraphQL APIs, handle authentication, and deploy production-ready full-stack applications to the cloud.",
    span: "col-span-1 md:col-span-2 row-span-2",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600"
  },
  { 
    title: "AI / ML", 
    icon: Cpu, 
    description: "Dive into machine learning, deep neural networks, and generative AI.", 
    longDescription: "Artificial Intelligence and Machine Learning represent the cutting edge of modern technology. Dive deep into neural networks, natural language processing, and computer vision. You will learn to train intelligent models using PyTorch and TensorFlow, understand the math behind the magic, and explore how generative AI models like LLMs are reshaping industries worldwide.",
    span: "col-span-1 md:col-span-1",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600"
  },
  { 
    title: "Android", 
    icon: Smartphone, 
    description: "Build scalable and performant mobile experiences.", 
    longDescription: "Android development empowers you to build applications for the world's most popular mobile operating system. Learn Kotlin and Jetpack Compose to create fluid, native UI experiences. We cover state management, background processing, API integration, and performance profiling to ensure your apps run smoothly on thousands of different device form factors.",
    span: "col-span-1 md:col-span-1",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "iOS",
    icon: MonitorSmartphone,
    description: "Develop elegant, native apps for the Apple ecosystem.",
    longDescription: "Dive into the Apple ecosystem by mastering Swift and SwiftUI. iOS development is known for its focus on elegant design, smooth animations, and strict performance standards. You'll learn how to build native applications for iPhones and iPads, integrate with Apple's powerful APIs, and publish your creations directly to the App Store.",
    span: "col-span-1 md:col-span-1",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600"
  },
  { 
    title: "Cloud", 
    icon: Cloud, 
    description: "Deploy globally with modern cloud infrastructure.", 
    longDescription: "Cloud computing is the backbone of modern software. Learn how to design, deploy, and manage distributed systems using AWS, Google Cloud, or Azure. We explore containerization with Docker, orchestration with Kubernetes, serverless architectures, and CI/CD pipelines to automate software delivery and maintain massive global scale.",
    span: "col-span-1 md:col-span-1",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600"
  },
  { 
    title: "UI / UX", 
    icon: PenTool, 
    description: "Design beautiful, functional user interfaces.", 
    longDescription: "UI/UX design bridges the gap between human psychology and digital interfaces. Learn how to conduct user research, create wireframes, and design high-fidelity prototypes using Figma. We focus on accessibility, color theory, typography, and micro-interactions to ensure the products you build are not just functional, but an absolute joy to use.",
    span: "col-span-1 md:col-span-1 w-full",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600"
  },
  { 
    title: "Open Source", 
    icon: GitBranch, 
    description: "Contribute to the global developer ecosystem.", 
    longDescription: "Open Source is the collaborative heart of the software world. Learn how to navigate large codebases, write effective documentation, and use Git for complex version control. You will understand how to make meaningful pull requests to massive global projects, interact with maintainers, and build your reputation as a global developer.",
    span: "col-span-1 md:col-span-2",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Competitive Programming (CP)",
    icon: Terminal,
    description: "Master data structures, algorithms, and logical problem-solving.",
    longDescription: "Competitive Programming sharpens your algorithmic thinking and coding speed. Dive into complex data structures, dynamic programming, graph theory, and advanced math. By solving highly constrained logic puzzles, you will prepare yourself for elite technical interviews and learn how to write the most highly optimized code possible.",
    span: "col-span-1 md:col-span-1",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Cyber Security",
    icon: ShieldCheck,
    description: "Learn ethical hacking, cryptography, and securing modern systems.",
    longDescription: "Cyber Security is the vital practice of defending digital infrastructure from malicious actors. Learn about penetration testing, network vulnerabilities, and cryptography. We cover OWASP top 10 vulnerabilities, reverse engineering, and how to proactively secure modern web and cloud applications against sophisticated cyber attacks.",
    span: "col-span-1 md:col-span-1",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80"
  }
];

export function DomainsSection() {
  const [selectedDomain, setSelectedDomain] = React.useState<any>(null);

  return (
    <section className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 z-10 relative">
        
        <div className="text-center mb-16">
          <TextScramble as="h2" className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Our Domains</TextScramble>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            We provide deep-dives and extensive workshops across various tech domains. Find your passion and start building.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[280px] gap-8">
          {domains.map((domain, idx) => {
            return (
              <motion.div
                key={domain.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="col-span-1 w-full h-full"
              >
                <div onClick={() => setSelectedDomain(domain)} className="cursor-pointer h-full transition-transform hover:scale-[1.02] active:scale-[0.98]">
                  <HolographicCard 
                     title={domain.title}
                     description={domain.description}
                     icon={domain.icon}
                     span="w-full h-full"
                     image={domain.image}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Domain Details Modal */}
      <AnimatePresence>
        {selectedDomain && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDomain(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-glass border border-glass-border backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              <button
                onClick={() => setSelectedDomain(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-full h-48 md:h-64 relative flex-shrink-0">
                <Image 
                  src={selectedDomain.image} 
                  alt={selectedDomain.title} 
                  fill 
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              </div>
              
              <div className="p-6 md:p-8 relative -mt-16 md:-mt-20 overflow-y-auto">
                <div className="w-16 h-16 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-2xl flex items-center justify-center text-primary mb-6 shadow-lg">
                  <selectedDomain.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-3xl font-bold mb-2">{selectedDomain.title}</h3>
                <p className="text-primary font-medium mb-6">{selectedDomain.description}</p>
                
                <div className="w-full h-[1px] bg-glass-border mb-6" />
                
                <p className="text-foreground/80 leading-relaxed text-sm md:text-base">
                  {selectedDomain.longDescription}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
