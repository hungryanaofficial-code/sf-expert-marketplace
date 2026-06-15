/** Production site URL — set NEXT_PUBLIC_SITE_URL in hosting env */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://hungryana.com';
