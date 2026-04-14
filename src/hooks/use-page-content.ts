
import { useMemo, useState, useEffect } from 'react';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import { ContentState, getInitialPageContent } from '@/config/page-defaults';

export function usePageContent(pageId: string) {
  const db = useFirestore();
  const contentRef = useMemo(() => db ? doc(db, 'siteContent', pageId) : null, [db, pageId]);
  const { data: pageContent, loading, error } = useDoc<any>(contentRef);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const merged = useMemo(() => {
    const defaults = getInitialPageContent(pageId);
    if (!pageContent) return defaults;

    // We do a deep-ish merge for arrays to ensure they are at least empty arrays and not undefined
    return {
      ...defaults,
      ...pageContent,
      features:     Array.isArray(pageContent.features)     ? pageContent.features     : defaults.features,
      ctaButtons:   Array.isArray(pageContent.ctaButtons)   ? pageContent.ctaButtons   : defaults.ctaButtons,
      testimonials: Array.isArray(pageContent.testimonials) ? pageContent.testimonials : defaults.testimonials,
      faqs:         Array.isArray(pageContent.faqs)         ? pageContent.faqs         : defaults.faqs,
      navItems:     Array.isArray(pageContent.navItems)     ? pageContent.navItems     : defaults.navItems,
    } as ContentState;
  }, [pageContent, pageId]);

  return {
    content: merged,
    loading: loading || !mounted,
    error,
    isRaw: !!pageContent
  };
}
