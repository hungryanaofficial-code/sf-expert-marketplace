'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ZoomIn } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Lightbox } from '@/components/ui/Lightbox';
import { GALLERY_ITEMS } from '@/lib/images';

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryImages = GALLERY_ITEMS.map((item) => ({ src: item.src, alt: item.alt }));

  return (
    <section id="gallery" className="section-padding bg-charcoal-dark">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Visual Feast"
          title="Our Gallery"
          subtitle="A glimpse into the flavours, ambience, and artistry at Hungryana."
        />

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {GALLERY_ITEMS.map((item, index) => (
            <motion.button
              key={item.alt}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setLightboxIndex(index)}
              className="group relative mb-4 block w-full overflow-hidden rounded-xl break-inside-avoid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              aria-label={`View ${item.alt} in lightbox`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={600}
                height={index % 3 === 0 ? 750 : index % 3 === 1 ? 500 : 650}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-charcoal-dark/0 transition-all duration-300 group-hover:bg-charcoal-dark/50">
                <div className="scale-0 rounded-full bg-gold/90 p-3 text-charcoal-dark transition-transform duration-300 group-hover:scale-100">
                  <ZoomIn className="h-5 w-5" />
                </div>
              </div>
              <span className="absolute bottom-3 left-3 rounded-full bg-charcoal-dark/70 px-3 py-1 text-xs font-medium text-gold backdrop-blur-sm">
                {item.category}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox
        images={galleryImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}
