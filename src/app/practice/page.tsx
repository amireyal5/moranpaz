"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { useReveal } from '@/hooks/use-reveal';
import { Orbit, Waves, Infinity, Compass, Heart, Sparkles } from 'lucide-react';
import { ContactForm } from '@/components/shared/ContactForm';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

export default function PracticePage() {
  const introReveal = useReveal();
  const holisticReveal = useReveal();
  const stepsReveal = useReveal();
  const practiceInviteReveal = useReveal();
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-practice');
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20אשמח%20לפרטים%20על%20התהליך%20הטיפולי";

  const steps = [
    { 
      id: "01", 
      title: "פגישת הכרות", 
      desc: "נפגש לשיחה ראשונית להכרות ותיאום ציפיות. זהו הצעד הראשון לגילוי המפה הפנימית שלך." 
    },
    { 
      id: "02", 
      title: "מרחב בטוח", 
      desc: "בניית אמון עמוק ומרחב ללא שיפוטיות שבו אפשר לפגוש את כל החלקים שבנו." 
    },
    {
      id: "03",
      title: "עבודה חווייתית",
      desc: "שימוש בכלים כמו מיינדפולנס, עבודת צללים, דמיון מודרך וילד/ה פנימית לחיבור גוף-נפש-רוח."
    },
    {
      id: "04",
      title: "הטמעה ושינוי",
      desc: "הקלה במתח וחרדה, הגברת ערך עצמי וביטוי אותנטי כבימאי/ת של חייך."
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
           <span className="boutique-label text-white/80 mb-8 block">BeinMe Approach</span>
           <h1 className="text-8xl md:text-[140px] font-handwriting text-white mb-8 font-bold">המסע לריפוי רגשי</h1>
           <p className="text-2xl md:text-4xl font-headline italic text-white/90 leading-relaxed font-light">לגלות את מפת הדרכים הפנימית שלך</p>
        </div>
      </section>

      <section className="py-32 md:py-48 px-8 md:px-24">
        <div className="max-w-6xl mx-auto">
          <div ref={introReveal} className="reveal mb-32">
            <span className="boutique-label text-primary mb-8 block">Holistic Path</span>
            <p className="max-w-4xl boutique-para text-3xl leading-relaxed">
              פסיכותרפיה הוליסטית היא הזמנה להתבוננות פנימה, שבה נוכל יחד לשפוך את אור המודעות על כל פינה ולמצוא את הסמכות הפנימית שלך.
            </p>
          </div>

          <div ref={holisticReveal} className="reveal grid grid-cols-1 lg:grid-cols-2 gap-24 mb-48 bg-white p-16 md:p-32 shadow-2xl border border-stone-100">
            <div>
              <h2 className="text-4xl md:text-5xl font-headline text-accent mb-12 font-bold">הגישה ההוליסטית</h2>
              <div className="space-y-10 boutique-para !text-xl leading-relaxed text-stone-600">
                <p>בניגוד לגישות מסורתיות שמתמקדות רק בסימפטום, גישת BeinMe רואה בך מערכת שלמה של <strong>גוף, נפש ורוח</strong>.</p>
                <p>השילוב בין מיינדפולנס, עבודת צללים ופוקוסינג מאפשר לנו להכיר את החלקים שבנו, לקבל אותם, ומשם ליצור שינוי אמיתי ונוכח.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {[
                { title: "נפש", icon: <Heart /> },
                { title: "גוף", icon: <Orbit /> },
                { title: "רוח", icon: <Sparkles /> },
                { title: "בחירה", icon: <Compass /> }
              ].map((issue, i) => (
                <div key={i} className="bg-stone-50 p-10 flex flex-col items-center justify-center text-center border border-stone-100 hover:bg-white transition-all duration-700 hover:shadow-2xl hover:border-primary/20 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-700"></div>
                  <span className="text-2xl font-headline font-bold text-primary block mb-8 relative z-10">{issue.title}</span>
                  <div className="text-primary/60 group-hover:text-primary group-hover:scale-110 transition-all duration-700 flex justify-center relative z-10">
                    {React.cloneElement(issue.icon as React.ReactElement, { size: 56, strokeWidth: 0.2 })}
                  </div>
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
                <h3 className="text-6xl md:text-8xl font-handwriting">מפת הדרכים שלך מחכה לך</h3>
                <p className="text-2xl md:text-3xl font-light opacity-90 leading-relaxed max-w-3xl italic">
                  "בכל טיפת חושך אפשר לשפוך את אור המודעות ולהאיר את עצמנו. בואי נתחיל ללכת יחד."
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

      <Footer />
    </main>
  );
}
