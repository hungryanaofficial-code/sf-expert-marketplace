'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { ALL_QUESTIONS } from '@/data/questions';
import { CATEGORIES } from '@/data/categories';
import { DIFFICULTY_LABELS } from '@/lib/constants';

export default function AdminQuestionsPage() {
  const [questions] = useState(ALL_QUESTIONS.slice(0, 50));

  return (
    <div className="bg-white">
      <section className="border-b border-border bg-surface py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/admin" className="mb-4 inline-flex items-center gap-2 text-sm text-muted hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Back to admin
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="font-display text-2xl font-bold text-secondary">Manage Questions</h1>
            <Button>Add Question</Button>
          </div>
        </div>
      </section>

      <section className="section-padding pt-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="rounded-xl border border-border bg-surface p-6">
            <h2 className="mb-4 font-semibold text-secondary">Add New Question</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Question Title" placeholder="Enter interview question..." />
              <Select
                label="Category"
                options={CATEGORIES.map((c) => ({ value: c.slug, label: c.name }))}
              />
              <Select
                label="Difficulty"
                options={Object.entries(DIFFICULTY_LABELS).map(([v, l]) => ({
                  value: v,
                  label: l,
                }))}
              />
              <Input label="Tags" placeholder="comma-separated tags" />
            </div>
            <Button className="mt-4">Save Question</Button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-surface">
                <tr>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Difficulty</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((q) => (
                  <tr key={q.slug} className="border-b border-border">
                    <td className="max-w-md truncate px-4 py-3">{q.title}</td>
                    <td className="px-4 py-3">{q.categorySlug}</td>
                    <td className="px-4 py-3">{q.difficulty}</td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
