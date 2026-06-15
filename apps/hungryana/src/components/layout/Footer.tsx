import Link from 'next/link';
import { Facebook, Instagram, Mail, Twitter, Youtube } from 'lucide-react';
import { CUISINE_CATEGORIES, NAV_LINKS, SITE, SOCIAL_LINKS } from '@/lib/constants';
import { LogoImage } from '@/components/ui/LogoImage';

const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  youtube: Youtube,
} as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-red/30 bg-black">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="#home" className="inline-flex flex-col items-start gap-2">
              <LogoImage size="xl" className="logo-glow" />
              <p className="font-display text-base tracking-wide text-gold">{SITE.tagline}</p>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-cream/60">
              Multi-cuisine dining in <strong className="text-gold">{SITE.locality}, {SITE.district}</strong>.
              Biryani, Pizza, Indian, Chinese &amp; more under one roof.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-display text-lg font-semibold text-gold">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/70 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-lg font-semibold text-gold">Our Cuisines</h3>
            <ul className="space-y-2">
              {CUISINE_CATEGORIES.map((category) => (
                <li key={category}>
                  <Link
                    href="#full-menu"
                    className="text-sm text-cream/70 transition-colors hover:text-gold"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-xl tracking-wide text-gold text-shadow-brand">Contact Us</h3>
            <p className="mb-3 text-sm text-cream/70">{SITE.address}</p>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-2 text-sm text-cream/70 transition-colors hover:text-gold"
            >
              <Mail className="h-4 w-4 text-gold" />
              {SITE.email}
            </a>
            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = socialIcons[social.icon as keyof typeof socialIcons];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-charcoal-light p-2.5 text-cream/70 transition-all hover:bg-red hover:text-gold"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-red/20 pt-8 md:flex-row">
          <p className="text-sm text-cream/50">
            &copy; {year} {SITE.name} — {SITE.locality}, {SITE.district}
          </p>
          <p className="text-sm text-cream/50">
            Crafted with passion for food lovers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
