
"use client";

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { FaqAssistant } from '@/components/shared/FaqAssistant';
import { useReveal } from '@/hooks/use-reveal';
import { CheckCircle2 } from 'lucide-react';
import { ContactForm } from '@/components/shared/ContactForm';

export default function PracticePage() {
  const introReveal = useReveal();

  const steps = [
    { id: "01", title: "פגישת הכרות", desc: "נפגש לשיחה ראשונית (בקליניקה או בזום), נכיר אותך ואת מה שמעסיק אותך. נתאם ציפיות ונבין האם מתאים לנו לצאת למסע הטיפולי יחד." },
    { id: "02", title: "יצירת מרחב בטוח ואמון", desc: "בפגישות הראשונות נעמיק בחיבור ובבניית אמון. זהו מרחב שבו אפשר להביא את עצמך כפי שאת/ה – בלי מסכות, בלי שיפוטיות – ולדעת שיש אוזן קשבת ותמיכה מלאה." },
    { id: "03", title: "עבודה רגשית חווייתית", desc: "נשתמש בכלים מגוונים כמו מיינדפולנס, עבודת צללים, דמיון מודרך, קלפים טיפוליים וילד/ה פנימית. המטרה היא לשחרר חסמים, לעבד דפוסים חוזרים ולהתחבר מחדש לגוף ולרגש." },
    { id: "04", title: "הטמעה ושינוי", desc: "בסיום התהליך תוכל/י לחוות הקלה בתחושות מתח, חרדה, תלות וחוסר משמעות. להגביר את הוויסות העצמי והערך העצמי, ולהיות בימאי/ת של חייך." }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-44 pb-32 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Therapy" title="התהליך הטיפולי" number="T" />
          
          <div ref={introReveal} className="reveal mb-20 text-right">
            <h3 className="text-3xl md:text-5xl font-headline italic text-accent mb-8 leading-tight">
              המסע לריפוי רגשי מתחיל בך
            </h3>
            <p className="max-w-3xl mr-0 text-xl text-stone-600 font-light leading-relaxed">
              התהליך הוא הזמנה להתבוננות פנימה, במרחב בטוח ומכיל, שבו נוכל יחד לגלות את הכוחות הטמונים בך ולרפא את הפצעים המבקשים הכרה.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
             <div className="lg:col-span-8 space-y-8 text-right">
                {steps.map((step) => (
                  <div key={step.id} className="reveal p-8 bg-white rounded-3xl shadow-sm border border-primary/5 hover:border-primary/20 transition-all group">
                    <div className="flex items-center space-x-reverse space-x-4 mb-6">
                      <span className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-lg group-hover:bg-primary group-hover:text-white transition-colors">
                        {step.id}
                      </span>
                      <h4 className="text-2xl font-headline font-bold text-foreground">{step.title}</h4>
                    </div>
                    <p className="text-lg text-stone-600 leading-relaxed pr-14">
                      {step.desc}
                    </p>
                  </div>
                ))}
             </div>
             
             <div className="lg:col-span-4">
                <div className="bg-accent text-white p-10 rounded-[3rem] shadow-2xl sticky top-32 overflow-hidden">
                   <div className="absolute top-0 right-0 w-full h-full bg-primary/20 -z-10 blur-3xl"></div>
                   <h4 className="text-2xl font-headline font-bold mb-8 border-b border-white/20 pb-4">הטיפול מתאים לך אם...</h4>
                   <ul className="space-y-6 text-right">
                      {[
                        "מרגיש/ה שיש בתוכך חלקים שצמאים לביטוי",
                        "חווה תקיעות רגשית או דפוסים חוזרים",
                        "מבקש/ת להתחבר מחדש לעצמך ולנשמה",
                        "מרגיש/ה שאיבדת שליטה על החיים",
                        "רוצה כלים פרקטיים לוויסות עצמי",
                        "זקוק/ה לתמיכה ועיניים טובות"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start space-x-reverse space-x-4 text-stone-100">
                           <CheckCircle2 size={20} className="text-primary mt-1 flex-shrink-0" />
                           <span className="text-lg leading-tight">{item}</span>
                        </li>
                      ))}
                   </ul>
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-secondary/30 px-6 md:px-20" id="contact">
        <div className="max-w-4xl mx-auto">
          <SectionTitle subtitle="Connect" title="מוכנים להתחיל?" number="?" />
          <ContactForm />
        </div>
      </section>

      <Footer />
      <FaqAssistant />
    </main>
  );
}
