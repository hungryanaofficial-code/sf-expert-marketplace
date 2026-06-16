import { buildQuestionBank, type TopicTemplate } from './generator';
import { AGENTFORCE_ADDITIONS } from './agentforce-additions';

export const AGENTFORCE_DETAILED: TopicTemplate[] = [
  {
    title: 'Design a multi-agent orchestration for customer service escalation',
    difficulty: 'ARCHITECT',
    tags: ['multi-agent', 'orchestration', 'escalation', 'service-cloud'],
    scenario:
      'A global retailer wants Agentforce to handle tier-1 support across chat, email, and voice. Complex billing disputes and fraud cases must route to specialized agents or human reps without losing conversation context.',
    answerPoints: [
      'Define a supervisor agent responsible for intent classification, confidence scoring, and routing policy enforcement',
      'Create domain-specific worker agents (billing, fraud, returns) with scoped topics, actions, and knowledge bases',
      'Use session context objects to pass customer ID, case history, and prior agent outputs across handoffs',
      'Implement human-in-the-loop triggers when confidence falls below threshold or sensitive PII/fraud keywords appear',
      'Apply guardrails at orchestration layer: action allowlists, rate limits, and audit logging for every agent decision',
      'Design fallback paths when a worker agent fails or times out—default to human queue with summarized transcript',
      'Measure per-agent containment rate, escalation rate, and average handle time to tune routing rules',
    ],
    followUps: [
      'How would you prevent infinite loops between agents re-routing the same request?',
      'What metadata would you store to replay a multi-agent session for compliance review?',
      'How do you version and deploy agent changes without disrupting live conversations?',
    ],
    architectNote:
      'Multi-agent is not microservices cosplay—each agent boundary should map to a distinct business capability with clear ownership. The orchestrator owns policy; workers own execution. Avoid duplicating the same actions across agents; centralize shared capabilities as reusable agent actions or Apex services.',
  },
  {
    title: 'Explain prompt engineering guardrails for financial services compliance',
    difficulty: 'ADVANCED',
    tags: ['prompt-engineering', 'guardrails', 'compliance', 'fsc'],
    scenario:
      'A wealth management firm deploys Agentforce for client inquiries about portfolio performance and tax documents. Regulators require that agents never provide personalized investment advice without advisor review.',
    answerPoints: [
      'Define system instructions that explicitly prohibit investment recommendations and require disclaimer language',
      'Use topic classification to block or redirect advice-seeking intents to human advisors',
      'Configure data grounding to only retrieve approved FAQ and document summaries—not raw account data for inference',
      'Implement output filters for prohibited phrases, ticker symbols with buy/sell language, and performance guarantees',
      'Log every prompt, retrieved context chunk, and response for FINRA/SEC audit trails',
      'Separate read-only informational actions from write actions requiring elevated approval flows',
      'Run red-team test suites with adversarial prompts before each production release',
    ],
    followUps: [
      'How would you handle a user jailbreak attempt asking the agent to ignore compliance rules?',
      'What is your strategy when the knowledge base contains outdated regulatory guidance?',
      'Should compliance guardrails live in the agent config, Flow, or Apex—and why?',
    ],
    architectNote:
      'Compliance guardrails must be defense-in-depth: instructions alone fail under adversarial pressure. Combine topic boundaries, retrieval constraints, output validation, and human escalation. Treat the agent as an untrusted presentation layer over governed data sources.',
  },
  {
    title: 'When should you use Agent Actions vs Flow vs Apex for agent capabilities?',
    difficulty: 'INTERMEDIATE',
    tags: ['agent-actions', 'flow', 'apex', 'design-patterns'],
    scenario:
      'Your team is building an Agentforce agent that can check order status, create cases, and apply loyalty credits. Developers disagree on whether everything should be Flow-based or Apex invocable methods.',
    answerPoints: [
      'Agent Actions are the contract surface—each action should do one business operation with clear inputs/outputs',
      'Use Flow for declarative orchestration, approval steps, and admin-maintainable logic with moderate complexity',
      'Use Apex for bulk-safe integrations, complex validation, cryptographic operations, or performance-critical paths',
      'Avoid embedding long-running callouts inside synchronous agent action paths—use async patterns',
      'Standardize action naming, error payloads, and idempotency keys so agents can retry safely',
      'Document which actions are read vs write and apply CRUD/FLS checks consistently',
      'Prefer composable small actions over monolithic "do everything" actions that confuse LLM tool selection',
    ],
    followUps: [
      'How do you expose the same capability to both an agent and a REST API without duplication?',
      'What timeout constraints apply to agent actions during live chat sessions?',
      'How would you unit test an invocable Apex action used by an agent?',
    ],
    architectNote:
      'Agents pick tools probabilistically. Smaller, well-described actions improve tool selection accuracy. The implementation behind an action can change (Flow to Apex) without retraining users if the action contract stays stable.',
  },
  {
    title: 'Design knowledge grounding architecture for a multilingual support agent',
    difficulty: 'ADVANCED',
    tags: ['knowledge', 'grounding', 'rag', 'multilingual'],
    scenario:
      'A hospitality brand supports guests in English, Spanish, and Japanese. Knowledge articles exist in all three languages but quality varies, and some policies differ by region.',
    answerPoints: [
      'Segment knowledge sources by locale and region with metadata filters applied at retrieval time',
      'Use Data Cloud or Knowledge with structured tags for market, language, and policy version',
      'Configure retrieval to prefer canonical language articles with fallback translation disclaimers',
      'Implement citation requirements so agents quote source article IDs in responses',
      'Set up freshness monitoring—alert when grounded articles exceed SLA for review',
      'Handle conflicting regional policies by routing to region-specific topics or human agents',
      'Evaluate retrieval precision/recall per language with golden question test sets',
    ],
    followUps: [
      'How do you prevent the agent from blending conflicting policies from different regions?',
      'What chunking strategy works best for long policy PDFs vs structured Knowledge articles?',
      'Would you fine-tune embeddings per language or rely on Salesforce default retrieval?',
    ],
    architectNote:
      'Multilingual RAG fails silently when retrieval returns wrong-language chunks that look plausible. Explicit locale filters and citation mandates catch hallucinations early. Regional policy differences should be modeled as data dimensions, not buried in prompt instructions.',
  },
  {
    title: 'Implement human handoff without losing conversational context',
    difficulty: 'INTERMEDIATE',
    tags: ['human-handoff', 'service-cloud', 'messaging', 'context'],
    scenario:
      'Customers complain that when Agentforce escalates to a live agent, they must repeat their issue. The contact center uses Service Cloud with Messaging for In-App and Web.',
    answerPoints: [
      'Persist full conversation transcript and structured summary as fields on MessagingSession or Case',
      'Generate a handoff brief: intent, entities extracted, actions attempted, and customer sentiment',
      'Use Omni-Channel routing to prioritize sessions with failed containment or high urgency scores',
      'Pass customer verification status so live agents do not re-authenticate unnecessarily',
      'Configure agent desktop with embedded summary component and links to retrieved knowledge',
      'Define SLAs for pickup time when bot hands off—alert supervisors on breaches',
      'Close the loop: feed human resolution notes back to improve agent topics and knowledge gaps',
    ],
    followUps: [
      'What PII should be redacted from the summary shown to tier-1 human agents?',
      'How do you handle handoff when no agents are available in queue?',
      'Should the bot stay silent or send a closing message before transfer?',
    ],
    architectNote:
      'Handoff is a product moment, not a technical afterthought. Structured summaries beat raw chat dumps—agents scan intent and attempted actions in seconds. Feed resolution data back into your knowledge and topic gap analysis pipeline.',
  },
  {
    title: 'Evaluate Agentforce containment rate vs customer satisfaction tradeoffs',
    difficulty: 'ADVANCED',
    tags: ['metrics', 'containment', 'cx', 'analytics'],
    scenario:
      'Leadership celebrates a 78% containment rate, but CSAT dropped 12 points. Product wants to push containment to 85% while support leadership demands quality recovery.',
    answerPoints: [
      'Define containment precisely: resolved without human vs abandoned vs wrongly closed',
      'Segment metrics by topic, channel, customer tier, and language to find quality cliffs',
      'Track post-containment outcomes: reopen rate, repeat contact within 7 days, and CSAT by topic',
      'Identify over-containment where agents end sessions prematurely to hit KPIs',
      'Balance automation with proactive human offers on high-value or distressed customers',
      'Use A/B testing on escalation thresholds rather than global policy changes',
      'Report a quality-adjusted containment metric weighting CSAT and reopen rate',
    ],
    followUps: [
      'Which Data Cloud or CRM Analytics datasets would you build for this dashboard?',
      'How do you set escalation thresholds differently for VIP vs standard customers?',
      'What leading indicators predict a containment that will result in a bad CSAT score?',
    ],
    architectNote:
      'Containment is a means, not the mission. Architects should define north-star metrics pairing efficiency with quality. Without reopen rate and CSAT segmentation, teams optimize for closing chats, not solving problems.',
  },
  {
    title: 'Secure Agentforce actions against prompt injection and over-permissioned tools',
    difficulty: 'ARCHITECT',
    tags: ['security', 'prompt-injection', 'agent-actions', 'zero-trust'],
    scenario:
      'Security review flagged that your service agent can update cases, issue refunds, and read contact PII. Pen testers demonstrated indirect prompt injection via a malicious knowledge article title.',
    answerPoints: [
      'Apply least-privilege action sets per agent persona—separate read-only informational agents from transactional ones',
      'Validate and sanitize all retrieved content before inclusion in LLM context; strip HTML/scripts from knowledge chunks',
      'Use server-side authorization on every action execution—never trust the LLM for access control decisions',
      'Implement confirmation flows for high-impact writes (refunds, account changes) with step-up verification',
      'Monitor anomalous action patterns: velocity limits, unusual refund amounts, cross-account access attempts',
      'Separate untrusted user input from system instructions using structured prompt templates',
      'Conduct regular purple-team exercises with injection scenarios in knowledge, cases, and chat history',
    ],
    followUps: [
      'Can Field-Level Security alone protect PII retrieved into agent context?',
      'How do you sign and verify knowledge content sourced from external CMS feeds?',
      'What is your incident response plan if an agent executes a malicious action at scale?',
    ],
    architectNote:
      'Agent security is OWASP for LLMs plus Salesforce CRUD/FLS. The LLM is part of your attack surface—assume retrieved content is hostile. Authorization must happen at action execution time in Apex/Flow, not in natural language instructions.',
  },
  {
    title: 'Design topic taxonomy and utterance coverage for a new Agentforce deployment',
    difficulty: 'INTERMEDIATE',
    tags: ['topics', 'taxonomy', 'nlp', 'discovery'],
    scenario:
      'You are launching Agentforce for an insurance carrier with 200+ common call reasons. The project team wants to know how many topics to create and how to organize them.',
    answerPoints: [
      'Analyze historical case and chat transcripts to cluster intents—aim for 15–40 topics at launch, not 200',
      'Group topics by customer journey stage and back-office system boundary',
      'Define clear topic descriptions and example utterances—overlap causes misclassification',
      'Map each topic to allowed actions, knowledge collections, and escalation rules',
      'Plan a "general inquiry" fallback topic with safe responses and easy human escalation',
      'Establish a monthly topic gap review using unrecognized utterance logs',
      'Version topics with change logs; avoid renaming slugs that break analytics continuity',
    ],
    followUps: [
      'How granular should topics be when two intents share the same actions?',
      'What is your approach for seasonal topics like open enrollment?',
      'How do you train CS agents to report topic misclassification in production?',
    ],
    architectNote:
      'Topic sprawl degrades classification accuracy. Start with journey-based groupings validated against real transcripts. A smaller, well-maintained taxonomy outperforms exhaustive intent lists that nobody updates.',
  },
  {
    title: 'Integrate Agentforce with Data Cloud for personalized agent responses',
    difficulty: 'ADVANCED',
    tags: ['data-cloud', 'personalization', 'unified-profile', 'activation'],
    scenario:
      'Marketing wants the support agent to recognize loyalty tier, lifetime value, and recent campaign interactions. Data Cloud already holds unified individual profiles fed from POS, e-commerce, and Service Cloud.',
    answerPoints: [
      'Expose calculated insights and segments from Data Cloud as retrievable attributes for agent context',
      'Use identity resolution rules to match authenticated session users to unified profiles reliably',
      'Define which attributes are safe for agent verbalization vs internal routing only (e.g., LTV for prioritization)',
      'Implement consent and purpose-of-use checks before using marketing data in service conversations',
      'Cache hot profile attributes with TTL to reduce latency during live chat',
      'Create activation-triggered alerts when high-value customers initiate contact',
      'Measure personalization lift: CSAT, handle time, and upsell acceptance vs control cohort',
    ],
    followUps: [
      'How do you handle profile mismatches when a household shares one login?',
      'What latency budget is acceptable for profile enrichment during chat?',
      'Should personalization affect agent tone, routing, or offered actions—or all three?',
    ],
    architectNote:
      'Personalization without governance creates creepy or non-compliant experiences. Architect a attribute classification matrix: public, internal routing, prohibited. Data Cloud is the profile brain; Agentforce is the conversational surface—keep that separation clean.',
  },
  {
    title: 'Plan CI/CD and environment promotion for Agentforce configurations',
    difficulty: 'ADVANCED',
    tags: ['devops', 'cicd', 'metadata', 'environments'],
    scenario:
      'Your team manages agents across dev, QA, UAT, and prod orgs. Admins edit topics in prod hotfixes while developers deploy actions via Copado. Config drift is causing QA to no longer represent production.',
    answerPoints: [
      'Identify source-of-truth metadata: agent definitions, topics, actions, prompts, and connected knowledge',
      'Establish promotion pipeline with automated retrieval tests and golden conversation regression suites',
      'Separate prompt/action development from knowledge content updates with different approval paths',
      'Use scratch orgs or dedicated Agentforce sandboxes with seeded test data profiles',
      'Implement feature flags or inactive agent versions for canary releases',
      'Document rollback procedures including prior prompt versions and action bindings',
      'Align admin hotfix process with back-merge to Git within 24 hours to stop drift',
    ],
    followUps: [
      'Which Agentforce settings are not metadata-deployable and require manual checklist steps?',
      'How do you run load tests on agent actions before peak season?',
      'What is your strategy for secrets used by agent-connected external APIs across environments?',
    ],
    architectNote:
      'Agentforce configs are code-adjacent—they need the same discipline as Apex. Prompt changes are production changes. Without automated conversation regression, you will ship silent quality regressions that containment dashboards hide for weeks.',
  },
  {
    title: 'Compare autonomous agents vs copilot-style assist modes for sales teams',
    difficulty: 'INTERMEDIATE',
    tags: ['sales-cloud', 'copilot', 'assist-mode', 'adoption'],
    scenario:
      'A B2B sales org debates deploying an autonomous Agentforce SDR agent vs an assistive copilot embedded in Sales Cloud for reps drafting emails and summarizing calls.',
    answerPoints: [
      'Autonomous agents suit high-volume, rules-bound outbound with clear success criteria and human oversight queues',
      'Copilot assist keeps human in control—better for complex deals, relationship selling, and compliance',
      'Assess data quality: autonomous outreach fails with bad lead data; assist modes tolerate imperfect CRM hygene',
      'Define guardrails on autonomous sending—domain throttling, CAN-SPAM compliance, opt-out enforcement',
      'Measure rep productivity lift for copilot vs pipeline generation for autonomous SDR',
      'Plan change management: reps may resist autonomous agents competing for credit and commission',
      'Hybrid model: autonomous for nurture tiers, copilot for strategic accounts',
    ],
    followUps: [
      'How would you integrate Einstein Activity Capture data into agent context?',
      'What approval workflow is needed before an autonomous agent sends pricing?',
      'How do you prevent duplicate outreach when both reps and agents contact the same lead?',
    ],
    architectNote:
      'The build vs assist decision is organizational, not technical. Architects clarify accountability—who owns the outcome when an autonomous agent misquotes? Start assist-first in enterprise sales; earn autonomy with proven containment and compliance.',
  },
  {
    title: 'Handle long-running and asynchronous workflows initiated by agents',
    difficulty: 'ADVANCED',
    tags: ['async', 'platform-events', 'orchestration', 'reliability'],
    scenario:
      'Customers ask the agent to process warranty replacements requiring warehouse verification and shipping label generation—a process taking 10–30 minutes. Chat sessions cannot stay open waiting.',
    answerPoints: [
      'Acknowledge request synchronously, create a case/work order record, and return tracking reference to customer',
      'Offload long steps to Queueable Apex, Flow orchestration, or MuleSoft with status polling endpoints',
      'Use Platform Events or CDC to notify the customer via SMS/email when async work completes',
      'Design idempotent workflow starters so duplicate agent invocations do not create double shipments',
      'Expose status-check agent action reading case milestones—not re-running the whole workflow',
      'Set customer expectations on timing in the initial agent response',
      'Monitor stuck jobs with alerting on SLA breaches for async processes',
    ],
    followUps: [
      'How does the agent resume conversation when customer returns hours later?',
      'What happens if the async job fails after the agent promised completion?',
      'Would you use OmniScript or Flow orchestration for multi-step warranty fulfillment?',
    ],
    architectNote:
      'Agents should initiate durable workflows, not embody them. Pattern: commit intent to database, async execute, notify on completion. This mirrors good microservice design—short synchronous boundary, long async tail.',
  },
  {
    title: 'Design testing strategy for Agentforce before go-live',
    difficulty: 'INTERMEDIATE',
    tags: ['testing', 'qa', 'regression', 'uat'],
    scenario:
      'UAT begins in two weeks for a Agentforce deployment handling password resets, order tracking, and subscription changes. QA team asks what test artifacts you need beyond manual chat scripts.',
    answerPoints: [
      'Build golden conversation sets per topic covering happy path, edge cases, and escalation triggers',
      'Automate regression runs comparing expected action invocations and response keywords',
      'Test adversarial inputs: injection, profanity, off-topic, and ambiguous multi-intent messages',
      'Validate action authorization with users at different permission levels and unauthenticated guests',
      'Load test action backends—agent UX fails if order lookup API throttles at 50 concurrent sessions',
      'Include accessibility and multilingual utterance variants in test corpus',
      'Define exit criteria: max misroute rate, action error rate, and p95 response latency',
    ],
    followUps: [
      'How do you regression test when LLM responses are non-deterministic?',
      'Who owns golden utterance maintenance after launch—ops or dev?',
      'What synthetic monitoring would you run in production post go-live?',
    ],
    architectNote:
      'Non-deterministic outputs require testing contracts, not exact strings—assert on actions taken, citations present, and guardrail triggers. Invest in continuous golden-set evaluation; manual chat scripts do not scale past launch week.',
  },
  {
    title: 'Architect agent analytics and feedback loops for continuous improvement',
    difficulty: 'ADVANCED',
    tags: ['analytics', 'feedback-loop', 'crm-analytics', 'optimization'],
    scenario:
      'Three months post-launch, leadership wants a data-driven roadmap for Agentforce improvements but current reporting only shows session counts.',
    answerPoints: [
      'Instrument topic classification confidence, action success/failure, and knowledge retrieval scores',
      'Track conversation funnel: start → intent identified → action attempted → resolved/escalated',
      'Correlate agent sessions with case creation, reopen rates, and revenue outcomes in CRM Analytics',
      'Implement human reviewer sampling for qualitative grading of responses',
      'Feed unrecognized utterances into backlog for topic expansion or knowledge creation',
      'A/B test prompt and retrieval changes with holdout groups',
      'Publish monthly "agent health" scorecard tying engineering work to CX metrics',
    ],
    followUps: [
      'Which events should be streamed to Data Cloud vs stored in standard objects?',
      'How do you attribute a sale to agent-assisted vs human-assisted journeys?',
      'What privacy controls apply when storing full transcripts for analytics?',
    ],
    architectNote:
      'Without closed-loop analytics, Agentforce becomes a black box chat widget. Architects should design telemetry at deployment time—retrofit logging is painful. Tie every sprint to measurable movement in misroute rate or CSAT, not feature count.',
  },
  {
    title: 'Explain Einstein Trust Layer implications for Agentforce architects',
    difficulty: 'INTERMEDIATE',
    tags: ['trust-layer', 'data-masking', 'audit', 'einstein'],
    scenario:
      'Your CISO asks how customer PII is protected when prompts are sent to the LLM and whether data is used to train public models.',
    answerPoints: [
      'Einstein Trust Layer masks sensitive fields before LLM processing based on configured policies',
      'Data is not used to train public foundation models—Salesforce contractually isolates tenant data',
      'Audit trails capture prompt/response metadata for compliance review',
      'Architects must still minimize PII in prompts—masking is not substitute for data minimization',
      'Regional data residency requirements may affect which Einstein features are available',
      'Supplement Trust Layer with org-level DLP policies and field classification programs',
      'Document data flows for security questionnaires: CRM → Trust Layer → LLM → response path',
    ],
    followUps: [
      'Which fields should never enter agent context even with masking?',
      'How does Trust Layer interact with bring-your-own-model options?',
      'What audit data is available for SOC 2 evidence collection?',
    ],
    architectNote:
      'Trust Layer is necessary but not sufficient—architects own data minimization and action-level authorization. Security reviews should see architecture diagrams, not marketing slides. Proactively document what leaves the org boundary.',
  },
  {
    title: 'Design voice-enabled Agentforce with telephony integration',
    difficulty: 'ARCHITECT',
    tags: ['voice', 'telephony', 'service-cloud-voice', 'latency'],
    scenario:
      'A healthcare provider wants patients to call IVR and speak naturally with Agentforce for appointment scheduling, with HIPAA constraints on spoken PHI.',
    answerPoints: [
      'Integrate Service Cloud Voice or partner telephony with low-latency speech-to-text and text-to-speech pipelines',
      'Design shorter conversational turns—voice users tolerate less verbosity than chat readers',
      'Implement strong caller authentication before discussing PHI; use last-four SSN or patient portal PIN flows',
      'Configure barge-in handling so callers can interrupt prompts naturally',
      'Apply stricter retention policies on voice transcripts and recordings per HIPAA',
      'Plan fallback to human nurses for clinical questions—hard boundary in topic design',
      'Test acoustic edge cases: accents, background noise, and DTMF fallback paths',
    ],
    followUps: [
      'How do you meet HIPAA BAA requirements with voice AI vendors in the stack?',
      'What p95 latency target keeps voice conversations feeling natural?',
      'Should appointment booking actions write to Health Cloud objects or standard Events?',
    ],
    architectNote:
      'Voice magnifies latency and error costs—a misheard date of birth is worse than a typo in chat. Architect authentication early and keep clinical boundaries explicit in topic design, not buried in prompts.',
  },
  {
    title: 'Govern agent sprawl across business units in a large enterprise',
    difficulty: 'ARCHITECT',
    tags: ['governance', 'center-of-excellence', 'multi-bu', 'standards'],
    scenario:
      'Six business units independently built 14 Agentforce agents with duplicate actions, inconsistent branding, and conflicting refund policies.',
    answerPoints: [
      'Establish an Agentforce CoE owning standards for topics, actions, prompts, and security baselines',
      'Create a shared action library with certified invocable Flows and Apex services',
      'Implement agent registry catalog documenting owner, scope, connected systems, and risk tier',
      'Define review gates for new agents: security, legal, brand, and operational readiness',
      'Consolidate duplicate agents where journeys overlap; differentiate by data scope not policy',
      'Centralize analytics definitions so leadership sees enterprise-wide metrics',
      'Fund platform team to maintain shared components—do not leave reuse as voluntary',
    ],
    followUps: [
      'How do you balance BU autonomy with enterprise consistency?',
      'What metadata packaging strategy supports shared vs BU-specific agents?',
      'How often should the CoE audit live agents for drift and orphaned actions?',
    ],
    architectNote:
      'Agent sprawl mirrors SaaS sprawl—cheap to start, expensive to unwind. A CoE is not bureaucracy; it is how you prevent 14 refund actions with different limits. Shared libraries with federated ownership scale better than mandates alone.',
  },
  {
    title: 'Optimize agent action latency for real-time chat experiences',
    difficulty: 'ADVANCED',
    tags: ['performance', 'latency', 'caching', 'integration'],
    scenario:
      'Users abandon chats when Agentforce takes more than 8 seconds to respond after asking for order status. Order lookup hits three systems via MuleSoft.',
    answerPoints: [
      'Profile end-to-end latency: LLM reasoning, retrieval, and each action callout separately',
      'Cache order summaries in Platform Cache or Data Cloud calculated insights with short TTL',
      'Parallelize independent lookups using composite APIs or async aggregation patterns in Apex',
      'Return progressive responses: acknowledge query, show typing indicator, stream partial status',
      'Reduce action payload sizes—agents need summary fields, not full order line JSON',
      'Set callout timeouts and circuit breakers with graceful degradation messages',
      'Establish p95 latency SLOs per action with alerting in production',
    ],
    followUps: [
      'When is stale cached order data acceptable vs mandatory real-time lookup?',
      'Would moving integrations to Salesforce Connect help or hurt latency?',
      'How do governor limits affect parallel callout designs in agent actions?',
    ],
    architectNote:
      'Users perceive agent intelligence through speed. Architects must treat action backends as part of UX—optimize the critical path before tuning prompts. Progressive disclosure beats monolithic mega-responses.',
  },
  {
    title: 'Design disaster recovery and fallback when Agentforce is unavailable',
    difficulty: 'ADVANCED',
    tags: ['resilience', 'dr', 'fallback', 'availability'],
    scenario:
      'During a Salesforce incident, Agentforce stopped responding but voice and chat channels remained open. Customers received infinite typing indicators for 45 minutes.',
    answerPoints: [
      'Implement health checks on agent endpoints with automatic fallback to static FAQ or queue-to-human',
      'Configure channel-level contingency: IVR message, email auto-reply, or simplified bot with no LLM',
      'Document RTO/RPO for agent services separately from core CRM—know Einstein dependency chain',
      'Run game days simulating Agentforce degradation and measure operator response',
      'Maintain offline playbooks for contact center supervisors to disable bot routing quickly',
      'Communicate status page integration so customers know alternate contact options',
      'Post-incident: add synthetic probes alerting before customer volume spikes',
    ],
    followUps: [
      'Should fallback bots use rule-based dialogs or pure human queue?',
      'How do you sync conversation state when Agentforce recovers mid-session?',
      'What contractual SLAs does Salesforce provide for Einstein availability?',
    ],
    architectNote:
      'AI availability is not CRM availability. Design graceful degradation as first-class—customers forgive outages with clear messaging; they do not forgive silent bots. Keep a one-click kill switch for agent routing in runbooks.',
  },
  {
    title: 'Explain licensing and consumption considerations for Agentforce at scale',
    difficulty: 'INTERMEDIATE',
    tags: ['licensing', 'consumption', 'cost', 'planning'],
    scenario:
      'Finance asks for a 3-year TCO model before expanding Agentforce from pilot (500 sessions/month) to enterprise (500k sessions/month).',
    answerPoints: [
      'Identify license types: Agentforce add-ons, Einstein Requests, and underlying Service/Messaging entitlements',
      'Model consumption drivers: sessions, actions, voice minutes, and Data Cloud queries if used',
      'Forecast growth scenarios with seasonality—retail peaks can 10x volume',
      'Compare cost per contained session vs human handle cost for business case',
      'Plan license true-up cadence and sandbox/non-prod consumption that may still incur costs',
      'Include implementation and ongoing prompt/knowledge maintenance in TCO, not just licenses',
      'Negotiate enterprise agreements with caps and overage clarity before scale rollout',
    ],
    followUps: [
      'Which activities count as billable Einstein requests in your contract?',
      'How do you throttle non-critical agent features to manage consumption spikes?',
      'What cost allocation model splits Agentforce spend across business units?',
    ],
    architectNote:
      'Consumption pricing shifts architecture decisions—every retrieval and action has a marginal cost. Architects partner with finance early, building telemetry that forecasts spend alongside technical scale plans.',
  },
];

export const AGENTFORCE_EXTRAS: TopicTemplate[] = [
  {
    title: 'Configure agent persona and tone for brand consistency',
    difficulty: 'BEGINNER',
    tags: ['persona', 'brand', 'prompt-engineering'],
    scenario: 'Marketing requires the support agent to match brand voice guidelines across regions while remaining professional during complaints.',
    answerPoints: [
      'Define persona attributes in system instructions: tone, formality, empathy level, and prohibited slang',
      'Provide few-shot examples of on-brand responses for common scenarios',
      'Regional variants as separate prompt templates or topic-level overrides',
      'Escalation tone shift—more formal when discussing legal or billing disputes',
      'Review sample transcripts weekly with brand team scoring rubric',
      'Avoid over-constraining creativity where factual accuracy matters more than voice',
    ],
    followUps: ['How do you test persona drift after prompt updates?', 'Should tone differ by channel chat vs email?', 'Who approves persona changes—brand or product?'],
    architectNote: 'Persona is policy encoded in prompts—treat changes like UI copy updates with review gates.',
  },
  {
    title: 'Implement slot filling and entity extraction for booking flows',
    difficulty: 'INTERMEDIATE',
    tags: ['entities', 'slot-filling', 'scheduling'],
    scenario: 'The agent books service appointments but frequently misrecords dates when users say "next Friday" or "the 12th".',
    answerPoints: [
      'Use structured action inputs with required slots: date, time, service type, location',
      'Normalize relative dates server-side using org timezone and business calendar',
      'Confirm ambiguous slots explicitly before write actions',
      'Persist partial slot state across turns in session context',
      'Validate against resource availability via lookup action before confirmation',
      'Handle corrections gracefully without restarting entire flow',
    ],
    followUps: ['How do time zones affect multi-region booking?', 'Should confirmation be explicit yes/no or implicit?', 'What UX for invalid dates like Feb 30?'],
    architectNote: 'Never trust LLM date parsing alone—always confirm with deterministic Apex date logic.',
  },
  {
    title: 'Route agents by channel-specific capabilities',
    difficulty: 'INTERMEDIATE',
    tags: ['channels', 'routing', 'messaging'],
    scenario: 'WhatsApp users need image upload for damage claims but web chat users do not. One agent config serves all channels today.',
    answerPoints: [
      'Define channel capability matrix: media upload, authentication methods, max message length',
      'Deploy channel-specific agent variants or conditional topic availability',
      'Omni-Channel routing rules considering channel + intent',
      'Adapt prompts for shorter messages on SMS vs rich content on web',
      'Track containment separately per channel—do not aggregate blindly',
      'Unified analytics with channel dimension for fair comparison',
    ],
    followUps: ['Can one agent definition support conditional actions by channel?', 'How handle cross-channel session continuity?', 'What media storage compliance applies on WhatsApp?'],
    architectNote: 'Channel parity is a myth—architect for lowest common denominator with channel overlays.',
  },
  {
    title: 'Manage agent knowledge freshness after product launches',
    difficulty: 'INTERMEDIATE',
    tags: ['knowledge', 'change-management', 'launch'],
    scenario: 'A product launch changed return policies but the agent still cites old 30-day window for two weeks.',
    answerPoints: [
      'Tie knowledge publish workflow to product launch checklist with effective dates',
      'Use article metadata effective/expiry dates consumed by retrieval filters',
      'Run pre-launch regression conversations testing new policy utterances',
      'Temporary topic banner instructing agent to prioritize articles tagged launch-2025',
      'Monitor post-launch misinformation reports from CS agents',
      'Automated stale article alerts when products referenced in cases change',
    ],
    followUps: ['Who owns KB updates vs agent prompt updates during launches?', 'How sync external CMS with Salesforce Knowledge?', 'Rollback plan if wrong policy goes live?'],
    architectNote: 'Agents amplify stale content at scale—launch governance must include knowledge, not just code.',
  },
  {
    title: 'Design authentication flows for guest vs logged-in agent users',
    difficulty: 'ADVANCED',
    tags: ['authentication', 'identity', 'security'],
    scenario: 'Guest web chat users request order status while logged-in portal users expect account-level actions without re-verification.',
    answerPoints: [
      'Leverage authenticated messaging sessions tied to Experience Cloud identity',
      'OTP or order-number + email verification for guests before PII disclosure',
      'Progressive trust: more actions unlocked after stronger authentication',
      'Session binding to prevent order lookup with guessed numbers',
      'Clear UX messaging on why verification is required',
      'Audit failed auth attempts for fraud patterns',
    ],
    followUps: ['Integration with SSO for enterprise B2B portals?', 'How long should verified guest sessions last?', 'Balance friction vs security for high-value accounts?'],
    architectNote: 'Authentication is part of agent UX design—architect flows before action catalog, not after incidents.',
  },
  {
    title: 'Implement agent feedback collection from end users',
    difficulty: 'BEGINNER',
    tags: ['feedback', 'csat', 'ux'],
    scenario: 'Product wants thumbs up/down after agent conversations to identify bad responses quickly.',
    answerPoints: [
      'Post-session micro-survey linked to MessagingSession or conversation ID',
      'Capture optional free-text when thumbs down—route to review queue',
      'Correlate feedback with topic, actions used, and retrieval sources',
      'Avoid survey fatigue—sample sessions or trigger only on low-confidence resolutions',
      'Close loop notifying customers when issue addressed from feedback',
      'Dashboard for ops team with weekly review SLA',
    ],
    followUps: ['Bias in voluntary feedback vs random sampling?', 'Integrate with existing CSAT programs?', 'Use feedback to auto-create training utterances?'],
    architectNote: 'Explicit feedback complements implicit signals like reopen rate—use both.',
  },
  {
    title: 'Compare building custom LLM integrations vs native Agentforce',
    difficulty: 'ARCHITECT',
    tags: ['build-vs-buy', 'architecture', 'llm'],
    scenario: 'Engineering proposes a custom Azure OpenAI chatbot integrated via Heroku instead of Agentforce add-ons.',
    answerPoints: [
      'Native Agentforce provides Trust Layer, action framework, CRM context, and Salesforce support alignment',
      'Custom build offers model choice and deep customization at cost of security/compliance ownership',
      'TCO includes prompt ops, hosting, monitoring, and Salesforce integration maintenance',
      'Time-to-value faster with Agentforce for standard service/sales use cases',
      'Hybrid: Agentforce for CRM-bound actions, external LLM for specialized reasoning with strict gateways',
      'Evaluate build when requirements exceed platform roadmap with executive risk acceptance',
    ],
    followUps: ['What middleware pattern isolates custom LLM from CRM data?', 'How migrate from custom bot to Agentforce later?', 'Vendor lock-in concerns with either path?'],
    architectNote: 'Build custom only with clear capabilities Agentforce lacks and budget for permanent platform team—not as default developer preference.',
  },
  {
    title: 'Design agent actions for idempotent financial transactions',
    difficulty: 'ADVANCED',
    tags: ['idempotency', 'payments', 'reliability'],
    scenario: 'Network retries caused duplicate loyalty point credits when customers asked the agent to apply a promotion twice.',
    answerPoints: [
      'Accept idempotency keys on write actions stored with unique constraint',
      'Return same success response on duplicate key within TTL window',
      'Agent prompt instructs confirming amount before final credit action',
      'Transaction log object linking conversation ID to financial operations',
      'Reconciliation batch detecting duplicate credits by key or pattern',
      'Compensating actions for identified duplicates with audit trail',
    ],
    followUps: ['Standard idempotency key format across actions?', 'How expose idempotency to Flow vs Apex?', 'Customer messaging when duplicate detected?'],
    architectNote: 'Agents retry more than humans—every financial write action needs idempotency by design.',
  },
  {
    title: 'Enable supervisor coaching with agent conversation review tools',
    difficulty: 'INTERMEDIATE',
    tags: ['supervisor', 'quality', 'coaching'],
    scenario: 'Contact center supervisors need to review agent-handled chats for coaching but lack tooling beyond raw transcripts.',
    answerPoints: [
      'Surface structured session summaries with topic, actions, outcome flags',
      'Flag conversations for review: low CSAT, high latency, multiple escalations',
      'Playback with inline annotations linking to knowledge articles used',
      'Compare supervisor override rate when agents join mid-session',
      'Export review samples for training new topic utterances',
      'Role-based access respecting transcript PII policies',
    ],
    followUps: ['Automated quality scoring vs human review?', 'Integration with Workforce Engagement Management?', 'Retention period for coaching archives?'],
    architectNote: 'Supervisor tooling drives continuous improvement—invest alongside customer-facing agent.',
  },
  {
    title: 'Plan data retention and deletion for agent conversation logs',
    difficulty: 'ADVANCED',
    tags: ['retention', 'gdpr', 'privacy', 'compliance'],
    scenario: 'GDPR erasure requests must delete customer chat transcripts but cases referencing conversation summaries must remain for legal holds.',
    answerPoints: [
      'Classify transcript fields vs derived summary fields with different retention rules',
      'Implement erasure API workflow cascading to related analytics stores',
      'Legal hold flags preventing deletion of linked case records',
      'Document lawful basis for retention periods per jurisdiction',
      'Anonymize analytics datasets replacing PII with pseudonymous keys',
      'Regular retention job with audit logs of deletions performed',
    ],
    followUps: ['Impact on Data Cloud unified profiles?', 'Backup tapes containing transcripts?', 'Customer export of conversation history requests?'],
    architectNote: 'Retention architecture must be designed pre-launch—GDPR erasure across LLM logs is painful retrofits.',
  },
];

export const agentforceQuestions = buildQuestionBank('agentforce', [
  ...AGENTFORCE_DETAILED,
  ...AGENTFORCE_EXTRAS,
  ...AGENTFORCE_ADDITIONS,
]);
