'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { BUSINESS_HOURS, PHONE_TEL, SITE } from '@/lib/constants';

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      message: String(data.get('message') ?? ''),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(result.error ?? 'Something went wrong. Please try again.');
        return;
      }

      form.reset();
      setSubmitted(true);
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-charcoal-dark">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Contact Us"
          subtitle="We'd love to hear from you. Send a message or call to order."
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-gold rounded-2xl p-6 md:p-8">
              <h3 className="font-display text-2xl font-bold text-warm-white">{SITE.name}</h3>
              <p className="mt-1 text-gold">{SITE.tagline}</p>

              <ul className="mt-8 space-y-5">
                <li className="flex items-start gap-4">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <p className="text-sm font-medium text-cream/50">Email</p>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="text-cream transition-colors hover:text-gold"
                    >
                      {SITE.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <p className="text-sm font-medium text-cream/50">Phone</p>
                    <a href={PHONE_TEL} className="text-cream">
                      {SITE.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <p className="text-sm font-medium text-cream/50">Address</p>
                    <p className="text-cream">{SITE.address}</p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 border-t border-gold/10 pt-6">
                <div className="mb-4 flex items-center gap-2 text-gold">
                  <Clock className="h-5 w-5" />
                  <h4 className="font-display font-semibold text-warm-white">Business Hours</h4>
                </div>
                <ul className="space-y-2">
                  {BUSINESS_HOURS.map((schedule) => (
                    <li
                      key={schedule.day}
                      className="flex justify-between text-sm text-cream/70"
                    >
                      <span>{schedule.day}</span>
                      <span className="text-cream">{schedule.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <div className="glass flex h-full min-h-[400px] flex-col items-center justify-center rounded-2xl p-8 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/20">
                  <Send className="h-7 w-7 text-gold" />
                </div>
                <h3 className="font-display text-2xl font-bold text-warm-white">Message Sent!</h3>
                <p className="mt-2 text-cream/70">
                  Thank you for reaching out. We&apos;ve received your message and will get back to
                  you soon.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm font-semibold text-gold underline-offset-4 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8">
                <h3 className="mb-6 font-display text-xl font-semibold text-warm-white">
                  Send Us a Message
                </h3>

                {error && (
                  <p
                    role="alert"
                    className="mb-5 rounded-xl border border-red/40 bg-red/10 px-4 py-3 text-sm text-cream"
                  >
                    {error}
                  </p>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-cream/70">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      disabled={loading}
                      className="w-full rounded-xl border border-gold/15 bg-charcoal-light px-4 py-3 text-cream placeholder:text-cream/30 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold disabled:opacity-60"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-cream/70">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      disabled={loading}
                      className="w-full rounded-xl border border-gold/15 bg-charcoal-light px-4 py-3 text-cream placeholder:text-cream/30 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold disabled:opacity-60"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-cream/70">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    disabled={loading}
                    className="w-full rounded-xl border border-gold/15 bg-charcoal-light px-4 py-3 text-cream placeholder:text-cream/30 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold disabled:opacity-60"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div className="mt-5">
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-cream/70">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    disabled={loading}
                    className="w-full resize-none rounded-xl border border-gold/15 bg-charcoal-light px-4 py-3 text-cream placeholder:text-cream/30 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold disabled:opacity-60"
                    placeholder="Tell us about your order or inquiry..."
                  />
                </div>

                <div className="mt-6">
                  <Button type="submit" variant="primary" ariaLabel="Send message">
                    <Send className="h-4 w-4" />
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 overflow-hidden rounded-2xl"
        >
          <div className="relative aspect-[21/9] min-h-[250px] bg-charcoal-light">
            <iframe
              title="Hungryana restaurant location on Google Maps"
              src={`https://maps.google.com/maps?q=${SITE.mapsQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute inset-0 ring-2 ring-red/20 ring-inset" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
