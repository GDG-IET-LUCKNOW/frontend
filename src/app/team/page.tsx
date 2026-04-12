"use client";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextScramble } from "@/components/ui/text-scramble";
import { fetchTeamMembers } from "@/api/api";
import { X } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedMember, setSelectedMember] = React.useState<any | null>(null);

  React.useEffect(() => {
    const loadTeam = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTeamMembers();
        if (data && data.length > 0) {
           const mappedTeam = data.map((t: any) => ({
             name: t.name || "Unknown",
             domainName: t.domainName || "Member",
             branch: t.branch || "General",
             year: t.year || "1st",
             github: t.github || "",
             linkedin: t.linkedin || ""
           }));
           setTeamMembers(mappedTeam);
        }
      } catch (error) {
        console.error("Failed to fetch team:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTeam();
  }, []);

  return (
    <main className="flex-1 w-full flex flex-col items-center pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none z-0" />
      
      <div className="max-w-6xl mx-auto px-4 z-10 w-full relative">
        <div className="text-center mb-20">
          <TextScramble as="h1" className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Meet the Team</TextScramble>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            The passionate minds driving the IETECH community forward.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {isLoading ? (
            <div className="col-span-full h-40 flex items-center justify-center border border-glass-border/30 rounded-[2.5rem] bg-glass backdrop-blur">
              <p className="text-lg md:text-xl font-medium text-foreground/60 tracking-wide">Loading team members...</p>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="col-span-full h-40 flex items-center justify-center border border-glass-border/30 rounded-[2.5rem] bg-glass backdrop-blur">
              <p className="text-lg md:text-xl font-medium text-foreground/60 tracking-wide">Team members will be revealed shortly!</p>
            </div>
          ) : (
            teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => setSelectedMember(member)}
              className="group flex flex-col items-center text-center p-10 rounded-[2.5rem] bg-glass border border-glass-border backdrop-blur-xl shadow-2xl hover:border-primary/50 transition-all duration-500 cursor-pointer"
            >
              <div className="w-20 h-20 rounded-full bg-primary/20 text-primary border-2 border-primary/30 flex items-center justify-center text-3xl font-bold mb-6 group-hover:scale-110 transition-transform duration-500 uppercase shrink-0">
                 {member.name.charAt(0)}
              </div>
              <h3 className="text-3xl font-bold mb-2 group-hover:text-primary transition-colors">{member.name}</h3>
              <p className="text-primary font-bold mb-0 uppercase tracking-widest text-sm">{member.domainName}</p>
            </motion.div>
          )))}
        </div>
      </div>

      <AnimatePresence>
        {selectedMember && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }} 
              onClick={e => e.stopPropagation()} 
              className="bg-background border border-glass-border rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden relative"
            >
              <button onClick={() => setSelectedMember(null)} className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-foreground/50 hover:text-foreground transition-colors z-10">
                <X className="w-5 h-5" />
              </button>
              
              <div className="p-8 flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/20 to-transparent pointer-events-none" />
                
                <div className="w-24 h-24 rounded-full bg-primary/20 text-primary border-2 border-primary/30 flex items-center justify-center text-4xl font-bold mb-6 uppercase z-10 relative shadow-xl shadow-primary/20 shrink-0">
                   {selectedMember.name.charAt(0)}
                </div>
                
                <h2 className="text-3xl font-bold mb-2 relative z-10">{selectedMember.name}</h2>
                <p className="text-primary font-bold mb-6 uppercase tracking-widest text-sm relative z-10">{selectedMember.domainName}</p>
                
                <div className="w-full grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center">
                    <span className="text-foreground/50 text-xs font-semibold uppercase tracking-wider mb-1">Branch</span>
                    <span className="text-foreground font-medium">{selectedMember.branch}</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center">
                    <span className="text-foreground/50 text-xs font-semibold uppercase tracking-wider mb-1">Year</span>
                    <span className="text-foreground font-medium">{selectedMember.year}</span>
                  </div>
                </div>

                <div className="flex space-x-4 w-full">
                  {selectedMember.github ? (
                    <a href={selectedMember.github} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 p-3 rounded-xl transition-colors">
                      <GithubIcon className="w-5 h-5" />
                      <span className="font-medium">GitHub</span>
                    </a>
                  ) : (
                    <div className="flex-1 flex items-center justify-center space-x-2 bg-white/5 border border-white/10 p-3 rounded-xl opacity-50 cursor-not-allowed text-foreground/50">
                      <GithubIcon className="w-5 h-5" />
                      <span className="font-medium">No GitHub</span>
                    </div>
                  )}
                  
                  {selectedMember.linkedin ? (
                    <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center space-x-2 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#3b8bd6] border border-[#0A66C2]/20 p-3 rounded-xl transition-colors">
                      <LinkedinIcon className="w-5 h-5" />
                      <span className="font-medium">LinkedIn</span>
                    </a>
                  ) : (
                    <div className="flex-1 flex items-center justify-center space-x-2 bg-white/5 border border-white/10 p-3 rounded-xl opacity-50 cursor-not-allowed text-foreground/50">
                      <LinkedinIcon className="w-5 h-5" />
                      <span className="font-medium">No LinkedIn</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
