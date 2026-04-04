import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'תנאי שימוש | BeinMe מורן פז',
  description: 'תנאי השימוש באתר BeinMe — מורן פז. הגדרת הסכמים, אחריות ומגבלות שימוש בשירותי האתר.',
  robots: { index: false },
  alternates: { canonical: 'https://www.moranpaz.co.il/terms' },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
