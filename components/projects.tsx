import { ExternalLink, Github, PlayCircle } from "lucide-react";
import {
  featuredProjects,
  flagshipProject,
  githubProjects,
} from "@/data/projects";
import { site } from "@/data/site";
import { GlowCard } from "@/components/glow-card";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function ProjectLinks({
  github,
  live,
  video,
  name,
}: {
  github?: string;
  live?: string;
  video?: string;
  name: string;
}) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} on GitHub`}
          className="rounded-md p-2 text-muted-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Github className="h-5 w-5" aria-hidden />
        </a>
      )}
      {video && (
        <a
          href={video}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} demo video`}
          className="rounded-md p-2 text-muted-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <PlayCircle className="h-5 w-5" aria-hidden />
        </a>
      )}
      {live && (
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} live site`}
          className="rounded-md p-2 text-muted-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <ExternalLink className="h-5 w-5" aria-hidden />
        </a>
      )}
    </div>
  );
}

// "Lead phrase: detail" → bold lead + detail.
function splitPoint(text: string): [string, string] {
  const i = text.indexOf(": ");
  if (i === -1) return ["", text];
  const rest = text.slice(i + 2);
  return [text.slice(0, i), rest.charAt(0).toUpperCase() + rest.slice(1)];
}

function Flagship() {
  const p = flagshipProject;
  return (
    <Reveal>
      <GlowCard className="mb-6">
        <Card className="border-accent/40 p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-wide text-accent">
            ★ Flagship project
          </p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {p.name}
              </h3>
              {p.tagline && (
                <p className="mt-2 font-mono text-sm text-accent">{p.tagline}</p>
              )}
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ size: "sm" }))}
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden />
                    Live demo
                  </a>
                )}
                {p.video && (
                  <a
                    href={p.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                  >
                    <PlayCircle className="h-4 w-4" aria-hidden />
                    Demo video
                  </a>
                )}
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                  >
                    <Github className="h-4 w-4" aria-hidden />
                    GitHub
                  </a>
                )}
              </div>
            </div>
            <ol className="space-y-3">
              {p.keyPoints?.map((point) => {
                const [lead, rest] = splitPoint(point);
                return (
                  <li
                    key={point}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-0.5 font-mono text-accent" aria-hidden>
                      ▹
                    </span>
                    <span>
                      {lead && (
                        <strong className="font-semibold text-foreground">
                          {lead}.{" "}
                        </strong>
                      )}
                      {rest}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </Card>
      </GlowCard>
    </Reveal>
  );
}

export function Projects() {
  return (
    <Section id="projects" index="03" title="Featured Projects">
      <Flagship />
      <div className="grid gap-6">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.name} delay={i * 0.08}>
            <GlowCard>
              <Card className="hover:border-accent/50">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <ProjectLinks
                    github={project.github}
                    live={project.live}
                    video={project.video}
                    name={project.name}
                  />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
                  >
                    <Github className="h-3.5 w-3.5" aria-hidden />
                    {project.github.replace("https://", "")}
                  </a>
                )}
              </Card>
            </GlowCard>
          </Reveal>
        ))}
      </div>

      <div className="mt-16">
        <Reveal>
          <h3 className="font-mono text-sm text-accent">
            more <span className="text-muted-foreground">//</span> on GitHub
          </h3>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {githubProjects.map((project, i) => (
            <Reveal key={project.name} delay={(i % 3) * 0.08} className="h-full">
              <GlowCard className="h-full">
              <Card className="flex h-full flex-col p-5 hover:border-accent/50">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold">{project.name}</h4>
                  <ProjectLinks
                    github={project.github}
                    live={project.live}
                    name={project.name}
                  />
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </Card>
              </GlowCard>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-6 font-mono text-sm">
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-accent"
            >
              → view all repositories on GitHub
            </a>
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
