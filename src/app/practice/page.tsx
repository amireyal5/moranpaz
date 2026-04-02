
"use client";

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { FaqAssistant } from '@/components/shared/FaqAssistant';
import { FaqSection } from '@/components/shared/FaqSection';
import { useReveal } from '@/hooks/use-reveal';
import { CheckCircle2, ArrowLeft, Sparkles, Heart, Brain } from 'lucide-react';
import { ContactForm } from '@/components/shared/ContactForm';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function PracticePage() {
  const introReveal = useReveal();
  const holisticReveal = useReveal();

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
    { title: "חרדות וסטרס", icon: <Brain size={24} /> },
    { title: "תקיעות בחיים", icon: <Sparkles size={24} /> },
    { title: "מערכות יחסים", icon: <Heart size={24} /> },
    { title: "דימוי עצמי", icon: <Sparkles size={24} /> },
    { title: "צמתים בקריירה", icon: <Brain size={24} /> },
    { title: "מציאת משמעות", icon: <Heart size={24} /> }
  ];

  const practiceFaqs = [
    {
      question: "מהי פסיכותרפיה הוליסטית?",
      answer: "פסיכותרפיה הוליסטית רואה את האדם כשלם - גוף, נפש ורוח. הטיפול משלב שיחה יחד עם כלים חווייתיים כדי להגיע לרובד העמוק של הרגש ולא רק להישאר ברמה המחשבתית."
    },
    {
      question: "במה פסיכותרפיה הוליסטית עוזרת?",
      answer: "היא מסייעת בשחרור דפוסים מעכבים, ריפוי פצעי עבר דרך עבודת ילד פנימי, ופיתוח חוסן נפשי המאפשר התמודדות טובה יותר עם חרדות ומשברי חיים."
    },
    {
      question: "האם הטיפול מתאים גם למי שלא חווה 'משבר'?",
      answer: "בהחלט. הטיפול הוא כלי נפלא לצמיחה אישית, הכרות עמוקה עם עצמך ושיפור איכות החיים והביטוי האותנטי שלך בעולם."
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-56 pb-48 px-8 md:px-24">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Holistic Psychotherapy" title="התהליך הטיפולי" />
          
          <div ref={introReveal} className="reveal mb-32 text-right">
            <h1 className="text-4xl md:text-6xl font-headline italic text-accent mb-12 leading-tight stagger-1">
              המסע לריפוי רגשי מתחיל בך
            </h1>
            <p className="max-w-3xl mr-0 boutique-para stagger-2">
              פסיכותרפיה הוליסטית היא הזמנה להתבוננות פנימה, במרחב בטוח ומכיל, שבו נוכל יחד לגלות את הכוחות הטמונים בך ולרפא את הפצעים המבקשים הכרה.
            </p>
          </div>

          {/* Detailed Holistic Psychotherapy Section */}
          <div ref={holisticReveal} className="reveal grid grid-cols-1 lg:grid-cols-2 gap-24 mb-48 text-right bg-white p-12 md:p-24 shadow-sm">
            <div>
              <h2 className="text-3xl md:text-5xl font-headline text-accent mb-10">מה מיוחד בגישה ההוליסטית?</h2>
              <div className="space-y-6 text-xl font-light text-stone-600 leading-relaxed">
                <p>בניגוד לגישות מסורתיות שמתמקדות רק בסימפטום או במחשבה, הגישה ההוליסטית רואה בך מערכת שלמה. אנחנו לא רק מדברים על הבעיה – אנחנו מרגישים אותה בגוף, מבינים את המקור הרגשי שלה ומשתמשים בכלים חווייתיים כדי לשחרר אותה.</p>
                <p>השילוב בין <strong>מיינדפולנס, עבודת צללים, דמיון מודרך ושיטת הפוקוסינג</strong> מאפשר לנו לעקוף את "השומרים" של המיינד ולהגיע לריפוי אמיתי ושורשי.</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-headline font-bold text-primary mb-10">במה אני מטפלת?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {treatedIssues.map((issue, i) => (
                  <div key={i} className="flex items-center space-x-reverse space-x-4 p-6 bg-stone-50 border border-border/10">
                    <div className="text-primary">{issue.icon}</div>
                    <span className="text-xl font-medium text-accent">{issue.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
             <div className="lg:col-span-8 space-y-12 text-right">
                <h2 className="text-3xl font-headline text-accent mb-12">שלבי התהליך</h2>
                {steps.map((step, i) => (
                  <div key={step.id} className={cn("reveal p-12 bg-white border border-border/30 hover:border-primary/30 transition-all duration-1000 group shadow-sm", `stagger-${i+1}`)}>
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
                   <ul className="space-y-8 text-right">
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
                   <Link href="#contact" className="mt-12 inline-flex items-center gap-4 boutique-label text-primary hover:text-white transition-all group">
                     תאום פגישת היכרות
                     <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform" />
                   </Link>
                </div>
             </div>
          </div>
        </div>
      </section>

      <FaqSection items={practiceFaqs} title="שאלות נפוצות על הטיפול" subtitle="Process FAQ" />

      <section className="py-48 bg-stone-50 px-8 md:px-24" id="contact">
        <div className="max-w-4xl mx-auto">
          <SectionTitle subtitle="Connect" title="צרו קשר" className="flex flex-col items-center" />
          <div className="text-center mb-16">
            <p className="boutique-para">מוזמנת להשאיר פרטים לתיאום פגישה בטבעון או בזום.</p>
          </div>
          <ContactForm />
        </div>
      </section>

      <Footer />
      <FaqAssistant />
    </main>
  );
}
