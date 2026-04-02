
"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { FaqAssistant } from '@/components/shared/FaqAssistant';
import { useReveal } from '@/hooks/use-reveal';
import { ContactForm } from '@/components/shared/ContactForm';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function WorkshopPage() {
  const contentReveal = useReveal();
  const listReveal = useReveal();
  const workshopImg = PlaceHolderImages.find(img => img.id === 'workshop-women');

  const fits = [
    "את מרגישה עומס פנימי ולופים רגשיים",
    "כל 'התקלה' מבחוץ יכולה לערער אותך",
    "את עייפה מלהחזיק - פיזית ורגשית",
    "את מריצה דאגות ולא נוכחת בכאן ועכשיו",
    "את רוצה לסמוך ולהישען יותר, ולשחרר שליטה",
    "את רוצה להכיר לעומק את העולם הרגשי שלך",
    "את מרגישה שיש בתוכך עוצמה פנימית שלא מקבלת ביטוי"
  ];

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <Navbar />
      
      <section className="pt-44 pb-32 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Workshop" title="סדנת BeinMe" number="W" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div ref={contentReveal} className="lg:col-span-7 text-right reveal">
              <h3 className="text-4xl md:text-6xl font-headline italic mb-10 text-accent leading-none">להיות אני בתוכי</h3>
              <div className="space-y-8 text-xl md:text-2xl font-light text-stone-700 leading-relaxed">
                <p>BeinMe הוא מרחב קבוצתי – טיפולי לנשים, שנולד מתוך רצון להקשיב לעצמי. לגלות את מה שנמצא בתוכי, להכיר אותו, ולחוות אותו בכנות ואותנטיות.</p>
                <div className="italic text-accent font-bold border-r-8 border-primary/20 pr-8 py-4 bg-white/50 rounded-3xl shadow-sm">
                  <p>"אם לא תכירי את העולם הפנימי שלך – הוא ינהל אותך ואת תקראי לזה גורל."</p>
                </div>
                <p>האמת שלנו ומפת הדרכים לחיינו נמצאת בתוכנו – לא מחוצה לנו. כאן אפשר לעצור, לנשום ולהרגיש ולחזור לבית הפנימי שלנו. הכי יפה שאת הולכת לעשות את זה עם נשים אחרות, להיתמך ולחלוק.</p>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative">
               <div className="aspect-square rounded-full overflow-hidden grayscale shadow-[0_30px_60px_-15px_rgba(140,120,184,0.3)] border-8 border-white relative z-10">
                  {workshopImg && (
                    <Image 
                      src={workshopImg.imageUrl} 
                      alt={workshopImg.description} 
                      fill 
                      className="object-cover"
                      data-ai-hint={workshopImg.imageHint}
                    />
                  )}
               </div>
               <div className="absolute -z-10 top-0 left-0 w-full h-full bg-primary/20 rounded-full blur-3xl scale-110"></div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-32 bg-white px-6 md:px-20 border-t border-stone-100 relative">
         <div className="max-w-4xl mx-auto text-right">
            <h2 className="text-3xl md:text-5xl font-headline mb-16 text-foreground font-bold">הקורס מתאים לך אם...</h2>
            <div ref={listReveal} className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal">
               {fits.map((text, i) => (
                 <div key={i} className="flex items-center space-x-reverse space-x-6 p-6 bg-secondary/50 rounded-3xl hover:bg-secondary transition-all hover:-translate-y-1">
                    <span className="text-primary font-headline text-3xl font-bold opacity-40">0{i+1}</span>
                    <p className="text-lg text-stone-700 font-bold leading-tight">{text}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      <section className="py-32 bg-accent/5 px-6 md:px-20" id="contact">
        <div className="max-w-4xl mx-auto">
          <SectionTitle subtitle="Register" title="הצטרפי למחזור הבא" number="R" />
          <ContactForm />
        </div>
      </section>

      <Footer />
      <FaqAssistant />
    </main>
  );
}
