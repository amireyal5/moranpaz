
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  ChevronRight, Search, Book, Image as ImageIcon, Link as LinkIcon, 
  FileText, Layout, MousePointer2, Settings, ExternalLink, Info, AlertTriangle, Lightbulb 
} from 'lucide-react';

const HELP_TOPICS = [
  {
    id: 'general',
    title: 'מבוא למערכת הניהול',
    icon: <Book className="text-primary" />,
    content: [
      {
        sub: 'איך המערכת עובדת?',
        text: 'מערכת הניהול שלך מבוססת על חיבור ישיר למסד הנתונים של פיירבייס. כל שינוי שתבצעי ותשמרי (לחיצה על "שמירה") יתעדכן באתר באופן מיידי עבור כל הגולשים.',
      },
      {
        sub: 'אבטחה',
        text: 'הגישה למערכת מוגנת ורק משתמשים שקיבלו הרשאה מפורשת ממך יכולים להיכנס. במידה ושכחת סיסמה, תוכלי להשתמש בכפתור "שכחתי סיסמה" בעמוד הכניסה.',
      }
    ]
  },
  {
    id: 'blog',
    title: 'ניהול הבלוג "נקודות של אור"',
    icon: <FileText className="text-primary" />,
    content: [
      {
        sub: 'יצירת מאמר חדש',
        text: 'לחצי על כפתור "מאמר חדש". מלאי את הכותרת, הקטגוריה והתקציר. התקציר הוא הטקסט הקצר שמופיע ברשימת המאמרים (Exerpt).',
      },
      {
        sub: 'מה זה Slug?',
        text: 'ה-Slug הוא החלק בכתובת האתר שמוביל למאמר. למשל, אם ה-Slug הוא "my-healing-journey", כתובת המאמר תהיה moranpaz.com/blog/my-healing-journey. חובה להשתמש באותיות אנגליות וקווים מפרידים בלבד.',
      },
      {
        sub: 'עריכת תוכן המאמר',
        text: 'בגוף המאמר תמצאי עורך טקסט עשיר. תוכלי להדגיש טקסט, להוסיף רשימות, תתי-כותרות ואפילו להדביק תמונות ישירות לתוך הטקסט.',
      }
    ]
  },
  {
    id: 'images',
    title: 'עבודה עם תמונות וקישורים (Cloudinary)',
    icon: <ImageIcon className="text-primary" />,
    content: [
      {
        sub: 'מה זה לינק לתמונה (Image URL)?',
        text: 'במערכת הניהול, תמונות מוזנות באמצעות כתובת אינטרנט (URL). זהו הקישור שמוביל ישירות לקובץ התמונה השמור בענן.',
      },
      {
        sub: 'שימוש ב-Cloudinary',
        text: 'מומלץ להשתמש באתר Cloudinary להעלאת התמונות שלך. לאחר ההעלאה, העתיקי את ה-"URL" של התמונה והדביקי אותו בשדה המתאים (למשל: תמונת Hero דסקטופ).',
      },
      {
        sub: 'הפרדה בין דסקטופ למובייל',
        text: 'לכל עמוד ניתן להגדיר תמונה שונה למחשב (רחבה) ולטלפון (אנכית). זה מבטיח שהאתר שלך ייראה מרהיב בכל מכשיר ללא חיתוכים לא נעימים.',
      }
    ]
  },
  {
    id: 'pages',
    title: 'ניהול עמודי האתר ותפריט הניווט',
    icon: <Layout className="text-primary" />,
    content: [
      {
        sub: 'עריכת דפים קיימים',
        text: 'בחרי את הדף הרצוי מהרשימה (דף הבית, אודות וכו\'). תוכלי לשנות את כותרות ה-Hero, כותרות המשנה ואת גוף התוכן.',
      },
      {
        sub: 'הוספת עמודים חדשים',
        text: 'תוכלי ליצור עמוד חדש על ידי בחירה ב"הוספת עמוד חדש". תני לו שם ומזהה (Slug) באנגלית. העמוד ייווצר אוטומטית, אך כדי שיראו אותו באתר, עלייך להוסיף אותו לתפריט הניווט.',
      },
      {
        sub: 'ניהול תפריט הניווט (Navbar)',
        text: 'תחת "הגדרות כלליות" תוכלי לנהל את הקישורים המופיעים בראש האתר. תוכלי להוסיף קישורים חדשים, למחוק קיימים ולשנות את הסדר שלהם בעזרת החצים.',
      }
    ]
  },
  {
    id: 'cta',
    title: 'כפתורי הנעה לפעולה (CTA)',
    icon: <MousePointer2 className="text-primary" />,
    content: [
      {
        sub: 'הוספת כפתורים',
        text: 'בכל דף ניתן להוסיף כפתורים בתחתית התוכן. כפתורים אלו עוזרים להוביל את המשתמשים לפעולה (כמו "צרו קשר" או "קבעי פגישה").',
      },
      {
        sub: 'לינקים פנימיים מול חיצוניים',
        text: 'לינק פנימי נראה כך: /contact (מתחיל בסלאש). לינק חיצוני נראה כך: https://wa.me/972... (כתובת מלאה כולל http).',
      },
      {
        sub: 'עיצוב הכפתור',
        text: 'תוכלי לבחור בין עיצוב "מלא" (צבעוני ובולט) לבין "מסגרת" (עדין יותר) כדי ליצור היררכיה חזותית בדף.',
      }
    ]
  }
];

export default function AdminHelpPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filteredTopics = HELP_TOPICS.filter(topic => 
    topic.title.includes(search) || 
    topic.content.some(c => c.sub.includes(search) || c.text.includes(search))
  );

  return (
    <main className="min-h-screen bg-stone-50 text-right">
      <Navbar />
      <section className="pt-48 pb-32 px-6 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-stone-200 pb-10">
          <div className="space-y-4">
            <Button variant="ghost" onClick={() => router.push('/admin/dashboard')} className="text-stone-400 p-0 hover:text-primary">
              <ChevronRight className="ml-2" /> חזרה ללוח הבקרה
            </Button>
            <h1 className="text-6xl font-handwriting text-accent">מרכז ידע ותמיכה</h1>
            <p className="text-stone-500 font-headline text-lg">כל המידע והכלים לניהול מקצועי של האתר שלך</p>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300 size-5" />
            <Input 
              placeholder="חפשי נושא עזרה..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-12 h-12 bg-white border-none shadow-sm rounded-none focus-visible:ring-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Help Content */}
          <div className="lg:col-span-8 space-y-8">
            {filteredTopics.length === 0 ? (
              <div className="bg-white p-20 text-center space-y-6">
                <Search size={48} className="mx-auto text-stone-200" />
                <p className="text-stone-400 font-headline text-xl">לא מצאנו תוצאות לחיפוש שלך...</p>
                <Button variant="outline" onClick={() => setSearch('')}>נקי חיפוש</Button>
              </div>
            ) : (
              filteredTopics.map((topic) => (
                <Card key={topic.id} className="border-none shadow-xl rounded-none overflow-hidden">
                  <CardHeader className="bg-stone-50/50 border-b border-stone-100">
                    <CardTitle className="flex items-center gap-4 text-2xl font-headline text-accent">
                      {topic.icon}
                      {topic.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-8">
                    <Accordion type="multiple" className="w-full">
                      {topic.content.map((item, idx) => (
                        <AccordionItem key={idx} value={`${topic.id}-${idx}`} className="border-b border-stone-50 last:border-0">
                          <AccordionTrigger className="text-lg font-headline font-bold text-stone-700 hover:text-primary transition-colors text-right">
                            {item.sub}
                          </AccordionTrigger>
                          <AccordionContent className="text-base font-headline text-stone-500 leading-relaxed py-4 text-right">
                            {item.text}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Sidebar Tips & Tools */}
          <div className="lg:col-span-4 space-y-8">
            <Card className="bg-primary text-white border-none rounded-none shadow-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb size={24} className="text-white/80" />
                <h3 className="text-xl font-headline font-bold">טיפ מקצועי</h3>
              </div>
              <p className="text-sm leading-relaxed opacity-90 font-headline">
                שימוש ב-Slug קצר וברור המכיל מילות מפתח (למשל: /anxiety-treatment) עוזר מאוד לקידום האתר שלך בגוגל (SEO).
              </p>
            </Card>

            <Card className="bg-white border-none shadow-lg rounded-none p-8 space-y-6">
              <h3 className="text-xl font-headline font-bold text-accent border-b border-stone-100 pb-4">כלים חיצוניים שימושיים</h3>
              <div className="space-y-4">
                <a 
                  href="https://cloudinary.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between group p-3 hover:bg-stone-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <ImageIcon size={18} className="text-primary" />
                    <span className="font-headline text-sm font-medium">Cloudinary - אחסון תמונות</span>
                  </div>
                  <ExternalLink size={14} className="text-stone-300 group-hover:text-primary" />
                </a>
                <a 
                  href="https://unsplash.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between group p-3 hover:bg-stone-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <ImageIcon size={18} className="text-primary" />
                    <span className="font-headline text-sm font-medium">Unsplash - תמונות חינם</span>
                  </div>
                  <ExternalLink size={14} className="text-stone-300 group-hover:text-primary" />
                </a>
              </div>
            </Card>

            <div className="p-8 bg-stone-100 border border-dashed border-stone-300 space-y-4">
              <div className="flex items-center gap-3 text-accent">
                <Info size={20} />
                <h4 className="font-bold font-headline">צריכה עזרה נוספת?</h4>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed font-headline">
                תוכלי להשתמש ב"עוזרת הווירטואלית" (אייקון סימן השאלה למטה משמאל) כדי לשאול שאלות ספציפיות על התכנים שלך.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
