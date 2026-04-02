
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
    "את מרגישה עומס פנימי ולופים רגשיים שחוזרים על עצמם",
    "כל \"התקלה\" מבחוץ יכולה לערער אותך",
    "את מוצאת את עצמך עייפה מלהחזיק - פיזית ורגשית",
    "את מריצה דאגות בראש ולא נוכחת בכאן ועכשיו במהלך היום שלך",
    "את רוצה לחזור לחיבור אותנטי וכנה עם עצמך ולחוות שקט פנימי",
    "את רוצה לסמוך ולהישען יותר, ולשחרר שליטה ואחיזה",
    "את רוצה לאפשר לעצמך להרגיש הכל ולהישאר יציבה",
    "את מרגישה שאת נעה בין קצוות של נוקשות פנימית לבין מרדנות פנימית",
    "את רוצה להכיר לעומק את העולם הפנימי הרגשי שלך ולחיות מתוך הקשבה ולא הדחקה",
    "את מרגישה שחיים בך חלקים שאת דוחה מעלייך",
    "את מרגישה שיש בתוכך עוצמה פנימית שלא מקבלת ביטוי"
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-44 pb-32 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Workshop" title="קורס BeinMe" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div ref={contentReveal} className="lg:col-span-7 text-right reveal">
              <h3 className="text-4xl md:text-6xl font-headline italic mb-10 text-accent leading-tight">להיות אני בתוכי</h3>
              <div className="space-y-8 text-xl font-light text-stone-700 leading-relaxed">
                <p>BeinMe הוא מרחב קבוצתי – טיפולי לנשים, שנולד מתוך רצון להקשיב לעצמי. לגלות את מה שנמצא בתוכי, להכיר אותו, ולחוות אותו בכנות ואותנטיות.</p>
                <div className="italic text-accent font-medium border-r-4 border-primary/40 pr-8 py-4 bg-stone-50 rounded-sm">
                  <p>"אם לא תכירי את העולם הפנימי שלך – הוא ינהל אותך ואת תקראי לזה גורל."</p>
                </div>
                <p>האמת שלנו ומפת הדרכים לחיינו נמצאת בתוכנו – לא מחוצה לנו. כאן אפשר לעצור, לנשום להרגיש ולחזור לבית הפנימי שלנו, והכי יפה שאת הולכת לעשות את זה עם נשים אחרות, להיתמך, לחלוק ולהתבונן בעצמך דרך החוויה המשותפת. תיפגשי עם חלקים שונים באישיות שלך, תשמעי אותך מבקרת אותך וגם שמחה בך, ותצללי לעומק העולם הפנימי היפה שלך.</p>
                <p className="text-lg">בקורס נעבוד עם הכלים – מיינדפולנס, שיטת פוקוסינג, המערכת ההישרדותית והבוראת, הילדה והאם הפנימית, עבודת צללים ועוד.</p>
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
            <p className="mt-20 text-center text-stone-500 font-bold italic">לא בטוחה אם הקורס מתאים לך ? בואי נדבר.</p>
         </div>
      </section>

      <section className="py-32 bg-stone-50 px-6 md:px-20" id="contact">
        <div className="max-w-4xl mx-auto">
          <SectionTitle subtitle="Register" title="צרי קשר להרשמה" />
          <ContactForm />
        </div>
      </section>

      <Footer />
      <FaqAssistant />
    </main>
  );
}

