import Link from 'next/link';
import { Linkedin, Mail } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { NAV_LINKS, SITE } from '@/lib/constants';
import { CATEGORIES } from '@/data/categories';

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted">
              Architect-level Salesforce interview prep, real scenarios, and career guidance by{' '}
              {SITE.owner}.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white p-2 text-muted shadow-sm transition-colors hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="rounded-lg bg-white p-2 text-muted shadow-sm transition-colors hover:text-primary"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-secondary">Navigation</h4>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-secondary">Topics</h4>
            <ul className="mt-4 space-y-2">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/interview/topics/${cat.slug}`}
                    className="text-sm text-muted hover:text-primary"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-secondary">Resources</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/blog" className="text-sm text-muted hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted hover:text-primary">
                  About Avijit
                </Link>
              </li>
              <li>
                <Link href="/interview" className="text-sm text-muted hover:text-primary">
                  All Questions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted">
          © {new Date().getFullYear()} {SITE.name}. Built by {SITE.owner}.
        </div>
      </div>
    </footer>
  );
}
