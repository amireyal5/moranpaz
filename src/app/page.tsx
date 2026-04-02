
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ContactForm } from '@/components/shared/ContactForm';
import { FaqAssistant } from '@/components/shared/FaqAssistant';
import { useReveal } from '@/hooks/use-reveal';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ChevronDown, MessageCircle } from 'lucide-react';

export default function Home() {
  const heroReveal = useReveal();
  const introReveal = useReveal();
  const quoteReveal = useReveal();
  const testimonialsReveal = useReveal();
  
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-bg');
  const portraitImg = PlaceHolderImages.find(img => img.id === 'moran-portrait');

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {heroImg && (
            <Image 
              src={heroImg.imageUrl} 
              alt={heroImg.description} 
              fill
              className="object-cover opacity-20 grayscale"
              priority
              data-ai-hint={heroImg.imageHint}
            />
          )}
        </div>
        
        <div ref={heroReveal} className="relative z-10 text-center reveal max-w-5xl">
           <span className="block text-[10px] uppercase tracking-[0.6em] text-primary mb-8 font-bold">מטפלת רגשית בעמק יזרעאל</span>
           <h1 className="text-[10vw] md:text-[6vw] font-headline leading-[1.1] text-accent mb-12">
             להתחבר | לגלות | <span className="italic">להשתנות</span>
           </h1>
           <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-10">
              <Link href="#contact" className="px-12 py-4 border border-accent text-accent text-[11px] uppercase tracking-[0.4em] hover:bg-accent hover:text-white transition-all font-bold">
                צרו קשר
              </Link>
           </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <ChevronDown size={24} className="text-accent" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-40 px-8 md:px-24 bg-white border-y border-border/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <div ref={introReveal} className="lg:col-span-6 text-right reveal">
             <SectionTitle subtitle="About" title="אודות" />
             <div className="space-y-10 text-lg md:text-xl font-light text-stone-600 leading-[1.8] max-w-xl mr-0">
                <p>מורן פז היא פסיכותרפיסטית הוליסטית ומנחת תהליכים רגשיים – חווייתיים. היא מאמינה שלכולנו יש את הזכות להרגיש חופשיים מבפנים ושבחירה קיימת לכל אדם בכל מצב.</p>
                <p>בעשור האחרון עברה מסע אישי מרפא וכיום היא מלווה אנשים למצוא את הדרך שלהם פנימה – לחיבור העמוק והאותנטי עם עצמם – ולחיות את חייהם דרך אותו החיבור.</p>
                <Link href="/practice" className="inline-block text-[10px] uppercase tracking-[0.3em] text-primary font-bold border-b border-primary/20 hover:border-primary transition-all pb-1">
                  קראי עוד על התהליך
                </Link>
             </div>
          </div>
          
          <div className="lg:col-span-6">
             <div className="image-zoom-container aspect-[4/5] overflow-hidden grayscale brightness-95 shadow-2xl rounded-sm">
                {portraitImg && (
                  <Image 
                    src={portraitImg.imageUrl} 
                    alt={portraitImg.description} 
                    fill 
                    className="object-cover"
                    data-ai-hint={portraitImg.imageHint}
                  />
                )}
             </div>
          </div>
        </div>
      </section>

      {/* Quote/Atmosphere Section */}
      <section ref={quoteReveal} className="py-60 bg-accent text-background px-8 text-center reveal">
        <div className="max-w-4xl mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.8em] text-primary/60 mb-12">The Philosophy</span>
          <h2 className="text-4xl md:text-6xl font-headline font-light italic leading-tight">
            "אם לא תכירי את העולם הפנימי שלך – <br/> הוא ינהל אותך ואת תקראי לזה גורל."
          </h2>
          <div className="w-20 h-[1px] bg-primary/30 mx-auto mt-16"></div>
        </div>
      </section>

      {/* Offerings Section */}
      <section className="py-40 px-8 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <SectionTitle subtitle="Services" title="מה אני מציעה?" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1px bg-border/40 border border-border/40">
            {[
              { title: "התהליך הטיפולי", link: "/practice", desc: "מסע אישי לריפוי רגשי, חיזוק חוסן ומציאת שקט פנימי." },
              { title: "קורס BeinMe", link: "/workshop", desc: "מרחב קבוצתי-טיפולי לנשים לחיבור אותנטי וכנה עם עצמך." }
            ].map((service, i) => (
              <Link key={i} href={service.link} className="bg-white p-20 hover:bg-stone-50 transition-all group flex flex-col justify-between aspect-video md:aspect-square">
                <div>
                  <span className="text-[10px] text-primary tracking-widest block mb-4">0{i+1}</span>
                  <h3 className="text-3xl font-headline text-accent group-hover:italic transition-all">{service.title}</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-stone-400 font-light text-base leading-relaxed">{service.desc}</p>
                  <span className="block w-6 h-[1px] bg-primary group-hover:w-12 transition-all"></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsReveal} className="py-40 bg-stone-50 px-8 reveal">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle subtitle="Testimonials" title="לקוחות ממליצים" />
          <div className="grid grid-cols-1 gap-12 mt-16">
            <div className="bg-white p-12 shadow-sm border border-border/40 italic text-stone-600 font-light text-xl leading-relaxed">
              "התהליך עם מורן פתח לי דלת לעצמי שמעולם לא ידעתי שקיימת. השקט שמצאתי מלווה אותי בכל יום."
              <span className="block mt-6 text-sm font-bold uppercase tracking-widest text-primary">— לקוחה, עמק יזרעאל</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40 px-8 bg-white border-t border-border/20">
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle subtitle="Connect" title="צרו קשר" />
          <p className="text-stone-500 font-light mb-16 text-lg">בואי נדבר. אני כאן בשבילך לתאום שיחת הכרות ללא עלות וללא התחייבות.</p>
          <ContactForm />
          
          <div className="mt-20 flex flex-col items-center gap-6">
            <a 
              href="https://wa.me/972500000000" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-accent hover:text-primary transition-colors text-sm tracking-widest font-bold"
            >
              <MessageCircle size={20} />
              WHATSAPP
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <FaqAssistant />
      
      {/* Scroll to Top - Simple floating indicator */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-[150] bg-white border border-border p-4 rounded-full shadow-xl hover:bg-stone-50 transition-all opacity-50 hover:opacity-100"
      >
        <ChevronDown size={20} className="rotate-180" />
      </button>
    </main>
  );
}

