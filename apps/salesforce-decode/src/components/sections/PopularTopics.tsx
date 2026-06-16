import Link from 'next/link';
import { POPULAR_TOPICS } from '@/data/career';

export function PopularTopics() {
  return (
    <section className="section-padding bg-gradient-section">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-3xl font-bold text-secondary">Popular Topics</h2>
        <p className="mt-2 text-muted">Explore questions by Salesforce domain</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {POPULAR_TOPICS.map((topic) => (
            <div
              key={topic.slug}
              className="group rounded-xl border border-border bg-white p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-semibold text-secondary">{topic.name}</h3>
                  <p className="mt-1 text-sm text-muted">{topic.count} questions</p>
                </div>
                <div
                  className="h-10 w-10 rounded-lg"
                  style={{ backgroundColor: `${topic.color}15` }}
                >
                  <div
                    className="mx-auto mt-2.5 h-5 w-5 rounded-full"
                    style={{ backgroundColor: topic.color }}
                  />
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <Link
                  href={`/learn/${topic.slug}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Learn →
                </Link>
                <Link
                  href={`/interview/topics/${topic.slug}`}
                  className="text-sm font-medium text-sf-accent hover:underline"
                >
                  Interview →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
