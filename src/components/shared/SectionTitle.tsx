"use client";

import React from 'react';
import { useReveal } from '@/hooks/use-reveal';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  subtitle: string;
  title: string;
  isLight?: boolean;
}

export function SectionTitle({ subtitle, title, isLight = false }: SectionTitleProps) {
  const revealRef = useReveal();

  return (
    <div ref={revealRef} className="mb-16 text-right reveal">
      <span className={cn(
        "block text-[9px] uppercase tracking-[0.6em] mb-6 font-bold",
        isLight ? 'text-primary/60' : 'text-primary'
      )}>
        {subtitle}
      </span>
      <h2 className={cn(
        "text-4xl md:text-6xl font-headline font-light leading-tight",
        isLight ? 'text-white' : 'text-accent'
      )}>
        {title}
      </h2>
      <div className={cn(
        "w-12 h-[1px] mt-8 mr-0",
        isLight ? 'bg-primary/40' : 'bg-primary/20'
      )}></div>
    </div>
  );
}