'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, SITE } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { LogoImage } from '@/components/ui/LogoImage';
import clsx from 'clsx';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled ? 'glass py-2 shadow-lg shadow-red/20' : 'bg-black/40 py-3 backdrop-blur-sm'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <Link href="#home" className="group flex shrink-0 items-center" aria-label={`${SITE.name} home`}>
          <LogoImage size="lg" className="logo-glow transition-transform group-hover:scale-105" />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-7 lg:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-base tracking-wide text-cream/85 transition-colors hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="#contact" variant="primary" ariaLabel="Reserve a table">
            Reserve Table
          </Button>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-gold transition-colors hover:bg-red/20 lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass overflow-hidden lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-4 py-3 font-display text-lg tracking-wide text-cream transition-colors hover:bg-red/15 hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 px-4">
                <Button href="#contact" variant="primary" ariaLabel="Reserve a table">
                  Reserve Table
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
