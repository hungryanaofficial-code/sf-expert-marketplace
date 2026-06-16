import type { CareerMilestone, SkillCard } from '@/types';

export const EDUCATION = [
  {
    degree: 'M.Tech',
    institution: 'BITS Pilani',
    period: '2014 – 2016',
    description: 'Advanced technical education building foundation for enterprise architecture and system design.',
  },
  {
    degree: 'B.Com (Commerce Graduate)',
    institution: 'University',
    period: '2010 – 2013',
    description: 'Commerce background providing business context for Salesforce implementations across industries.',
  },
];

export const CAREER_TIMELINE: CareerMilestone[] = [
  {
    company: 'TCS',
    role: 'Salesforce Developer',
    period: '2016 – 2018',
    description: 'Started Salesforce career with foundational implementations across administration and development.',
    learnings: ['Administration', 'Apex', 'Visualforce', 'Integrations'],
  },
  {
    company: 'Wipro',
    role: 'Salesforce Developer / Consultant',
    period: '2018 – 2020',
    description: 'Worked on enterprise implementations for global clients with complex business requirements.',
    learnings: ['Lightning', 'LWC', 'Security', 'Deployment'],
  },
  {
    company: 'IBM',
    role: 'Salesforce Technical Consultant',
    period: '2020 – 2022',
    description: 'Delivered complex integration projects connecting Salesforce with enterprise middleware and legacy systems.',
    learnings: ['REST', 'SOAP', 'Middleware', 'Architecture'],
  },
  {
    company: 'Salesforce',
    role: 'Senior Technical Consultant',
    period: '2022 – 2024',
    description: 'Worked on cutting-edge Salesforce products including Agentforce, Data Cloud, FSC, and Headless 360.',
    learnings: ['Agentforce', 'Data Cloud', 'FSC', 'Enterprise Architecture', 'Headless 360'],
  },
  {
    company: 'Accenture',
    role: 'Senior Salesforce Architect',
    period: '2024',
    description: 'Led large-scale transformation programs for Fortune 500 clients across multiple clouds.',
    learnings: ['Enterprise Architecture', 'Multi-Org Strategy', 'Governance', 'Transformation'],
  },
  {
    company: 'Exavalu',
    role: 'Senior Salesforce Technical Consultant',
    period: '2024 – Present',
    description: 'Focus on enterprise transformation and consulting across Agentforce, Data Cloud, and core platform.',
    learnings: ['Agentforce', 'Data Cloud', 'Consulting', 'Enterprise Transformation'],
  },
];

export const SKILLS: SkillCard[] = [
  { name: 'Apex', icon: 'Code2', level: 'Expert' },
  { name: 'LWC', icon: 'Component', level: 'Expert' },
  { name: 'Agentforce', icon: 'Bot', level: 'Expert' },
  { name: 'Data Cloud', icon: 'Database', level: 'Expert' },
  { name: 'OmniStudio', icon: 'Workflow', level: 'Advanced' },
  { name: 'REST API', icon: 'Globe', level: 'Expert' },
  { name: 'CDC', icon: 'Radio', level: 'Advanced' },
  { name: 'Platform Events', icon: 'Zap', level: 'Advanced' },
  { name: 'Integration', icon: 'GitBranch', level: 'Expert' },
  { name: 'Architecture', icon: 'Building2', level: 'Expert' },
  { name: 'Salesforce Security', icon: 'Shield', level: 'Expert' },
  { name: 'FSC', icon: 'Landmark', level: 'Advanced' },
];

export const POPULAR_TOPICS = [
  { name: 'Agentforce', slug: 'agentforce', count: 55, color: '#3658F5' },
  { name: 'Data Cloud', slug: 'data-cloud', count: 55, color: '#00A1E0' },
  { name: 'Apex', slug: 'apex', count: 102, color: '#111111' },
  { name: 'LWC', slug: 'lwc', count: 87, color: '#7B61FF' },
  { name: 'Integration', slug: 'integration', count: 102, color: '#E8733A' },
  { name: 'Architecture', slug: 'architecture', count: 86, color: '#3658F5' },
];
