<script setup lang="ts">
import type { Component } from "vue";
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
  Sun,
  User,
  Wrench,
  Send,
} from "lucide-vue-next";
import { site } from "~/data/site";

type Item = { label: string; hint: string; keywords: string; icon: Component; color: string; run: () => void };

const open = usePalette();
const { theme, toggle } = useTheme();

const query = ref("");
const selected = ref(0);
const input = ref<HTMLInputElement | null>(null);
const list = ref<HTMLElement | null>(null);

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const items = computed<Item[]>(() => [
  { label: "About", hint: "Go to section", keywords: "about bio", icon: User, color: "var(--yellow)", run: () => go("about") },
  { label: "Experience", hint: "Go to section", keywords: "experience work centific jobs devops backend", icon: Briefcase, color: "var(--blue)", run: () => go("experience") },
  { label: "Projects", hint: "Go to section", keywords: "projects portfolio work github", icon: FolderGit2, color: "var(--pink)", run: () => go("projects") },
  { label: "Skills", hint: "Go to section", keywords: "skills stack tech", icon: Wrench, color: "var(--green)", run: () => go("skills") },
  { label: "Education", hint: "Go to section", keywords: "education degree achievements", icon: GraduationCap, color: "var(--orange)", run: () => go("education") },
  { label: "Contact", hint: "Go to section", keywords: "contact reach hire", icon: Send, color: "var(--violet)", run: () => go("contact") },
  { label: "Email me", hint: site.email, keywords: "email contact mail hire", icon: Mail, color: "var(--yellow)", run: () => { window.location.href = `mailto:${site.email}`; } },
  { label: "Résumé — Backend & AI", hint: "resume.pdf", keywords: "resume cv download backend", icon: FileDown, color: "var(--blue)", run: () => window.open(site.resumeUrl, "_blank") },
  { label: "Résumé — DevOps", hint: "resume-devops.pdf", keywords: "resume cv download devops", icon: FileDown, color: "var(--orange)", run: () => window.open(site.resumeDevOpsUrl, "_blank") },
  { label: "Open GitHub", hint: "github.com/Anish2602", keywords: "github code repos", icon: Github, color: "var(--green)", run: () => window.open(site.social.github, "_blank", "noopener") },
  { label: "Open LinkedIn", hint: "linkedin.com", keywords: "linkedin profile", icon: Linkedin, color: "var(--blue)", run: () => window.open(site.social.linkedin, "_blank", "noopener") },
  {
    label: "Toggle theme",
    hint: theme.value === "dark" ? "Switch to light" : "Switch to dark",
    keywords: "theme dark light mode toggle",
    icon: theme.value === "dark" ? Sun : Moon,
    color: "var(--pink)",
    run: toggle,
  },
]);

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return items.value;
  return items.value.filter((i) => i.label.toLowerCase().includes(q) || i.keywords.includes(q));
});

watch(query, () => (selected.value = 0));
watch(open, (isOpen) => {
  if (!isOpen) return;
  query.value = "";
  selected.value = 0;
  nextTick(() => input.value?.focus());
});
watch(selected, () =>
  nextTick(() => list.value?.querySelector<HTMLElement>('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" })),
);

function runItem(item: Item) {
  open.value = false;
  item.run();
}

function onInputKey(e: KeyboardEvent) {
  if (e.key === "ArrowDown") {
    e.preventDefault();
    selected.value = Math.min(selected.value + 1, filtered.value.length - 1);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    selected.value = Math.max(selected.value - 1, 0);
  } else if (e.key === "Enter" && filtered.value[selected.value]) {
    runItem(filtered.value[selected.value]!);
  }
}

// Global ⌘K / Ctrl+K and Escape.
function onKey(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    open.value = !open.value;
  } else if (e.key === "Escape") {
    open.value = false;
  }
}
onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => window.removeEventListener("keydown", onKey));
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="pal" role="dialog" aria-modal="true" aria-label="Command palette" @click="open = false">
      <div class="pal__box card" @click.stop>
        <div class="pal__search">
          <Search :size="20" aria-hidden="true" />
          <input
            ref="input"
            v-model="query"
            class="pal__input"
            type="text"
            placeholder="Type a command or search…"
            aria-label="Search commands"
            autocomplete="off"
            spellcheck="false"
            @keydown="onInputKey"
          />
          <kbd class="pal__kbd mono">esc</kbd>
        </div>
        <ul ref="list" class="pal__list" role="listbox">
          <li v-if="!filtered.length" class="pal__empty mono">no results — try `projects`</li>
          <li v-for="(item, i) in filtered" :key="item.label" role="option" :aria-selected="i === selected">
            <button
              type="button"
              class="pal__item"
              :class="{ 'is-sel': i === selected }"
              @click="runItem(item)"
              @mouseenter="selected = i"
            >
              <span class="pal__icon" :style="{ background: item.color }">
                <component :is="item.icon" :size="16" aria-hidden="true" />
              </span>
              <span class="pal__label">{{ item.label }}</span>
              <span class="pal__hint mono">{{ item.hint }}</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.pal {
  position: fixed;
  inset: 0;
  z-index: 300;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 14vh 16px 16px;
  background: rgba(10, 10, 12, 0.55);
}
.pal__box {
  width: 100%;
  max-width: 34rem;
  overflow: hidden;
  box-shadow: 10px 10px 0 var(--shadow);
}
.pal__search {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 1rem;
  border-bottom: var(--bw) solid var(--line);
  background: var(--yellow);
  color: var(--on-accent);
}
.pal__input {
  flex: 1;
  min-width: 0;
  height: 3.4rem;
  font: inherit;
  font-weight: 700;
  color: var(--on-accent);
  background: transparent;
  border: 0;
  outline: none;
}
.pal__input::placeholder {
  color: rgba(18, 18, 18, 0.6);
}
.pal__kbd {
  padding: 0.1rem 0.45rem;
  font-size: 0.7rem;
  font-weight: 700;
  border: 2px solid #121212;
  border-radius: 6px;
}
.pal__list {
  max-height: 20rem;
  padding: 0.5rem;
  overflow-y: auto;
}
.pal__empty {
  padding: 1.5rem 0.75rem;
  text-align: center;
  color: var(--muted);
  font-size: 0.85rem;
}
.pal__item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
  padding: 0.6rem 0.7rem;
  text-align: left;
  background: transparent;
  border: 2px solid transparent;
  border-radius: 12px;
}
.pal__item.is-sel {
  background: var(--paper-2);
  border-color: var(--line);
}
.pal__icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 32px;
  height: 32px;
  color: var(--on-accent);
  border: 2px solid var(--line);
  border-radius: 8px;
}
.pal__label {
  flex: 1;
  font-weight: 700;
}
.pal__hint {
  font-size: 0.72rem;
  color: var(--muted);
}
</style>
