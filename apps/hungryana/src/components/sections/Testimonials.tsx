'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TESTIMONIALS } from '@/data/testimonials';

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const navigate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrent((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
    },
    []
  );

  useEffect(() => {
    const timer = setInterval(() => navigate(1), 6000);
    return () => clearInterval(timer);
  }, [navigate]);

  const testimonial = TESTIMONIALS[current];

  return (
    <section id="testimonials" className="section-padding bg-charcoal">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Guest Reviews"
          title="What Our Customers Say"
          subtitle="Real stories from food lovers who've experienced Hungryana."
        />

        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction >= 0 ? 60 : -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction >= 0 ? -60 : 60 }}
              transition={{ duration: 0.4 }}
              className="glass-gold rounded-3xl p-8 md:p-12"
            >
              <Quote className="mb-4 h-10 w-10 text-gold/40" aria-hidden="true" />

              <div className="mb-4 flex gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                ))}
              </div>

              <blockquote className="text-lg leading-relaxed text-cream/90 md:text-xl">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 font-semibold text-gold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-display font-semibold text-warm-white">{testimonial.name}</p>
                  <p className="text-sm text-cream/60">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-full bg-charcoal-light p-2.5 text-cream transition-colors hover:bg-gold hover:text-charcoal-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={index === current}
                  onClick={() => {
                    setDirection(index > current ? 1 : -1);
                    setCurrent(index);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === current ? 'w-8 bg-gold' : 'w-2 bg-cream/30 hover:bg-cream/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => navigate(1)}
              className="rounded-full bg-charcoal-light p-2.5 text-cream transition-colors hover:bg-gold hover:text-charcoal-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
