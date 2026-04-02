"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ContactForm } from '@/components/shared/ContactForm';
import { FaqAssistant } from '@/components/shared/FaqAssistant';
import { TestimonialsSection } from '@/components/shared/TestimonialsSection';
import { FaqSection } from '@/components/shared/FaqSection';
import { useReveal } from '@/hooks/use-reveal';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ChevronDown, MessageCircle, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
  const heroReveal = useReveal();
  const introReveal = useReveal();
  const quoteReveal = useReveal();
  const offeringsReveal = useReveal();
  
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-bg');
  const portraitImg = PlaceHolderImages.find(img => img.id === 'moran-portrait');

  const homeFaqs = [
    {
      question: "למי מתאים הטיפול הרגשי?",
      answer: "הטיפול מתאים למי שחווה עומס רגשי, חרדה, תקיעות בחיים או רצון עמוק לחיבור אותנטי לעצמו. אני מלווה נשים וגברים בתהליכי שינוי וצמיחה."
    },
    {
      question: "איפה מתקיימות הפגישות?",
      answer: "הפגישות מתקיימות בקליניקה שקטה וירוקה בטבעון, או בשיחות וידאו (זום) מכל מקום בעולם."
    },
    {
      question: "כמה זמן נמשך תהליך טיפול?",
      answer: "משך התהליך הוא אינדיבידואלי ומשתנה מאדם לאדם. אנחנו מתחילים בפגישת היכרות שבה אנחנו מתאמים ציפיות ובונים את המסלול שמתאים לך."
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-stone-50">
        <div className="absolute inset-0 z-0">
          {heroImg && (
            <Image 
              src={heroImg.imageUrl} 
              alt="מורן פז - פסיכותרפיה וטיפול רגשי בטבעון" 
              fill
              className="object-cover opacity-10 grayscale"
              priority
              data-ai-hint={heroImg.imageHint}
            />
          )}
        </div>
        
        <div ref={heroReveal} className="relative z-10 text-center reveal max-w-5xl">
           <span className="boutique-label block mb-10 stagger-1">מטפלת רגשית בעמק יזרעאל</span>
           <h1 className="boutique-title mb-16 stagger-2">
             להתחבר | לגלות | <span className="italic">להשתנות</span>
           </h1>
           <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-12 stagger-3">
              <Link href="#contact" className="px-16 py-5 border border-accent/20 text-accent text-[11px] uppercase tracking-[0.6em] hover:bg-accent hover:text-white transition-all font-bold flex items-center gap-4 group">
                תאום שיחת היכרות
                <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform" />
              </Link>
           </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <ChevronDown size={24} className="text-accent" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-48 px-8 md:px-24 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <div ref={introReveal} className="lg:col-span-7 text-right reveal">
             <SectionTitle subtitle="About Moran Paz" title="נעים מאוד, מורן פז" />
             <div className="space-y-10 boutique-para max-w-2xl mr-0">
                <p className="stagger-1 text-2xl font-headline text-accent italic">"אנחנו לא רק מה שהיינו – אנחנו גם מה שנהיה."</p>
                <p className="stagger-2">
                  פסיכותרפיסטית הוליסטית ומנחת תהליכים רגשיים – חווייתיים. אני מאמינה שלכולנו יש את הזכות להרגיש חופשיים מבפנים ושהבחירה קיימת לכל אדם בכל מצב.
                </p>
                <p className="stagger-3">
                  בעשור האחרון עברתי מסע אישי מרפא וכיום אני מלווה אנשים למצוא את הדרך שלהם פנימה – לחיבור העמוק והאותנטי עם עצמם.
                </p>
                <Link href="/practice" className="stagger-4 inline-flex items-center gap-4 boutique-label border-b border-primary/20 hover:border-primary transition-all pb-3 group">
                  קראי עוד על התהליך הטיפולי
                  <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform" />
                </Link>
             </div>
          </div>
          
          <div className="lg:col-span-5">
             <div className="image-zoom-container aspect-[4/5] shadow-xl">
                {portraitImg && (
                  <Image 
                    src={portraitImg.imageUrl} 
                    alt="מורן פז - מטפלת רגשית ופסיכותרפיסטית" 
                    fill 
                    className="object-cover"
                    data-ai-hint={portraitImg.imageHint}
                  />
                )}
             </div>
          </div>
        </div>
      </section>

      {/* Quote Section - Light version */}
      <section ref={quoteReveal} className="py-64 bg-stone-50 text-accent px-8 text-center reveal overflow-hidden relative border-y border-border/40">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="boutique-label text-primary block mb-16">The Philosophy</span>
          <h2 className="text-4xl md:text-6xl font-headline font-light italic leading-snug stagger-1">
            "אם לא תכירי את העולם הפנימי שלך – <br/> הוא ינהל אותך ואת תקראי לזה גורל."
          </h2>
          <div className="w-24 h-[1px] bg-primary/40 mx-auto mt-20 stagger-2"></div>
        </div>
      </section>

      {/* Offerings Section */}
      <section ref={offeringsReveal} className="py-48 px-8 md:px-24 reveal">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32">
            <SectionTitle subtitle="Therapy & Workshops" title="מה אני מציעה?" className="flex flex-col items-center" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/40 border border-border/40">
            {[
              { title: "התהליך הטיפולי", link: "/practice", desc: "מסע אישי לריפוי רגשי, חיזוק חוסן ומציאת שקט פנימי - פסיכותרפיה בטבעון." },
              { title: "קורס BeinMe", link: "/workshop", desc: "מרחב קבוצתי-טיפולי לנשים לחיבור אותנטי וכנה עם עצמך." }
            ].map((service, i) => (
              <Link key={i} href={service.link} className={cn("bg-white p-24 hover:bg-stone-50 transition-all group flex flex-col justify-between aspect-square", `stagger-${i+1}`)}>
                <div>
                  <span className="boutique-label block mb-8">0{i+1}</span>
                  <h3 className="text-4xl font-headline text-accent group-hover:italic transition-all duration-1000">{service.title}</h3>
                </div>
                <div className="space-y-10">
                  <p className="text-stone-400 font-light text-lg leading-relaxed">{service.desc}</p>
                  <span className="block w-8 h-[1px] bg-primary group-hover:w-20 transition-all duration-1000"></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      
      <FaqSection items={homeFaqs} />

      {/* CTA Bottom Section - Lighter approach */}
      <section className="py-48 bg-white border-t border-border/40 px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-headline text-accent mb-12">מוכנה להתחיל את המסע פנימה?</h2>
          <p className="boutique-para mb-16">אני כאן ללוות אותך בכל שלב בדרך. בואי נתחיל בשיחה קצרה ללא עלות.</p>
          <Link href="#contact" className="inline-block px-16 py-6 border border-primary text-primary text-[11px] uppercase tracking-[0.7em] hover:bg-primary hover:text-white transition-all font-bold">
            תאום שיחת היכרות
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-48 px-8 bg-stone-50">
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle subtitle="Connect" title="צרו קשר" className="flex flex-col items-center" />
          <p className="boutique-para mb-20">בואי נדבר. אני כאן בשבילך לתאום שיחת הכרות ללא עלות וללא התחייבות לטיפול רגשי בטבעון או בשיחת וידאו.</p>
          <ContactForm />
          
          <div className="mt-24 flex flex-col items-center gap-8">
            <a 
              href="https://wa.me/972500000000" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-accent hover:text-primary transition-colors boutique-label group"
            >
              <MessageCircle size={26} className="group-hover:rotate-12 transition-transform" />
              דברי איתי ב-WHATSAPP
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <FaqAssistant />
      
      {/* Scroll to Top */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-12 right-12 z-[140] bg-white border border-border/60 p-5 rounded-full shadow-lg hover:bg-stone-50 transition-all opacity-40 hover:opacity-100"
        aria-label="Scroll to top"
      >
        <ChevronDown size={24} className="rotate-180" />
      </button>
    </main>
  );
}
