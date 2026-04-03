
"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { useReveal } from '@/hooks/use-reveal';
import { ContactForm } from '@/components/shared/ContactForm';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowLeft, MessageCircle, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function WorkshopPage() {
  const introReveal = useReveal();
  const listReveal = useReveal();
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-workshop');
  const portraitImg = PlaceHolderImages.find(img => img.id === 'workshop-women');
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20אשמח%20לפרטים%20ולהרשמה%20לקורס%20BeinMe";

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          {heroImg && (
            <Image 
              src={heroImg.imageUrl} 
              alt="BeinMe Course" 
              fill 
              className="object-cover opacity-60 brightness-[0.7]"
              priority
              data-ai-hint={heroImg.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background"></div>
        </div>
        <div className="relative z-10 text-center">
           <span className="boutique-label text-white/80 mb-8 block">Group Workshop</span>
           <h1 className="text-8xl md:text-[140px] font-handwriting text-white mb-8 font-bold">BeinMe<sup className="text-[0.4em] opacity-80 mr-2">©</sup> קורס</h1>
           <p className="text-2xl md:text-4xl font-headline italic text-white/90 leading-relaxed font-light">להיות אני בתוכי - מסע קבוצתי של גילוי עצמי</p>
        </div>
      </section>

      <section className="py-32 px-8 md:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div ref={introReveal} className="reveal grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
            <div className="lg:col-span-7">
              <span className="boutique-label text-primary mb-8 block uppercase">
                The Inner Home
              </span>
              <h2 className="text-5xl md:text-7xl font-headline text-accent mb-12 font-bold leading-tight">
                לחזור להקשיב לעצמך
              </h2>
              
              <div className="space-y-12 boutique-para text-stone-600 leading-relaxed text-xl">
                <p>
                  קורס BeinMe<sup className="text-[0.6em] opacity-60 mr-1">©</sup> הוא מרחב קבוצתי ייחודי לנשים שנולד מתוך הצורך העמוק להקשיב לעצמנו, ללא שיפוטיות ובכנות מלאה.
                </p>
                <div className="relative pr-12 py-6">
                  <Quote className="absolute -top-10 -right-4 text-primary/5 w-48 h-48 rotate-180 pointer-events-none" />
                  <div className="border-r-[3px] border-primary/20 pr-10 py-1 bg-stone-50/50">
                    <p className="text-3xl md:text-5xl font-headline font-light italic text-accent leading-snug relative z-10">האמת שלנו ומפת הדרכים לחיינו נמצאת בתוכנו – לא מחוצה לנו.</p>
                  </div>
                </div>
                <p>
                  יחד, במרחב תומך ומכיל, נכיר את חלקי האישיות השונים, נרפא פצעים ישנים ונלמד לחיות מתוך חיבור אותנטי וביטוי עצמי מלא.
                </p>
              </div>
              
              <div className="pt-16">
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-16 py-4 bg-primary text-white boutique-label !text-[13px] hover:bg-accent transition-all rounded-sm flex items-center gap-8 group w-fit shadow-2xl !opacity-100"
                >
                  הרשמה למחזור הקרוב
                  <ArrowLeft size={16} />
                </a>
              </div>
            </div>
            
            <div className="lg:col-span-5">
               <div className="image-zoom-container aspect-[3/4] shadow-2xl border-8 border-stone-50 overflow-hidden">
                  {portraitImg && (
                    <Image 
                      src={portraitImg.imageUrl} 
                      alt="Women Gathering" 
                      fill 
                      className="object-cover"
                    />
                  )}
               </div>
            </div>
          </div>
        </div>
      </section>
      
      <section ref={listReveal} className="py-32 md:py-48 bg-stone-50 px-8 md:px-24 reveal">
         <div className="max-w-5xl mx-auto">
            <SectionTitle subtitle="Is it for you?" title="האם הקורס מתאים לך?" className="flex flex-col items-center text-center" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-24">
               {[
                 "את מרגישה עומס פנימי ולופים שחוזרים על עצמם",
                 "את רוצה לחזור לחיבור אותנטי וכנה עם עצמך",
                 "את רוצה לשחרר שליטה ואחיזה ולהישען יותר",
                 "את רוצה להכיר לעומק את העולם הרגשי שלך"
               ].map((text, i) => (
                 <div key={i} className="p-12 bg-white border border-stone-100 hover:shadow-2xl transition-all duration-700 flex items-start gap-10 group">
                    <span className="text-primary font-bold text-3xl opacity-20 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                    <p className="text-2xl font-light text-stone-600 leading-relaxed">{text}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      <section className="py-48 bg-accent text-white px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-8xl md:text-[140px] font-handwriting mb-12 leading-none">מוכנה לצאת למסע?</h2>
          <p className="text-2xl md:text-3xl font-headline italic mb-20 opacity-90">ההרשמה למחזור הקרוב בעיצומה, מחכה לך.</p>
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-16 py-5 bg-primary text-white boutique-label !text-[14px] hover:bg-white hover:text-accent transition-all rounded-sm inline-flex items-center gap-10 shadow-2xl !opacity-100"
          >
            <MessageCircle size={28} />
            לפרטים והרשמה אישית
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
