"use client";

import React from 'react';
import { useReveal } from '@/hooks/use-reveal';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  subtitle: React.ReactNode;
  title: React.ReactNode;
  isLight?: boolean;
  className?: string;
}

export function SectionTitle({ subtitle, title, isLight = false, className }: SectionTitleProps) {
  const revealRef = useReveal();

  return (
    <div ref={revealRef} className={cn("mb-8 sm:mb-12 text-right reveal transition-all duration-1000", className)}>
      <span className={cn(
        "boutique-label block mb-3 sm:mb-4",
        isLight ? 'text-primary/50' : 'text-primary/70'
      )}>
        {subtitle}
      </span>
      <h2 className={cn(
        "boutique-title !text-3xl sm:!text-5xl lg:!text-6xl",
        isLight ? 'text-white' : 'text-foreground'
      )}>
        {title}
      </h2>
      <div className={cn(
        "w-10 sm:w-12 h-[1px] mt-4 sm:mt-6 mr-0",
        isLight ? 'bg-primary/40' : 'bg-primary/30'
      )}></div>
    </div>
  );
}
