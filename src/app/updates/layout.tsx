import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'עדכונים ומאמרים | BeinMe מורן פז',
  description: 'עדכונים, תובנות ומאמרים מאת מורן פז על פסיכותרפיה הוליסטית, ריפוי רגשי וצמיחה אישית.',
  alternates: { canonical: 'https://www.moranpaz.co.il/updates' },
};

export default function UpdatesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
