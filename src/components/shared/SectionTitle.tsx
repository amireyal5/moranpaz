
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
    <div ref={revealRef} className={cn("mb-12 text-right reveal transition-all duration-1000", className)}>
      <span className={cn(
        "boutique-label block mb-4",
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
        "w-16 h-[1px] mt-6 mr-0",
        isLight ? 'bg-primary/40' : 'bg-primary/30'
      )}></div>
    </div>
  );
}
