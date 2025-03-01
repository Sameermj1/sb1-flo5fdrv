import React from 'react';
import { Calendar, Home, Mail, Search, Clock, Cloud, Shield, Zap, Server, Database, Layers, Globe, BellRing, Brain, MessageSquare } from 'lucide-react';

// Create icon components without JSX
const createIcon = (Icon: any) => React.createElement(Icon, { className: "text-blue-400", size: 24 });

export const features = [
  {
    icon: createIcon(Calendar),
    title: "Calendar Management",
    description: "Intelligent scheduling and appointment management with contextual awareness.",
    capabilities: [
      "Create, modify, and cancel appointments",
      "Smart scheduling based on availability",
      "Meeting preparation and reminders",
      "Priority-based time management"
    ]
  },
  {
    icon: createIcon(Home),
    title: "Smart Home Control",
    description: "Seamless integration with smart home devices for voice-controlled automation.",
    capabilities: [
      "Lighting, temperature, and security control",
      "Scene creation and activation",
      "Energy usage optimization",
      "Presence-based automation"
    ]
  },
  {
    icon: createIcon(Globe),
    title: "Information Retrieval",
    description: "Real-time access to weather, news, traffic, and other information sources.",
    capabilities: [
      "Weather forecasts and alerts",
      "Personalized news briefings",
      "Traffic updates and route planning",
      "Sports scores and event updates"
    ]
  },
  {
    icon: createIcon(Mail),
    title: "Communication Management",
    description: "Email and message handling with priority filtering and smart responses.",
    capabilities: [
      "Email reading and composition",
      "Message prioritization",
      "Smart reply suggestions",
      "Contact management"
    ]
  },
  {
    icon: createIcon(BellRing),
    title: "Task Automation",
    description: "Proactive task management and automated reminders based on context.",
    capabilities: [
      "To-do list management",
      "Deadline tracking",
      "Recurring task automation",
      "Context-based reminders"
    ]
  },
  {
    icon: createIcon(Search),
    title: "Web Search & Synthesis",
    description: "Intelligent web searches with information synthesis and summarization.",
    capabilities: [
      "Natural language web queries",
      "Information extraction and summarization",
      "Multi-source fact verification",
      "Knowledge base integration"
    ]
  },
  {
    icon: createIcon(Brain),
    title: "Learning & Adaptation",
    description: "Continuous learning from user interactions to improve assistance quality.",
    capabilities: [
      "Preference learning",
      "Behavioral pattern recognition",
      "Feedback-based improvement",
      "Personalized recommendations"
    ]
  },
  {
    icon: createIcon(MessageSquare),
    title: "Conversational Interface",
    description: "Natural, context-aware conversations with multi-turn dialogue support.",
    capabilities: [
      "Context retention across conversations",
      "Natural language understanding",
      "Personality customization",
      "Multi-user recognition"
    ]
  },
  {
    icon: createIcon(Shield),
    title: "Privacy & Security",
    description: "Robust security measures with local processing for sensitive information.",
    capabilities: [
      "End-to-end encryption",
      "Local processing options",
      "Secure authentication",
      "Privacy controls and data management"
    ]
  }
];

export const implementationPhases = [
  {
    title: "Foundation & Architecture",
    duration: "3-4 months",
    description: "Establish the core architecture and basic voice processing capabilities.",
    tasks: [
      "Design system architecture",
      "Implement wake word detection",
      "Develop basic STT and TTS integration",
      "Create core NLP pipeline",
      "Set up development environment"
    ],
    deliverables: [
      "System architecture documentation",
      "Functional wake word detection",
      "Basic voice interaction prototype",
      "Initial NLP pipeline implementation",
      "Development environment setup"
    ]
  },
  {
    title: "Core Functionality Development",
    duration: "4-6 months",
    description: "Build essential voice assistant capabilities and service integrations.",
    tasks: [
      "Enhance NLU for intent recognition",
      "Implement context management",
      "Develop core service integrations",
      "Create conversation flow management",
      "Build user profile system"
    ],
    deliverables: [
      "Intent recognition system",
      "Context management framework",
      "API integration layer",
      "Conversation management system",
      "User profile database"
    ]
  },
  {
    title: "Feature Expansion",
    duration: "5-6 months",
    description: "Expand capabilities with advanced features and third-party integrations.",
    tasks: [
      "Implement calendar management",
      "Develop smart home integration",
      "Create information retrieval system",
      "Build email and messaging capabilities",
      "Implement task automation"
    ],
    deliverables: [
      "Calendar management module",
      "Smart home control interface",
      "Information retrieval system",
      "Email and messaging integration",
      "Task automation framework"
    ]
  },
  {
    title: "Intelligence & Learning",
    duration: "4-5 months",
    description: "Enhance the system with machine learning capabilities for continuous improvement.",
    tasks: [
      "Implement user behavior analysis",
      "Develop preference learning system",
      "Create proactive suggestion engine",
      "Build feedback processing system",
      "Integrate machine learning pipeline"
    ],
    deliverables: [
      "User behavior analysis module",
      "Preference learning system",
      "Proactive suggestion engine",
      "Feedback processing framework",
      "Machine learning integration"
    ]
  },
  {
    title: "Testing & Optimization",
    duration: "3-4 months",
    description: "Comprehensive testing, optimization, and performance tuning.",
    tasks: [
      "Conduct usability testing",
      "Perform security audits",
      "Optimize performance",
      "Enhance error handling",
      "Refine voice recognition accuracy"
    ],
    deliverables: [
      "Usability test results",
      "Security audit report",
      "Performance optimization documentation",
      "Error handling framework",
      "Improved voice recognition"
    ]
  },
  {
    title: "Deployment & Iteration",
    duration: "Ongoing",
    description: "Deploy the system and establish continuous improvement processes.",
    tasks: [
      "Prepare deployment infrastructure",
      "Create update mechanism",
      "Establish monitoring system",
      "Develop user feedback channels",
      "Plan feature roadmap"
    ],
    deliverables: [
      "Deployment infrastructure",
      "Update and versioning system",
      "Monitoring and analytics dashboard",
      "User feedback system",
      "Feature roadmap documentation"
    ]
  }
];

export const technologies = {
  "Voice Processing": [
    {
      name: "Mozilla DeepSpeech",
      description: "Open-source speech-to-text engine based on TensorFlow for local processing."
    },
    {
      name: "Amazon Polly",
      description: "Cloud-based text-to-speech service with natural-sounding voices."
    },
    {
      name: "Picovoice Porcupine",
      description: "On-device wake word detection with low resource requirements."
    },
    {
      name: "Kaldi",
      description: "Open-source speech recognition toolkit for custom voice models."
    }
  ],
  "Natural Language Processing": [
    {
      name: "Hugging Face Transformers",
      description: "State-of-the-art NLP models for understanding and generating text."
    },
    {
      name: "Rasa",
      description: "Open-source framework for contextual conversations and dialogue management."
    },
    {
      name: "spaCy",
      description: "Industrial-strength NLP library for entity recognition and text processing."
    },
    {
      name: "NLTK",
      description: "Natural Language Toolkit for text classification and analysis."
    }
  ],
  "Machine Learning": [
    {
      name: "TensorFlow",
      description: "Open-source machine learning framework for model training and deployment."
    },
    {
      name: "PyTorch",
      description: "Deep learning framework for research and production applications."
    },
    {
      name: "scikit-learn",
      description: "Machine learning library for classification, regression, and clustering."
    },
    {
      name: "MLflow",
      description: "Platform for managing the ML lifecycle, including experimentation and deployment."
    }
  ],
  "Backend & Infrastructure": [
    {
      name: "Node.js",
      description: "JavaScript runtime for building scalable server-side applications."
    },
    {
      name: "Python FastAPI",
      description: "Modern, fast web framework for building APIs with Python."
    },
    {
      name: "MongoDB",
      description: "NoSQL database for storing user profiles and conversation history."
    },
    {
      name: "Redis",
      description: "In-memory data structure store for caching and real-time operations."
    },
    {
      name: "Docker & Kubernetes",
      description: "Containerization and orchestration for scalable deployment."
    }
  ],
  "Integration & APIs": [
    {
      name: "Google Calendar API",
      description: "Integration for calendar management and scheduling."
    },
    {
      name: "Home Assistant",
      description: "Open-source home automation platform for smart home integration."
    },
    {
      name: "OpenWeatherMap API",
      description: "Weather data service for forecasts and current conditions."
    },
    {
      name: "Gmail API",
      description: "Email integration for reading and sending messages."
    },
    {
      name: "Twilio",
      description: "Communication APIs for SMS, voice, and messaging integration."
    }
  ],
  "Security & Privacy": [
    {
      name: "Auth0",
      description: "Authentication and authorization platform for secure user access."
    },
    {
      name: "Vault by HashiCorp",
      description: "Secrets management for securing API keys and sensitive data."
    },
    {
      name: "OpenID Connect",
      description: "Identity layer on top of OAuth 2.0 for authentication."
    },
    {
      name: "Differential Privacy",
      description: "Techniques for privacy-preserving machine learning and data analysis."
    }
  ]
};