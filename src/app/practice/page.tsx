"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { useReveal } from '@/hooks/use-reveal';
import { Orbit, Waves, Infinity, Compass } from 'lucide-react';
import { ContactForm } from '@/components/shared/ContactForm';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

export default function PracticePage() {
  const introReveal = useReveal();
  const holisticReveal = useReveal();
  const stepsReveal = useReveal();
  const practiceInviteReveal = useReveal();
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-practice');
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20אשמח%20לפרטים%20על%20התהליך%20הטיפול%20ההוליסטי";

  const steps = [
    { 
      id: "01", 
      title: "פגישת הכרות", 
      desc: "נפגש לשיחה ראשונית (בקליניקה או בזום), נכיר אותך ואת מה שמעסיק אותך. נתאם ציפיות." 
    },
    { 
      id: "02", 
      title: "מרחב בטוח", 
      desc: "בפגישות הראשונות נעמיק בבניית אמון. זהו מרחב שבו אפשר להביא את עצמך כפי שאת/ה – בלי מסכות." 
    },
    {
      id: "03",
      title: "עבודה חווייתית",
      desc: "נשתמש בכלים מגוונים כמו מיינדפולנס, עבודת צללים, דמיון מודרך וילד/ה פנימית."
    },
    {
      id: "04",
      title: "הטמעה ושינוי",
      desc: "בסיום התהליך תוכל/י לחוות הקלה בתחושות מתח וחרדה ולחיות כבימאי/ת של חייך."
    }
  ];

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          {heroImg && (
            <Image 
              src={heroImg.imageUrl} 
              alt="Therapy Practice" 
              fill 
              className="object-cover opacity-60 brightness-[0.7]"
              priority
              data-ai-hint={heroImg.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background"></div>
        </div>
        <div className="relative z-10 text-center">
           <span className="boutique-label text-white/80 mb-8 block">Holistic Therapy</span>
           <h1 className="text-8xl md:text-[140px] font-handwriting text-white mb-8 font-bold">המסע לריפוי רגשי</h1>
           <p className="text-2xl md:text-4xl font-headline italic text-white/90 leading-relaxed font-light">לגלות את הכוחות הטמונים בך במרחב בטוח ומכיל</p>
        </div>
      </section>

      <section className="py-32 md:py-48 px-8 md:px-24">
        <div className="max-w-6xl mx-auto">
          <div ref={introReveal} className="reveal mb-32">
            <span className="boutique-label text-primary mb-8 block">Process Overview</span>
            <p className="max-w-4xl boutique-para text-3xl leading-relaxed">
              פסיכותרפיה הוליסטית היא הזמנה להתבוננות פנימה, שבה נוכל יחד לגלות את המפה הרגשית שלך וליצור שינוי עמוק ויציב.
            </p>
            <div className="mt-16">
               <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-16 py-4 bg-primary text-white boutique-label !opacity-100 hover:bg-accent transition-all rounded-sm shadow-2xl min-w-[220px] justify-center"
              >
                תאום שיחת היכרות
              </a>
            </div>
          </div>

          <div ref={holisticReveal} className="reveal grid grid-cols-1 lg:grid-cols-2 gap-24 mb-48 bg-white p-16 md:p-32 shadow-sm border border-stone-100">
            <div>
              <h2 className="text-4xl md:text-5xl font-headline text-accent mb-12 font-bold">הגישה ההוליסטית</h2>
              <div className="space-y-10 boutique-para !text-xl leading-relaxed">
                <p>בניגוד לגישות מסורתיות שמתמקדות רק בסימפטום, הגישה ההוליסטית רואה בך מערכת שלמה של גוף, נפש ורוח.</p>
                <p>השילוב בין <strong>מיינדפולנס, עבודת צללים ופוקוסינג</strong> מאפשר לנו להגיע לשורש הדברים וליצור ריפוי אמיתי שנובע מבפנים.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {[
                { title: "חרדות", icon: <Orbit /> },
                { title: "תקיעות", icon: <Infinity /> },
                { title: "יחסים", icon: <Waves /> },
                { title: "דימוי", icon: <Compass /> }
              ].map((issue, i) => (
                <div key={i} className="bg-stone-50 p-10 text-center border border-stone-100 hover:bg-white transition-all duration-700 hover:shadow-xl">
                  <span className="text-2xl font-headline font-bold text-primary block mb-6">{issue.title}</span>
                  <div className="text-primary/20 flex justify-center">{React.cloneElement(issue.icon as React.ReactElement, { size: 40, strokeWidth: 0.3 })}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Practice Personal CTA */}
          <div ref={practiceInviteReveal} className="reveal bg-accent p-12 md:p-24 mb-48 text-white relative overflow-hidden shadow-2xl">
             <div className="absolute -top-24 -right-24 opacity-5">
                <Orbit size={400} />
             </div>
             <div className="relative z-10 space-y-12">
                <h3 className="text-6xl md:text-8xl font-handwriting">מפת הדרכים שלך כבר כאן</h3>
                <p className="text-2xl md:text-3xl font-light opacity-90 leading-relaxed max-w-3xl italic">
                  "כל מסע גדול מתחיל בצעד אחד קטן של אומץ. אני כאן כדי להחזיק עבורך את המרחב וללכת לצידך."
                </p>
                <div className="pt-6">
                   <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-16 py-5 bg-primary text-white boutique-label !text-[13px] hover:bg-white hover:text-accent transition-all duration-700 shadow-2xl rounded-sm !opacity-100 min-w-[280px] justify-center"
                  >
                    בואי נתחיל את המסע שלך
                  </a>
                </div>
             </div>
          </div>
          
          <div ref={stepsReveal} className="reveal max-w-4xl mx-auto space-y-12">
            <SectionTitle subtitle="The Journey" title="שלבי התהליך הטיפולי" className="flex flex-col items-center text-center" />
            <div className="space-y-8 mt-20">
              {steps.map((step, i) => (
                <div key={step.id} className={cn("p-12 bg-white border border-stone-100 hover:border-primary/20 transition-all flex items-start gap-12 stagger", `stagger-${i+1}`)}>
                  <span className="text-primary font-bold text-3xl border-b-2 border-primary/20">{step.id}</span>
                  <div>
                    <h4 className="text-3xl font-headline font-bold text-accent mb-6">{step.title}</h4>
                    <p className="text-xl font-light text-stone-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-stone-50 px-8" id="contact">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle subtitle="Connect" title="מוכנה להתחיל את המסע?" className="flex flex-col items-center" />
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
