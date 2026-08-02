import { about } from "@/data/about";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";

export function About() {
  return (
    <Section id="about" index="01" title="About">
      <div className="max-w-3xl space-y-4">
        {about.paragraphs.map((paragraph, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <p className="leading-relaxed text-muted-foreground">{paragraph}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
