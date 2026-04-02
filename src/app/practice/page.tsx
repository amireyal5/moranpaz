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
import Link from 'next/link';

export default function PracticePage() {
  const introReveal = useReveal();
  const holisticReveal = useReveal();
  const stepsReveal = useReveal();
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20אשמח%20לפרטים%20על%20התהליך%20הטיפול%20ההוליסטי";

  const steps = [
    { 
      id: "01", 
      title: "פגישת הכרות", 
      desc: "נפגש לשיחה ראשונית (בקליניקה או בזום), נכיר אותך ואת מה שמעסיק אותך. נתאם ציפיות ונבין האם מתאים לנו לצאת למסע הטיפולי יחד." 
    },
    { 
      id: "02", 
      title: "יצירת מרחב בטוח ואמון", 
      desc: "בפגישות הראשונות נעמיק בבניית אמון. זהו מרחב שבו אפשר להביא את עצמך כפי שאת/ה – בלי מסכות, בלי שיפוטיות – ולדעת שיש אוזן קשבת ותמיכה מלאה." 
    },
    {
      id: "03",
      title: "עבודה רגשית חווייתית",
      desc: "נשתמש בכלים מגוונים כמו מיינדפולנס, עבודת צללים, דמיון מודרך, קלפים טיפוליים וילד/ה פנימית. המטרה היא לשחרר חסמים ולהתחבר מחדש לגוף ולרגש."
    },
    {
      id: "04",
      title: "הטמעה ושינוי בחיי היום-יום",
      desc: "בסיום התהליך תוכל/י לחוות הקלה בתחושות מתח וחרדה, להגביר את היכולת לוויסות עצמי ואת הערך העצמי, ולחיות כבימאי/ת של חייך."
    }
  ];

  const treatedIssues = [
    { title: "חרדות וסטרס", icon: <Orbit size={80} strokeWidth={0.5} /> },
    { title: "תקיעות בחיים", icon: <Infinity size={80} strokeWidth={0.5} /> },
    { title: "מערכות יחסים", icon: <Waves size={80} strokeWidth={0.5} /> },
    { title: "דימוי עצמי", icon: <Compass size={80} strokeWidth={0.5} /> }
  ];

  const practiceFaqs = [
    {
      question: "מהי פסיכותרפיה הוליסטית?",
      answer: "פסיכותרפיה הוליסטית רואה את האדם כשלם - גוף, נפש ורוח. הטיפול משלב שיחה יחד עם כלים חווייתיים כדי להגיע לרובד העמוק של הרגש."
    },
    {
      question: "במה פסיכותרפיה הוליסטית עוזרת?",
      answer: "היא מסייעת בשחרור דפוסים מעכבים, ריפוי פצעי עבר דרך עבודת ילד פנימי, ופיתוח חוסן נפשי המאפשר התמודדות טובה יותר עם חרדות."
    }
  ];

  return (
    <main className="min-h-screen bg-background text-right">
      <Navbar />
      
      <section className="pt-56 pb-48 px-8 md:px-24">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Holistic Psychotherapy" title="התהליך הטיפולי" />
          
          <div ref={introReveal} className="reveal mb-32">
            <h1 className="text-4xl md:text-6xl font-headline italic text-accent mb-12 leading-tight">
              המסע לריפוי רגשי מתחיל בך
            </h1>
            <p className="max-w-3xl mr-0 boutique-para">
              פסיכותרפיה הוליסטית היא הזמנה להתבוננות פנימה, במרחב בטוח ומכיל, שבו נוכל יחד לגלות את הכוחות הטמונים בך.
            </p>
            <div className="mt-12">
               <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-6 px-12 py-6 bg-primary !text-white boutique-label !text-lg md:!text-xl hover:bg-accent transition-all duration-700 shadow-xl rounded-sm"
              >
                תאום שיחת היכרות
                <ArrowLeft size={18} />
              </a>
            </div>
          </div>

          <div ref={holisticReveal} className="reveal grid grid-cols-1 lg:grid-cols-2 gap-24 mb-48 bg-white p-12 md:p-24 shadow-sm border border-stone-100">
            <div>
              <h2 className="text-3xl md:text-5xl font-headline text-accent mb-10">מה מיוחד בגישה ההוליסטית?</h2>
              <div className="space-y-6 text-xl font-light text-stone-600 leading-relaxed">
                <p>בניגוד לגישות מסורתיות שמתמקדות רק בסימפטום, הגישה ההוליסטית רואה בך מערכת שלמה. אנחנו לא רק מדברים על הבעיה – אנחנו מרגישים אותה בגוף.</p>
                <p>השילוב בין <strong>מיינדפולנס, עבודת צללים ופוקוסינג</strong> מאפשר לנו לעקוף את "השומרים" של המיינד ולהגיע לריפוי אמיתי.</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-headline font-bold text-primary mb-10 text-center">במה אני מטפלת?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {treatedIssues.map((issue, i) => (
                  <div key={i} className="boutique-card !min-h-[250px] !p-8 group">
                    <div className="art-icon !top-1/2 !-translate-y-1/2 !right-4 opacity-10">
                      {issue.icon}
                    </div>
                    <span className="text-2xl font-headline z-10">{issue.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
             <div ref={stepsReveal} className="lg:col-span-8 space-y-12 reveal">
                <h2 className="text-3xl font-headline text-accent mb-12">שלבי התהליך</h2>
                {steps.map((step, i) => (
                  <div key={step.id} className={cn("p-12 bg-white border border-border/30 hover:border-primary/30 transition-all duration-1000 group shadow-sm", `stagger-${i+1}`)}>
                    <div className="flex items-center space-x-reverse space-x-6 mb-8">
                      <span className="w-12 h-12 border border-primary text-primary flex items-center justify-center font-bold text-xl group-hover:bg-primary group-hover:text-white transition-all duration-700">
                        {step.id}
                      </span>
                      <h4 className="text-3xl font-headline font-bold text-accent">{step.title}</h4>
                    </div>
                    <p className="boutique-para pr-16">
                      {step.desc}
                    </p>
                  </div>
                ))}
             </div>
             
             <div className="lg:col-span-4">
                <div className="bg-accent text-white p-12 shadow-2xl sticky top-48">
                   <h4 className="text-2xl font-headline font-bold mb-10 border-b border-white/10 pb-6 text-primary">הטיפול מתאים לך אם...</h4>
                   <ul className="space-y-8">
                      {[
                        "מרגישה תקיעות רגשית או עומס שחוזר על עצמו.",
                        "רוצה להתחבר מחדש לעצמך ולתחושת משמעות.",
                        "זקוקה לכלים לוויסות עצמי וחיזוק חוסן נפשי.",
                        "רוצה להפסיק לפעול מתוך 'טייס אוטומטי'."
                      ].map((item, i) => (
                        <li key={i} className="flex items-start space-x-reverse space-x-6 text-stone-300">
                           <CheckCircle2 size={20} className="text-primary mt-1 flex-shrink-0" />
                           <span className="text-lg leading-relaxed">{item}</span>
                        </li>
                      ))}
                   </ul>
                   <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-12 inline-flex items-center gap-4 boutique-label !text-lg text-primary hover:text-white transition-all group"
                   >
                     תאום פגישת היכרות
                     <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform" />
                   </a>
                </div>
             </div>
          </div>
        </div>
      </section>

      <FaqSection items={practiceFaqs} title="שאלות נפוצות על הטיפול" subtitle="Process FAQ" />

      <section className="py-48 bg-stone-50 px-8 md:px-24" id="contact">
        <div className="max-w-4xl mx-auto">
          <SectionTitle subtitle="Connect" title="מוכנה להתחיל את המסע?" className="flex flex-col items-center text-center" />
          <p className="text-center boutique-para mb-16">השאירי פרטים ואחזור אלייך לשיחת ייעוץ ראשונית.</p>
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
