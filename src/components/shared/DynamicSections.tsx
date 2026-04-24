
"use client";

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { SectionTitle } from './SectionTitle';

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
              {(sec.titleSettings || sec.title) && (
                <div className="mb-12">
                  <SectionTitle 
                    title={sec.titleSettings?.text || sec.title || ''} 
                    subtitle={sec.titleSettings?.subtitle}
                    fontSize={sec.titleSettings?.fontSize}
                    fontFamily={sec.titleSettings?.fontFamily}
                    color={sec.titleSettings?.color}
                    align={sec.titleSettings?.align || 'right'}
                  />
                </div>
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
              ) : sec.type === 'logos' ? (
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                  {sec.logos?.map((logo, idx) => (
                    <div 
                      key={logo.id || idx} 
                      className={cn(
                        "relative flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500",
                        sec.logoSize === 'sm' ? 'w-24 h-12 md:w-32 md:h-16' : 
                        sec.logoSize === 'lg' ? 'w-48 h-24 md:w-64 md:h-32' : 
                        'w-32 h-16 md:w-40 md:h-20',
                        sec.logoShape === 'circle' ? 'rounded-full overflow-hidden border border-stone-100 p-2 bg-white' : ''
                      )}
                    >
                      {logo.imageUrl && (
                        <Image 
                          src={logo.imageUrl} 
                          alt="Client Logo" 
                          fill 
                          className="object-contain" 
                        />
                      )}
                    </div>
                  ))}
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
