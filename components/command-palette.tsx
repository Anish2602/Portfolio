"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  Briefcase,
  FileDown,
  FolderGit2,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Moon,
  Search,
  SunMoon,
  User,
  Wrench,
} from "lucide-react";
import { site } from "@/data/site";

type Item = {
  label: string;
  hint: string;
  keywords: string;
  icon: React.ReactNode;
  action: () => void;
};

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const items: Item[] = React.useMemo(
    () => [
      { label: "About", hint: "Go to section", keywords: "about bio", icon: <User className="h-4 w-4" aria-hidden />, action: () => scrollTo("about") },
      { label: "Experience", hint: "Go to section", keywords: "experience work centific jobs", icon: <Briefcase className="h-4 w-4" aria-hidden />, action: () => scrollTo("experience") },
      { label: "Projects", hint: "Go to section", keywords: "projects portfolio work github", icon: <FolderGit2 className="h-4 w-4" aria-hidden />, action: () => scrollTo("projects") },
      { label: "Skills", hint: "Go to section", keywords: "skills stack tech", icon: <Wrench className="h-4 w-4" aria-hidden />, action: () => scrollTo("skills") },
      { label: "Education", hint: "Go to section", keywords: "education degree achievements", icon: <GraduationCap className="h-4 w-4" aria-hidden />, action: () => scrollTo("education") },
      { label: "Email me", hint: site.email, keywords: "email contact mail hire", icon: <Mail className="h-4 w-4" aria-hidden />, action: () => { window.location.href = `mailto:${site.email}`; } },
      { label: "Download Résumé", hint: "resume.pdf", keywords: "resume cv download", icon: <FileDown className="h-4 w-4" aria-hidden />, action: () => window.open(site.resumeUrl, "_blank") },
      { label: "Open GitHub", hint: "github.com/Anish2602", keywords: "github code repos", icon: <Github className="h-4 w-4" aria-hidden />, action: () => window.open(site.social.github, "_blank", "noopener") },
      { label: "Open LinkedIn", hint: "linkedin.com", keywords: "linkedin profile", icon: <Linkedin className="h-4 w-4" aria-hidden />, action: () => window.open(site.social.linkedin, "_blank", "noopener") },
      { label: "Toggle theme", hint: resolvedTheme === "dark" ? "Switch to light" : "Switch to dark", keywords: "theme dark light mode toggle", icon: resolvedTheme === "dark" ? <SunMoon className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />, action: () => setTheme(resolvedTheme === "dark" ? "light" : "dark") },
    ],
    [resolvedTheme, setTheme]
  );

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) || item.keywords.includes(q)
    );
  }, [items, query]);

  // Global ⌘K / Ctrl+K shortcut.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  React.useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  React.useEffect(() => setSelected(0), [query]);

  if (!open) return null;

  const runItem = (item: Item) => {
    onOpenChange(false);
    item.action();
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-black/50 px-4 pt-[15vh] backdrop-blur-sm"
      onClick={() => onOpenChange(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-lg border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelected((s) => Math.min(s + 1, filtered.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelected((s) => Math.max(s - 1, 0));
              } else if (e.key === "Enter" && filtered[selected]) {
                runItem(filtered[selected]);
              }
            }}
            placeholder="Type a command or search…"
            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            aria-label="Search commands"
          />
          <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            esc
          </kbd>
        </div>
        <ul className="max-h-72 overflow-y-auto p-2" role="listbox">
          {filtered.length === 0 && (
            <li className="px-3 py-6 text-center font-mono text-sm text-muted-foreground">
              no results — try `projects`
            </li>
          )}
          {filtered.map((item, i) => (
            <li key={item.label} role="option" aria-selected={i === selected}>
              <button
                onClick={() => runItem(item)}
                onMouseEnter={() => setSelected(i)}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
                  i === selected
                    ? "bg-muted text-accent"
                    : "text-foreground"
                }`}
              >
                <span className={i === selected ? "text-accent" : "text-muted-foreground"}>
                  {item.icon}
                </span>
                <span className="flex-1">{item.label}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {item.hint}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
