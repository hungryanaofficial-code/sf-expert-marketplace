'use client';

import { MessageCircle } from 'lucide-react';
import { SITE } from '@/lib/constants';

function phoneToWhatsApp(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return digits.startsWith('91') ? digits : `91${digits}`;
}

export function WhatsAppButton() {
  const waUrl = `https://wa.me/${phoneToWhatsApp(SITE.phone)}?text=${encodeURIComponent(
    'Hi Hungryana! I would like to place an order or reserve a table.'
  )}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold btn-pop"
      aria-label="Order or chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" fill="currentColor" />
    </a>
  );
}
