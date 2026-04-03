
"use client";

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ContactForm } from '@/components/shared/ContactForm';
import { useReveal } from '@/hooks/use-reveal';
import { Sparkles, Heart, Quote } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function WomenPage() {
  const contentReveal = useReveal();
  const personalAppealReveal = useReveal();
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-women') || PlaceHolderImages.find(img => img.id === 'hero-about-desktop');
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20אשמח%20לפרטים%20על%20ליווי%20רגשי%20לנשים";

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          {heroImg && (
            <Image 
              src={heroImg.imageUrl} 
              alt="Therapy for Women" 
              fill 
              className="object-cover opacity-60 brightness-[0.7]"
              priority
              data-ai-hint={heroImg.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background"></div>
        </div>
        <div className="relative z-10 text-center">
           <span className="boutique-label text-white/80 mb-8 block uppercase tracking-[0.4em]">Women Empowerment</span>
           <h1 className="text-7xl md:text-9xl font-handwriting text-white mb-8 font-bold">ליווי רגשי לנשים</h1>
           <p className="text-2xl md:text-4xl font-headline italic text-white/90 leading-relaxed font-light">לחזור אל הבית הפנימי שלך</p>
        </div>
      </section>

      <section className="pt-32 pb-32 px-8 md:px-24">
        <div className="max-w-5xl mx-auto">
          <SectionTitle subtitle="Audience" title="טיפול וליווי לנשים" />
          
          <div ref={contentReveal} className="reveal space-y-12">
            <h3 className="text-4xl md:text-6xl font-headline italic text-accent mb-12 leading-tight">
              הקול שלך ראוי להישמע
            </h3>
            
            <div className="boutique-para space-y-8 text-stone-600">
              <p>
                כאישה, את ודאי חווה עומס רגשי ופיזי כבד, כשאת מתמרנת בין שלל תפקידים ומנסה להחזיק הכל. בתוך המרוץ הזה, הקול הפנימי שלך לפעמים נחלש או נעלם לגמרי.
              </p>
              <p>
                הטיפול והליווי לנשים בקליניקה שלי הוא הזמנה עבורך לעצור. להקשיב למה שמבקש ביטוי בתוכך, לזהות את החלקים השונים בך – המבקרים, המפוחדים וגם העוצמתיים – ולחיות מתוך חיבור אותנטי וכנה לעצמך.
              </p>
            </div>

            <div className="relative pr-12 py-12 my-16">
              <Quote className="absolute -top-10 -right-4 text-primary/5 w-48 h-48 rotate-180 pointer-events-none" />
              <div className="border-r-[3px] border-primary/20 pr-10 py-1">
                <p className="text-3xl md:text-5xl font-headline text-accent italic font-light leading-snug relative z-10">
                  הרגשות שלך הם המצפן ולכל אחת מאיתנו יש את מפת הדרכים הפנימית שלה לחייה.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/20 border border-border/20 shadow-xl mt-16">
              {[
                { title: "הקשבה פנימית", desc: "למידה מחדש איך לסמוך על האינטואיציה ועל הגוף שלך." },
                { title: "שחרור שליטה", desc: "כלים להרפיה, הישענות ומציאת שקט בתוך אי הוודאות." },
                { title: "עבודת ילדה פנימית", desc: "ריפוי פצעי עבר ומפגש עם הילדה שהיינו כדי לצמוח היום." },
                { title: "ביטוי אותנטי", desc: "העזות להגיד את האמת שלך ולחיות לפיה ללא פחד." }
              ].map((item, i) => (
                <div key={i} className="bg-white p-12 space-y-6">
                  <div className="flex items-center gap-4 text-primary">
                    <Sparkles size={24} />
                    <h4 className="text-2xl font-headline font-bold text-accent">{item.title}</h4>
                  </div>
                  <p className="text-xl font-light text-stone-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Women Personal Appeal */}
      <section ref={personalAppealReveal} className="py-24 bg-stone-50 reveal border-y border-stone-200/50">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <h3 className="text-6xl md:text-8xl font-handwriting text-accent leading-none">הגיע הזמן לפגוש את עצמך</h3>
          <p className="boutique-para text-2xl font-light leading-relaxed">
            אני כאן כדי לספק לך את המקום בו תוכלי להניח הכל ולחזור לעצמך. פני אליי לשיחת היכרות אישית ונתחיל את המסע שלך פנימה.
          </p>
          <div className="pt-8">
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-16 py-6 bg-accent text-white boutique-label !text-[13px] hover:bg-primary transition-all duration-700 shadow-2xl rounded-sm !opacity-100 min-w-[280px] justify-center"
            >
              תאום פגישת היכרות לנשים
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
