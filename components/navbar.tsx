"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/data/site";
import { CommandPalette } from "@/components/command-palette";
import { ResumeMenu } from "@/components/resume-menu";
import { ScrollProgress } from "@/components/scroll-progress";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

// Every section in page order. Education isn't in the nav, but it still has to
// "own" its scroll range so the previous nav item doesn't stay highlighted.
const SECTION_IDS = ["about", "experience", "projects", "skills", "education", "contact"];
const NAV_IDS = new Set(nav.map((n) => n.href.slice(1)));

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [paletteOpen, setPaletteOpen] = React.useState(false);
  const [active, setActive] = React.useState<string | null>(null);

  // Scrollspy: the active section is the last one whose top has passed ~35% of the viewport.
  React.useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) current = "contact";
      setActive(current && NAV_IDS.has(current) ? current : null);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const linkClass = (href: string) => {
    const isActive = active && href === `#${active}`;
    return `rounded-md px-3 py-2 font-mono text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
      isActive ? "text-accent" : "text-muted-foreground hover:text-foreground"
    }`;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <ScrollProgress />
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      <nav
        className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6"
        aria-label="Main navigation"
      >
        <Link
          href="#top"
          className="font-mono text-sm font-semibold tracking-tight"
        >
          <span className="text-accent">~/</span>anish-kumar
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className={linkClass(item.href)}>
              {item.label}
            </a>
          ))}
          <ResumeMenu
            showIcon={false}
            triggerClassName="ml-2 rounded-md border border-border px-3 py-2 font-mono text-sm transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
          <button
            onClick={() => setPaletteOpen(true)}
            className="ml-1 flex items-center gap-1.5 rounded-md border border-border px-2.5 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label="Open command palette"
          >
            <kbd>⌘</kbd>
            <kbd>K</kbd>
          </button>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 font-mono text-sm text-accent"
            >
              Résumé — Backend & AI
            </a>
            <a
              href={site.resumeDevOpsUrl}
              target="_blank"
              rel="noopener"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 font-mono text-sm text-accent"
            >
              Résumé — DevOps
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
