
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
        "max-w-4xl mx-auto text-right reveal transition-all duration-1000 w-full",
        isLight ? 'text-white' : 'text-foreground'
      )}
    >
      <div className="w-full h-[300px] sm:h-[450px] bg-stone-100 mb-12 sm:mb-20 relative overflow-hidden group shadow-inner border border-stone-200">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53711.02646947229!2d35.12536055!3d32.71424450000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151dadfff9f521db%3A0x377c729195dd381f!2z16fXqNeZ16og15jXkdei15XXnw!5e0!3m2!1siw!2sil!4v1775196670523!5m2!1siw!2sil" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
          title="מיקום הקליניקה בטבעון"
        ></iframe>
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
              "w-full md:w-auto px-12 sm:px-20 py-4 sm:py-5 text-sm uppercase tracking-[0.3em] font-bold transition-all border",
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
