"use client";

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { FaqAssistant } from '@/components/shared/FaqAssistant';
import { useReveal } from '@/hooks/use-reveal';
import { CheckCircle2 } from 'lucide-react';
import { ContactForm } from '@/components/shared/ContactForm';
import { cn } from '@/lib/utils';

export default function PracticePage() {
  const introReveal = useReveal();

  const steps = [
    { id: "01", title: "פגישת הכרות", desc: "נפגש לשיחה ראשונית (בקליניקה או בזום), נכיר אותך ואת מה שמעסיק אותך. נתאם ציפיות ונבין האם מתאים לנו לצאת למסע הטיפולי יחד." },
    { id: "02", title: "יצירת מרחב בטוח ואמון", desc: "בפגישות הראשונות נעמיק בחיבור ובבניית אמון. זהו מרחב שבו אפשר להביא את עצמך כפי שאת/ה – בלי מסכות, בלי שיפוטיות – ולדעת שיש אוזן קשבת ותמיכה מלאה." }
  ];

  const fits = [
    "מרגיש/ה שיש בתוכך חלקים שצמאים לביטוי ולשחרור",
    "חווה תקיעות רגשית, דפוסים שחוזרים על עצמם, עומס או חרדה.",
    "מבקש/ת להתחבר מחדש לעצמך - לרגש, לנשמה, לגוף ולתחושת משמעות עמוקה.",
    "מרגיש/ה שאיבדת שליטה על החיים שלך, שאת/ה לא עצמך.",
    "רוצה לקבל כלים פרקטיים לוויסות עצמי, חיזוק חוסן נפשי ובניית מערכות יחסים בריאות יותר.",
    "זקוק/ה לתמיכה ועיניים טובות לשתף ולהתמודד עם כאבים פיזיים ורגשיים כאחד."
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-56 pb-48 px-8 md:px-24">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Therapy" title="התהליך הטיפולי" />
          
          <div ref={introReveal} className="reveal mb-32 text-right">
            <h3 className="text-4xl md:text-6xl font-headline italic text-accent mb-12 leading-tight stagger-1">
              המסע לריפוי רגשי מתחיל בך
            </h3>
            <p className="max-w-3xl mr-0 boutique-para stagger-2">
              התהליך הוא הזמנה להתבוננות פנימה, במרחב בטוח ומכיל, שבו נוכל יחד לגלות את הכוחות הטמונים בך ולרפא את הפצעים המבקשים הכרה.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
             <div className="lg:col-span-8 space-y-12 text-right">
                {steps.map((step, i) => (
                  <div key={step.id} className={cn("reveal p-12 bg-white border border-border/30 hover:border-primary/30 transition-all duration-1000 group shadow-sm", `stagger-${i+1}`)}>
                    <div className="flex items-center space-x-reverse space-x-6 mb-8">
                      <span className="w-12 h-12 border border-primary text-primary flex items-center justify-center font-bold text-xl group-hover:bg-primary group-hover:text-white transition-all duration-700">
                        {step.id}
                      </span>
                      <h4 className="text-3xl font-headline font-bold text-accent">{step.title}</h4>
                    </div>
                    <p className="boutique-para pr-16">
                      {step.desc}
                    </p>
                  </div>
                ))}
             </div>
             
             <div className="lg:col-span-4">
                <div className="bg-accent text-white p-12 shadow-2xl sticky top-48">
                   <h4 className="text-2xl font-headline font-bold mb-10 border-b border-white/10 pb-6 text-primary">הטיפול מתאים לך אם...</h4>
                   <ul className="space-y-8 text-right">
                      {fits.map((item, i) => (
                        <li key={i} className="flex items-start space-x-reverse space-x-6 text-stone-300">
                           <CheckCircle2 size={20} className="text-primary mt-1 flex-shrink-0" />
                           <span className="text-lg leading-relaxed">{item}</span>
                        </li>
                      ))}
                   </ul>
                   <p className="mt-12 text-xs text-primary/60 italic leading-relaxed">לא בטוחים אם הטיפול יכול לסייע? מוזמנים להתייעץ איתי ללא התחייבות.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className="py-48 bg-stone-50 px-8 md:px-24" id="contact">
        <div className="max-w-4xl mx-auto">
          <SectionTitle subtitle="Connect" title="מוכנים להתחיל?" className="flex flex-col items-center" />
          <ContactForm />
        </div>
      </section>

      <Footer />
      <FaqAssistant />
    </main>
  );
}