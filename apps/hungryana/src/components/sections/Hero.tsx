'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { LogoImage } from '@/components/ui/LogoImage';
import { IMAGES } from '@/lib/images';
import { SITE } from '@/lib/constants';

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % IMAGES.hero.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
      aria-label="Hero banner"
    >
      <AnimatePresence mode="sync">
        {IMAGES.hero.map((src, index) =>
          index === currentSlide ? (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
            >
              <Image
                src={src}
                alt="Multi-cuisine dishes at Hungryana, Kirnahar"
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-red-maroon/40 to-black" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />

      <div className="relative z-10 mx-auto max-w-5xl px-5 pt-28 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <LogoImage size="xl" className="logo-glow" priority />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="font-display text-xl tracking-wide text-gold text-shadow-brand md:text-2xl"
        >
          {SITE.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-red/40 bg-black/50 px-4 py-1.5 text-sm text-cream/80 backdrop-blur-sm"
        >
          <MapPin className="h-3.5 w-3.5 text-gold" />
          {SITE.locality}, {SITE.district}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="mt-8 font-display text-4xl leading-tight text-warm-white text-shadow-brand sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Taste of{' '}
          <span className="text-gradient-gold">Every Cuisine</span>
          <br />
          Under One Roof
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-cream/85 md:text-lg"
        >
          Biryani, Pizza, Indian, Chinese, Pasta &amp; more — now serving{' '}
          <strong className="text-gold">{SITE.locality}</strong>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button href="#full-menu" variant="primary" ariaLabel="View our menu">
            View Menu
          </Button>
          <Button href="#contact" variant="outline" ariaLabel="Reserve a table">
            Reserve Table
          </Button>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-gold transition-colors hover:text-gold-light"
        aria-label="Scroll to about section"
      >
        <ChevronDown className="h-8 w-8 animate-bounce" />
      </motion.a>

      <div className="absolute bottom-8 right-8 z-10 hidden gap-2 md:flex" role="group" aria-label="Hero image slides">
        {IMAGES.hero.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? 'w-8 bg-red' : 'w-2 bg-cream/30'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
