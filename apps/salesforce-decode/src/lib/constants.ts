export const SITE = {
  name: 'Salesforce Decode',
  tagline: 'Decode Salesforce Like a Solution Architect',
  subtitle: 'Real Interview Questions, Real Scenarios, Real Salesforce Implementations',
  owner: 'Avijit Patra',
  ownerTitle: 'Senior Salesforce Technical Consultant',
  ownerExperience: '8+ years',
  email: 'contact@salesforcedecode.com',
  twitter: '@salesforcedecode',
  linkedin: 'https://www.linkedin.com/in/iamavijitpatra/',
} as const;

export const COLORS = {
  primary: '#3658F5',
  secondary: '#111111',
  background: '#FFFFFF',
  salesforceBlue: '#00A1E0',
  accent: '#0176D3',
} as const;

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/learn', label: 'Start Learning' },
  { href: '/interview', label: 'Interview Questions' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
] as const;

export const DIFFICULTY_LABELS: Record<string, string> = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
  ARCHITECT: 'Architect',
};

export const DIFFICULTY_COLORS: Record<string, string> = {
  BEGINNER: 'bg-emerald-100 text-emerald-800',
  INTERMEDIATE: 'bg-blue-100 text-blue-800',
  ADVANCED: 'bg-amber-100 text-amber-800',
  ARCHITECT: 'bg-purple-100 text-purple-800',
};
