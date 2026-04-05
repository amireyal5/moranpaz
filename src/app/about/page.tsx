
"use client";

import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { useReveal } from '@/hooks/use-reveal';
import { PortraitImage } from '@/components/shared/PortraitImage';
import { GraduationCap, Briefcase, Sparkles, Heart, Orbit, Users, Star, ArrowLeft } from 'lucide-react';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function AboutPage() {
  const db = useFirestore();
  const contentRef = useMemo(() => db ? doc(db, 'siteContent', 'about') : null, [db]);
  const { data: pageContent, loading: pageLoading } = useDoc<any>(contentRef);

  const introReveal = useReveal();
  const servicesReveal = useReveal();
  const uniquenessReveal = useReveal();

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          {/* Desktop Hero */}
          {pageContent?.heroImageUrlDesktop && (
            <div className="hidden md:block absolute inset-0">
              <Image
                src={pageContent.heroImageUrlDesktop}
                alt="About Moran Paz"
                fill
                className="object-cover opacity-60"
                priority
              />
            </div>
          )}
          {/* Mobile Hero */}
          {(pageContent?.heroImageUrlMobile || pageContent?.heroImageUrlDesktop) && (
            <div className="md:hidden absolute inset-0">
              <Image
                src={pageContent.heroImageUrlMobile || pageContent.heroImageUrlDesktop}
                alt="About Moran Paz"
                fill
                className="object-cover opacity-60"
                priority
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background/20"></div>
        </div>
        <div className="relative z-10 text-center">
          {pageLoading ? (
            <div className="space-y-6 animate-pulse">
              <div className="h-4 w-32 bg-white/20 rounded mx-auto" />
              <div className="h-24 w-96 bg-white/20 rounded mx-auto" />
              <div className="h-8 w-80 bg-white/10 rounded mx-auto" />
            </div>
          ) : (
            <>
              <span className="boutique-label text-white/80 mb-8 block drop-shadow-md">About Moran Paz</span>
              <h1 className="text-6xl md:text-8xl xl:text-[110px] font-handwriting text-white mb-8 font-bold hero-title-shadow">
                {pageContent?.heroTitle}
              </h1>
              <p className="text-2xl md:text-4xl xl:text-5xl font-headline italic text-white/90 leading-relaxed font-light hero-para-shadow">
                {pageContent?.heroSubtitle}
              </p>
            </>
          )}
        </div>
      </section>

      {/* Personal Text Section - Updated to 1st Person Female */}
      <section className="py-20 md:py-32 xl:py-56 px-6 md:px-12 xl:px-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 xl:gap-24 items-start">
            <div className="lg:col-span-5 min-w-0">
               <PortraitImage
                 src={pageContent?.portraitImageUrl}
                 loading={pageLoading}
                 shape={pageContent?.portraitShape as any || 'circle'}
                 alt="מורן פז"
               />
            </div>

            <div ref={introReveal} className="lg:col-span-7 reveal space-y-8 min-w-0 overflow-hidden">
               <div className="relative pr-6 md:pr-10 xl:pr-12 border-r-[3px] border-primary/20 overflow-hidden">
                  <h3 className="text-2xl md:text-4xl xl:text-5xl font-headline text-accent italic font-light leading-snug break-words">
                    {pageContent?.introTitle || "אני מאמינה ששינוי – כל שינוי – מתחיל קודם כל במפגש. מפגש אמיץ וחשוף עם כל אותם חלקים המרכיבים אותנו."}
                  </h3>
               </div>
               
               <div className="space-y-10 boutique-para text-stone-600">
                  {pageContent?.introContent ? (
                    <div className="page-content-container" dangerouslySetInnerHTML={{ __html: pageContent.introContent.replace(/&nbsp;|\u00A0/g, ' ') }} />
                  ) : (
                    <>
                      <p>בתוך המרחב הטיפולי, המטרה שלי היא לעזור לך להדליק את האור. בכל מקום שבו קיימת טיפת חושך, ניתן לשפוך את אור המודעות ולהאיר את עצמנו מחדש.</p>
                      <p>הרגשות שלנו הם המצפן. לכל אחד מאיתנו יש מפת דרכים פנימית ייחודית לחייו, ולעיתים כל מה שנדרש הוא מישהי שתחזיק את הפנס בזמן שאת מגלה אותה מחדש.</p>
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

      {/* Expertise Cards Section */}
      <section ref={servicesReveal} className="py-32 md:py-48 px-4 md:px-8 xl:px-24 bg-stone-50 border-y border-stone-100 reveal">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="How I Help" title="מרחבי הטיפול והליווי שלי" className="flex flex-col items-center text-center" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24">
            {/* Women Card */}
            <Link href="/audience/women" className="group">
              <div className="bg-white p-12 border border-stone-100 shadow-sm group-hover:shadow-2xl transition-all duration-700 h-full flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <Heart size={32} strokeWidth={1} />
                </div>
                <h3 className="text-3xl font-headline text-accent mb-6 font-bold">ליווי רגשי לנשים</h3>
                <p className="text-stone-500 font-light mb-8 leading-relaxed">מרחב בטוח לחזור אל הבית הפנימי שלך, לשחרר עומסים ולמצוא את הקול האותנטי.</p>
                <div className="mt-auto flex items-center gap-3 text-primary boutique-label font-bold text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                  לפרטים נוספים <ArrowLeft size={14} />
                </div>
              </div>
            </Link>

            {/* Youth Card */}
            <Link href="/audience/youth" className="group">
              <div className="bg-white p-12 border border-stone-100 shadow-sm group-hover:shadow-2xl transition-all duration-700 h-full flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <Users size={32} strokeWidth={1} />
                </div>
                <h3 className="text-3xl font-headline text-accent mb-6 font-bold">טיפול רגשי לנוער</h3>
                <p className="text-stone-500 font-light mb-8 leading-relaxed">ליווי בגובה העיניים לפיתוח חוסן רגשי, ביטוי עצמי והתמודדות עם אתגרי גיל ההתבגרות.</p>
                <div className="mt-auto flex items-center gap-3 text-primary boutique-label font-bold text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                  לפרטים נוספים <ArrowLeft size={14} />
                </div>
              </div>
            </Link>

            {/* Workshop Card */}
            <Link href="/blog" className="group">
              <div className="bg-white p-12 border border-stone-100 shadow-sm group-hover:shadow-2xl transition-all duration-700 h-full flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <Star size={32} strokeWidth={1} />
                </div>
                <h3 className="text-3xl font-headline text-accent mb-6 font-bold">סדנת BeinMe</h3>
                <p className="text-stone-500 font-light mb-8 leading-relaxed">מסע קבוצתי של גילוי עצמי, שילוב גוף-נפש-רוח וחיבור עמוק לסמכות הפנימית.</p>
                <div className="mt-auto flex items-center gap-3 text-primary boutique-label font-bold text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                  לפרטים בבלוג <ArrowLeft size={14} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section ref={uniquenessReveal} className="py-32 md:py-56 px-4 md:px-8 xl:px-24 bg-white reveal">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Unique Approach" title="מה מיוחד בגישה שלי?" className="flex flex-col items-center text-center" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-32">
            {[
              { title: "שילוב גוף-נפש-רוח", icon: <Orbit />, desc: "אני עובדת עם הרגש, הגוף והרוח יחד לריפוי עמוק וחיבור למשמעות." },
              { title: "כלים חווייתיים", icon: <Sparkles />, desc: "אני משלבת עבודת צללים, ילדה פנימית, פוקוסינג ומיינדפולנס בטיפול." },
              { title: "גישה אנושית", icon: <Heart />, desc: "אני משלבת מקצועיות אקדמית (M.A) יחד עם חיבור אנושי חם בגובה העיניים." }
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
