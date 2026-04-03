
"use client";

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CtaButton {
  label: string;
  href: string;
  variant: 'primary' | 'outline';
}

interface CtaButtonsProps {
  buttons?: CtaButton[];
  className?: string;
}

export function CtaButtons({ buttons, className }: CtaButtonsProps) {
  if (!buttons || buttons.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-6 justify-center mt-16", className)}>
      {buttons.map((btn, i) => {
        const isExternal = btn.href.startsWith('http');
        const Component = isExternal ? 'a' : Link;
        const extraProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

        return (
          <Component
            key={i}
            href={btn.href as any}
            {...extraProps}
            className={cn(
              "px-12 py-4 boutique-label text-sm transition-all duration-700 rounded-sm shadow-xl min-w-[220px] text-center",
              btn.variant === 'primary' 
                ? "bg-primary text-white hover:bg-accent" 
                : "border border-primary text-primary hover:bg-primary hover:text-white"
            )}
          >
            {btn.label}
          </Component>
        );
      })}
    </div>
  );
}
