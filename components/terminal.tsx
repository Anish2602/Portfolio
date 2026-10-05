"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { site } from "@/data/site";
import { interviewQA } from "@/data/interview";
import { featuredProjects, flagshipProject } from "@/data/projects";
import { skillGroups } from "@/data/skills";

type Line = { kind: "cmd" | "out" | "accent"; text: string };

const INTRO_CMD = "whoami";
const INTRO_OUT: Line[] = [
  { kind: "out", text: `${site.name} — ${site.title}` },
  { kind: "accent", text: "type `help` to explore ▾" },
];

export function Terminal() {
  const reduceMotion = useReducedMotion();
  const { resolvedTheme, setTheme } = useTheme();
  const [lines, setLines] = React.useState<Line[]>([]);
  const [typed, setTyped] = React.useState("");
  const [ready, setReady] = React.useState(false);
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const bodyRef = React.useRef<HTMLDivElement>(null);
  const started = React.useRef(false);

  // Auto-type the intro command once on mount.
  React.useEffect(() => {
    if (started.current) return;
    started.current = true;

    if (reduceMotion) {
      setLines([{ kind: "cmd", text: INTRO_CMD }, ...INTRO_OUT]);
      setReady(true);
      return;
    }

    let i = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const typeNext = () => {
      i += 1;
      setTyped(INTRO_CMD.slice(0, i));
      if (i < INTRO_CMD.length) {
        timers.push(setTimeout(typeNext, 90));
      } else {
        timers.push(
          setTimeout(() => {
            setTyped("");
            setLines([{ kind: "cmd", text: INTRO_CMD }, ...INTRO_OUT]);
            setReady(true);
          }, 400)
        );
      }
    };
    timers.push(setTimeout(typeNext, 700));
    return () => timers.forEach(clearTimeout);
  }, [reduceMotion]);

  // Keep scrolled to the latest line.
  React.useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, typed]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    const push = (...out: Line[]) =>
      setLines((prev) => [...prev, { kind: "cmd", text: cmd }, ...out]);

    // `ask <n>` — answer interview question n
    const askMatch = cmd.toLowerCase().match(/^ask\s+(\d+)$/);
    if (askMatch) {
      const n = parseInt(askMatch[1], 10);
      const qa = interviewQA[n - 1];
      if (qa) {
        push(
          { kind: "accent", text: `Q${n}. ${qa.q}` },
          { kind: "out", text: qa.a }
        );
      } else {
        push({
          kind: "out",
          text: `no question #${n} — try \`interview\` for the list (1–${interviewQA.length})`,
        });
      }
      return;
    }

    switch (cmd.toLowerCase()) {
      case "":
        setLines((prev) => [...prev, { kind: "cmd", text: "" }]);
        break;
      case "help":
        push(
          { kind: "out", text: "available commands:" },
          { kind: "accent", text: "  whoami      → who I am" },
          { kind: "accent", text: "  skills      → what I work with" },
          { kind: "accent", text: "  projects    → featured work" },
          { kind: "accent", text: "  contact     → reach me" },
          { kind: "accent", text: "  interview   → 10 questions recruiters ask me" },
          { kind: "accent", text: "  ask <n>     → my answer to question n" },
          { kind: "accent", text: "  resume      → open my résumé (backend & AI)" },
          { kind: "accent", text: "  resume devops → open my DevOps résumé" },
          { kind: "accent", text: "  github      → open my GitHub" },
          { kind: "accent", text: "  theme       → toggle light/dark" },
          { kind: "accent", text: "  sudo hire-me · clear" }
        );
        break;
      case "whoami":
        push({ kind: "out", text: `${site.name} — ${site.title}` });
        break;
      case "skills":
        push(
          ...skillGroups
            .slice(0, 4)
            .map((g): Line => ({ kind: "out", text: `  ${g.label}: ${g.skills.join(", ")}` })),
          { kind: "accent", text: "  …full list in the Skills section ↓" }
        );
        break;
      case "projects":
        push(
          ...[flagshipProject, ...featuredProjects].map(
            (p): Line => ({ kind: "out", text: `  ▹ ${p.name}` })
          ),
          { kind: "accent", text: "  scroll down for details ↓" }
        );
        break;
      case "contact":
        push(
          { kind: "out", text: `  email: ${site.email}` },
          { kind: "out", text: `  phone: ${site.phone}` },
          { kind: "out", text: `  github: ${site.social.github}` }
        );
        break;
      case "resume":
        push({ kind: "accent", text: "opening resume.pdf…" });
        window.open(site.resumeUrl, "_blank");
        break;
      case "resume devops":
        push({ kind: "accent", text: "opening resume-devops.pdf…" });
        window.open(site.resumeDevOpsUrl, "_blank");
        break;
      case "github":
        push({ kind: "accent", text: "opening GitHub…" });
        window.open(site.social.github, "_blank", "noopener");
        break;
      case "theme":
        push({
          kind: "accent",
          text: `switching to ${resolvedTheme === "dark" ? "light" : "dark"} mode…`,
        });
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
        break;
      case "interview":
        push(
          { kind: "out", text: "the 10 questions I get asked — pick one:" },
          ...interviewQA.map(
            (qa, i): Line => ({
              kind: "accent",
              text: `  ${String(i + 1).padStart(2)}. ${qa.q}`,
            })
          ),
          { kind: "out", text: "type `ask <n>` to hear my answer, e.g. `ask 2`" }
        );
        break;
      case "ask":
        push({
          kind: "out",
          text: "usage: ask <n> — e.g. `ask 2`. run `interview` to see the questions",
        });
        break;
      case "sudo hire-me":
      case "hire-me":
        push(
          { kind: "out", text: "[sudo] permission granted ✓" },
          { kind: "accent", text: `→ ${site.email} — let's talk.` }
        );
        break;
      case "clear":
        setLines([]);
        break;
      default:
        push({
          kind: "out",
          text: `command not found: ${cmd} — try \`help\``,
        });
    }
  };

  return (
    <div
      className="w-full overflow-hidden rounded-lg border border-border bg-card/80 shadow-2xl shadow-black/20 backdrop-blur"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500/80" aria-hidden />
        <span className="h-3 w-3 rounded-full bg-yellow-500/80" aria-hidden />
        <span className="h-3 w-3 rounded-full bg-green-500/80" aria-hidden />
        <span className="ml-3 font-mono text-xs text-muted-foreground">
          anish@portfolio: ~
        </span>
      </div>
      <div
        ref={bodyRef}
        className="h-64 overflow-y-auto p-4 font-mono text-sm leading-relaxed sm:h-72"
        aria-label="Interactive terminal — type help to explore"
      >
        {lines.map((line, i) =>
          line.kind === "cmd" ? (
            <p key={i}>
              <span className="text-accent">$ </span>
              {line.text}
            </p>
          ) : (
            <p
              key={i}
              className={
                line.kind === "accent"
                  ? "whitespace-pre-wrap text-accent"
                  : "whitespace-pre-wrap text-muted-foreground"
              }
            >
              {line.text}
            </p>
          )
        )}
        {!ready && (
          <p>
            <span className="text-accent">$ </span>
            {typed}
            <span className="caret text-accent">▊</span>
          </p>
        )}
        {ready && (
          <p className="flex">
            <span className="text-accent">$&nbsp;</span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  run(value);
                  setValue("");
                }
              }}
              className="w-full bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/50"
              placeholder="try `help`"
              aria-label="Terminal command input"
              autoComplete="off"
              spellCheck={false}
            />
          </p>
        )}
      </div>
    </div>
  );
}
