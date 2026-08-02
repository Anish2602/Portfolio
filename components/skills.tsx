import { skillGroups } from "@/data/skills";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";

export function Skills() {
  return (
    <Section id="skills" index="04" title="Skills">
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {skillGroups.map((group, i) => (
          <Reveal key={group.label} delay={(i % 2) * 0.08}>
            <h3 className="font-mono text-sm text-accent">{group.label}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <Badge key={skill} className="text-foreground/80">
                  {skill}
                </Badge>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
