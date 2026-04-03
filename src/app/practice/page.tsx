
"use client";

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { FaqSection } from '@/components/shared/FaqSection';
import { useReveal } from '@/hooks/use-reveal';
import { CheckCircle2, ArrowLeft, Orbit, Waves, Infinity, Compass } from 'lucide-react';
import { ContactForm } from '@/components/shared/ContactForm';
import { cn } from '@/lib/utils';

export default function PracticePage() {
  const introReveal = useReveal();
  const holisticReveal = useReveal();
  const stepsReveal = useReveal();
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
    <main className="min-h-screen bg-background text-right">
      <Navbar />
      
      <section className="pt-48 pb-32 px-8 md:px-24">
        <div className="max-w-6xl mx-auto">
          <div ref={introReveal} className="reveal mb-24">
            <span className="boutique-label text-primary mb-6 block">Psychotherapy Process</span>
            <h1 className="text-6xl md:text-9xl font-['Amatic_SC'] font-bold text-foreground leading-none mb-10">
              המסע לריפוי רגשי
            </h1>
            <p className="max-w-3xl boutique-para">
              פסיכותרפיה הוליסטית היא הזמנה להתבוננות פנימה, במרחב בטוח ומכיל, שבו נוכל יחד לגלות את הכוחות הטמונים בך.
            </p>
            <div className="mt-12">
               <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 px-12 py-3.5 bg-primary text-white boutique-label !opacity-100 hover:bg-accent transition-all rounded-sm shadow-xl"
              >
                תאום שיחת היכרות
                <ArrowLeft size={16} />
              </a>
            </div>
          </div>

          <div ref={holisticReveal} className="reveal grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 bg-white p-12 md:p-24 border border-stone-100 shadow-sm">
            <div>
              <h2 className="text-3xl md:text-4xl font-headline text-accent mb-8">מהי הגישה ההוליסטית?</h2>
              <div className="space-y-6 boutique-para !text-lg">
                <p>בניגוד לגישות מסורתיות שמתמקדות רק בסימפטום, הגישה ההוליסטית רואה בך מערכת שלמה. אנחנו לא רק מדברים על הבעיה – אנחנו מרגישים אותה בגוף.</p>
                <p>השילוב בין <strong>מיינדפולנס, עבודת צללים ופוקוסינג</strong> מאפשר לנו להגיע לריפוי אמיתי.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "חרדות", icon: <Orbit /> },
                { title: "תקיעות", icon: <Infinity /> },
                { title: "יחסים", icon: <Waves /> },
                { title: "דימוי", icon: <Compass /> }
              ].map((issue, i) => (
                <div key={i} className="bg-stone-50 p-6 text-center border border-stone-100 hover:bg-white transition-all">
                  <span className="text-xl font-headline font-bold text-primary block mb-2">{issue.title}</span>
                  <div className="text-stone-300 flex justify-center">{React.cloneElement(issue.icon as React.ReactElement, { size: 24, strokeWidth: 1 })}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div ref={stepsReveal} className="reveal max-w-4xl mx-auto space-y-8">
            <SectionTitle subtitle="Step by Step" title="שלבי התהליך" className="flex flex-col items-center text-center" />
            {steps.map((step, i) => (
              <div key={step.id} className={cn("p-10 bg-white border border-stone-100 hover:border-primary/20 transition-all flex items-start gap-8 stagger", `stagger-${i+1}`)}>
                <span className="text-primary font-bold text-2xl border-b-2 border-primary/20">{step.id}</span>
                <div>
                  <h4 className="text-2xl font-headline font-bold text-accent mb-4">{step.title}</h4>
                  <p className="text-lg font-light text-stone-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={[]} title="שאלות נפוצות" subtitle="FAQ" />

      <section className="py-32 bg-stone-50 px-8" id="contact">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle subtitle="Connect" title="מוכנה להתחיל?" className="flex flex-col items-center" />
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
