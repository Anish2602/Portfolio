import { GraduationCap, Trophy } from "lucide-react";
import { achievements, education } from "@/data/education";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";

export function Education() {
  return (
    <Section id="education" index="05" title="Education & Achievements">
      <div className="grid gap-6 md:grid-cols-2">
        <Reveal>
          <Card className="h-full">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-accent" aria-hidden />
              <h3 className="font-semibold">{education.degree}</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {education.school}, {education.location}
            </p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {education.period} · {education.detail}
            </p>
          </Card>
        </Reveal>
        <Reveal delay={0.08}>
          <Card className="h-full">
            <div className="flex items-center gap-3">
              <Trophy className="h-5 w-5 text-accent" aria-hidden />
              <h3 className="font-semibold">Achievements</h3>
            </div>
            <ul className="mt-3 space-y-2">
              {achievements.map((achievement) => (
                <li
                  key={achievement}
                  className="flex gap-3 text-sm text-muted-foreground"
                >
                  <span className="font-mono text-accent" aria-hidden>
                    ▹
                  </span>
                  {achievement}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
