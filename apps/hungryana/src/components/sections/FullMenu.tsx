'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MENU_SECTIONS, MENU_TAGLINE } from '@/data/menu';
import clsx from 'clsx';

export function FullMenu() {
  const [activeSection, setActiveSection] = useState(MENU_SECTIONS[0].id);

  const current = MENU_SECTIONS.find((s) => s.id === activeSection) ?? MENU_SECTIONS[0];

  return (
    <section id="full-menu" className="section-padding bg-charcoal-dark">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Our Menu"
          title="Hungryana Menu"
          subtitle={MENU_TAGLINE}
        />

        {/* Category tabs */}
        <div
          className="mb-10 flex gap-2 overflow-x-auto pb-2 scrollbar-thin"
          role="tablist"
          aria-label="Menu categories"
        >
          {MENU_SECTIONS.map((section) => (
            <button
              key={section.id}
              id={`tab-${section.id}`}
              type="button"
              role="tab"
              aria-selected={activeSection === section.id}
              aria-controls={`panel-${section.id}`}
              onClick={() => setActiveSection(section.id)}
              className={clsx(
                'shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
                activeSection === section.id
                  ? 'bg-red text-gold font-display tracking-wide shadow-lg shadow-red/30 btn-pop'
                  : 'glass text-cream/70 hover:text-gold hover:border-red/50'
              )}
            >
              <span className="mr-1.5" aria-hidden="true">
                {section.emoji}
              </span>
              {section.title}
            </button>
          ))}
        </div>

        {/* Menu panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            id={`panel-${current.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${current.id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="glass-gold rounded-3xl p-6 md:p-10"
          >
            <div className="mb-8 flex items-center gap-3 border-b border-gold/15 pb-6">
              <span className="text-3xl" aria-hidden="true">
                {current.emoji}
              </span>
              <h3 className="font-display text-2xl font-bold text-warm-white md:text-3xl">
                {current.title}
              </h3>
            </div>

            <div className="space-y-10">
              {current.subsections.map((subsection) => (
                <div key={subsection.title}>
                  <h4 className="mb-5 font-display text-lg font-semibold uppercase tracking-wider text-gold">
                    {subsection.title}
                  </h4>
                  <ul className="space-y-4">
                    {subsection.items.map((item) => (
                      <li
                        key={item.name}
                        className={clsx(
                          'group rounded-xl p-4 transition-colors',
                          item.featured
                            ? 'border-2 border-gold/40 bg-red/10 hover:bg-red/15'
                            : 'hover:bg-charcoal-light/50'
                        )}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-warm-white group-hover:text-gold transition-colors">
                                {item.name}
                              </span>
                              {item.featured && (
                                <Star
                                  className="h-4 w-4 shrink-0 fill-gold text-gold"
                                  aria-label="Chef's special"
                                />
                              )}
                            </div>
                            {item.description && (
                              <p className="mt-1 text-sm text-cream/55">{item.description}</p>
                            )}
                          </div>
                          <span className="shrink-0 font-display text-base font-semibold text-gold md:text-lg">
                            {item.price}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Quick jump — all sections on mobile scroll hint */}
        <p className="mt-8 text-center text-sm text-cream/40">
          Swipe categories above to explore our full menu
        </p>
      </div>
    </section>
  );
}
