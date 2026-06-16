import { cn } from '@/lib/utils';
import { DIFFICULTY_COLORS, DIFFICULTY_LABELS } from '@/lib/constants';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'default' | 'difficulty' | 'category' | 'tag';
  difficulty?: string;
  className?: string;
}

export function Badge({ children, variant = 'default', difficulty, className }: BadgeProps) {
  const base = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium';

  if (variant === 'difficulty' && difficulty) {
    return (
      <span className={cn(base, DIFFICULTY_COLORS[difficulty] ?? 'bg-gray-100 text-gray-800', className)}>
        {children ?? DIFFICULTY_LABELS[difficulty] ?? difficulty}
      </span>
    );
  }

  const variants: Record<'default' | 'category' | 'tag', string> = {
    default: 'bg-primary/10 text-primary',
    category: 'bg-sf-blue/10 text-sf-accent',
    tag: 'bg-surface-dark text-muted border border-border',
  };

  return <span className={cn(base, variants[variant as 'default' | 'category' | 'tag'] ?? variants.default, className)}>{children}</span>;
}
