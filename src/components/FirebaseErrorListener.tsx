
'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useToast } from '@/hooks/use-toast';

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handlePermissionError = (error: FirestorePermissionError) => {
      toast({
        variant: "destructive",
        title: "שגיאת הרשאות בפיירבייס",
        description: `אין לך הרשאה לבצע את הפעולה: ${error.context.operation} בנתיב ${error.context.path}. וודאי שאת מחוברת כאדמין.`,
      });
      
      // Also throw to trigger Next.js error overlay in development
      throw error;
    };

    errorEmitter.on('permission-error', handlePermissionError);
    return () => {
      errorEmitter.off('permission-error', handlePermissionError);
    };
  }, [toast]);

  return null;
}
