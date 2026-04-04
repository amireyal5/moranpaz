import { SITE_URL } from '@/lib/site-config';
import type { Metadata } from 'next';
import { fetchPageMeta } from '@/lib/page-meta';

const DEFAULTS = {
  title: 'טיפול רגשי בטבעון | מורן פז BeinMe',
  description: 'פסיכותרפיה הוליסטית בקליניקה שקטה בלב הטבע בטבעון. מורן פז מלווה נשים ונוער בגישת גוף-נפש-רוח. קביעת פגישה בוואטסאפ.',
};

export async function generateMetadata(): Promise<Metadata> {
  const meta = await fetchPageMeta('tivon', DEFAULTS);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: 'https://www.moranpaz.co.il/tivon' },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: 'https://www.moranpaz.co.il/tivon',
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
  name: 'מורן פז BeinMe — פסיכותרפיה הוליסטית טבעון',
  description: 'טיפול רגשי הוליסטי בקליניקה בטבעון. פסיכותרפיסטית מורן פז מלווה נשים ונוער בגישת גוף-נפש-רוח.',
  url: 'https://www.moranpaz.co.il/tivon',
  telephone: '+972507817338',
  image: 'https://www.moranpaz.co.il/images/clinic-tivon.jpg',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'טבעון',
    addressRegion: 'מחוז חיפה',
    addressCountry: 'IL',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 32.722,
    longitude: 35.122,
  },
  areaServed: ['טבעון', 'קריית טבעון', 'עמק יזרעאל'],
  medicalSpecialty: 'Psychiatry',
  priceRange: '₪₪',
  openingHours: 'Mo-Fr 09:00-20:00',
  sameAs: [SITE_URL],
};

export default function TivonLayout({ children }: { children: React.ReactNode }) {
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
