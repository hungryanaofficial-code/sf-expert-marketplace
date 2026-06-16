import { buildQuestionBank, type TopicTemplate } from './generator';
import { HEADLESS_360_ADDITIONS } from './headless-360-additions';

export const HEADLESS_360_DETAILED: TopicTemplate[] = [
  {
    title: 'Design headless commerce architecture with Salesforce B2C Commerce APIs',
    difficulty: 'ARCHITECT',
    tags: ['commerce-api', 'headless', 'b2c', 'architecture'],
    scenario:
      'A fashion brand replatforms to React Native mobile and Next.js web while keeping Salesforce B2C Commerce as cart and order system of record.',
    answerPoints: [
      'Use Shopper APIs for session, basket, product search, and checkout with SLAS authentication',
      'Separate presentation layer concerns—CMS for content, Commerce for transactional APIs',
      'Implement API gateway caching product catalog with cache invalidation on price/inventory changes',
      'Design idempotent order submission handling network retries on mobile',
      'OAuth and guest vs registered shopper token lifecycle management',
      'Webhook or event-driven order status updates to mobile push notifications',
      'Observability: trace ID across client, CDN, and Commerce API calls for latency debugging',
    ],
    followUps: [
      'When to use OCAPI vs SCAPI for legacy integrations?',
      'How handle inventory reservation during high-traffic drops?',
      'CDN strategy for global storefront performance?',
    ],
    architectNote:
      'Headless commerce succeeds when API contracts are stable and cached reads are separated from transactional writes—treat SCAPI as your transactional boundary.',
  },
  {
    title: 'Explain MCP integration patterns for Agentforce external tools',
    difficulty: 'ADVANCED',
    tags: ['mcp', 'agentforce', 'tools', 'integration'],
    scenario:
      'Developers want Agentforce agents to call external inventory and pricing engines via Model Context Protocol servers hosted on AWS.',
    answerPoints: [
      'MCP standardizes tool discovery, schema, and invocation for LLM agents outside Salesforce',
      'Register MCP servers as trusted tool providers with authentication and rate limits',
      'Map MCP tool outputs to Agent Actions or direct agent tool calls with response validation',
      'Implement timeout, circuit breaker, and fallback when external MCP server unavailable',
      'Security review: MCP servers must not expose broad SQL or shell capabilities to agents',
      'Audit log every MCP tool invocation with inputs hashed for sensitive data',
      'Version MCP tool schemas alongside agent prompt updates in CI/CD',
    ],
    followUps: [
      'MCP vs custom Apex callout for same capability?',
      'How many MCP tools before agent tool selection degrades?',
      'Self-hosted MCP vs Salesforce-managed connectors?',
    ],
    architectNote:
      'MCP is integration glue for agent era—architects treat MCP servers like microservices with strict contracts, not ad-hoc scripts.',
  },
  {
    title: 'Architect Customer 360 APIs for external channel consumption',
    difficulty: 'ARCHITECT',
    tags: ['customer-360', 'api', 'graphql', 'profiles'],
    scenario:
      'A partner portal and IVR system need unified customer context—recent orders, open cases, loyalty tier—from Salesforce without direct CRM UI access.',
    answerPoints: [
      'Define Customer 360 API layer aggregating CRM, Commerce, and Data Cloud attributes',
      'Use GraphQL or composite REST to minimize round trips for channel apps',
      'Apply OAuth client credentials with scoped permissions per channel partner',
      'Cache read-heavy profile slices with TTL; never cache auth-sensitive fields',
      'Rate limiting and quota per API consumer preventing partner abuse',
      'Field-level security and consent checks before returning marketing attributes to IVR',
      'SLA monitoring with synthetic probes from each consuming channel',
    ],
    followUps: [
      'GraphQL vs REST for mobile bandwidth constraints?',
      'Data Cloud Profile API role in 360 architecture?',
      'Versioning strategy when fields deprecated?',
    ],
    architectNote:
      'Customer 360 APIs are product interfaces—design for channel needs, not CRM object shapes. One aggregated contract beats exposing 12 raw objects.',
  },
  {
    title: 'Implement SLAS authentication for headless shoppers',
    difficulty: 'INTERMEDIATE',
    tags: ['slas', 'auth', 'commerce', 'oauth'],
    scenario:
      'Mobile app guest checkout works but registered login fails intermittently with token expiry errors during long browsing sessions.',
    answerPoints: [
      'Understand SLAS guest vs registered token lifetimes and refresh token flows',
      'Implement proactive token refresh before expiry on client side',
      'Secure storage of refresh tokens in mobile keychain—not localStorage on web',
      'Handle passwordless and social login flows per B2C Commerce identity config',
      'Basket merge logic when guest converts to registered mid-session',
      'Monitor auth error rates by app version and OS',
      'Document token revocation on logout and device theft scenarios',
    ],
    followUps: [
      'PKCE requirements for public clients?',
      'SSO integration with external identity provider?',
      'Session fixation risks in headless implementations?',
    ],
    architectNote:
      'Auth bugs become cart abandonment—architects prioritize auth flow telemetry as highly as checkout funnel metrics.',
  },
  {
    title: 'Design event-driven order lifecycle notifications to external systems',
    difficulty: 'ADVANCED',
    tags: ['events', 'orders', 'webhooks', 'integration'],
    scenario:
      'Warehouse WMS, email ESP, and loyalty platform each need order created, shipped, and returned events from Commerce and CRM in near-real-time.',
    answerPoints: [
      'Publish order lifecycle events via Platform Events, Change Data Capture, or Commerce hooks',
      'Event schema registry with versioned payloads and backward compatibility rules',
      'Idempotent consumers with event ID deduplication in middleware',
      'Retry with exponential backoff and dead-letter queue for failed deliveries',
      'Ordering guarantees: partition by order ID so events process sequentially per order',
      'Reconciliation batch comparing event stream to nightly order snapshot',
      'Monitoring lag time from order update to downstream processing complete',
    ],
    followUps: [
      'Platform Events vs Kafka on MuleSoft for high volume?',
      'Handling out-of-order ship and return events?',
      'Event payload PII minimization for third parties?',
    ],
    architectNote:
      'Event-driven order flows need idempotent consumers—assume duplicates and retries always happen.',
  },
  {
    title: 'Build headless self-service portal on Experience Cloud APIs',
    difficulty: 'INTERMEDIATE',
    tags: ['experience-cloud', 'self-service', 'api', 'portal'],
    scenario:
      'Customers want a custom React portal for case management and knowledge search instead of standard Experience Cloud templates.',
    answerPoints: [
      'Use Experience Cloud headless with User Access APIs and CMS delivery APIs',
      'Authenticate via OAuth with community user context preserving sharing rules',
      'Headless CMS for knowledge articles with structured content APIs',
      'Case create/update via UI API or dedicated REST respecting entitlements',
      'Embed Agentforce messaging SDK for support chat in custom UI',
      'Theming and localization handled client-side with CMS content keys',
      'SEO and SSR considerations if portal pages must be indexed',
    ],
    followUps: [
      'LWR vs custom app tradeoffs for partial headless?',
      'Guest access to knowledge without full community login?',
      'Rate limits on Experience API at scale?',
    ],
    architectNote:
      'Headless Experience Cloud still enforces Salesforce authorization—custom UI does not bypass sharing.',
  },
  {
    title: 'Integrate Agentforce APIs for embedded support in third-party apps',
    difficulty: 'ADVANCED',
    tags: ['agentforce', 'api', 'embedding', 'messaging'],
    scenario:
      'A fintech mobile app wants in-app support chat powered by Agentforce without redirecting users to Salesforce-hosted pages.',
    answerPoints: [
      'Embed Messaging for In-App/Web SDK with custom branding and pre-chat data passing',
      'Pass authenticated user context via JWT or signed identity tokens',
      'Configure agent topics and actions scoped to fintech use cases—not full CRM access',
      'Handle SDK lifecycle: foreground/background, push notifications for async replies',
      'Compliance: transcript storage, data residency, and financial disclaimer flows',
      'Fallback to web view or phone support when SDK or Agentforce unavailable',
      'Analytics correlating in-app support sessions with app retention metrics',
    ],
    followUps: [
      'Custom agent UI vs standard Messaging SDK components?',
      'Biometric re-auth before sensitive agent actions?',
      'Cross-platform SDK parity iOS/Android/React Native?',
    ],
    architectNote:
      'Embedded agents inherit app trust—users perceive responses as from the fintech brand, not Salesforce. UX and compliance must match app standards.',
  },
  {
    title: 'Design API versioning and deprecation for public partner APIs',
    difficulty: 'ARCHITECT',
    tags: ['api-versioning', 'deprecation', 'partners', 'governance'],
    scenario:
      '200 partners consume your Salesforce-backed product catalog API. A breaking schema change for new attributes threatens partner integrations.',
    answerPoints: [
      'Semantic versioning with minimum 12-month deprecation notice for breaking changes',
      'Parallel v1/v2 endpoints during migration window with usage telemetry per version',
      'Additive changes only in minor versions—never remove fields without major version',
      'Partner developer portal with changelog, sandbox keys, and contract tests',
      'Sunset automation alerting partners still on deprecated versions',
      'Breaking change approval board including partner success representation',
      'Load test new versions before default routing switches',
    ],
    followUps: [
      'GraphQL schema evolution vs REST versioning?',
      'Partner certification program before production keys?',
      'Handling partners who never migrate off deprecated APIs?',
    ],
    architectNote:
      'Public APIs are long-term contracts—architects optimize for partner stability over internal convenience.',
  },
  {
    title: 'Optimize headless product search and personalization APIs',
    difficulty: 'ADVANCED',
    tags: ['search', 'personalization', 'commerce', 'performance'],
    scenario:
      'Product search latency on mobile P95 is 2.8 seconds using direct Commerce search API calls without caching or CDN.',
    answerPoints: [
      'Introduce search API gateway with edge caching for popular queries',
      'Use Einstein Commerce Recommendations or external engine via API with fallback',
      'Prefetch category browse results on app launch during WiFi connectivity',
      'Compress payloads and paginate aggressively for mobile bandwidth',
      'Personalization calls async after initial search render—avoid blocking first paint',
      'Monitor zero-result searches feeding merchandising rules updates',
      'A/B test search ranking changes with feature flags',
    ],
    followUps: [
      'Algolia vs native Commerce search tradeoffs?',
      'Inventory-aware search consistency across regions?',
      'Search analytics feeding Data Cloud segments?',
    ],
    architectNote:
      'Search is UX-critical—architect progressive loading rather than monolithic personalized search blocking render.',
  },
  {
    title: 'Implement headless checkout with payment provider abstraction',
    difficulty: 'ADVANCED',
    tags: ['checkout', 'payments', 'stripe', 'commerce'],
    scenario:
      'The brand uses Stripe for payments across web and mobile while B2C Commerce manages basket and order creation.',
    answerPoints: [
      'Integrate payment provider via Commerce payment processor framework or custom hook',
      'PCI scope minimization using provider SDK tokenization—no raw card data on app servers',
      'Idempotent payment intent creation tied to basket ID preventing double charges',
      'Handle async payment confirmation webhooks updating order status in Commerce',
      '3DS and regional payment method support per market configuration',
      'Reconciliation between Stripe settlements and Commerce order totals',
      'Clear failure UX with basket preservation on payment decline',
    ],
    followUps: [
      'Apple Pay/Google Pay token flow with Commerce?',
      'Multi-currency pricing API synchronization?',
      'Refund flows initiated from Service Cloud cases?',
    ],
    architectNote:
      'Payment abstraction layer isolates provider swaps—never embed Stripe-specific logic throughout checkout UI code.',
  },
  {
    title: 'Design rate limiting and API gateway for Salesforce-backed microservices',
    difficulty: 'INTERMEDIATE',
    tags: ['rate-limiting', 'api-gateway', 'security'],
    scenario:
      'A viral marketing campaign caused partner API quota exhaustion and Commerce API 429 errors affecting all channels.',
    answerPoints: [
      'Deploy API gateway (MuleSoft, Apigee, AWS) with per-client quotas and burst allowances',
      'Prioritize tier-1 channels with reserved capacity pools',
      'Client-side retry with jitter respecting Retry-After headers',
      'Cache static catalog responses reducing origin load 80%+',
      'Circuit breakers returning degraded responses vs hard failures where acceptable',
      'Real-time quota dashboards alerting before exhaustion',
      'Post-incident autoscaling rules for Commerce API pod capacity if applicable',
    ],
    followUps: [
      'Salesforce native API limits vs gateway limits layering?',
      'Fair queuing vs hard reject for over-quota partners?',
      'DDoS protection at edge vs origin?',
    ],
    architectNote:
      'Shared API pools need fairness—architects isolate blast radius so one partner cannot take down consumer apps.',
  },
  {
    title: 'Connect headless channels to Data Cloud for unified analytics',
    difficulty: 'INTERMEDIATE',
    tags: ['data-cloud', 'analytics', 'events', 'attribution'],
    scenario:
      'Mobile app behavioral events sit in Firebase while web uses GA4. Marketing cannot attribute cross-channel journeys in Salesforce.',
    answerPoints: [
      'Stream mobile and web events to Data Cloud via Ingestion API with unified schema',
      'Shared identity keys linking anonymous and authenticated sessions',
      'Map events to Engagement DMO for journey analysis alongside Commerce orders',
      'Server-side event forwarding reducing client SDK data loss from ad blockers',
      'Consent flags attached at ingestion for analytics vs activation separation',
      'CRM Analytics dashboards consuming harmonized cross-channel datasets',
      'Validate event volume parity with source analytics tools weekly',
    ],
    followUps: [
      'Firebase vs direct SDK to Data Cloud?', 'Offline event replay batching?', 'Real-time segment triggers from app events?'],
    architectNote:
      'Headless without unified analytics is flying blind—instrument events at architecture design phase, not post-launch.',
  },
  {
    title: 'Architect B2B headless ordering with Salesforce Revenue Cloud APIs',
    difficulty: 'ARCHITECT',
    tags: ['b2b', 'revenue-cloud', 'cpq', 'ordering'],
    scenario:
      'A distributor wants partner portal for contract pricing, bulk ordering, and approval workflows using Revenue Cloud as backend.',
    answerPoints: [
      'Expose quote and order APIs respecting contract and entitlement rules',
      'Authenticated partner users with account-scoped price books via API',
      'Long-running configure-price-quote flows may need async quote generation endpoints',
      'Approval status webhooks notifying portal UI of workflow completion',
      'Integration with ERP for inventory availability checks before order submit',
      'Audit trail for partner-placed orders linking to Salesforce Opportunity/Order records',
      'Sandbox partner certification environment mirroring production API contracts',
    ],
    followUps: [
      'CPQ API complexity vs custom pricing service?', 'Multi-currency contract handling?', 'Partner hierarchy and delegated ordering?'],
    architectNote:
      'B2B headless ordering encodes commercial policy in APIs—surface contract constraints explicitly in API errors, not generic failures.',
  },
  {
    title: 'Implement content delivery for headless storefronts with CMS',
    difficulty: 'INTERMEDIATE',
    tags: ['cms', 'content', 'headless', 'commerce'],
    scenario:
      'Marketing manages hero banners and promotional content in Salesforce CMS but Next.js storefront shows stale content for hours.',
    answerPoints: [
      'Use CMS Delivery API with webhook-triggered cache purge on publish',
      'CDN cache keys including locale and market segment dimensions',
      'Preview API for staging content before production publish workflow',
      'Fallback to last-known-good content when CMS API unavailable',
      'Structured content models mapping CMS components to React component library',
      'Schedule-aware content respecting campaign start/end datetime metadata',
      'Monitor CMS API latency as part of page performance budgets',
    ],
    followUps: [
      'Salesforce CMS vs external Contentful coexistence?', 'Personalized CMS content from Data Cloud segments?', 'SEO metadata delivery patterns?'],
    architectNote:
      'Content freshness is operational concern—architect publish-to-CDN pipeline with measurable SLA, not manual cache clears.',
  },
  {
    title: 'Design offline-first mobile patterns with Salesforce sync',
    difficulty: 'ADVANCED',
    tags: ['offline', 'mobile', 'sync', 'field-service'],
    scenario:
      'Field sales reps in rural areas need offline catalog browse and draft order creation syncing when connectivity returns.',
    answerPoints: [
      'Local SQLite cache of catalog subset assigned to rep territory',
      'Offline Mobile SDK or custom sync with conflict resolution rules',
      'Queue outbound mutations with idempotency keys replayed on reconnect',
      'Visual indicators for stale pricing requiring refresh before submit',
      'Compress initial sync payloads; delta sync for subsequent updates',
      'Test conflict scenarios: price change while offline draft exists',
      'Admin controls forcing minimum sync before order submission if policy requires',
    ],
    followUps: [
      'Salesforce Mobile SDK vs React Native custom offline?', 'Governor limits on bulk sync upload?', 'Offline Agentforce feasibility?'],
    architectNote:
      'Offline-first demands explicit conflict policy—last-write-wins is rarely acceptable for B2B pricing.',
  },
  {
    title: 'Secure headless API exposure with zero-trust principles',
    difficulty: 'ARCHITECT',
    tags: ['zero-trust', 'security', 'oauth', 'mTLS'],
    scenario:
      'Pen test found partner API keys embedded in mobile app binaries and excessive OAuth scopes on integration users.',
    answerPoints: [
      'Never embed long-lived secrets in mobile apps—use short-lived tokens via backend-for-frontend',
      'Implement mTLS for server-to-server partner integrations',
      'Scoped OAuth policies per API resource with regular access reviews',
      'Rotate credentials automatically via secrets manager integration',
      'WAF and bot detection on public API endpoints',
      'Principle of least privilege on Salesforce integration user profiles',
      'Continuous scanning for leaked keys in app store binaries',
    ],
    followUps: [
      'Certificate pinning on mobile for BFF calls?', 'JWT vs OAuth for user context passing?', 'Salesforce Shield Event Monitoring integration?'],
    architectNote:
      'Mobile binaries are hostile environments—architect BFF layer holding secrets, not client apps.',
  },
  {
    title: 'Evaluate composable commerce vs monolithic Salesforce Commerce',
    difficulty: 'ARCHITECT',
    tags: ['composable', 'architecture', 'strategy'],
    scenario:
      'CTO proposes replacing B2C Commerce with composable best-of-breed cart, PIM, and OMS while keeping Salesforce CRM.',
    answerPoints: [
      'Composable offers flexibility but integration tax and operational complexity',
      'Assess team maturity for multi-vendor ops vs Salesforce unified stack',
      'Salesforce CRM + Commerce integration benefits reduced with external cart',
      'Define clear system of record per domain: cart, inventory, pricing, orders',
      'MuleSoft or iPaaS becomes critical path for composable success',
      'TCO includes 24/7 on-call across vendors not single Salesforce support case',
      'Hybrid: composable PIM/search with Salesforce order management if fit aligns',
    ],
    followUps: [
      'Migration path from SFCC to composable without big-bang?', 'Agentforce impact without native Commerce context?', 'Vendor contract exit costs?'],
    architectNote:
      'Composable is organizational capability statement—architects quantify integration FTE before endorsing best-of-breed.',
  },
  {
    title: 'Build developer experience for internal API consumers',
    difficulty: 'INTERMEDIATE',
    tags: ['developer-experience', 'documentation', 'sandbox'],
    scenario:
      'Internal teams complain Salesforce APIs are hard to discover, test, and mock causing duplicate integration code.',
    answerPoints: [
      'Central API catalog with OpenAPI specs, examples, and ownership contacts',
      'Self-service sandbox API keys with automated provisioning',
      'Mock servers for parallel frontend development before backend ready',
      'Postman collections or Insomnia maintained in CI from OpenAPI source',
      'Slack support channel with API champions rotation',
      'Breaking change CI checks comparing OpenAPI diff on pull requests',
      'Internal hackathons showcasing reusable API clients SDKs',
    ],
    followUps: [
      'Anypoint Exchange vs custom developer portal?', 'Synthetic data generators for sandboxes?', 'GraphQL federation internal adoption?'],
    architectNote:
      'API adoption equals developer experience—invest in catalog and mocks as much as backend implementation.',
  },
  {
    title: 'Design multi-region headless deployment for global retail',
    difficulty: 'ARCHITECT',
    tags: ['multi-region', 'global', 'latency', 'compliance'],
    scenario:
      'A retailer operates EU, US, and APAC storefronts with data residency requirements and localized payment methods.',
    answerPoints: [
      'Regional API endpoints or CDN routing to nearest Commerce realm/instance',
      'Data residency: EU customer PII stored in EU Salesforce instance where required',
      'Locale-specific content, currency, tax, and payment method configuration',
      'Global catalog master with regional assortment and pricing overlays',
      'Cross-region disaster failover documented with DNS and cache implications',
      'Unified analytics in Data Cloud with region dimension respecting residency',
      '24-hour follow-the-sun ops runbooks per region',
    ],
    followUps: [
      'Single vs multiple B2C Commerce instances?', 'Cross-border order routing?', 'GDPR impact on global Customer 360 API?'],
    architectNote:
      'Global headless is multi-region ops problem—latency optimization fails without residency and payment localization plan.',
  },
  {
    title: 'Monitor and SLO headless channel API reliability',
    difficulty: 'INTERMEDIATE',
    tags: ['slo', 'monitoring', 'observability', 'reliability'],
    scenario:
      'Mobile app crash reports spike during checkout but Salesforce dashboards show green API availability.',
    answerPoints: [
      'Define SLOs from client perspective: p95 checkout API latency and error rate',
      'Synthetic transactions from mobile user agents in key geographies',
      'Distributed tracing correlating client errors to backend span failures',
      'Real user monitoring capturing failed API responses with sanitized payloads',
      'Error budget policy pausing releases when SLO breached',
      'Status page communicating incidents to app teams and partners',
      'Blameless postmortems distinguishing client bugs vs API regressions',
    ],
    followUps: [
      'Third-party APM vs Salesforce Event Monitoring?', 'Alert fatigue tuning for mobile noise?', 'SLO targets for guest vs authenticated flows?'],
    architectNote:
      'Server-green/client-red is common—architects instrument end-to-end SLOs, not just Salesforce org health.',
  },
];

export const HEADLESS_360_EXTRAS: TopicTemplate[] = [
  {
    title: 'Implement CORS and CSP for headless web apps calling Salesforce',
    difficulty: 'INTERMEDIATE',
    tags: ['cors', 'csp', 'security', 'web'],
    scenario: 'Browser console shows CORS errors blocking Experience Cloud API calls from custom domain.',
    answerPoints: ['Configure CORS allowlist for exact production and staging origins', 'Avoid wildcard origins with credentials', 'CSP headers restricting script sources preventing XSS', 'Use BFF to proxy calls avoiding browser-exposed tokens where possible', 'Test preflight OPTIONS handling in CI', 'Document required Salesforce setup steps for new domains'],
    followUps: ['SameSite cookie impact?', 'Subdomain vs path CORS entries?', 'CSP breaking third-party widgets?'],
    architectNote: 'CORS misconfiguration is deployment checklist item—automate verification in pipeline.',
  },
  {
    title: 'Design cart abandonment recovery via headless APIs',
    difficulty: 'INTERMEDIATE',
    tags: ['cart-abandonment', 'marketing', 'api'],
    scenario: 'Marketing wants triggered emails when mobile users abandon baskets without batch exports.',
    answerPoints: ['Webhook or event on basket idle threshold crossing', 'PII-minimized payload to marketing automation', 'Deep link API restoring basket state in app', 'Consent check before email activation', 'Exclude purchased baskets via order correlation', 'Measure recovery rate vs control group'],
    followUps: ['Real-time vs 1-hour delay optimal?', 'Guest basket identity resolution?', 'Integration with Marketing Cloud vs external ESP?'],
    architectNote: 'Abandonment triggers need idempotent firing—one email per basket session, not per API poll.',
  },
  {
    title: 'Expose Salesforce metadata to headless admin tools',
    difficulty: 'ADVANCED',
    tags: ['metadata', 'tooling-api', 'admin'],
    scenario: 'Internal admin portal needs read-only visibility into picklist values and entitlement configs.',
    answerPoints: ['Tooling API or Metadata API for structured config reads', 'Cache metadata with TTL—changes infrequent', 'Strict read-only service account with minimal scope', 'Never expose Metadata API write to portal without approval workflow', 'Audit admin portal access logs', 'Version metadata snapshots for troubleshooting'],
    followUps: ['UI API vs Tooling for picklists?', 'Latency of metadata bulk reads?', 'Sandbox sync for admin preview?'],
    architectNote: 'Metadata API access is powerful—read-only portal still needs security review.',
  },
  {
    title: 'Handle locale and translation in headless API responses',
    difficulty: 'INTERMEDIATE',
    tags: ['i18n', 'localization', 'api'],
    scenario: 'Product descriptions return English only despite CMS translations existing for 12 locales.',
    answerPoints: ['Accept-Language header or locale query param on all content APIs', 'CMS delivery filtered by locale with fallback chain', 'Commerce product attributes localized per market catalog', 'Currency and date formatting server-side or documented client contract', 'Cache per locale preventing cross-locale pollution', 'Test fallback when translation missing'],
    followUps: ['RTL layout API hints?', 'Dynamic vs static translation workflows?', 'Locale in JWT claims vs header?'],
    architectNote: 'i18n is API contract concern—locale must be first-class parameter, not afterthought.',
  },
  {
    title: 'Integrate headless returns portal with Service Cloud RMA',
    difficulty: 'INTERMEDIATE',
    tags: ['returns', 'service-cloud', 'rma'],
    scenario: 'Customers initiate returns in mobile app but warehouse never receives RMA in Service Cloud.',
    answerPoints: ['API creating Return Order or Case with line items from app submission', 'Validate return eligibility against order date and product rules', 'Generate return label via integrated shipping API', 'Status webhooks updating app on refund processed', 'Link return record to original Commerce order ID', 'Idempotent submission preventing duplicate RMAs'],
    followUps: ['Exchange vs refund flow branching?', 'In-store return with online purchase?', 'Partial quantity returns?'],
    architectNote: 'Returns bridge commerce and service—single order ID thread across systems mandatory.',
  },
  {
    title: 'Design feature flags for headless channel rollouts',
    difficulty: 'INTERMEDIATE',
    tags: ['feature-flags', 'rollout', 'devops'],
    scenario: 'New checkout flow tested in web but mobile release delayed—need shared toggle control.',
    answerPoints: ['Central feature flag service evaluated client and server side', 'Gradual rollout by user segment or percentage', 'Kill switch for broken checkout without app store release', 'Flag state logged for experiment analysis', 'Sync flag definitions across web, iOS, Android pipelines', 'Document flag retirement after full rollout'],
    followUps: ['LaunchDarkly vs custom Salesforce config?', 'Flag evaluation offline on mobile?', 'Compliance audit of who changed flags?'],
    architectNote: 'Headless multi-client releases require centralized flags—per-app hardcoding fails at scale.',
  },
  {
    title: 'Compare server-side vs client-side rendering for SEO commerce',
    difficulty: 'INTERMEDIATE',
    tags: ['ssr', 'seo', 'nextjs'],
    scenario: 'Organic search traffic dropped after SPA migration to client-only React storefront.',
    answerPoints: ['SSR or SSG for product and category pages critical for SEO', 'ISR for catalog pages balancing freshness and performance', 'Client hydration for interactive cart without blocking crawlable content', 'Structured data JSON-LD rendered server-side', 'Monitor Core Web Vitals impact of SSR choices', 'Dynamic pages (account) remain CSR with noindex as appropriate'],
    followUps: ['Edge SSR vs origin SSR costs?', 'Salesforce CMS preview with SSR?', 'Bot detection separate from SEO crawlers?'],
    architectNote: 'SEO is architectural decision for headless—CSR-only catalog pages sacrifice discoverability.',
  },
  {
    title: 'Implement webhook signature verification for Commerce events',
    difficulty: 'ADVANCED',
    tags: ['webhooks', 'security', 'verification'],
    scenario: 'Security audit requires proof inbound webhooks from Salesforce are authentic and unmodified.',
    answerPoints: ['Verify HMAC signature using shared secret rotated periodically', 'Reject replayed events via timestamp tolerance window', 'Store raw payload before parsing for forensic audit', 'Idempotent processing keyed on webhook event ID', 'TLS 1.2+ only on webhook endpoint', 'Alert on signature failure spikes indicating attack or misconfig'],
    followUps: ['Secret storage in AWS Secrets Manager?', 'Multiple webhook endpoints per environment?', 'Retry storm handling from sender?'],
    architectNote: 'Unsigned webhooks are invitation to spoof orders—verify before any fulfillment action.',
  },
  {
    title: 'Design headless loyalty redemption at checkout API',
    difficulty: 'INTERMEDIATE',
    tags: ['loyalty', 'checkout', 'redemption'],
    scenario: 'Shoppers cannot apply loyalty points in headless checkout though points show in profile API.',
    answerPoints: ['Basket hook or custom API applying points discount with validation', 'Real-time points balance check against loyalty system', 'Rollback points on order cancellation via compensating transaction', 'Minimum redemption thresholds enforced server-side', 'Display points earned preview before order submit', 'Audit log linking order to points debit/credit'],
    followUps: ['Partial points redemption?', 'Points + promo stack rules?', 'Latency budget for loyalty callout at checkout?'],
    architectNote: 'Loyalty at checkout is transactional—profile display alone insufficient without basket integration.',
  },
  {
    title: 'Plan load testing headless APIs before peak season',
    difficulty: 'INTERMEDIATE',
    tags: ['load-testing', 'performance', 'peak'],
    scenario: 'Last Black Friday crashed APIs at 3x normal traffic; leadership wants proof of readiness this year.',
    answerPoints: ['Model peak traffic from historical analytics plus growth factor', 'Load test read (search) and write (checkout) paths independently', 'Include auth token refresh load often forgotten', 'Test from geographically distributed load generators', 'Define pass criteria: p95 latency and error rate thresholds', 'Coordinate with Salesforce on capacity planning if needed', 'Game day runbook with rollback triggers'],
    followUps: ['Sandbox representative of prod performance?', 'Synthetic vs recorded traffic replay?', 'Partner API load isolation tests?'],
    architectNote: 'Load test the critical path end-to-end—including payment webhooks—not isolated product GET.',
  },
];

export const headless360Questions = buildQuestionBank('headless-360', [
  ...HEADLESS_360_DETAILED,
  ...HEADLESS_360_EXTRAS,
  ...HEADLESS_360_ADDITIONS,
]);
