import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { SITE } from '@/lib/constants';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = { sm: 32, md: 40, lg: 56 };

export function Logo({ className, showText = true, size = 'md' }: LogoProps) {
  const px = sizes[size];

  return (
    <Link href="/" className={cn('flex items-center gap-3', className)}>
      <Image
        src="/logo.png"
        alt={SITE.name}
        width={px}
        height={px}
        className="shrink-0"
        priority
      />
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className="font-display text-sm font-bold text-secondary sm:text-base">
            Salesforce
          </span>
          <span className="font-display text-sm font-bold text-secondary sm:text-base">
            decode
          </span>
        </div>
      )}
    </Link>
  );
}
