
"use client";

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { useReveal } from '@/hooks/use-reveal';
import { Heart, CheckCircle2, Quote } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function YouthPage() {
  const db = useFirestore();
  const contentRef = db ? doc(db, 'siteContent', 'youth') : null;
  const { data: pageContent } = useDoc<any>(contentRef);

  const contentReveal = useReveal();
  const youthInviteReveal = useReveal();
  const heroImgFallback = PlaceHolderImages.find(img => img.id === 'hero-youth');
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20אני%20פונה%20לגבי%20טיפול%20לנוער";

  const heroDesktopSrc = pageContent?.heroImageUrlDesktop || heroImgFallback?.imageUrl;
  const heroMobileSrc = pageContent?.heroImageUrlMobile || pageContent?.heroImageUrlDesktop || heroImgFallback?.imageUrl;

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          {heroDesktopSrc && (
            <div className="hidden md:block absolute inset-0">
              <Image 
                src={heroDesktopSrc} 
                alt="Therapy for Youth" 
                fill 
                className="object-cover opacity-60 brightness-[0.7]"
                priority
              />
            </div>
          )}
          {heroMobileSrc && (
            <div className="md:hidden absolute inset-0">
              <Image 
                src={heroMobileSrc} 
                alt="Therapy for Youth Mobile" 
                fill 
                className="object-cover opacity-60 brightness-[0.7]"
                priority
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background"></div>
        </div>
        <div className="relative z-10 text-center">
           <span className="boutique-label text-white/80 mb-8 block">Youth Empowerment</span>
           <h1 className="text-7xl md:text-9xl font-handwriting text-white mb-8 font-bold">
             {pageContent?.heroTitle || "טיפול רגשי לנוער"}
           </h1>
           <p className="text-2xl md:text-4xl font-headline italic text-white/90 leading-relaxed font-light">
             {pageContent?.heroSubtitle || "מקום בטוח להיות מי שאת/ה"}
           </p>
        </div>
      </section>

      <section className="pt-32 pb-32 px-8 md:px-24">
        <div className="max-w-5xl mx-auto">
          <SectionTitle subtitle="Audience" title={pageContent?.introTitle || "טיפול וליווי לנוער"} />
          
          <div ref={contentReveal} className="reveal space-y-12">
            <div className="boutique-para space-y-8 text-stone-600">
              {pageContent?.introContent ? (
                <div className="blog-content-container" dangerouslySetInnerHTML={{ __html: pageContent.introContent }} />
              ) : (
                <>
                  <p>גיל ההתבגרות הוא תקופה של שינויים מרגשים אך גם מאתגרים מאוד. זהו שלב של חיפוש זהות והתמודדות עם לחצים שונים.</p>
                  <p>בטיפול רגשי לנוער, אני מציעה מרחב שבו אפשר לדבר על הכל – בלי שיפוטיות, בגובה העיניים ובסודיות מלאה.</p>
                </>
              )}
            </div>

            <div className="relative pr-12 py-8 my-16 border-r-[3px] border-primary/20">
               <Quote className="absolute -top-10 -right-4 text-primary/5 w-48 h-48 rotate-180 pointer-events-none" />
               <p className="text-3xl md:text-4xl font-headline text-accent italic font-light leading-snug relative z-10">
                 המטרה היא לעזור לך לגלות את הסיפור שאתה מספר לעצמך ולהתחבר לסמכות הפנימית שלך.
               </p>
            </div>
          </div>
        </div>
      </section>

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
