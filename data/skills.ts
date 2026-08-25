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
    skills: [
      "Kafka",
      "RabbitMQ",
      "Redis",
      "Azure Event Hub",
      "Event-driven architecture",
    ],
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
      "AKS",
      "Azure Container Registry",
      "Azure DevOps",
      "Azure CLI",
      "ARM API",
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
    label: "Networking",
    skills: ["VNet", "Private Endpoints", "Private DNS", "VNet Integration"],
  },
  {
    label: "Observability",
    skills: [
      "Prometheus",
      "Grafana",
      "Azure Monitor",
      "Application Insights",
      "Log Analytics",
      "Logging",
      "Monitoring",
    ],
  },
  {
    label: "Security",
    skills: [
      "JWT",
      "OAuth",
      "TLS",
      "Azure Key Vault",
      "HashiCorp Vault",
      "CrowdStrike Falcon",
      "Azure App Registrations",
    ],
  },
];
