import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function Section({
  id,
  index,
  title,
  children,
  className,
}: {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-20 sm:py-24", className)}
      aria-labelledby={`${id}-heading`}
    >
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="font-mono text-sm text-accent">
            {index} <span className="text-muted-foreground">//</span> {id}
          </p>
          <h2
            id={`${id}-heading`}
            className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {title}
          </h2>
        </Reveal>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
