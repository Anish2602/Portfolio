// Q&A for the hero terminal's `interview` / `ask <n>` commands.
// Edit freely — answers render inside the terminal, so keep them concise.

export type InterviewQA = {
  q: string;
  a: string;
};

export const interviewQA: InterviewQA[] = [
  {
    q: "Tell me about yourself",
    a: "I'm Anish Kumar, an Application Engineer at Centific with a core strength in backend architecture and engineering — architecture design, codebase management, and scaling AI tooling into production systems.",
  },
  {
    q: "Why should we hire you?",
    a: "Not for any single technical skill — for how I reason about problems. Every fix in production has a blast radius: one change can domino through live features. I formulate solutions by isolating exactly where the issue lives, where the fix belongs, and ensuring it won't toggle any existing behavior.",
  },
  {
    q: "What's your proudest technical achievement?",
    a: "The very first project I worked on — built over ~3 months with a comparatively small team — was acquired by a customer in an ~$1M deal. Delivering that at the very start of my career set the bar for everything since.",
  },
  {
    q: "Describe the hardest production issue you've debugged.",
    a: "On the customer-success team I owned two inference pipelines for a client — PaddleOCR and Llama. Inference kept returning wrong output because the platform's processing backend could only fetch fixed model weights from RunPod, where the ML team hosted the models. I re-architected the weight-loading layer — restructured the folder architecture and made the backend dynamic — so it could fetch and run inference on any model weights directly from RunPod.",
  },
  {
    q: "What are you looking for in your next role?",
    a: "Deep-tech AI: AI architecture, backend structuring for models, dynamic model processing, and centralized model inferencing — a role where I keep learning the technologies emerging across the AI field.",
  },
  {
    q: "How do you approach designing a new system from scratch?",
    a: "Start by understanding the problem — and how it differs across the people facing it — until the root issue is clear. Then design the architecture, implement it on a small sample, test against industry-level data, let the team try to break it, fold in the feedback, and ship.",
  },
  {
    q: "What's your greatest strength as an engineer?",
    a: "In one line: the hunger to not sleep before the problem is solved.",
  },
  {
    q: "What are your salary expectations?",
    a: "Aligned with market standards — in the range of ₹16–20 LPA.",
  },
  {
    q: "How do you handle pressure or production incidents?",
    a: "I deliberately don't frame incidents as pressure. Treating them that way limits you to safe options; a calm, open mind keeps the broader solution space available. Stay clear-headed, think wide, fix the root cause.",
  },
  {
    q: "When can you start, and are you open to relocation/remote?",
    a: "I can start within one month of receiving the offer letter, and I'm open to both relocation and remote work.",
  },
];
