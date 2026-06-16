/** Sub-topic triggers shown on category pages for quick filtering */
export const TOPIC_TRIGGERS: Record<string, { label: string; tag: string }[]> = {
  agentforce: [
    { label: 'All', tag: '' },
    { label: 'Prompt Builder', tag: 'prompt-builder' },
    { label: 'Multi-Agent', tag: 'multi-agent' },
    { label: 'Guardrails', tag: 'guardrails' },
    { label: 'Handoff', tag: 'human-handoff' },
  ],
  'data-cloud': [
    { label: 'All', tag: '' },
    { label: 'Identity', tag: 'identity-resolution' },
    { label: 'Segmentation', tag: 'segmentation' },
    { label: 'Activation', tag: 'activation' },
    { label: 'Consent', tag: 'consent' },
  ],
  apex: [
    { label: 'All', tag: '' },
    { label: 'Triggers', tag: 'triggers' },
    { label: 'Bulkification', tag: 'bulkification' },
    { label: 'Governor Limits', tag: 'governor-limits' },
    { label: 'Async', tag: 'async' },
    { label: 'Security', tag: 'security' },
  ],
  lwc: [
    { label: 'All', tag: '' },
    { label: 'LDS / Wire', tag: 'wire' },
    { label: 'Performance', tag: 'performance' },
    { label: 'Communication', tag: 'communication' },
    { label: 'Security', tag: 'security' },
  ],
  integration: [
    { label: 'All', tag: '' },
    { label: 'REST', tag: 'rest' },
    { label: 'Platform Events', tag: 'platform-events' },
    { label: 'CDC', tag: 'cdc' },
    { label: 'OAuth', tag: 'oauth' },
  ],
  architecture: [
    { label: 'All', tag: '' },
    { label: 'Multi-Org', tag: 'multi-org' },
    { label: 'Governance', tag: 'governance' },
    { label: 'Scalability', tag: 'scalability' },
    { label: 'Security', tag: 'security' },
  ],
  'headless-360': [
    { label: 'All', tag: '' },
    { label: 'Commerce API', tag: 'commerce' },
    { label: 'Experience API', tag: 'experience' },
    { label: 'MCP', tag: 'mcp' },
  ],
  omnistudio: [
    { label: 'All', tag: '' },
    { label: 'FlexCards', tag: 'flexcards' },
    { label: 'OmniScripts', tag: 'omniscripts' },
    { label: 'DataRaptors', tag: 'data-raptors' },
  ],
  fsc: [
    { label: 'All', tag: '' },
    { label: 'Household', tag: 'household' },
    { label: 'Onboarding', tag: 'onboarding' },
    { label: 'Compliance', tag: 'compliance' },
  ],
};

export const DIFFICULTY_ORDER = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'ARCHITECT'] as const;
