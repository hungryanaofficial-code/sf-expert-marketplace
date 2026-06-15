'use client';

import Image from 'next/image';
import { useState } from 'react';
import clsx from 'clsx';

interface LogoImageProps {
  size?: 'sm' | 'md' | 'lg' | 'hero' | 'xl';
  className?: string;
  priority?: boolean;
}

const sizes = {
  sm: { w: 120, h: 56, cls: 'h-12 w-auto max-w-[130px]' },
  md: { w: 180, h: 80, cls: 'h-16 w-auto max-w-[180px] md:h-[72px] md:max-w-[220px]' },
  lg: { w: 220, h: 96, cls: 'h-20 w-auto max-w-[220px] md:h-24 md:max-w-[280px]' },
  hero: { w: 360, h: 160, cls: 'h-36 w-auto max-w-[340px] sm:h-40 sm:max-w-[400px] md:h-48 md:max-w-[480px]' },
  xl: { w: 420, h: 180, cls: 'h-44 w-auto max-w-[420px] md:h-52 md:max-w-[520px]' },
};

export function LogoImage({ size = 'md', className, priority = false }: LogoImageProps) {
  const [src, setSrc] = useState('/logo.png');
  const { w, h, cls } = sizes[size];

  return (
    <Image
      src={src}
      alt="Hungryana logo"
      width={w}
      height={h}
      className={clsx(cls, 'object-contain logo-glow', className)}
      onError={() => setSrc('/logo.svg')}
      priority={priority}
    />
  );
}
