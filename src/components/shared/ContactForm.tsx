
"use client";

import React from 'react';
import { useReveal } from '@/hooks/use-reveal';
import { cn } from '@/lib/utils';

export function ContactForm({ isLight = false }: { isLight?: boolean }) {
  const revealRef = useReveal();

  return (
    <div 
      ref={revealRef} 
      className={cn(
        "max-w-4xl mx-auto text-right reveal p-6 md:p-12 rounded-3xl border transition-all duration-500",
        isLight ? 'bg-stone-800/80 border-stone-700 backdrop-blur-sm shadow-2xl' : 'bg-white border-primary/10 shadow-xl'
      )}
    >
      <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border-b border-stone-300 focus-within:border-primary transition-colors pb-2">
          <label className={cn("block text-[10px] uppercase mb-2", isLight ? 'text-stone-400' : 'text-primary')}>שם מלא</label>
          <input 
            type="text" 
            required
            className={cn("bg-transparent w-full focus:outline-none text-lg font-headline", isLight ? 'text-white' : 'text-foreground')} 
            placeholder="השם שלך" 
          />
        </div>
        <div className="border-b border-stone-300 focus-within:border-primary transition-colors pb-2">
          <label className={cn("block text-[10px] uppercase mb-2", isLight ? 'text-stone-400' : 'text-primary')}>טלפון</label>
          <input 
            type="tel" 
            required
            className={cn("bg-transparent w-full focus:outline-none text-lg font-headline", isLight ? 'text-white' : 'text-foreground')} 
            placeholder="050-0000000" 
          />
        </div>
        <div className="md:col-span-2 border-b border-stone-300 focus-within:border-primary transition-colors pb-2">
          <label className={cn("block text-[10px] uppercase mb-2", isLight ? 'text-stone-400' : 'text-primary')}>מייל</label>
          <input 
            type="email" 
            required
            className={cn("bg-transparent w-full focus:outline-none text-lg font-headline", isLight ? 'text-white' : 'text-foreground')} 
            placeholder="email@example.com" 
          />
        </div>
        <div className="md:col-span-2 flex items-center space-x-reverse space-x-3">
           <input type="checkbox" className="w-4 h-4 accent-primary rounded cursor-pointer" id="mkt" />
           <label htmlFor="mkt" className={cn("text-xs cursor-pointer", isLight ? 'text-stone-300' : 'text-stone-600')}>אני מאשר/ת קבלת חומר שיווקי ממורן פז</label>
        </div>
        <div className="md:col-span-2 text-center pt-4">
          <button 
            type="submit"
            className={cn(
              "px-16 py-4 text-xs uppercase tracking-widest font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg",
              isLight ? 'bg-white text-stone-900 hover:bg-stone-100' : 'bg-primary text-white hover:bg-primary/90'
            )}
          >
            שלחי הודעה
          </button>
        </div>
      </form>
    </div>
  );
}
