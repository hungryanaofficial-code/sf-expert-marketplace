'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WHY_CHOOSE } from '@/lib/images';

export function WhyChoose() {
  return (
    <section id="why-us" className="section-padding bg-charcoal">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="The Hungryana Difference"
          title="Why Choose Hungryana"
          subtitle="Every detail is designed to deliver an exceptional dining experience."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ scale: 1.02 }}
              className="glass group rounded-2xl p-6 transition-colors hover:border-gold/30"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 transition-colors group-hover:bg-gold/20">
                <Check className="h-6 w-6 text-gold" strokeWidth={2.5} />
              </div>
              <h3 className="font-display text-lg font-semibold text-warm-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/65">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
