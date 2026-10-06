# Azure AI Apps and Agents Developer Associate

## Exam Overview

This part contains the general information about the exam e.g. the domains, their weightage and how the exam is different from the older AI-102.

-   Pass mark --- 700/1000
-   Question style --- Scenario-based, Python-flavored, and mostly on GA features (common preview features can appear)
-   Foundry-first --- More than half the score (55-65%) is planning/securing Foundry and building gen AI apps and agents, so most of the study time should go there
-   Shift from AI-102 --- Stop thinking "which Cognitive Service?" and start thinking "which Foundry capability, model, or tool?". The old services now show up as Foundry Tools (Language, Speech, Translator, Vision, Content Understanding, Document Intelligence) inside a Foundry resource + project.

### Exam domains:

-   Plan and manage an Azure AI solution (25-30%) --- Model/service choice, deployment types, quotas, security, responsible AI
-   Generative AI and agentic solutions (30-35%) --- RAG, Foundry Agent Service, tools, multi-agent, evals, tracing
-   Computer vision (10-15%) --- Image/video generation and editing, multimodal understanding, Content Understanding
-   Text analysis incl. speech (10-15%) --- LLM extraction, Language, Translator, Speech
-   Information extraction (10-15%) --- Azure AI Search, skillsets, Content Understanding for documents

### If you are coming from AWS:

-   Foundry resource + project --- Bedrock account setup + a workspace boundary
-   Foundry Agent Service --- Bedrock Agents / AgentCore Runtime
-   Foundry Tools catalog, MCP tool, OpenAPI tool --- Action groups, AgentCore Gateway
-   Azure AI Search --- OpenSearch / Kendra / Bedrock Knowledge Bases
-   Azure AI Content Safety, guardrails --- Bedrock Guardrails
-   Content Understanding --- Bedrock Data Automation
-   Foundry evaluations + tracing (App Insights) --- Bedrock evaluations + AgentCore Observability

### Exam day tips:

-   Read the last sentence of the question first, it tells you what is being asked e.g. cheapest, least effort, most secure
-   Flag the question and move on if it is taking more than 90 seconds
-   Case studies can't be revisited once you leave them

## Plan and manage an Azure AI solution

This part contains the Foundry object model, how to choose a model and deployment type, quotas, monitoring, security and responsible AI. Most questions here are "pick the right option under a constraint" e.g. cost, latency, data residency or security.

### Foundry object model:

-   Foundry resource (kind `AIServices`) --- The top-level Azure resource. It holds the model deployments, Foundry Tools, networking, keys/identity.
-   Foundry project --- The working boundary inside the resource. It holds agents, connections, evaluations, traces and files. Apps connect with the project endpoint (`https://<resource>.services.ai.azure.com/api/projects/<project>`) using `AIProjectClient` + `DefaultAzureCredential`.
-   Connections --- How a project reaches the outside resources e.g. Azure AI Search, Storage, Bing grounding, MCP servers, APIs. The credentials live in the connection, not in the code or the prompts.

### Choosing a model:

-   General chat, strong reasoning, tool calling --- Flagship LLM (GPT-4.1 / GPT-5 class)
-   Hard multistep reasoning, math, planning --- Reasoning model (o-series / GPT-5 reasoning)
-   Cheap, fast, edge or offline, simple tasks --- Small language model (Phi family, mini/nano variants). Foundry Local for on-device.
-   Images + text in one call --- Multimodal model (GPT-4o / 4.1 class)
-   Vectors for search --- Embedding model (text-embedding-3-small/large)
-   Generate or edit images --- gpt-image-1 class, FLUX
-   Generate video --- Sora class
-   Low-latency voice conversation --- Realtime / audio models, or Speech + LLM
-   Prebuilt task (translate, OCR, PII, STT) --- A Foundry Tool, not an LLM

Note: The smallest model that meets the quality wins the cost questions. A Foundry Tool beats a prompt when the task is standard and deterministic output matters.

Note: Model names change often, so where a model is named treat it as "the current model of that class".

### Deployment types:

-   Global Standard --- The default. Pay per token, highest quota, but the data may be processed in any Azure region.
-   Data Zone Standard --- Pay per token, but the processing must stay in the US or EU data zone
-   Standard (regional) --- The processing must stay in one region
-   Provisioned (Global / Data Zone / Regional) --- Reserved capacity with PTUs. Use it for predictable latency and throughput on steady high volume.
-   Global Batch / Data Zone Batch --- Large async jobs, about 50% cheaper, results within 24 hours
-   Serverless API vs Managed compute --- For partner/open models. Serverless is pay per token, with managed compute you pay for the VMs.

### Quotas, scale and cost:

-   Quota --- TPM (tokens per minute) and RPM per model, per region, per subscription
-   HTTP 429 --- This is what you get when you hit the quota. Honor the `retry-after` header and use exponential backoff.
-   Scaling beyond one deployment --- More regions/deployments behind Azure API Management as an AI gateway (load balancing, token-limit policy, token metrics, semantic caching). Provisioned can also spill over to Standard.
-   Cost levers --- Smaller model, Batch, prompt caching, shorter prompts/`max_tokens`, semantic cache, PTU reservations for steady load

### Monitoring:

-   Models and agents --- Azure Monitor metrics (tokens, latency, 429s), Application Insights tracing via OpenTelemetry, Foundry observability dashboards, continuous evaluation on production traffic
-   Search --- Indexer execution history and errors, index size/document count, query latency, relevance testing

### Security:

-   Keyless auth --- Microsoft Entra ID + managed identity, `DefaultAzureCredential`, and disable local (key) auth. Keys only in Key Vault if you really must.
-   RBAC --- Least privilege. A user/app role to call the models and agents (Azure AI User / Cognitive Services OpenAI User), and a higher role to create deployments and manage the resource. Also grant the Foundry managed identity roles on the AI Search and Storage it reads from.
-   Network --- Private endpoints, disable public network access, VNet injection for agents
-   Basic agent setup --- Microsoft-managed storage
-   Standard agent setup --- Bring your own Cosmos DB (threads/conversations), Storage (files) and AI Search (vectors). Pick Standard for compliance, data residency or private networking.
-   CI/CD --- Azure Developer CLI (`azd`) + Bicep/Terraform, GitHub Actions or Azure DevOps, and run evaluations as a pipeline gate before promotion

### Responsible AI:

-   Content filters / guardrails --- Harm categories are hate, sexual, violence and self-harm at severity levels (safe, low, medium, high). They are applied to both the input and the output.
-   Prompt Shields --- Detects user jailbreaks and indirect (document) attacks
-   Other add-ons --- Groundedness detection, protected material (text and code), custom blocklists, PII detection, task adherence for agents
-   Quality evaluators --- Groundedness, relevance, coherence, fluency, similarity, retrieval
-   Safety evaluators --- Harmful content, indirect attack, protected material, code vulnerability
-   Agent evaluators --- Intent resolution, tool call accuracy, task adherence
-   AI Red Teaming Agent --- Adversarial testing, built on PyRIT
-   Auditing --- Trace logs, provenance metadata (C2PA content credentials on generated images), approval workflows
-   Agent governance --- Tool allow-lists, per-tool auth, `require_approval="always"` on MCP tools, human-in-the-loop for high-impact actions, agent identity in Entra

## Generative AI and agentic solutions

This part contains RAG, the building blocks of an agent, the agent tools, multi-agent orchestration, evaluations and optimization. This is the biggest domain. If we can only master one thing, it should be which agent tool solves which problem, and how grounding (RAG) is wired into the agents.

### RAG:

-   Ingestion --- Ingest, chunk, embed and index the data in Azure AI Search
-   Query time --- Run hybrid search (keyword + vector) + semantic ranker, put the top chunks in the prompt, answer with citations
-   After --- Evaluate the groundedness
-   Agentic retrieval --- The newer pattern (Azure AI Search knowledge bases / Foundry IQ), where an LLM plans and runs the subqueries for you. Use it for complex multi-part questions.

### Agent building blocks:

-   Agent --- Model + instructions (role, goal, constraints) + tools
-   Prompt agent --- Declarative, no code hosting
-   Workflow --- Multi-step orchestration, visual or YAML
-   Hosted agent --- Your own containerized code e.g. Microsoft Agent Framework or LangGraph
-   Conversation state --- The new API uses conversations + Responses API. The classic API used thread → message → run. Classic agents are deprecated and retire on March 31, 2027, but the exam questions may still show thread/run code, so know both vocabularies.
-   Short-term memory --- The conversation itself
-   Long-term memory --- Agent memory store (preview) or your own store e.g. Cosmos DB. Trim or summarize long histories to fit the context.
-   Tool schemas --- Function tools are JSON Schema (name, description, parameters, required). Good descriptions drive the correct tool selection.

### Agent tools:

-   File Search --- Answer from a few uploaded files with zero infra. The service builds a managed vector store.
-   Azure AI Search tool --- Answer from an existing enterprise index, via a project connection
-   Grounding with Bing / Web search --- Current public info from the web
-   Code Interpreter --- Math, data analysis, charts, file transforms. It is sandboxed Python.
-   Function calling --- Call your own logic in your app process. The model returns a call, your code runs it and submits the output.
-   OpenAPI tool --- Call an existing REST API which has a spec. Auth can be anonymous, API key via connection, or managed identity.
-   MCP tool --- Reuse a remote tool server (`server_label`, `server_url`, `require_approval`, connection for auth)
-   Azure Logic Apps / Azure Functions --- Low-code business workflow
-   SharePoint tool / Fabric data agent --- M365 docs or Fabric data
-   Deep Research tool --- Multi-step web research report
-   Connected agents / A2A --- Let a main agent delegate to other agents

### Multi-agent orchestration:

-   Connected agents --- An orchestrator agent calls the specialist agents as tools. Simple delegation, no custom code.
-   Workflow patterns --- Sequential, concurrent (fan-out/fan-in), group chat, handoff, and human-in-the-loop checkpoints
-   Microsoft Agent Framework --- The successor to Semantic Kernel + AutoGen
-   A2A protocol --- For agents across platforms. MCP is for tools.
-   Safeguards for autonomy --- Approval steps before irreversible actions, max iterations/turn limits, tool allow-lists, content filters on both input and output, task adherence checks

### Code shape to recognize:

```
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

project = AIProjectClient(endpoint=PROJECT_ENDPOINT,
                          credential=DefaultAzureCredential())
# new API: define agent (model + instructions + tools),
# then call it through the OpenAI-compatible Responses API
# classic API: create_agent -> threads.create -> messages.create -> runs.create_and_process

```

Note: When the code uses an API key where Entra would work, the "most secure" answer swaps in `DefaultAzureCredential`.

### Evaluations:

-   Fabrication / hallucination --- Groundedness evaluator i.e. is the answer supported by the retrieved context?
-   Did the retrieval work? --- Retrieval / relevance evaluators
-   Is it well written? --- Coherence, fluency
-   Agents --- Intent resolution, tool call accuracy, task adherence
-   How to run --- With the `azure-ai-evaluation` SDK or the Foundry portal, on a test dataset. Compare the runs, wire it into CI/CD, and enable continuous evaluation in production.
-   Error analysis --- Read the traces of the failed cases

### Optimize and operationalize:

-   Order of fixes --- Prompt engineering → RAG (knowledge gaps) → fine-tuning (style/format/behavior, or distill to a cheaper model)
-   Fine-tuning types --- SFT, DPO (preference), RFT (reasoning models)
-   Temperature / top_p --- Change one, not both. Low temperature for extraction/factual, higher for creative.
-   Other parameters --- `max_tokens`, stop sequences, frequency/presence penalties, `reasoning_effort` on reasoning models
-   Structured outputs --- JSON schema, for reliable JSON
-   Prompting --- Clear system message, few-shot examples, delimiters, ask for citations, chain-of-thought for multistep tasks
-   Reflection / self-critique --- Generate → critique (same or judge model) → revise, with a stop condition. LLM-as-judge is how the evaluators work.
-   Observability --- OpenTelemetry tracing to Application Insights. The spans per model call and tool call show the token usage, latency breakdown and safety signals.
-   Hybrid orchestration --- Route by task e.g. small model for classification, big model for reasoning. Use a rules engine for the deterministic compliance checks and the LLM for language.

## Computer Vision

This part contains generating and editing images/video, understanding images and video with multimodal models or Content Understanding, and responsible AI for images.

### Generate and edit:

-   Images (gpt-image-1 class, FLUX) --- Text-to-image, image + reference images, and edits with a mask. Controls are size, quality, number of images, background (transparent) and output format.
-   Inpainting --- Editing with a mask. The transparent area of the mask PNG is what gets regenerated.
-   Video (Sora class) --- Text-to-video, image-to-video, and edit/remix of an existing video. Controls are resolution, duration and number of variants.
-   Video is an async job --- Create job → poll status → download
-   C2PA content credentials --- Provenance metadata on the generated media, so it can be identified as AI-generated

### Understand images and video:

-   Multimodal chat --- Pass the images as `image_url` (public URL or base64 data URI) in the message content. We can pass multiple images in one message for comparison.
-   Detail --- `low` is cheap and fast, `high` is for fine detail but uses more tokens
-   Captions --- Concise vs detailed is controlled by the prompt (and `max_tokens`)
-   Alt text --- Short and functional (about one sentence, no "image of"). Decorative images get empty alt, complex images e.g. charts get an extended description.
-   Visual Q&A --- Instruct the model to answer only from what is visible, and to say when it can't tell
-   Locating objects/regions --- Content Understanding or Azure AI Vision object detection give the bounding boxes. Plain LLM chat is weaker at precise coordinates.

### Azure Content Understanding:

-   It is a Foundry Tool where we define an analyzer with a field schema (or use a prebuilt one) for documents, images, audio or video
-   Returns structured fields + markdown, with confidence and grounding
-   Video --- Segments, shot/scene detection, key frames, transcript, per-segment fields
-   Standard (single-task) mode --- One file, one extraction
-   Pro mode --- Multi-file, cross-document reasoning, and can use reference data for validation. Use it for complex, multi-step extraction.

### Responsible AI for images:

-   Content filters --- Apply to the image inputs and outputs (hate, sexual, violence, self-harm)
-   Indirect prompt injection via text in images --- e.g. a photo containing "ignore previous instructions". Treat the image text as untrusted data, extract it with OCR and scan with Prompt Shields, keep the system instructions separate, and limit which tools the agent can call.
-   Visual policy rules --- Watermarks/provenance on generated media, detect prohibited symbols or brand misuse with custom analyzer fields or custom categories, then block or route for human review

## Text Analysis and Speech

This part contains text analysis, translation and speech. The recurring question is "LLM prompt or Foundry Tool?". Pick the Tool for standard, repeatable, auditable tasks e.g. PII redaction, sentiment at scale, document translation. Pick the LLM for flexible schemas, nuance and tone.

### Text analysis:

-   Structured JSON from an LLM --- Use structured outputs (`response_format` with a JSON schema, strict) instead of "please return JSON". Low temperature for extraction.
-   Azure AI Language (Foundry Tool) --- NER, PII detection and redaction, key phrases, sentiment + opinion mining, language detection, summarization, custom NER/classification, conversational language understanding (CLU), question answering
-   Safety and sensitive content --- Azure AI Content Safety for harmful text, Language PII for personal data
-   Domain customization --- System prompt with glossary and rules, few-shot examples, output schema. Custom NER or fine-tuning if the prompts aren't enough.

### Translation:

-   Azure Translator text translation --- Translate strings in real time, many target languages in one call
-   Translator document translation --- Translate whole files and keep the formatting. It is async, with Blob Storage as source/target and managed identity.
-   Custom Translator or glossary --- For company terminology. Custom Translator is trained on parallel data.
-   LLM-powered translation flow --- Tone, style, context-aware rewrites

### Speech:

-   Speech to text --- Real-time (streaming), fast transcription (synchronous, files), batch (large volumes, async)
-   Diarization --- Who spoke when
-   Phrase list --- First thing to try for accuracy on domain terms. No training, quick.
-   Custom speech model --- Trained with text and audio. Use it when accents, noise or vocabulary need more than a phrase list.
-   Text to speech --- Neural voices
-   SSML --- Controls pronunciation, pauses, rate, pitch, speaking style
-   Custom neural voice --- Limited access, approval is needed
-   Speech as an agent modality --- Voice Live API (low-latency speech-to-speech, can front a Foundry agent), realtime audio models, or the classic STT → agent → TTS pipeline. Handle barge-in and turn detection.
-   Reasoning over audio --- Audio-input models, or Content Understanding audio analyzers (transcript + extracted fields)
-   Speech translation --- Speech service translation (speech to text/speech in the target languages) or STT → LLM translate → TTS

## Information Extraction

This part contains the Azure AI Search plumbing plus Content Understanding for documents. Know the indexer pipeline order and the four query types.

### Azure AI Search pipeline:

-   Data source --- Blob, ADLS, SQL, Cosmos DB, SharePoint etc.
-   Indexer --- Pulls on a schedule, change and deletion detection, field mappings. Check the execution history for errors/warnings.
-   Skillset --- The enrichment step, made of built-in and custom skills
-   Index --- Fields with attributes (key, searchable, filterable, sortable, facetable, retrievable). Vector fields with dimensions matching the embedding model + a vector profile (HNSW for speed, exhaustive KNN for exact).
-   Knowledge store (optional) --- Projections of the enriched data to Blob/Table storage

### Skills:

-   Built-in skills --- OCR, Image Analysis, Document Layout (layout-aware, markdown chunks), Text Split (chunking), Text Merge (puts the OCR text back into the content), entity recognition, key phrases, language detection, Azure OpenAI Embedding
-   Custom skill --- Web API skill (usually an Azure Function) with a fixed JSON input/output contract
-   Integrated vectorization --- Chunking + embedding inside the indexer, and a vectorizer on the index so the queries get embedded automatically. Pick it for "least code" RAG ingestion.

### Query types:

-   Full-text (BM25) --- Keyword matching. Choose for exact terms, IDs, codes.
-   Vector --- Similarity on embeddings. Choose for meaning, paraphrase, multilingual, images.
-   Hybrid --- Both, merged with Reciprocal Rank Fusion (RRF). The default best for RAG.
-   Semantic ranker --- Re-ranks the top results with a language model, also gives captions and answers. Best relevance, but needs a semantic configuration.

Note: The best-practice RAG answer is hybrid + semantic ranker. Tune with chunk size/overlap, scoring profiles, filters (security trimming) and query rewriting.

### Multimodal ingestion:

-   Scanned PDFs/images --- OCR skill (+ Text Merge) or Document Layout skill, or Content Understanding upstream
-   Images as content --- Image verbalization (caption with a multimodal model, then embed the text) or multimodal embeddings
-   Audio/video --- Transcribe (Speech / Content Understanding), then index the text with timestamps

### Connect retrieval to agents:

-   Add the Azure AI Search tool to the agent via a project connection
-   Set the index, query type (simple, vector, hybrid, semantic, hybrid + semantic), top-k and filter
-   For multi-part questions use agentic retrieval / knowledge bases

### Extract content from documents:

-   Content Understanding --- Multimodal pipeline (OCR + layout + field extraction) driven by an analyzer schema. It outputs markdown (clean for RAG and agents) and structured JSON fields with confidence and source grounding. This is the AI-103 favorite.
-   Document Intelligence --- Prebuilt models (invoice, receipt, ID, layout, read) and custom template/neural models. Still valid when a prebuilt model matches exactly.
-   Low confidence on a field --- Route to human review

## If the question says X, pick Y

This part contains the keywords which usually point straight at one answer. Good to read the night before and the morning of the exam.

### Deployments, quota and security:

-   "Data must stay in the EU/US" + pay per token --- Data Zone Standard deployment
-   "Predictable latency", "consistent high throughput" --- Provisioned (PTU) deployment
-   "Millions of docs overnight", "lowest cost", "not time-sensitive" --- Global Batch
-   "429 Too Many Requests" --- Retry with backoff + `retry-after`, raise the quota, add deployments behind APIM
-   "Without storing keys", "most secure auth" --- Managed identity + Entra ID (`DefaultAzureCredential`), disable local auth
-   "No public internet access" --- Private endpoints + disable public network access (+ Standard agent setup with BYO resources)

### Agents and tools:

-   "Agent answers from a few PDFs, least effort" --- File Search tool
-   "Agent answers from existing enterprise index" --- Azure AI Search tool
-   "Latest news", "current prices" --- Grounding with Bing / web search tool
-   "Compute", "analyze a CSV", "make a chart" --- Code Interpreter
-   "Existing REST API with OpenAPI 3 spec" --- OpenAPI tool
-   "Reuse tools across agents via an open protocol" --- MCP tool
-   "Human must approve before the action" --- `require_approval` on the tool / approval step in the workflow
-   "Orchestrator delegates to specialist agents" --- Connected agents (or a handoff/sequential workflow)

### Safety, evals and output:

-   "Answer invents facts", "fabrication" --- Groundedness evaluation + groundedness detection, and improve the retrieval
-   "User tries to jailbreak" --- Prompt Shields (user prompt attacks)
-   "Malicious instructions hidden in a document/email/image" --- Prompt Shields (indirect/document attacks), treat the content as data
-   "Output reproduces song lyrics or licensed code" --- Protected material detection
-   "Reliable JSON matching a schema" --- Structured outputs (JSON schema)
-   "Deterministic, less creative output" --- Lower temperature
-   "Trace latency per tool call and token usage" --- OpenTelemetry tracing to Application Insights
-   "Run evals automatically before deploy" --- Evaluation step in CI/CD (GitHub Actions / Azure DevOps)

### Search and extraction:

-   "Best relevance for RAG" --- Hybrid search + semantic ranker
-   "Least code to chunk and embed on ingest" --- Integrated vectorization (Text Split + embedding skill + vectorizer)
-   "Scanned PDFs in the index" --- OCR skill + Text Merge, or Document Layout skill
-   "Custom logic during indexing" --- Custom Web API skill (Azure Function)
-   "Extract fields + markdown from docs/images/video for agents" --- Content Understanding analyzer
-   "Cross-document reasoning, validate against reference data" --- Content Understanding pro mode

### Vision, text and speech:

-   "Edit only part of an image" --- Image edit with a mask (inpainting)
-   "Redact PII at scale" --- Azure AI Language PII detection
-   "Translate Word/PDF, keep formatting" --- Translator document translation
-   "Speech misrecognizes product names" --- Phrase list first, then custom speech
-   "Change pronunciation, pauses, voice style" --- SSML
-   "Low-latency voice agent" --- Voice Live API / realtime audio model

## Common Traps

This part contains the things which are easy to mix up in the exam.

-   Function calling does not run your code --- The model returns the call, your app executes it and submits the output. The OpenAPI and MCP tools are the ones the service calls for you.
-   File Search vs Azure AI Search tool --- File Search is when you upload the files and the service builds the vector store. AI Search tool is when you already own and manage an index.
-   Hybrid is not semantic --- Hybrid is keyword + vector merged by RRF. Semantic ranker is a separate re-ranking layer on top.
-   Vector field dimensions --- Must match the embedding model's output size, a mismatch breaks the indexing
-   Temperature and top_p --- Tune one, not both
-   Fine-tuning does not add fresh knowledge well --- Knowledge gaps → RAG. Style/format/behavior → fine-tuning.
-   Global Standard is not a residency answer --- Residency → Data Zone or Regional
-   API keys --- Never the "most secure" answer when managed identity is offered
-   Content filters are not just output filters --- They check both the prompts and the completions. Prompt Shields handle the jailbreaks and indirect attacks specifically.
-   Old names in the answers --- "Azure OpenAI Service", "Azure AI Studio", "hub-based project", "Cognitive Services" may appear. Map them to Foundry resource/project/Tools, and prefer the Foundry-native option when both are listed.

## Self-check Questions

This part contains some quick questions to test yourself before the exam. The answer is after the arrow.

-   Your agent must summarize incoming emails, and attackers embed instructions in the email bodies. What detects it? → Prompt Shields, indirect (document) attack detection
-   You need 99th-percentile latency guarantees for a chat app with steady load. Deployment type? → Provisioned (PTU)
-   Agent must look up order status from your internal service that runs in your app process. Tool? → Function calling
-   RAG answers cite the wrong chunks. First fix? → Hybrid search + semantic ranker, then tune chunk size/overlap
-   Which evaluator measures whether the answers are supported by the retrieved context? → Groundedness
-   Agent threads and files must be stored in your own Cosmos DB and Storage accounts. Setup? → Standard agent setup (bring your own resources)
-   You must extract invoice fields and a markdown version of each invoice for an agent, validating the totals against a price list → Content Understanding, pro mode with reference data
-   Replace the sky in a product photo but keep everything else → Image edit with a mask (inpainting)
-   Call center STT keeps missing drug names, no training data yet → Phrase list
-   A deployed agent is slow, you need to see which tool call takes the longest → Tracing (OpenTelemetry → Application Insights), inspect the spans
-   Which Search query type merges BM25 and vector results? → Hybrid (Reciprocal Rank Fusion)
-   Least-code way to chunk and embed blobs during indexing? → Integrated vectorization

## Resources

-   [Microsoft study guide for Exam AI-103](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-103) (skills measured as of April 16, 2026)
-   [Foundry Agent Service tool catalog](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/tool-catalog)
-   [Foundry Agent Service tools overview (classic)](https://learn.microsoft.com/en-us/azure/foundry-classic/agents/how-to/tools-classic/overview)
-   [What's new in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/whats-new-foundry)
-   [Connect an Azure AI Search index to Foundry agents](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/ai-search)
