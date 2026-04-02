
"use client";

import React from 'react';
import { SectionTitle } from './SectionTitle';
import { useReveal } from '@/hooks/use-reveal';
import { Star } from 'lucide-react';

interface Testimonial {
  text: string;
  author: string;
  location: string;
}

const testimonials: Testimonial[] = [
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

export function TestimonialsSection() {
  const revealRef = useReveal();

  return (
    <section className="py-32 md:py-48 bg-stone-50 px-8">
      <div ref={revealRef} className="max-w-6xl mx-auto reveal">
        <div className="text-center mb-20">
          <SectionTitle subtitle="Success Stories" title="לקוחות ממליצים" className="flex flex-col items-center" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-12 shadow-sm border border-border/10 flex flex-col justify-between h-full hover:shadow-xl transition-all duration-700 text-center">
              <div>
                {/* Centered Stars */}
                <div className="flex justify-center mb-8 space-x-reverse space-x-1">
                  {[...Array(5)].map((_, starI) => (
                    <Star key={starI} size={16} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="italic text-stone-600 font-light text-xl leading-relaxed mb-8">
                  "{t.text}"
                </p>
              </div>
              <div className="border-t border-stone-100 pt-6">
                <span className="block boutique-label text-primary text-sm tracking-widest">— {t.author}, {t.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
