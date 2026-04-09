'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

type FallingPatternProps = React.ComponentProps<'div'> & {
  color?: string;
  backgroundColor?: string;
  density?: number;
};

export function FallingPattern({
  color = '#2563eb', // primary blue
  backgroundColor = 'transparent',
  density = 1,
  className,
}: FallingPatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { theme, systemTheme } = useTheme();
  
  // Mount state to prevent hydration mismatch just in case useTheme isn't ready
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const isLight = mounted && (theme === 'light' || (theme === 'system' && systemTheme === 'light'));
  
  const activeColor = isLight ? '#93c5fd' : color;
  const tailColor = isLight ? 'rgba(255, 255, 255, 0.05)' : 'rgba(2, 6, 23, 0.05)';

  useEffect(() => {
    if (!mounted) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) return;

    let animationFrameId: number;
    const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]/';
    const charArray = characters.split('');
    
    // Resize handling
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const fontSize = 14 / density;
    let columns = Math.floor(width / fontSize);
    let drops: {y: number, speed: number, text: string, originX: number, currentX: number}[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = canvas.width = parent.clientWidth;
        height = canvas.height = parent.clientHeight;
      } else {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
      init();
    };
    window.addEventListener('resize', resize);
    
    // Ensure accurate sizing right away
    resize();

    // Mouse interaction
    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    // Attach to window just so we track mouse even if it leaves the specific container
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    function init() {
      columns = Math.floor(width / fontSize);
      drops = [];
      for (let x = 0; x < columns; x++) {
        drops[x] = {
          y: Math.random() * (height / fontSize),
          speed: 0.5 + Math.random() * 1.5,
          text: charArray[Math.floor(Math.random() * charArray.length)],
          originX: x * fontSize,
          currentX: x * fontSize
        };
      }
    }
    init();

    function draw() {
      // Fade effect for trails - uses theme dynamic color
      ctx.fillStyle = tailColor; 
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = activeColor;
      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = 'center';

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        
        // Randomly change character sometimes to shimmer
        if (Math.random() > 0.95) {
          drop.text = charArray[Math.floor(Math.random() * charArray.length)];
        }

        const realY = drop.y * fontSize;

        // Interactive mouse repulsion
        const dx = mouse.x - drop.currentX;
        const dy = mouse.y - realY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const interactionRadius = 120;
        
        if (distance < interactionRadius) {
          const repelForce = (interactionRadius - distance) / interactionRadius;
          // Splice outward
          drop.currentX -= (dx / distance) * repelForce * 10;
          // Highlight color when disturbed
          ctx.fillStyle = isLight ? '#3b82f6' : '#60a5fa'; 
          ctx.shadowBlur = 10;
          ctx.shadowColor = isLight ? '#3b82f6' : '#60a5fa';
        } else {
          // Return to origin column
          drop.currentX += (drop.originX - drop.currentX) * 0.1;
          
          // Slight glow by default
          ctx.fillStyle = activeColor;
          ctx.shadowBlur = 4;
          ctx.shadowColor = activeColor;
        }

        ctx.fillText(drop.text, drop.currentX, realY);

        // Reset to top
        if (realY > height && Math.random() > 0.98) {
          drop.y = 0;
          drop.speed = 0.5 + Math.random() * 1.5;
        }
        
        drop.y += drop.speed;
      }
      animationFrameId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeColor, tailColor, density, mounted]);

  return (
    <div className={cn('relative h-full w-full overflow-hidden', className)} style={{ backgroundColor }}>
      <canvas
        ref={canvasRef}
        className="block w-full h-full bg-transparent"
        style={{ opacity: 0.4 }} // Fade it to act as background
      />
    </div>
  );
}
