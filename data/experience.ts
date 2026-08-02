export type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  highlights: string[];
  tech?: string[];
  /** Path to a logo in /public, e.g. "/logos/centific.svg" */
  logo?: string;
  /** Intrinsic logo dimensions, used to preserve aspect ratio (default 24×24) */
  logoWidth?: number;
  logoHeight?: number;
};

export const experience: Experience[] = [
  {
    company: "Centific",
    role: "Associate Application Engineer",
    location: "Chennai, India",
    period: "Oct 2024 – Present",
    logo: "/logos/centific.svg",
    highlights: [
      "Designed and owned microservice-based backend APIs and PostgreSQL-backed services for Loop 1.0, an annotation platform later acquired by a customer in an ~$1M deal.",
      "Delivered customer-requested enhancements across REST API behavior, database operations, and service workflows, driving production issue resolution for a live, high-usage platform.",
      "Built event-driven microservices with Kafka, RabbitMQ, Redis, and PostgreSQL to decouple ingestion, async processing, caching, and operational storage.",
      "Implemented Redis caching to reduce latency and offload primary datastores under production traffic.",
      "Containerized services with Docker and deployed on Kubernetes, improving release consistency and reducing manual ops effort.",
      "Operated production systems with Prometheus, Grafana, and structured logging to improve reliability and incident response.",
      "Integrated AI capabilities into backend services — LLM inference (Llama 70B), computer vision (YOLOv8/v11, NVIDIA VILA & DINO NIM), document intelligence (PaddleOCR).",
      "Deployed GPU-backed model-serving workflows using Hugging Face, NVIDIA NGC, Azure, and RunPod.",
      "Secured configuration/secrets with JWT, OAuth, Azure Key Vault, HashiCorp Vault.",
    ],
    tech: [
      "Python",
      "FastAPI",
      "Kafka",
      "RabbitMQ",
      "Redis",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
      "Azure",
    ],
  },
  {
    company: "Movidu Tech.",
    role: "Data Analyst Intern",
    location: "Bengaluru, India",
    period: "Feb 2024 – Aug 2024",
    logo: "/logos/movidu.svg",
    highlights: [
      "Built Python ETL workflows (extraction, validation, transformation, structured storage) for large datasets.",
      "Developed logistics dashboards and optimized route-planning logic, surfacing operational exceptions for data-driven decisions.",
    ],
    tech: ["Python", "ETL", "Dashboards"],
  },
  {
    company: "Adoptev",
    role: "Web Development Intern",
    location: "Gurugram, India",
    period: "Jun 2022 – Jul 2022",
    logo: "/logos/adoptev.svg",
    logoWidth: 60,
    logoHeight: 24,
    highlights: [
      "Built responsive ReactJS + Tailwind components and debugged API integrations for cross-device workflow reliability.",
    ],
    tech: ["ReactJS", "Tailwind CSS"],
  },
];
