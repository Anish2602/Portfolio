export type SkillGroup = {
  label: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    skills: ["Python", "Java", "SQL", "C++"],
  },
  {
    label: "Backend & APIs",
    skills: [
      "Microservices",
      "REST API design",
      "FastAPI",
      "Flask",
      "OOP",
      "Design patterns",
    ],
  },
  {
    label: "Event-Driven & Async",
    skills: ["Kafka", "RabbitMQ", "Redis", "Event-driven architecture"],
  },
  {
    label: "Databases & Caching",
    skills: ["PostgreSQL", "MySQL", "Redis", "Qdrant (vector)"],
  },
  {
    label: "Cloud & DevOps",
    skills: [
      "AWS",
      "Azure",
      "Docker",
      "Kubernetes",
      "Azure DevOps",
      "Git",
      "CI/CD",
    ],
  },
  {
    label: "AI / ML Systems",
    skills: [
      "LLM inference",
      "Model serving",
      "Semantic search",
      "Hugging Face",
      "NVIDIA NIM",
    ],
  },
  {
    label: "Observability",
    skills: ["Prometheus", "Grafana", "Logging", "Monitoring"],
  },
  {
    label: "Security",
    skills: ["JWT", "OAuth", "Azure Key Vault", "HashiCorp Vault"],
  },
];
