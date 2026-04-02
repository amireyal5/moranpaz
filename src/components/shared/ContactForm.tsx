
"use client";

import React from 'react';
import { useReveal } from '@/hooks/use-reveal';
import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';

export function ContactForm({ isLight = false }: { isLight?: boolean }) {
  const revealRef = useReveal();

  return (
    <div 
      ref={revealRef} 
      className={cn(
        "max-w-4xl mx-auto text-right reveal transition-all duration-1000 w-full",
        isLight ? 'text-white' : 'text-foreground'
      )}
    >
      <div className="w-full h-[250px] sm:h-[400px] bg-stone-100 mb-12 sm:mb-20 relative overflow-hidden group shadow-inner border border-stone-200">
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-40 group-hover:opacity-60 transition-opacity px-6 text-center">
          <MapPin size={40} strokeWidth={1} className="text-primary mb-4 animate-art-float" />
          <p className="text-lg sm:text-2xl font-headline italic">מיקום הקליניקה - טבעון / עמק יזרעאל</p>
          <span className="text-[10px] sm:text-xs tracking-[0.2em] mt-2">(שומר מקום למפת גוגל)</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16">
        <div className="border-b border-border focus-within:border-primary transition-colors pb-4">
          <label className="boutique-label block mb-4">שם מלא</label>
          <input 
            type="text" 
            required
            className="bg-transparent w-full focus:outline-none text-xl sm:text-2xl font-headline font-light placeholder:opacity-10 py-1" 
            placeholder="השם שלך" 
          />
        </div>
        <div className="border-b border-border focus-within:border-primary transition-colors pb-4">
          <label className="boutique-label block mb-4">מייל</label>
          <input 
            type="email" 
            required
            className="bg-transparent w-full focus:outline-none text-xl sm:text-2xl font-headline font-light placeholder:opacity-10 py-1" 
            placeholder="example@email.com" 
          />
        </div>
        <div className="md:col-span-2 border-b border-border focus-within:border-primary transition-colors pb-4">
          <label className="boutique-label block mb-4">טלפון</label>
          <input 
            type="tel" 
            required
            className="bg-transparent w-full focus:outline-none text-xl sm:text-2xl font-headline font-light placeholder:opacity-10 py-1" 
            placeholder="050 000 0000" 
          />
        </div>
        
        <div className="md:col-span-2 flex items-center space-x-reverse space-x-4 opacity-70">
           <input type="checkbox" className="w-5 h-5 accent-primary cursor-pointer border-border" id="mkt" />
           <label htmlFor="mkt" className="text-sm sm:text-base cursor-pointer">אני מאשר/ת קבלת חומר שיווקי ממורן פז</label>
        </div>
        
        <div className="md:col-span-2 text-center pt-8">
          <button 
            type="submit"
            className={cn(
              "w-full md:w-auto px-12 sm:px-24 py-5 sm:py-7 text-xs sm:text-sm uppercase tracking-[0.4em] font-bold transition-all border",
              isLight 
                ? 'border-white !text-white hover:bg-white hover:!text-black' 
                : 'border-accent bg-accent !text-white hover:bg-primary hover:border-primary'
            )}
          >
            שליחת פנייה
          </button>
        </div>
      </form>
    </div>
  );
}
