import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SITE_URL } from '@/lib/site';
import { buildWebsiteSchema, buildPersonSchema } from '@/lib/seo';
import { SITE } from '@/lib/constants';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} | Salesforce Interview Prep & Architecture`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.subtitle,
  keywords: [
    'Salesforce interview questions',
    'Agentforce',
    'Data Cloud',
    'Apex interview',
    'LWC interview',
    'Salesforce architecture',
    'Solution Architect',
  ],
  authors: [{ name: SITE.owner, url: SITE.linkedin }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: SITE.name,
    images: [{ url: '/logo.png', width: 512, height: 512, alt: SITE.name }],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/logo-icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/logo.png' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify([buildWebsiteSchema(), buildPersonSchema()]),
            }}
          />
        </head>
        <body className="font-body antialiased">
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
