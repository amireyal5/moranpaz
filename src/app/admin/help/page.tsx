
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
  FileText, Layout, MousePointer2, Settings, ExternalLink, Info, Box, 
  MoveVertical, Lock, ShieldCheck, Globe, Palette, HelpCircle, Heart, 
  Sparkles, Orbit, Compass, Users, Star
} from 'lucide-react';

const HELP_TOPICS = [
  {
    id: 'security',
    title: 'התחברות ואבטחה',
    icon: <Lock className="text-primary" />,
    content: [
      {
        sub: 'איך נכנסים למערכת הניהול?',
        text: 'הגישה למערכת היא דרך הכתובת moranpaz.com/admin/login. שם תתבקשי להזין את המייל והסיסמה האישיים שלך.',
      },
      {
        sub: 'שכחתי סיסמה - מה עושים?',
        text: 'בעמוד הלוגין תמצאי כפתור קטן בשם "שכחתי סיסמה?". הזיני את המייל שלך ולחצי עליו. מערכת Firebase תשלח אלייך מייל אוטומטי עם קישור לאיפוס. אם לא קיבלת את המייל תוך דקה, בדקי בתיקיית הספאם (דואר זבל).',
      },
      {
        sub: 'עריכה מהמחשב בלבד',
        text: 'למען נוחות מרבית ומניעת טעויות עיצוביות, אזורי עריכת העמודים והבלוג חסומים לשימוש מהטלפון הנייד. אנא התחברי מהמחשב (PC/Mac) כדי לבצע שינויים בתוכן האתר.',
      }
    ]
  },
  {
    id: 'pages',
    title: 'ניהול עמודי האתר',
    icon: <Layout className="text-primary" />,
    content: [
      {
        sub: 'איך עורכים עמוד קיים?',
        text: 'בעמוד "ניהול דפים", בחרי את העמוד הרצוי מהרשימה (למשל: דף הבית, אודות). התוכן הקיים ייטען אוטומטית, ותוכלי לשנות כותרות, טקסטים ותמונות.',
      },
      {
        sub: 'הוספת עמוד חדש (Slug)',
        text: 'כדי להוסיף עמוד שלא היה קיים, בחרי באופציה "הוספת עמוד חדש". תתבקשי להזין "Slug" - זהו המזהה באנגלית שיופיע בכתובת האתר (למשל: workshops). המערכת תייצר עבורך את העמוד באופן אוטומטי.',
      },
      {
        sub: 'שימוש בעורך הטקסט (Rich Text)',
        text: 'עורך הטקסט מאפשר לך לעצב את גוף העמוד כמו ב-Word: להדגיש טקסט, ליצור רשימות (בולטים), ולהוסיף כותרות פנימיות. טיפ: שימוש בסימון "ציטוט" (Blockquote) יהפוך את הטקסט אוטומטית לפונט כתב-יד גדול ומרהיב.',
      }
    ]
  },
  {
    id: 'ordering',
    title: 'שליטה בסדר ומיקום (חצים)',
    icon: <MoveVertical className="text-primary" />,
    content: [
      {
        sub: 'איך לקבוע איזה כפתור או קובייה יופיעו קודם?',
        text: 'בכל מקום שיש רשימה של אלמנטים (כפתורי CTA, קוביות תוכן, שאלות נפוצות), תמצאי חצים של ▲ ו-▼. לחיצה על החץ למעלה תזיז את הפריט מקום אחד קדימה בסדר ההופעה באתר. זכרי ללחוץ על "שמירה" בתחתית העמוד לאחר סידור האלמנטים.',
      }
    ]
  },
  {
    id: 'blocks',
    title: 'ניהול קוביות תוכן (Features)',
    icon: <Box className="text-primary" />,
    content: [
      {
        sub: 'מהן קוביות תוכן?',
        text: 'קוביות תוכן הן אלמנטים מעוצבים המורכבים מאייקון, כותרת ותיאור קצר. הן מצוינות להצגת שירותים, יתרונות או שלבים בתהליך הטיפולי.',
      },
      {
        sub: 'איך בוחרים אייקון?',
        text: 'בזמן הוספת קובייה, תוכלי לבחור אייקון מתוך רשימה סגורה: לב (Heart), כוכבים (Sparkles), מסלול (Orbit), מצפן (Compass), אנשים (Users) או כוכב (Star). כל אייקון משדר תחושה אחרת של ריפוי ומודעות.',
      }
    ]
  },
  {
    id: 'images',
    title: 'תמונות ו-Cloudinary',
    icon: <ImageIcon className="text-primary" />,
    content: [
      {
        sub: 'מה זה לינק לתמונה (URL)?',
        text: 'URL הוא "כתובת המגורים" של התמונה באינטרנט. כדי שהאתר יציג תמונה, הוא צריך לדעת איפה היא נמצאת. כתובת תקינה תמיד תתחיל ב-https:// ותסתיים בסיומת של קובץ תמונה (כמו .jpg או .png).',
      },
      {
        sub: 'איך להשתמש ב-Cloudinary?',
        text: 'העלי את התמונה שבחרת לחשבון ה-Cloudinary שלך. לאחר ההעלאה, עמדי על התמונה ולחצי על אייקון השרשרת (Copy Link). את הלינק שהועתק הדביקי בשדה המתאים במערכת הניהול שלנו.',
      },
      {
        sub: 'תמונת דסקטופ מול מובייל',
        text: 'האתר מאפשר לך להגדיר תמונה שונה לכל מכשיר. מומלץ להשתמש בתמונות לרוחב (Horizontal) למחשב, ובתמונות לאורך (Vertical) לטלפון הנייד כדי שהחיתוך יהיה מושלם.',
      }
    ]
  },
  {
    id: 'branding',
    title: 'עיצוב, מיתוג ו-SEO',
    icon: <Palette className="text-primary" />,
    content: [
      {
        sub: 'שינוי צבע המותג',
        text: 'תחת "הגדרות עיצוב" בניהול הדפים, תוכלי לבחור את הגוון הראשי של האתר. שינוי הצבע ישפיע באופן מיידי על כל הכפתורים, האייקונים והעיטורים בכל דפי האתר.',
      },
      {
        sub: 'מה זה SEO ולמה זה חשוב?',
        text: 'SEO הוא האופן שבו גוגל קורא את האתר שלך. בניהול כל עמוד תמצאי שדות של "כותרת גוגל" ו"תיאור גוגל". מילוי השדות האלו במילים הנכונות (כמו "טיפול רגשי בטבעון") יעזור למטופלות חדשות למצוא אותך בחיפוש.',
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
            <p className="text-stone-500 font-headline">כל המידע שאת צריכה כדי לנהל את BeinMe בצורה מקצועית.</p>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300 size-5" />
            <Input 
              placeholder="חפשי נושא עזרה (למשל: סיסמה, תמונות...)" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-12 h-12 bg-white border-none shadow-sm rounded-none font-headline"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {filteredTopics.length === 0 ? (
              <div className="text-center py-20 bg-white shadow-sm">
                <HelpCircle className="mx-auto size-12 text-stone-200 mb-4" />
                <p className="text-xl text-stone-400 font-headline">לא מצאנו תוצאות לחיפוש שלך...</p>
              </div>
            ) : filteredTopics.map((topic) => (
              <Card key={topic.id} className="border-none shadow-xl rounded-none overflow-hidden">
                <CardHeader className="bg-stone-50/50 border-b border-stone-100 py-6">
                  <CardTitle className="flex items-center gap-4 text-2xl font-headline text-accent">
                    <span className="p-2 bg-white rounded-sm shadow-sm">{topic.icon}</span>
                    {topic.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-8">
                  <Accordion type="multiple" className="w-full">
                    {topic.content.map((item, idx) => (
                      <AccordionItem key={idx} value={`${topic.id}-${idx}`} className="border-b border-stone-50 last:border-0 pb-2">
                        <AccordionTrigger className="text-lg font-headline font-bold text-stone-700 hover:text-primary text-right py-4 hover:no-underline">
                          {item.sub}
                        </AccordionTrigger>
                        <AccordionContent className="text-base font-headline text-stone-500 leading-relaxed py-4 pr-4 border-r-2 border-primary/10">
                          {item.text}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar / Quick Tips */}
          <div className="lg:col-span-4 space-y-8">
            <Card className="bg-accent text-white border-none rounded-none p-8">
              <h3 className="text-2xl font-handwriting mb-6">טיפ מקצועי</h3>
              <p className="font-headline font-light leading-relaxed opacity-90">
                זכרי שפחות זה יותר. בעת כתיבת עמודי השירות, השתמשי במשפטים קצרים ומרווחים גדולים בין פסקאות. זה עוזר למטופלות לנשום בזמן הקריאה.
              </p>
            </Card>

            <Card className="border-none shadow-lg rounded-none p-8 space-y-6">
              <h3 className="text-xl font-headline font-bold text-accent border-b border-stone-100 pb-4">אייקונים זמינים</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'Heart', icon: <Heart /> },
                  { name: 'Sparkles', icon: <Sparkles /> },
                  { name: 'Orbit', icon: <Orbit /> },
                  { name: 'Compass', icon: <Compass /> },
                  { name: 'Users', icon: <Users /> },
                  { name: 'Star', icon: <Star /> },
                ].map((icon, i) => (
                  <div key={i} className="flex items-center gap-3 text-stone-400">
                    <div className="p-2 bg-stone-50 text-primary">{React.cloneElement(icon.icon as React.ReactElement, { size: 16 })}</div>
                    <span className="text-xs uppercase font-bold tracking-tighter">{icon.name}</span>
                  </div>
                ))}
              </div>
            </Card>

            <div className="p-6 border-2 border-dashed border-stone-200 text-center space-y-4">
              <p className="text-sm font-headline text-stone-400 italic">זקוקה לעזרה טכנית נוספת?</p>
              <a href="mailto:support@moranpaz.com" className="block text-primary font-bold hover:underline">
                support@moranpaz.com
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
