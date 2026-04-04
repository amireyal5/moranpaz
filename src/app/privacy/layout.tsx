import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'מדיניות פרטיות | BeinMe מורן פז',
  description: 'מדיניות הפרטיות של אתר BeinMe — מורן פז. מידע על איסוף נתונים, שמירת פרטיות המטופלים וזכויות המשתמש.',
  robots: { index: false },
  alternates: { canonical: 'https://www.moranpaz.co.il/privacy' },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
