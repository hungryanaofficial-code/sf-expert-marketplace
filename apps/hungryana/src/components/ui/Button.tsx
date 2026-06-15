'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';
import Link from 'next/link';
import type { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  ariaLabel?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-red text-gold font-display tracking-wider btn-pop hover:bg-red-dark hover:text-gold-light',
  secondary:
    'bg-charcoal-light text-cream border-2 border-red/40 hover:border-gold hover:bg-charcoal font-semibold',
  outline:
    'bg-transparent text-gold border-2 border-gold btn-pop-gold hover:bg-gold hover:text-charcoal-dark font-display tracking-wider',
};

export function Button({
  children,
  href,
  variant = 'primary',
  className,
  onClick,
  type = 'button',
  ariaLabel,
}: ButtonProps) {
  const classes = clsx(
    'inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-base transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
    variants[variant],
    className
  );

  if (href) {
    const isPhoneOrEmail = href.startsWith('tel:') || href.startsWith('mailto:');

    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        {isPhoneOrEmail ? (
          <a href={href} className={classes} aria-label={ariaLabel}>
            {children}
          </a>
        ) : (
          <Link href={href} className={classes} aria-label={ariaLabel}>
            {children}
          </Link>
        )}
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
