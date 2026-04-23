
"use client";

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

import { DynamicSection } from '@/config/page-defaults';

interface DynamicSectionsProps {
  sections?: DynamicSection[];
  className?: string;
}

export function DynamicSections({ sections, className }: DynamicSectionsProps) {
  if (!sections || sections.length === 0) return null;

  return (
    <div className={cn("space-y-16 md:space-y-24", className)}>
      {sections.map((sec, i) => {
        const bgClass = 
          sec.bg === 'stone-50' ? 'bg-stone-50' : 
          sec.bg === 'stone-100' ? 'bg-stone-100' : 
          sec.bg === 'primary' ? 'bg-primary/10' : 
          'bg-transparent';

        return (
          <div 
            key={sec.id || i} 
            className={cn(
              "py-16 md:py-24 px-6 md:px-12 rounded-sm transition-all duration-700",
              bgClass
            )}
          >
            <div className="max-w-5xl mx-auto">
              {sec.title && (
                <h3 className="text-4xl md:text-5xl font-headline text-accent mb-12 text-right">
                  {sec.title}
                </h3>
              )}
              
              {sec.type === 'image-text' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
                  <div className={cn(
                    "relative aspect-square md:aspect-[4/5] overflow-hidden shadow-2xl",
                    sec.imagePosition === 'left' ? 'md:order-1' : 'md:order-2'
                  )}>
                    {sec.imageUrl && (
                      <Image 
                        src={sec.imageUrl} 
                        alt={sec.title || "Section image"} 
                        fill 
                        className="object-cover" 
                      />
                    )}
                  </div>
                  <div className={cn(
                    "boutique-para text-stone-600 !text-right",
                    sec.imagePosition === 'left' ? 'md:order-2' : 'md:order-1'
                  )}>
                    <div 
                      className="page-content-container" 
                      dangerouslySetInnerHTML={{ __html: sec.content || '' }} 
                    />
                  </div>
                </div>
              ) : (
                <div className="boutique-para text-stone-600 !text-right">
                  <div 
                    className="page-content-container" 
                    dangerouslySetInnerHTML={{ __html: sec.content || '' }} 
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
