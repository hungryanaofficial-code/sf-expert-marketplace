import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CAREER_TIMELINE, EDUCATION } from '@/data/career';
import { SITE } from '@/lib/constants';

export function CareerTimeline() {
  return (
    <section className="section-padding bg-white" id="career">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-3xl font-bold text-secondary">Career Journey</h2>
        <p className="mt-2 text-muted">
          From TCS to Salesforce, IBM, Accenture, and Exavalu — a decade of enterprise implementations
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h3 className="font-display text-lg font-semibold text-secondary">Education</h3>
            <div className="mt-4 space-y-4">
              {EDUCATION.map((edu) => (
                <div key={edu.degree} className="rounded-xl border border-border bg-surface p-5">
                  <p className="font-semibold text-secondary">{edu.degree}</p>
                  <p className="text-sm text-primary">{edu.institution}</p>
                  <p className="mt-1 text-xs text-muted">{edu.period}</p>
                  <p className="mt-2 text-sm text-muted">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-lg font-semibold text-secondary">Experience</h3>
            <div className="relative mt-4 space-y-0">
              {CAREER_TIMELINE.map((item, i) => (
                <div key={item.company} className="relative flex gap-6 pb-10">
                  {i < CAREER_TIMELINE.length - 1 && (
                    <div className="absolute left-[11px] top-6 h-full w-0.5 bg-border" />
                  )}
                  <div className="relative z-10 mt-1.5 h-6 w-6 shrink-0 rounded-full border-2 border-primary bg-white" />
                  <div className="flex-1 rounded-xl border border-border bg-white p-5">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4 className="font-semibold text-secondary">{item.company}</h4>
                        <p className="text-sm text-primary">{item.role}</p>
                      </div>
                      <span className="rounded-full bg-surface px-3 py-1 text-xs text-muted">
                        {item.period}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-muted">{item.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.learnings.map((l) => (
                        <span
                          key={l}
                          className="rounded-full bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-primary"
                        >
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" asChild>
            <Link href="/about">
              Full story <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function AboutMe() {
  return (
    <section className="section-padding bg-surface">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold text-secondary">About Me</h2>
            <p className="mt-4 text-muted leading-relaxed">
              I&apos;m <strong className="text-secondary">{SITE.owner}</strong>, a{' '}
              {SITE.ownerTitle} with {SITE.ownerExperience} of experience across TCS, Wipro, IBM,
              Salesforce, Accenture, and Exavalu.
            </p>
            <p className="mt-4 text-muted leading-relaxed">
              I built Salesforce Decode to share the interview questions, architecture patterns, and
              real-world scenarios I&apos;ve encountered in enterprise implementations — from
              Agentforce and Data Cloud to Apex, LWC, and complex integrations.
            </p>
            <div className="mt-6 flex gap-4">
              <Button asChild>
                <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
                  Connect on LinkedIn
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-8">
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Years Experience', value: '8+' },
                { label: 'Interview Questions', value: '734+' },
                { label: 'Categories', value: '9' },
                { label: 'Companies', value: '6+' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
