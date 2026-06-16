import { buildQuestionBank, type TopicTemplate } from './generator';

const AGENTFORCE_BEGINNER: TopicTemplate[] = [
  {
    title: 'What is Agentforce and how is it different from a traditional chatbot?',
    difficulty: 'BEGINNER',
    tags: ['agentforce', 'basics', 'chatbot', 'ai'],
    scenario:
      'A hiring manager asks you to explain Agentforce during a junior consultant interview. They want to know how it differs from the old Einstein Bot their company tried years ago.',
    answerPoints: [
      'Agentforce is Salesforce\'s AI agent platform that uses LLMs to understand intent and take actions in Salesforce',
      'Unlike rule-based chatbots, agents can reason over context, use tools (Agent Actions), and ground answers in data',
      'Agents connect to CRM data, Knowledge, and Flows rather than following fixed decision trees only',
      'Topics and actions define what the agent can discuss and do, with guardrails for safety',
      'Human handoff to Service Cloud is built in when the agent cannot resolve the request',
    ],
    followUpDetails: [
      {
        question: 'Can Agentforce replace all human support agents?',
        answer:
          'No. Agentforce is best for repeatable, well-defined tasks like FAQs, status lookups, and simple case creation. Complex disputes, empathy-heavy situations, and regulated advice still need humans. Design for containment on tier-1 work, not full replacement.',
      },
      {
        question: 'What do you need before turning on an agent in production?',
        answer:
          'You need defined topics, tested Agent Actions, grounded knowledge sources, and guardrails. Run test conversations in a sandbox, verify handoff works, and train support staff on when the bot escalates. Skipping testing leads to bad customer experiences.',
      },
      {
        question: 'Where does the AI model run?',
        answer:
          'Salesforce hosts the LLM infrastructure within the Agentforce platform. You configure agents in Setup; you do not deploy your own model server. Data grounding and actions stay within your org\'s security and sharing rules.',
      },
    ],
    architectNote:
      'Start interviews by contrasting " scripted bot" vs "goal-driven agent with tools." That framing shows you understand the platform, not just the marketing name.',
  },
  {
    title: 'What is an Agent Topic and why does it matter?',
    difficulty: 'BEGINNER',
    tags: ['topics', 'classification', 'agentforce'],
    scenario:
      'Your team is scoping a service agent. The BA lists fifty things customers ask about. You need to explain how topics organize that work.',
    answerPoints: [
      'A topic is a category of customer intent the agent is trained to handle, like "Order Status" or "Returns"',
      'Each topic has instructions, example utterances, and linked actions the agent may use',
      'Topics help the LLM classify what the customer wants and stay within allowed behavior',
      'Poor topic design causes misrouting—too broad topics confuse the agent',
      'Topics should map to real support queues or business capabilities',
    ],
    followUpDetails: [
      {
        question: 'How many topics should a first agent have?',
        answer:
          'Start with 5–10 focused topics covering your highest-volume intents. Adding dozens at once makes testing and tuning hard. Expand after you measure containment and see gaps in conversation logs.',
      },
      {
        question: 'What happens if a question does not match any topic?',
        answer:
          'The agent should fall back to a general topic or escalate to a human. Configure a catch-all topic with clear instructions not to guess. Never let the agent invent answers outside defined topics.',
      },
      {
        question: 'Who typically owns topic content?',
        answer:
          'Product owners or support leads define intents and wording; admins or Agentforce specialists configure them in Setup. Knowledge managers supply articles linked to each topic.',
      },
    ],
    architectNote:
      'Treat topics like mini products—each needs an owner, success metric, and linked knowledge. Vague topics are the top beginner mistake.',
  },
  {
    title: 'What is an Agent Action?',
    difficulty: 'BEGINNER',
    tags: ['agent-actions', 'tools', 'flow', 'apex'],
    scenario:
      'A customer asks the agent to look up their order number. The interviewer wants to know what actually executes that lookup behind the scenes.',
    answerPoints: [
      'An Agent Action is a callable capability the LLM can invoke, like "Get Order Status"',
      'Actions expose clear inputs and outputs so the model knows when and how to use them',
      'Actions are often backed by Flow, Apex invocable methods, or standard Salesforce operations',
      'Each action should do one job—check status, create case, update field—not everything at once',
      'Descriptions matter: the LLM picks actions based on names and instructions',
    ],
    followUpDetails: [
      {
        question: 'Why not let the agent run SOQL directly?',
        answer:
          'Direct database access is unsafe and unpredictable. Actions enforce validation, permissions, and business rules. They are the controlled API surface between the LLM and your org.',
      },
      {
        question: 'What if an action fails?',
        answer:
          'Return a clear error message the agent can relay to the customer. Log the failure for admins. Configure the agent to apologize and offer handoff rather than retrying endlessly.',
      },
      {
        question: 'Can the same action be used by Flow and an agent?',
        answer:
          'Yes. Invocable Apex and autolaunched Flows can serve multiple channels. Build once with consistent inputs so agents and automations share logic.',
      },
    ],
    architectNote:
      'Name actions like API methods: verb + object. "Create Support Case" beats "CaseHelper." Good names improve tool selection accuracy.',
  },
  {
    title: 'What is grounding in Agentforce?',
    difficulty: 'BEGINNER',
    tags: ['grounding', 'knowledge', 'rag'],
    scenario:
      'Leadership worries the agent will make up return policies. You explain how grounding keeps answers tied to approved content.',
    answerPoints: [
      'Grounding connects the agent to trusted data sources like Knowledge articles or Data Cloud',
      'The model retrieves relevant content before answering instead of relying on memory alone',
      'This reduces hallucinations on policy, product, and process questions',
      'Sources must be kept current—stale articles produce wrong answers',
      'You can require citations or limit answers to retrieved content only',
    ],
    followUpDetails: [
      {
        question: 'Is grounding the same as training a custom model?',
        answer:
          'No. Grounding retrieves live content at question time. Custom model training is separate and heavier. Most service agents use retrieval over Knowledge or indexed documents.',
      },
      {
        question: 'What if no relevant article is found?',
        answer:
          'The agent should say it does not have that information and offer escalation. Do not allow free-form guessing on compliance or policy topics.',
      },
      {
        question: 'Who maintains grounded content?',
        answer:
          'Knowledge managers or content owners publish and review articles. Admins link sources in agent configuration. Set review dates on critical policies.',
      },
    ],
    architectNote:
      'Say "trust but verify"—grounding improves accuracy but garbage in still means garbage out. Fresh Knowledge is part of agent ops.',
  },
  {
    title: 'What are guardrails in an AI agent?',
    difficulty: 'BEGINNER',
    tags: ['guardrails', 'safety', 'compliance'],
    scenario:
      'Legal asks what stops the agent from discussing competitor products or sharing internal pricing. You explain guardrails at a high level.',
    answerPoints: [
      'Guardrails are rules and filters that limit what the agent can say and do',
      'Topic boundaries restrict which subjects the agent handles',
      'Instructions tell the agent what to refuse, disclaim, or escalate',
      'Action allowlists prevent unauthorized operations like deleting records',
      'Output checks can block prohibited phrases or sensitive data patterns',
    ],
    followUpDetails: [
      {
        question: 'Are guardrails only written in the system prompt?',
        answer:
          'No. Effective guardrails combine instructions, topic design, action permissions, and human escalation. Prompt text alone is easy to bypass with clever user input.',
      },
      {
        question: 'How do you test guardrails?',
        answer:
          'Run adversarial test prompts in sandbox—requests for discounts, PII from other customers, jailbreak attempts. Fix gaps before go-live and retest after each major change.',
      },
      {
        question: 'Who approves guardrail rules for regulated industries?',
        answer:
          'Compliance, legal, and business stakeholders should sign off on blocked topics and required disclaimers. Document decisions for audit.',
      },
    ],
    architectNote:
      'Junior answer: guardrails = seatbelts for the LLM. Mention defense in depth, not just "we added a disclaimer."',
  },
  {
    title: 'How does human handoff work from Agentforce to a live agent?',
    difficulty: 'BEGINNER',
    tags: ['handoff', 'service-cloud', 'omni-channel'],
    scenario:
      'Customers complain about repeating themselves after the bot transfers them. The interviewer asks how handoff should work.',
    answerPoints: [
      'When the agent cannot resolve or confidence is low, it escalates to Service Cloud routing',
      'Conversation transcript and summary should pass to the MessagingSession or Case',
      'Omni-Channel assigns the session to an available human agent',
      'The human sees context so the customer does not start over',
      'Configure clear triggers: low confidence, explicit "talk to a person," sensitive topics',
    ],
    followUpDetails: [
      {
        question: 'What should be in the handoff summary?',
        answer:
          'Include customer intent, key facts collected (order ID, issue type), actions already tried, and sentiment if available. Skip unnecessary chat filler.',
      },
      {
        question: 'Can handoff happen outside business hours?',
        answer:
          'Yes, but route to a queue with a message setting expectations—callback, email case, or after-hours bot flow. Do not transfer to an empty queue silently.',
      },
      {
        question: 'Should the bot stay in the thread after handoff?',
        answer:
          'Usually the human takes over and the bot stops responding. Configure the channel so customers know a person joined.',
      },
    ],
    architectNote:
      'Handoff UX wins or loses bot projects. Mention summary + routing in every beginner answer.',
  },
  {
    title: 'What is the Einstein Trust Layer in simple terms?',
    difficulty: 'BEGINNER',
    tags: ['trust-layer', 'security', 'einstein'],
    scenario:
      'Security team asks how customer data is protected when prompts go to an LLM. You give a plain-language overview.',
    answerPoints: [
      'The Trust Layer is Salesforce\'s framework for securing AI requests and responses',
      'It helps mask or exclude sensitive fields before data reaches the model',
      'Responses can be scanned for toxic or policy-violating content',
      'Audit trails support compliance reviews of AI interactions',
      'It works within Salesforce\'s existing org security and sharing model',
    ],
    followUpDetails: [
      {
        question: 'Does the Trust Layer replace field-level security?',
        answer:
          'No. FLS, sharing rules, and CRUD still apply. The Trust Layer adds AI-specific protections like masking and toxicity detection on top of standard Salesforce security.',
      },
      {
        question: 'Can admins see what was sent to the model?',
        answer:
          'Salesforce provides logging and monitoring capabilities for AI usage depending on product and setup. Work with your admin on retention and access policies.',
      },
      {
        question: 'Should you send credit card numbers in prompts?',
        answer:
          'Never intentionally. Design actions that look up records by ID after verification instead of pasting full PANs into chat. Use masking where possible.',
      },
    ],
    architectNote:
      'You do not need to recite every Trust Layer feature—connect it to "data masking + policy + audit" for credibility.',
  },
  {
    title: 'What channels can Agentforce support?',
    difficulty: 'BEGINNER',
    tags: ['channels', 'messaging', 'email', 'web'],
    scenario:
      'Marketing wants the same agent on the website, mobile app, and SMS. You explain channel basics.',
    answerPoints: [
      'Agentforce integrates with Service Cloud digital engagement channels',
      'Common channels include web chat, in-app messaging, SMS, and email depending on licenses',
      'Each channel may need separate routing and branding configuration',
      'The same agent topics can serve multiple channels with consistent logic',
      'Test each channel separately—UX and character limits differ',
    ],
    followUpDetails: [
      {
        question: 'Is voice the same as chat configuration?',
        answer:
          'Voice often uses related Service Cloud voice products with different latency and prompt constraints. Do not assume chat settings copy one-to-one to voice.',
      },
      {
        question: 'Can one agent serve sales and service?',
        answer:
          'Possible but risky for beginners. Separate agents or clear topic splits avoid mixed intents and wrong actions. Start with one primary use case.',
      },
      {
        question: 'What limits message length on SMS?',
        answer:
          'SMS has character limits and cost per segment. Keep agent replies concise on SMS or summarize with links to web for detail.',
      },
    ],
    architectNote:
      'Channel parity is a myth early on—pick one channel, prove value, then expand.',
  },
  {
    title: 'What is prompt engineering in the context of Agentforce?',
    difficulty: 'BEGINNER',
    tags: ['prompt-engineering', 'instructions'],
    scenario:
      'A teammate asks why their agent sounds too casual. You explain how instructions shape tone and behavior.',
    answerPoints: [
      'Prompt engineering is writing clear system and topic instructions that guide the LLM',
      'Instructions define tone, role, boundaries, and how to use actions',
      'Good prompts are specific: "Use formal tone" beats "be professional sometimes"',
      'Include examples of ideal responses for tricky scenarios',
      'Iterate using real conversation logs—not guesswork',
    ],
    followUpDetails: [
      {
        question: 'Should prompts be pages long?',
        answer:
          'No. Long prompts dilute focus and cost tokens. Use structured sections: role, rules, escalation, examples. Put detail in topics and Knowledge where possible.',
      },
      {
        question: 'How do you fix an agent that keeps apologizing too much?',
        answer:
          'Add instruction: apologize once, then solve or escalate. Review logs for root cause—often missing actions or weak grounding cause repeated apologies.',
      },
      {
        question: 'Can business users edit prompts safely?',
        answer:
          'They can suggest wording, but changes should go through sandbox testing. Treat prompt edits like code releases for customer-facing agents.',
      },
    ],
    architectNote:
      'Show you tune behavior with instructions + data + actions—a three-legged stool, not magic words.',
  },
  {
    title: 'What metrics measure Agentforce success?',
    difficulty: 'BEGINNER',
    tags: ['metrics', 'containment', 'csat'],
    scenario:
      'After launch, leadership asks if the bot is working. You name basic KPIs a junior should track.',
    answerPoints: [
      'Containment rate: percent of conversations resolved without human agent',
      'Escalation rate and reasons—shows where topics or actions fail',
      'Average handle time for bot vs human sessions',
      'Customer satisfaction (CSAT) or thumbs up/down on bot replies',
      'Top unanswered intents from conversation analytics',
    ],
    followUpDetails: [
      {
        question: 'Is high containment always good?',
        answer:
          'Not if customers get wrong answers. Pair containment with quality metrics and spot-check transcripts. Bad containment hides problems until CSAT drops.',
      },
      {
        question: 'How often should you review metrics?',
        answer:
          'Weekly for the first month, then biweekly or monthly steady state. Spike reviews after marketing campaigns or product launches.',
      },
      {
        question: 'What do you do with top failure intents?',
        answer:
          'Add Knowledge, new actions, or topic refinements. If intent needs human judgment, improve handoff instead of forcing bot containment.',
      },
    ],
    architectNote:
      'Always mention quality plus volume—interviewers love hearing you will not optimize the wrong number.',
  },
  {
    title: 'What is the difference between Agentforce and Einstein Copilot?',
    difficulty: 'BEGINNER',
    tags: ['copilot', 'agentforce', 'comparison'],
    scenario:
      'A client confuses the employee-facing Copilot on the Salesforce UI with the customer-facing service agent. You clarify.',
    answerPoints: [
      'Einstein Copilot assists Salesforce users inside the CRM with tasks like summarizing records',
      'Agentforce agents typically serve customers or external users on channels like chat',
      'Copilot uses user permissions; customer agents use configured topics and actions',
      'Both use LLMs but differ in audience, channel, and configuration model',
      'Projects may use both—internal productivity and external service',
    ],
    followUpDetails: [
      {
        question: 'Can Copilot actions be the same as Agent Actions?',
        answer:
          'Conceptually similar—both invoke Salesforce capabilities—but configuration surfaces differ. Reuse invocable Apex or Flows behind both when possible.',
      },
      {
        question: 'Which should a small team implement first?',
        answer:
          'Depends on pain point. Internal Copilot helps rep productivity; Agentforce targets deflection and 24/7 support. Pick one use case with clear ROI.',
      },
      {
        question: 'Do they share the same Trust Layer concepts?',
        answer:
          'Yes, both operate within Salesforce AI security frameworks, but data exposure differs—internal user context vs customer-facing grounding.',
      },
    ],
    architectNote:
      'Audience first: employee vs customer. That one line clears most confusion.',
  },
  {
    title: 'What sandbox steps should you take before deploying an agent?',
    difficulty: 'BEGINNER',
    tags: ['sandbox', 'testing', 'deployment'],
    scenario:
      'You are asked how you would test a new returns topic before production go-live.',
    answerPoints: [
      'Build and configure the agent in a full sandbox mirroring production data shape',
      'Test happy paths and edge cases for each topic and action',
      'Verify grounding returns correct articles and handoff reaches the right queue',
      'Run security tests—users should not access others\' records via the bot',
      'Document test scripts and get business sign-off before promote',
    ],
    followUpDetails: [
      {
        question: 'Can you test with production Knowledge?',
        answer:
          'Prefer sandbox copies or controlled subsets. If referencing prod content, understand refresh impact and avoid testing write actions against live data.',
      },
      {
        question: 'Who should participate in UAT?',
        answer:
          'Support team leads and agents who will receive handoffs. They catch unrealistic bot language and missing escalations developers miss.',
      },
      {
        question: 'What is a minimum go-live checklist item often forgotten?',
        answer:
          'Monitoring and rollback plan—who disables the agent if CSAT crashes, and how fast. Also confirm hours of operation messaging.',
      },
    ],
    architectNote:
      'Testing is not "I asked it three questions." Mention scripts, security, and handoff every time.',
  },
];

const DATA_CLOUD_BEGINNER: TopicTemplate[] = [
  {
    title: 'What is Salesforce Data Cloud in simple terms?',
    difficulty: 'BEGINNER',
    tags: ['data-cloud', 'basics', 'cdp'],
    scenario:
      'A stakeholder asks why they need Data Cloud when they already have Salesforce CRM and a data warehouse.',
    answerPoints: [
      'Data Cloud unifies customer data from many sources into profiles Salesforce apps can use',
      'It ingests batch and streaming data from CRM, marketing, web, and external systems',
      'Unified profiles power segmentation, personalization, analytics, and activation',
      'It sits between raw data lakes and action channels like Marketing Cloud or Sales Cloud',
      'Identity resolution links records that belong to the same person or account',
    ],
    followUpDetails: [
      {
        question: 'Is Data Cloud a replacement for your data warehouse?',
        answer:
          'Usually no. Warehouses store historical analytics at scale; Data Cloud focuses on real-time customer profiles and activation in Salesforce. Many teams use both with defined roles.',
      },
      {
        question: 'Who are typical users of Data Cloud?',
        answer:
          'Marketing ops, data engineers, and architects configure ingestion and segments. Sales and service consume unified profiles through CRM and embedded insights.',
      },
      {
        question: 'What is a data stream?',
        answer:
          'A data stream is a configured pipeline that brings data from a source into Data Cloud on a schedule or continuously. It maps source fields to Data Cloud data model objects.',
      },
    ],
    architectNote:
      'Lead with "unified customer profile for action"—not "another database." That lands with business audiences.',
  },
  {
    title: 'What is identity resolution in Data Cloud?',
    difficulty: 'BEGINNER',
    tags: ['identity-resolution', 'profiles'],
    scenario:
      'The same customer appears as three records—web guest, email subscriber, CRM contact. You explain how Data Cloud connects them.',
    answerPoints: [
      'Identity resolution matches records that likely belong to the same individual or household',
      'Rules use keys like email, phone, loyalty ID, or custom identifiers',
      'Matched records roll up into a unified individual or account profile',
      'Probabilistic and deterministic matching can be configured based on trust in the key',
      'Good matching reduces duplicate outreach and improves personalization accuracy',
    ],
    followUpDetails: [
      {
        question: 'What happens if matching rules are too loose?',
        answer:
          'Profiles merge incorrectly—two different people become one. That causes wrong offers and compliance risk. Start strict with verified keys, then expand carefully.',
      },
      {
        question: 'Can users manually fix a wrong merge?',
        answer:
          'Data Cloud provides governance tools to review and adjust identity rules. Process and ownership matter—define who fixes bad matches before campaigns go out.',
      },
      {
        question: 'Is email always a good match key?',
        answer:
          'Shared family emails and typos cause false positives. Combine email with other keys where possible and monitor match rates.',
      },
    ],
    architectNote:
      'Identity is the heart of Data Cloud interviews—explain keys, false positives, and governance in plain language.',
  },
  {
    title: 'What is a Data Cloud data model object (DMO)?',
    difficulty: 'BEGINNER',
    tags: ['dmo', 'data-model'],
    scenario:
      'An ingest file has columns that do not match Contact fields. You introduce DMOs as the staging layer.',
    answerPoints: [
      'DMOs are Data Cloud\'s standard schema for storing ingested data like Individual, Contact Point Email, Product Order',
      'Source data maps to DMO fields during ingestion—not directly to Sales Cloud objects',
      'DMOs enable consistent modeling across many sources before unification',
      'Relationships between DMOs mirror customer, account, and engagement concepts',
      'Understanding DMOs is required before building segments or activations',
    ],
    followUpDetails: [
      {
        question: 'How is a DMO different from a Salesforce custom object?',
        answer:
          'DMOs live in Data Cloud\'s lakehouse model for analytics and unification. CRM custom objects serve operational apps. Data often flows CRM → Data Cloud DMOs, not the reverse by default.',
      },
      {
        question: 'What is a data mapping?',
        answer:
          'A mapping connects source file or connector fields to DMO fields. Bad mappings cause empty profiles and failed segments.',
      },
      {
        question: 'Do you create DMOs from scratch as a beginner?',
        answer:
          'Usually you use standard DMOs and map to them. Custom DMOs are advanced. Learn the standard Individual and engagement objects first.',
      },
    ],
    architectNote:
      'Draw the path: Source → DMO → Unified Profile → Activation. That sequence answers half of Data Cloud basics.',
  },
  {
    title: 'What is segmentation in Data Cloud?',
    difficulty: 'BEGINNER',
    tags: ['segmentation', 'marketing'],
    scenario:
      'Marketing wants "customers who bought in 90 days but have not opened email." You explain how segments work.',
    answerPoints: [
      'A segment is a defined audience built from unified profile and engagement data',
      'Filters use attributes, behaviors, and calculated insights on DMOs',
      'Segments refresh on a schedule or near real time depending on configuration',
      'Activated segments push audiences to Marketing Cloud, ads, or Sales Cloud',
      'Segment design should start from campaign goal, not from available fields',
    ],
    followUpDetails: [
      {
        question: 'Why might segment counts differ from a CRM report?',
        answer:
          'CRM reports use operational data; segments use unified profiles and may include non-CRM sources. Identity resolution also changes counts versus raw Contact totals.',
      },
      {
        question: 'What is a calculated insight?',
        answer:
          'A rollup metric on a profile—total lifetime value, last purchase date, engagement score—used as segment criteria. It precomputes values for faster filtering.',
      },
      {
        question: 'How do you avoid empty segments?',
        answer:
          'Validate data ingestion and mappings first. Preview counts in sandbox and test with a small activation before full campaign send.',
      },
    ],
    architectNote:
      'Segments fail when data is wrong, not when the filter UI is wrong—always tie segments to data quality.',
  },
  {
    title: 'What is activation in Data Cloud?',
    difficulty: 'BEGINNER',
    tags: ['activation', 'marketing-cloud'],
    scenario:
      'After building a segment, the marketer asks how it reaches Journey Builder. You explain activation.',
    answerPoints: [
      'Activation sends a segment audience to a target like Marketing Cloud, ad platform, or CRM',
      'You map segment fields to the target\'s required attributes during activation setup',
      'Activations run on a schedule; membership updates as profiles change',
      'Consent and privacy flags should flow with activated data',
      'Each activation target has connectors and limits to understand',
    ],
    followUpDetails: [
      {
        question: 'Can you activate to Sales Cloud?',
        answer:
          'Yes, depending on setup—you can enrich CRM records or drive sales plays from segment membership. Confirm licensing and connector configuration.',
      },
      {
        question: 'What if activation fails?',
        answer:
          'Check connector auth, field mapping mismatches, and segment size limits. Review activation job logs in Data Cloud monitoring.',
      },
      {
        question: 'Does activation copy all profile data?',
        answer:
          'Only mapped fields go to the target. Map minimum necessary data for the campaign to reduce privacy exposure.',
      },
    ],
    architectNote:
      'Activation is where Data Cloud proves ROI—mention consent and field mapping, not just "send to Marketing Cloud."',
  },
  {
    title: 'What is the difference between batch and streaming ingestion?',
    difficulty: 'BEGINNER',
    tags: ['ingestion', 'batch', 'streaming'],
    scenario:
      'Web events need near-real-time personalization but billing files arrive nightly. You compare ingestion modes.',
    answerPoints: [
      'Batch ingestion loads files or scheduled extracts on intervals—hourly, daily',
      'Streaming ingestion processes events continuously with low latency',
      'Batch suits large historical loads and warehouse exports',
      'Streaming suits web behavior, mobile events, and timely triggers',
      'Choose mode based on freshness needs and source capabilities',
    ],
    followUpDetails: [
      {
        question: 'Can the same source use both?',
        answer:
          'Sometimes—historical backfill via batch and ongoing updates via stream. Avoid duplicate logic with clear primary keys.',
      },
      {
        question: 'What breaks streaming pipelines?',
        answer:
          'Schema changes without updating mappings, auth expiry on connectors, and spikes that exceed throughput. Monitor error queues.',
      },
      {
        question: 'Is streaming always better?',
        answer:
          'No. It costs more to operate and is harder to debug. Use streaming only when business needs minutes-not-hours freshness.',
      },
    ],
    architectNote:
      'Freshness vs cost is the tradeoff interviewers want—young consultants often over-index on real-time.',
  },
  {
    title: 'What is consent and privacy management in Data Cloud?',
    difficulty: 'BEGINNER',
    tags: ['consent', 'privacy', 'gdpr'],
    scenario:
      'Legal requires honoring marketing opt-outs across all channels. You explain how consent fits Data Cloud.',
    answerPoints: [
      'Consent preferences capture what communications a person allows on which channels',
      'Data Cloud can store and propagate consent as part of unified profiles',
      'Segments and activations should filter on consent before outreach',
      'Privacy requests like deletion must flow through governed processes',
      'Document which system is source of truth for consent',
    ],
    followUpDetails: [
      {
        question: 'What if CRM and marketing disagree on opt-in status?',
        answer:
          'Define a golden source—often preference center or legal record—and reconcile rules on ingest. Never pick the most permissive value by default.',
      },
      {
        question: 'Can you market to a segment without checking consent?',
        answer:
          'You should not. Build consent into segment criteria and activation mappings. Auditors will ask for proof.',
      },
      {
        question: 'What is a Communication Subscription?',
        answer:
          'A Salesforce model for channel-specific opt-in categories. Map them during ingestion so segments respect granular preferences.',
      },
    ],
    architectNote:
      'One sentence on consent in every activation answer shows maturity—even at beginner level.',
  },
  {
    title: 'What is a calculated insight vs a standard attribute?',
    difficulty: 'BEGINNER',
    tags: ['calculated-insights', 'metrics'],
    scenario:
      'A PM wants "total orders last 30 days" on every profile for targeting. You explain calculated insights.',
    answerPoints: [
      'Standard attributes come directly from mapped source fields like city or email',
      'Calculated insights aggregate or compute values across related records',
      'Examples: order count, average order value, days since last login',
      'They refresh on a defined schedule for use in segments and personalization',
      'Define business-owned definitions so metrics match reporting elsewhere',
    ],
    followUpDetails: [
      {
        question: 'Why not calculate in the segment filter only?',
        answer:
          'Repeated complex aggregations in every segment are slow and inconsistent. Calculated insights centralize logic once.',
      },
      {
        question: 'What if the insight number looks wrong?',
        answer:
          'Trace source data, join keys, and time window in the insight definition. Compare to a trusted report with same date logic.',
      },
      {
        question: 'Who owns insight definitions?',
        answer:
          'Analytics or marketing ops with architect review. Treat them like shared KPI definitions, not one-off admin tweaks.',
      },
    ],
    architectNote:
      'CI = reusable metric on the profile. That shorthand helps in fast interviews.',
  },
  {
    title: 'How does Data Cloud relate to Sales Cloud and Service Cloud?',
    difficulty: 'BEGINNER',
    tags: ['crm', 'integration'],
    scenario:
      'Sales reps ask why they should care about Data Cloud if they live in Opportunity records daily.',
    answerPoints: [
      'CRM remains system of record for sales and service transactions',
      'Data Cloud ingests CRM data plus external signals for a fuller customer view',
      'Unified profiles can enrich CRM with scores, segments, or engagement history',
      'Agents and Einstein features may consume Data Cloud insights for better recommendations',
      'Operational workflows still happen in CRM; Data Cloud powers intelligence and activation',
    ],
    followUpDetails: [
      {
        question: 'Do reps log into Data Cloud daily?',
        answer:
          'Usually no. They see embedded insights in CRM or receive leads from activated segments. Data Cloud is often a back-office platform for ops and architects.',
      },
      {
        question: 'Does Data Cloud write back to CRM automatically?',
        answer:
          'Selected insights and activations can update CRM fields when configured. Not all DMO data syncs bidirectionally—design explicit write paths.',
      },
      {
        question: 'What is CRM Connector?',
        answer:
          'A standard way to bring Salesforce CRM objects into Data Cloud. It is often the first ingestion path in Salesforce-centric projects.',
      },
    ],
    architectNote:
      'CRM = transactions, Data Cloud = unified intelligence. Never pit them as competitors.',
  },
  {
    title: 'What is data governance in a Data Cloud project?',
    difficulty: 'BEGINNER',
    tags: ['governance', 'quality'],
    scenario:
      'Multiple teams upload CSV files with conflicting customer IDs. You introduce basic governance.',
    answerPoints: [
      'Governance defines who can ingest data, naming standards, and quality rules',
      'Data spaces or org strategies separate brands or regions when needed',
      'Lineage tracks which source fed which profile field for troubleshooting',
      'Quality monitoring catches null keys, format errors, and volume drops',
      'Without governance, segments and AI outputs inherit garbage data',
    ],
    followUpDetails: [
      {
        question: 'Who approves a new data source?',
        answer:
          'A data council or architect with legal for PII sources. Document approved fields and retention before turning on ingestion.',
      },
      {
        question: 'What is a common beginner governance mistake?',
        answer:
          'Letting every team upload ad hoc files without keys or consent fields. Centralize ingest patterns early.',
      },
      {
        question: 'How do you document mappings?',
        answer:
          'Maintain a data dictionary: source field, DMO target, transformation, owner. Update on every schema change.',
      },
    ],
    architectNote:
      'Governance sounds boring—frame it as "trust in segments and AI." Interviewers notice.',
  },
  {
    title: 'What troubleshooting steps apply when profiles look empty?',
    difficulty: 'BEGINNER',
    tags: ['troubleshooting', 'profiles'],
    scenario:
      'After go-live, unified profiles show names but no purchase history. You walk through first checks.',
    answerPoints: [
      'Verify the purchase data stream ran successfully and row counts look right',
      'Check field mappings from source to Order or Product Order DMOs',
      'Confirm identity resolution links orders to the same individual key as CRM',
      'Review calculated insights dependent on order data—they may not have run yet',
      'Inspect error logs and quarantined records in the ingestion job',
    ],
    followUpDetails: [
      {
        question: 'Could timing cause missing data?',
        answer:
          'Yes. Batch jobs may not have completed before you checked. Streaming lag can delay events by minutes. Compare job timestamps to your test.',
      },
      {
        question: 'What if only some customers are affected?',
        answer:
          'Often bad keys on those records—missing email or mismatched ID. Sample failing records in source vs DMO.',
      },
      {
        question: 'When do you escalate to Salesforce Support?',
        answer:
          'After you verify mappings, keys, and job success in sandbox reproduction. Bring job IDs and example record keys to speed resolution.',
      },
    ],
    architectNote:
      'Troubleshooting answer order: ingest → map → identity → insight. Memorize that chain.',
  },
  {
    title: 'What licenses or skills should a beginner know about for Data Cloud?',
    difficulty: 'BEGINNER',
    tags: ['licensing', 'skills'],
    scenario:
      'You join a project and need to know what to study first for a Data Cloud junior role.',
    answerPoints: [
      'Understand core concepts: ingestion, DMOs, identity, segments, activation',
      'Learn CRM connector setup and basic SQL-like thinking for filters',
      'Know privacy basics—consent, retention, and minimum necessary data',
      'Licensing varies by edition and SKUs—confirm with account executive, do not guess in production',
      'Trailhead modules on Data Cloud fundamentals are the usual starting path',
    ],
    followUpDetails: [
      {
        question: 'Do you need to be a SQL expert?',
        answer:
          'Helpful but not day one. Segment UI covers much filtering. SQL mindset helps for insights and troubleshooting joins.',
      },
      {
        question: 'Is Data Cloud Admin certification required?',
        answer:
          'Not always for junior roles but it signals baseline knowledge. Hands-on sandbox experience matters more in interviews.',
      },
      {
        question: 'What adjacent Salesforce products should you know?',
        answer:
          'Marketing Cloud for activation, Service Cloud for case context, and Agentforce/Einstein for AI use cases consuming profiles.',
      },
    ],
    architectNote:
      'Honest licensing answer: "confirm with AE" beats inventing SKU names—young hires get credit for that.',
  },
];

const HEADLESS_360_BEGINNER: TopicTemplate[] = [
  {
    title: 'What does headless Salesforce mean?',
    difficulty: 'BEGINNER',
    tags: ['headless', 'api', 'basics'],
    scenario:
      'A frontend team builds a React storefront and asks why they need Salesforce if they are not using the standard UI.',
    answerPoints: [
      'Headless means using Salesforce backend capabilities through APIs without the standard Lightning UI',
      'Business logic, customer data, and commerce catalog live in Salesforce or related clouds',
      'Custom websites, mobile apps, or kiosks consume REST, GraphQL, or B2B Commerce APIs',
      'Salesforce remains system of record while your team owns the experience layer',
      'Headless fits brands that need custom UX but want CRM and order data centralized',
    ],
    followUpDetails: [
      {
        question: 'Is headless only for Commerce Cloud?',
        answer:
          'Commerce is a common use case, but headless patterns also apply to Experience Cloud sites, custom portals, and Agentforce API channels. Any API-first integration is headless in spirit.',
      },
      {
        question: 'What do you lose without the standard UI?',
        answer:
          'Out-of-the-box admin screens and some declarative features must be rebuilt or embedded. You gain UX control but own more frontend and integration work.',
      },
      {
        question: 'Who builds the frontend in headless projects?',
        answer:
          'Customer dev teams or SI partners using modern JS frameworks. Salesforce consultants configure APIs, data models, and integrations on the backend.',
      },
    ],
    architectNote:
      'Headless = Salesforce brain, your face. That metaphor sticks in junior interviews.',
  },
  {
    title: 'What is the B2C Commerce API used for?',
    difficulty: 'BEGINNER',
    tags: ['commerce-api', 'b2c'],
    scenario:
      'Shoppers browse products on a custom site. You explain which Salesforce API powers product and cart data.',
    answerPoints: [
      'B2C Commerce APIs expose catalog, basket, checkout, and customer operations to external apps',
      'Shopper-facing sites call these APIs instead of Salesforce storefront templates',
      'APIs handle sessions, pricing, promotions, and inventory from the commerce backend',
      'Authentication ties shoppers to registered profiles when logged in',
      'Rate limits and API versions must be tracked like any Salesforce integration',
    ],
    followUpDetails: [
      {
        question: 'How is this different from calling Apex REST from a store?',
        answer:
          'Commerce APIs are purpose-built for storefront flows with optimized endpoints. Custom Apex REST is flexible but you rebuild commerce patterns yourself.',
      },
      {
        question: 'Where is cart data stored?',
        answer:
          'In the B2C Commerce instance during the session, then orders sync to OMS or CRM depending on architecture. Know your project\'s order flow.',
      },
      {
        question: 'Do you need a separate sandbox for commerce API dev?',
        answer:
          'Yes, use B2C Commerce sandboxes aligned with CRM sandboxes for end-to-end testing. Never point dev frontends at production APIs.',
      },
    ],
    architectNote:
      'Know the happy path: browse → basket → checkout → order. APIs map to that story.',
  },
  {
    title: 'What is Experience Cloud in a headless context?',
    difficulty: 'BEGINNER',
    tags: ['experience-cloud', 'portal'],
    scenario:
      'A partner portal uses a custom Angular app but still needs Salesforce authentication and case data.',
    answerPoints: [
      'Experience Cloud provides external user access, sharing, and branding for portals',
      'Headless setups may use Experience Cloud auth while rendering UI elsewhere',
      'APIs and connected apps let external apps act as authenticated community users',
      'License types differ for Customer Community vs Partner Community users',
      'Sharing sets and profiles still govern what external users see',
    ],
    followUpDetails: [
      {
        question: 'Can you skip Experience Cloud entirely?',
        answer:
          'Sometimes with OAuth and API-only users, but you still need a model for external identity and sharing. Experience Cloud simplifies that for many B2B portals.',
      },
      {
        question: 'What is a connected app?',
        answer:
          'OAuth configuration allowing external apps to authenticate Salesforce users securely with scoped permissions.',
      },
      {
        question: 'How do external users see only their accounts?',
        answer:
          'Sharing rules, account teams, and community profiles restrict records. Test with a low-privilege test user, not admin.',
      },
    ],
    architectNote:
      'Headless does not mean headless security—always mention sharing and external profiles.',
  },
  {
    title: 'What is OAuth and why does headless need it?',
    difficulty: 'BEGINNER',
    tags: ['oauth', 'security', 'authentication'],
    scenario:
      'Your mobile app must log users in without storing Salesforce passwords. You explain OAuth at a basic level.',
    answerPoints: [
      'OAuth lets users authorize an app to access Salesforce without sharing passwords',
      'Connected apps define client ID, secret, callback URLs, and scopes',
      'Flows like authorization code with PKCE are standard for mobile and SPAs',
      'Access tokens expire; refresh tokens extend sessions per policy',
      'Never embed long-lived admin tokens in client-side code',
    ],
    followUpDetails: [
      {
        question: 'What is PKCE?',
        answer:
          'Proof Key for Code Exchange adds security for public clients that cannot hide a secret, like mobile apps. Use it instead of legacy implicit flows.',
      },
      {
        question: 'Where should the client secret live?',
        answer:
          'Only on a server-side middleware layer, never in browser or mobile bundles. Public clients use PKCE without a secret.',
      },
      {
        question: 'What happens when a token expires mid-checkout?',
        answer:
          'Refresh silently if possible or prompt re-login. Design UX for session expiry before production peak traffic.',
      },
    ],
    architectNote:
      'Junior red flag: hardcoded credentials. Say PKCE + middleware in every auth answer.',
  },
  {
    title: 'What is an API gateway or middleware in headless architecture?',
    difficulty: 'BEGINNER',
    tags: ['middleware', 'api-gateway'],
    scenario:
      'The React site should not call ten different Salesforce endpoints directly from the browser. You introduce middleware.',
    answerPoints: [
      'Middleware sits between frontend and Salesforce to aggregate, transform, and secure calls',
      'It hides secrets, applies caching, and simplifies APIs for the UI team',
      'Common choices: MuleSoft, Heroku, AWS Lambda, or Node services',
      'Centralized logging and rate limiting live in middleware',
      'Reduces CORS complexity and exposes a stable contract to frontend developers',
    ],
    followUpDetails: [
      {
        question: 'Can the frontend call Salesforce directly?',
        answer:
          'Possible for some public catalog reads with guest tokens, but authenticated flows usually need a backend to protect secrets and enforce rules.',
      },
      {
        question: 'What is CORS?',
        answer:
          'Cross-Origin Resource Sharing controls which web domains may call an API from the browser. Misconfigured CORS breaks headless sites.',
      },
      {
        question: 'Does middleware replace Salesforce?',
        answer:
          'No. It orchestrates calls; Salesforce remains data and commerce source. Avoid duplicating business logic in two places without governance.',
      },
    ],
    architectNote:
      'Draw three boxes: UI → middleware → Salesforce. Most headless diagrams start there.',
  },
  {
    title: 'What is MCP in the Salesforce headless context?',
    difficulty: 'BEGINNER',
    tags: ['mcp', 'agentforce', 'api'],
    scenario:
      'Leadership mentions MCP for connecting AI assistants to Salesforce data. You give a beginner explanation.',
    answerPoints: [
      'MCP (Model Context Protocol) is a standard way for AI tools to connect to external systems safely',
      'Salesforce exposes MCP-related capabilities so agents and assistants can query and act on org data',
      'It fits headless patterns where UX is not Salesforce UI but intelligence still needs CRM context',
      'Authentication and scoped permissions remain critical—AI does not bypass security',
      'Think of MCP as a structured bridge between LLM tools and Salesforce APIs',
    ],
    followUpDetails: [
      {
        question: 'Is MCP the same as a REST API?',
        answer:
          'REST is a general HTTP API style. MCP defines how AI clients discover and invoke tools consistently. Salesforce may expose capabilities via both patterns for different clients.',
      },
      {
        question: 'Should every integration use MCP?',
        answer:
          'No. Traditional apps still use REST and GraphQL. MCP targets AI agent and assistant scenarios needing tool-style interfaces.',
      },
      {
        question: 'What security worry comes with AI + MCP?',
        answer:
          'Over-permissioned tools let models read or change data they should not. Apply least privilege and audit tool usage.',
      },
    ],
    architectNote:
      'If unsure on details, anchor on "AI tool protocol + governed Salesforce access"—accurate enough for beginner tier.',
  },
  {
    title: 'What is a composable storefront?',
    difficulty: 'BEGINNER',
    tags: ['composable', 'commerce'],
    scenario:
      'Marketing wants best-of-breed CMS, search, and checkout. You explain composable commerce simply.',
    answerPoints: [
      'Composable means assembling specialized services—CMS, search, payments—via APIs around a commerce core',
      'Salesforce often provides cart, catalog, pricing, and customer profile pieces',
      'Teams swap vendors for search or content without rebuilding the entire store',
      'Integration complexity moves to API contracts and middleware',
      'Works well for brands with strong in-house frontend teams',
    ],
    followUpDetails: [
      {
        question: 'How is composable different from monolithic SFCC storefront?',
        answer:
          'Monolithic uses Salesforce templates end-to-end. Composable picks custom UI and plugs in SFCC APIs for commerce functions only.',
      },
      {
        question: 'What is the main risk?',
        answer:
          'Many moving parts—version drift, latency chains, and unclear ownership when checkout fails between vendors.',
      },
      {
        question: 'When is composable a bad fit?',
        answer:
          'Small teams with tight timelines may prefer standard storefronts. Composable pays off at scale and unique UX needs.',
      },
    ],
    architectNote:
      'Composable = flexibility tax. Say who owns the glue layer—that impresses interviewers.',
  },
  {
    title: 'How do headless integrations sync orders to CRM?',
    difficulty: 'BEGINNER',
    tags: ['order-sync', 'crm'],
    scenario:
      'After online checkout, sales reps need the Order in Sales Cloud. You outline a simple sync pattern.',
    answerPoints: [
      'Order confirmation events trigger integration—API call, platform event, or middleware flow',
      'Map commerce order fields to Salesforce Order or custom objects',
      'Include customer key for matching Contact or Account records',
      'Handle failures with retry queues and alerting—do not lose paid orders silently',
      'Idempotency prevents duplicate CRM orders on webhook retries',
    ],
    followUpDetails: [
      {
        question: 'Real-time or batch sync?',
        answer:
          'Real-time for service and sales visibility; batch acceptable for analytics-only downstream systems. Align with SLA expectations.',
      },
      {
        question: 'What if CRM Account does not exist yet?',
        answer:
          'Create guest checkout flow rules: create Person Account or match by email before inserting Order. Define in integration spec.',
      },
      {
        question: 'What is idempotency?',
        answer:
          'Same checkout ID processed twice yields one CRM order. Use external IDs or duplicate checks on replay.',
      },
    ],
    architectNote:
      'Order sync interviews always want idempotency + error handling—mention both unprompted.',
  },
  {
    title: 'What is GraphQL vs REST for Salesforce headless apps?',
    difficulty: 'BEGINNER',
    tags: ['graphql', 'rest'],
    scenario:
      'Mobile app developers ask which API style to use for fetching product and customer in one screen load.',
    answerPoints: [
      'REST exposes resource endpoints—you may need multiple calls for related data',
      'GraphQL lets clients request specific fields in one query, reducing over-fetching',
      'Salesforce offers GraphQL for some data access patterns depending on product',
      'REST is more universal and better documented for most Salesforce integrations',
      'Choose based on team skills, payload size, and supported Salesforce APIs for your use case',
    ],
    followUpDetails: [
      {
        question: 'Is GraphQL always faster?',
        answer:
          'Not always. Complex GraphQL queries can stress backends. Measure latency and cache hot product data at middleware.',
      },
      {
        question: 'Which is easier for beginners?',
        answer:
          'REST with Postman collections and clear endpoints. GraphQL adds schema learning but helps mobile bandwidth.',
      },
      {
        question: 'Can you mix both?',
        answer:
          'Yes in large programs—commerce REST for checkout, GraphQL for unified customer views if supported. Document boundaries.',
      },
    ],
    architectNote:
      'Avoid religious wars—tradeoffs answer beats "GraphQL is better."',
  },
  {
    title: 'What caching strategies help headless storefront performance?',
    difficulty: 'BEGINNER',
    tags: ['caching', 'performance'],
    scenario:
      'Product pages load slowly because every visit hits Salesforce APIs. You suggest beginner-friendly caching.',
    answerPoints: [
      'Cache relatively static data—catalog categories, product details with short TTL',
      'Use CDN for images and static assets from commerce media',
      'Personalized cart and pricing should not be cached publicly',
      'Middleware can hold session-scoped cache keys per shopper',
      'Invalidate cache on promotion or price updates via webhooks or schedules',
    ],
    followUpDetails: [
      {
        question: 'Can you cache cart contents in CDN?',
        answer:
          'No. Cart is user-specific and changes often. Only cache at session layer with proper auth.',
      },
      {
        question: 'What is TTL?',
        answer:
          'Time to live—how long cached data is considered fresh. Shorter TTL for prices, longer for product descriptions.',
      },
      {
        question: 'What symptom means bad cache design?',
        answer:
          'Users see wrong prices or another user\'s data—usually shared cache keys without user scoping. Fix immediately.',
      },
    ],
    architectNote:
      'Cache public reads, never private writes—that rule covers most beginner scenarios.',
  },
  {
    title: 'What is a webhook in headless integrations?',
    difficulty: 'BEGINNER',
    tags: ['webhooks', 'events'],
    scenario:
      'Payment provider notifies your site when charge succeeds. You explain webhooks simply.',
    answerPoints: [
      'A webhook is an HTTP callback—external system POSTs to your URL when an event occurs',
      'Used for payment confirmation, shipment updates, and inventory changes',
      'Your middleware endpoint validates signature, processes payload, updates Salesforce',
      'Must handle retries and duplicate deliveries safely',
      'Expose HTTPS endpoints with authentication—not open anonymous URLs',
    ],
    followUpDetails: [
      {
        question: 'How do you verify webhook authenticity?',
        answer:
          'Use provider signing secrets—HMAC headers or shared tokens—and reject unsigned requests.',
      },
      {
        question: 'What if your endpoint is down?',
        answer:
          'Providers retry; store events in queue when back up. Monitor dead-letter queues for missed payments.',
      },
      {
        question: 'Webhooks vs polling?',
        answer:
          'Webhooks push in real time; polling asks repeatedly on a schedule. Prefer webhooks when supported to reduce lag and API calls.',
      },
    ],
    architectNote:
      'Webhook answers need security + idempotency—same as order sync.',
  },
  {
    title: 'What should you test before launching a headless site?',
    difficulty: 'BEGINNER',
    tags: ['testing', 'go-live'],
    scenario:
      'Go-live is Friday. You list minimum tests a junior should run on staging.',
    answerPoints: [
      'End-to-end guest and logged-in checkout with payment sandbox',
      'OAuth login, logout, and token refresh on mobile and web',
      'Order appears correctly in CRM with matching customer and line items',
      'Error handling when APIs timeout—friendly message, no stack traces',
      'Load smoke test on product browse and search under expected traffic',
    ],
    followUpDetails: [
      {
        question: 'Why test token refresh separately?',
        answer:
          'Sessions fail silently after hours if refresh breaks. Long-running cart abandonment flows expose this bug.',
      },
      {
        question: 'Should marketing test too?',
        answer:
          'Yes—promotions, coupons, and pricing display are business-critical. Dev-only testing misses promo stacking bugs.',
      },
      {
        question: 'What monitoring do you add at launch?',
        answer:
          'API error rates, checkout funnel drop-offs, integration queue depth, and alerting on payment webhook failures.',
      },
    ],
    architectNote:
      'Headless go-live checklist: auth, checkout, CRM sync, failures, monitor—five words to memorize.',
  },
];

const APEX_BEGINNER: TopicTemplate[] = [
  {
    title: 'What is Apex and when would you use it?',
    difficulty: 'BEGINNER',
    tags: ['apex', 'basics', 'code'],
    scenario:
      'An admin hits Flow limits on complex validation. The lead asks when Apex is the right tool.',
    answerPoints: [
      'Apex is Salesforce\'s strongly typed, object-oriented programming language on the platform',
      'Use it for complex business logic, bulk data processing, and integrations Flow cannot handle cleanly',
      'Runs in a multitenant environment with governor limits on CPU, heap, queries, and DML',
      'Triggers respond to database events; classes hold reusable logic invoked from many places',
      'Prefer declarative tools first; use Apex when you need performance, control, or testability at scale',
    ],
    followUpDetails: [
      {
        question: 'Can business admins write Apex?',
        answer:
          'Typically developers with Apex classes permission write and deploy code. Admins configure metadata; Apex requires dev lifecycle and tests for production.',
      },
      {
        question: 'Is Apex like Java?',
        answer:
          'Syntax is Java-like but Apex only runs on Salesforce servers with platform-specific APIs and limits. Java experience helps you learn faster.',
      },
      {
        question: 'Where does Apex run?',
        answer:
          'On Salesforce servers in the same transaction as the triggering event unless marked async. It never runs in the user\'s browser.',
      },
    ],
    architectNote:
      'Classic answer: declarative first, Apex when necessary—shows you are not code-happy on day one.',
  },
  {
    title: 'What is bulkification in Apex?',
    difficulty: 'BEGINNER',
    tags: ['bulkification', 'triggers', 'best-practices'],
    scenario:
      'A data load updates 200 Accounts and a trigger fails. You explain why bulk-safe code matters.',
    answerPoints: [
      'Salesforce processes up to 200 records per trigger batch in one transaction',
      'Bulkification means writing code that handles lists of records, not assuming one record',
      'Never run SOQL or DML inside a loop over trigger records',
      'Collect IDs, query once, process in maps, then DML once',
      'Bulk-safe triggers prevent governor limit errors during imports and mass updates',
    ],
    followUpDetails: [
      {
        question: 'What error do you see when code is not bulkified?',
        answer:
          'Too many SOQL queries (101) or too many DML rows/statements. The entire transaction rolls back.',
      },
      {
        question: 'Does bulkification apply to Flow?',
        answer:
          'Flows have their own limits but the concept applies—avoid per-record callouts in loops. Apex triggers are the classic interview focus.',
      },
      {
        question: 'How do you practice bulk testing?',
        answer:
          'Unit tests insert or update 200+ records in one test method to prove trigger logic scales.',
      },
    ],
    architectNote:
      'If you remember one Apex rule: no SOQL/DML in loops. Interviewers literally listen for that phrase.',
  },
  {
    title: 'What are governor limits?',
    difficulty: 'BEGINNER',
    tags: ['governor-limits', 'platform'],
    scenario:
      'A junior\'s integration works for one record but fails on batch jobs. You explain governor limits.',
    answerPoints: [
      'Governor limits cap resources per transaction to protect multitenant platform stability',
      'Common limits: 100 SOQL queries, 150 DML statements, 10,000 DML rows, 10 MB heap, CPU time',
      'Limits apply per synchronous transaction; async contexts have their own thresholds',
      'Hitting a limit throws an exception and rolls back the whole transaction',
      'Design patterns like bulkification and async processing stay within limits',
    ],
    followUpDetails: [
      {
        question: 'Can you raise governor limits?',
        answer:
          'No for standard limits in normal transactions. Some async types allow higher query rows. Architecture must fit within platform caps.',
      },
      {
        question: 'Do limits apply to admins in Setup?',
        answer:
          'Apex and automation limits apply regardless of user profile when code runs. Admins are not exempt from governor limits in triggers.',
      },
      {
        question: 'What is CPU time limit?',
        answer:
          'Total processing time Apex may consume in a transaction. Heavy loops or regex can hit it even with few queries.',
      },
    ],
    architectNote:
      'Connect limits to multitenant fairness—shows you understand why Salesforce enforces them.',
  },
  {
    title: 'What is the difference between a trigger and a class?',
    difficulty: 'BEGINNER',
    tags: ['triggers', 'classes'],
    scenario:
      'A new hire puts all logic inside a trigger file. You explain separation of concerns.',
    answerPoints: [
      'Triggers fire automatically on insert, update, delete, undelete events for an object',
      'Classes hold reusable methods, services, and helpers called from triggers, Flow, or APIs',
      'Best practice: keep triggers thin—delegate to a handler class',
      'One trigger per object avoids unpredictable execution order from multiple triggers',
      'Classes are easier to unit test in isolation than large trigger bodies',
    ],
    followUpDetails: [
      {
        question: 'Can you call a Flow from a trigger?',
        answer:
          'Yes via Flow invocations, but watch transaction limits and mixed automation complexity. Many teams prefer handler classes for complex logic.',
      },
      {
        question: 'What is a trigger handler pattern?',
        answer:
          'A class with methods like beforeInsert, afterUpdate that the trigger calls. Centralizes logic and recursion control.',
      },
      {
        question: 'Are triggers synchronous?',
        answer:
          'Yes—they run in the same database transaction as the save. Errors block the save unless handled.',
      },
    ],
    architectNote:
      'Thin trigger, fat handler—three words every Apex interviewer expects.',
  },
  {
    title: 'What is SOQL and how is it different from SQL?',
    difficulty: 'BEGINNER',
    tags: ['soql', 'queries'],
    scenario:
      'You need Accounts in California with open Opportunities. The interviewer asks how you query in Apex.',
    answerPoints: [
      'SOQL is Salesforce Object Query Language for reading records from the database',
      'Syntax resembles SQL SELECT but only supports SELECT, not arbitrary UPDATE/DELETE in queries',
      'Relationship queries traverse parent-child in one statement using dot notation',
      'SOQL is case-insensitive on field names and returns sObject lists or query locators',
      'Use selective filters on indexed fields to avoid long-running queries',
    ],
    followUpDetails: [
      {
        question: 'What is a selective query?',
        answer:
          'A query that filters on indexed fields so Salesforce scans fewer rows—typically under 10% of object rows or with selective filters on Id/external id.',
      },
      {
        question: 'Can SOQL run in a loop?',
        answer:
          'Technically yes but it will hit query limits quickly. Query once outside the loop and use maps.',
      },
      {
        question: 'What is SOSL?',
        answer:
          'Salesforce Object Search Language searches text across multiple objects. Use for user search boxes, not bulk business logic.',
      },
    ],
    architectNote:
      'Mention selective queries when discussing SOQL— juniors often stop at SELECT syntax.',
  },
  {
    title: 'What is DML in Apex?',
    difficulty: 'BEGINNER',
    tags: ['dml', 'insert', 'update'],
    scenario:
      'After processing Opportunities, you need to create Tasks. You explain DML operations.',
    answerPoints: [
      'DML (Data Manipulation Language) operations insert, update, upsert, delete, undelete records',
      'Use lists for bulk DML—one insert accountsList instead of many single inserts',
      'DML fires triggers on affected objects in the same transaction',
      'Partial success options exist but default is all-or-nothing per transaction',
      'Governor limits cap DML rows and statements per transaction',
    ],
    followUpDetails: [
      {
        question: 'What is upsert?',
        answer:
          'Insert or update in one call using external ID or Id. Useful for integrations that may create or update records.',
      },
      {
        question: 'What happens if DML fails validation rule?',
        answer:
          'DML throws DmlException and rolls back unless using Database methods with partial success flags.',
      },
      {
        question: 'Can you delete in a before trigger?',
        answer:
          'You can delete trigger.new in before delete context. Insert/update DML in before triggers affects the same transaction carefully—know recursion.',
      },
    ],
    architectNote:
      'Pair DML with triggers firing—shows you think about side effects, not just syntax.',
  },
  {
    title: 'What is a test class and why is 75% coverage required?',
    difficulty: 'BEGINNER',
    tags: ['testing', 'coverage'],
    scenario:
      'Deployment fails due to insufficient test coverage. You explain Apex testing basics.',
    answerPoints: [
      'Test classes use @isTest methods to verify Apex logic with mock data',
      'Production deployments require at least 75% org-wide Apex coverage and all tests passing',
      'Tests run in isolated context with SeeAllData=false by default—you create test data',
      'Good tests assert business outcomes, not just run code for coverage',
      'Tests prevent regressions when metadata changes',
    ],
    followUpDetails: [
      {
        question: 'Does 100% coverage mean bug-free code?',
        answer:
          'No. Coverage only means lines executed. You need meaningful assertions on edge cases and bulk scenarios.',
      },
      {
        question: 'What is Test.startTest and stopTest?',
        answer:
          'Resets governor limits mid-test and forces async jobs queued between them to run—useful for testing futures and queueables.',
      },
      {
        question: 'Can tests call external APIs?',
        answer:
          'Use HttpCalloutMock to fake responses. Tests should not depend on live external systems.',
      },
    ],
    architectNote:
      'Say coverage is a gate, not a goal—distinction marks thoughtful juniors.',
  },
  {
    title: 'What is the difference between before and after trigger context?',
    difficulty: 'BEGINNER',
    tags: ['triggers', 'before', 'after'],
    scenario:
      'You must set a field before save and send email after save. You choose trigger contexts.',
    answerPoints: [
      'Before triggers run prior to record save—you can modify field values on trigger.new',
      'After triggers run post-commit to database—you have IDs but should not change trigger.new fields directly',
      'Use before for validation, defaults, and field stamping',
      'Use after for related record updates, async handoff, and logging that needs record IDs',
      'Same event can have both before and after logic split appropriately',
    ],
    followUpDetails: [
      {
        question: 'Can you update related records in before trigger?',
        answer:
          'Yes via DML on other objects, but keep bulk patterns. Often related updates happen in after trigger when Id is guaranteed.',
      },
      {
        question: 'What is trigger.old?',
        answer:
          'Prior field values on update/delete in after/before contexts. Compare old vs new for change detection.',
      },
      {
        question: 'What is recursion in triggers?',
        answer:
          'Your trigger updates records that fire the same trigger again. Use static flags or handler design to stop infinite loops.',
      },
    ],
    architectNote:
      'Before = modify incoming record; after = react with IDs. That split answers most context questions.',
  },
  {
    title: 'What are future methods and when use them?',
    difficulty: 'BEGINNER',
    tags: ['future', 'async'],
    scenario:
      'A trigger must call an external API but callouts cannot run with pending DML. You mention @future.',
    answerPoints: [
      '@future methods run asynchronously in a separate transaction after the calling one commits',
      'Use when you need callouts after DML or to offload non-critical work',
      'Future methods must be static void with callout=true flag when calling external systems',
      'Cannot pass sObjects to future—pass IDs only',
      'Newer patterns include Queueable and Platform Events for more flexibility',
    ],
    followUpDetails: [
      {
        question: 'What is wrong with callout before DML in same transaction?',
        answer:
          'Salesforce forbids uncommitted work pending with callouts in one sync transaction. Order must be callout then DML, or use async.',
      },
      {
        question: 'Can you chain future methods reliably?',
        answer:
          'Limited—prefer Queueable for chaining and better monitoring. Future is legacy-simple but less observable.',
      },
      {
        question: 'How do you test future methods?',
        answer:
          'Test.startTest/stopTest forces async execution in tests. Assert side effects on records or mock callouts.',
      },
    ],
    architectNote:
      'Callout + DML ordering is a favorite trap—know sync rules before async patterns.',
  },
  {
    title: 'What is CRUD and FLS security in Apex?',
    difficulty: 'BEGINNER',
    tags: ['security', 'crud', 'fls'],
    scenario:
      'A class with sharing disabled exposes salary fields to users who should not see them. You explain security checks.',
    answerPoints: [
      'CRUD checks whether user can create, read, update, delete object type',
      'FLS (field-level security) controls visibility and editability per field',
      'Use WITH SECURITY_ENFORCED in SOQL or Schema.Describe calls to respect permissions',
      'Classes default to user sharing with "with sharing" keyword—without sharing bypasses record rules',
      'Never assume admin-written Apex is safe for all users—enforce least privilege',
    ],
    followUpDetails: [
      {
        question: 'What does without sharing mean?',
        answer:
          'Class ignores sharing rules and runs in system context for record access. Use sparingly with explicit CRUD/FLS checks.',
      },
      {
        question: 'Can Lightning components bypass FLS?',
        answer:
          'LDS respects FLS; Apex controllers must enforce it manually if not using stripInaccessible patterns.',
      },
      {
        question: 'What is stripInaccessible?',
        answer:
          'Security.stripInaccessible removes fields and records user cannot access from query results before DML or return to UI.',
      },
    ],
    architectNote:
      'with sharing + stripInaccessible is the modern junior security combo to name-drop.',
  },
  {
    title: 'What is an Apex exception and basic error handling?',
    difficulty: 'BEGINNER',
    tags: ['exceptions', 'error-handling'],
    scenario:
      'Users see a generic "Script-thrown exception" on save. You describe handling errors properly.',
    answerPoints: [
      'Exceptions stop transaction execution and roll back unless caught in try-catch',
      'Use try-catch for expected failures like callout timeouts with user-friendly handling',
      'Throw custom exceptions with clear messages for validation failures when appropriate',
      'Log errors to custom object or platform logging for support teams—avoid exposing stack traces to users',
      'Trigger exceptions block the save—message should help user fix data when possible',
    ],
    followUpDetails: [
      {
        question: 'Should every line be in try-catch?',
        answer:
          'No. Over-catching hides bugs. Wrap risky callouts and parsing; let programming errors fail tests.',
      },
      {
        question: 'What is addError on records?',
        answer:
          "In triggers, call record.addError('message') to block save with a field-level error like validation rules.",
      },
      {
        question: 'How do integrations handle Apex failures?',
        answer:
          'Return structured error JSON from REST services with HTTP status codes. Log correlation IDs for retries.',
      },
    ],
    architectNote:
      'User-facing errors vs developer logs—split those in answers to show UX awareness.',
  },
  {
    title: 'What debugging tools help Apex developers?',
    difficulty: 'BEGINNER',
    tags: ['debugging', 'developer-tools'],
    scenario:
      'Your trigger works in sandbox but not production data. You list how you would debug as a junior.',
    answerPoints: [
      'Debug logs capture USER_DEBUG statements, SOQL, DML, and limits for a traced user',
      'Set trace flags on your user with appropriate log levels in Setup or Developer Console',
      'Execute Anonymous runs snippets in org context for quick tests',
      'Check Setup → Apex Jobs for async failures and stack traces',
      'Use System.debug sparingly with clear messages; remove noise before production',
    ],
    followUpDetails: [
      {
        question: 'Why avoid debug logs in production long term?',
        answer:
          'Volume and performance impact. Enable targeted trace flags for reproducing issues, then disable.',
      },
      {
        question: 'What is LIMIT_USAGE in logs?',
        answer:
          'Shows governor consumption per category in the transaction—useful to find which line exhausted queries.',
      },
      {
        question: 'Can you debug Flow and Apex together?',
        answer:
          'Yes in Flow debug runs and combined logs. Identify whether Flow or trigger caused failure first.',
      },
    ],
    architectNote:
      'Mention trace flag + LIMIT_USAGE—you sound like someone who has actually read a log.',
  },
];

const LWC_BEGINNER: TopicTemplate[] = [
  {
    title: 'What is Lightning Web Components (LWC)?',
    difficulty: 'BEGINNER',
    tags: ['lwc', 'basics', 'lightning'],
    scenario:
      'Leadership wants a custom widget on the Account page. You explain why LWC is the modern choice.',
    answerPoints: [
      'LWC is Salesforce\'s standard JavaScript framework for building UI on the Lightning platform',
      'Components use HTML templates, JavaScript modules, and CSS scoped to the component',
      'LWCs run in a secure locker or LWS sandbox with access to platform APIs',
      'They replace older Aura for new development due to web standards and performance',
      'LWCs compose on record pages, app pages, Experience Cloud, and inside Flow screens',
    ],
    followUpDetails: [
      {
        question: 'Can you still use Aura?',
        answer:
          'Legacy Aura exists but new features target LWC. You may wrap or coexist during migration. Interviews expect LWC for greenfield work.',
      },
      {
        question: 'Do LWCs work on mobile Salesforce app?',
        answer:
          'Many do on record pages configured in Lightning Experience mobile. Test layout and form factors—not every desktop pattern fits mobile.',
      },
      {
        question: 'Is LWC the same as React?',
        answer:
          'Similar component mindset but different APIs and no direct React DOM. Web component standards underpin LWC.',
      },
    ],
    architectNote:
      'Position LWC as default UI layer on Lightning—simple and correct for 2025 interviews.',
  },
  {
    title: 'What is the difference between @api and @track?',
    difficulty: 'BEGINNER',
    tags: ['api', 'track', 'reactivity'],
    scenario:
      'A parent passes a record Id to a child component. You explain public properties and reactivity.',
    answerPoints: [
      '@api marks public properties the parent can set from markup or other components',
      'Primitive @api properties are reactive by default in modern LWC',
      '@track was needed for deep reactivity on object properties; plain fields are reactive now for most cases',
      'Use @api for inputs from parent; internal state uses class fields',
      'Clear naming helps parent-child contracts stay maintainable',
    ],
    followUpDetails: [
      {
        question: 'When do you still use @track?',
        answer:
          'Rarely on modern API versions for deep object mutation edge cases. Prefer spreading objects to trigger re-render when unsure.',
      },
      {
        question: 'Can child modify @api values?',
        answer:
          'Anti-pattern—treat @api as inputs. Emit events upward for changes the parent should own.',
      },
      {
        question: 'What is a getter in LWC templates?',
        answer:
          'Computed properties for display logic keep templates clean. Getters re-run when reactive dependencies change.',
      },
    ],
    architectNote:
      'If asked @track, show you know it is mostly legacy—signals current LWC knowledge.',
  },
  {
    title: 'How do parent and child LWCs communicate?',
    difficulty: 'BEGINNER',
    tags: ['events', 'communication'],
    scenario:
      'A child picker selects an Account and the parent list must refresh. You explain communication patterns.',
    answerPoints: [
      'Parent passes data down via @api properties and public methods',
      'Child sends events up with CustomEvent and dispatchEvent',
      'Parent listens with on event handlers in template',
      'Sibling components communicate via parent mediator or Lightning Message Service',
      'Avoid tight coupling—keep events named clearly with detail payloads',
    ],
    followUpDetails: [
      {
        question: 'What is Lightning Message Service?',
        answer:
          'Pub-sub channel for unrelated components on same page to exchange messages without parent-child relationship.',
      },
      {
        question: 'Can you use window events?',
        answer:
          'Not recommended—breaks encapsulation and security model. Use platform patterns.',
      },
      {
        question: 'How do you call a child method from parent?',
        answer:
          'Query child with template ref this.refs.child and call @api method. Use sparingly; prefer events for data flow up.',
      },
    ],
    architectNote:
      'Data down, events up—same as React interviews, same phrase works here.',
  },
  {
    title: 'What is Lightning Data Service (LDS)?',
    difficulty: 'BEGINNER',
    tags: ['lds', 'wire', 'ui-record-api'],
    scenario:
      'You need Account Name on a component without writing Apex. You introduce LDS.',
    answerPoints: [
      'LDS provides declarative access to record data with caching and shared UI consistency',
      'lightning-record-form and lightning-record-view-form use LDS under the hood',
      'Wire adapters like getRecord fetch fields without custom Apex controllers',
      'LDS respects FLS and sharing automatically',
      'Prefer LDS over Apex for simple CRUD display to reduce server code and improve cache behavior',
    ],
    followUpDetails: [
      {
        question: 'When do you need Apex instead of LDS?',
        answer:
          'Complex aggregations, integrations, or operations LDS adapters do not support. LDS covers single-record and some list patterns.',
      },
      {
        question: 'Does LDS work offline?',
        answer:
          'Limited offline support in mobile contexts; do not assume full offline CRUD without testing Salesforce mobile behavior.',
      },
      {
        question: 'What is refreshApex?',
        answer:
          'Imperative helper to refresh wired Apex or LDS data after a mutation so UI shows latest values.',
      },
    ],
    architectNote:
      'LDS first on record pages—shows you avoid unnecessary Apex, a common junior mistake.',
  },
  {
    title: 'What is @wire in LWC?',
    difficulty: 'BEGINNER',
    tags: ['wire', 'adapters'],
    scenario:
      'You load picklist values for an object field without Apex. You explain wire adapters.',
    answerPoints: [
      '@wire decorates a property or function to call a Lightning adapter reactively',
      'Adapters include getRecord, getObjectInfo, getPicklistValues, and Apex methods marked cacheable',
      'Wire re-runs when reactive parameters change, like recordId',
      'Destructure error and data in template or property for loading states',
      'Cacheable=true Apex used with wire must not perform DML',
    ],
    followUpDetails: [
      {
        question: 'What is the difference between wire and imperative Apex?',
        answer:
          'Wire is declarative and cached; imperative callApexMethod runs when you invoke it in code—better after user clicks Save.',
      },
      {
        question: 'Why did my wire return undefined first?',
        answer:
          'Wire is asynchronous. Template should handle loading when data is undefined and error when wire errors.',
      },
      {
        question: 'Can wire call non-cacheable Apex?',
        answer:
          'No. Non-cacheable Apex must use imperative calls. Mutations always use imperative pattern.',
      },
    ],
    architectNote:
      'Wire = read reactive; imperative = write/action. That one line clears many wire questions.',
  },
  {
    title: 'How do you call Apex from LWC?',
    difficulty: 'BEGINNER',
    tags: ['apex', 'imperative'],
    scenario:
      'On button click, you submit a form that creates a Case via server logic. You outline the pattern.',
    answerPoints: [
      'Import Apex method: import createCase from @salesforce/apex/CaseController.createCase',
      'Use imperative invoke for mutations: createCase({ fields }) then handle promise',
      'Mark read-only methods @AuraEnabled(cacheable=true) for wire; mutations omit cacheable',
      'Show spinner and toast on success or failure for user feedback',
      'Keep Apex bulk-safe even if UI sends one record today',
    ],
    followUpDetails: [
      {
        question: 'What is @AuraEnabled?',
        answer:
          'Annotation exposing Apex methods to Lightning components. Specify cacheable only for read methods without side effects.',
      },
      {
        question: 'How do you handle Apex errors in LWC?',
        answer:
          'Catch promise rejection, parse body.message from AuraHandledException, show toast—never alert raw stack traces.',
      },
      {
        question: 'Can LWC call REST instead of Apex?',
        answer:
          'Possible from Experience Cloud with CORS but platform Apex is standard for internal org UIs due to auth and limits.',
      },
    ],
    architectNote:
      'Always mention toast + spinner—UX basics interviewers expect alongside code pattern.',
  },
  {
    title: 'What is SLDS and why use lightning-base components?',
    difficulty: 'BEGINNER',
    tags: ['slds', 'base-components', 'ui'],
    scenario:
      'A developer builds custom HTML buttons that look wrong on Salesforce mobile. You point them to base components.',
    answerPoints: [
      'SLDS is Salesforce Lightning Design System—spacing, typography, and component styling standards',
      'lightning-button, lightning-input, lightning-datatable match Salesforce look and accessibility',
      'Base components handle keyboard nav and ARIA better than raw HTML in most cases',
      'Custom CSS should complement SLDS tokens, not fight platform styles',
      'Consistent UI reduces maintenance when Salesforce updates themes',
    ],
    followUpDetails: [
      {
        question: 'Can you use external CSS frameworks like Bootstrap?',
        answer:
          'Discouraged on core Salesforce pages—conflicts with SLDS and locker. Stick to SLDS and lightning-* components.',
      },
      {
        question: 'What is lightning-datatable used for?',
        answer:
          'Displaying tabular data with sort, row actions, and inline edit for supported types without building tables from scratch.',
      },
      {
        question: 'How do you style a component background?',
        answer:
          'Use :host CSS and SLDS utility classes. Avoid deep piercing into base component internals—brittle across releases.',
      },
    ],
    architectNote:
      'Use platform components until they truly cannot meet requirement—pragmatic junior answer.',
  },
  {
    title: 'How do you deploy and test LWCs?',
    difficulty: 'BEGINNER',
    tags: ['deployment', 'testing', 'jest'],
    scenario:
      'Your component works locally in VS Code but fails in sandbox. You describe LWC dev workflow basics.',
    answerPoints: [
      'Develop with Salesforce CLI and VS Code, push source to scratch org or sandbox',
      'Jest tests (sfdx-lwc-jest) unit test JavaScript logic offline',
      'Add component to Lightning App Builder page or flexipage metadata for visibility',
      'Verify profiles and permission sets grant access to Apex and custom metadata used',
      'Use browser dev tools and component inspector for runtime issues',
    ],
    followUpDetails: [
      {
        question: 'What do Jest tests not cover?',
        answer:
          'Full integration with live Salesforce data and wire adapters—supplement with manual or UI tests in org.',
      },
      {
        question: 'Why is component not visible on page?',
        answer:
          'Check flexipage assignment, object/record type compatibility, and activation. New components need deployment and page refresh.',
      },
      {
        question: 'What is scratch org?',
        answer:
          'Disposable Salesforce org for development from source. Good for isolated feature work before sandbox promotion.',
      },
    ],
    architectNote:
      'Deployment issues are often metadata visibility—not JS syntax. Mention flexipage and permissions.',
  },
  {
    title: 'What are lifecycle hooks in LWC?',
    difficulty: 'BEGINNER',
    tags: ['lifecycle', 'connectedCallback'],
    scenario:
      'You must load data when a component appears on a tab. You explain connectedCallback.',
    answerPoints: [
      'connectedCallback runs when component inserts into DOM—common place to start data load',
      'renderedCallback runs after every render—avoid heavy logic here to prevent loops',
      'disconnectedCallback cleans timers or subscriptions when component removes',
      'constructor runs early—avoid DOM access or @wire side effects there',
      'Use lifecycle hooks instead of outdated Aura init patterns',
    ],
    followUpDetails: [
      {
        question: 'Can you call imperative Apex in connectedCallback?',
        answer:
          'Yes for initial load. Handle errors and loading flags so template does not flash empty content awkwardly.',
      },
      {
        question: 'Why infinite re-render loop?',
        answer:
          'Often mutating tracked state inside renderedCallback unconditionally. Move logic to connectedCallback or event handlers.',
      },
      {
        question: 'Does connectedCallback fire on tab switch?',
        answer:
          'If component was removed from DOM, yes on re-insert. Hidden tabs may keep component connected—test your page config.',
      },
    ],
    architectNote:
      'connectedCallback for init, renderedCallback rarely—safe beginner lifecycle guidance.',
  },
  {
    title: 'What is navigation in LWC?',
    difficulty: 'BEGINNER',
    tags: ['navigation', 'lightning-navigation'],
    scenario:
      'After creating a record, you redirect user to the new record page. You mention NavigationMixin.',
    answerPoints: [
      'lightning/navigation provides NavigationMixin for programmatic page changes',
      'Generate page references for record pages, list views, named pages, and web pages',
      'Use NavigationMixin in class extends and call this[NavigationMixin.Navigate](pageRef)',
      'Prefer standard navigation over window.location for SPA behavior inside Lightning',
      'Experience Cloud has similar patterns with community-specific page types',
    ],
    followUpDetails: [
      {
        question: 'How navigate to object home?',
        answer:
          'Use standard__objectPage type with objectApiName and actionName home in page reference.',
      },
      {
        question: 'Can you open a modal instead of navigate?',
        answer:
          'Yes with lightning-modal or quick action patterns. Navigation is for full page transitions.',
      },
      {
        question: 'What breaks navigation in Experience Cloud?',
        answer:
          'Wrong page reference type or missing community builder page name. Test in actual community site.',
      },
    ],
    architectNote:
      'NavigationMixin beats window.open for core Salesforce apps—small detail, big credibility.',
  },
  {
    title: 'How does LWC handle forms and validation?',
    difficulty: 'BEGINNER',
    tags: ['forms', 'validation'],
    scenario:
      'Users submit incomplete custom forms. You describe client-side validation approach.',
    answerPoints: [
      'Use lightning-input required and pattern attributes for basic HTML5 validation',
      'Query lightning-input components and call reportValidity() before submit',
      'Combine client validation with Apex server validation—never trust client alone',
      'lightning-record-edit-form handles standard object validation rules automatically',
      'Show field-level errors with setCustomValidity for custom messages',
    ],
    followUpDetails: [
      {
        question: 'What if validation rule fails on server?',
        answer:
          'Apex throws AuraHandledException with message; display in toast or inline. Map errors to fields when possible.',
      },
      {
        question: 'Should you disable Save while loading?',
        answer:
          'Yes—prevent double submit with isLoading flag disabling button during Apex call.',
      },
      {
        question: 'When use record-edit-form vs custom form?',
        answer:
          'record-edit-form faster for standard objects with layouts. Custom forms for wizards, multi-object, or heavy UX control.',
      },
    ],
    architectNote:
      'Client + server validation duo—security-aware junior answer in one breath.',
  },
  {
    title: 'What common LWC performance mistakes should beginners avoid?',
    difficulty: 'BEGINNER',
    tags: ['performance', 'best-practices'],
    scenario:
      'A datatable component loads thousands of rows and freezes the browser. You list beginner performance tips.',
    answerPoints: [
      'Load only needed fields in getRecord and Apex queries',
      'Paginate large lists instead of rendering thousands of DOM rows',
      'Avoid imperative Apex calls inside loops in renderedCallback',
      'Use @wire cacheable reads where data does not change every second',
      'Debounce search inputs before server calls',
    ],
    followUpDetails: [
      {
        question: 'Does more @wire mean slower page?',
        answer:
          'Multiple wires can run in parallel but still add network calls. Consolidate related data in one cacheable Apex when wire limits hurt.',
      },
      {
        question: 'What is lazy loading?',
        answer:
          'Load details only when user expands row or scrolls into view—reduces initial payload.',
      },
      {
        question: 'Are console.log statements a performance issue?',
        answer:
          'Minor in dev; remove excessive logging in production components. Focus on query and render volume first.',
      },
    ],
    architectNote:
      'Pagination and field minimization—concrete fixes beat vague "optimize JavaScript."',
  },
];

const INTEGRATION_BEGINNER: TopicTemplate[] = [
  {
    title: 'What is a REST API integration with Salesforce?',
    difficulty: 'BEGINNER',
    tags: ['rest', 'integration', 'basics'],
    scenario:
      'An external ERP must create Accounts in Salesforce nightly. You explain REST at a high level.',
    answerPoints: [
      'REST uses HTTP methods GET, POST, PATCH, DELETE on resource URLs with JSON payloads',
      'Salesforce REST API exposes sObjects, query, composite, and custom Apex REST endpoints',
      'Clients authenticate with OAuth tokens, not username/password in production',
      'API version in URL (e.g., v62.0) should be pinned and upgraded deliberately',
      'Design for idempotency and error handling on retries',
    ],
    followUpDetails: [
      {
        question: 'What is the difference between REST and Bulk API?',
        answer:
          'REST suits interactive single or small batch operations. Bulk API handles large data loads asynchronously with job polling.',
      },
      {
        question: 'How do you test REST integrations?',
        answer:
          'Use Postman or Workbench in sandbox with test users. Automate with integration tests hitting mock servers.',
      },
      {
        question: 'What HTTP code means success on create?',
        answer:
          '201 Created with Location header for new record Id. 204 often on successful update/delete without body.',
      },
    ],
    architectNote:
      'REST interview opener: HTTP + JSON + OAuth + versioning. Hit those four every time.',
  },
  {
    title: 'What is OAuth for Salesforce integrations?',
    difficulty: 'BEGINNER',
    tags: ['oauth', 'connected-app'],
    scenario:
      'Middleware needs long-running access to Salesforce without a human logging in daily. You explain OAuth flows simply.',
    answerPoints: [
      'OAuth grants scoped access tokens after authorization',
      'Connected apps register integration client credentials in Salesforce Setup',
      'Server-to-server often uses JWT bearer or client credentials depending on use case',
      'User-delegated flows use authorization code when acting on behalf of a person',
      'Store refresh tokens securely and rotate secrets per security policy',
    ],
    followUpDetails: [
      {
        question: 'What is an integration user?',
        answer:
          'Dedicated Salesforce user with minimum permissions for API jobs—not a human admin personal account. Easier to audit and lock down.',
      },
      {
        question: 'What are scopes?',
        answer:
          'Permissions requested in OAuth like api, refresh_token, full. Request least scope needed.',
      },
      {
        question: 'What happens when password reset on integration user?',
        answer:
          'Tokens may invalidate depending on setup. Use proper OAuth flows and monitoring to detect auth failures quickly.',
      },
    ],
    architectNote:
      'Integration user + least privilege—pair with OAuth in every beginner security answer.',
  },
  {
    title: 'What is SOAP API and when is it still used?',
    difficulty: 'BEGINNER',
    tags: ['soap', 'enterprise-wsdl'],
    scenario:
      'A legacy billing system only supports SOAP. You explain why Salesforce still offers it.',
    answerPoints: [
      'SOAP is XML-based web services with WSDL contract definitions',
      'Salesforce Enterprise WSDL is strongly typed to your org schema',
      'Common in older enterprise ERP and middleware that never migrated to REST',
      'Partner WSDL exists for multi-org ISV patterns',
      'New integrations prefer REST or Bulk unless SOAP is mandatory',
    ],
    followUpDetails: [
      {
        question: 'Is SOAP slower than REST?',
        answer:
          'Often heavier payloads with XML parsing overhead. For high volume, Bulk or REST composite may perform better.',
      },
      {
        question: 'What breaks when you add custom fields?',
        answer:
          'Clients using old WSDL may miss new fields until WSDL regenerated and client redeployed. REST is more flexible for schema drift.',
      },
      {
        question: 'Can Flow call SOAP?',
        answer:
          'External services or Apex callouts typically wrap SOAP. Flow alone rarely calls raw SOAP without middleware.',
      },
    ],
    architectNote:
      'Acknowledge SOAP legacy without recommending it for new builds—balanced junior take.',
  },
  {
    title: 'What are Platform Events?',
    difficulty: 'BEGINNER',
    tags: ['platform-events', 'event-driven'],
    scenario:
      'Order shipped in ERP should notify Salesforce without polling every minute. You introduce Platform Events.',
    answerPoints: [
      'Platform Events are custom event messages published and subscribed to in Salesforce',
      'Publishers external or internal write event records to event bus',
      'Subscribers use Apex triggers, Flow, or CometD to react asynchronously',
      'Decouples systems—ERP publishes once; many Salesforce processes can subscribe',
      'Events are fire-and-forget; design idempotent handlers for duplicate delivery',
    ],
    followUpDetails: [
      {
        question: 'How are Platform Events different from Change Data Capture?',
        answer:
          'CDC emits standard change events on Salesforce records. Platform Events are custom payloads you define for any business signal.',
      },
      {
        question: 'Are events stored forever?',
        answer:
          'Retention is limited; not a permanent audit log. Archive important payloads elsewhere if compliance requires.',
      },
      {
        question: 'What if subscriber fails?',
        answer:
          'Retry behavior depends on subscriber type. Monitor event errors and dead letter patterns in observability tools.',
      },
    ],
    architectNote:
      'Platform Event = custom notification on bus. Contrast with CDC to show you know both.',
  },
  {
    title: 'What is Change Data Capture (CDC)?',
    difficulty: 'BEGINNER',
    tags: ['cdc', 'integration'],
    scenario:
      'Data warehouse needs near-real-time Salesforce Account changes. You explain CDC basics.',
    answerPoints: [
      'CDC publishes change events when records are created, updated, deleted, or undeleted',
      'Events include changed fields and metadata for downstream sync',
      'External subscribers consume via Pub/Sub API or middleware connectors',
      'Reduces inefficient polling of Salesforce for changes',
      'Enable CDC per object in Setup—impacts event volume and licensing considerations',
    ],
    followUpDetails: [
      {
        question: 'Does CDC include field history?',
        answer:
          'Change events show new values and changed field mask; combine with Field History for older values if needed.',
      },
      {
        question: 'Can CDC replace nightly full extracts?',
        answer:
          'Often for incremental sync yes, but periodic reconciliation catches missed events. Design backfill jobs.',
      },
      {
        question: 'What is Pub/Sub API?',
        answer:
          'gRPC-based API for subscribing to event streams including CDC and Platform Events from external clients.',
      },
    ],
    architectNote:
      'CDC answers "how external systems know SF data changed"—memorize that framing.',
  },
  {
    title: 'What is middleware and why use MuleSoft with Salesforce?',
    difficulty: 'BEGINNER',
    tags: ['middleware', 'mulesoft'],
    scenario:
      'Five systems need Account updates. Point-to-point integrations become messy. You explain middleware role.',
    answerPoints: [
      'Middleware centralizes routing, transformation, protocol conversion, and error handling',
      'MuleSoft Anypoint Platform is Salesforce\'s integration suite for API-led connectivity',
      'System API, Process API, Experience API layers organize reusable integrations',
      'Reduces spaghetti point-to-point links between ERP, CRM, and ecommerce',
      'Provides visibility, retry policies, and throttling across integrations',
    ],
    followUpDetails: [
      {
        question: 'Can you integrate without MuleSoft?',
        answer:
          'Yes—direct REST, Heroku, AWS, or iPaaS alternatives. MuleSoft fits enterprise API strategy on Salesforce stack.',
      },
      {
        question: 'What is API-led connectivity?',
        answer:
          'Layer APIs: system (records), process (business orchestration), experience (channel-specific). Promotes reuse.',
      },
      {
        question: 'Where does transformation happen?',
        answer:
          'In middleware mapping ERP JSON to Salesforce fields, often with DataWeave in MuleSoft. Keeps Apex thin.',
      },
    ],
    architectNote:
      'Middleware = less point-to-point spaghetti. Simple metaphor wins beginner marks.',
  },
  {
    title: 'What is an external ID and why use it in integrations?',
    difficulty: 'BEGINNER',
    tags: ['external-id', 'upsert'],
    scenario:
      'Same Contact syncs from marketing tool daily. You prevent duplicate Contacts with external ID.',
    answerPoints: [
      'External ID is a custom field marked externalId and optionally unique',
      'Upsert operations match on external ID to update existing or insert new',
      'Systems agree on stable key—ERP customer number, UUID from source',
      'Simplifies idempotent integrations on retry',
      'Do not use external ID on fields that change value over time',
    ],
    followUpDetails: [
      {
        question: 'External ID vs Salesforce Id?',
        answer:
          'Salesforce Id exists only in SF. External ID is your cross-system business key known to both sides.',
      },
      {
        question: 'Can one object have multiple external IDs?',
        answer:
          'Multiple fields can be marked external ID but upsert specifies which field to match. Design one primary key.',
      },
      {
        question: 'What if duplicate external IDs exist?',
        answer:
          'Upsert fails or behaves unpredictably. Enforce uniqueness and data quality at source.',
      },
    ],
    architectNote:
      'Upsert + external ID is the integration happy path—say it whenever sync comes up.',
  },
  {
    title: 'What are callouts in Apex integrations?',
    difficulty: 'BEGINNER',
    tags: ['callouts', 'http'],
    scenario:
      'Salesforce must POST order status to external shipping API from a trigger. You explain callout basics.',
    answerPoints: [
      'Callouts are HTTP requests from Apex to external endpoints using HttpRequest/HttpResponse',
      'Must set endpoint URL, method, headers, body, and timeout',
      'Callouts cannot occur with pending DML in same transaction without async pattern',
      'Use Named Credentials to store endpoint and auth without hardcoding secrets',
      'Mock callouts in tests with HttpCalloutMock',
    ],
    followUpDetails: [
      {
        question: 'What is a Named Credential?',
        answer:
          'Setup record storing endpoint URL and authentication protocol referenced in Apex as callout:My_Named_Credential.',
      },
      {
        question: 'What is callout timeout default?',
        answer:
          'Often 10 seconds unless configured—long external APIs need timeout tuning and async processing.',
      },
      {
        question: 'Should triggers make synchronous callouts?',
        answer:
          'Risky—user save waits on external API. Prefer Queueable or Platform Events for reliability and UX.',
      },
    ],
    architectNote:
      'Named Credentials + async callouts—junior integration security and reliability checklist.',
  },
  {
    title: 'What is idempotency in integrations?',
    difficulty: 'BEGINNER',
    tags: ['idempotency', 'reliability'],
    scenario:
      'Network blip causes the same invoice POST twice. Finance sees duplicate Opportunities. You explain idempotency.',
    answerPoints: [
      'Idempotent operations produce same result if executed once or multiple times',
      'Use external IDs, idempotency keys in headers, or duplicate detection rules',
      'Retries are normal—design handlers to detect already-processed messages',
      'Log correlation IDs linking source transaction to Salesforce record',
      'Critical for payments, order create, and inventory movements',
    ],
    followUpDetails: [
      {
        question: 'Is POST always non-idempotent?',
        answer:
          'By HTTP convention often yes, but you implement idempotent POST semantics in business layer with keys.',
      },
      {
        question: 'How store processed message IDs?',
        answer:
          'Custom object or platform cache tracking source message ID with unique constraint prevents reprocessing.',
      },
      {
        question: 'What is at-least-once delivery?',
        answer:
          'Systems may deliver same event multiple times. Consumers must handle duplicates—idempotency again.',
      },
    ],
    architectNote:
      'Retries happen—idempotency is not optional on money-moving integrations.',
  },
  {
    title: 'What is the Composite REST API?',
    difficulty: 'BEGINNER',
    tags: ['composite', 'rest'],
    scenario:
      'Mobile app needs Account, Contact, and Opportunity created in one user action with one round trip.',
    answerPoints: [
      'Composite API bundles multiple subrequests in one HTTP call',
      'Reduces latency and API call count from chatty clients',
      'Supports dependency references between subrequests in same composite',
      'All subrequests share same transaction boundary in allOrNone mode',
      'Useful for mobile and external apps optimizing network usage',
    ],
    followUpDetails: [
      {
        question: 'Composite vs Bulk API?',
        answer:
          'Composite for small related sets in real time. Bulk for thousands of independent rows asynchronously.',
      },
      {
        question: 'What if one subrequest fails with allOrNone?',
        answer:
          'Entire composite rolls back. Use partial success options only when business allows inconsistent state.',
      },
      {
        question: 'Limit on subrequests?',
        answer:
          'Yes—check current Salesforce doc for composite subrequest cap per call. Design batches accordingly.',
      },
    ],
    architectNote:
      'Composite = one trip, related records—good mobile interview example.',
  },
  {
    title: 'How do you monitor integration failures?',
    difficulty: 'BEGINNER',
    tags: ['monitoring', 'operations'],
    scenario:
      'Overnight sync failed silently last week. You list basic monitoring a junior should know.',
    answerPoints: [
      'Review Setup → Apex Jobs, Bulk API job status, and integration user login errors',
      'Log errors to custom Integration_Log__c with payload hash and status',
      'Alert on-call when error rate exceeds threshold via email or Slack webhook',
      'Dashboard retry counts and oldest unprocessed messages',
      'Run reconciliation reports comparing source vs Salesforce counts',
    ],
    followUpDetails: [
      {
        question: 'What is a dead letter queue?',
        answer:
          'Storage for messages that failed max retries for manual replay or fix—common in middleware patterns.',
      },
      {
        question: 'Should users see integration errors?',
        answer:
          'Friendly message in UI; technical detail in logs only. Support uses correlation ID to trace.',
      },
      {
        question: 'How test monitoring?',
        answer:
          'Chaos test—disable endpoint in sandbox, verify alert fires and no silent data loss.',
      },
    ],
    architectNote:
      'Ops answer: log + alert + reconcile—three pillars without overengineering.',
  },
  {
    title: 'What is an API rate limit in Salesforce?',
    difficulty: 'BEGINNER',
    tags: ['limits', 'api'],
    scenario:
      'Marketing platform hits API limit and CRM updates stop midday. You explain API limits simply.',
    answerPoints: [
      'Salesforce enforces daily API request limits per org based on licenses',
      'Concurrent long-running requests also have limits',
      '429 or REQUEST_LIMIT_EXCEEDED errors indicate throttling',
      'Mitigate with Bulk API, composite calls, caching, and batch windows',
      'Monitor API usage in Setup and allocate capacity across integrations',
    ],
    followUpDetails: [
      {
        question: 'Do sandboxes have same limits?',
        answer:
          'Sandbox limits differ and are often lower. Load test cautiously; production capacity planning separate.',
      },
      {
        question: 'Can you buy more API calls?',
        answer:
          'Additional API capacity may be purchased depending on contract. Work with account team instead of guessing.',
      },
      {
        question: 'What counts as one API call?',
        answer:
          'Generally each HTTP request; composite may count subrequests separately per docs. Read current metering rules.',
      },
    ],
    architectNote:
      'When integrations fail mysteriously, ask API limits early—shows production awareness.',
  },
];

const ARCHITECTURE_BEGINNER: TopicTemplate[] = [
  {
    title: 'What is a Salesforce org and why do companies use multiple orgs?',
    difficulty: 'BEGINNER',
    tags: ['org', 'multi-org', 'basics'],
    scenario:
      'A global company has separate sales teams in US and EU with different processes. You explain org strategy at a high level.',
    answerPoints: [
      'An org is an isolated Salesforce instance with its own data, users, and metadata',
      'Single org simplifies shared customers and reporting when processes align',
      'Multiple orgs isolate brands, regions, regulatory boundaries, or acquisition systems',
      'Sandbox orgs copy production for testing without affecting live users',
      'Org strategy should follow data residency, autonomy, and integration complexity',
    ],
    followUpDetails: [
      {
        question: 'What is a sandbox vs production org?',
        answer:
          'Production is live business system. Sandboxes are copies or partial copies for dev, QA, and training with refresh schedules.',
      },
      {
        question: 'Can users exist in multiple production orgs?',
        answer:
          'Yes with separate licenses per org unless using SSO federation across orgs. Identity management gets complex quickly.',
      },
      {
        question: 'What is org consolidation?',
        answer:
          'Merging multiple orgs into one for efficiency—expensive project requiring data migration and process harmonization.',
      },
    ],
    architectNote:
      'Org strategy = tradeoff between isolation and unity. Never say "always one org."',
  },
  {
    title: 'What is the difference between declarative and programmatic customization?',
    difficulty: 'BEGINNER',
    tags: ['declarative', 'programmatic', 'architecture'],
    scenario:
      'Project team debates Flow vs Apex for every requirement. You explain when each layer fits.',
    answerPoints: [
      'Declarative tools include Flow, validation rules, formulas, page layouts—configured without code',
      'Programmatic means Apex, LWC, Visualforce—code deployed through dev pipeline',
      'Declarative is faster for admins to maintain and upgrade-friendly',
      'Programmatic handles complex logic, integrations, and performance-critical bulk processing',
      'Healthy orgs use declarative first with clear criteria for code',
    ],
    followUpDetails: [
      {
        question: 'Can admins break production with Flow?',
        answer:
          'Yes—Flows can DML, callouts, and loop badly. Treat complex Flow like code with testing and change control.',
      },
      {
        question: 'What is technical debt in Salesforce?',
        answer:
          'Quick fixes—hardcoded IDs, duplicate automation, god-class Apex—that slow future changes. Architecture reviews catch early.',
      },
      {
        question: 'Who owns the decision matrix?',
        answer:
          'Architect documents when to use Flow vs Apex vs integration middleware. Devs and admins follow it consistently.',
      },
    ],
    architectNote:
      'Declarative-first with escape hatches—Salesforce architecture 101 in one sentence.',
  },
  {
    title: 'What is a solution architecture document for Salesforce?',
    difficulty: 'BEGINNER',
    tags: ['documentation', 'solution-design'],
    scenario:
      'You join a project mid-build and cannot find why Case routing works a certain way. You explain solution docs.',
    answerPoints: [
      'Solution architecture captures business requirements, data model, integrations, and security design',
      'Includes context diagrams, object ERD, automation inventory, and non-functional requirements',
      'Decisions log records why choices were made—Flow vs middleware, single vs multi org',
      'Living document updated each release—not a one-time kickoff artifact',
      'Helps onboarding and prevents repeated debates',
    ],
    followUpDetails: [
      {
        question: 'What belongs in an automation inventory?',
        answer:
          'List of triggers, Flows, workflow rules, validation rules per object with owner and purpose. Critical before adding more automation.',
      },
      {
        question: 'How detailed for a small project?',
        answer:
          'Lightweight still needs data model sketch, integration list, and security model. Scale detail to risk and team size.',
      },
      {
        question: 'Who maintains the document?',
        answer:
          'Architect or lead consultant with input from admins and devs each sprint or release.',
      },
    ],
    architectNote:
      'Automation inventory mention signals you have seen real org pain—not textbook only.',
  },
  {
    title: 'What is the Salesforce well-architected concept in simple terms?',
    difficulty: 'BEGINNER',
    tags: ['well-architected', 'governance'],
    scenario:
      'Leadership asks how you know their org is "healthy." You reference well-architected pillars simply.',
    answerPoints: [
      'Well-Architected is Salesforce guidance for trusted, easy, adaptable solutions',
      'Trusted covers security, compliance, and reliability',
      'Easy covers user experience, performance, and maintainability',
      'Adaptable covers scalability and ability to change with business needs',
      'Use it as checklist in design reviews, not a certification badge alone',
    ],
    followUpDetails: [
      {
        question: 'Give one Trusted example.',
        answer:
          'Integration user with least privilege, encryption for sensitive fields, and audit logging on admin changes.',
      },
      {
        question: 'Give one Easy example.',
        answer:
          'Consistent Lightning page layouts, minimal clicks for common tasks, and documented admin processes.',
      },
      {
        question: 'Give one Adaptable example.',
        answer:
          'API-led integrations and modular Flow subflows so new product line does not require rewrite.',
      },
    ],
    architectNote:
      'Three pillars Trusted/Easy/Adaptable—easy mnemonic for junior architecture answers.',
  },
  {
    title: 'What is a data model and why design it early?',
    difficulty: 'BEGINNER',
    tags: ['data-model', 'erd'],
    scenario:
      'Users create three custom objects storing the same customer phone number. You explain data modeling basics.',
    answerPoints: [
      'Data model defines objects, fields, relationships, and cardinality for business entities',
      'Standard objects like Account, Contact, Opportunity should be leveraged before excessive custom objects',
      'Lookup vs master-detail affects sharing, deletion, and rollup capabilities',
      'Duplicate fields across objects cause sync nightmares in reporting',
      'Model with reporting and integration needs in mind from day one',
    ],
    followUpDetails: [
      {
        question: 'Lookup vs master-detail in one line?',
        answer:
          'Master-detail rolls up and deletes children with parent, stricter sharing. Lookup is looser optional relationship.',
      },
      {
        question: 'When create custom object vs use fields on Account?',
        answer:
          'Custom object when many related records of a type exist—Assets, Subscriptions. Fields on Account for single-valued attributes.',
      },
      {
        question: 'What is cardinality?',
        answer:
          'Relationship shape—one Account to many Contacts. Wrong cardinality breaks UI and integrations.',
      },
    ],
    architectNote:
      'Data model mistakes are expensive—say "reporting and integration" to justify early design.',
  },
  {
    title: 'What is role hierarchy and sharing in Salesforce?',
    difficulty: 'BEGINNER',
    tags: ['sharing', 'roles', 'security'],
    scenario:
      'Sales rep cannot see a peer\'s Opportunity but manager should. You explain basics of record access.',
    answerPoints: [
      'Organization-wide defaults (OWD) set baseline public read/write or private per object',
      'Role hierarchy grants upward access to records owned by subordinates',
      'Sharing rules grant exceptions for peers or public groups',
      'Manual sharing and teams add case-by-case access',
      'Most restrictive wins when multiple rules apply—test with real users',
    ],
    followUpDetails: [
      {
        question: 'Do profiles control record visibility?',
        answer:
          'Profiles control object and field permissions (can user access Opportunities at all). Sharing controls which records within that access.',
      },
      {
        question: 'What is private OWD?',
        answer:
          'Users see only their own records plus grants from hierarchy and sharing rules. Common for Opportunities.',
      },
      {
        question: 'How test sharing?',
        answer:
          'Login as test users in each role. Sharing button on record shows why user has access—Sharing Reason column.',
      },
    ],
    architectNote:
      'Profile = can access object; sharing = which rows. Junior security distinction interviewers love.',
  },
  {
    title: 'What is CI/CD for Salesforce?',
    difficulty: 'BEGINNER',
    tags: ['cicd', 'devops'],
    scenario:
      'Team deploys by copying Flow XML in production. You explain why CI/CD matters.',
    answerPoints: [
      'CI/CD automates build, test, and deployment of metadata from source control',
      'Developers commit to Git; pipelines validate tests and deploy to sandboxes then production',
      'Reduces manual Setup clicks and configuration drift between environments',
      'Tools include Salesforce CLI, GitHub Actions, Copado, Gearset, and others',
      'Requires discipline: scratch orgs or sandboxes, peer review, and rollback plan',
    ],
    followUpDetails: [
      {
        question: 'What is source-driven development?',
        answer:
          'Metadata lives in Git as truth; orgs are deployed targets. Opposite of org-first click-config only.',
      },
      {
        question: 'Do admins use Git?',
        answer:
          'Admins can with training on retrieval and pull requests for Flow changes. Hybrid teams common.',
      },
      {
        question: 'What blocks CI/CD adoption?',
        answer:
          'No test coverage, undeployed manual prod changes, and fear of automation. Start with sandbox pipeline first.',
      },
    ],
    architectNote:
      'CI/CD answer without tool fanboyism—process benefit first, tools second.',
  },
  {
    title: 'What are non-functional requirements (NFRs) on Salesforce projects?',
    difficulty: 'BEGINNER',
    tags: ['nfr', 'performance', 'scale'],
    scenario:
      'App works for 50 users but crawls at 5,000. You explain NFRs beginners overlook.',
    answerPoints: [
      'NFRs cover performance, availability, security, compliance, and maintainability—not just features',
      'Examples: page load under 3 seconds, 99.9% uptime integration, GDPR retention policy',
      'Governor limits and API caps are platform NFR constraints architects design around',
      'Document expected data volumes and concurrent users early',
      'Test NFRs in full sandbox with realistic data shape, not empty orgs',
    ],
    followUpDetails: [
      {
        question: 'What is LDV?',
        answer:
          'Large Data Volume—millions of records requiring selective queries, indexing, and async patterns. Changes design choices.',
      },
      {
        question: 'Who writes NFRs?',
        answer:
          'Architect with business and IT stakeholders. Developers implement; QA verifies with load tests where needed.',
      },
      {
        question: 'Example security NFR?',
        answer:
          'All PHI fields encrypted at rest; integration logs retain 90 days; SSO mandatory for internal users.',
      },
    ],
    architectNote:
      'Feature list without NFRs is half a design—say that calmly in architecture interviews.',
  },
  {
    title: 'What is an integration architecture diagram for Salesforce?',
    difficulty: 'BEGINNER',
    tags: ['integration-architecture', 'diagrams'],
    scenario:
      'Stakeholders confuse which system owns product master data. You draw a simple context diagram.',
    answerPoints: [
      'Shows systems as boxes—Salesforce, ERP, marketing, data warehouse—and arrows for data flow',
      'Labels sync direction, frequency, protocol REST/SOAP/events, and system of record per entity',
      'Highlights middleware if present instead of mesh of lines',
      'Identifies authentication method and error handling path',
      'One page diagram prevents six-month integration assumptions',
    ],
    followUpDetails: [
      {
        question: 'What is system of record?',
        answer:
          'Authoritative source for an entity—ERP for inventory, Salesforce for sales pipeline. Others subscribe, not duplicate master edits.',
      },
      {
        question: 'Bidirectional arrow always bad?',
        answer:
          'Not always but needs clear ownership rules per field to avoid update conflicts. Prefer unidirectional when possible.',
      },
      {
        question: 'What tool to draw?',
        answer:
          'Lucidchart, Miro, or even PowerPoint—tool matters less than agreed legend and maintained updates.',
      },
    ],
    architectNote:
      'System of record labels on diagrams—small detail, big clarity in reviews.',
  },
  {
    title: 'What is release management on Salesforce?',
    difficulty: 'BEGINNER',
    tags: ['release-management', 'governance'],
    scenario:
      'Two teams deploy conflicting Flows on the same object Friday afternoon. You explain release governance.',
    answerPoints: [
      'Release management schedules when changes promote sandbox → UAT → production',
      'Change advisory board reviews risk, dependencies, and rollback for major releases',
      'Salesforce seasonal releases require regression testing three times yearly',
      'Separate hotfix path for urgent fixes with lighter process but still documented',
      'Communication to users on downtime or behavior changes',
    ],
    followUpDetails: [
      {
        question: 'What is Salesforce seasonal release?',
        answer:
          'Platform upgrades Spring/Summer/Winter affecting all orgs. Admins review release notes and test critical automations.',
      },
      {
        question: 'Can you deploy during business hours?',
        answer:
          'Depends on change policy—low-risk metadata maybe yes; integration cutovers often off-hours with rollback ready.',
      },
      {
        question: 'What is deployment conflict?',
        answer:
          'Two changes touch same metadata—last deploy wins. Source control merge and coordination prevent overwrites.',
      },
    ],
    architectNote:
      'Mention seasonal releases—shows you know Salesforce is a living platform, not static app.',
  },
  {
    title: 'What is scalability for Salesforce applications?',
    difficulty: 'BEGINNER',
    tags: ['scalability', 'limits'],
    scenario:
      'Marketing campaign creates 500k Leads overnight. You discuss scalability at beginner level.',
    answerPoints: [
      'Scalability means system handles growing users, data, and transactions within platform limits',
      'Use async processing, bulk patterns, and indexed selective queries for volume spikes',
      'Archive or partition old data via Big Objects or external storage strategies when needed',
      'Integration throughput must respect API and Bulk limits with batching',
      'Load test critical paths before major campaigns or go-lives',
    ],
    followUpDetails: [
      {
        question: 'What is skinny table?',
        answer:
          'Platform optimization for custom field-heavy objects at scale—advanced topic but shows awareness for LDV interviews.',
      },
      {
        question: 'Does adding servers help Salesforce org?',
        answer:
          'Customers do not scale infrastructure—Salesforce multitenant platform scales within governor and org limits you design for.',
      },
      {
        question: 'First sign of scale problem?',
        answer:
          'Timeouts on reports, trigger failures on bulk loads, and API limit exhaustion. Monitor early.',
      },
    ],
    architectNote:
      'Scalability on Salesforce = design within limits + async + bulk—not buying bigger servers.',
  },
  {
    title: 'What is a center of excellence (CoE) for Salesforce?',
    difficulty: 'BEGINNER',
    tags: ['coe', 'governance'],
    scenario:
      'Every department builds its own Flows with no standards. Leadership asks about a Salesforce CoE.',
    answerPoints: [
      'CoE is a team governing standards, best practices, releases, and training across Salesforce',
      'Provides intake process for new projects and change requests',
      'Maintains architecture standards, naming conventions, and security baselines',
      'Coordinates release calendar and sandbox strategy',
      'Balances enablement with guardrails so business moves fast safely',
    ],
    followUpDetails: [
      {
        question: 'CoE vs IT only owning Salesforce?',
        answer:
          'CoE includes business admins and architects, not just IT ticket queue. Embedded admins from lines of business often participate.',
      },
      {
        question: 'What if CoE is too heavy?',
        answer:
          'Risk shadow IT in unmanaged orgs. Right-size governance to company scale—startup CoE differs from enterprise.',
      },
      {
        question: 'First CoE deliverable?',
        answer:
          'Often sandbox strategy, change request form, and automation standards doc. Quick wins build trust.',
      },
    ],
    architectNote:
      'CoE = speed with guardrails, not bureaucracy—frame it positively for business audiences.',
  },
];

const OMNISTUDIO_BEGINNER: TopicTemplate[] = [
  {
    title: 'What is Salesforce OmniStudio?',
    difficulty: 'BEGINNER',
    tags: ['omnistudio', 'basics', 'vlocity'],
    scenario:
      'A telecom client mentions FlexCards on their service console. You explain OmniStudio at a high level.',
    answerPoints: [
      'OmniStudio is a Salesforce toolkit for building guided experiences and industry UIs declaratively',
      'Originally from Vlocity; common in Communications, Insurance, and Financial Services clouds',
      'Core building blocks: OmniScripts, FlexCards, Integration Procedures, and DataRaptors',
      'Reduces custom LWC/Apex for repetitive wizard and data display patterns',
      'Runs on Salesforce platform with its own designer tools in Setup or OmniStudio app',
    ],
    followUpDetails: [
      {
        question: 'Is OmniStudio required for every Salesforce org?',
        answer:
          'No. It ships with certain industry clouds and licenses. Standard Sales Cloud projects may never use it.',
      },
      {
        question: 'Who builds OmniStudio artifacts?',
        answer:
          'OmniStudio developers or trained admins using designers—not typical declarative admin-only work without training.',
      },
      {
        question: 'OmniStudio vs Flow?',
        answer:
          'Flow is general Salesforce automation. OmniStudio targets rich industry UX, multi-step wizards, and heavy external data orchestration patterns.',
      },
    ],
    architectNote:
      'Tie OmniStudio to industry clouds—context prevents "it replaces all UI" overclaims.',
  },
  {
    title: 'What is an OmniScript?',
    difficulty: 'BEGINNER',
    tags: ['omniscript', 'wizard'],
    scenario:
      'Agents need a step-by-step form to quote a product with validations. You introduce OmniScripts.',
    answerPoints: [
      'OmniScript is a multi-step guided interaction built from reusable elements',
      'Steps include input fields, actions, blocks, and conditional branching',
      'Supports LWC-enabled styling and embedding in Experience Cloud or Lightning pages',
      'Versioned and activatable like other metadata',
      'Good for complex data collection wizards with integration calls between steps',
    ],
    followUpDetails: [
      {
        question: 'Can OmniScript replace all Flow screens?',
        answer:
          'Not necessarily—choose OmniScript for industry templates and heavy IP/DataRaptor patterns; Flow for simpler internal screens.',
      },
      {
        question: 'What is activation in OmniScript?',
        answer:
          'Published version becomes active for runtime. Draft versions allow testing before activation.',
      },
      {
        question: 'How handle validation?',
        answer:
          'Use element validation properties and conditional views. Server-side validation still required in Integration Procedures or Apex.',
      },
    ],
    architectNote:
      'OmniScript = guided wizard—compare to Flow Screen Flow with industry extras.',
  },
  {
    title: 'What is a FlexCard?',
    difficulty: 'BEGINNER',
    tags: ['flexcard', 'ui'],
    scenario:
      'Service console should show customer plan, usage, and open tickets in one compact panel. You mention FlexCards.',
    answerPoints: [
      'FlexCard is a declarative UI card displaying structured data with actions',
      'Composes from child cards, datatables, charts, and action menus',
      'Fetches data via DataRaptors or Integration Procedures',
      'Embeds in OmniScripts, Lightning pages, or Experience sites',
      'Updates dynamically based on context like Account Id without full page reload',
    ],
    followUpDetails: [
      {
        question: 'FlexCard vs LWC?',
        answer:
          'FlexCard faster for standard industry patterns with designers. LWC when you need fully custom UX outside OmniStudio patterns.',
      },
      {
        question: 'Can FlexCards launch OmniScripts?',
        answer:
          'Yes via actions—common pattern: card summary with button opening detailed wizard.',
      },
      {
        question: 'What is states in FlexCard?',
        answer:
          'Different visual layouts or data sets based on conditions—like showing overdue bill state vs paid state.',
      },
    ],
    architectNote:
      'FlexCard = console widget—use service agent console examples interviewers recognize.',
  },
  {
    title: 'What is a DataRaptor?',
    difficulty: 'BEGINNER',
    tags: ['dataraptor', 'etl'],
    scenario:
      'OmniScript must read Account and related Assets in one payload. You explain DataRaptors simply.',
    answerPoints: [
      'DataRaptor extracts, transforms, and loads Salesforce or JSON data declaratively',
      'Turbo Extract reads data; Transform maps fields; Load writes records',
      'Used heavily to prepare data for FlexCards and OmniScripts',
      'Alternative to Apex for many read/write mapping scenarios in OmniStudio',
      'Must be designed bulk-aware when used in list contexts',
    ],
    followUpDetails: [
      {
        question: 'DataRaptor vs SOQL in Apex?',
        answer:
          'DataRaptor configurable in designer without code; Apex better for complex algorithms outside mapping patterns.',
      },
      {
        question: 'What is Interface Type DataRaptor?',
        answer:
          'Combines extract and transform in one definition—common for feeding FlexCard datasets.',
      },
      {
        question: 'Common DataRaptor bug?',
        answer:
          'Wrong relationship path or missing filter—returns empty card. Test with preview and sample Ids.',
      },
    ],
    architectNote:
      'DataRaptor = declarative ETL in OmniStudio—three words enough for beginner tier.',
  },
  {
    title: 'What is an Integration Procedure (IP)?',
    difficulty: 'BEGINNER',
    tags: ['integration-procedure', 'orchestration'],
    scenario:
      'Quoting needs credit check API then Salesforce price lookup. You describe Integration Procedures.',
    answerPoints: [
      'Integration Procedure orchestrates DataRaptors, REST actions, and conditional logic server-side',
      'Callable from OmniScripts, FlexCards, and Apex',
      'Chains steps with caching and error handling in designer',
      'Keeps complex integration out of browser for security and performance',
      'Versioned metadata like other OmniStudio components',
    ],
    followUpDetails: [
      {
        question: 'IP vs Flow with callouts?',
        answer:
          'Similar orchestration role; IP optimized for OmniStudio stack and industry templates. Flow better outside OmniStudio contexts.',
      },
      {
        question: 'Can IP call external REST?',
        answer:
          'Yes via HTTP actions configured with named credentials or OmniStudio connection settings.',
      },
      {
        question: 'How debug IP failures?',
        answer:
          'Use debug logs in designer preview and check each step output. Verify DR mappings and HTTP status codes.',
      },
    ],
    architectNote:
      'IP = server-side orchestration for OmniStudio—pair with DataRaptor in every stack explanation.',
  },
  {
    title: 'How do OmniStudio components work together?',
    difficulty: 'BEGINNER',
    tags: ['architecture', 'omnistudio'],
    scenario:
      'Interviewer asks you to walk through a simple quote flow from UI to database.',
    answerPoints: [
      'FlexCard or page embed launches OmniScript wizard for user input',
      'OmniScript steps call Integration Procedures for business logic and external APIs',
      'Integration Procedures invoke DataRaptors to read/write Salesforce data',
      'Results render back in OmniScript or refresh FlexCard state',
      'Optional Apex/OmniStudio LWC for custom elements inside the script',
    ],
    followUpDetails: [
      {
        question: 'Where does validation live?',
        answer:
          'Client-side in OmniScript elements plus server-side in IP/DR and Salesforce validation rules. Never client only.',
      },
      {
        question: 'Can one IP serve multiple OmniScripts?',
        answer:
          'Yes—reuse IPs like shared services. Document inputs/outputs for maintainability.',
      },
      {
        question: 'What metadata deploys together?',
        answer:
          'OmniScripts depend on IPs and DRs—deploy related components in same package to avoid broken references.',
      },
    ],
    architectNote:
      'Walk the chain FlexCard → OmniScript → IP → DataRaptor—memorize that path.',
  },
  {
    title: 'What is OmniStudio versioning and activation?',
    difficulty: 'BEGINNER',
    tags: ['versioning', 'deployment'],
    scenario:
      'Production still runs old quote script after deploy. You explain versioning basics.',
    answerPoints: [
      'OmniStudio artifacts have version numbers with draft and active states',
      'Only active version runs in production user sessions',
      'Test new version in sandbox before activating in production',
      'Deactivate old version after cutover to avoid confusion',
      'Track changes in release notes for business training',
    ],
    followUpDetails: [
      {
        question: 'Can two versions be active?',
        answer:
          'Typically one active version per OmniScript type/name. Check org-specific OmniStudio rules during deploy.',
      },
      {
        question: 'What breaks on activation?',
        answer:
          'Missing dependency DR/IP references or changed required inputs. Run regression OmniScript test paths.',
      },
      {
        question: 'Rollback strategy?',
        answer:
          'Reactivate prior known-good version if new version fails—keep previous version until stable.',
      },
    ],
    architectNote:
      'Active vs draft trips up go-lives—mention activation explicitly in deploy answers.',
  },
  {
    title: 'When should you choose OmniStudio over standard Salesforce UI?',
    difficulty: 'BEGINNER',
    tags: ['decision', 'use-cases'],
    scenario:
      'Client on standard Sales Cloud asks for OmniStudio on every page. You give sensible guidance.',
    answerPoints: [
      'Choose OmniStudio when industry accelerators and IP/DR patterns already licensed and fit',
      'Complex multi-step quotes, claims, or service flows with external calls are sweet spots',
      'Standard Lightning record pages suffice for simple CRM CRUD',
      'Team must have OmniStudio skills—otherwise LWC/Flow may ship faster',
      'Total cost includes licenses, training, and specialized maintenance',
    ],
    followUpDetails: [
      {
        question: 'Can you mix OmniStudio and LWC?',
        answer:
          'Yes—custom LWC elements embed in OmniScripts. Hybrid common in mature programs.',
      },
      {
        question: 'Migration off OmniStudio easy?',
        answer:
          'Hard—deep IP/DR investment locks patterns. Decide early based on long-term industry cloud roadmap.',
      },
      {
        question: 'Proof of concept scope?',
        answer:
          'One OmniScript + one FlexCard + minimal IP/DR path proves team velocity before big bang.',
      },
    ],
    architectNote:
      'Right tool for right context—avoid OmniStudio everywhere zealotry in interviews.',
  },
  {
    title: 'What troubleshooting steps apply when a FlexCard shows no data?',
    difficulty: 'BEGINNER',
    tags: ['troubleshooting', 'flexcard'],
    scenario:
      'Agent console FlexCard is blank after release. You list first checks for a junior.',
    answerPoints: [
      'Verify context Id passed to card—AccountId or CaseId must match DataRaptor filter',
      'Preview DataRaptor in designer with same Id',
      'Check Integration Procedure wired in card data source completed without error',
      'Confirm active version of FlexCard and dependencies deployed to org',
      'Review user FLS—DataRaptor respects field access like queries',
    ],
    followUpDetails: [
      {
        question: 'Could caching cause stale blank?',
        answer:
          'OmniStudio caching may show old empty response. Clear cache in preview or disable cache temporarily while debugging.',
      },
      {
        question: 'Browser console errors help?',
        answer:
          'Yes for JavaScript issues in embedded LWC elements. Server DR errors appear in OmniStudio debug.',
      },
      {
        question: 'Works for admin not agent?',
        answer:
          'Classic sharing issue—agent profile lacks record access admin has. Test as user.',
      },
    ],
    architectNote:
      'Blank card checklist: context Id → DR preview → permissions. Same order every time.',
  },
  {
    title: 'What is an OmniStudio DataPack?',
    difficulty: 'BEGINNER',
    tags: ['datapack', 'deployment'],
    scenario:
      'Consultant exports OmniScript to move sandbox to production. You mention DataPacks.',
    answerPoints: [
      'DataPack bundles OmniStudio components and dependencies for export/import',
      'Used with OmniStudio CLI or migration tools for deployment pipelines',
      'Includes related DRs, IPs, and cards referenced by an OmniScript',
      'Reduces broken references compared to manual piecemeal copy',
      'Still requires merge discipline in Git like any metadata',
    ],
    followUpDetails: [
      {
        question: 'DataPack vs Salesforce change sets?',
        answer:
          'Change sets miss OmniStudio-specific dependency handling. DataPacks designed for OmniStudio graph.',
      },
      {
        question: 'Can DataPacks include data?',
        answer:
          'Primarily metadata. Reference data seeding separate—do not confuse with production record migration.',
      },
      {
        question: 'CI/CD with DataPacks?',
        answer:
          'Teams automate export from dev, commit JSON to Git, deploy via CLI to upper environments.',
      },
    ],
    architectNote:
      'DataPack = OmniStudio deployment unit—mention when interview shifts to DevOps.',
  },
  {
    title: 'What security considerations apply to OmniStudio?',
    difficulty: 'BEGINNER',
    tags: ['security', 'omnistudio'],
    scenario:
      'OmniScript calls external credit API with customer SSN. Security team asks about protection.',
    answerPoints: [
      'Store API secrets in Named Credentials or OmniStudio secured settings—not in scripts',
      'Run sensitive Integration Procedures server-side; never expose keys in browser',
      'Respect Salesforce sharing and FLS in DataRaptor extracts',
      'Log PII minimally; mask in FlexCard display where possible',
      'Profile and permission set control access to OmniScript actions',
    ],
    followUpDetails: [
      {
        question: 'Can guest users run OmniScripts on Experience Cloud?',
        answer:
          'Only if explicitly exposed with strict guest profile limits. Review every DR field exposed to guest.',
      },
      {
        question: 'HTTPS required for external calls?',
        answer:
          'Yes—never HTTP for production sensitive data. Validate certificates and timeout settings.',
      },
      {
        question: 'Who reviews OmniScript changes?',
        answer:
          'Security review for scripts touching PII or payments—same as Apex change control.',
      },
    ],
    architectNote:
      'OmniStudio security = Salesforce security + no secrets in client—dual message.',
  },
  {
    title: 'What skills should a beginner learn first in OmniStudio?',
    difficulty: 'BEGINNER',
    tags: ['learning', 'skills'],
    scenario:
      'You are assigned to an OmniStudio project with no prior Vlocity experience. You outline a learning path.',
    answerPoints: [
      'Learn OmniScript designer basics: elements, steps, conditional logic',
      'Practice DataRaptor Extract and Transform with sample Account data',
      'Build simple FlexCard fed by one DataRaptor before adding IPs',
      'Understand Integration Procedure step types and debug preview',
      'Complete Salesforce OmniStudio trail modules and replicate in scratch industry org if available',
    ],
    followUpDetails: [
      {
        question: 'Need Apex first?',
        answer:
          'Helpful but not day one—many patterns are declarative. Apex helps for custom LWCs inside scripts later.',
      },
      {
        question: 'Need industry cloud org?',
        answer:
          'Ideal for realistic templates. Some concepts learnable in demo orgs with OmniStudio enabled.',
      },
      {
        question: 'Common beginner mistake?',
        answer:
          'Building monolithic OmniScripts without reusable DR/IP building blocks—hard to maintain.',
      },
    ],
    architectNote:
      'Learning path: DR → FlexCard → OmniScript → IP. That order builds confidence incrementally.',
  },
];

const FSC_BEGINNER: TopicTemplate[] = [
  {
    title: 'What is Financial Services Cloud (FSC)?',
    difficulty: 'BEGINNER',
    tags: ['fsc', 'basics', 'financial-services'],
    scenario:
      'A bank evaluates Salesforce and mentions FSC. You explain what it adds over standard Sales Cloud.',
    answerPoints: [
      'FSC is Salesforce industry cloud for banking, wealth, and insurance client relationships',
      'Extends CRM with financial account objects, household model, and relationship maps',
      'Supports goals like client 360, referrals, and compliant client servicing workflows',
      'Includes industry data model instead of modeling everything with custom objects',
      'Often paired with Experience Cloud for client portals and advisor desktops',
    ],
    followUpDetails: [
      {
        question: 'Can you use FSC without Sales Cloud?',
        answer:
          'FSC builds on core Salesforce platform capabilities. Licensing bundles vary—confirm SKUs with account executive.',
      },
      {
        question: 'Who uses FSC daily?',
        answer:
          'Financial advisors, relationship managers, service reps, and compliance ops—not retail tellers unless configured.',
      },
      {
        question: 'FSC vs standard Account-Contact?',
        answer:
          'FSC adds Person Account patterns, Financial Accounts, Roles, and household grouping for wealth and banking contexts.',
      },
    ],
    architectNote:
      'FSC = CRM plus financial client model—one line orients non-industry interviewers.',
  },
  {
    title: 'What is a Household in FSC?',
    difficulty: 'BEGINNER',
    tags: ['household', 'relationships'],
    scenario:
      'Advisor serves a family with joint accounts and multiple contacts. You explain households.',
    answerPoints: [
      'Household groups related individuals and entities for unified relationship view',
      'Links spouses, dependents, and trusts to see total relationship value',
      'Rollups may show combined assets under management or policies',
      'Household record drives marketing and servicing at family level',
      'Distinct from standard Account hierarchy—industry-specific modeling',
    ],
    followUpDetails: [
      {
        question: 'Household vs Account hierarchy?',
        answer:
          'Account hierarchy is corporate B2B structure. Household is consumer/family grouping for wealth and personal banking.',
      },
      {
        question: 'Can one person be in multiple households?',
        answer:
          'Business rules vary—often primary household plus associations. Configure per firm policy.',
      },
      {
        question: 'Who creates households?',
        answer:
          'Advisors or operations during onboarding; automation from core banking integration may create/update.',
      },
    ],
    architectNote:
      'Household = family 360—use wealth management vocabulary in FSC answers.',
  },
  {
    title: 'What is a Financial Account in FSC?',
    difficulty: 'BEGINNER',
    tags: ['financial-account', 'holdings'],
    scenario:
      'Client has checking, brokerage, and mortgage products. You explain how FSC represents them.',
    answerPoints: [
      'Financial Account object represents a product holding—account, policy, loan, investment',
      'Linked to primary owner Contact or Account and optionally to Household',
      'Stores balances, status, product type, and external core system identifiers',
      'Different from Salesforce standard Account company record—naming confuses beginners',
      'Roll up to household or client view for advisor dashboard',
    ],
    followUpDetails: [
      {
        question: 'Financial Account vs Opportunity?',
        answer:
          'Opportunity is sales pipeline deal. Financial Account is booked product the client holds post-sale.',
      },
      {
        question: 'Where do balances come from?',
        answer:
          'Usually integration from core banking or portfolio system—not manual entry at scale.',
      },
      {
        question: 'Can advisors edit Financial Account fields?',
        answer:
          'Often read-only for integrated fields; editable for advisor notes or relationship tags per policy.',
      },
    ],
    architectNote:
      'Disambiguate Financial Account vs company Account—say it proactively in every FSC intro.',
  },
  {
    title: 'What is the Individual model in FSC?',
    difficulty: 'BEGINNER',
    tags: ['individual', 'person-account'],
    scenario:
      'Retail bank tracks personal clients not companies. You explain Individual vs Business accounts.',
    answerPoints: [
      'Individual represents a person client, often via Person Account pattern',
      'Business client uses standard Account for company with related Contact employees',
      'Individual links to Financial Accounts, interactions, and compliance records',
      'Identity and KYC data often stored on Individual or related objects',
      'Correct model choice affects sharing, integration keys, and portal login',
    ],
    followUpDetails: [
      {
        question: 'What is Person Account?',
        answer:
          'Combines Account and Contact for B2C—one record for person. Common enabler for Individual in FSC implementations.',
      },
      {
        question: 'Switch Business to Individual later?',
        answer:
          'Painful migration—decide B2B vs B2C model early with data architecture review.',
      },
      {
        question: 'How integrate Individual from core system?',
        answer:
          'Map core customer ID to Individual external ID; upsert on nightly batch or event.',
      },
    ],
    architectNote:
      'Person Account enablement is a project milestone—juniors who name it sound prepared.',
  },
  {
    title: 'What is a Financial Account Role?',
    difficulty: 'BEGINNER',
    tags: ['roles', 'joint-accounts'],
    scenario:
      'Joint brokerage account has primary owner and secondary owner. You explain roles.',
    answerPoints: [
      'Financial Account Role links Contact to Financial Account with role type',
      'Role types include Primary Owner, Joint Owner, Beneficiary, Power of Attorney',
      'Determines who appears on household views and who can act on account',
      'Integration from core system supplies role data—must stay in sync',
      'Compliance uses roles for authorized transactions and communication',
    ],
    followUpDetails: [
      {
        question: 'Role vs Account Contact Relationship?',
        answer:
          'FSC Financial Account Role is product-specific. ACR is general Contact-Account relationship—both may coexist with clear rules.',
      },
      {
        question: 'Missing role impact?',
        answer:
          'Advisor sees incomplete ownership picture; wrong client on statements or portal access.',
      },
      {
        question: 'Can roles change over time?',
        answer:
          'Yes—death, divorce, account changes. Integration must update roles, not only create once.',
      },
    ],
    architectNote:
      'Roles answer "who owns what product"—critical for joint account interview scenarios.',
  },
  {
    title: 'What is Interaction Summary in FSC?',
    difficulty: 'BEGINNER',
    tags: ['interactions', 'client-servicing'],
    scenario:
      'Advisor logs call about rollover IRA. Compliance needs audit trail. You mention interactions.',
    answerPoints: [
      'Interactions capture client meetings, calls, and servicing notes in structured records',
      'Link to Individual, Household, or Financial Account for context',
      'Support compliance retention and supervisor review workflows',
      'May integrate with telephony or email capture tools',
      'Better than free-text Activity when industry fields required',
    ],
    followUpDetails: [
      {
        question: 'Interaction vs Task?',
        answer:
          'Task is generic Salesforce activity. Interaction Summary adds FSC fields and compliance patterns for financial advice context.',
      },
      {
        question: 'Are interactions mandatory?',
        answer:
          'Many firms require them for advice conversations—policy driven with validation or QA sampling.',
      },
      {
        question: 'Can AI summarize calls into interactions?',
        answer:
          'Emerging pattern with Einstein/Agentforce—still needs human review in regulated advice scenarios.',
      },
    ],
    architectNote:
      'Interactions = compliance-friendly activity log—tie to audit when asked about advice.',
  },
  {
    title: 'What is Action Plan in FSC context?',
    difficulty: 'BEGINNER',
    tags: ['action-plans', 'onboarding'],
    scenario:
      'New client onboarding has 20 steps across teams. You explain Action Plans simply.',
    answerPoints: [
      'Action Plans template repeatable task lists for processes like onboarding or KYC refresh',
      'Tasks assign to roles with due dates and dependencies',
      'Standard Salesforce Action Plans feature used in FSC implementations',
      'Tracks completion for audit and operational metrics',
      'Reduces missed steps compared to ad hoc Tasks',
    ],
    followUpDetails: [
      {
        question: 'Action Plan vs OmniScript?',
        answer:
          'Action Plan tracks internal task completion. OmniScript is customer-facing wizard—they complement in onboarding.',
      },
      {
        question: 'Can templates vary by product?',
        answer:
          'Yes—different templates for wealth vs retail banking onboarding with conditional tasks.',
      },
      {
        question: 'Reporting on overdue tasks?',
        answer:
          'Standard report types on Action Plan Items show bottlenecks—ops managers use daily.',
      },
    ],
    architectNote:
      'Action Plans = checklist automation—relatable example for any regulated onboarding story.',
  },
  {
    title: 'What compliance topics come up in FSC projects?',
    difficulty: 'BEGINNER',
    tags: ['compliance', 'regulation'],
    scenario:
      'Wealth firm fears Salesforce stores data wrong for SEC audits. You list beginner compliance awareness.',
    answerPoints: [
      'Data retention and archival policies for client communications and advice records',
      'Segregation of duties—who can view vs trade vs approve',
      'PII and sensitive data encryption, masking, and field audit trail',
      'Marketing consent and Do Not Contact alignment across channels',
      'Integration logs proving data lineage from core systems',
    ],
    followUpDetails: [
      {
        question: 'Does FSC make firm automatically compliant?',
        answer:
          'No. FSC provides model and tools; firm configures policies, workflows, and integrations to meet regulations.',
      },
      {
        question: 'What is WORM storage need?',
        answer:
          'Some regulations require immutable records—may need external archive beyond standard Salesforce retention.',
      },
      {
        question: 'Who signs off compliance design?',
        answer:
          'Compliance and legal with architect input— not developers alone.',
      },
    ],
    architectNote:
      'FSC enables compliance; firm still owns policy—humble accurate junior answer.',
  },
  {
    title: 'How does FSC integrate with core banking or portfolio systems?',
    difficulty: 'BEGINNER',
    tags: ['integration', 'core-system'],
    scenario:
      'Balances must match core system nightly. You describe typical integration pattern at high level.',
    answerPoints: [
      'Core system remains system of record for balances and transactions',
      'Middleware or ETL syncs Financial Accounts and roles into Salesforce',
      'Use external IDs for idempotent upsert on account numbers',
      'Batch nightly common; intraday for high-value clients depending on API',
      'Reconciliation reports compare counts and sample balances',
    ],
    followUpDetails: [
      {
        question: 'Real-time trades in Salesforce?',
        answer:
          'Usually not executed in Salesforce—integration shows status after core processes trade.',
      },
      {
        question: 'What if sync fails?',
        answer:
          'Advisors see stale data—display as-of timestamp and alert ops. Never hide sync lag on balances.',
      },
      {
        question: 'MuleSoft role here?',
        answer:
          'Common orchestration layer between core mainframe/API and Salesforce FSC objects.',
      },
    ],
    architectNote:
      'Core owns money; Salesforce owns relationship—repeat that integration mantra.',
  },
  {
    title: 'What is Relationship Center in FSC?',
    difficulty: 'BEGINNER',
    tags: ['relationship-center', 'ui'],
    scenario:
      'Advisor wants visual map of client family and related accounts. You mention Relationship Center.',
    answerPoints: [
      'Relationship Center is FSC UI showing graph of people, households, and financial accounts',
      'Helps advisors see connections quickly during calls',
      'Powered by underlying relationship and role data quality',
      'Configurable which objects and cards appear',
      'Useless if integration did not populate roles and households correctly',
    ],
    followUpDetails: [
      {
        question: 'Relationship Center vs standard Account page?',
        answer:
          'Standard page is record-centric. Relationship Center is graph-centric for complex family wealth structures.',
      },
      {
        question: 'Can clients see Relationship Center?',
        answer:
          'No—internal advisor tool. Clients use Experience Cloud portal with different simplified views.',
      },
      {
        question: 'Performance with large families?',
        answer:
          'Many nodes slow render—limit depth or lazy load. Data model hygiene matters.',
      },
    ],
    architectNote:
      'UI only as good as relationship data—always tie Relationship Center to data quality.',
  },
  {
    title: 'What is a Referral in FSC workflows?',
    difficulty: 'BEGINNER',
    tags: ['referrals', 'sales'],
    scenario:
      'Retail banker refers customer to wealth advisor for investment product. You explain referral tracking.',
    answerPoints: [
      'Referrals capture handoff between lines of business with status tracking',
      'Link referring employee, client, and target product or advisor queue',
      'Metrics on conversion and SLA to contact referred client',
      'May trigger Action Plans or OmniScripts for follow-up',
      'Supports cross-sell governance in regulated banks',
    ],
    followUpDetails: [
      {
        question: 'Referral vs Lead?',
        answer:
          'Lead is generic prospect. Referral is warm internal handoff with known existing client context in FSC.',
      },
      {
        question: 'Compliance on referrals?',
        answer:
          'Some jurisdictions regulate incentives for referrals—track disclosures and eligibility in workflow.',
      },
      {
        question: 'Automate referral assignment?',
        answer:
          'Omni-Channel or assignment rules route to advisors by territory and capacity.',
      },
    ],
    architectNote:
      'Referral = internal warm intro—contrast with cold Lead to show FSC sales nuance.',
  },
  {
    title: 'What should a beginner study for an FSC interview?',
    difficulty: 'BEGINNER',
    tags: ['learning', 'interview-prep'],
    scenario:
      'You apply for FSC junior consultant role with only core Salesforce experience. You outline prep topics.',
    answerPoints: [
      'Learn FSC data model: Individual, Household, Financial Account, Roles',
      'Understand Person Accounts and how they differ from B2B Account-Contact',
      'Review one integration story—core to CRM sync with external IDs',
      'Know compliance basics: advice records, retention, consent—not legal detail',
      'Trailhead FSC fundamentals and demo org walkthrough if available',
    ],
    followUpDetails: [
      {
        question: 'Need Series 7 license for consulting role?',
        answer:
          'Not for most implementation roles—business knowledge helps but certification is employer-specific.',
      },
      {
        question: 'How explain FSC without industry experience?',
        answer:
          'Map to familiar CRM concepts plus "bank account holdings" metaphor. Honesty about learning curve is fine.',
      },
      {
        question: 'Related products to mention?',
        answer:
          'Experience Cloud for client portal, Marketing Cloud for consent, Data Cloud for unified client profile.',
      },
    ],
    architectNote:
      'Interview prep: model + integration + compliance awareness—three buckets, no jargon dump.',
  },
];

export const beginnerAgentforce = buildQuestionBank('agentforce', AGENTFORCE_BEGINNER);
export const beginnerDataCloud = buildQuestionBank('data-cloud', DATA_CLOUD_BEGINNER);
export const beginnerHeadless360 = buildQuestionBank('headless-360', HEADLESS_360_BEGINNER);
export const beginnerApex = buildQuestionBank('apex', APEX_BEGINNER);
export const beginnerLwc = buildQuestionBank('lwc', LWC_BEGINNER);
export const beginnerIntegration = buildQuestionBank('integration', INTEGRATION_BEGINNER);
export const beginnerArchitecture = buildQuestionBank('architecture', ARCHITECTURE_BEGINNER);
export const beginnerOmnistudio = buildQuestionBank('omnistudio', OMNISTUDIO_BEGINNER);
export const beginnerFsc = buildQuestionBank('fsc', FSC_BEGINNER);

export const BEGINNER_QUESTIONS = [
  ...beginnerAgentforce,
  ...beginnerDataCloud,
  ...beginnerHeadless360,
  ...beginnerApex,
  ...beginnerLwc,
  ...beginnerIntegration,
  ...beginnerArchitecture,
  ...beginnerOmnistudio,
  ...beginnerFsc,
];
