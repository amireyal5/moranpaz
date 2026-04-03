"use client";

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { useReveal } from '@/hooks/use-reveal';
import { Heart, CheckCircle2, Quote } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function YouthPage() {
  const contentReveal = useReveal();
  const youthInviteReveal = useReveal();
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-youth');
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20אני%20פונה%20לגבי%20טיפול%20לנוער";

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          {heroImg && (
            <Image 
              src={heroImg.imageUrl} 
              alt="Therapy for Youth" 
              fill 
              className="object-cover opacity-60 brightness-[0.7]"
              priority
              data-ai-hint={heroImg.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background"></div>
        </div>
        <div className="relative z-10 text-center">
           <span className="boutique-label text-white/80 mb-8 block">Youth Empowerment</span>
           <h1 className="text-7xl md:text-9xl font-handwriting text-white mb-8 font-bold">טיפול רגשי לנוער</h1>
           <p className="text-2xl md:text-4xl font-headline italic text-white/90 leading-relaxed font-light">מקום בטוח להיות מי שאת/ה</p>
        </div>
      </section>

      <section className="pt-32 pb-32 px-8 md:px-24">
        <div className="max-w-5xl mx-auto">
          <SectionTitle subtitle="Audience" title="טיפול וליווי לנוער" />
          
          <div ref={contentReveal} className="reveal space-y-12">
            <h3 className="text-4xl md:text-6xl font-headline italic text-accent mb-12 leading-tight">
              חיזוק תחושת הבחירה והביטוי העצמי
            </h3>
            
            <div className="boutique-para space-y-8 text-stone-600">
              <p>
                גיל ההתבגרות הוא תקופה של שינויים מרגשים אך גם מאתגרים מאוד. זהו שלב של חיפוש זהות, התמודדות עם לחץ חברתי, לימודי ורגשי, ולפעמים תחושה שאף אחד לא באמת מבין.
              </p>
              <p>
                בטיפול רגשי לנוער, אני מציעה מרחב שבו אפשר לדבר על הכל – בלי שיפוטיות, בגובה העיניים ובסודיות מלאה. נשתמש בכלים יצירתיים וחווייתיים כדי לעזור לנער או לנערה למצוא את הכוחות הפנימיים שלהם.
              </p>
            </div>

            <div className="relative pr-12 py-8 my-16 border-r-[3px] border-primary/20">
               <Quote className="absolute -top-10 -right-4 text-primary/5 w-48 h-48 rotate-180 pointer-events-none" />
               <p className="text-3xl md:text-4xl font-headline text-accent italic font-light leading-snug relative z-10">
                 המטרה היא לעזור לך לגלות את הסיפור שאתה מספר לעצמך, לפתח מודעות ולהתחבר לסמכות הפנימית שלך.
               </p>
            </div>

            <div className="bg-white p-12 border border-primary/10 shadow-2xl space-y-8 mt-16">
              <h4 className="text-3xl font-headline font-bold text-primary">פיתוח חוסן רגשי ותחושת בחירה</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xl font-light">
                <li className="flex items-start gap-4"><Heart size={20} className="text-primary mt-1" /> חיזוק הביטחון והערך העצמי</li>
                <li className="flex items-start gap-4"><Heart size={20} className="text-primary mt-1" /> פיתוח חוסן רגשי במצבי לחץ</li>
                <li className="flex items-start gap-4"><Heart size={20} className="text-primary mt-1" /> חיזוק תחושת הבחירה האישית</li>
                <li className="flex items-start gap-4"><Heart size={20} className="text-primary mt-1" /> ביטוי עצמי אותנטי בגובה העיניים</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Youth Personal Invitation */}
      <section ref={youthInviteReveal} className="py-24 bg-stone-50 reveal border-y border-stone-200/50 px-8">
         <div className="max-w-4xl mx-auto text-center space-y-12">
            <h3 className="text-6xl md:text-8xl font-handwriting text-accent leading-none">מרחב בטוח לצמוח בו</h3>
            <p className="boutique-para text-2xl font-light max-w-2xl mx-auto leading-relaxed">
              הורים יקרים, אני כאן כדי להעניק לילדיכם את המרחב המכיל והמקצועי לו הם זקוקים. בואו נתאם שיחת ייעוץ ראשונית לבדיקת התאמה.
            </p>
            <div className="pt-8">
               <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-16 py-6 bg-accent text-white boutique-label !text-[13px] hover:bg-primary transition-all duration-700 shadow-2xl rounded-sm !opacity-100 min-w-[280px] justify-center"
              >
                פנייה לשיחת ייעוץ והתאמה
              </a>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
