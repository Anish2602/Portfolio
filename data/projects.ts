export type Project = {
  name: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
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
