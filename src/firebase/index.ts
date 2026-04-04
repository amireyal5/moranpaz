
'use client';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeFirestore, getFirestore, persistentLocalCache } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './config';

let _firestore: ReturnType<typeof getFirestore> | null = null;

export function initializeFirebase() {
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  if (!_firestore) {
    try {
      _firestore = initializeFirestore(app, { localCache: persistentLocalCache() });
    } catch {
      _firestore = getFirestore(app);
    }
  }
  const auth = getAuth(app);
  return { app, firestore: _firestore, auth };
}

export * from './provider';
export * from './client-provider';
export * from './auth/use-user';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
