
"use client";

import React from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { cn } from '@/lib/utils';

export function FloatingWhatsApp() {
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20אני%20פונה%20מהאתר%20ואשמח%20לפרטים%20על%20תהליך%20טיפולי";

  return (
    <a 
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-24 right-6 sm:bottom-8 sm:right-8 z-[140]",
        "hover:scale-110 transition-all duration-500 group flex items-center justify-center"
      )}
      aria-label="WhatsApp"
    >
      <WhatsAppIcon size={56} className="group-hover:rotate-12 transition-transform text-slate-500" />
      <span className="absolute right-full mr-4 bg-white text-accent px-4 py-2 rounded-sm text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none hidden sm:block">
        דברי איתי בוואטסאפ
      </span>
    </a>
  );
}
