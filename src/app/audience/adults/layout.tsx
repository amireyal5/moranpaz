import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'טיפול רגשי למבוגרים | מורן פז BeinMe',
  description: 'פסיכותרפיה הוליסטית למבוגרים המחפשים עוגן ובהירות בחיים. עבודה עם דפוסים, חרדה ותקיעות. מורן פז — טבעון, עמק יזרעאל ואונליין.',
  alternates: { canonical: 'https://www.moranpaz.co.il/audience/adults' },
};

export default function AdultsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
