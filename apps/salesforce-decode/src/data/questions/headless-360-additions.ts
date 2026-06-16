import type { TopicTemplate } from './generator';

export const HEADLESS_360_ADDITIONS: TopicTemplate[] = [
  {
    title: 'Integrate WhatsApp Business API with Agentforce for order support',
    difficulty: 'ARCHITECT',
    tags: ['whatsapp', 'agentforce', 'messaging', 'channels'],
    scenario:
      'A consumer electronics brand routes WhatsApp order inquiries through a custom middleware layer. Customers expect catalog images, order lookups, and human escalation within WhatsApp session windows.',
    answerPoints: [
      'Register WhatsApp Business Account with Meta and map webhook events to Salesforce Messaging or custom channel adapter',
      'Authenticate customers via one-time passcode or deep link before agent actions expose order PII',
      'Adapt Agentforce topics for WhatsApp constraints: 4096 character limits, template messages for outbound',
      'Handle 24-hour session window rules with approved templates for proactive follow-ups',
      'Route media messages through virus scan and OCR pipeline before agent context ingestion',
      'Integrate order status Agent Actions returning structured data formatted for WhatsApp rich replies',
      'Monitor session expiry rate, template approval failures, and containment per locale',
    ],
    followUps: [
      'WhatsApp Cloud API vs on-prem BSP architecture tradeoffs?',
      'How do you share agents between WhatsApp and web chat?',
      'What consent applies for WhatsApp marketing vs service messages?',
    ],
    architectNote:
      'WhatsApp is policy-heavy messaging—not generic web chat. Architect channel adapter, template strategy, and auth before agent topic design.',
  },
  {
    title: 'Build Slack operational apps surfacing Salesforce alerts and approvals',
    difficulty: 'ADVANCED',
    tags: ['slack', 'integrations', 'approvals', 'notifications'],
    scenario:
      'Sales ops wants discount approvals and large deal alerts in Slack channels with action buttons updating Salesforce without opening CRM. Security requires least-privilege OAuth per workspace.',
    answerPoints: [
      'Use Slack Bolt app with OAuth installing scoped Salesforce connected app per workspace',
      'Deliver events via Platform Events or Change Data Capture filtered to relevant record criteria',
      'Interactive buttons invoke Apex REST or Flow invocable endpoints with idempotent approval actions',
      'Validate Slack user identity maps to Salesforce user before executing privileged approvals',
      'Encrypt and rotate Slack signing secret verifying webhook authenticity',
      'Rate limit and dedupe notifications preventing alert storms on bulk updates',
      'Audit every Slack-initiated Salesforce mutation with user and channel metadata',
    ],
    followUps: [
      'Slack Connect channels with external partners—what Salesforce data is safe?',
      'How handle approval delegation when Slack user is OOO?',
      'Enterprise Grid vs single workspace deployment patterns?',
    ],
    architectNote:
      'Slack apps are production UIs—apply same auth, audit, and idempotency standards as customer-facing portals.',
  },
  {
    title: 'Architect custom React storefront consuming Commerce Cloud SCAPI',
    difficulty: 'ARCHITECT',
    tags: ['react', 'scapi', 'commerce-api', 'headless'],
    scenario:
      'Engineering rebuilds flagship.com in Next.js React while retaining Salesforce B2C Commerce for basket, pricing, and checkout. SEO and Core Web Vitals are board-level KPIs.',
    answerPoints: [
      'Separate React app concerns: SSR for PLP/PDP SEO, client hydration for interactive cart',
      'Use SLAS for shopper auth with secure token storage and refresh in httpOnly cookies where possible',
      'Implement BFF layer aggregating SCAPI calls reducing client chattiness and hiding API secrets',
      'Cache product catalog with tag-based invalidation on price and inventory webhooks',
      'Design optimistic UI for cart updates with server reconciliation on SCAPI response',
      'Handle locale and currency via SCAPI site context parameters consistently server and client',
      'Observability tracing from React through BFF to SCAPI with correlation IDs',
    ],
    followUps: [
      'When to call SCAPI from browser vs BFF only?',
      'How manage preview and staging content in headless React?',
      'App router vs pages router implications for commerce SSR?',
    ],
    architectNote:
      'React headless succeeds with BFF boundary—never expose all SCAPI complexity and secrets directly to browser bundles.',
  },
  {
    title: 'Implement headless Experience Cloud authentication with JWT bearer tokens',
    difficulty: 'ADVANCED',
    tags: ['experience-cloud', 'jwt', 'auth', 'headless'],
    scenario:
      'Partner portal built in custom SPA must authenticate users against Experience Cloud without iframe login, supporting SSO from corporate IdP and community self-registration.',
    answerPoints: [
      'Configure Experience Cloud external auth providers and OAuth authorization code flow with PKCE',
      'Issue JWT access tokens with appropriate community user scopes for headless API consumption',
      'Implement token refresh and silent re-auth patterns avoiding full page redirects in SPA',
      'Map IdP groups to Experience Cloud profiles and permission sets programmatically',
      'Secure API routes validating JWT signature, expiry, and audience claims server-side',
      'Handle guest vs authenticated API access with separate rate limits and data scopes',
      'Document token lifecycle and logout propagating to IdP where SAML SLO configured',
    ],
    followUps: [
      'Headless vs embedded Experience Cloud login UX tradeoffs?',
      'How do CMS content permissions reflect in JWT claims?',
      'Session fixation risks in SPA OAuth implementations?',
    ],
    architectNote:
      'Headless Experience Cloud auth is OAuth product design—get token scopes and profile mapping right before building portal features.',
  },
  {
    title: 'Embed Agentforce session APIs in third-party partner portals',
    difficulty: 'ARCHITECT',
    tags: ['agentforce', 'api', 'embedding', 'partners'],
    scenario:
      'Logistics partners embed support agent in their shipper portal helping customers track Salesforce-stored shipments without visiting your brand site.',
    answerPoints: [
      'Use Agentforce session API creating authenticated sessions scoped to partner OAuth client',
      'Pass verified customer context token from partner auth—not partner user guessing customer IDs',
      'Restrict agent topics and actions to shipment domain preventing cross-customer data access',
      'Render agent UI via embedded widget or headless message API matching partner design system',
      'Log partner client ID with every session for audit and abuse detection',
      'Define SLAs and rate limits per partner tier in API gateway',
      'Fallback to case creation API when agent unavailable with structured context from session',
    ],
    followUps: [
      'Iframe widget vs fully headless message rendering?',
      'How prevent partner from replaying session tokens?',
      'Multi-tenant agent config per partner or shared with ACLs?',
    ],
    architectNote:
      'Embedded agents in partner apps are B2B2C trust boundaries—scope sessions narrowly and audit partner context injection.',
  },
  {
    title: 'Design headless B2B quote configuration with Salesforce Revenue Cloud APIs',
    difficulty: 'ARCHITECT',
    tags: ['b2b', 'revenue-cloud', 'cpq', 'headless'],
    scenario:
      'Industrial distributor replaces legacy CPQ UI with custom React buyer portal requiring complex bundle configuration, contracted pricing, and approval workflows.',
    answerPoints: [
      'Use Revenue Cloud / CPQ APIs for product catalog, price rules, and quote line configuration server-side',
      'Never trust client-side price calculation—validate totals on server before quote submit',
      'Model buyer account hierarchy and entitlement contracts in API context for price resolution',
      'Expose configuration state as REST resources enabling save-resume across sessions',
      'Integrate approval workflow webhooks notifying buyers of status in portal UI',
      'Handle large BOM configurations with pagination and async pricing jobs for heavy bundles',
      'Version quote API contracts coordinating with ERP order export integrations',
    ],
    followUps: [
      'Legacy CPQ vs Revenue Cloud API capability gaps?',
      'How represent guided selling rules in headless UX?',
      'Guest buyer RFQ vs authenticated contract pricing?',
    ],
    architectNote:
      'B2B headless CPQ is server-authoritative pricing—React is presentation; Revenue Cloud APIs own configuration truth.',
  },
  {
    title: 'Secure MCP server authentication for Agentforce external tool calls',
    difficulty: 'ADVANCED',
    tags: ['mcp', 'authentication', 'agentforce', 'security'],
    scenario:
      'DevOps deployed MCP servers on Kubernetes exposing inventory and pricing tools to Agentforce. Security audit flagged missing OAuth and overly broad tool permissions.',
    answerPoints: [
      'Require OAuth 2.0 client credentials or mTLS for Agentforce-to-MCP server authentication',
      'Register MCP tools with least-privilege scopes mapped to specific agent topics',
      'Implement short-lived tokens with rotation via secrets manager integration',
      'Validate MCP tool input schemas server-side rejecting overbroad or malformed agent requests',
      'Network isolate MCP servers from public internet using private link or VPN where possible',
      'Log tool invocations with hashed inputs and response codes for security monitoring',
      'Penetration test MCP endpoints including prompt injection attempting tool abuse',
    ],
    followUps: [
      'Self-hosted MCP vs Salesforce-managed connector security model?',
      'How many tools before splitting MCP servers by domain?',
      'Rate limiting MCP at gateway vs server?',
    ],
    architectNote:
      'MCP servers are privileged agent backends—authenticate and scope them like internal microservices, not experimental scripts.',
  },
  {
    title: 'Send WhatsApp order status updates via Commerce API event pipeline',
    difficulty: 'ADVANCED',
    tags: ['whatsapp', 'commerce-api', 'notifications', 'events'],
    scenario:
      'Customers opt into WhatsApp shipping updates at checkout but messages arrive hours late or with wrong tracking numbers after order export delays.',
    answerPoints: [
      'Subscribe to Commerce order and shipment status events via webhooks or Order Management events',
      'Map order lifecycle states to approved WhatsApp template messages per locale',
      'Include tracking lookup Agent Action validating carrier API before send',
      'Queue messages respecting WhatsApp template and session window policies',
      'Idempotent send keyed on order ID plus status transition preventing duplicate texts',
      'Handle partial shipments with multi-message sequence coordinated in orchestration layer',
      'Monitor delivery failures, template rejections, and opt-out keyword processing',
    ],
    followUps: [
      'OMS vs Commerce-native shipment events as source of truth?',
      'How sync opt-in captured at checkout to messaging consent store?',
      'Fallback to SMS when WhatsApp delivery fails?',
    ],
    architectNote:
      'Transactional WhatsApp is event-driven architecture—checkout opt-in means nothing without reliable order event pipeline and template governance.',
  },
  {
    title: 'Implement Slack slash commands triggering Salesforce Flow via API',
    difficulty: 'INTERMEDIATE',
    tags: ['slack', 'flow', 'slash-commands', 'automation'],
    scenario:
      'Support engineers want /create-case Slack command pre-populating Case from thread context but early version created duplicate cases on Slack retries.',
    answerPoints: [
      'Verify Slack request signature and timestamp on every slash command invocation',
      'Use idempotency key derived from Slack team, channel, and trigger_id in Flow entry',
      'Return immediate ephemeral response while async Flow completes heavy work',
      'Map Slack user to Salesforce user via linked identity table before case create',
      'Parse thread context with explicit field confirmation step preventing wrong customer linkage',
      'Post completion message to thread with Case number link back to Salesforce record',
      'Monitor duplicate case rate and command error logs for retry storm detection',
    ],
    followUps: [
      'Slack workflow builder vs custom app maintenance?',
      'How restrict commands to specific Slack channels?',
      'Governance for commands executing write actions in production?',
    ],
    architectNote:
      'Slack retries are guaranteed—idempotent Flow entry is mandatory, not optional polish.',
  },
  {
    title: 'Fetch Salesforce data in React Server Components with cache strategy',
    difficulty: 'ADVANCED',
    tags: ['react', 'ssr', 'server-components', 'caching'],
    scenario:
      'Headless marketing site in Next.js App Router hammers Experience Cloud CMS and CRM APIs causing rate limit errors during traffic spikes.',
    answerPoints: [
      'Use React Server Components fetching Salesforce data server-side only—no tokens in client bundle',
      'Apply fetch cache directives aligned to content freshness: static CMS vs dynamic inventory',
      'Implement stale-while-revalidate pattern for semi-static product merchandising content',
      'Centralize Salesforce API client in server module with connection pooling and retry backoff',
      'Tag-based revalidation triggered by Salesforce webhooks on content publish events',
      'Separate read replicas or cached BFF responses for anonymous vs authenticated fetches',
      'Monitor API quota consumption per page template and optimize N+1 RSC fetch patterns',
    ],
    followUps: [
      'When must RSC avoid caching personalized CRM data?',
      'Edge runtime vs Node runtime for Salesforce callouts?',
      'GraphQL CMS vs REST for RSC data requirements?',
    ],
    architectNote:
      'RSC plus Salesforce requires deliberate cache taxonomy—treating all CRM calls as static ISR invites stale data and rate limits alike.',
  },
  {
    title: 'Deliver headless LMS course enrollment via Experience Cloud APIs',
    difficulty: 'INTERMEDIATE',
    tags: ['experience-cloud', 'lms', 'api', 'headless'],
    scenario:
      'Training company embeds course catalog and enrollment in custom Vue app while Salesforce Experience Cloud manages learning objects and completion records.',
    answerPoints: [
      'Expose course catalog via Experience Cloud headless CMS or custom Apex REST aggregating learning objects',
      'Implement enrollment API validating prerequisites and seat capacity server-side',
      'Authenticate learners with Experience Cloud identity linked to custom app JWT session',
      'Track progress via API callbacks from external content player updating completion records',
      'Handle payment integration before enrollment confirmation where courses are paid',
      'Sync completion certificates back to CRM Contact for compliance reporting',
      'Rate limit enrollment API preventing bot registration attacks on popular courses',
    ],
    followUps: [
      'Native Experience Cloud LMS vs external SCORM player integration?',
      'How handle content DRM in headless delivery?',
      'Reporting on learning data in Data Cloud?',
    ],
    architectNote:
      'Headless LMS is identity plus enrollment API correctness—content delivery partners vary but Salesforce owns learner record truth.',
  },
  {
    title: 'Expose negotiated B2B contract pricing APIs to headless buyer portals',
    difficulty: 'ARCHITECT',
    tags: ['b2b', 'pricing', 'contracts', 'api'],
    scenario:
      'Manufacturing buyers see list price on headless portal instead of contract rates negotiated in Salesforce, causing checkout abandonment and manual quote rework.',
    answerPoints: [
      'Resolve buyer account and active contract entitlements in every pricing API request context',
      'Use Revenue Cloud or custom price book APIs returning contract-specific price overlays',
      'Never expose internal discount logic to client—return final authorized unit prices only',
      'Validate contract effective dates and volume tiers on server with audit log',
      'Handle multi-ship-to accounts with ship-to-specific contract assignments',
      'Cache contract prices with short TTL invalidated on contract amendment events',
      'Integration test matrix covering expired contracts, tier breaks, and promotional stack rules',
    ],
    followUps: [
      'How represent spot buys vs contract catalog SKUs?',
      'Should buyers see price validity expiration dates?',
      'ERP contract sync latency impact on headless pricing accuracy?',
    ],
    architectNote:
      'B2B headless pricing failures are trust failures—contract context must be first-class in API auth session, not optional query param.',
  },
  {
    title: 'Initialize Agentforce mobile SDK sessions from native iOS and Android apps',
    difficulty: 'ADVANCED',
    tags: ['agentforce', 'mobile-sdk', 'api', 'native-apps'],
    scenario:
      'Retail mobile app embeds Agentforce for in-app support. Sessions drop on app backgrounding and authenticated shoppers lose order context when SDK reinitializes.',
    answerPoints: [
      'Use Agentforce mobile SDK session APIs with persistent device ID and shopper auth token linkage',
      'Pass CRM or Commerce customer ID in session bootstrap after app authentication completes',
      'Restore session context from local secure storage on app resume within SDK session TTL',
      'Handle push notification deep links reopening agent with pre-filled order intent topic',
      'Implement graceful session expiry UX prompting re-auth without losing transcript access policy',
      'Monitor SDK init failures, session duration, and containment on mobile separately from web',
      'Coordinate SDK version upgrades with minimum app version force upgrade strategy',
    ],
    followUps: [
      'Embedded SDK UI vs fully custom native chat rendering?',
      'Offline queue messages when network unavailable?',
      'App store review considerations for AI chat disclosures?',
    ],
    architectNote:
      'Mobile agent sessions are stateful client engineering—SDK init is not fire-and-forget on every screen navigation.',
  },
  {
    title: 'Reduce headless checkout latency with Composite REST API patterns',
    difficulty: 'ADVANCED',
    tags: ['composite-api', 'checkout', 'performance', 'rest'],
    scenario:
      'Single-page checkout makes seven sequential Salesforce callouts causing 4-second submit times on mobile networks during flash sales.',
    answerPoints: [
      'Batch related GETs into Composite REST subrequests reducing round trips',
      'Use Composite graph for dependent writes: create order, payment authorization, inventory decrement in one HTTP call where supported',
      'Move non-critical post-order actions—email, loyalty credit—to async queue after confirmation response',
      'Implement BFF aggregating Salesforce and payment provider calls server-side near user region',
      'Set aggressive timeouts with user-visible retry on idempotent payment steps only',
      'Load test composite payloads at peak concurrency including auth token refresh overhead',
      'Document partial failure handling when composite subrequest succeeds but sibling fails',
    ],
    followUps: [
      'Composite vs Bulk API for checkout writes?',
      'How handle PCI scope with BFF payment tokenization?',
      'GraphQL composite alternatives in your stack?',
    ],
    architectNote:
      'Headless checkout performance is network architecture—composite patterns and async side effects beat micro-optimizing individual API calls.',
  },
  {
    title: 'Enable WhatsApp catalog commerce integrated with B2C Commerce inventory',
    difficulty: 'ARCHITECT',
    tags: ['whatsapp', 'catalog', 'commerce', 'inventory'],
    scenario:
      'Marketing launches WhatsApp catalog shopping in emerging markets but orders oversell when catalog sync lags Commerce inventory by 30 minutes.',
    answerPoints: [
      'Sync product catalog and inventory from Commerce to WhatsApp via scheduled and event-driven updates',
      'Validate real-time availability at order capture through SCAPI inventory check action',
      'Map WhatsApp product IDs to Commerce SKUs maintaining single product master',
      'Handle multi-currency catalog variants per WhatsApp business phone region',
      'Route WhatsApp orders into Commerce basket API creating formal checkout session',
      'Alert when sync lag exceeds threshold disabling buy buttons proactively',
      'Reconcile WhatsApp orders daily against Commerce order export for attribution',
    ],
    followUps: [
      'Meta catalog vs custom catalog feed architecture?',
      'How manage promotional pricing in WhatsApp vs web parity?',
      'Agentforce role in WhatsApp catalog buyer questions?',
    ],
    architectNote:
      'WhatsApp catalog is another commerce channel—inventory truth stays in Commerce APIs with sync SLAs, not static catalog uploads.',
  },
  {
    title: 'Route Slack discount approval workflows to Revenue Cloud quote records',
    difficulty: 'INTERMEDIATE',
    tags: ['slack', 'approvals', 'revenue-cloud', 'workflow'],
    scenario:
      'Sales managers approve discount exceptions in Slack but quote status in Salesforce remains pending until someone manually updates CRM hours later.',
    answerPoints: [
      'Subscribe to Revenue Cloud approval events posting interactive Slack messages with quote summary',
      'Approval buttons invoke Flow updating quote stage with manager Salesforce user validation',
      'Display discount impact, margin, and policy violation flags in Slack attachment for informed approval',
      'Handle multi-step approval chains routing subsequent Slack notifications to next approver',
      'Sync rejection reasons back to quote record visible to sales rep in CRM and portal',
      'Timeout escalations when Slack approval pending beyond SLA',
      'Audit trail linking Slack message timestamp to Salesforce approval history',
    ],
    followUps: [
      'Mobile Slack approvals vs Salesforce mobile app?',
      'Delegated approver mapping when manager on leave?',
      'Prevent approval from outdated quote revision?',
    ],
    architectNote:
      'Slack approvals must write system of record immediately—chat convenience fails if CRM state lags behind conversation.',
  },
  {
    title: 'Implement B2B punchout catalog integration with headless buyer experience',
    difficulty: 'ARCHITECT',
    tags: ['b2b', 'punchout', 'commerce', 'procurement'],
    scenario:
      'Enterprise buyer procurement system punchout lands in Salesforce Commerce B2B storefront but return cart cXML fails validation breaking ERP requisition creation.',
    answerPoints: [
      'Implement cXML punchout setup and return cart handlers per buyer procurement system requirements',
      'Maintain buyer-specific catalog visibility and contract pricing in punchout session context',
      'Validate return cart payload schema before redirect preventing ERP rejection loops',
      'Map Commerce cart lines to buyer ERP material numbers via integration middleware',
      'Session timeout handling with cart persistence and punchout session token renewal',
      'Support level 2 punchout where checkout completes in buyer system not Commerce',
      'Monitor punchout success rate, return cart errors, and buyer-specific integration logs',
    ],
    followUps: [
      'OCI vs custom punchout handler in Commerce Cloud?',
      'How test punchout without production buyer credentials?',
      'Headless punchout where buyer never sees Commerce UI?',
    ],
    architectNote:
      'Punchout is integration-heavy B2B—cXML correctness and buyer-specific mappings matter more than storefront UX polish.',
  },
  {
    title: 'Build custom React admin for Commerce catalog and price management',
    difficulty: 'ADVANCED',
    tags: ['react', 'commerce', 'admin', 'catalog'],
    scenario:
      'Merchandisers refuse Business Manager UX and demand custom React admin calling Commerce APIs for bulk price updates during promotions.',
    answerPoints: [
      'Use Commerce Admin APIs or OCAPI with appropriate roles for catalog and price book mutations',
      'Implement job-based bulk updates with progress tracking for thousands of SKUs',
      'Validate price change bounds and approval workflow before API commit',
      'Staging vs production environment separation with promotion pipeline for catalog changes',
      'Audit log every bulk change with user, timestamp, and diff summary',
      'Optimistic UI with rollback on API partial failure reporting affected SKUs',
      'Coordinate cache invalidation on headless storefront after catalog publish events',
    ],
    followUps: [
      'Admin API rate limits for large catalog imports?',
      'Role-based views for regional merchandisers?',
      'Integrate with PIM as master catalog source?',
    ],
    architectNote:
      'Custom commerce admin is viable when API governance and approval workflows match Business Manager safety—never bypass staging discipline.',
  },
  {
    title: 'Expose headless Experience Cloud knowledge search to external support portals',
    difficulty: 'INTERMEDIATE',
    tags: ['experience-cloud', 'knowledge', 'search', 'api'],
    scenario:
      'Partner support portal needs federated search across Experience Cloud Knowledge and Service Cloud articles without exposing full CRM to partners.',
    answerPoints: [
      'Use Experience Cloud headless knowledge APIs or custom search REST with article visibility filters',
      'Enforce data category and audience scoping so partners see only entitled articles',
      'Return search results with snippets, ratings, and deep links to headless article renderer',
      'Implement search analytics feeding content gap analysis back to knowledge managers',
      'Cache popular search queries with TTL respecting article publish and archive events',
      'Rate limit search API preventing scraping of entire knowledge base',
      'Fallback messaging when search index lagging after major publish batch',
    ],
    followUps: [
      'Einstein search vs custom Solr-backed API?',
      'Multilingual search tokenization in headless context?',
      'Guest vs authenticated search result differences?',
    ],
    architectNote:
      'Headless knowledge search must replicate visibility rules of Experience Cloud—API exposure without audience filters causes partner data leaks.',
  },
  {
    title: 'Coordinate multi-channel Agentforce widgets across web, mobile, and Slack',
    difficulty: 'ARCHITECT',
    tags: ['agentforce', 'multi-channel', 'widgets', 'architecture'],
    scenario:
      'Customers start support in mobile app, continue on website, and internal ops monitor same threads in Slack alerting channel—inconsistent agent configs cause conflicting answers.',
    answerPoints: [
      'Single agent topic and action source of truth with channel-specific presentation adapters only',
      'Unified session identity using authenticated customer ID linking cross-channel conversations',
      'Channel capability matrix disabling unsupported actions per surface e.g. file upload on Slack vs mobile',
      'Consistent escalation paths routing to same Omni queues regardless of originating widget',
      'Central analytics dashboard segmenting containment by channel without duplicating agent logic',
      'Feature flag coordinated rollouts across web SDK, mobile SDK, and Slack integration',
      'Governance process preventing channel teams from forking prompt templates independently',
    ],
    followUps: [
      'Can one conversation thread span channels in customer view?',
      'How sync agent config deploy across SDK versions?',
      'Slack as customer channel vs internal ops alerting distinction?',
    ],
    architectNote:
      'Multi-channel Agentforce is one brain, many faces—forked configs per channel recreate omnichannel support chaos agents were meant to fix.',
  },
];
