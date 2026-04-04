import { SITE_URL } from '@/lib/site-config';
import type { Metadata } from 'next';
import { fetchPageMeta } from '@/lib/page-meta';

const DEFAULTS = {
  title: 'טיפול רגשי בעמק יזרעאל | מורן פז BeinMe',
  description: 'פסיכותרפיה הוליסטית לנשים ונוער בעמק יזרעאל. מורן פז — עבודה עם גוף, נפש ורוח. פגישות בקליניקה ובאונליין. קביעה בוואטסאפ.',
};

export async function generateMetadata(): Promise<Metadata> {
  const meta = await fetchPageMeta('emeq-izrael', DEFAULTS);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: 'https://www.moranpaz.co.il/emeq-izrael' },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: 'https://www.moranpaz.co.il/emeq-izrael',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
  };
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['MedicalBusiness', 'LocalBusiness'],
  name: 'מורן פז BeinMe — פסיכותרפיה הוליסטית עמק יזרעאל',
  description: 'טיפול רגשי הוליסטי לנשים ונוער בעמק יזרעאל. פסיכותרפיסטית מורן פז בגישת גוף-נפש-רוח.',
  url: 'https://www.moranpaz.co.il/emeq-izrael',
  telephone: '+972507817338',
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'עמק יזרעאל',
    addressCountry: 'IL',
  },
  areaServed: ['עמק יזרעאל', 'יוקנעם', 'קיבוץ יגור', 'נצרת עילית', 'מגדל העמק', 'עפולה'],
  medicalSpecialty: 'Psychiatry',
  priceRange: '₪₪',
  sameAs: [SITE_URL],
};

export default function EmeqLayout({ children }: { children: React.ReactNode }) {
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
