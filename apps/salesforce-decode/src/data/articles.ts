import type { ArticleSeed } from '@/types';

export const ARTICLES: ArticleSeed[] = [
  {
    slug: 'agentforce-architecture-guide',
    title: 'Agentforce Architecture: From Email to Resolution in One Agent',
    excerpt:
      'Learn how to design Agentforce agents that ingest emails, summarize customer history, and suggest resolutions with proper guardrails.',
    categorySlug: 'agentforce',
    seoTitle: 'Agentforce Architecture Guide | Salesforce Decode',
    seoDescription:
      'Complete guide to designing Agentforce agents with Prompt Builder, Flow, Knowledge, and human handoff patterns for enterprise support.',
    readTimeMinutes: 12,
    tags: ['agentforce', 'prompt-builder', 'architecture'],
    content: `## Overview

Agentforce represents a paradigm shift in how enterprises deliver customer support. Instead of routing every inquiry to a human agent, you design autonomous agents that understand context, retrieve knowledge, and take governed actions.

## Core Architecture Components

1. **Agent Topics & Actions** — Define what the agent can discuss and what actions it can invoke
2. **Prompt Builder** — Ground responses in customer data with retrieval-augmented generation
3. **Flow Orchestration** — Chain multi-step processes with decision branches
4. **Knowledge Integration** — Surface articles and resolution patterns
5. **Human Handoff** — Escalate when confidence is low or sentiment is negative

## Design Pattern: Email-to-Case Agent

When a customer emails support, the agent should:
- Parse intent and urgency from the email body
- Query the customer's 360 profile (Cases, Orders, Entitlements)
- Summarize history in plain language
- Suggest resolution steps grounded in Knowledge articles
- Create a Case with structured fields if escalation is needed

## Preventing Hallucinations

Always ground agent responses in:
- Einstein Trust Layer for data masking
- Explicit data retrieval actions before generation
- Confidence thresholds that trigger human review
- Audit logs for every agent action

## Key Takeaways

Design agents as orchestration layers, not chatbots. Every action should be traceable, every data access governed, and every escalation path defined before go-live.`,
  },
  {
    slug: 'data-cloud-identity-resolution',
    title: 'Data Cloud Identity Resolution: Building a Single Customer View',
    excerpt:
      'A practical guide to unifying customer data from CRM, mobile apps, websites, and core banking systems into one trusted profile.',
    categorySlug: 'data-cloud',
    seoTitle: 'Data Cloud Identity Resolution Guide | Salesforce Decode',
    seoDescription:
      'Step-by-step guide to Data Cloud identity resolution, match rules, unified profiles, and consent management for enterprise data strategy.',
    readTimeMinutes: 15,
    tags: ['data-cloud', 'identity-resolution', 'cdp'],
    content: `## The Challenge

Modern enterprises collect customer data across dozens of touchpoints. Without identity resolution, you cannot personalize experiences, measure attribution, or comply with privacy regulations.

## Identity Resolution Framework

### Step 1: Data Streams
Ingest data from CRM, web analytics, mobile SDK, and external warehouses via Data Streams or Zero Copy.

### Step 2: Data Model
Map source fields to the Individual and Unified Individual objects. Define primary keys and match keys.

### Step 3: Match Rules
Configure deterministic rules (email, phone, loyalty ID) and probabilistic rules (fuzzy name matching) with reconciliation priorities.

### Step 4: Unified Profile
The Unified Individual becomes your golden record — one profile with linked source records and calculated insights.

## Governance Considerations

- Consent objects must gate activation channels
- Data retention policies per jurisdiction
- Lineage tracking for audit compliance
- Performance testing with production-scale record volumes

## Real-World Pattern: Banking

A bank receives data from CRM (relationship manager notes), mobile app (transactions), website (product browsing), and core banking (account balances). Identity resolution links all four to one Individual, enabling personalized offers while respecting consent preferences.`,
  },
  {
    slug: 'apex-bulkification-patterns',
    title: 'Apex Bulkification: Processing Millions of Records Safely',
    excerpt:
      'Master bulkification patterns for triggers, batch jobs, and queueable chains when dealing with large data volumes.',
    categorySlug: 'apex',
    seoTitle: 'Apex Bulkification Patterns | Salesforce Decode',
    seoDescription:
      'Advanced Apex bulkification techniques for triggers, batch Apex, queueable jobs, and governor limit management at enterprise scale.',
    readTimeMinutes: 10,
    tags: ['apex', 'bulkification', 'governor-limits'],
    content: `## Why Bulkification Matters

Salesforce executes triggers and classes in batches of up to 200 records. Code that works for one record often fails at scale.

## Trigger Best Practices

- Never query or DML inside loops
- Use Maps and Sets for O(1) lookups
- Collect records for single bulk DML at the end
- Implement recursion guards with static flags

## Large Data Volume Strategy

For 5M+ records daily:
1. **Batch Apex** — Process in chunks of 200 with stateful tracking
2. **Queueable Chain** — Chain jobs for dependent processing
3. **Platform Events** — Decouple producers from consumers
4. **Custom Indexing** — External ID fields for efficient queries

## Performance Tips

- Select only needed fields in SOQL
- Use FOR UPDATE only when necessary
- Consider async for non-critical path operations
- Monitor Apex CPU time and heap size in debug logs`,
  },
  {
    slug: 'lwc-performance-optimization',
    title: 'LWC Performance: Fixing Slow Pages with 20 Related Lists',
    excerpt:
      'Redesign strategies for Lightning pages that load too many components, related lists, and wire adapters simultaneously.',
    categorySlug: 'lwc',
    seoTitle: 'LWC Performance Optimization Guide | Salesforce Decode',
    seoDescription:
      'Fix slow Lightning Web Component pages with lazy loading, pagination, wire adapter optimization, and virtual rendering techniques.',
    readTimeMinutes: 8,
    tags: ['lwc', 'performance', 'lightning'],
    content: `## Diagnosis

A page with 20 related lists likely suffers from:
- 20+ simultaneous wire adapter calls
- Unnecessary re-renders on data changes
- Missing pagination on large datasets
- Heavy DOM from rendering all rows at once

## Redesign Strategy

1. **Tab-based lazy loading** — Load related lists only when tab is activated
2. **Pagination** — Limit to 25 records per list with "Load More"
3. **Imperative calls** — Replace multiple @wire with single consolidated Apex call
4. **Virtual scrolling** — Render only visible rows for large datasets
5. **Lightning Message Service** — Decouple components to prevent cascade updates

## Caching

Use refreshApex strategically. Cache stable data in component state. Avoid re-fetching on every render cycle.`,
  },
  {
    slug: 'integration-event-driven-architecture',
    title: 'Event-Driven Integration: Platform Events vs CDC vs Outbound Messages',
    excerpt:
      'Choose the right event mechanism for your integration architecture with real-world decision criteria.',
    categorySlug: 'integration',
    seoTitle: 'Event-Driven Salesforce Integration Guide | Salesforce Decode',
    seoDescription:
      'Compare Platform Events, Change Data Capture, and Outbound Messages for Salesforce event-driven integration architecture.',
    readTimeMinutes: 11,
    tags: ['integration', 'platform-events', 'cdc'],
    content: `## When to Use Each

| Mechanism | Best For | Limitations |
|-----------|----------|-------------|
| Platform Events | Custom business events, pub/sub patterns | No built-in replay UI |
| Change Data Capture | Record change streaming to external systems | Entity-level subscription |
| Outbound Messages | Workflow-triggered SOAP notifications | Legacy, limited payload |

## Architecture Pattern

Producer (Salesforce) → Event Bus → Consumer (MuleSoft/Kafka) → Target Systems

For 20-second external API calls, never block the transaction. Use Queueable or Platform Events to hand off to middleware with retry and circuit breaker patterns.

## Error Handling

Implement dead letter queues, exponential backoff, and idempotency keys. Log every event with correlation IDs for end-to-end tracing.`,
  },
  {
    slug: 'enterprise-multi-org-strategy',
    title: 'Multi-Org Strategy After Acquiring 5 Companies',
    excerpt:
      'Design a future-proof Salesforce architecture when consolidating multiple orgs from acquisitions.',
    categorySlug: 'architecture',
    seoTitle: 'Salesforce Multi-Org Strategy Guide | Salesforce Decode',
    seoDescription:
      'Enterprise Salesforce architecture for post-acquisition org consolidation, data strategy, and integration patterns.',
    readTimeMinutes: 14,
    tags: ['architecture', 'multi-org', 'enterprise'],
    content: `## Assessment Phase

Before merging orgs, inventory:
- Business processes and customizations per org
- Data volume and quality
- Integration dependencies
- License types and user counts
- Compliance requirements per region

## Architecture Options

1. **Hub-and-Spoke** — Master org with connected satellite orgs via Integration Hub
2. **Gradual Consolidation** — Migrate one business unit at a time
3. **Org Partitioning** — Separate orgs by region or business line with shared data layer (Data Cloud)

## Data Strategy

Use Data Cloud as the unified customer layer while maintaining operational orgs during transition. Define canonical data models before migration.

## Governance

Establish a Center of Excellence with release management, coding standards, and architecture review boards.`,
  },
];
