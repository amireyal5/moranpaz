
"use client";

import React from 'react';
import { useReveal } from '@/hooks/use-reveal';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  subtitle: string;
  title: string;
  number?: string;
  isLight?: boolean;
}

export function SectionTitle({ subtitle, title, number, isLight = false }: SectionTitleProps) {
  const revealRef = useReveal();

  return (
    <div ref={revealRef} className="mb-12 md:mb-20 text-right reveal relative">
      {number && (
        <span className={cn(
          "absolute -right-6 -top-8 text-[70px] md:text-[130px] font-headline select-none leading-none -z-10 opacity-10",
          isLight ? 'text-stone-400' : 'text-primary'
        )}>
          {number}
        </span>
      )}
      <span className={cn(
        "block text-[10px] uppercase tracking-[0.5em] mb-4 font-bold",
        isLight ? 'text-stone-300' : 'text-primary'
      )}>
        {subtitle}
      </span>
      <h2 className={cn(
        "text-4xl md:text-[6vw] font-light font-headline tracking-tighter leading-tight",
        isLight ? 'text-white' : 'text-foreground'
      )}>
        {title}
      </h2>
    </div>
  );
}
