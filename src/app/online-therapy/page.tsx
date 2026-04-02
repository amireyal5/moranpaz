
"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ContactForm } from '@/components/shared/ContactForm';
import { useReveal } from '@/hooks/use-reveal';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Laptop, ShieldCheck, Clock, ArrowLeft, Globe, Infinity } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * @fileOverview Landing page for Online Therapy services.
 * Optimized for SEO: "Online therapy in Hebrew", "Israelis abroad therapy".
 */

export default function OnlineTherapyPage() {
  const introReveal = useReveal();
  const benefitsReveal = useReveal();
  const onlineImg = PlaceHolderImages.find(img => img.id === 'online-therapy-bg');
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20הגעתי%20מהאתר%20אשמח%20לפרטים%20על%20טיפול%20אונליין%20לישראלים%20בחו%22ל";

  const benefits = [
    {
      title: "לישראלים בחו\"ל",
      desc: "טיפול רגשי עמוק ומקצועי בשפת האם שלך, המגשר על פערי תרבות ומרחק פיזי עבור רילוקיישניסטים.",
      icon: <Globe size={32} strokeWidth={1} />
    },
    {
      title: "מרחב בטוח מהבית",
      desc: "היכולת לעבור תהליך רגשי עמוק מהנוחות והביטחון של הבית שלך, בפינה השקטה שלך.",
      icon: <ShieldCheck size={32} strokeWidth={1} />
    },
    {
      title: "גמישות גלובלית",
      desc: "שילוב הטיפול בלו\"ז שלך, ללא תלות באזורי זמן או צורך בנסיעות מעייפות.",
      icon: <Clock size={32} strokeWidth={1} />
    },
    {
      title: "פסיכותרפיה הוליסטית",
      desc: "הקשר הרגשי והכלים החווייתיים עוברים דרך המסך בצורה מלאה, אינטימית ומקצועית.",
      icon: <Infinity size={32} strokeWidth={1} />
    }
  ];

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden">
      <Navbar />
      
      <section className="pt-56 pb-32 px-8 md:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div ref={introReveal} className="lg:col-span-7 reveal">
            <span className="boutique-label block mb-6 text-primary">Global Online Therapy</span>
            <h1 className="boutique-title mb-10">
              טיפול רגשי אונליין: <span className="italic">בית פנימי</span> מכל מקום בעולם
            </h1>
            <div className="boutique-para mb-12 space-y-6">
              <p>
                פסיכותרפיה הוליסטית אונליין מאפשרת לנו להיפגש בתוך מרחב דיגיטלי בטוח ומכיל. הטיפול מיועד לנשים, מבוגרים ונוער המעוניינים בליווי רגשי מקצועי מהנוחות של הבית.
              </p>
              <h2 className="text-2xl md:text-4xl font-headline text-accent font-bold">טיפול בעברית לישראלים בחו&quot;ל</h2>
              <p>
                אני מלווה ישראלים ורילוקיישניסטים ברחבי העולם בתהליכי עומק רגשיים בשפת האם, תוך הבנה עמוקה של אתגרי המרחק, הזהות והבדידות במדינות זרות.
              </p>
            </div>
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-6 px-12 py-5 bg-primary !text-white boutique-label hover:bg-accent transition-all duration-700 shadow-xl rounded-sm"
            >
              תאום פגישת היכרות אונליין
              <ArrowLeft size={18} />
            </a>
          </div>
          
          <div className="lg:col-span-5">
            <div className="image-zoom-container aspect-square shadow-2xl border-t-8 border-r-8 border-primary/10">
              {onlineImg && (
                <Image 
                  src={onlineImg.imageUrl} 
                  alt="טיפול רגשי אונליין בעברית לישראלים בחו ל עם מורן פז" 
                  fill 
                  className="object-cover grayscale-[0.2]"
                  data-ai-hint={onlineImg.imageHint}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section ref={benefitsReveal} className="py-32 bg-stone-50 px-8 md:px-24 reveal">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            subtitle="The Advantages" 
            title="למה לבחור בטיפול אונליין?" 
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

      <section className="py-32 px-8 md:px-24 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1 text-right">
            <h2 className="text-4xl md:text-6xl font-headline text-accent mb-12 italic">איך מתחילים?</h2>
            <div className="space-y-10 boutique-para">
              <div className="flex items-start gap-6 border-r-4 border-primary/20 pr-6 py-2">
                <span className="text-primary font-bold">01</span>
                <div>
                  <h3 className="text-xl font-bold">שיחת הכרות</h3>
                  <p className="text-lg opacity-70">שיחה ראשונית ללא עלות לבדיקת התאמה והבנת הצרכים שלך.</p>
                </div>
              </div>
              <div className="flex items-start gap-6 border-r-4 border-primary/20 pr-6 py-2">
                <span className="text-primary font-bold">02</span>
                <div>
                  <h3 className="text-xl font-bold">תיאום זמן</h3>
                  <p className="text-lg opacity-70">תיאום מועד נוח וקבלת לינק מאובטח לזום.</p>
                </div>
              </div>
              <div className="flex items-start gap-6 border-r-4 border-primary/20 pr-6 py-2">
                <span className="text-primary font-bold">03</span>
                <div>
                  <h3 className="text-xl font-bold">התהליך מתחיל</h3>
                  <p className="text-lg opacity-70">מפגש טיפולי באורך 50 דקות באווירה שקטה ומכילה.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
             <div className="flex justify-center animate-art-float">
                <Laptop size={280} strokeWidth={0.2} className="text-primary/15" />
             </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 bg-stone-50 px-8">
        <div className="max-w-4xl mx-auto">
          <SectionTitle subtitle="Connect Worldwide" title="מתחילים את המסע - מכל מקום" className="flex flex-col items-center" />
          <p className="text-center boutique-para mb-16">
            אני מזמינה אותך ליצור קשר לשיחת ייעוץ ראשונית ללא עלות על טיפול רגשי אונליין, בישראל או בחו&quot;ל.
          </p>
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
