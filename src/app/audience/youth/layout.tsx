import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'טיפול רגשי לנוער | מורן פז BeinMe',
  description: 'ליווי רגשי לנוער בגישה חוויתית ומותאמת גיל. מורן פז מלווה בני נוער בתקופות של תקיעות, חרדה ומעברים. טבעון ואונליין.',
  alternates: { canonical: 'https://www.moranpaz.co.il/audience/youth' },
};

export default function YouthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
