'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MENU_CATEGORIES } from '@/lib/images';

export function MenuCategories() {
  return (
    <section id="menu" className="section-padding bg-charcoal">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Explore"
          title="Menu Categories"
          subtitle="Browse by cuisine — then dive into our full menu with prices."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MENU_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              whileHover={{ y: -6 }}
              className="glass-gold group overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={category.image}
                  alt={`${category.title} menu category`}
                  width={800}
                  height={533}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-charcoal-dark/50 transition-colors group-hover:bg-charcoal-dark/30" />
                <span className="absolute left-4 top-4 text-3xl" role="img" aria-hidden="true">
                  {category.emoji}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-warm-white">{category.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">{category.description}</p>
                <Link
                  href={category.href}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-all hover:gap-3"
                >
                  View Full Menu
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
