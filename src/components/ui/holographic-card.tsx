"use client";

import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface HolographicCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  span?: string;
  image?: string;
}

export const HolographicCard = ({ title, description, icon: Icon, span, image }: HolographicCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20; // Soft 3D tilt
        const rotateY = (centerX - x) / 20;

        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
        card.style.setProperty('--bg-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--bg-y', `${(y / rect.height) * 100}%`);
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        card.style.setProperty('--x', `50%`);
        card.style.setProperty('--y', `50%`);
        card.style.setProperty('--bg-x', '50%');
        card.style.setProperty('--bg-y', '50%');
    };

    return (
        <div 
            className={cn("holographic-card relative flex flex-col justify-between p-6 rounded-[2rem] group overflow-hidden transition-all duration-300 ease-out border border-primary/20 shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:border-primary/60", span)}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* Background Image Layer */}
            {image && (
               <div 
                  className="absolute inset-0 z-0 opacity-40 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${image})` }} 
               />
            )}
            
            {/* Dark overlay to ensure text readability */}
            <div className="absolute inset-0 z-[1] bg-black/60 group-hover:bg-black/30 transition-colors duration-500" />

            {/* Icon Header */}
            <div className="flex items-center justify-between z-10 relative" style={{ transform: 'translateZ(30px)' }}>
                <div className="p-3 bg-black/40 rounded-2xl backdrop-blur-xl border border-white/10 shadow-lg">
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 bg-white/10 backdrop-blur-md">
                    <span className="text-xs text-white">&rarr;</span>
                </div>
            </div>

            {/* Content Footer */}
            <div className="z-10 mt-auto relative" style={{ transform: 'translateZ(40px)' }}>
                <h3 className="text-xl font-bold mb-1 text-white group-hover:text-blue-300 transition-colors drop-shadow-lg">{title}</h3>
                <p className="text-sm text-gray-300 group-hover:text-white line-clamp-2 drop-shadow max-w-[90%] transition-colors duration-300">{description}</p>
            </div>
            
            {/* Rendered lighting effects via CSS */}
            <div className="holo-glow" />
            <div className="holo-glare" />
        </div>
    );
};
