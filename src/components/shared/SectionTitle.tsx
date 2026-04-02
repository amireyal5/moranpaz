
"use client";

import React from 'react';
import { useReveal } from '@/hooks/use-reveal';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  subtitle: string;
  title: string;
  isLight?: boolean;
  className?: string;
}

export function SectionTitle({ subtitle, title, isLight = false, className }: SectionTitleProps) {
  const revealRef = useReveal();

  return (
    <div ref={revealRef} className={cn("mb-12 md:mb-24 text-right reveal transition-all duration-1000 w-full", className)}>
      <span className={cn(
        "boutique-label block mb-4 md:mb-8 text-[12px] sm:text-[14px] tracking-[0.4em] sm:tracking-[0.7em] opacity-80",
        isLight ? 'text-primary/70' : 'text-primary'
      )}>
        {subtitle}
      </span>
      <h2 className={cn(
        "boutique-title",
        isLight ? 'text-white' : 'text-foreground'
      )}>
        {title}
      </h2>
      <div className={cn(
        "w-16 md:w-24 h-[1px] mt-6 md:mt-10 mr-0",
        isLight ? 'bg-primary/40' : 'bg-primary/30'
      )}></div>
    </div>
  );
}
