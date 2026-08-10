"use client";

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-56 pb-32 px-4 md:px-8 xl:px-24">
        <div className="max-w-4xl mx-auto text-right">
          <SectionTitle subtitle="Legal" title="מדיניות פרטיות" />
          
          <div className="boutique-para space-y-12 mt-16 text-stone-700 leading-relaxed font-light">
            <p className="text-xl text-stone-600">
              פרטיותכם חשובה לנו מאוד. מסמך זה מפרט כיצד אנו אוספים, משתמשים ומגנים על המידע שלכם בעת הביקור והשימוש באתר של מורן פז — BeinMe (להלן: "האתר"). המדיניות מנוסחת בהתאם לחוק הגנת הפרטיות, התשמ"א-1981 ותיקון 13 לחוק (נכון לאוגוסט 2025).
            </p>

            <div className="space-y-4">
              <h3 className="text-2xl font-headline font-bold text-accent">1. מנהל מאגר המידע</h3>
              <p>
                האתר מופעל ומנוהל על ידי מורן פז, פסיכותרפיסטית הוליסטית, מרחובות/קריית טבעון (להלן: "מפעילת האתר"). בכל שאלה הנוגעת לפרטיות או להגנת המידע, ניתן לפנות אלינו במייל: <a href="mailto:moraniva5@gmail.com" className="text-primary hover:underline font-normal">moraniva5@gmail.com</a>.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-headline font-bold text-accent">2. המידע הנאסף באתר ומטרתו</h3>
              <p>אנו אוספים מידע בשתי דרכים עיקריות:</p>
              <ul className="list-disc list-inside space-y-2 pr-4 text-stone-600">
                <li>
                  <strong>מידע הנמסר על ידך מרצונך החופשי:</strong> בעת מילוי טופס יצירת הקשר באתר (לתיאום פגישה או שיחת היכרות), הנך מתבקש/ת למסור פרטים כגון שם מלא, כתובת דואר אלקטרוני, מספר טלפון ותוכן הפנייה הכללי שלך. מידע זה משמש אך ורק לצורך חזרה אלייך, מתן מענה לפנייתך ותיאום המפגשים.
                </li>
                <li>
                  <strong>מידע טכנולוגי אנונימי (Cookies):</strong> בעת הגלישה באתר, אנו אוספים מידע סטטיסטי אנונימי (כגון דפים שבהם ביקרת, משך השהות באתר, סוג הדפדפן ומקור ההגעה לאתר) לצורך שיפור ביצועי האתר והתאמת התכנים.
                </li>
              </ul>
            </div>

            {/* Crucial Notice regarding Clinical Files */}
            <div className="p-6 md:p-8 bg-stone-50 border border-stone-100 rounded-sm space-y-3">
              <h4 className="text-xl font-headline font-bold text-accent flex items-center gap-2">
                📢 הצהרה חשובה בעניין סודיות ותיעוד טיפולי
              </h4>
              <p className="text-stone-700 text-sm md:text-base font-light leading-relaxed">
                <strong>חשוב מאוד להבהיר:</strong> אתר זה הינו אתר תדמיות ויצירת קשר בלבד. <strong>אין באתר זה שום ניהול, שמירה או תיעוד של תיקים טיפוליים, סיכומי פגישות, אבחונים או כל מידע רפואי-קליני-רגשי אחר</strong> שנאסף במהלך המפגשים הטיפוליים עצמם.
              </p>
              <p className="text-stone-600 text-sm font-light">
                כל התיעוד הטיפולי והקליני מנוהל בנפרד לחלוטין משרתי האתר ומסד הנתונים שלו, ומאוחסן באופן מאובטח וחסוי בקליניקה הפיזית של מורן פז, בהתאם לחובות הסודיות המקצועיות החלות על מטפלים על פי דין (לרבות חוק זכויות החולה וחוק הפסיכולוגים) ותחת כללי אתיקה מקצועית מחמירים.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-headline font-bold text-accent">3. קובצי עוגיות (Cookies) וכלים דיגיטליים</h3>
              <p>
                האתר עושה שימוש בקובצי עוגיות (Cookies). בהתאם להנחיות החדשות של תיקון 13, האתר מפעיל מנגנון ניהול הסכמה (CMP) החוסם בפועל את כל קובצי העוגיות שאינם חיוניים עד לקבלת הסכמתך האקטיבית.
              </p>
              <p>חלוקת העוגיות באתר:</p>
              <ul className="list-disc list-inside space-y-2 pr-4 text-stone-600">
                <li>
                  <strong>עוגיות חיוניות (Essential):</strong> קבצים הנדרשים לתפקודו הבסיסי והבטוח של האתר (כמו זכירת בחירת העוגיות שלך, תפעול תפריט הצד או כניסת ניהול). קבצים אלו פועלים תמיד.
                </li>
                <li>
                  <strong>עוגיות אנליטיות (Analytics):</strong> קבצים המסייעים לנו להבין את דפוסי השימוש באתר (למשל באמצעות Google Analytics) לצורך שיפור ביצועי האתר. קבצים אלו מושבתים כברירת מחדל ויופעלו רק אם תאשר/י זאת.
                </li>
                <li>
                  <strong>עוגיות שיווק (Marketing):</strong> קבצים המאפשרים התאמת תכנים פרסומיים בפלטפורמות חיצוניות (למשל Facebook Pixel). קבצים אלו מושבתים כברירת מחדל ויופעלו רק בהסכמתך.
                </li>
              </ul>
              <p className="pt-2">
                באפשרותך לשנות את העדפות העוגיות שלך בכל עת על ידי לחיצה על הקישור <strong>"הגדרות עוגיות"</strong> המופיע בתחתית כל עמוד (פוטר) באתר.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-headline font-bold text-accent">4. אי-חובה חוקית למסירת מידע</h3>
              <p>
                על פי החוק, לא חלה עליך כל חובה חוקית למסור את פרטייך האישיים באתר. מסירת הפרטים בטופס יצירת הקשר נעשית מרצונך החופשי ובהסכמתך המלאה. עם זאת, אי-מסירת פרטי קשר בסיסיים תמנע ממני את האפשרות לחזור אלייך, להשיב לפנייתך או לתאם עימך שיחת היכרות ומפגש.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-headline font-bold text-accent">5. העברת מידע לצדדים שלישיים</h3>
              <p>
                מפעילת האתר אינה מוכרת, משכירה או מעבירה את פרטייך האישיים לצדדים שלישיים לצרכי שיווק או מסחר. המידע מועבר אך ורק לספקי שירותים מורשים המסייעים לנו בתפעול האתר (כגון שרת אירוח האתר, ומנגנון שליחת טפסי קשר כגון Formspree), הכפופים להתחייבויות סודיות והגנת מידע קפדניות בהתאם לחוק.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-headline font-bold text-accent">6. זכות לעיין במידע, לתקנו או למוחקו</h3>
              <p>
                על פי סעיף 13 לחוק הגנת הפרטיות, התשמ"א-1981, כל אדם שעליו נשמר מידע במאגר מידע, זכאי לעיין במידע זה. 
                אם מצאת שהמידע שנשמר עליך אינו נכון, אינו שלם או אינו מעודכן, הנך רשאי/ת לפנות אלינו בבקשה לתקן את המידע או למוחקו כליל ממאגרי האתר. 
                את הבקשה יש לשלוח לכתובת הדוא"ל: <a href="mailto:moraniva5@gmail.com" className="text-primary hover:underline font-normal">moraniva5@gmail.com</a>, ואנו נטפל בפנייתך בהקדם בהתאם לדרישות החוק.
              </p>
            </div>

            <div className="space-y-4 border-t border-stone-100 pt-8 text-xs text-stone-400">
              <p>מדיניות זו עודכנה לאחרונה באוגוסט 2026. מפעילת האתר רשאית לעדכן את המדיניות מעת לעת בהתאם לשינויי חקיקה או שינויים טכנולוגיים באתר, והנוסח המעודכן יפורסם בדף זה.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
