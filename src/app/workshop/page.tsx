
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { FaqAssistant } from '@/components/shared/FaqAssistant';
import { FaqSection } from '@/components/shared/FaqSection';
import { useReveal } from '@/hooks/use-reveal';
import { ContactForm } from '@/components/shared/ContactForm';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowLeft } from 'lucide-react';

export default function WorkshopPage() {
  const contentReveal = useReveal();
  const listReveal = useReveal();
  const workshopImg = PlaceHolderImages.find(img => img.id === 'workshop-women');

  const fits = [
    "את מרגישה עומס פנימי ולופים רגשיים שחוזרים על עצמם",
    "כל \"התקלה\" מבחוץ יכולה לערער אותך",
    "את מוצאת את עצמך עייפה מלהחזיק - פיזית ורגשית",
    "את מריצה דאגות בראש ולא נוכחת בכאן ועכשיו",
    "את רוצה לחזור לחיבור אותנטי וכנה עם עצמך",
    "את רוצה לסמוך ולהישען יותר, ולשחרר שליטה ואחיזה",
    "את רוצה לאפשר לעצמך להרגיש הכל ולהישאר יציבה",
    "את רוצה להכיר לעומק את העולם הפנימי הרגשי שלך",
    "את מרגישה שיש בתוכך עוצמה פנימית שלא מקבלת ביטוי"
  ];

  const workshopFaqs = [
    {
      question: "למי מיועד קורס BeinMe?",
      answer: "הקורס מיועד לנשים שרוצות לעצור את המרוץ, להקשיב לעצמן ולגלות את העולם הפנימי שלהן בתוך מרחב קבוצתי מכיל ותומך."
    },
    {
      question: "כמה משתתפות יש בקבוצה?",
      answer: "הקבוצה היא אינטימית ומונה מספר מצומצם של נשים כדי לאפשר לכל אחת מרחב ביטוי וליווי אישי בתוך הקבוצה."
    },
    {
      question: "האם נדרש ניסיון קודם בטיפול או במיינדפולנס?",
      answer: "אין צורך בניסיון קודם. הקורס בנוי כך שהוא מתאים לכל אישה שמרגישה קריאה פנימית לשינוי וגילוי עצמי."
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-44 pb-32 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="The Workshop" title="קורס BeinMe" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div ref={contentReveal} className="lg:col-span-7 text-right reveal">
              <h3 className="text-4xl md:text-6xl font-headline italic mb-10 text-accent leading-tight">להיות אני בתוכי</h3>
              <div className="space-y-8 text-xl font-light text-stone-700 leading-relaxed">
                <p>BeinMe הוא מרחב קבוצתי – טיפולי לנשים, שנולד מתוך רצון להקשיב לעצמי. לגלות את מה שנמצא בתוכי, להכיר אותו, ולחוות אותו בכנות ואותנטיות.</p>
                <div className="italic text-accent font-medium border-r-4 border-primary/40 pr-8 py-4 bg-stone-50 rounded-sm">
                  <p>"אם לא תכירי את העולם הפנימי שלך – הוא ינהל אותך ואת תקראי לזה גורל."</p>
                </div>
                <p>האמת שלנו ומפת הדרכים לחיינו נמצאת בתוכנו – לא מחוצה לנו. כאן אפשר לעצור, לנשום ולהרגיש, ולחזור לבית הפנימי שלנו יחד עם נשים אחרות.</p>
                <Link href="#contact" className="inline-flex items-center gap-4 boutique-label border-b border-primary/20 hover:border-primary transition-all pb-2 group">
                  הרשמה למחזור הקרוב
                  <ArrowLeft size={12} className="group-hover:-translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative">
               <div className="aspect-[4/5] rounded-sm overflow-hidden grayscale shadow-2xl border border-border/20">
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
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-32 bg-white px-6 md:px-20 border-t border-border/20">
         <div className="max-w-5xl mx-auto text-right">
            <h2 className="text-3xl md:text-5xl font-headline mb-16 text-accent font-bold">הקורס מתאים לך אם...</h2>
            <div ref={listReveal} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 reveal">
               {fits.map((text, i) => (
                 <div key={i} className="flex items-start space-x-reverse space-x-6 p-6 border-b border-border/20 hover:bg-stone-50 transition-all">
                    <span className="text-primary font-headline text-2xl font-bold opacity-30 mt-1">0{i+1}</span>
                    <p className="text-lg text-stone-700 font-light leading-relaxed">{text}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      <FaqSection items={workshopFaqs} title="שאלות על הקורס" subtitle="Workshop FAQ" />

      <section className="py-32 bg-stone-50 px-6 md:px-20" id="contact">
        <div className="max-w-4xl mx-auto">
          <SectionTitle subtitle="Register" title="צרי קשר להרשמה" className="flex flex-col items-center" />
          <div className="text-center mb-16">
            <p className="boutique-para">השאירי פרטים ואחזור אלייך עם כל המידע על הקורס הקרוב.</p>
          </div>
          <ContactForm />
        </div>
      </section>

      <Footer />
      <FaqAssistant />
    </main>
  );
}
