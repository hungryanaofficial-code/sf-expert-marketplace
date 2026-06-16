import {
  Bot,
  Building2,
  Code2,
  Component,
  Database,
  GitBranch,
  Globe,
  Landmark,
  Layers,
  Radio,
  Shield,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { SKILLS } from '@/data/career';

const ICON_MAP: Record<string, LucideIcon> = {
  Bot,
  Database,
  Code2,
  Component,
  Workflow,
  Globe,
  Radio,
  Zap,
  GitBranch,
  Building2,
  Shield,
  Landmark,
  Layers,
};

export function Skills() {
  return (
    <section className="section-padding bg-surface">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-3xl font-bold text-secondary">Skills & Expertise</h2>
        <p className="mt-2 text-muted">8+ years across the Salesforce ecosystem</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {SKILLS.map((skill) => {
            const Icon = ICON_MAP[skill.icon] ?? Code2;
            return (
              <div
                key={skill.name}
                className="flex items-center gap-4 rounded-xl border border-border bg-white p-5 card-hover"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary">{skill.name}</h3>
                  <p className="text-xs text-muted">{skill.level}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
