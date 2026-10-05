<script setup lang="ts">
import { site } from "~/data/site";
import { interviewQA } from "~/data/interview";
import { featuredProjects } from "~/data/projects";
import { skillGroups } from "~/data/skills";

type Line = { kind: "cmd" | "out" | "accent"; text: string };

const INTRO_CMD = "whoami";
const introOut = (): Line[] => [
  { kind: "out", text: `${site.name} — ${site.title}` },
  { kind: "accent", text: "type `help` to explore ▾" },
];
const quickCommands = ["help", "skills", "projects", "interview", "contact"];

const { theme, toggle } = useTheme();

const lines = ref<Line[]>([]);
const typed = ref("");
const ready = ref(false);
const value = ref("");
const history = ref<string[]>([]);
let historyIndex = -1;

const body = ref<HTMLElement | null>(null);
const input = ref<HTMLInputElement | null>(null);
const timers: ReturnType<typeof setTimeout>[] = [];

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    lines.value = [{ kind: "cmd", text: INTRO_CMD }, ...introOut()];
    ready.value = true;
    return;
  }
  // Auto-type the intro command once.
  let i = 0;
  const typeNext = () => {
    i += 1;
    typed.value = INTRO_CMD.slice(0, i);
    if (i < INTRO_CMD.length) {
      timers.push(setTimeout(typeNext, 90));
    } else {
      timers.push(
        setTimeout(() => {
          typed.value = "";
          lines.value = [{ kind: "cmd", text: INTRO_CMD }, ...introOut()];
          ready.value = true;
        }, 400),
      );
    }
  };
  timers.push(setTimeout(typeNext, 700));
});
onBeforeUnmount(() => timers.forEach(clearTimeout));

watch([lines, typed], () =>
  nextTick(() => {
    if (body.value) body.value.scrollTop = body.value.scrollHeight;
  }),
);

function run(raw: string) {
  const cmd = raw.trim();
  const lower = cmd.toLowerCase();
  const push = (...out: Line[]) => lines.value.push({ kind: "cmd", text: cmd }, ...out);

  const ask = lower.match(/^ask\s+(\d+)$/);
  if (ask) {
    const n = parseInt(ask[1]!, 10);
    const qa = interviewQA[n - 1];
    if (qa) {
      push({ kind: "accent", text: `Q${n}. ${qa.q}` }, { kind: "out", text: qa.a });
    } else {
      push({
        kind: "out",
        text: `no question #${n} — try \`interview\` for the list (1–${interviewQA.length})`,
      });
    }
    return;
  }

  const resume = lower.match(/^resume(?:\s+(devops|backend))?$/);
  if (resume) {
    const devops = resume[1] === "devops";
    push({ kind: "accent", text: `opening ${devops ? "resume-devops" : "resume"}.pdf…` });
    window.open(devops ? site.resumeDevOpsUrl : site.resumeUrl, "_blank");
    return;
  }

  switch (lower) {
    case "":
      lines.value.push({ kind: "cmd", text: "" });
      break;
    case "help":
      push(
        { kind: "out", text: "available commands:" },
        { kind: "accent", text: "  whoami        → who I am" },
        { kind: "accent", text: "  skills        → what I work with" },
        { kind: "accent", text: "  projects      → featured work" },
        { kind: "accent", text: "  contact       → reach me" },
        { kind: "accent", text: "  interview     → 10 questions recruiters ask me" },
        { kind: "accent", text: "  ask <n>       → my answer to question n" },
        { kind: "accent", text: "  resume        → open my résumé (backend & AI)" },
        { kind: "accent", text: "  resume devops → open my DevOps résumé" },
        { kind: "accent", text: "  github        → open my GitHub" },
        { kind: "accent", text: "  theme         → toggle light/dark" },
        { kind: "accent", text: "  sudo hire-me · clear" },
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
        { kind: "accent", text: "  …full list in the Skills section ↓" },
      );
      break;
    case "projects":
      push(
        ...featuredProjects.map((p): Line => ({ kind: "out", text: `  ▹ ${p.name}` })),
        { kind: "accent", text: "  scroll down for details ↓" },
      );
      break;
    case "contact":
      push(
        { kind: "out", text: `  email: ${site.email}` },
        { kind: "out", text: `  phone: ${site.phone}` },
        { kind: "out", text: `  github: ${site.social.github}` },
      );
      break;
    case "github":
      push({ kind: "accent", text: "opening GitHub…" });
      window.open(site.social.github, "_blank", "noopener");
      break;
    case "theme":
      push({
        kind: "accent",
        text: `switching to ${theme.value === "dark" ? "light" : "dark"} mode…`,
      });
      toggle();
      break;
    case "interview":
      push(
        { kind: "out", text: "the 10 questions I get asked — pick one:" },
        ...interviewQA.map(
          (qa, i): Line => ({
            kind: "accent",
            text: `  ${String(i + 1).padStart(2)}. ${qa.q}`,
          }),
        ),
        { kind: "out", text: "type `ask <n>` to hear my answer, e.g. `ask 2`" },
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
        { kind: "accent", text: `→ ${site.email} — let's talk.` },
      );
      break;
    case "clear":
      lines.value = [];
      break;
    default:
      push({ kind: "out", text: `command not found: ${cmd} — try \`help\`` });
  }
}

function submit() {
  const cmd = value.value;
  if (cmd.trim()) history.value.push(cmd);
  historyIndex = history.value.length;
  run(cmd);
  value.value = "";
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Enter") {
    submit();
  } else if (e.key === "ArrowUp" && history.value.length) {
    e.preventDefault();
    historyIndex = Math.max(0, historyIndex - 1);
    value.value = history.value[historyIndex] ?? "";
  } else if (e.key === "ArrowDown" && history.value.length) {
    e.preventDefault();
    historyIndex = Math.min(history.value.length, historyIndex + 1);
    value.value = history.value[historyIndex] ?? "";
  }
}

function quick(cmd: string) {
  if (!ready.value) return;
  run(cmd);
  input.value?.focus({ preventScroll: true });
}
</script>

<template>
  <div class="term card" @click="input?.focus({ preventScroll: true })">
    <div class="term__bar">
      <span class="term__dots" aria-hidden="true">
        <i style="background: var(--pink)" />
        <i style="background: var(--yellow)" />
        <i style="background: var(--green)" />
      </span>
      <span class="term__title mono">anish@portfolio: ~</span>
    </div>

    <div ref="body" class="term__body mono" aria-label="Interactive terminal — type help to explore" role="log">
      <p v-for="(line, i) in lines" :key="i" :class="`ln ln--${line.kind}`">
        <template v-if="line.kind === 'cmd'"><span class="prompt">$ </span>{{ line.text }}</template>
        <template v-else>{{ line.text }}</template>
      </p>
      <p v-if="!ready" class="ln ln--cmd">
        <span class="prompt">$ </span>{{ typed }}<span class="caret" aria-hidden="true">▊</span>
      </p>
      <p v-else class="ln ln--input">
        <span class="prompt">$&nbsp;</span>
        <input
          ref="input"
          v-model="value"
          class="term__input"
          type="text"
          placeholder="try `help`"
          aria-label="Terminal command input"
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
          @keydown="onKeydown"
        />
      </p>
    </div>

    <div class="term__quick" @click.stop>
      <button
        v-for="c in quickCommands"
        :key="c"
        type="button"
        class="term__chip mono"
        :disabled="!ready"
        @click="quick(c)"
      >
        {{ c }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.term {
  --t-bg: #0e0e12;
  --t-fg: #d9d4c4;
  overflow: hidden;
  width: 100%;
}
.term__bar {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.6rem 0.9rem;
  color: var(--on-accent);
  background: var(--yellow);
  border-bottom: var(--bw) solid var(--line);
}
.term__dots {
  display: inline-flex;
  gap: 0.4rem;
}
.term__dots i {
  width: 14px;
  height: 14px;
  border: 2px solid #121212;
  border-radius: 50%;
}
.term__title {
  font-size: 0.8rem;
  font-weight: 700;
}
.term__body {
  height: 17.5rem;
  padding: 1rem 1.1rem;
  overflow-y: auto;
  font-size: 0.86rem;
  line-height: 1.65;
  color: var(--t-fg);
  background: var(--t-bg);
  cursor: text;
}
.ln {
  white-space: pre-wrap;
  word-break: break-word;
}
.ln--accent {
  color: var(--yellow);
}
.ln--cmd {
  color: #fff;
}
.ln--input {
  display: flex;
}
.prompt {
  color: var(--green);
  font-weight: 700;
}
.caret {
  color: var(--green);
  animation: blink 1s steps(1) infinite;
}
.term__input {
  flex: 1;
  min-width: 0;
  padding: 0;
  font: inherit;
  color: #fff;
  background: transparent;
  border: 0;
  outline: none;
  caret-color: var(--green);
}
.term__input::placeholder {
  color: rgba(217, 212, 196, 0.4);
}
.term__quick {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  padding: 0.7rem 0.9rem;
  background: var(--paper);
  border-top: var(--bw) solid var(--line);
}
.term__chip {
  padding: 0.2rem 0.65rem;
  font-size: 0.74rem;
  font-weight: 700;
  color: var(--ink);
  background: var(--paper-2);
  border: 2px solid var(--line);
  border-radius: 999px;
  transition: background 0.1s, transform 0.1s;
}
.term__chip:hover:not(:disabled) {
  background: var(--green);
  color: var(--on-accent);
  transform: translateY(-2px);
}
.term__chip:disabled {
  opacity: 0.5;
  cursor: default;
}
</style>
