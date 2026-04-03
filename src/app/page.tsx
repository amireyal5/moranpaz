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
import { Orbit, Waves, Infinity, Compass, Quote, Heart, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
  const heroReveal = useReveal();
  const introReveal = useReveal();
  const uniquenessReveal = useReveal();
  const ctaReveal = useReveal();
  
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-home');
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
      <section className="relative h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-stone-900">
        <div className="absolute inset-0 z-0">
          {heroImg && (
            <Image 
              src={heroImg.imageUrl} 
              alt="BeinMe - Moran Paz" 
              fill
              className="object-cover opacity-60 brightness-[0.75]"
              priority
              data-ai-hint={heroImg.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background"></div>
        </div>
        
        <div ref={heroReveal} className="relative z-10 text-center reveal flex flex-col items-center w-full max-w-7xl mx-auto px-4">
           <span className="boutique-label text-white/90 mb-12 block drop-shadow-md">Moran Paz • BeinMe</span>
           
           <h1 className="text-7xl sm:text-9xl md:text-[150px] font-bold leading-none font-handwriting text-white mb-12 drop-shadow-2xl">
             להאיר את עצמך
           </h1>
           
           <h2 className="text-xl md:text-4xl font-headline italic mb-16 text-white/95 font-light max-w-4xl leading-relaxed drop-shadow-lg">
             מסע של מודעות, קבלה וחיבור לסמכות הפנימית דרך עבודה משולבת של גוף, נפש ורוח
           </h2>
           
           <div className="pt-8">
             <a 
               href={whatsappLink} 
               target="_blank" 
               rel="noopener noreferrer"
               className="px-24 py-6 bg-primary text-white boutique-label !text-[15px] hover:bg-white hover:text-accent transition-all duration-700 shadow-2xl rounded-sm flex items-center justify-center whitespace-nowrap !opacity-100 min-w-[320px]"
             >
                קביעת פגישת היכרות
             </a>
           </div>
        </div>
      </section>

      {/* Intro Agenda Section */}
      <section ref={introReveal} className="py-32 md:py-56 px-6 md:px-24 bg-white reveal">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="image-zoom-container aspect-[3/4] shadow-2xl border-8 border-background overflow-hidden relative">
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
            
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-16">
              <div className="relative">
                <span className="boutique-label text-primary mb-6 block">The Agenda</span>
                <h2 className="text-6xl md:text-9xl font-handwriting font-bold text-foreground leading-none mb-8">
                  בכל טיפת חושך אפשר לשפוך אור של מודעות
                </h2>
                <div className="mashrabiya-divider max-w-[200px]"></div>
              </div>
              
              <div className="space-y-12 boutique-para text-stone-600">
                <p>
                  אני מאמינה ששינוי מתחיל במפגש וקבלה של חלקי העצמי. הרגשות הם המצפן שלנו ולכל אחד מאיתנו יש את מפת הדרכים הפנימית שלו לחייו.
                </p>
                <p>
                  המטרה שלי לעזור לך לגלות את עצמך, לקבל את הסיפור שאת מספרת לעצמך, ולהתחבר לסמכות הפנימית שבך – המקום שבו נמצאות התשובות והחופש האמיתי.
                </p>
              </div>
              
              <div className="pt-8">
                <Link href="/about" className="inline-flex items-center gap-4 boutique-label text-primary border-b border-primary/20 hover:border-primary transition-all pb-2 font-bold text-base">
                  עלי ועל הגישה הטיפולית
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Uniqueness Section */}
      <section ref={uniquenessReveal} className="py-32 md:py-56 px-6 md:px-24 bg-stone-50 reveal">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Core Pillars" title="גוף • נפש • רוח" className="flex flex-col items-center text-center" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-32">
            {[
              { title: "גוף", icon: <Orbit />, desc: "הקשבה לתחושות הפיזיקליות כפתח לעולם הרגשי." },
              { title: "נפש", icon: <Heart />, desc: "עיבוד רגשות, דפוסים והסיפור שאנחנו מספרים לעצמנו." },
              { title: "רוח", icon: <Sparkles />, desc: "חיבור למודעות, למשמעות ולאור שבתוכנו." }
            ].map((point, i) => (
              <div key={i} className="text-center group flex flex-col items-center gap-10">
                <div className="text-primary group-hover:scale-110 transition-transform duration-700">
                  {React.cloneElement(point.icon as React.ReactElement, { size: 64, strokeWidth: 0.2 })}
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-headline font-light text-accent">{point.title}</h3>
                  <p className="text-xl font-light text-stone-500 leading-relaxed max-w-[280px]">{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Appeal CTA */}
      <section ref={ctaReveal} className="py-32 px-6 md:px-24 bg-white reveal overflow-hidden border-y border-stone-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-24">
          <div className="space-y-10 flex-1">
            <h3 className="text-6xl md:text-9xl font-handwriting text-accent leading-none">
              הזמנה למפגש אמיתי
            </h3>
            <p className="boutique-para text-3xl font-light leading-relaxed">
              בכל טיפת חושך ניתן לשפוך אור. אני כאן כדי להחזיק את הפנס בזמן שאת מגלה את הדרך שלך.
            </p>
          </div>
          <div className="shrink-0">
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-24 py-6 bg-accent text-white boutique-label !text-[15px] hover:bg-primary transition-all duration-700 shadow-2xl rounded-sm whitespace-nowrap !opacity-100 min-w-[340px] justify-center"
            >
              תיאום פגישת היכרות
            </a>
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <FaqSection items={homeFaqs} />

      <section id="contact" className="py-32 md:py-56 px-6 bg-white border-t border-stone-100">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle subtitle="Connect" title="צרו קשר" className="flex flex-col items-center" />
          <p className="boutique-para mb-20 font-medium">אני כאן בשבילך לתאום שיחת הכרות ללא עלות.</p>
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
