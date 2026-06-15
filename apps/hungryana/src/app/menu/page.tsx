import { FullMenu } from '@/components/sections/FullMenu';
import { LogoImage } from '@/components/ui/LogoImage';
import { SITE } from '@/lib/constants';

export const metadata = {
  title: 'Menu | Hungryana — Kirnahar, Birbhum',
  description: 'Full menu with prices — Biryani, Pizza, Indian, Chinese, Pasta & more at Hungryana.',
};

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-black pt-28 pb-16">
      <div className="mx-auto mb-8 flex flex-col items-center px-5">
        <LogoImage size="hero" className="logo-glow" />
        <p className="mt-4 font-display text-xl tracking-wide text-gold text-shadow-brand">
          {SITE.tagline}
        </p>
        <p className="mt-1 text-sm text-cream/60">
          {SITE.locality}, {SITE.district}
        </p>
      </div>
      <FullMenu />
    </div>
  );
}
