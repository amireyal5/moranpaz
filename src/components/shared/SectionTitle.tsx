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
    <div ref={revealRef} className={cn("mb-12 sm:mb-16 text-right reveal transition-all duration-1000", className)}>
      <span className={cn(
        "boutique-label block mb-4 sm:mb-6 stagger-1",
        isLight ? 'text-primary/50' : 'text-primary/70'
      )}>
        {subtitle}
      </span>
      <h2 className={cn(
        "boutique-title !text-3xl sm:!text-5xl lg:!text-7xl stagger-2",
        isLight ? 'text-white' : 'text-foreground'
      )}>
        {title}
      </h2>
      <div className={cn(
        "w-12 sm:w-20 h-[1px] mt-6 sm:mt-10 mr-0 stagger-3",
        isLight ? 'bg-primary/40' : 'bg-primary/30'
      )}></div>
    </div>
  );
}