import type { TopicTemplate } from './generator';

export const DATA_CLOUD_ADDITIONS: TopicTemplate[] = [
  {
    title: 'Resolve joint bank account identities without incorrect household merges',
    difficulty: 'ARCHITECT',
    tags: ['identity-resolution', 'banking', 'household', 'matching-rules'],
    scenario:
      'A regional bank ingests checking, mortgage, and credit card data where spouses share accounts but maintain separate marketing preferences. Marketing merged profiles caused one spouse to receive the other\'s loan offers.',
    answerPoints: [
      'Model individuals separately from financial account relationships—never merge solely on shared account number',
      'Use verified customer ID and SSN token match as primary keys; treat shared email as weak secondary signal only',
      'Apply household linking for address and account rollups without collapsing individual consent flags',
      'Configure survivorship so marketing opt-in/out remains person-level even when profiles are linked',
      'Quarantine low-confidence joint-account matches for manual data steward review',
      'Test merge scenarios with synthetic joint, authorized user, and power-of-attorney cases',
      'Monitor offer complaint rate and unmerge volume as identity quality KPIs',
    ],
    followUps: [
      'How do you represent authorized users vs primary account holders in DMOs?',
      'What audit trail satisfies regulators when a merge is reversed?',
      'Should credit bureau IDs participate in match rules?',
    ],
    architectNote:
      'Banking identity is relationship-rich, not one-profile-fits-all. Conservative matching with explicit relationship objects beats aggressive golden record unification.',
  },
  {
    title: 'Build retail unified profiles spanning POS, e-commerce, and marketplace sellers',
    difficulty: 'ARCHITECT',
    tags: ['unified-profile', 'retail', 'omnichannel', 'pos'],
    scenario:
      'A department store chain sells on owned e-commerce, in-store POS, and third-party marketplace with different customer IDs. Loyalty tier benefits fail when online purchases do not appear in store associate apps.',
    answerPoints: [
      'Ingest all channels into separate DLOs with channel-specific keys mapped to Individual DMO',
      'Prioritize loyalty ID and verified phone matches over marketplace pseudonymous buyer IDs',
      'Near-real-time streaming for POS and web behavioral events; batch reconciliation for marketplace settlement files',
      'Expose unified profile API to store clienteling apps with latency SLA under 2 seconds',
      'Handle marketplace orders where buyer PII is partially masked by platform policies',
      'Activation of loyalty tier segments must refresh before weekend promotional windows',
      'Reconcile revenue attribution without double-counting cross-channel returns',
    ],
    followUps: [
      'How do anonymous in-store transactions later link to known profiles?',
      'What happens when marketplace returns credit a different email than purchase?',
      'Should store associates see full online browse history for privacy reasons?',
    ],
    architectNote:
      'Retail unified profiles are operational, not just marketing—store apps need fresh data. Design ingestion latency per activation use case, not one pipeline speed.',
  },
  {
    title: 'Scale calculated insights for RFM scoring across 80 million profiles',
    difficulty: 'ARCHITECT',
    tags: ['calculated-insights', 'rfm', 'performance', 'scale'],
    scenario:
      'A grocery loyalty program computes recency, frequency, and monetary scores nightly but segment refreshes miss the Monday campaign window when compute queues backlog during holiday peaks.',
    answerPoints: [
      'Partition insight calculations by region or brand to parallelize compute and reduce blast radius',
      'Materialize intermediate aggregates in staging insights before final RFM composite',
      'Schedule heavy insights during off-peak windows with dependency-aware job orchestration',
      'Define incremental recalculation for profiles with new transactions vs full recompute cadence',
      'Monitor insight freshness SLAs and alert when downstream segments will miss activation cutoff',
      'Validate insight outputs against sample SQL in warehouse for drift detection',
      'Document insight version changes impacting 200 downstream segments before deploy',
    ],
    followUps: [
      'When should RFM live in Data Cloud vs external ML platform?',
      'How do returns and refunds adjust monetary components retroactively?',
      'What is rollback strategy when a bad insight deploy skews VIP segments?',
    ],
    architectNote:
      'Calculated insights at scale need job architecture and freshness contracts—not bigger schedules alone. Treat insights as published datasets with version and SLA.',
  },
  {
    title: 'Activate real-time cart abandonment segments for retail flash promotions',
    difficulty: 'ADVANCED',
    tags: ['segmentation', 'activation', 'retail', 'real-time'],
    scenario:
      'A fashion retailer runs two-hour flash sales requiring cart abandoners to receive push notifications within 15 minutes. Batch segments refresh every four hours today.',
    answerPoints: [
      'Stream cart events into Data Cloud with session and product metadata within seconds',
      'Build streaming-capable segment definition: added to cart, no purchase, within 30-minute window',
      'Activate to mobile push partner via real-time activation API with idempotent audience keys',
      'Exclude purchasers and inventory-out SKUs at activation time—not segment build time only',
      'Cap message frequency per profile to prevent notification fatigue during multiple sessions',
      'Measure activation lag p95 and conversion lift vs control holdout group',
      'Fail gracefully to email batch when push activation partner unavailable',
    ],
    followUps: [
      'How do guest sessions map to known profiles for push delivery?',
      'What consent checks apply for behavioral retargeting in EU markets?',
      'Should high-value cart segments bypass frequency caps?',
    ],
    architectNote:
      'Real-time retail activation is a pipeline SLA problem end-to-end. Segment logic must align with streaming ingestion and partner API latency budgets.',
  },
  {
    title: 'Enforce marketing consent before Google and Meta audience activation',
    difficulty: 'ARCHITECT',
    tags: ['consent', 'activation', 'privacy', 'ad-platforms'],
    scenario:
      'Legal discovered lookalike audiences exported to Meta included profiles who opted out of third-party sharing. Regulators opened inquiry into consent propagation failures.',
    answerPoints: [
      'Model consent status as first-class DMO attributes with source timestamp and legal basis',
      'Filter activation queries with explicit consent predicates—never rely on segment naming conventions',
      'Sync consent updates to suppressions lists in ad platforms within defined SLA',
      'Separate segments for first-party owned channels vs third-party ad activation eligibility',
      'Audit activation jobs logging profile count, consent filter version, and export file hash',
      'Implement pre-flight dry-run counts comparing eligible vs blocked profiles before export',
      'Coordinate with legal on jurisdiction-specific consent flags—GDPR, CPRA, state mini-laws',
    ],
    followUps: [
      'How do you handle consent captured in offline store paper forms?',
      'What happens when ad platform rejects hashed identifiers mid-sync?',
      'Should consent revocation trigger retroactive audience removal workflows?',
    ],
    architectNote:
      'Activation without consent architecture is regulatory liability. Consent filters belong in query logic with audit artifacts—not post-export manual checks.',
  },
  {
    title: 'Evolve data stream schemas without breaking downstream segments',
    difficulty: 'ADVANCED',
    tags: ['data-streams', 'schema-evolution', 'governance', 'breaking-changes'],
    scenario:
      'Mobile app v3 renamed event properties breaking three calculated insights and twelve segments used in live journeys. Marketing lost two days of activation while teams manually rebuilt definitions.',
    answerPoints: [
      'Establish schema registry for data stream payloads with version and deprecation dates',
      'Implement dual-write transition period mapping old and new field names in ingestion mapping',
      'Run impact analysis showing dependent insights, segments, and activations before schema change',
      'Use feature flags in app telemetry to stagger rollout while Data Cloud mappings catch up',
      'Automated validation rejecting files or events missing required fields into quarantine DLO',
      'Communicate breaking change windows to all activation owners via governance calendar',
      'Maintain rollback mappings restoring prior field names within 24 hours if needed',
    ],
    followUps: [
      'Who approves breaking schema changes—data council or product team?',
      'How do SDK auto-updates affect schema compatibility guarantees?',
      'Should unknown fields be dropped or stored in extension JSON?',
    ],
    architectNote:
      'Data streams are API contracts with downstream consumers. Schema changes need impact analysis like any public API—segments are your breaking-change detectors.',
  },
  {
    title: 'Tune Zero Copy federation queries for Snowflake warehouse performance',
    difficulty: 'ARCHITECT',
    tags: ['zero-copy', 'snowflake', 'performance', 'federation'],
    scenario:
      'Analysts run segment previews against Zero Copy linked tables causing Snowflake warehouse credit spikes and timeouts when joins span CRM connector data and warehouse fact tables.',
    answerPoints: [
      'Push filters to largest selective predicates early—avoid full table scans on linked objects',
      'Materialize frequently joined warehouse aggregates as native Data Cloud insights instead of repeated federation',
      'Align warehouse size and auto-suspend policies with segment preview usage patterns',
      'Cache segment counts where platform supports it; warn users on expensive exploratory queries',
      'Educate marketers on preview vs production refresh cost differences',
      'Monitor federation query duration and credit consumption per business unit for chargeback',
      'Evaluate hybrid model: Zero Copy for raw explore, copied DLOs for production segments',
    ],
    followUps: [
      'When does Zero Copy latency exceed copied ingestion for activation use cases?',
      'How do row access policies in Snowflake propagate to Data Cloud queries?',
      'What happens to segments if Snowflake link is temporarily unavailable?',
    ],
    architectNote:
      'Zero Copy shifts compute to your warehouse bill. Architects set query guardrails and materialization strategy—not unlimited federated segment building.',
  },
  {
    title: 'Ingest high-volume retail POS transactions without segment refresh delays',
    difficulty: 'ADVANCED',
    tags: ['ingestion', 'pos', 'retail', 'high-volume'],
    scenario:
      'Black Friday POS volume exceeded ingestion throughput causing loyalty tier segments to stale until Tuesday. Stores manually honored discounts outside system rules.',
    answerPoints: [
      'Capacity plan peak events with historical TPS benchmarks plus growth buffer',
      'Separate critical loyalty tier insight refresh priority from long-running marketing segments',
      'Use idempotent transaction keys preventing duplicate loyalty points on replay',
      'Implement backpressure alerting when ingestion lag exceeds tier activation SLA',
      'Pre-warm segment dependencies before known peak windows',
      'Document manual override procedures for stores when automation lags—with audit reconciliation',
      'Post-event retrospective tuning partition strategy and connector batch sizes',
    ],
    followUps: [
      'Streaming vs micro-batch for POS feeds in your architecture?',
      'How do offline store modes sync without flooding ingestion?',
      'Should peak events trigger temporary compute scaling requests to Salesforce?',
    ],
    architectNote:
      'Peak retail is when unified profiles matter most—design for known spikes, not average Tuesday volume.',
  },
  {
    title: 'Prevent campaign fatigue with segment overlap analysis across journeys',
    difficulty: 'INTERMEDIATE',
    tags: ['segmentation', 'overlap', 'marketing', 'fatigue'],
    scenario:
      'Customers receive email, SMS, and paid social from three teams targeting overlapping high-value segments without coordination, driving unsubscribe spikes.',
    answerPoints: [
      'Build overlap dashboards showing intersection counts between active segments and journeys',
      'Define enterprise priority rules: service messages override promotional when profile in multiple segments',
      'Implement global frequency caps at unified profile level across channels in activation layer',
      'Require segment registration in campaign calendar before production activation',
      'Use exclusion segments dynamically removing profiles active in higher-priority journeys',
      'Track unsubscribe and complaint rate correlated with overlap index',
      'Governance council resolves conflicts when two BUs claim same profile cohort',
    ],
    followUps: [
      'Should overlap analysis run nightly or at activation time?',
      'How do holdout groups interact with overlap exclusions?',
      'Can Agentforce sessions respect same frequency caps as marketing?',
    ],
    architectNote:
      'Segment proliferation creates customer harassment. Overlap visibility and global caps are architecture requirements in mature Data Cloud estates.',
  },
  {
    title: 'Compute banking transaction aggregation insights for wealth segmentation',
    difficulty: 'ADVANCED',
    tags: ['calculated-insights', 'banking', 'transactions', 'aggregation'],
    scenario:
      'Wealth advisors need segments based on rolling deposit trends and investment inflows across checking, brokerage, and CD products. Raw transaction DLOs are too granular for marketers to query.',
    answerPoints: [
      'Build rolling window aggregations: 30/90-day inflow, outflow, net balance change per product category',
      'Handle pending vs posted transactions with separate insight fields to avoid segment jitter',
      'Exclude internal transfers between owned accounts to prevent false churn signals',
      'Apply minimum transaction count thresholds before classifying trend direction',
      'Refresh aggregations after nightly core banking batch completion window',
      'Restrict segment fields visible to marketing vs advisor-facing operational segments',
      'Validate aggregations against core banking reporting totals monthly',
    ],
    followUps: [
      'How do you segment on behavior without exposing exact balances to ad platforms?',
      'What latency is acceptable for fraud-triggered transaction segments?',
      'Should cryptocurrency custody feeds join traditional transaction insights?',
    ],
    architectNote:
      'Banking insights must abstract transactions into campaign-safe derived attributes—never activate raw ledger detail to external platforms.',
  },
  {
    title: 'Attribute retail store visits using beacon and Wi-Fi proximity events',
    difficulty: 'ADVANCED',
    tags: ['retail', 'attribution', 'beacons', 'location'],
    scenario:
      'A mall-based retailer ingests beacon pings to measure store visit lift from digital campaigns but false visits from parking lot dwell time inflate attribution reports.',
    answerPoints: [
      'Define visit qualification rules: dwell time threshold, in-store purchase correlation, staff device exclusion',
      'Harmonize beacon events with POS timestamps for verified visit confirmation',
      'Geo-fence store boundaries precisely; filter parking lot and adjacent tenant bleed',
      'Link anonymous beacon sessions to known profiles via app login or loyalty scan events',
      'Build calculated insight for visit frequency and days-since-last-visit for re-engagement segments',
      'Document accuracy limitations in executive dashboards to prevent over-trusted ROI claims',
      'Apply consent for precise location tracking per platform and jurisdiction policies',
    ],
    followUps: [
      'How do mall-wide beacons differ from single-store deployments architecturally?',
      'Should visit attribution feed ad platform conversion APIs?',
      'What retention period for raw location pings?',
    ],
    architectNote:
      'Location attribution is noisy—architects qualify visits with business rules and verified transactions, not raw ping counts alone.',
  },
  {
    title: 'Plan Data Cloud org limits and multi-instance scaling strategy',
    difficulty: 'ARCHITECT',
    tags: ['limits', 'scale', 'architecture', 'capacity-planning'],
    scenario:
      'Enterprise approaching profile and segment count limits in single Data Cloud org. Teams debate second org vs data pruning vs archiving strategy before next acquisition doubles volume.',
    answerPoints: [
      'Inventory current consumption: profiles, segments, insights, activations, API calls vs contract entitlements',
      'Model growth from acquisition integration timeline and new data sources',
      'Evaluate multi-org split by brand or region with cross-org identity federation complexity',
      'Define archival policy moving inactive profiles to cold storage or suppression states',
      'Prioritize segment and insight consolidation reducing redundant compute',
      'Engage Salesforce capacity planning before limit hard stops affect production activations',
      'Document tradeoffs: operational complexity of multi-org vs single org performance degradation',
    ],
    followUps: [
      'Can activations cross org boundaries for global campaigns?',
      'How do sandbox limits reflect production capacity testing?',
      'What metrics trigger proactive scale conversations with vendor?',
    ],
    architectNote:
      'Data Cloud scale planning is proactive—hitting limits during acquisition integration is a preventable architecture failure.',
  },
  {
    title: 'Separate pseudonymized analytics profiles from activation-ready identifiers',
    difficulty: 'ADVANCED',
    tags: ['pseudonymization', 'privacy', 'analytics', 'activation'],
    scenario:
      'Data science wants rich behavioral datasets while privacy team blocks exporting emails to ad platforms. Teams built duplicate DMOs that drift out of sync.',
    answerPoints: [
      'Maintain single golden profile with derived pseudonymous keys for analytics exports',
      'Role-based field sets: analysts access behavioral bands; activation sees hashed identifiers only when consented',
      'Never fork duplicate DMOs—use views or segment filters enforcing purpose limitation',
      'Automated sync validation comparing record counts between analytics and activation slices',
      'Document data minimization mapping each activation destination required fields',
      'Rotate pseudonymous keys on schedule where re-identification risk warrants',
      'Audit any human break-glass access linking pseudonym to identity',
    ],
    followUps: [
      'How does differential privacy fit Salesforce-native patterns?',
      'Should ML training exports use separate Data Cloud connection?',
      'What happens when pseudonym collision detected?',
    ],
    architectNote:
      'Purpose separation is one profile with governed views—not two divergent databases pretending to sync.',
  },
  {
    title: 'Govern retail coalition loyalty data sharing between partner brands',
    difficulty: 'ARCHITECT',
    tags: ['data-sharing', 'retail', 'partners', 'governance'],
    scenario:
      'Three retail brands share a coalition loyalty program. Partner A wants cross-brand purchase segments; Partner B restricts use of their transaction data for Partner C promotions.',
    answerPoints: [
      'Encode data usage agreements as consent and partner scope attributes on each transaction DLO',
      'Segment queries filter by allowed partner flags before any cross-brand activation',
      'Provide partner-specific activation connectors preventing export to unauthorized destinations',
      'Audit trail per partner showing which profiles and fields crossed boundaries',
      'Neutral governance body approves new cross-brand segment definitions',
      'Technical enforcement over contractual PDF—automated blocks on policy violation attempts',
      'Regular partner attestation reviews validating segment usage matches agreements',
    ],
    followUps: [
      'How do you handle customer opt-out from coalition but not single brand?',
      'Can unified profiles exist without cross-brand visibility?',
      'What dispute process when partner alleges segment misuse?',
    ],
    architectNote:
      'Coalition programs need technical policy enforcement—contracts alone fail when marketers copy segment SQL.',
  },
  {
    title: 'Schedule segment refreshes across global retail time zones fairly',
    difficulty: 'INTERMEDIATE',
    tags: ['segmentation', 'scheduling', 'global', 'operations'],
    scenario:
      'Segments refresh at midnight UTC causing APAC campaigns to use stale data while EMEA teams complain jobs compete for same compute window.',
    answerPoints: [
      'Stagger segment refresh schedules by region aligned to local campaign send times',
      'Priority tiers: revenue-critical segments refresh before exploratory analytics segments',
      'Dependency graph ensuring insights complete before dependent segment jobs start',
      'Monitor job concurrency limits and queue depth during overlap windows',
      'Communicate refresh completion status to regional marketing ops dashboards',
      'Avoid duplicating identical segment logic per region when single refresh suffices with timezone-aware filters',
      'Document daylight saving impacts on scheduled jobs twice yearly',
    ],
    followUps: [
      'Should real-time segments bypass scheduled refresh entirely?',
      'How do global activations pick single refresh timestamp?',
      'Who owns on-call when regional refresh fails before local launch?',
    ],
    architectNote:
      'Global Data Cloud ops is scheduling architecture—UTC midnight crons favor no one and overload shared compute.',
  },
  {
    title: 'Manage calculated insight dependency graphs during platform upgrades',
    difficulty: 'ADVANCED',
    tags: ['calculated-insights', 'dependencies', 'upgrades', 'governance'],
    scenario:
      'Platform upgrade changed insight function behavior silently shifting VIP customer counts by 12%. Downstream journeys sent wrong offers for a week before detection.',
    answerPoints: [
      'Maintain dependency registry mapping insights to segments, activations, and dashboards',
      'Run golden profile test suite comparing insight outputs pre and post upgrade in staging',
      'Version insight definitions with change logs and approval workflow',
      'Freeze insight changes during peak retail periods separate from platform upgrade windows',
      'Automated anomaly detection on insight distribution statistics after refresh',
      'Rollback insight version independently when business impact detected',
      'Include insight owners in platform upgrade communication and validation sign-off',
    ],
    followUps: [
      'How do you document circular dependencies between insights?',
      'Should staging insight outputs match production exactly or use sampled data?',
      'What SLAs for insight owner response when anomaly detected?',
    ],
    architectNote:
      'Insights are upstream of money-moving activations—treat dependency management like critical batch job orchestration with validation gates.',
  },
  {
    title: 'Expose unified profile APIs for contact center real-time personalization',
    difficulty: 'ARCHITECT',
    tags: ['unified-profile', 'api', 'contact-center', 'real-time'],
    scenario:
      'Contact center IVR and agent desktop need unified profile showing loyalty tier, recent orders, and open cases within one second of call start. Current CRM screen pop shows CRM only, missing Data Cloud attributes.',
    answerPoints: [
      'Design Profile API aggregating Data Cloud Individual attributes with CRM operational fields',
      'Cache hot profile slices with TTL; invalidate on high-value events like order placed',
      'Authenticate API with scoped OAuth for contact center vendor per PCI requirements',
      'Return consent-gated marketing attributes separately from service-required fields',
      'Implement circuit breaker returning CRM baseline if Data Cloud API latency exceeds threshold',
      'Monitor API p95 latency and error rate per routing skill group',
      'Document field lineage so agents trust data freshness indicators displayed in UI',
    ],
    followUps: [
      'GraphQL vs REST for contact center integration?',
      'How do voice calls identify caller before authentication completes?',
      'Should agents see calculated churn scores during service calls ethically?',
    ],
    architectNote:
      'Contact center real-time is the hardest latency SLA—design graceful degradation, not all-or-nothing profile calls.',
  },
  {
    title: 'Propagate consent revocation to active ad platform audiences automatically',
    difficulty: 'ADVANCED',
    tags: ['consent', 'revocation', 'activation', 'automation'],
    scenario:
      'Customers revoke marketing consent in preference center but remain in Meta custom audiences for nine days until manual refresh, violating internal 24-hour removal policy.',
    answerPoints: [
      'Stream consent change events triggering immediate suppression activation workflow',
      'Maintain delta export of revoked profiles to ad platform delete APIs',
      'Verify removal acknowledgment from partner and retry failed suppressions with alerting',
      'Separate consent types—email vs third-party ads—with independent propagation paths',
      'Audit log each revocation with timestamps for consent store, Data Cloud, and ad platform',
      'Test revocation end-to-end in sandbox with partner test audiences monthly',
      'Report SLA compliance percentage in privacy steering committee dashboard',
    ],
    followUps: [
      'How do offline revocations captured in store sync to activation?',
      'What if ad platform API outage delays removal?',
      'Should revoked profiles exit all segments automatically or only activation-eligible ones?',
    ],
    architectNote:
      'Consent revocation is a real-time activation problem—batch segment refresh alone cannot meet modern privacy SLAs.',
  },
  {
    title: 'Backfill data streams after schema migration without duplicate profiles',
    difficulty: 'ADVANCED',
    tags: ['backfill', 'data-streams', 'migration', 'deduplication'],
    scenario:
      'Engineering reprocessed six months of mobile events after schema fix. Marketing reports doubled engagement metrics from duplicate event ingestion.',
    answerPoints: [
      'Define idempotent event keys enforced at ingestion mapping layer',
      'Run backfill into quarantine DLO first validating counts vs source before merge to production DLO',
      'Compare profile-level metrics before and after backfill on control cohort',
      'Coordinate pause of dependent insight refreshes during backfill window',
      'Document backfill scope, date range, and rollback procedure before execution',
      'Reconcile total event counts with source system audit reports',
      'Communicate expected metric shifts to analytics consumers pre-backfill',
    ],
    followUps: [
      'Can backfill run incrementally overnight vs big bang?',
      'How do segments referencing time windows handle duplicated historical events?',
      'Who approves backfill that affects regulatory reporting metrics?',
    ],
    architectNote:
      'Backfills without idempotency keys recreate the duplicate ingestion nightmares Data Cloud was supposed to solve.',
  },
  {
    title: 'Benchmark segment query performance at 100 million unified profiles',
    difficulty: 'ARCHITECT',
    tags: ['performance', 'benchmark', 'scale', 'segmentation'],
    scenario:
      'Architecture review requires proof that priority segments refresh within four hours at projected 100M profile scale before board approves Data Cloud expansion budget.',
    answerPoints: [
      'Generate representative synthetic profiles matching production attribute cardinality and null rates',
      'Benchmark segment types separately: rule-based, lookalike, insight-dependent, activation-optimized',
      'Measure refresh duration, compute credits, and failure rates under concurrent job load',
      'Identify expensive predicates—unindexed fields, wide OR clauses, non-selective filters',
      'Optimize via pre-computed insights, segment splitting, and exclusion segment patterns',
      'Document headroom percentage before SLA breach for capacity planning',
      'Repeat benchmarks after major releases and significant data model changes',
    ],
    followUps: [
      'How representative must synthetic data be for valid benchmarks?',
      'Should benchmarks run in dedicated perf sandbox org?',
      'What segment complexity limits do you enforce on marketers?',
    ],
    architectNote:
      'Scale proof is empirical—architects benchmark with realistic data shapes, not vendor benchmark slides alone.',
  },
  {
    title: 'Predict retail return likelihood with calculated insights for service routing',
    difficulty: 'ADVANCED',
    tags: ['calculated-insights', 'retail', 'returns', 'prediction'],
    scenario:
      'Operations wants to route high return-risk orders to specialized fulfillment checks. Data science exported scores manually weekly; operations needs daily refresh in service workflows.',
    answerPoints: [
      'Operationalize return propensity as calculated insight with documented input features',
      'Refresh daily after order and return history batch loads complete',
      'Activate high-risk segment to Service Cloud or OMS routing rules via Data Action',
      'Monitor model drift comparing predicted vs actual return rates by category',
      'Govern ethical use—avoid discriminatory proxies in insight inputs',
      'Version insight when model logic changes with parallel run validation period',
      'Provide explainability fields for human reviewers—not black box score only',
    ],
    followUps: [
      'Should propensity scores be customer-visible?',
      'How do holiday return policies affect model features?',
      'Integrate with external ML platform or native insight builder?',
    ],
    architectNote:
      'Operational ML in Data Cloud needs refresh SLAs and drift monitoring—not one-time model export scripts.',
  },
  {
    title: 'Ingest bank fraud signals without leaking PII to marketing segments',
    difficulty: 'ARCHITECT',
    tags: ['banking', 'fraud', 'pii', 'segmentation'],
    scenario:
      'Fraud team wants device risk scores in Data Cloud for authentication flows but compliance blocks fraud alert details from any marketing-accessible segment fields.',
    answerPoints: [
      'Ingest fraud signals into restricted DMO fields with role-based access separate from marketing data extensions',
      'Derive non-sensitive risk bands for operational segments—high, medium, low—without raw alert text',
      'Block marketing segment builder access to fraud DMO via permission set design',
      'Use Data Actions to push risk bands to authentication systems—not broad profile export',
      'Audit any query touching fraud fields with automated alerting on marketing role access attempts',
      'Align retention: fraud signals shorter than marketing profile retention where regulations require',
      'Document lawful basis for fraud processing separate from marketing consent',
    ],
    followUps: [
      'Can fraud and marketing share same Individual profile safely?',
      'How do real-time fraud events interact with streaming segments?',
      'What happens when fraud false positive wrongly flags customer in service routing?',
    ],
    architectNote:
      'Sensitive operational data on unified profiles demands field-level governance architecture—not trust that marketers will not query fraud columns.',
  },
  {
    title: 'Recover failed activation audience syncs without duplicate customer messages',
    difficulty: 'INTERMEDIATE',
    tags: ['activation', 'recovery', 'reliability', 'idempotency'],
    scenario:
      'Email platform sync failed mid-export sending duplicate welcome series to 40,000 new loyalty members when ops retried job without idempotency checks.',
    answerPoints: [
      'Design activation exports with batch IDs and idempotent keys recognized by destination platform',
      'Implement retry logic continuing from last successful offset—not full re-export default',
      'Dry-run mode showing delta count before destructive resync options',
      'Monitor activation job status with automatic retry and exponential backoff',
      'Alert marketing ops before manual retry explaining duplicate risk',
      'Maintain suppression list of profiles successfully activated in partial run',
      'Post-incident reconcile destination audience count vs Data Cloud activation count',
    ],
    followUps: [
      'How do real-time activations handle at-least-once delivery semantics?',
      'Should failed activations auto-rollback partial destination updates?',
      'What runbook for partner-side duplicate detection?',
    ],
    architectNote:
      'Activation retries cause duplicate customer pain without idempotent export design—treat activations like payment transactions.',
  },
  {
    title: 'Normalize multi-currency retail metrics in cross-border calculated insights',
    difficulty: 'ADVANCED',
    tags: ['calculated-insights', 'retail', 'multi-currency', 'global'],
    scenario:
      'Global retail segments on total spend rank APAC customers incorrectly when mixing JPY, EUR, and USD amounts without normalization.',
    answerPoints: [
      'Convert transaction amounts to corporate reporting currency at daily exchange rate table ingested to Data Cloud',
      'Store both local currency and normalized amount for regional and global segment use cases',
      'Handle refunds in original transaction currency to avoid skewed net spend insights',
      'Document exchange rate source and refresh cadence in insight metadata',
      'Build regional segments on local currency; global VIP on normalized fields only',
      'Validate normalization against finance ERP totals monthly',
      'Alert when exchange rate feed stale beyond finance SLA',
    ],
    followUps: [
      'Should crypto or duty-free transactions use different normalization rules?',
      'How do gift card redemptions affect spend insights?',
      'Real-time segments on normalized spend feasible or batch only?',
    ],
    architectNote:
      'Cross-border retail insights fail silently on currency—normalize explicitly with finance-approved rates, not implicit locale assumptions.',
  },
  {
    title: 'Design bank marketing segments on life events without regulatory redlining risk',
    difficulty: 'ARCHITECT',
    tags: ['banking', 'segmentation', 'compliance', 'fair-lending'],
    scenario:
      'Marketing wants segments triggered by mortgage payoff, new baby registry purchases, and income band changes. Compliance warns of fair lending and UDAAP risks if segments proxy protected classes.',
    answerPoints: [
      'Prohibit use of proxy attributes correlating with protected classes in segment definitions',
      'Compliance review workflow for segments targeting financial product offers',
      'Use explicit product eligibility rules from core banking—not behavioral inference alone for credit offers',
      'Document business purpose and approved use case per segment in governance registry',
      'Monitor segment outcome disparities across demographic bands for unintended bias',
      'Separate educational content segments from product offer activations with different approval paths',
      'Train marketers on UDAAP constraints specific to behavioral targeting in banking',
    ],
    followUps: [
      'Can third-party data enrichments participate in bank segments?',
      'How do you audit segment logic regulators request during examination?',
      'Should AI-generated segment suggestions be allowed in FSI?',
    ],
    architectNote:
      'Bank marketing segments require compliance-by-design—technical gates and review workflows, not post-hoc legal cleanup after campaigns launch.',
  },
];
