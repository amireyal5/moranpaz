
"use client";

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionTitle } from './SectionTitle';
import { useReveal } from '@/hooks/use-reveal';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  items: FaqItem[];
  title?: string;
  subtitle?: string;
}

export function FaqSection({ items, title = "שאלות נפוצות", subtitle = "FAQ" }: FaqSectionProps) {
  const revealRef = useReveal();

  return (
    <section className="py-32 px-6 md:px-20 bg-white">
      <div ref={revealRef} className="max-w-4xl mx-auto reveal">
        <SectionTitle title={title} subtitle={subtitle} className="flex flex-col items-center text-center" />
        
        <Accordion type="single" collapsible className="w-full mt-12 space-y-4">
          {items.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-border/40 px-4">
              <AccordionTrigger className="text-xl font-headline font-medium text-accent hover:text-primary transition-colors text-right py-6">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-lg font-light text-stone-600 leading-relaxed pb-8 text-right">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
