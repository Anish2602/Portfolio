export type Project = {
  name: string;
  tagline?: string;
  description: string;
  keyPoints?: string[];
  tech: string[];
  github?: string;
  live?: string;
  video?: string;
};

// The headline project — rendered as a large card above the featured grid.
export const flagshipProject: Project = {
  name: "Multi-Workspace AI Document Assistant",
  tagline: "RAG + LLM tool calling with strict workspace isolation",
  description:
    "A full-stack AI web app where users upload documents into separate workspaces and chat with an assistant that answers only from the active workspace's documents. Every answer is cited, it says \"I don't know\" when the documents don't cover something, and it can take actions through validated tool calls.",
  keyPoints: [
    "Multi-tenant RAG on one shared vector store: every workspace's chunks live in a single pgvector table, and isolation is enforced inside the SQL vector query, so one workspace can never retrieve another's content. Tests prove it.",
    "Grounded, cited answers: hybrid vector + keyword search fused with RRF, a relevance threshold calibrated on real data, server-checked citations, and honest \"I don't know\" refusals.",
    "Safe LLM tool calling: an agent loop that saves tasks, posts Discord notifications and runs multi-step searches, with schema-validated arguments, per-message limits, a full audit log, and resistance to prompt injection.",
    "Reliable by design: token streaming over SSE, automatic Gemini → Groq model fallback, questions saved before the AI is called so failed answers can be retried, and duplicate uploads ignored.",
    "Secure accounts: sign up with email and username, sign in with either. Passwords are hashed with argon2, and sessions use httpOnly JWT cookies.",
    "Observability: a per-workspace dashboard for latency, token usage, retrieval hit rate and tool success or failure, plus a retrieval-debug view showing exactly which passages an answer used.",
    "Production-ready: 80+ automated tests and GitHub Actions CI that builds and boots the production Docker image, deployed on Render + Neon entirely on free tiers.",
  ],
  tech: [
    "Python",
    "FastAPI",
    "React",
    "TypeScript",
    "PostgreSQL",
    "pgvector",
    "Gemini",
    "Groq",
    "RAG",
    "LLM Tool Calling",
    "Docker",
    "GitHub Actions",
    "Render",
  ],
  github: "https://github.com/Anish2602/multi-workspace-doc-assistant",
  live: "https://multi-workspace-doc-assistant-tder.onrender.com",
  video: "https://youtu.be/Rc-YCUEvTjQ",
};

export const featuredProjects: Project[] = [
  {
    name: "ATS Optimize — AI Resume Matchmaking Platform",
    description:
      "Full-stack platform that parses resumes and scores them against job descriptions using custom NLP — a recommendation/ranking engine producing keyword-match matrices and compatibility breakdowns. Deterministic AI rewriting module (proper-noun restoration, weakness detection) to improve output without hallucination. Full auth (JWT access/refresh in httpOnly cookies, Google OAuth, email verification) with cross-domain cookie/CORS handling.",
    tech: [
      "FastAPI",
      "React",
      "PostgreSQL",
      "JWT",
      "OAuth",
      "Vite",
      "Render",
      "Vercel",
    ],
    github: "https://github.com/Anish2602/ATS-checker",
  },
  {
    name: "AI Document Intelligence Platform",
    description:
      "Enterprise-style platform for ingestion, async processing, semantic (vector) search, and AI question answering. Chunking, embedding, metadata extraction, Qdrant vector search, audit logging, RBAC, and Dockerized deployment.",
    tech: ["FastAPI", "PostgreSQL", "Redis", "Docker", "Ollama", "Qdrant"],
    github: "https://github.com/Anish2602/ai-document-intelligence-platform",
  },
  {
    name: "Distributed Task Processing Platform",
    description:
      "Event-driven platform for async workloads with Kafka producers/consumers, retry handling, and fault-tolerant execution. Redis caching, PostgreSQL persistence, and Prometheus/Grafana monitoring with queue metrics.",
    tech: ["FastAPI", "Kafka", "Redis", "PostgreSQL", "Docker", "Grafana"],
    github: "https://github.com/Anish2602/Distributed-Task-Platform",
  },
  {
    name: "AI Personalized News Feed: Semantic Ranking & Recommendation Platform",
    description:
      "Personalized news platform with RSS ingestion, semantic deduplication (Qdrant), and a transparent multi-signal ranking engine (semantic, freshness, popularity, diversity, interest match). LLM-powered summarization and topic classification with graceful fallbacks, Redis-cached cursor pagination, async Celery workers, React frontend, and full CI/CD.",
    tech: ["FastAPI", "PostgreSQL", "Redis", "Celery", "Qdrant", "Docker", "React"],
    github: "https://github.com/Anish2602/ai-personalized-news-feed",
  },
];

// Secondary project cards, sourced from github.com/Anish2602 public repos.
// Edit this list to change which repos appear under "More on GitHub".
export const githubProjects: Project[] = [
  {
    name: "DNS Lookup CLI",
    description:
      "Python CLI for DNS record lookups, full iterative resolution tracing (root → TLD → authoritative), and CDN-vs-origin latency comparison.",
    tech: ["Python", "Networking", "DNS"],
    github: "https://github.com/Anish2602/DNS-Lookup-CLI",
  },
  {
    name: "Web Proxy Server",
    description:
      "Web proxy server built in Python, implementing domain blacklisting and request filtering at the proxy layer.",
    tech: ["Python", "Networking", "Proxy"],
    github: "https://github.com/Anish2602/Web-Proxy-Server",
  },
  {
    name: "Route Optimization for Logistics",
    description:
      "Optimization algorithms for efficient route planning using Starbucks data, enhancing delivery efficiency and reducing operational costs.",
    tech: ["Python", "Jupyter", "Optimization"],
    github:
      "https://github.com/Anish2602/Route-Optimization-for-Logistics-Handling",
  },
  {
    name: "Drought Prediction",
    description:
      "Machine learning models predicting drought conditions from weather and soil data.",
    tech: ["Python", "Jupyter", "ML"],
    github:
      "https://github.com/Anish2602/Drought-Prediction-using-Weather-and-Soil-data",
  },
  {
    name: "SENTANALYS",
    description:
      "Sentiment analysis experiments and models built in Jupyter notebooks.",
    tech: ["Python", "Jupyter", "NLP"],
    github: "https://github.com/Anish2602/SENTANALYS",
  },
  {
    name: "Endangered.io",
    description:
      "Web browsing website for endangered animals, birds, and sea creatures.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Anish2602/Endangered.io",
  },
];
