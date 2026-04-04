import { SITE_URL } from '@/lib/site-config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'בלוג | מורן פז BeinMe — מאמרים על ריפוי רגשי',
  description: 'מאמרים בעברית על פסיכותרפיה הוליסטית, עבודה עם גוף-נפש-רוח, חרדה, סמכות פנימית וצמיחה רגשית. מאת מורן פז.',
  alternates: { canonical: 'https://www.moranpaz.co.il/blog' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'בלוג BeinMe — מורן פז',
  description: 'מאמרים על פסיכותרפיה הוליסטית, ריפוי רגשי וצמיחה אישית',
  url: 'https://www.moranpaz.co.il/blog',
  author: {
    '@type': 'Person',
    name: 'מורן פז',
    jobTitle: 'פסיכותרפיסטית הוליסטית',
    url: 'https://www.moranpaz.co.il/about',
  },
  publisher: {
    '@type': 'Organization',
    name: 'BeinMe',
    url: SITE_URL,
  },
  inLanguage: 'he',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
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
