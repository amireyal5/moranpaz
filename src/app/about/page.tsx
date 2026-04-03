
"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { useReveal } from '@/hooks/use-reveal';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { GraduationCap, Briefcase, Sparkles, Heart, Orbit } from 'lucide-react';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function AboutPage() {
  const db = useFirestore();
  const contentRef = db ? doc(db, 'siteContent', 'about') : null;
  const { data: pageContent } = useDoc<any>(contentRef);

  const introReveal = useReveal();
  const uniquenessReveal = useReveal();
  const heroDesktopFallback = PlaceHolderImages.find(img => img.id === 'hero-about-desktop');
  const heroMobileFallback = PlaceHolderImages.find(img => img.id === 'hero-about-mobile');
  const portraitImg = PlaceHolderImages.find(img => img.id === 'moran-portrait');

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          {/* Desktop Hero */}
          <div className="hidden md:block absolute inset-0">
            <Image 
              src={pageContent?.heroImageUrlDesktop || heroDesktopFallback?.imageUrl || ""} 
              alt="About Moran Paz" 
              fill 
              className="object-cover opacity-60"
              priority
            />
          </div>
          {/* Mobile Hero */}
          <div className="md:hidden absolute inset-0">
            <Image 
              src={pageContent?.heroImageUrlMobile || heroMobileFallback?.imageUrl || ""} 
              alt="About Moran Paz" 
              fill 
              className="object-cover opacity-60"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background/20"></div>
        </div>
        <div className="relative z-10 text-center">
           <span className="boutique-label text-white/80 mb-8 block drop-shadow-md">About Moran Paz</span>
           <h1 className="text-6xl md:text-8xl xl:text-[110px] font-handwriting text-white mb-8 font-bold hero-title-shadow">
             {pageContent?.heroTitle || "הלב מאחורי הקליניקה"}
           </h1>
           <p className="text-2xl md:text-4xl xl:text-5xl font-headline italic text-white/90 leading-relaxed font-light hero-para-shadow">
             {pageContent?.heroSubtitle || "להדליק את האור בתוך המרחב הטיפולי"}
           </p>
        </div>
      </section>

      {/* Personal Text Section */}
      <section className="py-32 md:py-56 px-8 md:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-start">
            <div className="lg:col-span-5">
               <div className="image-zoom-container aspect-[3/4] shadow-2xl rounded-sm overflow-hidden border-8 border-background">
                  {portraitImg && (
                    <Image 
                      src={portraitImg.imageUrl} 
                      alt="מורן פז" 
                      fill 
                      className="object-cover"
                    />
                  )}
               </div>
            </div>

            <div ref={introReveal} className="lg:col-span-7 reveal space-y-12">
               <div className="relative pr-12 border-r-[3px] border-primary/20">
                  <h3 className="text-3xl md:text-5xl font-headline text-accent italic font-light leading-snug">
                    {pageContent?.introTitle || "אנחנו מאמינים ששינוי – כל שינוי – מתחיל קודם כל במפגש. מפגש אמיץ וחשוף עם כל אותם חלקים המרכיבים אותנו."}
                  </h3>
               </div>
               
               <div className="space-y-10 boutique-para text-stone-600">
                  {pageContent?.introContent ? (
                    <div className="blog-content-container" dangerouslySetInnerHTML={{ __html: pageContent.introContent }} />
                  ) : (
                    <>
                      <p>בתוך המרחב הטיפולי, המטרה שלנו היא לעזור לכם להדליק את האור. בכל מקום שבו קיימת טיפת חושך, ניתן לשפוך את אור המודעות ולהאיר את עצמנו מחדש.</p>
                      <p>הרגשות שלנו הם המצפן. לכל אחד מאיתנו יש מפת דרכים פנימית ייחודית לחייו, ולעיתים כל מה שנדרש הוא מישהו שיחזיק את הפנס בזמן שאנחנו מגלים אותה מחדש.</p>
                    </>
                  )}
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-12">
                  <div className="flex items-center gap-6 p-8 bg-stone-50 border border-stone-100">
                    <GraduationCap className="text-primary size-10" strokeWidth={1} />
                    <div>
                      <h4 className="font-bold text-accent text-xl">M.A ייעוץ ארגוני</h4>
                      <p className="text-sm opacity-60">אוניברסיטת חיפה</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 p-8 bg-stone-50 border border-stone-100">
                    <Briefcase className="text-primary size-10" strokeWidth={1} />
                    <div>
                      <h4 className="font-bold text-accent text-xl">פסיכותרפיה הוליסטית</h4>
                      <p className="text-sm opacity-60">הכשרה מקצועית מעמיקה</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section ref={uniquenessReveal} className="py-32 md:py-56 px-8 md:px-24 bg-stone-50 reveal border-y border-stone-100">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Unique Approach" title="מה מיוחד בגישה שלנו?" className="flex flex-col items-center text-center" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-32">
            {[
              { title: "שילוב גוף-נפש-רוח", icon: <Orbit />, desc: "עובדים עם הרגש, הגוף והרוח יחד לריפוי עמוק וחיבור למשמעות." },
              { title: "כלים חווייתיים", icon: <Sparkles />, desc: "עבודת צללים, ילדה פנימית, פוקוסינג ומיינדפולנס." },
              { title: "גישה אנושית", icon: <Heart />, desc: "שילוב של מקצועיות אקדמית (M.A) וחיבור אנושי חם בגובה העיניים." }
            ].map((point, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-10">
                <div className="text-primary">{React.cloneElement(point.icon as React.ReactElement, { size: 56, strokeWidth: 0.2 })}</div>
                <div className="space-y-6">
                  <h4 className="text-3xl font-headline font-bold text-accent">{point.title}</h4>
                  <p className="text-xl font-light text-stone-500 leading-relaxed">{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
