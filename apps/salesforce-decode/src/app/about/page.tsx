import type { Metadata } from 'next';
import Link from 'next/link';
import { Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CareerTimeline, AboutMe } from '@/components/sections/CareerTimeline';
import { Skills } from '@/components/sections/Skills';
import { buildMetadata } from '@/lib/seo';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = buildMetadata({
  title: `About ${SITE.owner} | ${SITE.name}`,
  description: `${SITE.owner} is a ${SITE.ownerTitle} with ${SITE.ownerExperience} experience across TCS, Wipro, IBM, Salesforce, Accenture, and Exavalu.`,
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="section-padding border-b border-border">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-4xl font-bold text-secondary">About {SITE.owner}</h1>
          <p className="mt-4 text-lg text-muted">
            {SITE.ownerTitle} · {SITE.ownerExperience} Salesforce Experience
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-muted leading-relaxed">
            I&apos;ve spent my career decoding complex Salesforce implementations across global
            enterprises. From my first Apex trigger at TCS to architecting Agentforce and Data Cloud
            solutions at Salesforce and Exavalu, I&apos;ve seen what separates good consultants
            from great architects.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild>
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
                LinkedIn Profile
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={`mailto:${SITE.email}`}>
                <Mail className="h-4 w-4" />
                Get in Touch
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Skills />
      <CareerTimeline />

      <section className="section-padding bg-surface">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-secondary">Why Salesforce Decode?</h2>
          <div className="mt-6 space-y-4 text-muted leading-relaxed">
            <p>
              Interview preparation for Salesforce roles is fragmented. Generic questions don&apos;t
              prepare you for architect-level scenarios involving Agentforce, Data Cloud, or
              multi-org enterprise strategy.
            </p>
            <p>
              Salesforce Decode fills that gap with 570+ scenario-based questions — each with
              expected answers, follow-up questions, real-world context, and architect perspectives.
            </p>
            <p>
              Whether you&apos;re preparing for a Technical Architect interview or leveling up your
              consulting skills, this is the resource I wish I had when I started.
            </p>
          </div>
          <Button className="mt-8" asChild>
            <Link href="/interview">Start Practicing</Link>
          </Button>
        </div>
      </section>

      <AboutMe />
    </div>
  );
}
