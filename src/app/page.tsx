
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
import { ChevronDown, MessageCircle, ArrowLeft, Users, User, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
  const heroReveal = useReveal();
  const offeringsReveal = useReveal();
  const audienceReveal = useReveal();
  
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-bg');

  const homeFaqs = [
    {
      question: "למי מתאים הטיפול הרגשי?",
      answer: "הטיפול מתאים למי שחווה עומס רגשי, חרדה, תקיעות בחיים או רצון עמוק לחיבור אותנטי לעצמו."
    },
    {
      question: "איפה מתקיימות הפגישות?",
      answer: "הפגישות מתקיימות בקליניקה בטבעון או בשיחות וידאו (זום) מכל מקום."
    }
  ];

  const audiences = [
    {
      title: "מבוגרים",
      icon: <User size={32} />,
      link: "/audience/adults",
      desc: "ליווי רגשי בצמתי חיים, התמודדות עם חרדות ומציאת עוגן פנימי."
    },
    {
      title: "נוער",
      icon: <Users size={32} />,
      link: "/audience/youth",
      desc: "מרחב בטוח ומכיל לפיתוח חוסן רגשי, ביטוי עצמי ועיבוד חוויות בגובה העיניים."
    },
    {
      title: "נשים",
      icon: <Heart size={32} />,
      link: "/audience/women",
      desc: "חיבור עמוק לעולם הפנימי, שחרור עומס רגשי ומציאת הקול האותנטי שלך."
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          {heroImg && (
            <Image 
              src={heroImg.imageUrl} 
              alt="מורן פז - פסיכותרפיה בטבעון" 
              fill
              className="object-cover opacity-60 grayscale-[0.1]"
              priority
              data-ai-hint={heroImg.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-background"></div>
        </div>
        
        <div ref={heroReveal} className="relative z-10 text-center reveal max-w-6xl">
           <span className="boutique-label block mb-8 md:mb-12">מטפלת רגשית בעמק יזרעאל</span>
           <h1 className="boutique-title mb-12 md:mb-20">
             להתחבר | לגלות | <span className="italic">להשתנות</span>
           </h1>
           <Link href="#contact" className="inline-flex px-12 md:px-24 py-6 md:py-10 bg-primary text-white text-lg md:text-[18px] uppercase tracking-[0.4em] md:tracking-[0.6em] hover:bg-accent transition-all duration-700 font-bold items-center gap-6 shadow-2xl">
              תאום שיחת היכרות
              <ArrowLeft size={22} />
           </Link>
        </div>
        
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* Audience Section */}
      <section ref={audienceReveal} className="py-32 md:py-48 px-8 md:px-24 bg-stone-50 reveal">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <SectionTitle subtitle="Who I work with" title="עם מי אני עובדת?" className="flex flex-col items-center" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {audiences.map((item, i) => (
              <Link 
                key={i} 
                href={item.link}
                className={cn(
                  "bg-white p-12 border border-border/20 shadow-sm hover:shadow-xl transition-all duration-700 group flex flex-col items-center text-center space-y-8",
                  `stagger-${i+1}`
                )}
              >
                <div className="text-primary transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">
                  {item.icon}
                </div>
                <h3 className="text-3xl font-headline font-bold text-accent group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-xl font-light text-stone-500 leading-relaxed">{item.desc}</p>
                <span className="boutique-label text-[12px] opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all inline-flex items-center gap-2">
                  למידע נוסף <ArrowLeft size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section ref={offeringsReveal} className="py-32 md:py-56 px-8 md:px-24 reveal bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <SectionTitle subtitle="Therapy & Workshops" title="מה אני מציעה?" className="flex flex-col items-center" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/20 border border-border/20 shadow-sm">
            {[
              { title: "התהליך הטיפולי", link: "/practice", desc: "מסע אישי לריפוי רגשי, חיזוק חוסן ומציאת שקט פנימי - פסיכותרפיה בטבעון." },
              { title: "קורס BeinMe", link: "/workshop", desc: "מרחב קבוצתי-טיפולי לנשים לחיבור אותנטי וכנה עם עצמך." }
            ].map((service, i) => (
              <Link key={i} href={service.link} className={cn("bg-white p-12 md:p-20 hover:bg-stone-50 transition-all group flex flex-col justify-between h-auto min-h-[400px]", `stagger-${i+1}`)}>
                <div>
                  <span className="boutique-label block mb-8">0{i+1}</span>
                  <h3 className="text-4xl md:text-6xl font-headline text-foreground group-hover:italic transition-all duration-700">{service.title}</h3>
                </div>
                <div className="mt-8">
                  <p className="text-stone-500 font-light text-xl md:text-2xl leading-relaxed mb-8">{service.desc}</p>
                  <span className="block w-12 h-[1px] bg-primary group-hover:w-24 transition-all duration-700"></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      
      <FaqSection items={homeFaqs} />

      {/* Contact Section */}
      <section id="contact" className="py-32 md:py-56 px-8 bg-stone-50 border-t border-border/20">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle subtitle="Connect" title="צרו קשר" className="flex flex-col items-center" />
          <p className="boutique-para mb-20 text-center">אני כאן בשבילך לתאום שיחת הכרות ללא עלות עבור טיפול רגשי בטבעון או בשיחת וידאו.</p>
          <ContactForm />
          
          <div className="mt-24 flex flex-col items-center">
            <a 
              href="https://wa.me/972500000000" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-6 text-foreground hover:text-primary transition-colors boutique-label group text-xl"
            >
              <MessageCircle size={40} className="group-hover:rotate-12 transition-transform text-primary" />
              דברי איתי ב-WHATSAPP
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <FaqAssistant />
    </main>
  );
}
