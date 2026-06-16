import Link from 'next/link';
import { FileText, HelpCircle, FolderOpen, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ALL_QUESTIONS } from '@/data/questions';
import { ARTICLES } from '@/data/articles';
import { CATEGORIES } from '@/data/categories';

const ADMIN_LINKS = [
  {
    href: '/admin/questions',
    label: 'Manage Questions',
    description: 'Add, edit, and publish interview questions',
    icon: HelpCircle,
    count: ALL_QUESTIONS.length,
  },
  {
    href: '/admin/articles',
    label: 'Manage Articles',
    description: 'Create and publish blog articles',
    icon: FileText,
    count: ARTICLES.length,
  },
  {
    href: '/admin/categories',
    label: 'Manage Categories',
    description: 'Organize question and article categories',
    icon: FolderOpen,
    count: CATEGORIES.length,
  },
  {
    href: '/admin/users',
    label: 'Manage Users',
    description: 'View registered users and roles',
    icon: Users,
    count: '—',
  },
];

export default function AdminPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-border bg-surface py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-secondary">Admin Panel</h1>
          <p className="mt-2 text-muted">Manage content, categories, and users</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2">
            {ADMIN_LINKS.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <Card hover className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        {item.label}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted">{item.description}</p>
                      <p className="mt-2 text-2xl font-bold text-primary">{item.count}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
