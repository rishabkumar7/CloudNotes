
# Google Cloud Generative AI Leader Certification Notes

These are my personal notes for the [Google Cloud Generative AI Leader Certification](https://cloud.google.com/learn/certification/generative-ai-leader), taken during following the Cloud Skills Boost Generative AI Leader path.

**Overview:**

- Fundamentals of Generative AI (~30%): Understanding basic concepts and definitions related to AI and ML.
- Google Cloud's Generative AI Offerings (~35%): Familiarity with Google Cloud tools and services that support generative AI.
- Techniques to Improve Model Output (~20%): Knowledge of methods to enhance the performance of generative AI models.
- Business Strategies for Successful Gen AI Solutions (~15%): Strategies for implementing generative AI in business settings.

**Helpful resources:**

-   [Exam Guide](https://services.google.com/fh/files/misc/generative_ai_leader_exam_guide_english.pdf)
-   [Google Cloud Skills Boost](https://www.cloudskillsboost.google/paths/1951)

## 1. Data and Machine Learning Fundamentals

### Data as the Foundation of AI

Data is the foundation of any AI system. **Data quality and accessibility are essential for effective AI development.**  
Data can be **structured** or **unstructured**, each requiring different analysis techniques.

Key dimensions of data quality:

-   Accuracy
    
-   Completeness
    
-   Consistency
    
-   Relevance
    
-   Availability
    
-   Cost
    
-   Format
    

> Understanding the types and quality of your data is crucial for successful AI initiatives.

----------

### Machine Learning Approaches

Machine learning models can be trained using:

-   **Supervised learning**
    
-   **Unsupervised learning**
    
-   **Reinforcement learning**
    

> The choice of approach depends on the specific task and the nature of the data available.

----------

### The ML Lifecycle

The ML lifecycle encompasses several key stages:

-   **Data ingestion and preparation**
    
-   **Model training**
    
-   **Model deployment**
    
-   **Model management**
    

> Google Cloud provides a comprehensive suite of tools to support each stage of this lifecycle.

**Vertex AI** helps with model training and deployment, while various data tools support ingestion, preparation, and management.

> By understanding and effectively managing this lifecycle, organizations can maximize the value of their initiatives and ensure long-term success.

----------

## 2. Model Development with Vertex AI

### Model Training

> The process of creating your ML model using data is called **model training**.

**Vertex AI** provides:

-   A managed environment for training ML models
    
-   Prebuilt containers for popular frameworks
    
-   Custom training jobs
    
-   Tools for model evaluation
    
-   Powerful computing resources to speed up training
    

----------

### Model Deployment

> Model deployment is the process of making a trained model available for use.

**Vertex AI** simplifies this with:

-   Tools to deploy models for generating predictions
    
-   Options to **scale deployments** by adjusting resources based on demand
    

----------

### Model Management

> Managing and maintaining your models over time is critical.

Google Cloud offers:

-   **Versioning**: Track different model versions
    
-   **Performance Tracking**: Monitor model metrics
    
-   **Drift Monitoring**: Watch for accuracy changes over time
    
-   **Data Management**: Use Vertex AI Feature Store to manage data features
    
-   **Storage**: Vertex AI Model Garden to organize models
    
-   **Automation**: Vertex AI Pipelines to automate ML tasks
    

----------

## 3. Foundation Models and Generative AI

Deep learning provides the core technology.  
**Foundation models** are powerful architectures built on deep learning.  
**Generative AI** is the application of these models to create new, original content.

----------

### Vertex AI for Generative AI

Vertex AI streamlines integration of advanced AI capabilities into business applications:

-   Seamless discovery, deployment, and customization
    
-   Access to many models without extensive in-house development
    

> These models empower businesses to enhance customer experiences, increase productivity, foster innovation, and improve decision-making.

----------

### Google-Developed Models on Vertex AI

-   **Gemini**: Multimodal; processes text, images, audio, and video.
    
-   **Gemma**: Lightweight, open models for local deployments and specialized AI applications.
    
-   **Imagen**: Text-to-image generation.
    
-   **Veo**: Video generation.
    

> Gemini is designed to handle multiple data types, while Gemma is optimized for lighter, specialized deployments.

----------

### Considerations for Choosing Generative AI Models

-   Modality
    
-   Context window
    
-   Security
    
-   Availability
    
-   Cost
    
-   Performance
    
-   Fine-tuning
    
-   Ease of integration
    

> Google Cloud offers a suite of foundation models with unique strengths and capabilities.

----------

## 4. Limitations of Foundation Models

### Common Limitations

-   **Data Dependency**
    
    > Performance depends on large, high-quality datasets. Biases or incompleteness in the data will seep into outputs.  
    > _Example: It's like asking a student to write an essay on a book they haven't read._
    
-   **Knowledge Cutoff**
    
    > AI models are only aware of information up to their training date.  
    > _Example: A model trained in 2022 won't know about events after 2022._
    
-   **Bias**
    
    > LLMs can amplify biases present in their training data.  
    > Even subtle biases can be magnified in outputs.
    
-   **Fairness**
    
    > Defining fairness is complex.  
    > Fairness assessments can miss some forms of bias.
    
-   **Hallucinations**
    
    > Models may produce plausible-sounding but incorrect or nonsensical answers.  
    > This is a major concern in accuracy-critical applications.
    
-   **Edge Cases**
    
    > Rare or unusual scenarios can reveal model weaknesses and lead to errors.
    

----------

## 5. Techniques to Overcome Limitations

### Grounding

> Connect the AI's output to verifiable sources—like giving AI a reality check.

Benefits:

-   Reduces hallucinations
    
-   Anchors responses in real data
    
-   Builds trust with citations and confidence scores
    

----------

### Retrieval-Augmented Generation (RAG)

-   **Retrieval**: Search engine finds relevant information using semantic understanding.
    
-   **Augmentation**: Retrieved data is added to the prompt.
    
-   **Generation**: The model uses this context to produce informed, accurate responses.
    

> RAG grounds outputs in real, verifiable sources, improving accuracy and relevance.

----------

### Prompt Engineering

> The most rapid, straightforward approach to guide models.

-   Involves crafting precise prompts
    
-   Limited by the model's existing knowledge
    

----------

### Fine-Tuning

> When prompting isn’t enough, fine-tuning adapts a model to specific needs.

-   Further trains a pre-trained model on task-specific data
    
-   Adjusts parameters for specialized performance
    

**Use Cases:**

-   Generating content in a specific style
    
-   Code generation in specific languages
    
-   Domain-specific translation
    

**Vertex AI** provides tooling to facilitate tuning.

----------

## 6. Humans in the Loop (HITL)

> Even the best models benefit from human oversight.

Key use cases:

-   **Content Moderation**: Ensures accurate, appropriate filtering of user-generated content.
    
-   **Sensitive Applications**: Provides oversight in healthcare, finance, etc.
    
-   **High-Risk Decisions**: Adds accountability for decisions with serious consequences.
    
-   **Pre-Generation Review**: Validates outputs before deployment.
    
-   **Post-Generation Review**: Continuous human feedback to improve models over time.
    

----------

## 7. Secure AI

> Preventing intentional harm to AI applications.

-   Protect AI systems from malicious attacks and misuse.
    
-   Ensure security throughout the entire lifecycle, from development through deployment.
    

Key risks:

-   Data poisoning
    
-   Model theft
    
-   Prompt injection
    

> Google Cloud's **SAIF framework** provides tools to help build and maintain secure AI systems.

----------

## 8. Responsible AI

> Ensuring AI avoids both intentional and unintentional harm.

----------

### Transparency

> Users need to know how their information is used and how AI systems work.

-   Includes data handling, decision-making processes, and potential biases.
    

----------

### Privacy

> Protecting privacy often involves anonymization or pseudonymization.

-   Prevents models from leaking sensitive information in their outputs.
    

----------

### Data Quality, Bias, and Fairness

> High-quality data is essential for ethical AI.

-   Poor data quality can lead to biased, unfair outcomes.
    
-   AI systems can amplify societal biases.
    

_Example: A resume-screening tool favoring certain demographics due to biased training data._

----------

### Accountability and Explainability

> Fairness requires accountability.

-   Know who is responsible for AI outputs.
    
-   Make AI decision-making transparent and understandable.
    

**Vertex Explainable AI** helps:

-   Debug errors
    
-   Uncover hidden biases
    
-   Build user trust
    

----------

### Legal Implications

> AI development is governed by evolving legal frameworks.

Key considerations:

-   Data privacy
    
-   Non-discrimination
    
-   Intellectual property
    
-   Product liability
    

> Legal compliance is essential for building trustworthy AI systems.

----------

## 9. Agents and Gen AI Applications

### What Can Agents Do?

> Gen AI agents process information, reason over complex concepts, and take action.

Applications include:

-   Customer service
    
-   Employee productivity
    
-   Creative tasks
    

----------

### Defining a Gen AI Agent

> An application that **observes** the world and **acts** on it using its tools to achieve goals.

Capabilities:

-   Understanding and responding to natural language
    
-   Automating complex tasks
    
-   Personalization
    

----------

### Agent Workflows

**Conversational Agents**

-   **Input**: User types or speaks
    
-   **Understand**: AI interprets meaning and intent
    
-   **Call Tool**: Searches web, accesses databases, triggers actions
    
-   **Generate Response**: Produces a relevant answer
    
-   **Deliver**: Provides the output
    

----------

**Workflow Agents**

-   **Input**: User triggers a task (form submission, upload, event)
    
-   **Understand**: Defines steps needed
    
-   **Call Tool**: Executes integrations, transformations
    
-   **Generate Result**: Compiles output
    
-   **Deliver**: Sends via email, dashboard, database
    

----------

### Advanced Prompt Engineering Frameworks

-   Rule-based calculations
    
-   Thought chains
    
-   Machine learning algorithms
    
-   Probabilistic reasoning
    

> Examples include **ReAct** and **Chain-of-Thought (CoT)**.

----------

## 10. Vertex AI MLOps Tools

> Manage the ML lifecycle with built-in tools.

-   **Feature Store**: Share and serve ML features consistently.
    
-   **Model Registry**: Track changes, manage versions.
    
-   **Model Evaluation**: Compare model performance.
    
-   **Workflow Orchestration**: Automate processes with Vertex AI Pipelines.
    
-   **Model Monitoring**: Detect performance degradation and drift.
    

----------

## 11. Building Models with Vertex AI

Two main options:

-   **Fully Custom**: Train at scale with any framework (PyTorch, TensorFlow, scikit-learn, XGBoost).
    
-   **AutoML**: Minimal effort, guided training.
    

----------

## 12. Gemini Nano

> Google's most efficient, compact AI model for edge deployment.

-   Designed for smartphones, embedded systems.
    
-   Runs locally for real-time responsiveness and data control.
    

**Tools:** Lite Runtime (LiteRT), Gemini Nano

----------

## 13. Gemini for Google Workspace

> Access Gemini's generative AI features within Gmail, Docs, Sheets, Meet, and Slides.

-   Features vary by Workspace plan.
    
-   [Learn more](https://support.google.com/a/answer/13623623)
    

----------

## 14. Prompting Techniques

-   **Zero-shot**: No prior examples.
    
-   **One-shot**: Single example.
    
-   **Few-shot**: Multiple examples to improve understanding.
    

----------

### Role Prompting

> Guide the model by assigning a persona.

Examples:

-   Business analyst
    
-   Shakespearean actor
    
-   Customer service agent
    

----------

### Prompt Chaining

> Create complex interactions where each prompt builds on the last.

----------

### Grounding

> Ensures outputs are based on verifiable, specific sources.

----------

### Retrieval-Augmented Generation (RAG)

-   Accesses external knowledge sources.
    
-   Produces more **accurate**, **relevant**, **transparent** outputs.
    
-   Cites sources used for generation.
    

----------

## 15. NotebookLM

> An AI-first notebook grounded in your own documents.

Capabilities:

-   Summarize findings
    
-   Identify connections and contradictions
    
-   Generate outlines and drafts
    
-   Answer questions about content
    

**Plus**: Adds capacity, customization, usage analytics.  
**Enterprise**: Extra privacy, compliance, IAM controls.

[Learn more](https://cloud.google.com/agentspace/notebooklm-enterprise/docs/overview)

----------

## 16. Sampling Parameters and Settings

-   **Token Count**: Controls conversation length.
    
-   **Temperature**: Controls randomness and creativity.
    
-   **Top-p**: Limits probability spread to most likely tokens.
    
-   **Safety Settings**: Filters harmful or inappropriate content.
    
-   **Output Length**: Defines maximum generated text length.
    

----------

## 17. Google AI Studio vs. Vertex AI Studio

| Feature  | Google AI Studio                 | Vertex AI Studio                       |
| -------- | -------------------------------- | -------------------------------------- |
| Audience | Experimenters, early-stage users | Developers building production systems |
| Features | Easy Gemini API access           | Advanced tools for the ML lifecycle    |

----------

## 18. Prompt Engineering Techniques

### ReAct Framework

> Combines **reasoning** and **action**.

Steps:

-   **Think**: Generate thoughts about the problem.
    
-   **Act**: Take actions (e.g., search the web).
    
-   **Observe**: Receive feedback.
    
-   **Respond**: Formulate an answer.
    

**Benefits:**

-   Dynamic problem-solving
    
-   Reduced hallucination
    
-   Increased trustworthiness
    

----------

### Chain-of-Thought (CoT) Prompting

> Guides the model through step-by-step reasoning.

**Benefits:**

-   Improved problem-solving
    
-   Better accuracy
    
-   Enhanced explainability
    

**Techniques:**

-   Self-consistency
    
-   Active prompting
    
-   Multimodal CoT
    

----------

## 19. Reasoning Loop with Tools

**ReAct Cycle:**

1.  **Reasoning (Tool Selection)**
    
2.  **Acting (Tool Execution)**
    
3.  **Observation**
    
4.  **Iteration**
    

----------

## 20. How RAG Works with Tools

-   **Retrieval**:
    
    -   Data stores
        
    -   Vector databases
        
    -   Search engines
        
    -   Knowledge graphs
        
-   **Augmentation**:
    
    -   Incorporate retrieved info into the prompt.
        
-   **Generation**:
    
    -   Produce an informed, accurate response.
        

----------

## 21. Conversational Agents and Playbooks

> Define step-by-step behaviors using linked external tools and data stores.

----------

## 22. Metaprompting

> Enables dynamic, adaptable prompt creation and interpretation.

----------

## 23. Agentspace

> Centralized platform to manage AI agents using company data.

-   Integrates with internal websites and dashboards.
    
-   Acts as personal research assistants for employees.
    

**Agentspace vs. NotebookLM**

| Feature     | NotebookLM                             | Agentspace                             |
| ----------- | -------------------------------------- | -------------------------------------- |
| Purpose     | Deep dive into specific documents      | Enterprise AI assistant across systems |
| Scope       | Only user-provided sources             | All connected business systems         |
| Integration | Can connect with NotebookLM Enterprise | Unified search and automation          |

**Additional Helpful Resources:**

-   [Google Cloud Skills Boost - Intro to Gen AI](https://www.cloudskillsboost.google/paths/118)
-   [Google Cloud Generative AI Leader Study Guide](https://services.google.com/fh/files/misc/generative_ai_leader_study_guide_english.pdf)
