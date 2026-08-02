"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/data/site";
import { CommandPalette } from "@/components/command-palette";
import { ScrollProgress } from "@/components/scroll-progress";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const SECTION_IDS = ["about", "experience", "projects", "skills", "contact"];

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [paletteOpen, setPaletteOpen] = React.useState(false);
  const [active, setActive] = React.useState<string | null>(null);

  // Scrollspy: highlight the section currently in view.
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
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
          <a
            href={site.resumeUrl}
            className="ml-2 rounded-md border border-border px-3 py-2 font-mono text-sm transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Résumé
          </a>
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
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 font-mono text-sm text-accent"
            >
              Résumé
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
