'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { Leaf, Heart, Shield, Users } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { IMAGES } from '@/lib/images';
import { SITE } from '@/lib/constants';

const highlights = [
  { icon: Leaf, label: 'Fresh Ingredients' },
  { icon: Heart, label: 'Premium Dining' },
  { icon: Shield, label: 'Hygienic Kitchen' },
  { icon: Users, label: 'Family Friendly' },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="about" ref={ref} className="section-padding bg-black">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Our Story"
          title="Welcome to Hungryana"
          subtitle="Where every plate tells a story of passion, tradition, and culinary excellence."
        />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            style={{ y: imageY }}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl"
          >
            <Image
              src={IMAGES.about}
              alt="Premium dining experience at Hungryana restaurant"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-gold/20 ring-inset" />
            <div className="glass-gold absolute -bottom-6 -right-6 hidden rounded-xl p-6 md:block">
              <p className="font-display text-3xl font-bold text-gold">8+</p>
              <p className="text-sm text-cream/70">Cuisine Categories</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-base leading-relaxed text-cream/80 md:text-lg">
              Born from a love for diverse flavours, <strong className="text-gold">Hungryana</strong>{' '}
              brings the best of Indian, Chinese, Italian, and global comfort food to{' '}
              <strong className="text-red">{SITE.locality}, {SITE.district}</strong>. We believe
              great food should be an experience — not just a meal.
            </p>
            <p className="mt-4 text-base leading-relaxed text-cream/80 md:text-lg">
              From our signature Royal Dum Biryani to handcrafted pizzas and wok-tossed noodles,
              every dish is prepared with fresh ingredients by our experienced chefs in a hygienic,
              state-of-the-art kitchen.
            </p>
            <p className="mt-4 text-base leading-relaxed text-cream/80 md:text-lg">
              Whether you&apos;re celebrating with family, dining with friends, or enjoying a quiet
              evening, Hungryana offers a warm, premium atmosphere where everyone feels at home.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {highlights.map(({ icon: Icon, label }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass flex items-center gap-3 rounded-xl p-4"
                >
                  <div className="rounded-lg bg-gold/10 p-2">
                    <Icon className="h-5 w-5 text-gold" />
                  </div>
                  <span className="text-sm font-medium text-cream">{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
