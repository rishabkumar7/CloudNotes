# Azure AI Apps and Agents Developer Associate

## <span id="index"></span>Index
* [Exam overview](#overview)
    + [Exam domains](#domains)
    + [If you are coming from AWS](#aws)
    + [Exam day tips](#exam-tips)
* [Plan and manage an Azure AI solution](#plan-manage)
    + [Foundry object model](#object-model)
    + [Choosing a model](#choosing-model)
    + [Deployment types](#deployment-types)
    + [Quotas, scale and cost](#quotas)
    + [Monitoring](#monitoring)
    + [Security](#security)
    + [Responsible AI](#responsible-ai)
* [Generative AI and agentic solutions](#genai-agents)
    + [RAG](#rag)
    + [Agent building blocks](#agent-blocks)
    + [Agent tools](#agent-tools)
    + [Multi-agent orchestration](#multi-agent)
    + [Code shape to recognize](#code-shape)
    + [Evaluations](#evaluations)
    + [Optimize and operationalize](#optimize)
* [Computer vision](#vision)
    + [Generate and edit](#generate-edit)
    + [Understand images and video](#understand-media)
    + [Azure Content Understanding](#content-understanding)
    + [Responsible AI for images](#rai-images)
* [Text analysis and speech](#text-speech)
    + [Text analysis](#text-analysis)
    + [Translation](#translation)
    + [Speech](#speech)
* [Information extraction](#info-extraction)
    + [Azure AI Search pipeline](#search-pipeline)
    + [Query types](#query-types)
    + [Multimodal ingestion](#multimodal-ingestion)
    + [Connect retrieval to agents](#retrieval-agents)
    + [Extract content from documents](#extract-docs)
* [If the question says X, pick Y](#x-pick-y)
* [Common traps](#traps)
* [Self-check questions](#self-check)
* [Resources](#resources)

## <span id="overview"></span>Exam overview
AI-103 is Foundry-first. More than half the score (55-65%) is planning/securing Foundry and building gen AI apps and agents, so most of the study time should go there.

- Pass mark is 700/1000.
- Questions are scenario-based, Python-flavored, and mostly on GA features (common preview features can appear).
- The shift from AI-102: stop thinking "which Cognitive Service?" and start thinking "which Foundry capability, model, or tool?"
- The old services now show up as __Foundry Tools__ (Language, Speech, Translator, Vision, Content Understanding, Document Intelligence) inside a Foundry resource + project.

### <span id="domains"></span>Exam domains

| Domain | Weight | What it covers |
| :--- | :--- | :--- |
| Plan and manage an Azure AI solution | 25-30% | Model/service choice, deployment types, quotas, security, responsible AI |
| Generative AI and agentic solutions | 30-35% | RAG, Foundry Agent Service, tools, multi-agent, evals, tracing |
| Computer vision | 10-15% | Image/video generation and editing, multimodal understanding, Content Understanding |
| Text analysis (incl. speech) | 10-15% | LLM extraction, Language, Translator, Speech |
| Information extraction | 10-15% | Azure AI Search, skillsets, Content Understanding for documents |

### <span id="aws"></span>If you are coming from AWS

| Azure / Foundry | Closest AWS mental model |
| :--- | :--- |
| Foundry resource + project | Bedrock account setup + a workspace boundary |
| Foundry Agent Service | Bedrock Agents / AgentCore Runtime |
| Foundry Tools catalog, MCP tool, OpenAPI tool | Action groups, AgentCore Gateway |
| Azure AI Search | OpenSearch / Kendra / Bedrock Knowledge Bases |
| Azure AI Content Safety, guardrails | Bedrock Guardrails |
| Content Understanding | Bedrock Data Automation |
| Foundry evaluations + tracing (App Insights) | Bedrock evaluations + AgentCore Observability |

### <span id="exam-tips"></span>Exam day tips
- Read the last sentence of the question first. It tells you what is being asked (cheapest, least effort, most secure).
- Flag the question and move on if it is taking more than 90 seconds.
- Case studies can't be revisited once you leave them.


## <span id="plan-manage"></span>Plan and manage an Azure AI solution
Most questions here are "pick the right option under a constraint" (cost, latency, residency, security). Know the object model, the deployment types, and the security defaults cold.

### <span id="object-model"></span>Foundry object model
- __Foundry resource__ (kind `AIServices`): The top-level Azure resource. Holds model deployments, Foundry Tools, networking, keys/identity.
- __Foundry project:__ The working boundary inside the resource. Holds agents, connections, evaluations, traces, files.
    + Apps connect with the project endpoint: `https://<resource>.services.ai.azure.com/api/projects/<project>`
    + Use `AIProjectClient` + `DefaultAzureCredential`
- __Connections:__ How a project reaches outside resources (Azure AI Search, Storage, Bing grounding, MCP servers, APIs).
    + Credentials live in the connection, not in code or prompts.

### <span id="choosing-model"></span>Choosing a model

| Need | Pick |
| :--- | :--- |
| General chat, strong reasoning, tool calling | Flagship LLM (GPT-4.1 / GPT-5 class) |
| Hard multistep reasoning, math, planning | Reasoning model (o-series / GPT-5 reasoning) |
| Cheap, fast, edge or offline, simple tasks | Small language model (Phi family, mini/nano variants); Foundry Local for on-device |
| Images + text in one call | Multimodal model (GPT-4o / 4.1 class) |
| Vectors for search | Embedding model (text-embedding-3-small/large) |
| Generate or edit images | gpt-image-1 class, FLUX |
| Generate video | Sora class |
| Low-latency voice conversation | Realtime / audio models, or Speech + LLM |
| Prebuilt task (translate, OCR, PII, STT) | A Foundry Tool, not an LLM |

- The smallest model that meets quality wins cost questions.
- A Foundry Tool beats a prompt when the task is standard and deterministic output matters.
- Model names change often. Where a model is named, treat it as "the current model of that class".

### <span id="deployment-types"></span>Deployment types

| Type | Use when |
| :--- | :--- |
| Global Standard | Default. Pay per token, highest quota, data may process in any Azure region |
| Data Zone Standard | Pay per token but processing must stay in the US or EU data zone |
| Standard (regional) | Processing must stay in one region |
| Provisioned (Global / Data Zone / Regional), PTUs | Predictable latency and throughput for steady high volume; reserved capacity |
| Global Batch / Data Zone Batch | Large async jobs, about 50% cheaper, results within 24 hours |
| Serverless API vs managed compute | Partner/open models: serverless = pay per token, managed compute = you pay for VMs |

### <span id="quotas"></span>Quotas, scale and cost
- Quota is __TPM__ (tokens per minute) and __RPM__ per model, per region, per subscription.
- Hitting the quota returns __HTTP 429__.
    + Honor the `retry-after` header
    + Use exponential backoff
- Scale beyond one deployment: more regions/deployments behind __Azure API Management__ as an AI gateway.
    + Load balancing
    + Token-limit policy
    + Token metrics
    + Semantic caching
- Provisioned can spill over to Standard.
- Cost levers:
    + Smaller model
    + Batch
    + Prompt caching
    + Shorter prompts / `max_tokens`
    + Semantic cache
    + PTU reservations for steady load

### <span id="monitoring"></span>Monitoring
- __Models/agents:__
    + Azure Monitor metrics (tokens, latency, 429s)
    + Application Insights tracing via OpenTelemetry
    + Foundry observability dashboards
    + Continuous evaluation on production traffic
- __Search:__
    + Indexer execution history and errors
    + Index size / document count
    + Query latency
    + Relevance testing

### <span id="security"></span>Security
- __Keyless:__ Microsoft Entra ID + managed identity, `DefaultAzureCredential`, disable local (key) auth. Keys only in Key Vault if you must.
- __RBAC:__ Least privilege.
    + A user/app role to call models and agents (Azure AI User / Cognitive Services OpenAI User)
    + A higher role to create deployments and manage the resource
    + Grant the Foundry managed identity roles on the AI Search and Storage it reads
- __Network:__ Private endpoints, disable public network access, VNet injection for agents.
- __Agent setup:__
    + __Basic__ = Microsoft-managed storage
    + __Standard__ = bring your own Cosmos DB (threads/conversations), Storage (files), AI Search (vectors)
    + Pick Standard for compliance, residency, or private networking
- __CI/CD:__ Azure Developer CLI (`azd`) + Bicep/Terraform, GitHub Actions or Azure DevOps. Run evaluations as a pipeline gate before promotion.

### <span id="responsible-ai"></span>Responsible AI
- __Content filters / guardrails:__ Applied to input __and__ output.
    + Harm categories: hate, sexual, violence, self-harm
    + Severity levels: safe, low, medium, high
- Add-ons:
    + __Prompt Shields__ = user jailbreaks + indirect/document attacks
    + Groundedness detection
    + Protected material (text and code)
    + Custom blocklists
    + PII detection
    + Task adherence for agents
- __Evaluators:__
    + Quality: groundedness, relevance, coherence, fluency, similarity, retrieval
    + Safety: harmful content, indirect attack, protected material, code vulnerability
    + Agent: intent resolution, tool call accuracy, task adherence
- __AI Red Teaming Agent__ (PyRIT) for adversarial testing.
- __Auditing:__ Trace logs, provenance metadata (C2PA content credentials on generated images), approval workflows.
- __Agent governance:__
    + Tool allow-lists
    + Per-tool auth
    + `require_approval="always"` on MCP tools
    + Human-in-the-loop for high-impact actions
    + Agent identity in Entra


## <span id="genai-agents"></span>Generative AI and agentic solutions
The biggest domain. If you only master one thing: which agent tool solves which problem, and how grounding (RAG) is wired into agents.

### <span id="rag"></span>RAG
- Ingest → chunk → embed → index (Azure AI Search)
- At query time, run __hybrid search__ (keyword + vector) + __semantic ranker__
- Put the top chunks in the prompt
- Answer with citations
- Evaluate groundedness
- __Agentic retrieval__ (Azure AI Search knowledge bases / Foundry IQ): Newer pattern where an LLM plans and runs subqueries for you. Use it for complex multi-part questions.

### <span id="agent-blocks"></span>Agent building blocks
- Agent = model + instructions (role, goal, constraints) + tools.
- Kinds of agents:
    + __Prompt agent:__ declarative, no code hosting
    + __Workflow:__ multi-step orchestration, visual or YAML
    + __Hosted agent:__ your containerized code (e.g., Microsoft Agent Framework or LangGraph)
- __Conversation state:__
    + New API uses conversations + Responses API
    + Classic API used thread → message → run
    + Classic agents are deprecated and retire March 31, 2027, but exam questions may still show thread/run code. Know both vocabularies.
- __Memory:__
    + Short-term = the conversation
    + Long-term = agent memory store (preview) or your own store (Cosmos DB)
    + Trim or summarize long histories to fit context
- __Tool schemas:__ Function tools are JSON Schema (name, description, parameters, required). Good descriptions drive correct tool selection.

### <span id="agent-tools"></span>Agent tools

| Scenario | Tool |
| :--- | :--- |
| Answer from a few uploaded files, zero infra | File Search (managed vector store) |
| Answer from an existing enterprise index | Azure AI Search tool (via project connection) |
| Current public info from the web | Grounding with Bing / Web search |
| Math, data analysis, charts, file transforms | Code Interpreter (sandboxed Python) |
| Call your own logic in your app process | Function calling (model returns a call; your code runs it and submits output) |
| Call an existing REST API with a spec | OpenAPI tool (anonymous, API key via connection, or managed identity) |
| Reuse a remote tool server | MCP tool (`server_label`, `server_url`, `require_approval`, connection for auth) |
| Low-code business workflow | Azure Logic Apps / Azure Functions |
| M365 docs or Fabric data | SharePoint tool / Fabric data agent |
| Multi-step web research report | Deep Research tool |
| Let a main agent delegate | Connected agents / A2A |

### <span id="multi-agent"></span>Multi-agent orchestration
- __Connected agents:__ An orchestrator agent calls specialist agents as tools. Simple delegation, no custom code.
- __Workflows / Microsoft Agent Framework patterns:__
    + Sequential
    + Concurrent (fan-out/fan-in)
    + Group chat
    + Handoff
    + Human-in-the-loop checkpoints
- Agent Framework is the successor to Semantic Kernel + AutoGen.
- __A2A__ protocol is for agents across platforms; __MCP__ is for tools.
- Safeguards for autonomy:
    + Approval steps before irreversible actions
    + Max iterations / turn limits
    + Tool allow-lists
    + Content filters on both input and output
    + Task adherence checks

### <span id="code-shape"></span>Code shape to recognize

```python
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

project = AIProjectClient(endpoint=PROJECT_ENDPOINT,
                          credential=DefaultAzureCredential())
# new API: define agent (model + instructions + tools),
# then call it through the OpenAI-compatible Responses API
# classic API: create_agent -> threads.create -> messages.create -> runs.create_and_process
```

- When code uses an API key where Entra would work, the "most secure" answer swaps in `DefaultAzureCredential`.

### <span id="evaluations"></span>Evaluations

| Question | Evaluator |
| :--- | :--- |
| Fabrication / hallucination | Groundedness (is the answer supported by retrieved context?) |
| Did retrieval work? | Retrieval / relevance |
| Is it well written? | Coherence, fluency |
| Agents | Intent resolution, tool call accuracy, task adherence |

- Run with the `azure-ai-evaluation` SDK or the Foundry portal, on a test dataset.
- Compare runs, wire into CI/CD, enable continuous evaluation in production.
- Error analysis = read the traces of failed cases.

### <span id="optimize"></span>Optimize and operationalize
- __Order of fixes:__ prompt engineering → RAG (knowledge gaps) → fine-tuning (style/format/behavior, or distill to a cheaper model)
- __Fine-tuning types:__ SFT, DPO (preference), RFT (reasoning models)
- __Parameters:__
    + `temperature` or `top_p` = change one, not both
    + Low temperature for extraction/factual, higher for creative
    + `max_tokens`, stop sequences, frequency/presence penalties
    + `reasoning_effort` on reasoning models
    + Structured outputs (JSON schema) for reliable JSON
- __Prompting:__ Clear system message, few-shot examples, delimiters, ask for citations, chain-of-thought for multistep tasks.
- __Reflection / self-critique:__ generate → critique (same or judge model) → revise, with a stop condition. LLM-as-judge is how evaluators work.
- __Observability:__ OpenTelemetry tracing to Application Insights. Spans per model call and tool call show token usage, latency breakdown, and safety signals.
- __Hybrid orchestration:__
    + Route by task (small model for classification, big model for reasoning)
    + Use a rules engine for deterministic compliance checks and the LLM for language


## <span id="vision"></span>Computer vision
Three buckets: generate/edit media, understand media with multimodal models or Content Understanding, and keep it safe.

### <span id="generate-edit"></span>Generate and edit
- __Images__ (gpt-image-1 class, FLUX):
    + Text-to-image
    + Image + reference images
    + Edits with a mask (__inpainting__): the transparent area of the mask PNG is what gets regenerated
    + Controls: size, quality, number of images, background (transparent), output format
- __Video__ (Sora class):
    + Text-to-video, image-to-video, and edit/remix an existing video
    + It is an async job: create job → poll status → download
    + Controls: resolution, duration, number of variants
- Generated media carries __C2PA content credentials__ (provenance metadata) so it can be identified as AI-generated.

### <span id="understand-media"></span>Understand images and video
- __Multimodal chat:__ Pass images as `image_url` (public URL or base64 data URI) in the message content.
    + `detail: low` = cheap, fast
    + `detail: high` = fine detail, more tokens
    + Multiple images in one message for comparison
- __Captions:__ Concise vs detailed is controlled by the prompt (and `max_tokens`).
- __Alt text:__
    + Short and functional (about one sentence, no "image of")
    + Decorative images get empty alt
    + Complex images (charts) get an extended description
- __Visual Q&A:__ Instruct the model to answer only from what is visible and say when it can't tell.
- __Locate objects/regions:__ Content Understanding or Azure AI Vision object detection give bounding boxes. Plain LLM chat is weaker at precise coordinates.

### <span id="content-understanding"></span>Azure Content Understanding
A Foundry Tool where you define an analyzer with a field schema (or use a prebuilt one) for documents, images, audio, or video.

- Returns structured fields + markdown, with confidence and grounding.
- __Video:__ segments, shot/scene detection, key frames, transcript, per-segment fields.

| Mode | Use when |
| :--- | :--- |
| Standard (single-task) | One file, one extraction |
| Pro | Multi-file, cross-document reasoning, can use reference data for validation; complex, multi-step extraction |

### <span id="rai-images"></span>Responsible AI for images
- Content filters apply to image inputs __and__ outputs (hate, sexual, violence, self-harm).
- __Indirect prompt injection via text in images__ (a photo containing "ignore previous instructions"):
    + Treat image text as untrusted data
    + Extract it with OCR and scan with Prompt Shields
    + Keep system instructions separate
    + Limit which tools the agent can call
- __Visual policy rules:__
    + Watermarks/provenance on generated media
    + Detect prohibited symbols or brand misuse with custom analyzer fields or custom categories
    + Block or route for human review


## <span id="text-speech"></span>Text analysis and speech
The recurring question is "LLM prompt or Foundry Tool?"

- Pick the __Tool__ for standard, repeatable, auditable tasks (PII redaction, sentiment at scale, document translation).
- Pick the __LLM__ for flexible schemas, nuance, and tone.

### <span id="text-analysis"></span>Text analysis
- __Structured JSON from an LLM:__ Use structured outputs (`response_format` with a JSON schema, strict) instead of "please return JSON". Low temperature for extraction.
- __Azure AI Language__ (Foundry Tool):
    + NER
    + PII detection and redaction
    + Key phrases
    + Sentiment + opinion mining
    + Language detection
    + Summarization
    + Custom NER/classification
    + Conversational language understanding (CLU)
    + Question answering
- __Safety and sensitive content:__ Azure AI Content Safety for harmful text; Language PII for personal data.
- __Domain customization__ (compliance summaries, domain extraction):
    + System prompt with glossary and rules
    + Few-shot examples
    + Output schema
    + Custom NER or fine-tuning if prompts aren't enough

### <span id="translation"></span>Translation

| Need | Pick |
| :--- | :--- |
| Translate strings in real time, many target languages in one call | Azure Translator text translation |
| Translate whole files, keep formatting | Translator document translation (async, Blob Storage source/target, managed identity) |
| Company terminology | Custom Translator (train on parallel data) or glossary |
| Tone, style, context-aware rewrites | LLM-powered translation flow |

### <span id="speech"></span>Speech
- __Speech to text:__
    + Real-time (streaming)
    + Fast transcription (synchronous, files)
    + Batch (large volumes, async)
    + Diarization for who-spoke-when
- __Accuracy on domain terms:__
    + __Phrase list__ first (no training, quick)
    + __Custom speech model__ (train with text and audio) when accents, noise, or vocabulary need more
- __Text to speech:__
    + Neural voices
    + __SSML__ controls pronunciation, pauses, rate, pitch, speaking style
    + Custom neural voice is limited access (approval needed)
- __Speech as an agent modality:__
    + Voice Live API (low-latency speech-to-speech, can front a Foundry agent)
    + Realtime audio models
    + The classic STT → agent → TTS pipeline
    + Handle barge-in and turn detection
- __Reasoning over audio:__ Audio-input models, or Content Understanding audio analyzers (transcript + extracted fields).
- __Speech translation:__ Speech service translation (speech to text/speech in target languages) or STT → LLM translate → TTS.


## <span id="info-extraction"></span>Information extraction
This is Azure AI Search plumbing plus Content Understanding for documents. Know the indexer pipeline order and the four query types.

### <span id="search-pipeline"></span>Azure AI Search pipeline
- __Data source:__ Blob, ADLS, SQL, Cosmos DB, SharePoint, etc.
- __Indexer:__ Pulls on a schedule, change and deletion detection, field mappings. Check execution history for errors/warnings.
- __Skillset__ (enrichment):
    + Built-in skills:
        * OCR
        * Image Analysis
        * Document Layout (layout-aware, markdown chunks)
        * Text Split (chunking)
        * Text Merge (put OCR text back into content)
        * Entity recognition, key phrases, language detection
        * Azure OpenAI Embedding
    + Custom skill: Web API skill (usually an Azure Function) with a fixed JSON input/output contract
- __Index:__
    + Fields with attributes: key, searchable, filterable, sortable, facetable, retrievable
    + Vector fields with dimensions matching the embedding model
    + Vector profile: HNSW for speed, exhaustive KNN for exact
- __Knowledge store__ (optional): Projections of enriched data to Blob/Table storage.
- __Integrated vectorization__ = chunking + embedding inside the indexer, and a vectorizer on the index so queries get embedded automatically. Pick it for "least code" RAG ingestion.

### <span id="query-types"></span>Query types

| Type | What it does | Choose when |
| :--- | :--- | :--- |
| Full-text (BM25) | Keyword matching | Exact terms, IDs, codes |
| Vector | Similarity on embeddings | Meaning, paraphrase, multilingual, images |
| Hybrid | Both, merged with Reciprocal Rank Fusion | Default best for RAG |
| Semantic ranker | Re-ranks top results with a language model; captions and answers | Best relevance; needs a semantic configuration |

- Best-practice RAG answer: __hybrid + semantic ranker__.
- Tune with chunk size/overlap, scoring profiles, filters (security trimming), and query rewriting.

### <span id="multimodal-ingestion"></span>Multimodal ingestion
- __Scanned PDFs/images:__ OCR skill (+ Text Merge) or Document Layout skill, or Content Understanding upstream.
- __Images as content:__ Image verbalization (caption with a multimodal model, embed the text) or multimodal embeddings.
- __Audio/video:__ Transcribe (Speech / Content Understanding), then index the text with timestamps.

### <span id="retrieval-agents"></span>Connect retrieval to agents
- Add the Azure AI Search tool to the agent via a project connection.
- Set:
    + Index
    + Query type (simple, vector, hybrid, semantic, hybrid + semantic)
    + top-k
    + Filter
- For multi-part questions use agentic retrieval / knowledge bases.

### <span id="extract-docs"></span>Extract content from documents
- __Content Understanding:__ Multimodal pipeline (OCR + layout + field extraction) driven by an analyzer schema. The AI-103 favorite.
    + Outputs markdown (clean for RAG and agents)
    + Outputs structured JSON fields with confidence and source grounding
- __Document Intelligence:__ Still valid when a prebuilt model matches exactly.
    + Prebuilt models: invoice, receipt, ID, layout, read
    + Custom template/neural models
- Low confidence on a field → route to human review.


## <span id="x-pick-y"></span>If the question says X, pick Y
Keywords in the question stem usually point straight at one answer. Read this the night before and the morning of.

| Question stem says | Answer is usually |
| :--- | :--- |
| "Data must stay in the EU/US" + pay per token | Data Zone Standard deployment |
| "Predictable latency", "consistent high throughput" | Provisioned (PTU) deployment |
| "Millions of docs overnight", "lowest cost", "not time-sensitive" | Global Batch |
| "429 Too Many Requests" | Retry with backoff + `retry-after`; raise quota; add deployments behind APIM |
| "Without storing keys", "most secure auth" | Managed identity + Entra ID (`DefaultAzureCredential`), disable local auth |
| "No public internet access" | Private endpoints + disable public network access (+ Standard agent setup with BYO resources) |
| "Agent answers from a few PDFs, least effort" | File Search tool |
| "Agent answers from existing enterprise index" | Azure AI Search tool |
| "Latest news", "current prices" | Grounding with Bing / web search tool |
| "Compute", "analyze a CSV", "make a chart" | Code Interpreter |
| "Existing REST API with OpenAPI 3 spec" | OpenAPI tool |
| "Reuse tools across agents via an open protocol" | MCP tool |
| "Human must approve before the action" | `require_approval` on the tool / approval step in the workflow |
| "Orchestrator delegates to specialist agents" | Connected agents (or a handoff/sequential workflow) |
| "Answer invents facts", "fabrication" | Groundedness evaluation + groundedness detection; improve retrieval |
| "User tries to jailbreak" | Prompt Shields (user prompt attacks) |
| "Malicious instructions hidden in a document/email/image" | Prompt Shields (indirect/document attacks); treat content as data |
| "Output reproduces song lyrics or licensed code" | Protected material detection |
| "Reliable JSON matching a schema" | Structured outputs (JSON schema) |
| "Deterministic, less creative output" | Lower temperature |
| "Best relevance for RAG" | Hybrid search + semantic ranker |
| "Least code to chunk and embed on ingest" | Integrated vectorization (Text Split + embedding skill + vectorizer) |
| "Scanned PDFs in the index" | OCR skill + Text Merge, or Document Layout skill |
| "Custom logic during indexing" | Custom Web API skill (Azure Function) |
| "Extract fields + markdown from docs/images/video for agents" | Content Understanding analyzer |
| "Cross-document reasoning, validate against reference data" | Content Understanding pro mode |
| "Edit only part of an image" | Image edit with a mask (inpainting) |
| "Redact PII at scale" | Azure AI Language PII detection |
| "Translate Word/PDF, keep formatting" | Translator document translation |
| "Speech misrecognizes product names" | Phrase list first, then custom speech |
| "Change pronunciation, pauses, voice style" | SSML |
| "Low-latency voice agent" | Voice Live API / realtime audio model |
| "Trace latency per tool call and token usage" | OpenTelemetry tracing to Application Insights |
| "Run evals automatically before deploy" | Evaluation step in CI/CD (GitHub Actions / Azure DevOps) |


## <span id="traps"></span>Common traps
- __Function calling does not run your code.__ The model returns the call; your app executes it and submits the output. The OpenAPI and MCP tools are the ones the service calls for you.
- __File Search vs Azure AI Search tool:__
    + File Search = you upload files, the service builds the vector store
    + AI Search tool = you already own and manage an index
- __Hybrid is not semantic.__ Hybrid = keyword + vector merged by RRF. Semantic ranker is a separate re-ranking layer on top.
- __Vector field dimensions__ must match the embedding model's output size. A mismatch breaks indexing.
- __Temperature and top_p:__ Tune one, not both.
- __Fine-tuning does not add fresh knowledge well.__
    + Knowledge gaps → RAG
    + Style/format/behavior → fine-tuning
- __Global Standard is not a residency answer.__ Residency → Data Zone or Regional.
- __API keys__ are never the "most secure" answer when managed identity is offered.
- __Content filters are not just output filters.__ They check prompts and completions. Prompt Shields handle jailbreaks and indirect attacks specifically.
- __Old names in answers:__ "Azure OpenAI Service", "Azure AI Studio", "hub-based project", "Cognitive Services" may appear.
    + Map them to Foundry resource/project/Tools
    + Prefer the Foundry-native option when both are listed


## <span id="self-check"></span>Self-check questions

| Question | Answer |
| :--- | :--- |
| Your agent must summarize incoming emails, and attackers embed instructions in email bodies. What detects it? | Prompt Shields, indirect (document) attack detection |
| You need 99th-percentile latency guarantees for a chat app with steady load. Deployment type? | Provisioned (PTU) |
| Agent must look up order status from your internal service that runs in your app process. Tool? | Function calling |
| RAG answers cite the wrong chunks. First fix? | Hybrid search + semantic ranker, then tune chunk size/overlap |
| Which evaluator measures whether answers are supported by retrieved context? | Groundedness |
| Agent threads and files must be stored in your own Cosmos DB and Storage accounts. Setup? | Standard agent setup (bring your own resources) |
| Extract invoice fields and a markdown version of each invoice for an agent, validating totals against a price list. | Content Understanding, pro mode with reference data |
| Replace the sky in a product photo but keep everything else. | Image edit with a mask (inpainting) |
| Call center STT keeps missing drug names; no training data yet. | Phrase list |
| A deployed agent is slow; you need to see which tool call takes longest. | Tracing (OpenTelemetry → Application Insights), inspect spans |
| Which Search query type merges BM25 and vector results? | Hybrid (Reciprocal Rank Fusion) |
| Least-code way to chunk and embed blobs during indexing? | Integrated vectorization |


## <span id="resources"></span>Resources
- [Microsoft study guide for Exam AI-103](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-103) (skills measured as of April 16, 2026)
- [Foundry Agent Service tool catalog](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/tool-catalog)
- [Foundry Agent Service tools overview (classic)](https://learn.microsoft.com/en-us/azure/foundry-classic/agents/how-to/tools-classic/overview)
- [What's new in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/whats-new-foundry)
- [Connect an Azure AI Search index to Foundry agents](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/ai-search)
