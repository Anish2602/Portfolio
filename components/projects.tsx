import { ExternalLink, Github } from "lucide-react";
import { featuredProjects, githubProjects } from "@/data/projects";
import { site } from "@/data/site";
import { GlowCard } from "@/components/glow-card";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

function ProjectLinks({
  github,
  live,
  name,
}: {
  github?: string;
  live?: string;
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

export function Projects() {
  return (
    <Section id="projects" index="03" title="Featured Projects">
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
