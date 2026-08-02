import Image from "next/image";
import { experience } from "@/data/experience";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function Experience() {
  return (
    <Section id="experience" index="02" title="Experience">
      <ol className="relative space-y-8 border-l border-border pl-6 sm:pl-8">
        {experience.map((job, i) => (
          <li key={job.company} className="relative">
            <span
              className="absolute -left-[31px] top-2 h-2.5 w-2.5 rounded-full bg-accent sm:-left-[39px]"
              aria-hidden
            />
            <Reveal delay={i * 0.08}>
              <Card>
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                  <h3 className="flex items-center gap-3 text-lg font-semibold">
                    {job.logo && (
                      <span className="flex h-9 min-w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background px-1.5">
                        <Image
                          src={job.logo}
                          alt={`${job.company} logo`}
                          width={job.logoWidth ?? 24}
                          height={job.logoHeight ?? 24}
                          className="h-6 w-auto"
                        />
                      </span>
                    )}
                    <span>
                      {job.company}{" "}
                      <span className="text-muted-foreground">—</span>{" "}
                      <span className="text-accent">{job.role}</span>
                    </span>
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground">
                    {job.location} · {job.period}
                  </p>
                </div>
                <ul className="mt-4 space-y-2">
                  {job.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-1 font-mono text-accent" aria-hidden>
                        ▹
                      </span>
                      {highlight}
                    </li>
                  ))}
                </ul>
                {job.tech && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.tech.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                )}
              </Card>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
