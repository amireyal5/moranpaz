
"use client";

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CtaButton {
  label: string;
  href: string;
  variant: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
}

interface CtaButtonsProps {
  buttons?: CtaButton[];
  align?: string;
  className?: string;
}

export function CtaButtons({ buttons, align = 'center', className }: CtaButtonsProps) {
  if (!buttons || buttons.length === 0) return null;

  const justifyClass = align === 'right' ? 'justify-end' : align === 'left' ? 'justify-start' : 'justify-center';

  return (
    <div className={cn("flex flex-wrap gap-6 mt-16", justifyClass, className)}>
      {buttons.map((btn, i) => {
        const isExternal = btn.href?.startsWith('http');
        const Component = isExternal ? 'a' : Link;
        const extraProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

        const sizeClass = btn.size === 'lg'
          ? 'px-16 py-5 text-base'
          : btn.size === 'sm'
            ? 'px-8 py-3 text-xs'
            : 'px-12 py-4 text-sm';

        return (
          <Component
            key={i}
            href={btn.href as any}
            {...extraProps}
            className={cn(
              "boutique-label transition-all duration-700 rounded-sm shadow-xl min-w-[200px] text-center",
              sizeClass,
              btn.variant === 'primary'
                ? "bg-primary text-white hover:bg-accent"
                : btn.variant === 'outline'
                  ? "border border-primary text-primary hover:bg-primary hover:text-white"
                  : "text-primary hover:text-accent bg-transparent"
            )}
          >
            {btn.label}
          </Component>
        );
      })}
    </div>
  );
}
