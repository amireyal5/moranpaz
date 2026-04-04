/**
 * Central site configuration.
 * Set NEXT_PUBLIC_SITE_URL in .env to override (e.g. staging domain).
 * Falls back to the permanent production domain.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://www.moranpaz.co.il';

export const SITE_NAME = 'BeinMe - מורן פז';
export const SITE_PHONE = '+972507817338';
