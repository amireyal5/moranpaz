"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ContactForm } from '@/components/shared/ContactForm';
import { FaqAssistant } from '@/components/shared/FaqAssistant';
import { useReveal } from '@/hooks/use-reveal';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroReveal = useReveal();
  const introReveal = useReveal();
  const quoteReveal = useReveal();
  
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-bg');
  const portraitImg = PlaceHolderImages.find(img => img.id === 'moran-portrait');

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Soke-style Hero: Minimalist, Bold Typography, Artistic Background */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {heroImg && (
            <Image 
              src={heroImg.imageUrl} 
              alt={heroImg.description} 
              fill
              className="object-cover opacity-20 grayscale"
              priority
              data-ai-hint={heroImg.imageHint}
            />
          )}
        </div>
        
        <div ref={heroReveal} className="relative z-10 text-center reveal max-w-5xl">
           <span className="block text-[10px] uppercase tracking-[0.6em] text-primary mb-8 font-bold">Holistic Psychotherapy</span>
           <h1 className="text-[12vw] md:text-[8vw] font-headline leading-[0.9] text-accent mb-12">
             למצוא את <span className="italic">השקט</span> שבפנים
           </h1>
           <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-10">
              <Link href="#contact" className="text-[11px] uppercase tracking-[0.4em] border-b border-primary/40 pb-2 hover:border-primary transition-all text-accent font-bold">
                התחלת תהליך
              </Link>
           </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <div className="w-[1px] h-12 bg-accent"></div>
        </div>
      </section>

      {/* Intro Section - High End Minimalism */}
      <section className="py-40 px-8 md:px-24 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          <div ref={introReveal} className="lg:col-span-6 text-right reveal">
             <SectionTitle subtitle="Philosophy" title="החופש להיות" />
             <div className="space-y-10 text-lg md:text-xl font-light text-stone-600 leading-[1.8] max-w-xl mr-0">
                <p>אני מאמינה שלכולנו יש את הזכות להרגיש חופשיים מבפנים. שבכל רגע, בכל מצב, קיימת בנו האפשרות לבחור.</p>
                <p>המסע שלי בעשור האחרון הוביל אותי לגלות את העומקים של הריפוי הרגשי. היום, אני מלווה נשים ואנשים בדרך חזרה הביתה – אל עצמם.</p>
                <Link href="/practice" className="inline-block text-[10px] uppercase tracking-[0.3em] text-primary font-bold border-b border-primary/20 hover:border-primary transition-all pb-1">
                  קראי עוד עליי
                </Link>
             </div>
          </div>
          
          <div className="lg:col-span-6 relative">
             <div className="image-zoom-container aspect-[4/5] overflow-hidden grayscale brightness-95 shadow-none">
                {portraitImg && (
                  <Image 
                    src={portraitImg.imageUrl} 
                    alt={portraitImg.description} 
                    fill 
                    className="object-cover"
                    data-ai-hint={portraitImg.imageHint}
                  />
                )}
             </div>
             <div className="absolute -bottom-10 -right-10 bg-accent text-white p-12 hidden md:block max-w-xs">
                <p className="font-headline italic text-2xl leading-tight">"האמת שלנו נמצאת בתוכנו – לא מחוצה לנו."</p>
             </div>
          </div>
        </div>
      </section>

      {/* Quote Section - Dark & Atmospheric */}
      <section ref={quoteReveal} className="py-60 bg-accent text-background px-8 text-center reveal">
        <div className="max-w-4xl mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.8em] text-primary/60 mb-12">The Essence</span>
          <h2 className="text-4xl md:text-6xl font-headline font-light italic leading-tight">
            "אנחנו לא רק מה שהיינו – <br/> אנחנו גם כל מה שנהיה."
          </h2>
          <div className="w-20 h-[1px] bg-primary/30 mx-auto mt-16"></div>
        </div>
      </section>

      {/* Services Grid - Clean & Structural */}
      <section className="py-40 px-8 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-border/40 border border-border/40">
            {[
              { title: "התהליך הטיפולי", link: "/practice", desc: "מסע אישי של גילוי וריפוי" },
              { title: "סדנת BeinMe", link: "/workshop", desc: "מרחב קבוצתי לנשים בלב טבעון" },
              { title: "טיפול בטבעון", link: "/tivon", desc: "קליניקה שקטה הטובלת בירוק" }
            ].map((service, i) => (
              <Link key={i} href={service.link} className="bg-white p-16 hover:bg-stone-50 transition-all group flex flex-col justify-between aspect-square">
                <div>
                  <span className="text-[10px] text-primary tracking-widest block mb-4">0{i+1}</span>
                  <h3 className="text-3xl font-headline text-accent group-hover:italic transition-all">{service.title}</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-stone-400 font-light text-sm">{service.desc}</p>
                  <span className="block w-6 h-[1px] bg-primary group-hover:w-12 transition-all"></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Minimalist Form */}
      <section id="contact" className="py-40 px-8 bg-stone-50">
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle subtitle="Connect" title="תאמי שיחת הכרות" />
          <p className="text-stone-500 font-light mb-16 text-lg">פגישה ראשונה ללא עלות וללא התחייבות. אני כאן בשבילך.</p>
          <ContactForm />
        </div>
      </section>

      <Footer />
      <FaqAssistant />
    </main>
  );
}