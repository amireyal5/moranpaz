
'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

export type PortraitShape = 'circle' | 'rectangle' | 'square';

interface PortraitImageProps {
  src?: string | null;
  loading?: boolean;
  shape?: PortraitShape;
  alt?: string;
  className?: string;
}

const SHAPE_CLASSES: Record<PortraitShape, string> = {
  circle:    'rounded-full w-32 h-32 md:w-48 md:h-48 border-4 border-white shadow-xl',
  rectangle: 'aspect-[3/4] w-full border-4 sm:border-8 border-background shadow-2xl',
  square:    'aspect-square w-full border-4 border-background shadow-xl',
};

export function PortraitImage({
  src,
  loading = false,
  shape = 'circle',
  alt = 'תמונת פורטרט',
  className,
}: PortraitImageProps) {
  return (
    <div className={cn('shrink-0 relative overflow-hidden', SHAPE_CLASSES[shape], className)}>
      {loading ? (
        <div className="absolute inset-0 bg-stone-200 animate-pulse" />
      ) : src ? (
        <Image src={src} alt={alt} fill className="object-cover" />
      ) : (
        <div className="absolute inset-0 bg-stone-100" />
      )}
    </div>
  );
}
