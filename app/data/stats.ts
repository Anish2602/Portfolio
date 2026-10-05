// Headline numbers shown under "About". Sourced from the Experience section.
export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: "~$1M", label: "Loop 1.0 annotation platform I built was acquired by a customer" },
  { value: "94", label: "Azure resources governance-tagged by script, zero failures" },
  { value: "6", label: "AKS clusters covered by my CrowdStrike Falcon runbooks" },
  { value: "57ms", label: "Production backend p95 latency, baselined before caching" },
];
