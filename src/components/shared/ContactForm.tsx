
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
      {/* Google Maps Placeholder */}
      <div className="w-full h-[300px] sm:h-[400px] bg-stone-100 mb-16 md:mb-24 relative overflow-hidden group shadow-inner border border-stone-200">
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-40 group-hover:opacity-60 transition-opacity px-6 text-center">
          <MapPin size={48} className="text-primary mb-4 animate-art-float" />
          <p className="text-xl sm:text-2xl font-headline italic">מיקום הקליניקה - טבעון / עמק יזרעאל</p>
          <span className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] mt-2">(שומר מקום למפת גוגל)</span>
        </div>
        {/* Placeholder for actual iframe */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
        <div className="border-b border-border focus-within:border-primary transition-colors pb-4 md:pb-6">
          <label className="block text-[12px] sm:text-[14px] uppercase tracking-[0.4em] mb-4 md:mb-6 opacity-60 font-bold">שם מלא</label>
          <input 
            type="text" 
            required
            className="bg-transparent w-full focus:outline-none text-2xl sm:text-3xl font-headline font-light placeholder:opacity-10 py-2" 
            placeholder="השם שלך" 
          />
        </div>
        <div className="border-b border-border focus-within:border-primary transition-colors pb-4 md:pb-6">
          <label className="block text-[12px] sm:text-[14px] uppercase tracking-[0.4em] mb-4 md:mb-6 opacity-60 font-bold">מייל</label>
          <input 
            type="email" 
            required
            className="bg-transparent w-full focus:outline-none text-2xl sm:text-3xl font-headline font-light placeholder:opacity-10 py-2" 
            placeholder="example@email.com" 
          />
        </div>
        <div className="md:col-span-2 border-b border-border focus-within:border-primary transition-colors pb-4 md:pb-6">
          <label className="block text-[12px] sm:text-[14px] uppercase tracking-[0.4em] mb-4 md:mb-6 opacity-60 font-bold">טלפון</label>
          <input 
            type="tel" 
            required
            className="bg-transparent w-full focus:outline-none text-2xl sm:text-3xl font-headline font-light placeholder:opacity-10 py-2" 
            placeholder="050 000 0000" 
          />
        </div>
        
        <div className="md:col-span-2 flex items-center space-x-reverse space-x-4 sm:space-x-6 opacity-70">
           <input type="checkbox" className="w-6 h-6 sm:w-8 sm:h-8 accent-primary cursor-pointer border-border" id="mkt" />
           <label htmlFor="mkt" className="text-base sm:text-lg tracking-[0.05em] sm:tracking-[0.1em] cursor-pointer">אני מאשר/ת קבלת חומר שיווקי ממורן פז</label>
        </div>
        
        <div className="md:col-span-2 text-center pt-10 md:pt-16">
          <button 
            type="submit"
            className={cn(
              "w-full md:w-auto px-16 sm:px-32 py-6 sm:py-10 text-[14px] sm:text-[16px] uppercase tracking-[0.4em] sm:tracking-[0.8em] font-bold transition-all border",
              isLight 
                ? 'border-white text-white hover:bg-white hover:text-black' 
                : 'border-foreground text-foreground hover:bg-foreground hover:text-white'
            )}
          >
            שליחה
          </button>
        </div>
      </form>
    </div>
  );
}
