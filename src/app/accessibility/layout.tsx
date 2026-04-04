import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'הצהרת נגישות | BeinMe מורן פז',
  description: 'הצהרת הנגישות של אתר BeinMe — מורן פז. האתר פועל לפי תקן נגישות ישראלי WCAG 2.1 AA.',
  alternates: { canonical: 'https://www.moranpaz.co.il/accessibility' },
};

export default function AccessibilityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
