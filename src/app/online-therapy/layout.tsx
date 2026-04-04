import { SITE_URL } from '@/lib/site-config';
import type { Metadata } from 'next';
import { fetchPageMeta } from '@/lib/page-meta';

const DEFAULTS = {
  title: 'טיפול נפשי אונליין | מורן פז BeinMe',
  description: 'פסיכותרפיה הוליסטית אונליין לישראלים בארץ ובחו״ל. מורן פז — ליווי רגשי עמוק מהבית, בפרטיות מלאה. נגיש, גמיש ומכיל.',
};

export async function generateMetadata(): Promise<Metadata> {
  const meta = await fetchPageMeta('online', DEFAULTS);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: 'https://www.moranpaz.co.il/online-therapy' },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: 'https://www.moranpaz.co.il/online-therapy',
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
  '@type': 'MedicalBusiness',
  name: 'מורן פז BeinMe — פסיכותרפיה הוליסטית אונליין',
  description: 'טיפול רגשי הוליסטי אונליין לישראלים בארץ ובחו״ל. פגישות דרך זום בפרטיות ונוחות מלאה.',
  url: 'https://www.moranpaz.co.il/online-therapy',
  telephone: '+972507817338',
  medicalSpecialty: 'Psychiatry',
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceType: 'טיפול אונליין',
    availableLanguage: 'Hebrew',
    serviceUrl: 'https://www.moranpaz.co.il/online-therapy',
  },
  areaServed: { '@type': 'Country', name: 'Israel' },
  sameAs: [SITE_URL],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'שירותי פסיכותרפיה אונליין',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'פסיכותרפיה הוליסטית אונליין',
          description: 'מפגש טיפולי של 60 דקות דרך זום',
        },
      },
    ],
  },
};

export default function OnlineTherapyLayout({ children }: { children: React.ReactNode }) {
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
