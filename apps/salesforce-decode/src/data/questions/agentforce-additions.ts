import type { TopicTemplate } from './generator';

export const AGENTFORCE_ADDITIONS: TopicTemplate[] = [
  {
    title: 'Architect Email-to-Case triage agents for high-volume support queues',
    difficulty: 'ARCHITECT',
    tags: ['email-to-case', 'triage', 'service-cloud', 'routing'],
    scenario:
      'A SaaS vendor receives 15,000 support emails daily across product lines. Tier-0 agents must classify intent, extract account identifiers from messy threads, and route to product-specific queues without creating duplicate cases.',
    answerPoints: [
      'Parse email threads deterministically—strip signatures, quoted replies, and HTML before LLM classification',
      'Map extracted entities (org ID, case number, product SKU) to structured action inputs with validation rules',
      'Define confidence thresholds: auto-route above 85%, human review queue for ambiguous or multi-intent emails',
      'Deduplicate using Message-ID, In-Reply-To headers, and existing open case correlation logic',
      'Apply Einstein Trust Layer masking on email bodies before external LLM processing where required',
      'Log classification rationale and extracted fields for audit when customers dispute misrouting',
      'Measure auto-triage accuracy, duplicate case rate, and mean time to first human response separately from chat',
    ],
    followUps: [
      'How do you handle forwarded emails with multiple unrelated issues in one thread?',
      'Should the agent draft replies or only classify and route at tier-0?',
      'What is your rollback plan when a bad prompt deploy misroutes an entire product line?',
    ],
    architectNote:
      'Email agents differ fundamentally from chat—latency tolerance is higher but context noise is worse. Invest in pre-LLM parsing pipelines; never send raw MIME to the model.',
  },
  {
    title: 'Design Service Cloud Voice agents with real-time transcription grounding',
    difficulty: 'ARCHITECT',
    tags: ['service-cloud-voice', 'telephony', 'transcription', 'voice'],
    scenario:
      'A telco deploys Agentforce on Service Cloud Voice for billing inquiries. Callers speak with regional accents, interrupt frequently, and expect sub-second responses after they finish speaking.',
    answerPoints: [
      'Integrate streaming transcription with partial utterance handling and barge-in detection',
      'Ground responses on billing FAQ and account lookup actions—not free-form generation for amount due',
      'Set aggressive action timeouts; voice sessions fail faster than async chat on latency spikes',
      'Configure hold music and verbal acknowledgments while long-running lookups execute',
      'Escalate to human with transcript summary, intent timeline, and failed action log attached to VoiceCall',
      'Test accent and dialect coverage with recorded call corpus before regional rollout',
      'Monitor average response latency, interruption rate, and containment vs callback requests',
    ],
    followUps: [
      'How does PCI scope change when agents read card numbers aloud?',
      'What fallback when transcription confidence drops mid-call?',
      'Should voice and chat share one agent or separate topic configurations?',
    ],
    architectNote:
      'Voice is the highest-stakes Agentforce channel—users cannot re-read a response. Favor deterministic lookups and concise scripted confirmations over verbose LLM prose.',
  },
  {
    title: 'Prevent RAG hallucinations in customer-facing agent responses',
    difficulty: 'ARCHITECT',
    tags: ['rag', 'hallucination', 'grounding', 'knowledge'],
    scenario:
      'A healthcare payer agent cited a non-existent prior authorization policy, causing members to skip required steps. Legal demands proof that answers are grounded in approved knowledge only.',
    answerPoints: [
      'Constrain generation to retrieved chunks with citation requirements—reject answers when retrieval confidence is low',
      'Maintain allowlisted knowledge sources with version tags; block stale or draft articles from retrieval index',
      'Implement answer validation layer checking claims against structured policy tables where possible',
      'Use abstention prompts: agent must say it does not know rather than infer from partial context',
      'Run golden-set regression tests comparing agent answers to authoritative policy documents weekly',
      'Log retrieval IDs, chunk hashes, and final response for every member interaction',
      'Separate informational retrieval from transactional actions—never infer eligibility from prose alone',
    ],
    followUps: [
      'How do you handle conflicting knowledge articles across regions?',
      'Should citations be shown to end users or only stored for audit?',
      'What threshold triggers human review when retrieval score is borderline?',
    ],
    architectNote:
      'Hallucination prevention is architecture, not prompt tweaking. Combine retrieval gates, abstention policies, structured validation, and continuous eval—not one technique alone.',
  },
  {
    title: 'Implement agent action versioning with safe rollback in production',
    difficulty: 'ADVANCED',
    tags: ['versioning', 'cicd', 'agent-actions', 'deployment'],
    scenario:
      'A loyalty points redemption action was updated Friday evening; by Saturday morning agents double-credited thousands of accounts. Leadership requires versioned actions with instant rollback.',
    answerPoints: [
      'Version agent actions and invocable Apex with semantic versioning stored in custom metadata',
      'Deploy action changes through sandbox regression suites tied to specific agent topic versions',
      'Support blue-green agent configs: route small traffic percentage to new action version before full cutover',
      'Implement idempotency keys on all write actions so retries and rollbacks do not duplicate effects',
      'Maintain action changelog with owner, approval record, and linked test run IDs',
      'Rollback agent config to prior snapshot without redeploying Apex when issue is prompt-only',
      'Alert on anomalous action error rates and business metric spikes within minutes of deploy',
    ],
    followUps: [
      'How do you version Flow-backed actions differently from Apex?',
      'Can two action versions coexist for different agent personas?',
      'What metadata captures which action version executed for a given session?',
    ],
    architectNote:
      'Agent actions are production APIs with probabilistic callers. Apply the same release discipline as payment services—versioned contracts, canary traffic, and compensating transactions.',
  },
  {
    title: 'Build cost and usage monitoring for Agentforce at enterprise scale',
    difficulty: 'ADVANCED',
    tags: ['cost', 'monitoring', 'consumption', 'telemetry'],
    scenario:
      'Finance flagged a 340% spike in Einstein consumption after a marketing campaign drove traffic to a support agent. No team owns forecasting or per-business-unit chargeback.',
    answerPoints: [
      'Instrument sessions with business unit, channel, topic, retrieval count, and action invocation metrics',
      'Build dashboards correlating consumption credits to containment outcomes and revenue impact',
      'Set per-queue and per-agent budget alerts before monthly invoice surprises',
      'Identify expensive patterns: unbounded retrieval loops, redundant action calls, oversized context windows',
      'Establish finops review cadence with capacity planning for seasonal peaks',
      'Compare cost per contained case vs human handle cost to justify agent investment',
      'Document consumption drivers for executive steering committee decisions',
    ],
    followUps: [
      'How do sandbox tests contribute to consumption and how do you isolate that spend?',
      'Which actions are most credit-expensive in your architecture?',
      'Should business units have hard quotas or soft alerts?',
    ],
    architectNote:
      'Agentforce without cost telemetry becomes a black box line item. Architects treat tokens and credits like compute—tagged, metered, and attributed to business outcomes.',
  },
  {
    title: 'Design synthetic conversation testing for agent regression suites',
    difficulty: 'ADVANCED',
    tags: ['testing', 'regression', 'qa', 'synthetic-data'],
    scenario:
      'QA cannot manually test 200 topics before each release. Production incidents trace to utterance gaps and action failures that sandbox spot-checks missed.',
    answerPoints: [
      'Build synthetic conversation datasets covering happy path, edge cases, adversarial, and multilingual utterances',
      'Automate eval runs in CI comparing expected topic, actions invoked, and response constraints',
      'Score grounding fidelity—did the agent cite correct knowledge IDs for policy questions?',
      'Include red-team prompts for injection, jailbreak, and over-permissioned action attempts',
      'Track eval pass rate trends across releases; block deploy on regression below threshold',
      'Seed production-like data in partial sandbox copies for action integration tests',
      'Maintain human review sample of failed eval cases for taxonomy and prompt updates',
    ],
    followUps: [
      'How do you test voice agents synthetically vs text channels?',
      'What is minimum eval coverage before promoting agent config to production?',
      'Should eval datasets include real anonymized transcripts?',
    ],
    architectNote:
      'Manual chat-with-the-agent testing does not scale. Invest in eval infrastructure comparable to unit tests for Apex—deterministic assertions on topic, tools, and guardrails.',
  },
  {
    title: 'Differentiate Einstein Copilot assist mode from autonomous Agentforce workers',
    difficulty: 'INTERMEDIATE',
    tags: ['copilot', 'agentforce', 'assist-mode', 'design'],
    scenario:
      'Sales leadership wants reps to get AI help drafting emails while support wants fully autonomous case resolution. Architects must define when each pattern applies.',
    answerPoints: [
      'Copilot assist: human-in-the-loop, suggestions only, rep approves every customer-facing send',
      'Autonomous agents: end-customer facing, goal-oriented task completion within guardrails',
      'Copilot fits high-judgment sales negotiations; agents fit repeatable service workflows',
      'Different trust and compliance requirements—assist logs drafts; agents log executed actions',
      'License and consumption models may differ; map features to SKU entitlements early',
      'Avoid hybrid confusion where reps think copilot actions auto-execute to customers',
      'Shared actions layer can back both patterns with different invocation policies',
    ],
    followUps: [
      'Can one user session switch between copilot and agent contexts?',
      'How do you prevent copilot suggestions from leaking into autonomous channel configs?',
      'Which metrics differentiate copilot productivity from agent containment?',
    ],
    architectNote:
      'Copilot augments employees; agents serve customers. Conflating them creates compliance nightmares and unclear success metrics—architect separate experiences with shared action primitives.',
  },
  {
    title: 'Configure Einstein Trust Layer for agent PII masking and audit',
    difficulty: 'ADVANCED',
    tags: ['einstein-trust-layer', 'pii', 'masking', 'compliance'],
    scenario:
      'A bank agent must access account balances without sending full account numbers or SSN fragments to the external LLM. Auditors require proof of what data crossed the trust boundary.',
    answerPoints: [
      'Enable Trust Layer data masking for defined sensitive field patterns before LLM prompts',
      'Use secure data retrieval actions that return masked values to the model and full values only server-side',
      'Audit Trust Layer logs showing masked vs unmasked field handling per session',
      'Align retention policies for prompt/response logs with banking regulatory requirements',
      'Test that jailbreak attempts cannot reconstruct masked values from action side channels',
      'Document data residency and model provider agreements for cross-border deployments',
      'Separate dev/test orgs with synthetic data—never copy production PII to sandbox for agent tuning',
    ],
    followUps: [
      'What fields cannot be masked because the agent needs them for disambiguation?',
      'How does Trust Layer interact with custom Apex that builds prompt strings manually?',
      'Who approves exceptions when a use case requires unmasked LLM access?',
    ],
    architectNote:
      'Trust Layer is necessary but not sufficient—architects still validate that actions and custom integrations do not bypass masking by concatenating sensitive data into prompts.',
  },
  {
    title: 'Orchestrate Field Service dispatch agents with technician scheduling actions',
    difficulty: 'ARCHITECT',
    tags: ['field-service', 'scheduling', 'dispatch', 'agent-actions'],
    scenario:
      'A utilities company wants customers to reschedule field appointments via chat agent. Wrong dispatch windows cause truck rolls costing $400 each and SLA penalties.',
    answerPoints: [
      'Expose scheduling actions wrapping Field Service appointment APIs with territory and skill constraints',
      'Confirm appointment slots with explicit customer acknowledgment before commit action',
      'Validate service territory, resource availability, and entitlement before showing open windows',
      'Handle emergency vs standard priority with different routing and escalation rules',
      'Sync agent-created appointments to technician mobile apps with push notification triggers',
      'Implement compensating cancel/reschedule actions with audit trail for dispatch center',
      'Measure reschedule success rate, no-show rate, and agent-initiated vs human-initiated changes',
    ],
    followUps: [
      'How do weather emergencies override agent scheduling logic?',
      'Should agents offer only next-available slot or full calendar browse?',
      'What happens when the scheduling action times out mid-conversation?',
    ],
    architectNote:
      'Field Service agents sit on operational systems with physical world cost. Keep slot presentation deterministic; use the LLM for intent and confirmation, not calendar math.',
  },
  {
    title: 'Manage token budgets for long email and case thread agent sessions',
    difficulty: 'ADVANCED',
    tags: ['context-window', 'token-budget', 'email', 'summarization'],
    scenario:
      'Enterprise B2B cases with 40-email threads exceed context limits. The agent either truncates critical history or burns credits re-sending full threads each turn.',
    answerPoints: [
      'Implement rolling conversation summaries stored in session context updated after each significant turn',
      'Retrieve only relevant case comments via semantic search rather than full thread injection',
      'Define hard token budgets per channel with priority ranking: recent messages > case metadata > full history',
      'Use structured case timeline objects maintained by Apex summarization jobs for agent consumption',
      'Avoid re-grounding entire knowledge base when follow-up is clarifying a single field',
      'Monitor average tokens per session and alert on sessions exceeding 2x median',
      'Test summarization fidelity—critical commitments and dates must survive compression',
    ],
    followUps: [
      'Who owns summary quality when legal discovery requires original thread integrity?',
      'Should summaries be customer-visible or internal-only context?',
      'How do attachments factor into token budget for email agents?',
    ],
    architectNote:
      'Long-thread agents need memory architecture, not bigger windows. Summarize, index, and retrieve surgically—unbounded context is a cost and accuracy trap.',
  },
  {
    title: 'Integrate Einstein Case Classification with Agentforce routing decisions',
    difficulty: 'INTERMEDIATE',
    tags: ['case-classification', 'einstein', 'routing', 'service-cloud'],
    scenario:
      'Cases arrive from web, email, and social with inconsistent subject lines. Agents re-classify what Einstein already scored, causing duplicate work and routing loops.',
    answerPoints: [
      'Treat Einstein classification as authoritative input to agent routing unless confidence is low',
      'Pass classification labels, confidence scores, and extracted entities into agent session context at start',
      'Define handoff rules when agent disagreeing with classification must escalate rather than re-route silently',
      'Retrain classification models on agent correction feedback with human review gate',
      'Avoid duplicate taxonomy between Case Classification and Agent topics—maintain mapping table',
      'Measure alignment rate between Einstein labels and agent final disposition',
      'Document when to use classification-only routing vs full agent conversation',
    ],
    followUps: [
      'How often should classification models refresh vs agent prompt updates?',
      'Should low-confidence cases skip the agent entirely?',
      'What metadata links classification version to agent routing version?',
    ],
    architectNote:
      'Einstein Classification and Agentforce are complementary—classification is cheap deterministic routing; agents handle ambiguous dialogue. Do not rebuild classification inside agent prompts.',
  },
  {
    title: 'Design proactive outbound agents for appointment and payment reminders',
    difficulty: 'ADVANCED',
    tags: ['proactive', 'outbound', 'messaging', 'orchestration'],
    scenario:
      'A healthcare network wants agents to proactively remind patients of appointments and collect copay confirmations via SMS. TCPA and HIPAA constraints apply.',
    answerPoints: [
      'Verify consent and channel opt-in status via Data Cloud or CRM before any outbound agent message',
      'Use scheduled Flow or Data Cloud activation triggers initiating agent sessions with templated openings',
      'Limit proactive agents to narrow intents—confirm, reschedule, pay—not open-ended support',
      'Implement quiet hours, frequency caps, and stop-keyword handling per regulatory requirements',
      'Log lawful basis and consent snapshot ID with each outbound session for audit',
      'Escalate to human when patient expresses clinical symptoms or billing disputes beyond script',
      'Measure opt-out rate, confirmation completion, and complaint rate separately from inbound containment',
    ],
    followUps: [
      'How do proactive agents differ from Marketing Cloud journeys technically?',
      'What happens if the patient replies with an unrelated question mid-flow?',
      'Should outbound and inbound agents share topic configs?',
    ],
    architectNote:
      'Proactive agents are campaigns with conversational UI—architect consent, caps, and narrow scope first. Open-ended outbound agents generate regulatory and brand risk fast.',
  },
  {
    title: 'Enforce citation accuracy when agents reference knowledge articles',
    difficulty: 'INTERMEDIATE',
    tags: ['citations', 'knowledge', 'accuracy', 'grounding'],
    scenario:
      'Customers report agents linking to archived articles or paraphrasing policies incorrectly. Knowledge managers lose trust in Agentforce as a deflection channel.',
    answerPoints: [
      'Require agents to return knowledge article IDs used in generation, validated against retrieval set',
      'Block citations to unpublished, archived, or locale-mismatched articles at retrieval filter layer',
      'Display customer-facing links only after server-side verification article is published and current',
      'Run weekly audits comparing agent paraphrases to source article text for material deviations',
      'Feed correction tickets from agents into knowledge article update workflow',
      'Differentiate FAQ snippets vs full article body in retrieval to reduce over-summarization errors',
      'Track citation click-through and deflection rate per article to identify stale content',
    ],
    followUps: [
      'Should agents quote verbatim or always paraphrase for readability?',
      'How do you handle knowledge published in CMS outside Salesforce Knowledge?',
      'What UX when the correct article exists but retrieval missed it?',
    ],
    architectNote:
      'Citations are trust signals—broken links destroy containment gains. Treat citation validation as server-side gate, not LLM formatting preference.',
  },
  {
    title: 'Parse multilingual HTML email bodies for agent context extraction',
    difficulty: 'ADVANCED',
    tags: ['email', 'multilingual', 'html-parsing', 'nlp'],
    scenario:
      'A global manufacturer receives warranty claims in German, Japanese, and English with inline images and legal footers. Agents misidentify product serial numbers buried in HTML tables.',
    answerPoints: [
      'Normalize HTML to plain text with table structure preserved for serial number extraction',
      'Detect language per message segment; route to locale-specific agent topics and knowledge filters',
      'Extract structured entities via regex and ML parsers before LLM summarization of free text',
      'Handle image attachments with OCR pipeline feeding extracted text as separate context block',
      'Strip legal disclaimers and marketing footers using known template patterns per region',
      'Validate serial numbers against product registry action—not LLM pattern guessing alone',
      'Measure extraction accuracy per locale; expand training utterances for underperforming languages',
    ],
    followUps: [
      'Should translation happen before or after entity extraction?',
      'How do right-to-left languages affect email parsing pipelines?',
      'What retention rules apply to OCR data from customer-uploaded images?',
    ],
    architectNote:
      'Multilingual email is a data engineering problem wearing an agent costume. Parse and extract deterministically; let the LLM reason over clean structured context.',
  },
  {
    title: 'Architect HIPAA-compliant agent guardrails for patient support',
    difficulty: 'ARCHITECT',
    tags: ['hipaa', 'healthcare', 'compliance', 'guardrails'],
    scenario:
      'A hospital system deploys agents for appointment scheduling and billing questions. PHI must never appear in logs sent to external model providers, and agents must not diagnose conditions.',
    answerPoints: [
      'Scope agents to administrative intents only—scheduling, billing, directions—not clinical advice',
      'Apply minimum necessary PHI in prompts; use internal patient tokens instead of full identifiers in LLM context',
      'Configure BAA-covered Einstein features and verify data residency requirements',
      'Implement output filters blocking diagnostic language, medication recommendations, and symptom triage',
      'Restrict agent actions to read-only PHI lookups unless authenticated patient identity is verified',
      'Maintain access logs meeting HIPAA audit trail requirements with role-based transcript access',
      'Conduct annual risk assessment including agent-specific threat scenarios and breach drills',
    ],
    followUps: [
      'How do you verify patient identity in chat without exposing PHI to the model?',
      'What is the escalation path when a patient describes an emergency symptom?',
      'Can agents send appointment details via SMS under HIPAA?',
    ],
    architectNote:
      'Healthcare agents require narrow intent scope and defense-in-depth. If clinical questions are in scope, you need clinician-in-the-loop—not stronger prompts alone.',
  },
  {
    title: 'Chain dependent agent actions without fragile multi-step prompts',
    difficulty: 'ADVANCED',
    tags: ['action-chains', 'orchestration', 'flow', 'design-patterns'],
    scenario:
      'An insurance agent must verify policy, check coverage, and create a claim draft. When step two fails, partial claim records confuse adjusters and customers.',
    answerPoints: [
      'Model multi-step workflows as explicit state machine in Flow or Apex orchestrator, not LLM improvisation',
      'Each agent action returns structured status codes the agent interprets for next user message',
      'Use saga pattern with compensating actions rolling back prior steps on failure',
      'Persist workflow state in custom object linked to session ID surviving agent handoffs',
      'Limit LLM to conversational layer; business sequencing lives in deterministic code',
      'Define timeout and retry policies per action with customer-facing progress messages',
      'Integration test full chains including mid-chain failure and recovery paths',
    ],
    followUps: [
      'When should a single composite action replace a visible multi-step chain?',
      'How do you expose chain progress in agent UI for transparency?',
      'Should failed chains auto-escalate or offer retry to customer?',
    ],
    architectNote:
      'LLMs are poor workflow engines. Chain actions in code; let agents explain and confirm steps conversationally.',
  },
  {
    title: 'Ensure sandbox and production agent behavior parity before release',
    difficulty: 'INTERMEDIATE',
    tags: ['sandbox', 'parity', 'deployment', 'testing'],
    scenario:
      'Agents pass UAT in full sandbox but fail in production because production knowledge indexes, Data Cloud segments, and action permissions differ.',
    answerPoints: [
      'Maintain parity checklist: knowledge publish state, action profiles, connected app scopes, Data Cloud activations',
      'Use partial copy sandboxes with anonymized production-like volumes for retrieval testing',
      'Script metadata deploy packages including agent config, topics, actions, and prompt templates together',
      'Run identical eval suites against sandbox and staging before production promotion',
      'Document intentional sandbox differences—mock payment actions, test-only queues',
      'Validate integration endpoints point to correct environment via named credentials per org',
      'Post-deploy smoke tests in production with synthetic sessions in off-peak windows',
    ],
    followUps: [
      'How do scratch orgs fit agent development vs full sandbox UAT?',
      'What production data is safe to mirror for retrieval quality testing?',
      'Who signs off on parity checklist—ops or product?',
    ],
    architectNote:
      'Agent parity is integration parity plus content parity. A perfect prompt fails when production Knowledge has 30% fewer indexed articles than sandbox.',
  },
  {
    title: 'Escalate agent sessions to Omni Supervisor with structured context packets',
    difficulty: 'INTERMEDIATE',
    tags: ['escalation', 'omni-supervisor', 'handoff', 'service-cloud'],
    scenario:
      'Human agents complain that bot escalations arrive with no summary, forcing customers to repeat information and increasing handle time.',
    answerPoints: [
      'Generate structured handoff payload: intent, entities collected, actions attempted, failure reason, sentiment estimate',
      'Attach transcript summary—not full raw log—to Case and Omni routing record',
      'Pass customer verification status so human does not re-authenticate unnecessarily',
      'Route to skilled queue based on agent classification and failed action type',
      'Preserve chat session continuity where channel supports warm transfer',
      'Track escalation quality via human agent feedback scoring on handoff usefulness',
      'Define SLAs for escalation queue pickup after agent exit',
    ],
    followUps: [
      'What PII should be excluded from supervisor dashboard summaries?',
      'How do voice escalations differ from messaging handoff packets?',
      'Should customers see that they are being transferred mid-session?',
    ],
    architectNote:
      'Escalation without context destroys containment ROI. Treat handoff packets as a first-class API contract between agent and human workflows.',
  },
  {
    title: 'Route custom LLM models through Einstein Trust Layer policies',
    difficulty: 'ARCHITECT',
    tags: ['custom-models', 'trust-layer', 'llm-routing', 'governance'],
    scenario:
      'Enterprise architecture approved a fine-tuned domain model for product troubleshooting but security mandates all LLM traffic use Trust Layer masking and logging.',
    answerPoints: [
      'Evaluate whether custom model integrates via Einstein Trust Layer supported pathways vs prohibited direct callouts',
      'If direct integration required, replicate masking and audit controls in middleware gateway',
      'Define model routing rules by topic sensitivity—general FAQ vs regulated financial intents',
      'Maintain model registry with owner, validation date, eval scores, and approved use cases',
      'Implement fallback to Salesforce-managed models when custom endpoint unavailable',
      'Compare output quality and cost across models with A/B telemetry—not anecdotal preference',
      'Legal review of custom model training data provenance and output liability',
    ],
    followUps: [
      'When does BYOLLM violate org security policy despite Trust Layer?',
      'How do you prevent agents from invoking unapproved models via custom actions?',
      'What eval gates block custom model promotion to production?',
    ],
    architectNote:
      'Custom models trade control for operational burden. Architects either stay on Trust Layer-native paths or accept building equivalent governance middleware themselves.',
  },
  {
    title: 'Define executive SLIs for agent program health dashboards',
    difficulty: 'INTERMEDIATE',
    tags: ['metrics', 'sli', 'executive', 'analytics'],
    scenario:
      'The CIO wants a single dashboard proving Agentforce value to the board. Teams disagree on whether to headline containment, CSAT, or cost savings.',
    answerPoints: [
      'Primary SLI: contained resolution rate weighted by case complexity tier',
      'Guardrail SLIs: CSAT delta vs human baseline, escalation rate, compliance incident count',
      'Efficiency SLI: cost per contained interaction vs fully loaded human handle cost',
      'Quality SLI: knowledge citation accuracy and action error rate trends',
      'Adoption SLI: channel coverage and session volume vs forecast',
      'Segment dashboards by business unit, channel, and customer tier for actionable drill-down',
      'Avoid vanity metrics like raw message count without outcome linkage',
    ],
    followUps: [
      'How do you attribute revenue retention to agent improvements?',
      'Should SLIs be real-time or daily aggregates for executive view?',
      'What baseline period defines success for a new agent launch?',
    ],
    architectNote:
      'Executive dashboards need outcome metrics with guardrails—not containment alone. Pair efficiency with quality or you optimize into customer misery.',
  },
  {
    title: 'Package reusable agent templates across business units with governance',
    difficulty: 'ARCHITECT',
    tags: ['packaging', 'governance', 'multi-bu', 'templates'],
    scenario:
      'Five divisions each built similar order-status agents with divergent actions and prompts. Central architecture wants shared templates without blocking local customization.',
    answerPoints: [
      'Define core template package: base topics, standard actions, guardrails, and eval suites as unlocked metadata',
      'Allow BU extensions via layered config—local knowledge filters and branding overlays only',
      'Establish agent review board approving template changes and BU deviations',
      'Version templates in source control with semantic release notes',
      'Centralize shared invocable actions in managed package reducing duplication',
      'Track template adoption and drift metrics—BUs overriding critical guardrails trigger review',
      'Provide migration tooling when template major version upgrades break extensions',
    ],
    followUps: [
      'Managed vs unmanaged packages for agent components?',
      'How do BUs test template upgrades before mandatory adoption?',
      'Who owns break-fix when central template causes BU production incident?',
    ],
    architectNote:
      'Agent sprawl mirrors integration sprawl—templates without governance become forks. Centralize contracts and guardrails; localize persona and knowledge scope.',
  },
  {
    title: 'Process email attachments in agent workflows for claims and returns',
    difficulty: 'ADVANCED',
    tags: ['attachments', 'email', 'claims', 'document-processing'],
    scenario:
      'Insurance FNOL agents must accept photos of vehicle damage via email attachments. Agents ignore attachments or hallucinate damage assessments without analyzing images.',
    answerPoints: [
      'Extract attachments to secure storage; virus scan and size validate before processing',
      'Route images through approved vision or OCR service via invocable action—not LLM guessing',
      'Agent conversational layer collects metadata; image analysis action returns structured damage tags',
      'Never allow agent to estimate repair cost from image alone without estimator action integration',
      'Link processed files to Case with retention and access controls matching claim records',
      'Inform customer when attachment unreadable and request re-send with format guidance',
      'Audit attachment processing pipeline for bias and accuracy against adjuster review sample',
    ],
    followUps: [
      'What file types and size limits at agent vs infrastructure layer?',
      'How do GDPR erasure requests apply to attachment derivatives?',
      'Should agents acknowledge receipt before async processing completes?',
    ],
    architectNote:
      'Attachments need async document pipelines. Agents coordinate collection and explain results—they do not silently pretend to see files.',
  },
  {
    title: 'Run A/B experiments on agent prompts and topics with statistical rigor',
    difficulty: 'ADVANCED',
    tags: ['ab-testing', 'experimentation', 'optimization', 'prompts'],
    scenario:
      'Product wants to test two refund policy phrasings to maximize containment without hurting CSAT. Ad-hoc toggling caused inconsistent customer experiences last quarter.',
    answerPoints: [
      'Define experiment units—session or customer—with consistent assignment for duration of interaction',
      'Power analysis determining sample size before declaring winner on containment or CSAT',
      'Isolate one variable per experiment: prompt wording OR topic threshold, not both',
      'Instrument variant ID in session metadata for downstream analytics joins',
      'Set automatic stop rules for guardrail breaches—CSAT drop, error spike, compliance flag',
      'Run experiments per channel; chat and email behavior differs materially',
      'Document winner promotion through standard CI/CD with eval regression gate',
    ],
    followUps: [
      'How long should experiments run for seasonal businesses?',
      'Can customers re-enter and get different variants?',
      'Who approves experiments touching regulated content?',
    ],
    architectNote:
      'Agent optimization without experimentation discipline is guesswork. Treat prompts like product features—hypothesis, metric, sample size, ship or revert.',
  },
  {
    title: 'Detect and contain agent infinite loops in multi-action conversations',
    difficulty: 'INTERMEDIATE',
    tags: ['infinite-loop', 'reliability', 'guardrails', 'session-management'],
    scenario:
      'Customers report agents repeatedly asking for order number after it was provided three times, burning session time and credits until timeout.',
    answerPoints: [
      'Track action and prompt repetition count per session; force escalation after N identical loops',
      'Persist successfully captured entities in session state preventing re-collection prompts',
      'Detect tool-call cycles where same action invoked with identical inputs without state change',
      'Implement circuit breaker escalating to human when error rate exceeds threshold in session',
      'Log loop signatures for taxonomy fixes—missing entity mapping vs bad action response',
      'Customer-facing apology and exit path when loop detected—not silent retry forever',
      'Alert ops on loop rate spikes indicating deploy regression',
    ],
    followUps: [
      'Should loop detection live in agent config, Flow, or middleware?',
      'How do you distinguish intentional confirmation from loops?',
      'What customer compensation policy follows bad loop experiences?',
    ],
    architectNote:
      'Loops are reliability bugs visible to customers. Combine session state discipline with hard escalation caps—prompts asking the model to stop looping fail under pressure.',
  },
  {
    title: 'Align agent deflection strategy with Email-to-Case auto-response policies',
    difficulty: 'INTERMEDIATE',
    tags: ['deflection', 'email-to-case', 'auto-response', 'strategy'],
    scenario:
      'Marketing enabled auto-replies promising 24-hour human response while agents send instant KB links, confusing customers who reply to both threads.',
    answerPoints: [
      'Unify email response policy across auto-response rules and agent first-message templates',
      'Define when agent resolves without case creation vs creates case with agent-handled status',
      'Coordinate sender addresses and threading headers preventing duplicate conversation forks',
      'Set expectations in first agent message: self-service resolution path vs human follow-up SLA',
      'Measure deflection only when customer confirms issue resolved—not mere auto-send',
      'Align case status transitions so human queues exclude agent-resolved threads correctly',
      'Review auto-response and agent content quarterly for conflicting promises',
    ],
    followUps: [
      'Should agents close cases or leave open pending customer confirmation?',
      'How do OOO auto-replies interact with agent sessions?',
      'What metrics prove deflection without harming CSAT?',
    ],
    architectNote:
      'Email deflection fails when channel policies fight each other. One owner for customer-facing email experience spanning rules, agents, and templates.',
  },
];
