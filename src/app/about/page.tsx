
"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ContactForm } from '@/components/shared/ContactForm';
import { useReveal } from '@/hooks/use-reveal';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Orbit, Waves, Infinity, Compass, ArrowLeft, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AboutPage() {
  const introReveal = useReveal();
  const uniquenessReveal = useReveal();
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-about');
  const portraitImg = PlaceHolderImages.find(img => img.id === 'moran-portrait');
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20קראתי%20עליך%20באתר%20ואשמח%20לפרטים%20על%20תהליך%20טיפולי";

  const uniquenessPoints = [
    {
      title: "חיבור הוליסטי עמוק",
      icon: <Orbit size={32} strokeWidth={0.5} />,
      desc: "אני מאמינה שהאדם הוא שלם. הגישה שלי משלבת שיחה עם עבודה רגשית חווייתית שנוגעת בגוף ובנשמה."
    },
    {
      title: "כלים מהעולם החדש",
      icon: <Infinity size={32} strokeWidth={0.5} />,
      desc: "עבודת צללים, ילדה פנימית, פוקוסינג ומיינדפולנס – כלים המאפשרים גישה ישירה לרובד הרגשי העמוק."
    },
    {
      title: "מרחב של שקט",
      icon: <Waves size={32} strokeWidth={0.5} />,
      desc: "הקליניקה ממוקמת בלב הירוק של טבעון, מרחב שמאפשר ניתוק מהרעש החיצוני וחיבור שקט לעצמך."
    },
    {
      title: "ליווי מקצועי מוסמך",
      icon: <Compass size={32} strokeWidth={0.5} />,
      desc: "שילוב של תואר שני (MA) בייעוץ ארגוני מאוניברסיטת חיפה עם הכשרה מעמיקה בפסיכותרפיה הוליסטית."
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
              alt="About Moran Paz" 
              fill 
              className="object-cover opacity-50 brightness-[0.8]"
              priority
              data-ai-hint={heroImg.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background"></div>
        </div>
        <div className="relative z-10 text-center">
           <span className="boutique-label text-white/80 mb-8 block">About the practice</span>
           <h1 className="text-8xl md:text-[140px] font-handwriting text-white mb-8 font-bold">נעים מאוד, מורן פז</h1>
           <p className="text-2xl md:text-4xl font-headline italic text-white/90 leading-relaxed font-light">למצוא את הדרך חזרה אל הבית הפנימי שלך</p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-32 px-8 md:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
               <div className="image-zoom-container aspect-[3/4] shadow-2xl rounded-sm overflow-hidden border-8 border-stone-50">
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

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-12">
               <div ref={introReveal} className="relative reveal pr-12 py-4">
                  <Quote className="absolute -top-10 -right-4 text-primary/5 w-48 h-48 rotate-180 pointer-events-none" />
                  <div className="border-r-[3px] border-primary/20 pr-10 py-1">
                    <p className="text-3xl md:text-5xl font-headline text-accent italic font-light leading-snug relative z-10">
                      אנחנו לא רק מה שהיינו – אנחנו גם מה שנהיה.
                    </p>
                  </div>
               </div>
               <div className="space-y-10 boutique-para text-stone-600 leading-relaxed">
                  <p>
                    פסיכותרפיסטית הוליסטית ומנחת תהליכים רגשיים – חווייתיים. 
                    אני מאמינה שלכולנו יש את הזכות להרגיש חופשיים מבפנים ושהבחירה קיימת לכל אדם בכל מצב. 
                  </p>
                  <p>
                    בוגרת תואר שני בייעוץ ארגוני מאוניברסיטת חיפה ובוגרת מסלול פסיכותרפיה הוליסטית. 
                    לכל אדם יש את הקצב והמסע שלו ואני כאן ללוות מתוך כבוד ואמונה באדם ובדרך.
                  </p>
                  <p className="font-medium text-accent border-r-2 border-primary/10 pr-6 py-2">
                    התהליך מביא לפחות חרדות וסטרס, שלווה פנימית, חוסן נפשי ומנטלי, וביטוי אותנטי.
                  </p>
               </div>
               
               <div className="pt-12">
                  <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-8 px-16 py-4 bg-primary text-white boutique-label hover:bg-accent transition-all duration-700 shadow-2xl rounded-sm !opacity-100"
                  >
                    תאום שיחת היכרות
                    <ArrowLeft size={16} />
                  </a>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section ref={uniquenessReveal} className="py-32 md:py-56 px-8 md:px-24 bg-stone-50 reveal">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="My Philosophy" title="מה מייחד את הגישה שלי?" className="flex flex-col items-center text-center" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-24 mt-32">
            {uniquenessPoints.map((point, i) => (
              <div key={i} className={cn("flex flex-col items-start gap-8 group", `stagger-${i+1}`)}>
                <div className="text-primary group-hover:scale-110 transition-transform duration-700">
                  {point.icon}
                </div>
                <div className="space-y-6">
                  <h4 className="text-3xl font-headline font-bold text-accent">{point.title}</h4>
                  <p className="text-xl font-light text-stone-500 leading-relaxed">{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-white px-8">
        <div className="max-w-4xl mx-auto">
          <SectionTitle subtitle="Connect" title="מוזמנת ליצור קשר" className="flex flex-col items-center text-center" />
          <p className="text-center boutique-para mb-20 leading-relaxed">אני כאן בשבילך לכל שאלה או לתיאום פגישה ראשונית.</p>
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
