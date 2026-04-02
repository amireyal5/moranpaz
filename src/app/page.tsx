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
import { ChevronDown, MessageCircle, ArrowLeft, Eye, Orbit, Waves, Infinity, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
  const heroReveal = useReveal();
  const uniquenessReveal = useReveal();
  const audienceReveal = useReveal();
  const tourReveal = useReveal();
  const offeringsReveal = useReveal();
  
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-bg');
  const clinicImg = PlaceHolderImages.find(img => img.id === 'clinic-tivon');
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20הגעתי%20מהאתר%20מעוניינת%20לקבל%20פרטים%20על%20תיאום%20פגישת%20היכרות";

  const homeFaqs = [
    {
      question: "למי מתאים הטיפול הרגשי?",
      answer: "הטיפול מתאים למי שחווה עומס רגשי, חרדה, תקיעות בחיים או רצון עמוק לחיבור אותנטי לעצמו. אני עובדת עם מבוגרים, נוער ונשים."
    },
    {
      question: "מהי פסיכותרפיה הוליסטית ואיך היא עוזרת?",
      answer: "פסיכותרפיה הוליסטית רואה באדם שלם - גוף, נפש ורוח. הטיפול משלב שיחה יחד עם כלים חווייתיים (כמו מיינדפולנס ועבודת צללים) כדי להגיע לשורש הבעיה ולייצר שינוי עמוק ויציב."
    },
    {
      question: "איפה מתקיימות הפגישות?",
      answer: "הפגישות מתקיימות בקליניקה שלווה בטבעון הטובלת בירוק, המשרה שקט וביטחון, או בשיחות וידאו (זום) מכל מקום."
    }
  ];

  const audiences = [
    {
      title: "מבוגרים",
      icon: <Orbit size={180} strokeWidth={0.5} />,
      link: "/audience/adults",
      desc: "ליווי רגשי בצמתי חיים ומציאת עוגן פנימי."
    },
    {
      title: "נוער",
      icon: <Infinity size={180} strokeWidth={0.5} />,
      link: "/audience/youth",
      desc: "מרחב בטוח לפיתוח חוסן רגשי וביטוי עצמי."
    },
    {
      title: "נשים",
      icon: <Waves size={180} strokeWidth={0.5} />,
      link: "/audience/women",
      desc: "חיבור עמוק לעולם הפנימי ומציאת הקול האותנטי."
    }
  ];

  const uniquenessPoints = [
    {
      title: "שילוב גוף-נפש",
      icon: <Orbit size={32} strokeWidth={1} />,
      desc: "פסיכותרפיה הוליסטית שרואה בך שלם. אנחנו עובדת עם הרגש, הגוף והמחשבה יחד לריפוי עמוק."
    },
    {
      title: "כלים חווייתיים",
      icon: <Infinity size={32} strokeWidth={1} />,
      desc: "עבודת צללים, ילדה פנימית, פוקוסינג ומיינדפולנס – כלים המאפשרים לצלול לעומק העולם הפנימי."
    },
    {
      title: "מרחב בטוח בטבע",
      icon: <Waves size={32} strokeWidth={1} />,
      desc: "הקליניקה בטבעון מציעה שקט חיצוני שמאפשר להקשיב לשקט הפנימי, בסביבה מכילה ועוטפת."
    },
    {
      title: "ידע וניסיון עשיר",
      icon: <Compass size={32} strokeWidth={1} />,
      desc: "תואר שני (MA) בייעוץ ארגוני ובוגרת פסיכותרפיה הוליסטית. שילוב של מקצועיות וגישה אנושית."
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
              alt="מורן פז - טיפול רגשי ופסיכותרפיה בטבעון" 
              fill
              className="object-cover opacity-70 grayscale-[0.1]"
              priority
              data-ai-hint={heroImg.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-background"></div>
        </div>
        
        <div ref={heroReveal} className="relative z-10 text-center reveal max-w-6xl w-full px-4">
           <span className="boutique-label text-primary block mb-6 md:mb-12">מטפלת רגשית בעמק יזרעאל</span>
           <h1 className="boutique-title mb-10 md:mb-20">
             להתחבר | לגלות | <span className="italic">להשתנות</span>
           </h1>
           <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
             <a 
               href={whatsappLink} 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex w-full md:w-auto px-8 md:px-32 py-6 md:py-10 bg-primary !text-white boutique-label hover:bg-accent transition-all duration-700 items-center justify-center gap-4 md:gap-6 shadow-2xl rounded-sm"
             >
                תאום שיחת היכרות
                <ArrowLeft size={24} />
             </a>
             <Link 
               href="/about"
               className="inline-flex w-full md:w-auto px-8 md:px-24 py-6 md:py-10 bg-transparent border border-foreground/20 text-foreground text-lg md:text-[20px] hover:bg-stone-50 transition-all duration-700 font-light items-center justify-center gap-4 shadow-sm"
             >
                על הגישה שלי
             </Link>
           </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* Uniqueness Section */}
      <section ref={uniquenessReveal} className="py-24 md:py-56 px-6 md:px-24 bg-white reveal">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Unique Approach" title="מה מייחד את הגישה שלי?" className="flex flex-col items-center text-center" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-16 md:mt-20">
            {uniquenessPoints.map((point, i) => (
              <div key={i} className={cn("space-y-4 md:space-y-6 group", `stagger-${i+1}`)}>
                <div className="mb-4 md:mb-6 p-4 bg-stone-50 inline-block rounded-full shadow-sm group-hover:shadow-md transition-all duration-700 text-primary animate-art-float">
                  {point.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-headline font-bold text-accent">{point.title}</h3>
                <p className="text-lg md:text-2xl font-light text-stone-600 leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-24 text-center">
            <Link href="/practice" className="boutique-label text-primary border-b border-primary/20 hover:border-primary transition-all pb-2 text-xl md:text-2xl">
              איך עובד התהליך הטיפולי?
            </Link>
          </div>
        </div>
      </section>

      {/* Audience Section - ARTISTIC CARDS */}
      <section ref={audienceReveal} className="py-24 md:py-48 px-6 md:px-24 bg-stone-50 reveal">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <SectionTitle subtitle="Audiences" title="עם מי אני עובדת?" className="flex flex-col items-center text-center" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {audiences.map((item, i) => (
              <Link 
                key={i} 
                href={item.link}
                className={cn(
                  "boutique-card group",
                  `stagger-${i+1}`
                )}
              >
                <div className="art-icon">
                  {item.icon}
                </div>
                <h3 className="text-4xl sm:text-5xl md:text-6xl font-headline mb-4 md:mb-6 group-hover:scale-105 transition-transform duration-700">{item.title}</h3>
                <p className="text-xl md:text-2xl font-light opacity-80 leading-relaxed max-w-[280px]">{item.desc}</p>
                <div className="mt-8 md:mt-10 boutique-label !text-white/50 group-hover:!text-white transition-all flex items-center gap-2">
                  למידע נוסף <ArrowLeft size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Intermediate CTA */}
      <section className="py-24 bg-accent text-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-headline italic mb-10 leading-relaxed">זמן לעצור לרגע, לנשום עמוק ולהתחיל להקשיב לעצמך.</h2>
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-6 px-12 py-6 bg-primary !text-white boutique-label hover:bg-white hover:!text-accent transition-all duration-700 shadow-2xl"
          >
            בואי נדבר
            <ArrowLeft size={18} />
          </a>
        </div>
      </section>

      {/* Clinic Tour Section */}
      <section ref={tourReveal} className="py-24 md:py-56 px-6 md:px-24 reveal bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="order-2 lg:order-1">
            <SectionTitle subtitle="The Clinic" title="סיור בקליניקה בטבעון" />
            <p className="boutique-para mb-8 md:mb-12">
              הקליניקה ממוקמת בלב הטבע של טבעון, ממוקמת בלב הירוק של טבעון. כאן מתקיים מרחב בטוח המאפשר נשימה עמוקה וניתוק מרעשי היום-יום.
            </p>
            <Link href="/tivon" className="inline-flex items-center gap-4 boutique-label text-primary border-b border-primary/20 hover:border-primary transition-all pb-2 group text-xl md:text-2xl">
              בואו לראות איפה הכל קורה
              <Eye size={24} className="group-hover:scale-110 transition-transform" />
            </Link>
          </div>
          <div className="order-1 lg:order-2">
            <div className="image-zoom-container aspect-video shadow-2xl relative border-4 md:border-8 border-white">
              {clinicImg && (
                <Image 
                  src={clinicImg.imageUrl} 
                  alt="הקליניקה של מורן פז בטבעון" 
                  fill 
                  className="object-cover grayscale-[0.3]"
                  data-ai-hint={clinicImg.imageHint}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Offerings Section - ARTISTIC CARDS */}
      <section ref={offeringsReveal} className="py-24 md:py-56 px-6 md:px-24 reveal bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <SectionTitle subtitle="Therapy & Workshops" title="מה אני מציעה?" className="flex flex-col items-center text-center" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {[
              { 
                title: "התהליך הטיפולי", 
                link: "/practice", 
                desc: "פסיכותרפיה הוליסטית - מסע אישי לריפוי רגשי, חיזוק חוסן ומציאת שקט פנימי בטבעון או בזום.",
                icon: <Orbit size={180} strokeWidth={0.3} />
              },
              { 
                title: "קורס BeinMe©", 
                link: "/workshop", 
                desc: "מרחב קבוצתי-טיפולי לנשים לחיבור אותנטי וכנה עם עצמך דרך עבודת עומק חווייתית.",
                icon: <Waves size={180} strokeWidth={0.3} />
              }
            ].map((service, i) => (
              <Link 
                key={i} 
                href={service.link} 
                className={cn(
                  "boutique-card group", 
                  `stagger-${i+1}`
                )}
              >
                <div className="art-icon !top-1/2 !-translate-y-1/2 !right-0 opacity-10">
                  {service.icon}
                </div>
                <div className="z-10">
                  <span className="boutique-label !text-white/40 block mb-4 md:mb-6">0{i+1}</span>
                  <h3 className="text-4xl sm:text-5xl md:text-7xl font-headline mb-6 md:mb-8 group-hover:italic transition-all duration-700">{service.title}</h3>
                  <p className="opacity-80 font-light text-xl md:text-3xl leading-relaxed mb-8 md:mb-10 max-w-sm mx-auto">{service.desc}</p>
                  <div className="w-12 md:w-16 h-[1px] bg-white/30 mx-auto group-hover:w-24 md:group-hover:w-32 transition-all duration-700"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      
      <FaqSection items={homeFaqs} title="שאלות נפוצות" subtitle="SEO FAQ" />

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-56 px-6 bg-white border-t border-border/20">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle subtitle="Connect" title="צרו קשר" className="flex flex-col items-center text-center" />
          <p className="boutique-para mb-12 md:mb-20">אני כאן בשבילך לתאום שיחת הכרות ללא עלות. בואי נתחיל את המסע שלך יחד.</p>
          <ContactForm />
          
          <div className="mt-16 md:mt-24 flex flex-col items-center">
            <a 
              href={whatsappLink} 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 md:gap-8 text-foreground hover:text-primary transition-colors boutique-label group text-xl md:text-2xl font-bold border border-primary/20 px-8 md:px-12 py-4 md:py-6 w-full md:w-auto justify-center rounded-sm"
            >
              <MessageCircle size={32} className="md:size-[48px] group-hover:rotate-12 transition-transform text-primary" />
              שלחי הודעה בוואטסאפ
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <FaqAssistant />
    </main>
  );
}
