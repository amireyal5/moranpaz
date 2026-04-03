
"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { useReveal } from '@/hooks/use-reveal';
import { Orbit, Heart, Sparkles, Compass } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function PracticePage() {
  const db = useFirestore();
  const contentRef = db ? doc(db, 'siteContent', 'practice') : null;
  const { data: pageContent } = useDoc<any>(contentRef);

  const introReveal = useReveal();
  const stepsReveal = useReveal();
  const heroDesktopFallback = PlaceHolderImages.find(img => img.id === 'hero-practice');
  const heroMobileFallback = PlaceHolderImages.find(img => img.id === 'hero-practice-mobile');

  const categories = [
    { title: "תקיעות בחיים", desc: "שחרור חסמים ויצירת תנועה חדשה." },
    { title: "חרדה ומתח", desc: "כלים לוויסות רגשי ומרחב לנשימה." },
    { title: "מערכות יחסים", desc: "שיפור הקשר עם עצמך ועם הסביבה." },
    { title: "דימוי עצמי", desc: "בניית ערך פנימי וחיבור לקול האותנטי." }
  ];

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden">
      <Navbar />
      
      {/* Dynamic Hero */}
      <section className="relative h-[80vh] w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          <div className="hidden md:block absolute inset-0">
            <Image 
              src={pageContent?.heroImageUrlDesktop || heroDesktopFallback?.imageUrl || ""} 
              alt="The Journey" 
              fill 
              className="object-cover opacity-50"
              priority
            />
          </div>
          <div className="md:hidden absolute inset-0">
            <Image 
              src={pageContent?.heroImageUrlMobile || pageContent?.heroImageUrlDesktop || heroMobileFallback?.imageUrl || ""} 
              alt="The Journey Mobile" 
              fill 
              className="object-cover opacity-60"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background/20"></div>
        </div>
        <div className="relative z-10 text-center">
           <span className="boutique-label text-white/80 mb-8 block drop-shadow-md">The Journey</span>
           <h1 className="text-8xl md:text-[140px] font-handwriting text-white mb-8 font-bold hero-title-shadow">
             {pageContent?.heroTitle || "התהליך הטיפולי"}
           </h1>
           <p className="text-2xl md:text-[50px] font-headline italic text-white/90 leading-relaxed font-light hero-para-shadow">
             {pageContent?.heroSubtitle || "מסע משותף של גילוי וריפוי"}
           </p>
        </div>
      </section>

      <section className="py-32 md:py-56 px-8 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div ref={introReveal} className="reveal mb-32 max-w-5xl">
            <span className="boutique-label text-primary mb-10 block">Integrated Care</span>
            <div className="boutique-para !text-3xl md:!text-5xl leading-tight mb-16 font-light">
              {pageContent?.introTitle ? pageContent.introTitle : "העבודה הטיפולית משלבת כלים מעולמות הפסיכולוגיה והרוח."}
            </div>
            <div className="space-y-8 boutique-para text-stone-600">
              {pageContent?.introContent && (
                <div className="blog-content-container" dangerouslySetInnerHTML={{ __html: pageContent.introContent }} />
              )}
            </div>
            <div className="mashrabiya-divider max-w-[300px]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-48">
            {categories.map((item, i) => (
              <div key={i} className="boutique-card group border border-stone-100 hover:border-primary/20">
                <h3 className="text-4xl font-headline mb-8 text-accent">{item.title}</h3>
                <p className="text-xl font-light opacity-80 leading-relaxed">{item.desc}</p>
                <div className="absolute bottom-8 right-8 text-primary/10 group-hover:text-primary/40 transition-colors">
                  <Compass size={40} />
                </div>
              </div>
            ))}
          </div>

          <div ref={stepsReveal} className="reveal space-y-24">
            <SectionTitle subtitle="How it works" title="שלבי המסע שלנו" className="flex flex-col items-center text-center" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-20">
              {[
                { title: "זיהוי הסיפור", icon: <Orbit />, desc: "הבנת הדפוסים והסיפור שסיפרת לעצמך עד היום." },
                { title: "קבלת חלקים", icon: <Heart />, desc: "מפגש אמיץ עם החלקים החבויים וקבלה שלהם." },
                { title: "סמכות פנימית", icon: <Sparkles />, desc: "התחברות למקום שבו נמצאות התשובות שלך." }
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center space-y-10 group">
                  <div className="text-primary group-hover:scale-110 transition-transform duration-700">
                    {React.cloneElement(step.icon as React.ReactElement, { size: 60, strokeWidth: 0.2 })}
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-3xl font-headline font-bold text-accent">{step.title}</h4>
                    <p className="text-xl font-light text-stone-600 leading-relaxed max-w-[280px]">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
