# AI-102 Study Notes

## Weightage of Domains:

- Plan and manage an Azure AI solution (15–20%)
- Implement content moderation solutions (10–15%)
- Implement computer vision solutions (15–20%)
- Implement natural language processing solutions (30–35%)
- Implement knowledge mining and document intelligence solutions (10–15%)
- Implement generative AI solutions (10–15%)

## General Concepts

### Responsible AI
- **Fairness:** Ensure AI models treat all groups of people fairly.
- **Inclusiveness:** Design AI systems that benefit everyone and respect human rights.
- **Reliability & Safety:** Develop AI that is safe, reliable, and resilient.
- **Privacy & Security:** Safeguard personal data and maintain user privacy.
- **Transparency:** Make AI decisions understandable and transparent.
- **Accountability:** Ensure that AI systems are accountable for their actions and decisions.

### Selecting the Right Azure AI Services
- **Azure Computer Vision**: Helps analyze images, detect objects, and extract text (OCR). I can use this for detecting image contents, generating image tags, and converting handwritten text into digital data. Good for visual content analysis.
- **Azure Language**: Excellent for natural language processing (NLP) tasks, such as sentiment analysis, key phrase extraction, and entity recognition. I should focus on this when working with textual data that requires interpretation.
- **Azure Speech Services**: Converts speech to text, text to speech, and supports speech translation in real-time. This will be useful in voice applications and AI assistants.
- **Azure OpenAI**: Use this for generating human-like text or images from prompts. It's great for natural language generation, summarization, or content creation.
- **Azure Document Intelligence**: Good for extracting structured information from forms, invoices, and documents. It can handle both standard and custom forms, streamlining the data extraction process.

## Azure Cognitive Services

### Vision Services

1.  **Computer Vision**
    -   **Image Analysis:** Analyzes images to extract information such as objects, faces, and text. It supports operations like smart cropping, generating image descriptions, and tagging images.
    -   **Source:** [Azure AI Vision](https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/overview)
2.  **Azure AI Face service**
    -   **Description:** Detects and recognizes human faces in images and videos. It can identify facial attributes like age, emotion, and head pose, as well as perform face matching and verification.
    -   **Source:** [Azure AI Face](https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/overview-identity)
3.  **Azure AI Document Intelligence**
    -   **Description:** Extracts text, key/value pairs, and tables from documents, such as receipts, invoices, and business cards. It allows you to build custom models to extract specific information.
    -   **Source:** [Azure AI Document Intelligence](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/faq?view=doc-intel-4.0.0)
4.  **Custom Vision**
    -   **Description:** Enables you to build custom image classifiers and object detectors. You can upload images, tag them, and train models to recognize specific objects or scenes.
    -   **Source:** [Custom Vision](https://learn.microsoft.com/en-us/azure/ai-services/custom-vision-service/overview)
5.  **Azure AI Video Indexer**
    -   **Description:** Extracts metadata and insights from video content, including face identification, text recognition, object detection, and scene segmentation.
    -   **Source:** [Azure AI Video Indexer](https://learn.microsoft.com/en-us/azure/azure-video-indexer/video-indexer-overview)

### Speech Services

1.  **Speech to Text**
    -   **Description:** Converts spoken language into written text, enabling transcription and real-time speech recognition.
    -   **Source:** [Azure Speech to Text](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/speech-to-text)
2.  **Text to Speech**
    -   **Description:** Converts written text into natural-sounding speech, using neural voices that mimic human speech patterns.
    -   **Source:** [Azure Text to Speech](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/text-to-speech)
3.  **Speech Translation**
    -   **Description:** Translates spoken language in real-time, providing both translated text and audio output in different languages.
    -   **Source:** [Azure Speech Translation](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/speech-translation)

### Language Services

1.  **Text Analytics**
    -   **Description:** Extracts insights from text, including sentiment analysis, key phrase extraction, named entity recognition, and language detection.
    -   **Source:** [Azure Text Analytics](https://learn.microsoft.com/en-us/azure/ai-services/text-analytics/overview)
2.  **Language Understanding (LUIS)**
    -   **Description:** Helps build natural language understanding into apps, bots, and IoT devices by allowing them to understand user intents and context. (LUIS will be retired on October 1st 2025 and starting April 1st 2023 you will not be able to create new LUIS resources. We recommend migrating your LUIS applications to conversational language understanding to benefit from continued product support and multilingual capabilities.)
    -   **Source:** [Azure LUIS](https://learn.microsoft.com/en-us/azure/ai-services/luis/what-is-luis)
3.  **Azure AI Translator**
    -   **Description:** Provides real-time text translation across multiple languages, supporting more than 60 languages for both standard and neural machine translation.
    -   **Source:** [Azure AI Translator](https://learn.microsoft.com/en-us/azure/ai-services/translator/translator-overview)

### Decision Services

1.  **Content Moderator**
    -   **Description:** Detects potentially offensive, risky, or unwanted content in text, images, and videos, providing automated moderation tools. Azure Content Moderator is deprecated as of February 2024 and will be retired by February 2027. It is replaced by [Azure AI Content Safety](https://learn.microsoft.com/en-us/azure/ai-services/content-safety/overview), which offers advanced AI features and enhanced performance.
    -   **Source:** [Azure Content Moderator](https://learn.microsoft.com/en-us/azure/ai-services/content-moderator/overview)

### Search Services

1.  **Azure AI Search**
    -   **Description:** Azure AI Search (formerly known as "Azure Cognitive Search") provides secure information retrieval at scale over user-owned content in traditional and generative AI search applications. Information retrieval is foundational to any app that surfaces text and vectors. Common scenarios include catalog or document search, data exploration, and increasingly chat-style apps over proprietary grounding data.
    -   **Source:** [Azure AI Search](https://learn.microsoft.com/en-us/azure/search/search-what-is-azure-search)

### Knowledge Services

1.  **QnA Maker**
    -   **Description:** Creates a question-and-answer layer over your data, enabling natural language processing to respond to user queries from existing content like FAQs, manuals, and documents. The QnA Maker service is being retired on the 31st of March, 2025. A newer version of the question and answering capability is now available as part of [Azure AI Language](https://learn.microsoft.com/en-us/azure/ai-services/language-service/).
    -   **Source:** [Azure QnA Maker](https://learn.microsoft.com/en-us/azure/ai-services/qnamaker/overview/overview)

### Other Key Concepts

1.  **Azure OpenAI**
    -   **Description:** Integrates powerful language models from OpenAI with Azure’s robust infrastructure, allowing you to implement advanced language understanding and generation capabilities. Azure OpenAI Service provides REST API access to OpenAI's powerful language models including GPT-4o, GPT-4 Turbo with Vision, GPT-4, GPT-3.5-Turbo, and Embeddings model series.
    -   **Source:** [Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/overview)

## Development and Deployment

-   **DevOps (CI/CD Pipeline)**
    -   **Description:** Practices for automating the integration, testing, and deployment of applications to streamline development and operational workflows.
    -   **Source:** [Azure DevOps](https://learn.microsoft.com/en-us/azure/devops/pipelines/get-started/what-is-azure-pipelines)
-   **APIs & SDKs**
    -   **Description:** Tools and libraries provided by Azure to help developers integrate various AI services into their applications easily.
    -   **Source:** [Azure AI SDKs](https://learn.microsoft.com/en-us/azure/ai-studio/how-to/develop/sdk-overview)
-   **Containers**
    -   **Description:** Use containers like Docker to package and deploy AI models, enabling scalable and flexible application development.
    -   **Source:** [Azure AI in Containers](https://learn.microsoft.com/en-us/training/modules/investigate-container-for-use-with-ai-services/)

## Evaluation Metrics

-   **Precision**
    -   **Description:** Measures the accuracy of the positive predictions made by the model (True Positives / (True Positives + False Positives)).
    -   **Source:** [Evaluation Metrics](https://learn.microsoft.com/en-us/azure/machine-learning/component-reference/evaluate-model?view=azureml-api-2)
-   **Recall**
    -   **Description:** Measures the ability of the model to find all relevant cases within a dataset (True Positives / (True Positives + False Negatives)).
    -   **Source:** [Evaluation Metrics](https://learn.microsoft.com/en-us/azure/machine-learning/component-reference/evaluate-model?view=azureml-api-2)
-   **F1 Score**
    -   **Description:** The harmonic mean of precision and recall, providing a balance between the two metrics (2 * (Precision * Recall) / (Precision + Recall)).
    -   **Source:** [Evaluation Metrics](https://learn.microsoft.com/en-us/azure/machine-learning/component-reference/evaluate-model?view=azureml-api-2)

## Common Scenarios

- **Image Analysis:** Using AI to analyze and understand the content of images.
- **Object Detection:** Identifying and locating objects within images.
- **Text Analysis:** Extracting meaningful insights from text data.
- **Language Translation:** Translating text or speech from one language to another.
- **Speech Recognition:** Converting spoken words into text.
- **Anomaly Detection:** Identifying unusual patterns or behaviors in data.
- **Form Processing:** Extracting data from forms and structured documents.
- **Bot Services:** Creating conversational agents to interact with users.

## Important Concepts to Keep in Mind

- Responsible AI: Ensure fairness, transparency, and accountability in AI models. I’ll have to focus on understanding how to align AI solutions with Microsoft's Responsible AI principles.
- Monitoring & Cost Management: Set up proper monitoring and diagnostic tools for Azure AI services. Monitoring includes tracking performance and diagnosing issues, while cost management ensures the AI solutions stay within budget.
