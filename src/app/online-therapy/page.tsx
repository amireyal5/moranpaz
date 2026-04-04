
"use client";

import React, { useMemo } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { useReveal } from '@/hooks/use-reveal';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Globe, ShieldCheck, Clock, Infinity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function OnlineTherapyPage() {
  const db = useFirestore();
  const contentRef = useMemo(() => db ? doc(db, 'siteContent', 'online') : null, [db]);
  const { data: pageContent } = useDoc<any>(contentRef);

  const introReveal = useReveal();
  const benefitsReveal = useReveal();
  
  // Using the stable portrait image as the primary fallback for Hero
  const portraitImg = PlaceHolderImages.find(img => img.id === 'moran-portrait');
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20הגעתי%20מהאתר%20אשמח%20לפרטים%20על%20טיפול%20אונליין%20לישראלים%20בחו%22ל";

  const heroDesktopSrc = pageContent?.heroImageUrlDesktop || portraitImg?.imageUrl;
  const heroMobileSrc = pageContent?.heroImageUrlMobile || pageContent?.heroImageUrlDesktop || portraitImg?.imageUrl;

  const benefits = [
    {
      title: "לישראלים בחו\"ל",
      desc: "טיפול רגשי עמוק בשפת האם שלך, המגשר על פערי תרבות ומרחק.",
      icon: <Globe size={40} strokeWidth={0.2} />
    },
    {
      title: "60 דקות טיפול",
      desc: "מפגש מלא ומעמיק של שעה שלמה המוקדשת כולה לך.",
      icon: <Clock size={40} strokeWidth={0.2} />
    },
    {
      title: "מרחב בטוח מהבית",
      desc: "תהליך רגשי עמוק מהנוחות והביטחון של הפינה השקטה שלך.",
      icon: <ShieldCheck size={40} strokeWidth={0.2} />
    },
    {
      title: "פסיכותרפיה הוליסטית",
      desc: "הקשר הרגשי עובר דרך המסך בצורה מלאה ואינטימית.",
      icon: <Infinity size={40} strokeWidth={0.2} />
    }
  ];

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section - Fixed with Therapist Portrait */}
      <section className="relative h-[80vh] w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          {heroDesktopSrc && (
            <div className="hidden md:block absolute inset-0">
              <Image 
                src={heroDesktopSrc} 
                alt="Online Therapy Hero" 
                fill 
                className="object-cover opacity-70 brightness-[0.8]"
                priority
              />
            </div>
          )}
          {heroMobileSrc && (
            <div className="md:hidden absolute inset-0">
              <Image 
                src={heroMobileSrc} 
                alt="Online Therapy Hero Mobile" 
                fill 
                className="object-cover opacity-70 brightness-[0.8]"
                priority
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background/20"></div>
        </div>
        <div className="relative z-10 text-center">
           <span className="boutique-label text-white/90 mb-8 block drop-shadow-md">Global Connection</span>
           <h1 className="text-6xl md:text-8xl xl:text-[140px] font-handwriting text-white mb-8 font-bold hero-title-shadow leading-none">
             {pageContent?.heroTitle || "בית פנימי מכל מקום"}
           </h1>
           <p className="text-2xl md:text-4xl font-headline italic text-white/95 leading-relaxed font-light hero-para-shadow">
             {pageContent?.heroSubtitle || "טיפול רגשי אונליין לישראלים בארץ ובעולם"}
           </p>
        </div>
      </section>

      <section className="py-32 px-8 md:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <div ref={introReveal} className="lg:col-span-7 reveal">
            <span className="boutique-label block mb-8 text-primary">Global Care</span>
            <h2 className="text-5xl md:text-7xl font-headline text-accent mb-12 font-bold leading-tight">
              {pageContent?.introTitle || "טיפול בעברית לישראלים בחו\"ל"}
            </h2>
            <div className="boutique-para mb-16 space-y-10 leading-relaxed text-xl text-stone-600">
              {pageContent?.introContent ? (
                <div className="page-content-container" dangerouslySetInnerHTML={{ __html: pageContent.introContent }} />
              ) : (
                <>
                  <p>פסיכותרפיה הוליסטית אונליין מאפשרת לנו להיפגש בתוך מרחב דיגיטלי בטוח ומכיל.</p>
                  <p>אני מלווה ישראלים ורילוקיישניסטים ברחבי העולם בתהליכי עומק רגשיים של 60 דקות.</p>
                </>
              )}
            </div>
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-8 px-16 py-4 bg-primary text-white boutique-label hover:bg-accent transition-all duration-700 shadow-2xl rounded-sm !opacity-100"
            >
              תאום פגישת היכרות אונליין
            </a>
          </div>
          
          <div className="lg:col-span-5">
            <div className="image-zoom-container aspect-square shadow-2xl border-t-8 border-r-8 border-primary/10 bg-white p-4 relative overflow-hidden rounded-sm">
               {portraitImg?.imageUrl && (
                 <Image 
                   src={portraitImg.imageUrl} 
                   alt="מורן פז - BeinMe" 
                   fill 
                   className="object-cover"
                 />
               )}
            </div>
          </div>
        </div>
      </section>

      <section ref={benefitsReveal} className="py-32 md:py-56 bg-stone-50 px-8 md:px-24 reveal">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            subtitle="The Advantages" 
            title="למה לבחור בטיפול אונליין?" 
            className="flex flex-col items-center text-center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-32">
            {benefits.map((benefit, i) => (
              <div key={i} className={cn("boutique-card group !min-h-[400px] backdrop-blur-md bg-white/90", `stagger-${i+1}`)}>
                <div className="art-icon !top-10 !right-10 opacity-30 text-primary">
                  {benefit.icon}
                </div>
                <div className="relative z-10 text-right w-full">
                  <h3 className="text-3xl font-headline font-bold mb-8 text-accent">{benefit.title}</h3>
                  <p className="opacity-80 font-light text-xl leading-relaxed text-stone-600">{benefit.desc}</p>
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
