import { buildQuestionBank, type TopicTemplate } from './generator';
import { DATA_CLOUD_ADDITIONS } from './data-cloud-additions';

export const DATA_CLOUD_DETAILED: TopicTemplate[] = [
  {
    title: 'Design identity resolution rules for a multi-brand retailer',
    difficulty: 'ARCHITECT',
    tags: ['identity-resolution', 'unified-profile', 'matching-rules'],
    scenario:
      'A retailer operates three brands with separate e-commerce sites, a loyalty app, and in-store POS. Customers use different emails per brand but share one phone number. Marketing needs a single golden profile without incorrect merges.',
    answerPoints: [
      'Inventory all data sources with primary identifiers: email, phone, loyalty ID, device ID, and anonymous cookie',
      'Define match rules in priority order: verified loyalty ID > phone + last name > email exact match',
      'Use probabilistic matching with confidence thresholds; route low-confidence matches to review queues',
      'Implement survivorship rules for conflicting attributes (e.g., most recent address wins)',
      'Separate household vs individual profiles if B2C models require it',
      'Test match accuracy with labeled golden datasets before production activation',
      'Monitor false merge rate and provide unmerge workflows with downstream propagation',
    ],
    followUps: [
      'How do you handle shared family email addresses without incorrect unification?',
      'What is your strategy for anonymous web visitors converting to known profiles?',
      'How often should match rules be recalibrated as data quality improves?',
    ],
    architectNote:
      'Identity resolution is the foundation—bad merges poison every downstream segment and agent personalization. Start conservative with match thresholds; false merges are harder to undo than false splits.',
  },
  {
    title: 'Architect batch vs streaming ingestion for Data Cloud',
    difficulty: 'ADVANCED',
    tags: ['ingestion', 'streaming', 'batch', 'latency'],
    scenario:
      'Marketing wants near-real-time cart abandonment segments while finance requires nightly reconciled order totals from ERP. Both feed the same Data Cloud org.',
    answerPoints: [
      'Map data freshness requirements per source: streaming for behavioral events, batch for financial snapshots',
      'Use Connector SDK or Ingestion API for high-volume streaming with idempotent event keys',
      'Schedule S3/Azure blob batch loads for ERP with file arrival monitoring and error quarantine',
      'Define SLAs: streaming p95 latency vs batch completion window before downstream activation',
      'Separate data streams into distinct DLOs before harmonization to preserve lineage',
      'Implement reconciliation jobs comparing streaming counts vs batch totals daily',
      'Document backfill procedures when streaming pipelines fail and batch must catch up',
    ],
    followUps: [
      'When would you use Zero Copy vs ingested copies for Snowflake data?',
      'How do ingestion costs scale with streaming vs batch in your contract model?',
      'What happens to segments when streaming lag exceeds activation window?',
    ],
    architectNote:
      'Not everything needs streaming—architects align ingestion mode to business action latency. Pay for real-time only where activation or service depends on it.',
  },
  {
    title: 'Explain Data Model Objects vs standard CRM objects in architecture',
    difficulty: 'INTERMEDIATE',
    tags: ['dmo', 'data-model', 'mapping', 'harmonization'],
    scenario:
      'Your integration team asks why customer data lands in Individual and Contact Point Email DMOs instead of directly updating Salesforce Contact records.',
    answerPoints: [
      'DMOs are canonical schema in Data Cloud independent of any single source system shape',
      'Ingestion lands raw data in DLOs; mapping transforms to DMOs with standardized fields',
      'CRM objects remain system-of-record for operational workflows; Data Cloud is analytical/profile layer',
      'Bi-directional sync requires explicit activation or Data Actions—not automatic DMO-to-Contact write',
      'DMO design enables multi-source unification impossible in single Contact object model',
      'Governance: DMO field additions need enterprise data council approval',
      'Lineage metadata tracks which source contributed each attribute value',
    ],
    followUps: [
      'When should you use Custom DMOs vs extending standard DMOs?',
      'How do DMO changes impact existing segments and calculated insights?',
      'What is the pattern for operationalizing insights back to Sales Cloud?',
    ],
    architectNote:
      'Treat DMOs as the enterprise customer schema, not a staging area for CRM. Confusion here causes teams to expect real-time Contact updates from every ingested event.',
  },
  {
    title: 'Build segmentation strategy for churn prevention use case',
    difficulty: 'ADVANCED',
    tags: ['segmentation', 'marketing', 'churn', 'activation'],
    scenario:
      'A subscription SaaS company wants to identify at-risk customers using product usage events, support cases, and billing data already in Data Cloud.',
    answerPoints: [
      'Define churn label historically using cancelled subscriptions vs active cohorts',
      'Create calculated insights: login frequency trend, support case count, payment failures',
      'Build segments combining behavioral thresholds with recency-weighted scores',
      'Validate segment stability—avoid over-fitting to seasonal usage patterns',
      'Activate segment to Journey Builder or Agentforce with holdout group for measurement',
      'Refresh segment membership on schedule aligned to intervention window (e.g., daily)',
      'Track segment precision: what % of "at-risk" actually churn without intervention',
    ],
    followUps: [
      'How do you prevent segment overlap causing duplicate outreach?',
      'Real-time vs batch segment refresh for in-app interventions?',
      'Privacy implications of using support sentiment in churn models?',
    ],
    architectNote:
      'Segments are hypotheses—architect measurement into activation from day one. Without holdout groups, marketing claims wins that data cannot support.',
  },
  {
    title: 'Design data governance and consent management in Data Cloud',
    difficulty: 'ARCHITECT',
    tags: ['governance', 'consent', 'privacy', 'gdpr'],
    scenario:
      'Legal requires that marketing activations respect opt-out flags stored in three systems with inconsistent consent timestamps and purposes.',
    answerPoints: [
      'Harmonize consent into Contact Point Consent DMO with purpose, channel, and effective date',
      'Define survivorship: most restrictive consent wins when sources conflict',
      'Apply consent filters at segment definition layer—not only at activation export',
      'Integrate Privacy Center or CMP webhook updates via streaming ingestion',
      'Audit trail for consent changes with source system reference',
      'Data classification tags on DMO fields: PII, sensitive, anonymizable',
      'Regular compliance reports proving activations excluded opted-out individuals',
    ],
    followUps: [
      'How handle legacy records with unknown consent status?',
      'Cross-border data residency impact on unified profiles?',
      'Right-to-erasure workflow across Data Cloud and activated destinations?',
    ],
    architectNote:
      'Consent is not a checkbox on export—it must be embedded in segment logic. Architects who defer governance to "marketing will filter" inherit regulatory risk.',
  },
  {
    title: 'Implement calculated insights for customer lifetime value',
    difficulty: 'ADVANCED',
    tags: ['calculated-insights', 'clv', 'metrics', 'analytics'],
    scenario:
      'Leadership wants CLV available on unified profiles for service prioritization and media spend optimization. Source data spans 5 years of orders across brands.',
    answerPoints: [
      'Define CLV formula aligned with finance: historical revenue, margin, retention curve, or predictive model',
      'Use calculated insights with appropriate aggregation windows and currency normalization',
      'Handle returns and refunds in net revenue calculations',
      'Segment CLV by brand vs enterprise total—document which is canonical',
      'Refresh cadence: nightly for operational use vs weekly for strategic planning',
      'Validate against finance reports with tolerance thresholds and exception reporting',
      'Expose CLV to Service Cloud via Data Cloud related lists or activation—not duplicated formulas in CRM',
    ],
    followUps: [
      'Predictive CLV vs historical—when to use Einstein in Data Cloud?',
      'How CLV updates when identity merge occurs?',
      'Performance impact of complex CI on segment refresh times?',
    ],
    architectNote:
      'One definition of CLV enterprise-wide—multiple conflicting calculated insights destroy trust. Partner with finance on formula before building.',
  },
  {
    title: 'Plan activation paths from Data Cloud to external ad platforms',
    difficulty: 'INTERMEDIATE',
    tags: ['activation', 'advertising', 'segments', 'integrations'],
    scenario:
      'Marketing activates "high-intent purchasers" segment to Meta and Google Ads. Match rates are below 40% and audiences shrink weekly.',
    answerPoints: [
      'Ensure activation includes hashed email and phone from verified contact points',
      'Expand identifier coverage by improving identity resolution on anonymous converters',
      'Use Strategic Audience Composition best practices per platform requirements',
      'Monitor audience size trends—shrinking may indicate consent filtering or match rule changes',
      'Separate segments by activation channel to tune identifier mix per platform',
      'Compliance review for lookalike modeling on sensitive segments',
      'Feedback loop: import campaign performance metrics back for attribution analysis',
    ],
    followUps: [
      'How often should activation sync run for dynamic audiences?',
      'Impact of iOS ATT on mobile identifier activation?',
      'Clean room alternatives for partner data sharing?',
    ],
    architectNote:
      'Activation quality equals identity quality. Architects should dashboard match rates alongside segment counts—marketing often blames platforms when data is the bottleneck.',
  },
  {
    title: 'Architect Data Cloud in a multi-org Salesforce estate',
    difficulty: 'ARCHITECT',
    tags: ['multi-org', 'enterprise', 'architecture', 'strategy'],
    scenario:
      'A conglomerate has 12 Salesforce orgs across regions. HQ mandates one enterprise customer view but regions resist centralizing operational CRM.',
    answerPoints: [
      'Position Data Cloud as analytical unification layer without forcing single CRM org',
      'Ingest from all regional orgs via CRM Connector with org identifier dimension',
      'Define global vs regional DMO extensions for market-specific attributes',
      'Establish data residency partitions if EU/APAC data cannot co-mingle',
      'Governance council with regional data stewards approving match rule changes',
      'Activation back to regional orgs via Data Actions with scoped payloads',
      'Avoid duplicating Data Cloud instances without clear legal/technical boundary',
    ],
    followUps: [
      'One Data Cloud org vs multiple connected instances?',
      'How handle conflicting customer IDs across regional CRMs?',
      'Cost allocation model for shared Data Cloud consumption?',
    ],
    architectNote:
      'Data Cloud enables multi-org strategy that CRM consolidation failed to achieve—sell it as federation, not takeover.',
  },
  {
    title: 'Troubleshoot segment count discrepancies vs source queries',
    difficulty: 'INTERMEDIATE',
    tags: ['troubleshooting', 'segments', 'data-quality'],
    scenario:
      'A segment defined as "customers with 2+ purchases in 90 days" returns 45k members but a Snowflake query on source data shows 62k.',
    answerPoints: [
      'Verify ingestion completeness: missing batches, failed records in quarantine',
      'Check identity resolution: duplicate individuals counted once in DC vs twice in source',
      'Confirm segment refresh timestamp vs Snowflake query as-of time',
      'Review consent and exclusion filters applied in segment but not source SQL',
      'Validate DMO mapping dropped records failing validation rules',
      'Compare calculated insight logic to raw SQL aggregation definitions',
      'Use Data Explorer and query APIs to trace sample individuals in vs out',
    ],
    followUps: [
      'Tools for automated reconciliation between DC and warehouse?',
      'How communicate discrepancies to business stakeholders?',
      'When to fix data vs adjust segment definition?',
    ],
    architectNote:
      'Discrepancies are usually identity, consent, or timing—not platform bugs. Architects build reconciliation dashboards proactively.',
  },
  {
    title: 'Design real-time personalization with Data Cloud and Agentforce',
    difficulty: 'ADVANCED',
    tags: ['personalization', 'real-time', 'agentforce', 'profiles'],
    scenario:
      'E-commerce wants the website and support agent to recognize VIP shoppers within seconds of login using unified profile segments and recent browse events.',
    answerPoints: [
      'Stream web behavioral events into Data Cloud with sub-minute ingestion latency',
      'Maintain "VIP" and "recently browsed category" as rapidly refreshing segments or CI flags',
      'Expose profile attributes via Profile API or activation to Experience Cloud',
      'Agentforce retrieves segment membership and recent events from Data Cloud context',
      'Cache hot attributes at edge with TTL for page load performance',
      'Fallback gracefully when profile enrichment latency exceeds UX threshold',
      'Measure lift in conversion and CSAT from real-time personalization cohort',
    ],
    followUps: [
      'Profile API rate limits at peak traffic?',
      'Conflict when streaming events arrive before batch order history?',
      'Anonymous-to-known profile transition mid-session handling?',
    ],
    architectNote:
      'Real-time personalization is a pipeline SLA problem spanning ingestion, identity, segments, and consumption—architect end-to-end latency budgets.',
  },
  {
    title: 'Evaluate Zero Copy vs copy-based ingestion for Snowflake',
    difficulty: 'ADVANCED',
    tags: ['zero-copy', 'snowflake', 'federation', 'cost'],
    scenario:
      'Enterprise data warehouse team prefers Zero Copy federation to avoid duplicating 50TB of customer data into Data Cloud storage.',
    answerPoints: [
      'Zero Copy reduces storage duplication and sync lag for warehouse-authoritative datasets',
      'Query performance depends on federation latency—may not suit high-frequency segment refresh',
      'Copy-based ingestion better for high-volume activation and offline processing patterns',
      'Hybrid: Zero Copy for exploratory CI development, materialized copies for production segments',
      'Security: evaluate row-level access policies propagating from Snowflake',
      'Cost model differs: federation query costs vs Data Cloud credit consumption',
      'Disaster recovery: understand dependency if Snowflake unavailable during activation',
    ],
    followUps: [
      'Can calculated insights run directly on Zero Copy objects?',
      'Governance when warehouse schema changes break mappings?',
      'Latency benchmarks acceptable for your use cases?',
    ],
    architectNote:
      'Zero Copy is not free performance—architects benchmark segment refresh with federation before committing marketing SLAs.',
  },
  {
    title: 'Implement data quality monitoring and quarantine patterns',
    difficulty: 'INTERMEDIATE',
    tags: ['data-quality', 'monitoring', 'quarantine', 'ops'],
    scenario:
      'Bad email formats from a legacy CRM pollute activation exports, causing 15% bounce rates on email journeys.',
    answerPoints: [
      'Define validation rules at ingestion mapping: email regex, phone E.164, required fields',
      'Route failed records to quarantine DLO with error reason for steward review',
      'Dashboard data quality KPIs: completeness, validity, uniqueness per source',
      'Automated alerts when error rate exceeds baseline threshold',
      'Steward workflow to fix, replay, or exclude quarantined records',
      'Source system feedback loop notifying CRM admins of systematic issues',
      'SLA for quarantine resolution before next activation cycle',
    ],
    followUps: [
      'Who owns quarantine resolution—central team or source admins?',
      'Replay mechanics without duplicate unified profiles?',
      'Quality rules version control and impact on historical segments?',
    ],
    architectNote:
      'Data Cloud amplifies quality problems at activation speed—invest in quarantine upfront, not after marketing deliverability crashes.',
  },
  {
    title: 'Design semantic data model for B2B accounts and contacts',
    difficulty: 'ADVANCED',
    tags: ['b2b', 'account', 'semantic-model', 'unification'],
    scenario:
      'A B2B manufacturer ingests accounts from SAP, Salesforce CRM, and partner portal. Hierarchy and contact roles differ across systems.',
    answerPoints: [
      'Model Account and Individual DMOs with explicit parent-child hierarchy relationships',
      'Map contact roles to Account Contact Relationship or custom DMO extensions',
      'Identity resolution for contacts separate from account matching—avoid merging two people at one company incorrectly',
      'Survivorship for firmographic data: D&B authoritative for industry, CRM for owner assignment',
      'Segments at account level for ABM vs contact level for persona campaigns—document grain',
      'Activation to Sales Cloud enriches Account records without overwriting rep-owned fields',
      'Graph-style relationship queries for buying committee analysis',
    ],
    followUps: [
      'Handling account hierarchies that differ between SAP and CRM?',
      'Contact merge when same person changes companies?',
      'ABM segment refresh when account ownership changes?',
    ],
    architectNote:
      'B2B unification grain is account-contact-role, not individual-only B2C patterns. Architects clarify segment grain before marketing builds campaigns.',
  },
  {
    title: 'Explain Einstein segmentation vs manual SQL-like segment builder',
    difficulty: 'INTERMEDIATE',
    tags: ['einstein', 'segments', 'ai', 'builder'],
    scenario:
      'Marketing analysts debate using Einstein lookalike segments vs manually defined behavioral rules for prospecting campaigns.',
    answerPoints: [
      'Manual segments offer transparency and compliance auditability—every rule is explicit',
      'Einstein segments discover patterns analysts may miss but require quality seed audiences',
      'Use manual for regulated exclusions and consent-boundaries; Einstein for discovery within safe pools',
      'Validate Einstein segments for bias and unintended demographic skew',
      'Combine: manual base filter then Einstein lookalike within qualified population',
      'Monitor performance over time—model drift requires seed audience refresh',
      'Document when black-box segments are prohibited by internal policy',
    ],
    followUps: [
      'Minimum seed audience size for reliable lookalikes?',
      'Explainability requirements for regulated industries?',
      'Refreshing seeds after major product or market shifts?',
    ],
    architectNote:
      'Einstein segments are powerful but governance-sensitive—architects define where transparency beats discovery.',
  },
  {
    title: 'Architect disaster recovery for Data Cloud pipelines',
    difficulty: 'ARCHITECT',
    tags: ['dr', 'resilience', 'backup', 'continuity'],
    scenario:
      'A failed ingestion connector deleted a week of streaming events. Marketing activations used stale segments during Black Friday.',
    answerPoints: [
      'Maintain raw event archive in S3/data lake independent of Data Cloud retention',
      'Document RPO/RTO per data stream: behavioral vs transactional vs consent',
      'Backfill procedures with idempotent keys preventing duplicate unified events',
      'Freeze activations automatically when freshness SLAs breach',
      'Run DR drills simulating connector failure before peak seasons',
      'Multi-region strategy if contract supports data residency failover',
      'Post-incident segment recomputation checklist with stakeholder communication',
    ],
    followUps: [
      'Salesforce-native backup scope for Data Cloud metadata vs data?',
      'How long to reprocess 7 days of streaming backlog?',
      'Customer communication when personalization used stale profiles?',
    ],
    architectNote:
      'Peak season readiness includes ingestion DR—not just CRM uptime. Architects wire freshness circuit breakers to activation paths.',
  },
  {
    title: 'Optimize Data Cloud query and segment refresh performance',
    difficulty: 'ADVANCED',
    tags: ['performance', 'optimization', 'segments', 'credits'],
    scenario:
      'Segment refresh times grew from 20 minutes to 3 hours as data volume 5x increased, blocking morning campaign launches.',
    answerPoints: [
      'Profile segment query plans—simplify nested conditions and redundant calculated insights',
      'Pre-compute heavy aggregations as calculated insights refreshed on schedule',
      'Partition large DLOs by date or region to limit scan scope',
      'Eliminate unused DMO fields and deprecated mappings reducing harmonization cost',
      'Stagger segment refresh schedules to avoid credit spike collisions',
      'Archive cold historical data to separate DLOs excluded from active segments',
      'Benchmark before/after with representative peak-volume datasets',
    ],
    followUps: [
      'Credit consumption visibility per segment?',
      'When to push logic to warehouse vs Data Cloud CI?',
      'Impact of identity graph size on match performance?',
    ],
    architectNote:
      'Segment sprawl is performance debt—architects institute segment catalog reviews retiring unused definitions quarterly.',
  },
  {
    title: 'Design loyalty program integration with unified profiles',
    difficulty: 'INTERMEDIATE',
    tags: ['loyalty', 'integration', 'profiles', 'retail'],
    scenario:
      'A airline loyalty program runs on a third-party platform while bookings exist in Salesforce and data warehouse. Points balance must appear on unified profile for service agents.',
    answerPoints: [
      'Ingest loyalty member ID, tier, points balance, and tier expiry as dedicated DMO attributes',
      'Match loyalty ID as high-priority identity key linking to CRM Contact',
      'Stream tier changes for real-time agent visibility during irrops',
      'Calculated insight for points-to-next-tier progress',
      'Activation to Service Cloud read-only fields—writes go through loyalty API not DMO',
      'Reconcile points nightly with loyalty platform as source of truth',
      'Handle member merges when duplicate loyalty accounts consolidated externally',
    ],
    followUps: [
      'Latency tolerance for points balance during redemption calls?',
      'Offline members without digital identity resolution?',
      'Coalition loyalty across partner airlines data sharing?',
    ],
    architectNote:
      'Loyalty data is authoritative in loyalty system—Data Cloud aggregates for view, not transactional writes.',
  },
  {
    title: 'Implement cross-cloud attribution with Data Cloud',
    difficulty: 'ADVANCED',
    tags: ['attribution', 'marketing', 'analytics', 'journeys'],
    scenario:
      'CMO wants multi-touch attribution connecting ad impressions, email clicks, store visits, and purchases across channels already ingested.',
    answerPoints: [
      'Unified Individual as attribution entity with timestamped engagement events in Engagement DMO',
      'Define attribution model rules: first-touch, last-touch, linear, or data-driven in CI',
      'Resolve identity across devices for consistent journey stitching',
      'Ingest offline conversions via POS with loyalty match keys',
      'CRM Analytics or external BI consuming harmonized journey datasets',
      'Holdout control groups validating incrementality not just correlation',
      'Privacy-safe aggregation preventing individual-level export to unauthorized teams',
    ],
    followUps: [
      'Cookie deprecation impact on digital touch attribution?',
      'Warehouse vs Data Cloud for heavy attribution modeling?',
      'Aligning attribution windows with finance revenue recognition?',
    ],
    architectNote:
      'Attribution is identity plus timestamp quality—architects validate stitching before debating model sophistication.',
  },
  {
    title: 'Navigate licensing and credit consumption planning',
    difficulty: 'INTERMEDIATE',
    tags: ['licensing', 'credits', 'tco', 'planning'],
    scenario:
      'Finance flagged 40% overage on Data Cloud credits due to hourly refresh of 200 segments nobody audited.',
    answerPoints: [
      'Inventory credit drivers: ingestion volume, segment refresh frequency, CI complexity, activations',
      'Tier segment refresh: real-time critical vs daily marketing vs weekly analytics',
      'Retire unused segments and CI documented in catalog with owner accountability',
      'Forecast growth with data volume and activation expansion scenarios',
      'Sandbox consumption monitoring—non-prod can surprise teams',
      'Negotiate enterprise pool with burst allowances for peak campaigns',
      'Chargeback model allocating credits to business units by usage tags',
    ],
    followUps: [
      'Which operations are most credit-intensive unexpectedly?',
      'Caching strategies reducing repeated full segment rebuilds?',
      'Build vs buy for heavy processing outside Data Cloud?',
    ],
    architectNote:
      'Credit overages are governance failures—architects implement segment TTL and ownership like API rate limits.',
  },
  {
    title: 'Design test strategy for Data Cloud implementations',
    difficulty: 'INTERMEDIATE',
    tags: ['testing', 'qa', 'validation', 'methodology'],
    scenario:
      'Go-live is 4 weeks away. QA asks how to validate identity resolution and segments without production PII in lower environments.',
    answerPoints: [
      'Generate synthetic datasets mirroring source schemas with known duplicate patterns',
      'Define expected match outcomes for golden test individuals across sources',
      'Validate segment membership counts against manual expected lists',
      'Test consent exclusion scenarios with synthetic opt-out records',
      'Activation dry-run to sandbox destinations verifying payload shape',
      'Performance test segment refresh at projected production volume in partial sandbox',
      'Regression suite rerunning after mapping or match rule changes',
    ],
    followUps: [
      'Salesforce partial copy limitations for Data Cloud sandboxes?',
      'Anonymized production subset legal approval process?',
      'Automating regression in CI/CD pipeline feasibility?',
    ],
    architectNote:
      'Data Cloud testing is data-dependent—invest in synthetic golden datasets early; they become permanent regression assets.',
  },
];

export const DATA_CLOUD_EXTRAS: TopicTemplate[] = [
  {
    title: 'Map Salesforce CRM Connector incremental sync behavior',
    difficulty: 'INTERMEDIATE',
    tags: ['crm-connector', 'sync', 'incremental'],
    scenario: 'CRM updates are delayed 6 hours in unified profiles causing agents to see stale case counts.',
    answerPoints: ['Understand connector sync frequency and object inclusion scope', 'Prioritize high-change objects for more frequent sync', 'Use Data Actions for operational real-time needs vs batch connector', 'Monitor sync job failures in setup audit logs', 'Document lag SLAs per object for consumers', 'Fallback messaging in UX when data may be stale'],
    followUps: ['Bidirectional sync pitfalls?', 'Deleted record handling in profiles?', 'Field-level sync exclusions?'],
    architectNote: 'CRM Connector is batch-oriented—do not assume CRM-real-time for activation-critical attributes.',
  },
  {
    title: 'Design household modeling for insurance policies',
    difficulty: 'ADVANCED',
    tags: ['household', 'insurance', 'relationships'],
    scenario: 'Multiple policyholders share address but need separate communication preferences on one household view.',
    answerPoints: ['Model Party Relationship or household DMO extensions', 'Individual-level consent with household-level address survivorship', 'Segments at household grain for policy cross-sell', 'Agent view showing all members without improper merge', 'Regulatory separation of medical vs auto policy data where required', 'Test merge scenarios for roommates vs family'],
    followUps: ['Minor dependents on household profile?', 'Divorce household split workflow?', 'FSC household vs Data Cloud modeling alignment?'],
    architectNote: 'Household is a relationship construct—never infer from address alone.',
  },
  {
    title: 'Implement data lineage documentation for auditors',
    difficulty: 'INTERMEDIATE',
    tags: ['lineage', 'audit', 'governance'],
    scenario: 'External auditors ask how marketing obtained email addresses activated to ad platforms.',
    answerPoints: ['Document source system to DLO to DMO to segment to activation path', 'Retain mapping transformation rules with version history', 'Consent proof attached to contact point records', 'Export audit reports showing exclusion counts', 'Role-based access logs for segment definition changes', 'Annual lineage review when sources added or retired'],
    followUps: ['Automated lineage tools in Data Cloud?', 'Auditor access model in sandbox?', 'Lineage for calculated insights dependencies?'],
    architectNote: 'If you cannot draw lineage on a whiteboard, you cannot pass audit.',
  },
  {
    title: 'Handle duplicate ingestion from overlapping source systems',
    difficulty: 'INTERMEDIATE',
    tags: ['deduplication', 'ingestion', 'sources'],
    scenario: 'Both CRM and ERP feed order events causing double-counted revenue in calculated insights.',
    answerPoints: ['Design single authoritative source per metric with dedup keys', 'Survivorship rules preferring ERP for financial amounts', 'Idempotent ingestion keys on order ID + source', 'Reconciliation dashboard comparing source totals', 'Deprecate redundant feed after validation period', 'Document metric definitions referencing authoritative source'],
    followUps: ['Late-arriving ERP corrections?', 'Partial order updates from two sources?', 'Historical backfill without double counting?'],
    architectNote: 'Metric authority matrix prevents eternal "which number is right" debates.',
  },
  {
    title: 'Configure Insights Builder for product affinity scoring',
    difficulty: 'INTERMEDIATE',
    tags: ['insights-builder', 'affinity', 'retail'],
    scenario: 'Merchandising wants product affinity scores on profiles for email recommendations.',
    answerPoints: ['Define affinity from co-purchase or browse-to-buy patterns', 'Set rolling window avoiding outdated seasonal skew', 'Normalize scores 0-1 for cross-category comparison', 'Exclude returned purchases from affinity calculation', 'Refresh weekly balancing freshness vs compute cost', 'Validate top affinities manually for brand safety'],
    followUps: ['Cold start for new products?', 'Multi-brand affinity separation?', 'Real-time browse updating affinity?'],
    architectNote: 'Affinity without returns adjustment recommends products customers already sent back.',
  },
  {
    title: 'Design exit strategy if Data Cloud project de-scopes',
    difficulty: 'ARCHITECT',
    tags: ['exit-strategy', 'architecture', 'risk'],
    scenario: 'Budget cuts may eliminate Data Cloud but CRM and warehouse investments must continue delivering value.',
    answerPoints: ['Avoid hard-wiring CRM workflows solely dependent on DC calculated insights', 'Export segment definitions as documented business rules reproducible in warehouse', 'Maintain parallel metrics in BI during transition period', 'Contractual data export and retention terms understood upfront', 'Modular activation adapters swappable to warehouse-driven exports', 'Knowledge transfer documentation for match rules and mappings'],
    followUps: ['Salesforce data export formats and limits?', 'Replicating identity resolution externally?', 'Contractual minimum commitment risks?'],
    architectNote: 'Architect optional dependencies—platform bets should not become single points of business failure.',
  },
  {
    title: 'Integrate mobile SDK behavioral events',
    difficulty: 'INTERMEDIATE',
    tags: ['mobile-sdk', 'events', 'app'],
    scenario: 'Mobile app team streams in-app events but session stitching to web profiles fails frequently.',
    answerPoints: ['Implement consistent identity keys: login ID passed to SDK after auth', 'Use Mobile SDK best practices for event schema compliance', 'Handle anonymous pre-login events merging on authentication', 'Validate event volume against app analytics baseline', 'Privacy opt-out honored in SDK before transmission', 'Monitor SDK version drift across iOS/Android releases'],
    followUps: ['Offline event buffering and replay?', 'ATT impact on mobile identifiers?', 'SDK battery performance concerns?'],
    architectNote: 'Mobile identity handoff at login is the critical integration point—test relentlessly.',
  },
  {
    title: 'Build operational alerting for ingestion failures',
    difficulty: 'BEGINNER',
    tags: ['alerting', 'monitoring', 'ops'],
    scenario: 'Nobody noticed a broken S3 ingestion path until a campaign launched to an empty segment.',
    answerPoints: ['Alert on file non-arrival beyond expected schedule window', 'Monitor record error rates and quarantine volume spikes', 'Segment freshness SLA alerts to Slack/PagerDuty', 'Dashboard for ops showing pipeline green/red status', 'Runbook linking alert types to remediation steps', 'Weekly ops review of near-misses and trend lines'],
    followUps: ['On-call rotation for marketing ops vs IT?', 'False positive tuning for seasonal low volume?', 'Integration with Salesforce event monitoring?'],
    architectNote: 'Silent pipeline failures are worse than loud ones—alert on absence of expected data.',
  },
  {
    title: 'Compare Data Cloud vs CRM Analytics for customer 360',
    difficulty: 'INTERMEDIATE',
    tags: ['crm-analytics', 'comparison', '360'],
    scenario: 'Leadership asks whether Data Cloud replaces CRM Analytics investments for customer dashboards.',
    answerPoints: ['Data Cloud: unified ingestion, identity, activation across clouds', 'CRM Analytics: deep Salesforce operational analytics and dashboards', 'Complementary: DC feeds datasets to CRM Analytics for visualization', 'Activation and external ad use cases require Data Cloud', 'Existing CRM Analytics apps may suffice for sales pipeline reporting', 'Avoid duplicating same metrics in both without canonical source'],
    followUps: ['Tableau integration patterns with Data Cloud?', 'License overlap and cost optimization?', 'Single dashboard strategy for executives?'],
    architectNote: 'Position Data Cloud as customer data platform; CRM Analytics as Salesforce analytics consumption layer.',
  },
  {
    title: 'Design tokenization for sensitive attributes in profiles',
    difficulty: 'ADVANCED',
    tags: ['tokenization', 'security', 'pii'],
    scenario: 'Security requires SSN stored tokenized but segments need age band and state for compliance campaigns.',
    answerPoints: ['Ingest SSN into tokenized field never exposed to segments or activation', 'Derive age band and geostate at ingestion as separate non-sensitive fields', 'Restrict raw sensitive field access to break-glass roles', 'Audit any query attempting access to token vault mappings', 'Segment on derived attributes only—document prohibited fields list', 'Align with enterprise KMS rotation policies'],
    followUps: ['Format-preserving token vs hash?', 'Re-identification for regulated mailings?', 'Token vault availability impact on segments?'],
    architectNote: 'Derive campaign-safe attributes early—do not segment on raw sensitive fields " temporarily".',
  },
];

export const dataCloudQuestions = buildQuestionBank('data-cloud', [
  ...DATA_CLOUD_DETAILED,
  ...DATA_CLOUD_EXTRAS,
  ...DATA_CLOUD_ADDITIONS,
]);
