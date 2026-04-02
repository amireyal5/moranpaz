
"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { useReveal } from '@/hooks/use-reveal';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
  const introReveal = useReveal();
  const portraitImg = PlaceHolderImages.find(img => img.id === 'moran-portrait');

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-56 pb-32 px-8 md:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          <div ref={introReveal} className="lg:col-span-7 text-right reveal">
             <div className="mb-16">
               <span className="boutique-label block mb-6">About Moran Paz</span>
               <h1 className="boutique-title handwriting-reveal">
                 נעים מאוד, מורן פז
               </h1>
               <div className="w-24 h-[1px] mt-8 mr-0 bg-primary/30"></div>
             </div>
             
             <div className="space-y-10 boutique-para">
                <p className="stagger-1 text-3xl font-headline text-foreground italic border-r-4 border-primary/20 pr-8">
                  "אנחנו לא רק מה שהיינו – אנחנו גם מה שנהיה."
                </p>
                <div className="space-y-8">
                  <p className="stagger-2">
                    פסיכותרפיסטית הוליסטית ומנחת תהליכים רגשיים – חווייתיים. 
                    אני מאמינה שלכולנו יש את הזכות להרגיש חופשיים מבפנים ושהבחירה קיימת לכל אדם בכל מצב. 
                    אני מאמינה בפוטנציאל הנשמתי של כל אדם לממש את עצמו ולהעניק לעולם את המתנות שלו.
                  </p>
                  <p className="stagger-3">
                    בוגרת תואר שני בייעוץ ארגוני מאוניברסיטת חיפה ובוגרת מסלול פסיכותרפיה הוליסטית. 
                    לכל אדם יש את הקצב והמסע שלו ואני כאן ללוות מתוך כבוד ואמונה באדם ובדרך.
                  </p>
                  <p className="stagger-4">
                    בעשור האחרון עברתי מסע אישי מרפא וכיום אני מלווה אנשים למצוא את הדרך שלהם פנימה – לחיבור העמוק והאותנטי עם עצמם – ולחיות את חייהם דרך אותו החיבור. 
                  </p>
                  <p className="stagger-5 font-medium text-accent">
                    מה זה נותן? פחות חרדות וסטרס, שלווה פנימית, חוסן נפשי ומנטלי, קבלת החלטות בהירה ויעילה יותר, ביטוי אותנטי, בריאות נפשית ופיזית גבוהה יותר ובכללי – תחושת רווחה ואושר גבוהה יותר מהחיים שלך.
                  </p>
                </div>
             </div>
          </div>
          
          <div className="lg:col-span-5">
             <div className="image-zoom-container aspect-[3/4] shadow-2xl border-t-8 border-r-8 border-primary/10">
                {portraitImg && (
                  <Image 
                    src={portraitImg.imageUrl} 
                    alt="מורן פז - פסיכותרפיסטית" 
                    fill 
                    className="object-cover"
                    data-ai-hint={portraitImg.imageHint}
                  />
                )}
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
