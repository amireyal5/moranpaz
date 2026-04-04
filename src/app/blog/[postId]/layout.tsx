import { SITE_URL } from '@/lib/site-config';
import type { Metadata } from 'next';

// Note: dynamic per-post metadata requires migrating BlogPostPage to a server component.
// This layout provides a generic fallback until that migration happens.
export const metadata: Metadata = {
  title: {
    default: 'מאמר | BeinMe — מורן פז',
    template: '%s | BeinMe',
  },
  description: 'מאמר מאת מורן פז — פסיכותרפיסטית הוליסטית. עבודה עם גוף, נפש ורוח לריפוי רגשי עמוק.',
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
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
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.moranpaz.co.il/logo.png',
    },
  },
  inLanguage: 'he',
  isPartOf: {
    '@type': 'Blog',
    name: 'בלוג BeinMe',
    url: 'https://www.moranpaz.co.il/blog',
  },
};

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {children}
    </>
  );
}
