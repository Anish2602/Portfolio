import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 py-20 sm:py-24"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <p className="font-mono text-sm text-accent">
            06 <span className="text-muted-foreground">//</span> contact
          </p>
          <h2
            id="contact-heading"
            className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Get in touch
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground">
            Open to senior backend (Python/FastAPI) and AI infrastructure
            engineering roles. My inbox is always open — say hello.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className={cn(buttonVariants({ size: "lg" }))}
            >
              <Mail className="h-4 w-4" aria-hidden />
              {site.email}
            </a>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              <Phone className="h-4 w-4" aria-hidden />
              {site.phone}
            </a>
          </div>
          <div className="mt-6 flex items-center justify-center gap-4">
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="rounded-md p-2 text-muted-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Github className="h-5 w-5" aria-hidden />
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="rounded-md p-2 text-muted-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Linkedin className="h-5 w-5" aria-hidden />
            </a>
          </div>
        </Reveal>
      </div>
      <footer className="mt-16 border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-8 text-center">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} {site.name} · Built with Next.js,
            Tailwind CSS & Framer Motion
          </p>
        </div>
      </footer>
    </section>
  );
}
