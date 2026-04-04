
"use client";

import React, { useMemo } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ContactForm } from '@/components/shared/ContactForm';
import { TestimonialsSection } from '@/components/shared/TestimonialsSection';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MapPin, Sparkles, ArrowLeft } from 'lucide-react';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function EmeqIzraelPage() {
  const db = useFirestore();
  const contentRef = useMemo(() => db ? doc(db, 'siteContent', 'emeq-izrael') : null, [db]);
  const { data: pageContent } = useDoc<any>(contentRef);

  const heroEmeqFallback = PlaceHolderImages.find(img => img.id === 'hero-emeq');
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20אני%20פונה%20לגבי%20טיפול%20רגשי%20בעמק%20יזרעאל";

  const heroDesktopSrc = pageContent?.heroImageUrlDesktop || heroEmeqFallback?.imageUrl;
  const heroMobileSrc = pageContent?.heroImageUrlMobile || pageContent?.heroImageUrlDesktop || heroEmeqFallback?.imageUrl;

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden">
      <Navbar />
      
      {/* Dynamic Hero */}
      <section className="relative h-[70vh] w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          {/* Desktop Hero */}
          {heroDesktopSrc && (
            <div className="hidden md:block absolute inset-0">
              <Image 
                src={heroDesktopSrc} 
                alt="טיפול רגשי בעמק יזרעאל - מורן פז" 
                fill 
                className="object-cover opacity-60 brightness-[0.7]"
                priority
              />
            </div>
          )}
          {/* Mobile Hero */}
          {heroMobileSrc && (
            <div className="md:hidden absolute inset-0">
              <Image 
                src={heroMobileSrc} 
                alt="טיפול רגשי בעמק יזרעאל - מורן פז" 
                fill 
                className="object-cover opacity-60 brightness-[0.7]"
                priority
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background/20"></div>
        </div>
        <div className="relative z-10 text-center max-w-5xl">
           <span className="boutique-label text-white/80 mb-6 block uppercase">EMEQ IZRAEL CARE</span>
           <h1 className="text-6xl md:text-9xl font-handwriting text-white mb-8 font-light">
             {pageContent?.heroTitle || "טיפול רגשי בעמק יזרעאל"}
           </h1>
           <p className="text-2xl md:text-4xl font-headline italic text-white/90 leading-relaxed font-light">
             {pageContent?.heroSubtitle || "מרחב בטוח לצמיחה, ריפוי ומודעות בלב העמק - ליווי רגשי לנשים ונוער."}
           </p>
        </div>
      </section>

      {/* Dynamic Content Section */}
      <section className="py-32 px-8 md:px-24 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <SectionTitle subtitle="Local Therapy" title={pageContent?.introTitle || "קרוב לבית, עמוק בלב"} />
            <div className="boutique-para space-y-8 text-xl leading-relaxed text-stone-600">
              {pageContent?.introContent ? (
                <div className="page-content-container" dangerouslySetInnerHTML={{ __html: pageContent.introContent }} />
              ) : (
                <>
                  <p>תושבות ותושבי עמק יזרעאל והסביבה מחפשים לעיתים קרובות מרחב טיפולי שמאפשר התנתקות מהרעש החיצוני וחיבור פנימי עמוק.</p>
                  <p>בקליניקה שלי, במרחק נסיעה קצר מכל יישובי העמק, אני מציעה פסיכותרפיה הוליסטית המשלבת עבודה עם הגוף, הרגש והרוח.</p>
                </>
              )}
            </div>
            
            <ul className="space-y-6">
              {[
                "טיפול בחרדה וסטרס יומיומי",
                "ליווי רגשי לנשים בצמתים בחיים",
                "חיזוק חוסן נפשי לבני נוער",
                "מיינדפולנס וכלים חווייתיים לריפוי"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-2xl font-light text-accent">
                  <Sparkles size={20} className="text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative aspect-square shadow-2xl border-r-8 border-primary/10">
            {heroDesktopSrc && (
              <Image 
                src={heroDesktopSrc} 
                alt="אווירה טיפולית בעמק" 
                fill 
                className="object-cover opacity-80"
              />
            )}
            <div className="absolute -bottom-10 -left-10 bg-accent text-white p-12 space-y-4 shadow-2xl hidden md:block">
               <MapPin className="text-primary mb-4" size={32} />
               <p className="text-xl font-bold">זמינות ביישובי העמק:</p>
               <p className="text-sm opacity-80 font-light">טבעון, עפולה, רמת ישי, נהלל ויישובי הסביבה.</p>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <section className="py-32 bg-stone-50 px-8">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-6xl md:text-8xl font-handwriting text-accent">נתחיל את המסע שלך?</h2>
          <p className="boutique-para">
            אני מזמינה אותך לשיחת היכרות ראשונית ללא עלות, לבדיקת התאמה ולתחילת התהליך שלך בלב העמק.
          </p>
          <div className="pt-8">
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-6 px-16 py-6 bg-primary text-white boutique-label !text-[13px] hover:bg-accent transition-all duration-700 shadow-xl rounded-sm !opacity-100"
            >
              תאום שיחת ייעוץ בעמק
              <ArrowLeft size={18} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white px-8">
        <div className="max-w-4xl mx-auto">
          <SectionTitle subtitle="Connect" title="צרו קשר" className="flex flex-col items-center" />
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
