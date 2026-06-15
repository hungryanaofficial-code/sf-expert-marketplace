'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { QrCode, Smartphone } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SITE_URL } from '@/lib/site';

export function QRMenu() {
  const [qrSrc, setQrSrc] = useState('/qr-menu.png');
  return (
    <section id="qr-menu" className="section-padding bg-charcoal-dark">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Digital Menu"
          title="Scan & Explore Our Digital Menu"
          subtitle="Scan with your phone to open our full menu instantly."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-gold mx-auto flex max-w-4xl flex-col items-center gap-10 rounded-3xl p-8 md:flex-row md:p-12"
        >
          <div className="relative shrink-0">
            <div className="rounded-2xl border-4 border-red bg-warm-white p-5 shadow-2xl shadow-red/30">
              <Image
                src={qrSrc}
                alt="QR code to browse Hungryana digital menu"
                width={260}
                height={260}
                className="h-[240px] w-[240px] object-contain md:h-[260px] md:w-[260px]"
                onError={() => setQrSrc('/qr-menu.svg')}
              />
            </div>
            <div className="absolute -right-3 -top-3 rounded-full bg-red p-3 text-gold shadow-lg btn-pop">
              <QrCode className="h-6 w-6" />
            </div>
          </div>

          <div className="text-center md:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red/30 bg-red/10 px-4 py-1.5 text-sm text-gold">
              <Smartphone className="h-4 w-4" />
              Contactless Menu
            </div>
            <p className="text-lg leading-relaxed text-cream/80">
              Scan the QR code to open our menu at{' '}
              <span className="text-gold">{SITE_URL}/menu</span>
            </p>
            <Link
              href="/menu"
              className="mt-4 inline-block font-display text-lg tracking-wide text-gold underline-offset-4 hover:text-gold-light hover:underline"
            >
              Or open menu directly →
            </Link>
            <ul className="mt-6 space-y-2 text-left text-sm text-cream/70">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red" />
                Full menu with prices and descriptions
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                Chef specials marked with ★
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                Easy to share with your table
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
