
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ContactForm } from '@/components/shared/ContactForm';
import { TestimonialsSection } from '@/components/shared/TestimonialsSection';
import { FaqSection } from '@/components/shared/FaqSection';
import { useReveal } from '@/hooks/use-reveal';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Orbit, Heart, Sparkles } from 'lucide-react';

export default function Home() {
  const heroReveal = useReveal();
  const introReveal = useReveal();
  const uniquenessReveal = useReveal();
  const ctaReveal = useReveal();
  
  const heroDesktop = PlaceHolderImages.find(img => img.id === 'hero-home-desktop');
  const heroMobile = PlaceHolderImages.find(img => img.id === 'hero-home-mobile');
  const portraitImg = PlaceHolderImages.find(img => img.id === 'moran-portrait');
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20הגעתי%20מהאתר%20BeinMe%20ואשמח%20לפרטים%20נוספים";

  const homeFaqs = [
    {
      question: "למי מתאים הטיפול הרגשי?",
      answer: "הטיפול מתאים לנשים ונוער החווים עומס רגשי, חרדה, תקיעות בחיים או רצון עמוק לחיבור אותנטי לעצמם. אני עובדת בטבעון ובאונליין."
    },
    {
      question: "מהי פסיכותרפיה הוליסטית ואיך היא עוזרת?",
      answer: "פסיכותרפיה הוליסטית רואה באדם שלם - גוף, נפש ורוח. הטיפול משלב שיחה יחד עם כלים חווייתיים (כמו מיינדפולנס, עבודת צללים ופוקוסינג) כדי לייצר שינוי עמוק ויציב."
    },
    {
      question: "איך מתחילים?",
      answer: "הצעד הראשון הוא שיחת היכרות קצרה שבה נבדוק את ההתאמה ונבין מה המטרה שלך בתהליך."
    }
  ];

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden bg-stone-900">
        <div className="absolute inset-0 z-0">
          {/* Desktop Image */}
          {heroDesktop && (
            <div className="hidden md:block absolute inset-0">
              <Image 
                src={heroDesktop.imageUrl} 
                alt="BeinMe - Moran Paz" 
                fill
                className="object-cover opacity-60 brightness-[0.75]"
                priority
                data-ai-hint={heroDesktop.imageHint}
              />
            </div>
          )}
          {/* Mobile Image */}
          {heroMobile && (
            <div className="md:hidden absolute inset-0">
              <Image 
                src={heroMobile.imageUrl} 
                alt="BeinMe - Moran Paz" 
                fill
                className="object-cover opacity-60 brightness-[0.75]"
                priority
                data-ai-hint={heroMobile.imageHint}
              />
            </div>
          )}
          {/* Gradient overlay - adjusted bottom color to be less white */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30"></div>
        </div>
        
        <div ref={heroReveal} className="relative z-10 text-center reveal flex flex-col items-center w-full max-w-5xl mx-auto px-4">
           <span className="boutique-label text-white/90 mb-8 block drop-shadow-md">Moran Paz • BeinMe</span>
           
           <h1 className="text-6xl sm:text-8xl md:text-[130px] font-bold leading-tight font-handwriting text-white mb-8 hero-title-shadow">
             להאיר את עצמך
           </h1>
           
           <h2 className="text-lg md:text-3xl font-headline italic mb-12 text-white/95 font-light max-w-3xl leading-relaxed hero-para-shadow">
             מסע של מודעות, קבלה וחיבור לסמכות הפנימית דרך עבודה משולבת של גוף, נפש ורוח
           </h2>
           
           <div className="pt-4">
             <a 
               href={whatsappLink} 
               target="_blank" 
               rel="noopener noreferrer"
               className="px-12 sm:px-24 py-5 bg-primary !text-white boutique-label !text-[13px] sm:!text-[15px] hover:bg-white hover:!text-accent transition-all duration-700 shadow-2xl rounded-sm flex items-center justify-center whitespace-nowrap !opacity-100 min-w-[260px] sm:min-w-[320px]"
             >
                קביעת פגישת היכרות
             </a>
           </div>
        </div>
      </section>

      {/* Intro Agenda Section */}
      <section ref={introReveal} className="py-24 md:py-48 px-6 md:px-24 bg-white reveal">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-32 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="image-zoom-container aspect-[3/4] shadow-2xl border-4 sm:border-8 border-background overflow-hidden relative">
                {portraitImg && (
                  <Image 
                    src={portraitImg.imageUrl} 
                    alt="מורן פז" 
                    fill 
                    className="object-cover"
                    data-ai-hint={portraitImg.imageHint}
                  />
                )}
              </div>
            </div>
            
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-10 sm:space-y-16">
              <div className="relative">
                <span className="boutique-label text-primary/70 mb-4 block">The Agenda</span>
                <h2 className="text-5xl sm:text-7xl md:text-9xl font-handwriting font-bold text-foreground leading-none mb-6">
                  בכל טיפת חושך אפשר לשפוך אור של מודעות
                </h2>
                <div className="mashrabiya-divider max-w-[150px] sm:max-w-[200px]"></div>
              </div>
              
              <div className="space-y-8 sm:space-y-12 boutique-para text-stone-600">
                <p>
                  אני מאמינה ששינוי מתחיל במפגש וקבלה של חלקי העצמי. הרגשות הם המצפן שלנו ולכל אחד מאיתנו יש את מפת הדרכים הפנימית שלו לחייו.
                </p>
                <p>
                  המטרה שלי לעזור לך לגלות את עצמך, לקבל את הסיפור שאת מספרת לעצמך, ולהתחבר לסמכות הפנימית שבך – המקום שבו נמצאות התשובות והחופש האמיתי.
                </p>
              </div>
              
              <div className="pt-4">
                <Link href="/about" className="inline-flex items-center gap-4 boutique-label text-primary/70 border-b border-primary/20 hover:border-primary transition-all pb-2 font-bold text-sm sm:text-base">
                  עלי ועל הגישה הטיפולית
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Uniqueness Section */}
      <section ref={uniquenessReveal} className="py-24 md:py-48 px-6 md:px-24 bg-stone-50 reveal border-y border-stone-100">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Core Pillars" title="גוף • נפש • רוח" className="flex flex-col items-center text-center" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-20 sm:mt-32">
            {[
              { title: "גוף", icon: <Orbit />, desc: "הקשבה לתחושות הפיזיקליות כפתח לעולם הרגשי." },
              { title: "נפש", icon: <Heart />, desc: "עיבוד רגשות, דפוסים והסיפור שאנחנו מספרים לעצמנו." },
              { title: "רוח", icon: <Sparkles />, desc: "חיבור למודעות, למשמעות ולאור שבתוכנו." }
            ].map((point, i) => (
              <div key={i} className="boutique-card">
                <div className="text-primary mb-8 group-hover:scale-110 transition-transform duration-700">
                  {React.cloneElement(point.icon as React.ReactElement, { size: 56, strokeWidth: 0.2 })}
                </div>
                <div className="space-y-6">
                  <h3 className="text-3xl sm:text-4xl font-headline font-light text-accent">{point.title}</h3>
                  <p className="text-lg sm:text-xl font-light text-stone-500 leading-relaxed">{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Appeal CTA */}
      <section ref={ctaReveal} className="py-24 md:py-32 px-6 md:px-24 bg-white reveal overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 sm:gap-24">
          <div className="space-y-8 flex-1 text-center md:text-right">
            <h3 className="text-5xl sm:text-7xl md:text-9xl font-handwriting text-accent leading-none">
              הזמנה למפגש אמיתי
            </h3>
            <p className="boutique-para text-xl sm:text-3xl font-light leading-relaxed">
              בכל טיפת חושך ניתן לשפוך אור. אני כאן כדי להחזיק את הפנס בזמן שאת מגלה את הדרך שלך.
            </p>
          </div>
          <div className="shrink-0 w-full md:w-auto">
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-12 sm:px-24 py-5 bg-accent !text-white boutique-label !text-[13px] sm:!text-[15px] hover:bg-primary transition-all duration-700 shadow-2xl rounded-sm whitespace-nowrap !opacity-100 w-full md:min-w-[340px] justify-center"
            >
              תיאום פגישת היכרות
            </a>
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <FaqSection items={homeFaqs} />

      <section id="contact" className="py-24 md:py-48 px-6 bg-white border-t border-stone-100">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle subtitle="Connect" title="צרו קשר" className="flex flex-col items-center" />
          <p className="boutique-para mb-12 sm:mb-20 font-medium">אני כאן בשבילך לתאום שיחת הכרות ללא עלות.</p>
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
