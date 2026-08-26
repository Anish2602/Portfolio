import { ArrowDown, Mail } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "@/components/reveal";
import { ResumeMenu } from "@/components/resume-menu";
import { Terminal } from "@/components/terminal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Technical grid backdrop, fading toward the fold */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_50%,transparent_100%)]"
      />
      <div className="mx-auto grid max-w-5xl items-center gap-12 px-6 pb-20 pt-20 sm:pt-28 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Open to backend & AI infra roles
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="gradient-name mt-5 text-4xl font-bold tracking-tight sm:text-6xl">
              {site.name}
            </h1>
            <p className="mt-3 text-xl font-semibold text-accent sm:text-2xl">
              {site.title}
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {site.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects" className={cn(buttonVariants({ size: "lg" }))}>
                View Projects
                <ArrowDown className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="#contact"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                <Mail className="h-4 w-4" aria-hidden />
                Get in touch
              </a>
              <ResumeMenu
                triggerClassName={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              />
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <Terminal />
        </Reveal>
      </div>
    </section>
  );
}
