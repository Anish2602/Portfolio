<script setup lang="ts">
import { ChevronDown, FileDown } from "lucide-vue-next";
import { site } from "~/data/site";

withDefaults(
  defineProps<{ size?: "md" | "sm"; align?: "left" | "right"; label?: string }>(),
  { size: "md", align: "left", label: "Résumé" },
);

const options = [
  { label: "Backend & AI", file: "resume.pdf", href: site.resumeUrl, color: "var(--blue)" },
  { label: "DevOps", file: "resume-devops.pdf", href: site.resumeDevOpsUrl, color: "var(--orange)" },
];

const open = ref(false);
const root = ref<HTMLElement | null>(null);

function onDocClick(e: MouseEvent) {
  if (root.value && !root.value.contains(e.target as Node)) open.value = false;
}
function onKey(e: KeyboardEvent) {
  if (e.key === "Escape") open.value = false;
}

watch(open, (isOpen) => {
  if (isOpen) {
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
  } else {
    document.removeEventListener("mousedown", onDocClick);
    document.removeEventListener("keydown", onKey);
  }
});
onBeforeUnmount(() => {
  document.removeEventListener("mousedown", onDocClick);
  document.removeEventListener("keydown", onKey);
});
</script>

<template>
  <div ref="root" class="rm">
    <button
      type="button"
      class="btn btn--paper"
      :class="{ 'btn--sm': size === 'sm' }"
      aria-haspopup="menu"
      :aria-expanded="open"
      @click="open = !open"
    >
      <FileDown :size="size === 'sm' ? 16 : 18" aria-hidden="true" />
      {{ label }}
      <ChevronDown class="rm__chev" :class="{ 'is-open': open }" :size="16" aria-hidden="true" />
    </button>

    <div v-if="open" class="rm__menu card" :class="`rm__menu--${align}`" role="menu" aria-label="Choose a résumé">
      <a
        v-for="opt in options"
        :key="opt.label"
        :href="opt.href"
        class="rm__item"
        role="menuitem"
        target="_blank"
        rel="noopener"
        @click="open = false"
      >
        <span class="rm__dot" :style="{ background: opt.color }" aria-hidden="true" />
        <span class="rm__label">{{ opt.label }}</span>
        <span class="rm__file mono">{{ opt.file }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.rm {
  position: relative;
  display: inline-block;
}
.rm__chev {
  transition: transform 0.15s;
}
.rm__chev.is-open {
  transform: rotate(180deg);
}
.rm__menu {
  position: absolute;
  top: calc(100% + 12px);
  z-index: 60;
  width: 17rem;
  max-width: calc(100vw - 32px);
  padding: 0.4rem;
  overflow: hidden;
}
.rm__menu--left {
  left: 0;
}
.rm__menu--right {
  right: 0;
}
.rm__item {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.7rem 0.75rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 700;
  transition: background 0.1s;
}
.rm__item:hover,
.rm__item:focus-visible {
  background: var(--yellow);
  color: var(--on-accent);
}
.rm__dot {
  flex: none;
  width: 14px;
  height: 14px;
  border: 2px solid var(--line);
  border-radius: 50%;
}
.rm__label {
  flex: 1;
}
.rm__file {
  font-size: 0.72rem;
  font-weight: 500;
  opacity: 0.7;
}
</style>
