
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
  const workshopImg = PlaceHolderImages.find(img => img.id === 'workshop-women');
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20אשמח%20לפרטים%20ולהרשמה%20לקורס%20BeinMe";

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden">
      <Navbar />
      
      <section className="pt-56 pb-32 px-8 md:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div ref={introReveal} className="reveal grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7">
              <span className="boutique-label text-primary mb-6 block uppercase">
                BeinMe<sup className="text-[0.45em] ml-0.5 opacity-60">©</sup> קורס
              </span>
              <h1 className="text-7xl md:text-[140px] font-handwriting text-foreground leading-none mb-10">
                להיות אני בתוכי
              </h1>
              
              <div className="space-y-12 boutique-para text-stone-600">
                <p>
                  קורס BeinMe<sup className="text-[0.55em] opacity-60">©</sup> הוא מרחב קבוצתי שנולד מתוך רצון להקשיב לעצמי. לגלות את מה שנמצא בתוכי, להכיר אותו ולחוות אותו בכנות.
                </p>
                <div className="relative pr-12 py-2">
                  <Quote className="absolute -top-6 -right-2 text-primary/5 w-32 h-32 rotate-180 pointer-events-none" />
                  <div className="border-r-[3px] border-primary/20 pr-10 py-1 bg-stone-50/50">
                    <p className="text-3xl md:text-5xl font-headline font-light italic text-accent leading-snug relative z-10">האמת שלנו ומפת הדרכים לחיינו נמצאת בתוכנו – לא מחוצה לנו.</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-12">
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-16 py-4 bg-primary text-white boutique-label !text-[13px] !opacity-100 hover:bg-accent transition-all rounded-sm flex items-center gap-6 group w-fit shadow-xl"
                >
                  הרשמה למחזור הקרוב
                  <ArrowLeft size={16} />
                </a>
              </div>
            </div>
            
            <div className="lg:col-span-5">
               <div className="image-zoom-container aspect-[3/4] shadow-2xl border-8 border-white">
                  {workshopImg && (
                    <Image 
                      src={workshopImg.imageUrl} 
                      alt="סדנת נשים" 
                      fill 
                      className="object-cover grayscale"
                    />
                  )}
               </div>
            </div>
          </div>
        </div>
      </section>
      
      <section ref={listReveal} className="py-32 bg-stone-50 px-8 md:px-24 reveal">
         <div className="max-w-5xl mx-auto">
            <SectionTitle subtitle="The Connection" title="האם הקורס מתאים לך?" className="flex flex-col items-center text-center" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
               {[
                 "את מרגישה עומס פנימי ולופים שחוזרים על עצמם",
                 "את רוצה לחזור לחיבור אותנטי וכנה עם עצמך",
                 "את רוצה לשחרר שליטה ואחיזה ולהישען יותר",
                 "את רוצה להכיר לעומק את העולם הרגשי שלך"
               ].map((text, i) => (
                 <div key={i} className="p-10 bg-white border border-stone-100 hover:shadow-xl transition-all duration-700 flex items-start gap-8">
                    <span className="text-primary font-bold text-2xl opacity-20">0{i+1}</span>
                    <p className="text-xl font-light text-stone-600">{text}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      <section className="py-32 bg-accent text-white px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-7xl md:text-[120px] font-handwriting mb-10 leading-none">מוכנה לצאת למסע?</h2>
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-16 py-4 bg-primary text-white boutique-label !text-[13px] !opacity-100 hover:bg-white hover:text-accent transition-all rounded-sm inline-flex items-center gap-8 shadow-2xl"
          >
            <MessageCircle size={24} />
            לפרטים והרשמה
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
