import type { Metadata } from 'next';
import { Bangers, Hind_Siliguri } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SkipLink } from '@/components/ui/SkipLink';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { BUSINESS_HOURS, SITE } from '@/lib/constants';
import { SITE_URL } from '@/lib/site';
import './globals.css';

const bangers = Bangers({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bangers',
  display: 'swap',
});

const hind = Hind_Siliguri({
  subsets: ['latin', 'bengali'],
  weight: ['400', '600', '700'],
  variable: '--font-hind',
  display: 'swap',
});

const OG_IMAGE = `${SITE_URL}/logo.svg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Hungryana | Multi-Cuisine Restaurant | Kirnahar, Birbhum',
    template: '%s | Hungryana',
  },
  description:
    'Hungryana — Eat Hearty, Stay Hungry. Multi-cuisine restaurant in Kirnahar, Birbhum. Biryani, Pizza, Indian, Chinese, Pasta & more.',
  keywords: [
    'Hungryana',
    'Kirnahar restaurant',
    'Birbhum food',
    'multi-cuisine restaurant',
    'biryani Kirnahar',
    'restaurant near me Birbhum',
  ],
  authors: [{ name: 'Hungryana' }],
  creator: 'Hungryana',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Hungryana | Kirnahar, Birbhum',
    description: 'Eat Hearty, Stay Hungry — Multi-cuisine dining in Kirnahar, Birbhum.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Hungryana',
    url: SITE_URL,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Hungryana Restaurant' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hungryana | Kirnahar, Birbhum',
    description: 'Multi-cuisine restaurant in Kirnahar, Birbhum — Biryani, Pizza, Indian & Chinese.',
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/logo.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/logo.svg' }],
  },
};

function buildRestaurantSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: SITE.name,
    alternateName: SITE.nameBengali,
    description: 'Multi-cuisine restaurant in Kirnahar, Birbhum, West Bengal.',
    url: SITE_URL,
    email: SITE.email,
    telephone: SITE.phone,
    image: OG_IMAGE,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.locality,
      addressLocality: SITE.locality,
      addressRegion: 'West Bengal',
      postalCode: '731302',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 23.758,
      longitude: 87.869,
    },
    servesCuisine: ['Indian', 'Chinese', 'Italian', 'Bengali', 'Mughlai'],
    priceRange: '₹',
    openingHoursSpecification: BUSINESS_HOURS.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.day.split('–')[0].trim(),
      opens: '11:00',
      closes: '23:00',
    })),
    menu: `${SITE_URL}/menu`,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bangers.variable} ${hind.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildRestaurantSchema()) }}
        />
      </head>
      <body className="font-body antialiased">
        <SkipLink />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
