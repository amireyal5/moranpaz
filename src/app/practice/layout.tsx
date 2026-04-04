import { SITE_URL } from '@/lib/site-config';
import type { Metadata } from 'next';
import { fetchPageMeta } from '@/lib/page-meta';

const DEFAULTS = {
  title: 'הגישה הטיפולית — פסיכותרפיה הוליסטית | BeinMe',
  description: 'גישת BeinMe של מורן פז: עבודה עם גוף, נפש ורוח לריפוי עמוק. טיפול בחרדה, תקיעות, דימוי עצמי ומערכות יחסים. מה זה אומר בפועל?',
};

export async function generateMetadata(): Promise<Metadata> {
  const meta = await fetchPageMeta('practice', DEFAULTS);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: 'https://www.moranpaz.co.il/practice' },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: 'https://www.moranpaz.co.il/practice',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
  };
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'מורן פז BeinMe — פסיכותרפיה הוליסטית',
    description: 'גישת BeinMe לפסיכותרפיה הוליסטית: עבודה משולבת עם גוף, נפש ורוח. מתמחה בחרדה, תקיעות, דימוי עצמי ומערכות יחסים.',
    url: 'https://www.moranpaz.co.il/practice',
    telephone: '+972507817338',
    medicalSpecialty: 'Psychiatry',
    sameAs: [SITE_URL],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'מה זה פסיכותרפיה הוליסטית?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'פסיכותרפיה הוליסטית היא גישה טיפולית הרואה באדם שלם — גוף, נפש ורוח. בניגוד לטיפול דיבורי בלבד, אנחנו עובדים גם עם תחושות גופניות, רגשות ותכנים חווייתיים כדי לייצר שינוי עמוק ואמיתי.',
        },
      },
      {
        '@type': 'Question',
        name: 'כיצד נראה תהליך הטיפול עם מורן פז?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'הטיפול מתחיל בשיחת היכרות ומיפוי. לאחר מכן בונים יחד מפת דרכים אישית הכוללת עבודה עם דפוסים, חלקים חבויים וחיבור לסמכות הפנימית. כל מפגש הוא 60 דקות.',
        },
      },
      {
        '@type': 'Question',
        name: 'במה מתמחה הטיפול אצל מורן פז?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'הטיפול מתמחה בחרדה ומתח, תקיעות בחיים, דימוי עצמי נמוך ומערכות יחסים. הגישה משלבת עבודת צללים, ילדה פנימית, פוקוסינג ומיינדפולנס.',
        },
      },
      {
        '@type': 'Question',
        name: 'האם הטיפול מתאים גם לנוער?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'כן. מורן פז מתמחה גם בליווי נוער, עם גישה מותאמת לגיל המשלבת כלים יצירתיים וחווייתיים.',
        },
      },
    ],
  },
];

export default function PracticeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
