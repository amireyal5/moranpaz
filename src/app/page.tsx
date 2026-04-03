
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ContactForm } from '@/components/shared/ContactForm';
import { TestimonialsSection } from '@/components/shared/TestimonialsSection';
import { FaqSection } from '@/components/shared/FaqSection';
import { useReveal } from '@/hooks/use-reveal';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MessageCircle, ArrowLeft, Eye, Orbit, Waves, Infinity, Compass, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
  const heroReveal = useReveal();
  const introReveal = useReveal();
  const uniquenessReveal = useReveal();
  const audienceReveal = useReveal();
  const tourReveal = useReveal();
  const contactReveal = useReveal();
  
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-bg');
  const portraitImg = PlaceHolderImages.find(img => img.id === 'moran-portrait');
  const clinicImg = PlaceHolderImages.find(img => img.id === 'clinic-tivon');
  const whatsappLink = "https://wa.me/972507817338?text=היי%20הגעתי%20מהאתר%20שלך%20מעוניין%20לקבל%20פרטים%20נוספים%20תודה";

  const homeFaqs = [
    {
      question: "למי מתאים הטיפול הרגשי?",
      answer: "הטיפול מתאים למי שחווה עומס רגשי, חרדה, תקיעות בחיים או רצון עמוק לחיבור אותנטי לעצמו. אני עובדת עם מבוגרים, נוער ונשים בטבעון ובאונליין."
    },
    {
      question: "מהי פסיכותרפיה הוליסטית ואיך היא עוזרת?",
      answer: "פסיכותרפיה הוליסטית רואה באדם שלם - גוף, נפש ורוח. הטיפול משלב שיחה יחד עם כלים חווייתיים (כמו מיינדפולנס ועבודת צללים) כדי לייצר שינוי עמוק ויציב."
    },
    {
      question: "איפה מתקיימות הפגישות?",
      answer: "הפגישות מתקיימות בקליניקה שלווה בטבעון הטובלת בירוק, המשרה שקט וביטחון, או בשיחות וידאו (זום) מכל מקום בעולם."
    }
  ];

  const audiences = [
    {
      title: "מבוגרים",
      icon: <Orbit size={80} strokeWidth={0.3} />,
      link: "/audience/adults",
      desc: "ליווי רגשי בצמתי חיים ומציאת עוגן פנימי."
    },
    {
      title: "נוער",
      icon: <Infinity size={80} strokeWidth={0.3} />,
      link: "/audience/youth",
      linkText: "מידע לנוער",
      desc: "מרחב בטוח לפיתוח חוסן רגשי וביטוי עצמי."
    },
    {
      title: "נשים",
      icon: <Waves size={80} strokeWidth={0.3} />,
      link: "/audience/women",
      desc: "חיבור עמוק לעולם הפנימי ומציאת הקול האותנטי."
    }
  ];

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          {heroImg && (
            <Image 
              src={heroImg.imageUrl} 
              alt="מורן פז - פסיכותרפיה הוליסטית" 
              fill
              className="object-cover opacity-30 grayscale-[0.4]"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-background"></div>
        </div>
        
        <div ref={heroReveal} className="relative z-10 text-center reveal flex flex-col items-center w-full max-w-7xl mx-auto px-4">
           <span className="boutique-label text-primary mb-12 block">Holistic Care • Tivon</span>
           
           <h1 className="mb-16 w-full text-center">
             <div className="flex flex-wrap justify-center items-center gap-x-6 md:gap-x-12 text-6xl sm:text-8xl md:text-[140px] font-bold leading-none font-handwriting text-foreground">
               <span>להתחבר</span>
               <span className="text-primary/30 text-4xl hidden md:inline">•</span>
               <span>לגלות</span>
               <span className="text-primary/30 text-4xl hidden md:inline">•</span>
               <span>להשתנות</span>
             </div>
           </h1>
           
           <h2 className="text-xl md:text-2xl font-headline italic mb-16 text-accent/70 font-medium max-w-2xl">
             פסיכותרפיה הוליסטית וליווי רגשי ליצירת עוגן פנימי ושלווה עמוקה
           </h2>
           
           <div className="flex flex-col md:flex-row items-center justify-center gap-8">
             <a 
               href={whatsappLink} 
               target="_blank" 
               rel="noopener noreferrer"
               className="px-12 py-3 bg-primary text-white text-[12px] tracking-[0.2em] font-bold hover:bg-accent transition-all duration-700 shadow-xl rounded-sm flex items-center gap-4 group min-w-[240px] justify-center whitespace-nowrap !opacity-100"
             >
                תיאום שיחת היכרות
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
             </a>
             <Link 
               href="/practice"
               className="px-10 py-3 bg-transparent border border-foreground/15 text-foreground/80 hover:bg-stone-50 transition-all duration-700 text-[10px] tracking-[0.3em] uppercase font-bold"
             >
                התהליך הטיפולי
             </Link>
           </div>
        </div>
      </section>

      {/* Self Introduction Section */}
      <section ref={introReveal} className="py-32 md:py-56 px-6 md:px-24 bg-white reveal">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="image-zoom-container aspect-[3/4] shadow-2xl border-8 border-stone-50 overflow-hidden">
                {portraitImg && (
                  <Image 
                    src={portraitImg.imageUrl} 
                    alt="מורן פז - פסיכותרפיסטית הוליסטית" 
                    fill 
                    className="object-cover grayscale-[0.2]"
                    data-ai-hint={portraitImg.imageHint}
                  />
                )}
              </div>
            </div>
            
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-12">
              <div>
                <span className="boutique-label text-primary mb-6 block">About Moran Paz</span>
                <h2 className="text-7xl md:text-9xl font-handwriting font-bold text-foreground leading-none mb-4">
                  נעים מאוד, מורן פז
                </h2>
                <div className="w-20 h-[1px] bg-primary/30"></div>
              </div>
              
              <div className="space-y-8 boutique-para text-stone-600">
                <p>
                  אני פסיכותרפיסטית הוליסטית ומנחת תהליכים רגשיים – חווייתיים. אני מאמינה שלכולנו יש את הזכות להרגיש חופשיים מבפנים ושהבחירה קיימת לכל אדם בכל מצב.
                </p>
                <div className="relative pr-12 py-4">
                  <Quote className="absolute -top-8 -right-4 text-primary/5 w-32 h-32 rotate-180 pointer-events-none" />
                  <div className="border-r-[3px] border-primary/20 pr-10 py-1">
                    <p className="font-headline italic text-2xl text-accent/80 leading-relaxed relative z-10">
                      התהליך מביא לפחות חרדות וסטרס, שלווה פנימית, חוסן נפשי ומנטלי, וביטוי אותנטי.
                    </p>
                  </div>
                </div>
                <p>
                  אני מלווה מבוגרים, נוער ונשים למצוא את הדרך שלהם פנימה – לחיבור העמוק והאותנטי עם עצמם, בקליניקה בטבעון או בטיפול אונליין.
                </p>
              </div>
              
              <div className="pt-6">
                <Link href="/about" className="inline-flex items-center gap-4 boutique-label text-primary !opacity-100 border-b border-primary/20 hover:border-primary transition-all pb-2 font-bold text-sm">
                  להכיר אותי לעומק
                  <ArrowLeft size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Uniqueness */}
      <section ref={uniquenessReveal} className="py-32 md:py-56 px-6 md:px-24 bg-stone-50 reveal">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Unique Approach" title="מה מיוחד בגישה שלי?" className="flex flex-col items-center text-center" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 mt-20">
            {[
              { title: "שילוב גוף-נפש", icon: <Orbit />, desc: "אנחנו עובדות עם הרגש והגוף יחד לריפוי עמוק." },
              { title: "כלים חווייתיים", icon: <Infinity />, desc: "עבודת צללים, ילדה פנימית, פוקוסינג ומיינדפולנס." },
              { title: "מרחב בטוח בטבע", icon: <Waves />, desc: "הקליניקה בטבעון משרה שקט חיצוני ופנימי." },
              { title: "ידע וניסיון", icon: <Compass />, desc: "תואר שני (MA) ושילוב של מקצועיות וגישה אנושית." }
            ].map((point, i) => (
              <div key={i} className={cn("text-center md:text-right stagger", `stagger-${i+1}`)}>
                <div className="mb-6 text-primary flex justify-center md:justify-start">{React.cloneElement(point.icon as React.ReactElement, { size: 40, strokeWidth: 0.5 })}</div>
                <h3 className="text-2xl font-headline font-bold text-accent mb-4">{point.title}</h3>
                <p className="text-lg font-light text-stone-500 leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section ref={audienceReveal} className="py-32 md:py-56 px-6 md:px-24 bg-white reveal">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Audiences" title="עם מי אני עובדת?" className="flex flex-col items-center text-center" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20">
            {audiences.map((item, i) => (
              <Link 
                key={i} 
                href={item.link}
                className={cn("boutique-card group", `stagger-${i+1}`)}
              >
                <div className="art-icon">{item.icon}</div>
                <h3 className="text-5xl font-headline mb-6 group-hover:scale-105 transition-transform duration-700">{item.title}</h3>
                <p className="text-xl font-light opacity-80 max-w-[280px]">{item.desc}</p>
                <div className="mt-12 boutique-label !opacity-40 group-hover:!opacity-100 transition-all flex items-center gap-3">
                  למידע נוסף <ArrowLeft size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Clinic Tour */}
      <section ref={tourReveal} className="py-32 md:py-56 px-6 md:px-24 reveal bg-stone-50 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1">
            <SectionTitle subtitle="The Clinic" title="סיור בקליניקה בטבעון" />
            <p className="boutique-para mb-12">
              הקליניקה ממוקמת בלב הטבע של טבעון. כאן מתקיים מרחב בטוח המאפשר נשימה עמוקה וניתוק מרעשי היום-יום.
            </p>
            <Link href="/tivon" className="inline-flex items-center gap-4 boutique-label text-primary !opacity-100 border-b border-primary/20 hover:border-primary transition-all pb-2 group text-lg font-bold">
              לראות איפה הכל קורה
              <Eye size={20} strokeWidth={1} />
            </Link>
          </div>
          <div className="order-1 lg:order-2">
            <div className="image-zoom-container aspect-video shadow-2xl relative border-8 border-white">
              {clinicImg && (
                <Image 
                  src={clinicImg.imageUrl} 
                  alt="הקליניקה בטבעון" 
                  fill 
                  className="object-cover grayscale-[0.3]"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <FaqSection items={homeFaqs} title="שאלות נפוצות" subtitle="Common Questions" />

      {/* Contact */}
      <section id="contact" ref={contactReveal} className="py-32 md:py-56 px-6 bg-white border-t border-border/10 reveal">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle subtitle="Connect" title="צרו קשר" className="flex flex-col items-center" />
          <p className="boutique-para mb-16 font-medium">אני כאן בשבילך לתאום שיחת הכרות ללא עלות.</p>
          <ContactForm />
          
          <div className="mt-24 flex justify-center">
            <a 
              href={whatsappLink} 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-6 px-12 py-3 bg-primary text-white text-[13px] tracking-[0.2em] uppercase font-bold hover:bg-accent transition-all duration-700 shadow-xl rounded-sm whitespace-nowrap !opacity-100"
            >
              <MessageCircle size={24} />
              שלחי הודעה בוואטסאפ
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
