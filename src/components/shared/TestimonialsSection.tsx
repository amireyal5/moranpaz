"use client";

import React from 'react';
import { SectionTitle } from './SectionTitle';
import { useReveal } from '@/hooks/use-reveal';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Testimonial {
  text: string;
  author: string;
  location: string;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    text: "התהליך עם מורן פתח לי דלת לעצמי שמעולם לא ידעתי שקיימת. השקט שמצאתי מלווה אותי בכל יום. מורן היא מטפלת רגשית בחסד עליון.",
    author: "א.מ",
    location: "עמק יזרעאל"
  },
  {
    text: "הגעתי לטיפול בטבעון עם הרבה ספקות, ומצאתי בית. מורן יצרה מרחב בטוח שאפשר לי להתמודד עם החרדות שלי ולמצוא חוסן פנימי.",
    author: "ל.ש",
    location: "טבעון"
  },
  {
    text: "קורס BeinMe היה נקודת מפנה בחיי. החיבור לנשים אחרות והכלים שמורן נתנה לנו הם מתנה לכל החיים.",
    author: "ר.ד",
    location: "חיפה"
  }
];

interface TestimonialsSectionProps {
  customTestimonials?: Testimonial[];
}

export function TestimonialsSection({ customTestimonials }: TestimonialsSectionProps) {
  const revealRef = useReveal();
  const displayItems = customTestimonials || DEFAULT_TESTIMONIALS;

  if (displayItems.length === 0) return null;

  return (
    <section className="py-32 md:py-64 bg-stone-50 px-8 border-y border-stone-100">
      <div ref={revealRef} className="max-w-7xl mx-auto reveal">
        <div className="text-center mb-24 md:mb-32">
          <SectionTitle subtitle="Success Stories" title="לקוחות ממליצים" className="flex flex-col items-center" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 mt-20 md:mt-32">
          {displayItems.map((t, i) => (
            <div key={i} className={cn(
              "bg-white p-12 lg:p-16 shadow-sm border border-border/5 flex flex-col justify-between h-full hover:shadow-2xl transition-all duration-1000 text-center rounded-sm",
              `stagger-${i+1}`
            )}>
              <div>
                <div className="flex justify-center mb-10 space-x-reverse space-x-1.5 opacity-60">
                  {[...Array(5)].map((_, starI) => (
                    <Star key={starI} size={16} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="italic text-stone-600 font-light text-xl lg:text-2xl leading-relaxed mb-10">
                  "{t.text}"
                </p>
              </div>
              <div className="border-t border-stone-50 pt-8">
                <span className="block boutique-label text-primary text-xs lg:text-sm tracking-[0.3em] font-bold">— {t.author}, {t.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}