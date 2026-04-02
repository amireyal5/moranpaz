
"use client";

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ContactForm } from '@/components/shared/ContactForm';
import { useReveal } from '@/hooks/use-reveal';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function WomenPage() {
  const contentReveal = useReveal();
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20אשמח%20לפרטים%20על%20ליווי%20רגשי%20לנשים";

  return (
    <main className="min-h-screen bg-background text-right">
      <Navbar />
      
      <section className="pt-56 pb-32 px-8 md:px-24">
        <div className="max-w-5xl mx-auto">
          <SectionTitle subtitle="Audience" title="טיפול וליווי לנשים" />
          
          <div ref={contentReveal} className="reveal space-y-12">
            <h3 className="text-4xl md:text-6xl font-headline italic text-accent mb-12 leading-tight">
              לחזור אל הבית הפנימי שלך
            </h3>
            
            <div className="boutique-para space-y-8">
              <p>
                נשים רבות חוות עומס רגשי ופיזי כבד, כשהן מתמרנות בין שלל תפקידים ומנסות "להחזיק הכל". בתוך המרוץ הזה, הקול הפנימי שלנו לפעמים נחלש או נעלם לגמרי.
              </p>
              <p>
                הטיפול והליווי לנשים בקליניקה הוא הזמנה לעצור. להקשיב למה שמבקש ביטוי בתוכך, לזהות את החלקים השונים בך – המבקרים, המפוחדים וגם העוצמתיים – ולחיות מתוך חיבור אותנטי וכנה לעצמך.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/20 border border-border/20 shadow-xl mt-16">
              {[
                { title: "הקשבה פנימית", desc: "למידה מחדש איך לסמוך על האינטואיציה ועל הגוף שלך." },
                { title: "שחרור שליטה", desc: "כלים להרפיה, הישענות ומציאת שקט בתוך אי הוודאות." },
                { title: "עבודת ילדה פנימית", desc: "ריפוי פצעי עבר ומפגש עם הילדה שהיינו כדי לצמוח היום." },
                { title: "ביטוי אותנטי", desc: "העזות להגיד את האמת שלך ולחיות לפיה ללא פחד." }
              ].map((item, i) => (
                <div key={i} className="bg-white p-12 space-y-6">
                  <div className="flex items-center gap-4 text-primary">
                    <Sparkles size={24} />
                    <h4 className="text-2xl font-headline font-bold text-accent">{item.title}</h4>
                  </div>
                  <p className="text-xl font-light text-stone-600">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center pt-24">
              <Link href="/workshop" className="boutique-label text-primary border-b border-primary/30 pb-2 hover:border-primary transition-all text-2xl">
                אולי קורס BeinMe הקבוצתי יתאים לך?
              </Link>
            </div>

            <div className="text-center pt-16">
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex px-16 py-8 bg-accent text-white boutique-label hover:bg-primary transition-all duration-700 items-center gap-6 shadow-2xl rounded-sm"
              >
                תאום שיחת היכרות אישית
                <ArrowLeft size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 bg-stone-50 px-8">
        <div className="max-w-4xl mx-auto">
          <SectionTitle subtitle="Connect" title="צרו קשר" className="flex flex-col items-center" />
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}

