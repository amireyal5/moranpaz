
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ContactForm } from '@/components/shared/ContactForm';
import { useReveal } from '@/hooks/use-reveal';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Laptop, ShieldCheck, Heart, Clock, ArrowLeft, Orbit, Waves, Infinity } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function OnlineTherapyPage() {
  const introReveal = useReveal();
  const benefitsReveal = useReveal();
  const onlineImg = PlaceHolderImages.find(img => img.id === 'online-therapy-bg');
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20הגעתי%20מהאתר%20מעוניין%20בפרטים%20על%20טיפול%20אונליין";

  const benefits = [
    {
      title: "נגישות מלאה מכל מקום",
      desc: "בין אם את גרה בעמק יזרעאל, במרכז או בחו\"ל – הטיפול זמין עבורך ללא צורך בנסיעות.",
      icon: <Orbit size={32} strokeWidth={1} />
    },
    {
      title: "מרחב בטוח ומוכר",
      desc: "היכולת לעבור תהליך רגשי עמוק מהנוחות והביטחון של הבית שלך, בפינה השקטה שלך.",
      icon: <ShieldCheck size={32} strokeWidth={1} />
    },
    {
      title: "גמישות וחיסכון בזמן",
      desc: "שילוב הטיפול בלו\"ז העמוס שלך בקלות, ללא זמן חיפוש חניה או נסיעות בדרכים.",
      icon: <Clock size={32} strokeWidth={1} />
    },
    {
      title: "אותה איכות טיפולית",
      desc: "הקשר הרגשי והכלים החווייתיים עוברים דרך המסך בצורה מלאה, אינטימית ומקצועית.",
      icon: <Infinity size={32} strokeWidth={1} />
    }
  ];

  return (
    <main className="min-h-screen bg-background text-right">
      <Navbar />
      
      {/* Header SEO Optimized Section */}
      <section className="pt-56 pb-32 px-8 md:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div ref={introReveal} className="lg:col-span-7 reveal">
            <span className="boutique-label block mb-6">Online Therapy Services</span>
            <h1 className="boutique-title mb-10">
              טיפול אונליין: <span className="italic">חיבור עמוק</span> מכל מקום
            </h1>
            <p className="boutique-para mb-12">
              פסיכותרפיה הוליסטית אונליין מאפשרת לנו להיפגש בתוך מרחב דיגיטלי בטוח ומכיל. הטיפול מיועד לנשים, מבוגרים ונוער המעוניינים בליווי רגשי מקצועי מהנוחות של הבית, מבלי להתפשר על עומק התהליך.
            </p>
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-6 px-12 py-6 bg-primary text-white boutique-label hover:bg-accent transition-all duration-700 shadow-xl"
            >
              תאום פגישה בווידאו
              <ArrowLeft size={20} />
            </a>
          </div>
          
          <div className="lg:col-span-5">
            <div className="image-zoom-container aspect-square shadow-2xl border-t-8 border-r-8 border-primary/10">
              {onlineImg && (
                <Image 
                  src={onlineImg.imageUrl} 
                  alt="טיפול אונליין - פסיכותרפיה הוליסטית מרחוק עם מורן פז" 
                  fill 
                  className="object-cover grayscale-[0.2]"
                  data-ai-hint={onlineImg.imageHint}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid - Artistic Cards */}
      <section ref={benefitsReveal} className="py-32 bg-stone-50 px-8 md:px-24 reveal">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            subtitle="The Advantages" 
            title="למה כדאי לבחור בטיפול אונליין?" 
            className="flex flex-col items-center text-center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
            {benefits.map((benefit, i) => (
              <div key={i} className={cn("boutique-card group !min-h-[350px]", `stagger-${i+1}`)}>
                <div className="art-icon !top-6 !right-6 opacity-30 text-white animate-art-float">
                  {benefit.icon}
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-headline font-bold mb-6">{benefit.title}</h3>
                  <p className="opacity-80 font-light text-lg leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-32 px-8 md:px-24 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1 text-right">
            <h2 className="text-4xl md:text-6xl font-headline text-accent mb-12">איך זה עובד?</h2>
            <div className="space-y-10 boutique-para">
              <div className="flex items-start gap-6 border-r-4 border-primary/20 pr-6 py-2">
                <span className="text-primary font-bold">01</span>
                <p>שיחת הכרות ראשונית ללא עלות לבדיקת התאמה.</p>
              </div>
              <div className="flex items-start gap-6 border-r-4 border-primary/20 pr-6 py-2">
                <span className="text-primary font-bold">02</span>
                <p>תיאום מועד נוח וקבלת לינק מאובטח לזום.</p>
              </div>
              <div className="flex items-start gap-6 border-r-4 border-primary/20 pr-6 py-2">
                <span className="text-primary font-bold">03</span>
                <p>מפגש טיפולי באורך 50 דקות באווירה שקטה ומכילה.</p>
              </div>
            </div>
            <p className="mt-16 text-xl font-light text-stone-500 italic">
              * כל מה שצריך זה חיבור יציב לאינטרנט ופינה שקטה שבה תרגישי בנוח לדבר.
            </p>
          </div>
          
          <div className="order-1 lg:order-2">
             <div className="flex justify-center animate-art-float">
                <Laptop size={300} strokeWidth={0.3} className="text-primary/10" />
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-32 bg-stone-50 px-8">
        <div className="max-w-4xl mx-auto">
          <SectionTitle subtitle="Connect Online" title="מתחילה את המסע מהבית" className="flex flex-col items-center" />
          <p className="text-center boutique-para mb-16">
            אני מזמינה אותך ליצור קשר לשיחת ייעוץ ראשונית ללא עלות על טיפול רגשי אונליין.
          </p>
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
