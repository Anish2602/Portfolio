"use client";

import * as React from "react";
import { ChevronDown, FileDown } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const resumeOptions = [
  { label: "Backend & AI", hint: "resume.pdf", href: site.resumeUrl },
  { label: "DevOps", hint: "resume-devops.pdf", href: site.resumeDevOpsUrl },
];

export function ResumeMenu({
  triggerClassName,
  align = "left",
  showIcon = true,
}: {
  triggerClassName?: string;
  align?: "left" | "right";
  showIcon?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={cn(
          "inline-flex items-center gap-2",
          triggerClassName
        )}
      >
        {showIcon && <FileDown className="h-4 w-4" aria-hidden />}
        Résumé
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>
      {open && (
        <div
          role="menu"
          aria-label="Choose a résumé"
          className={cn(
            "absolute top-full z-20 mt-2 w-52 overflow-hidden rounded-lg border border-border bg-card shadow-2xl",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          {resumeOptions.map((opt) => (
            <a
              key={opt.label}
              href={opt.href}
              target="_blank"
              rel="noopener"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between gap-3 px-3 py-2.5 font-mono text-sm text-foreground transition-colors hover:bg-muted hover:text-accent"
            >
              {opt.label}
              <span className="text-xs text-muted-foreground">{opt.hint}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
