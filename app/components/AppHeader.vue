<script setup lang="ts">
import { Menu, Moon, Sun, X } from "lucide-vue-next";
import { nav, site } from "~/data/site";

const { theme, toggle } = useTheme();
const paletteOpen = usePalette();
const menuOpen = ref(false);
const active = ref<string | null>(null);

// Every section in page order (Education isn't in the nav, but it still has to
// "own" the scroll range so the previous nav item doesn't stay highlighted).
const sectionIds = ["about", "experience", "projects", "skills", "education", "contact"];
const navIds = new Set(nav.map((n) => n.href.slice(1)));
let raf = 0;

// Scrollspy: the active section is the last one whose top has passed ~35% of the viewport.
function updateActive() {
  raf = 0;
  const line = window.innerHeight * 0.35;
  let current: string | null = null;
  for (const id of sectionIds) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= line) current = id;
  }
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
  if (atBottom) current = "contact";
  active.value = current && navIds.has(current) ? current : null;
}
function onScroll() {
  if (!raf) raf = requestAnimationFrame(updateActive);
}

onMounted(() => {
  updateActive();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  window.addEventListener("keydown", onKey);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
  window.removeEventListener("keydown", onKey);
  if (raf) cancelAnimationFrame(raf);
});

function onKey(e: KeyboardEvent) {
  if (e.key === "Escape") menuOpen.value = false;
}
</script>

<template>
  <header class="hdr">
    <ScrollProgress />
    <div class="container hdr__in">
      <a href="#top" class="logo" aria-label="Back to top">
        <span class="logo__mark">AK</span>
        <span class="logo__text">anish-kumar</span>
      </a>

      <nav class="nav" aria-label="Main navigation">
        <a
          v-for="item in nav"
          :key="item.href"
          :href="item.href"
          class="nav__link"
          :class="{ 'is-active': active === item.href.slice(1) }"
        >
          {{ item.label }}
        </a>
      </nav>

      <div class="hdr__actions">
        <div class="hdr__resume">
          <ResumeMenu size="sm" align="right" />
        </div>
        <button
          type="button"
          class="icon-btn hdr__palette mono"
          style="--c: var(--green)"
          aria-label="Open command palette"
          @click="paletteOpen = true"
        >
          <span aria-hidden="true">⌘K</span>
        </button>
        <button
          type="button"
          class="icon-btn"
          style="--c: var(--pink)"
          :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="toggle"
        >
          <Sun v-if="theme === 'dark'" :size="20" aria-hidden="true" />
          <Moon v-else :size="20" aria-hidden="true" />
        </button>
        <button
          type="button"
          class="icon-btn hdr__burger"
          style="--c: var(--yellow)"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="menuOpen"
          @click="menuOpen = !menuOpen"
        >
          <X v-if="menuOpen" :size="20" aria-hidden="true" />
          <Menu v-else :size="20" aria-hidden="true" />
        </button>
      </div>
    </div>

    <div v-if="menuOpen" class="mobile">
      <div class="container mobile__in">
        <a
          v-for="(item, i) in nav"
          :key="item.href"
          :href="item.href"
          class="mobile__link"
          @click="menuOpen = false"
        >
          <span class="mono">0{{ i + 1 }}</span>
          {{ item.label }}
        </a>
        <div class="mobile__resumes">
          <a class="btn btn--sm" style="--c: var(--blue)" :href="site.resumeUrl" target="_blank" rel="noopener" @click="menuOpen = false">Résumé · Backend &amp; AI</a>
          <a class="btn btn--sm" style="--c: var(--orange)" :href="site.resumeDevOpsUrl" target="_blank" rel="noopener" @click="menuOpen = false">Résumé · DevOps</a>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.hdr {
  position: sticky;
  top: 0;
  z-index: 80;
  background: var(--bg);
  border-bottom: var(--bw) solid var(--line);
}
.hdr__in {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  height: var(--header-h);
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 0.95rem;
}
.logo__mark {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  font-family: var(--font-sans);
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--on-accent);
  background: var(--pink);
  border: var(--bw) solid var(--line);
  border-radius: 10px;
  box-shadow: 3px 3px 0 var(--shadow);
  transform: rotate(-4deg);
  transition: transform 0.15s;
}
.logo:hover .logo__mark {
  transform: rotate(4deg) scale(1.06);
}

.nav {
  display: none;
  gap: 0.25rem;
}
.nav__link {
  padding: 0.45rem 0.85rem;
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
  border: 2px solid transparent;
  border-radius: 999px;
  transition: background 0.12s, border-color 0.12s;
}
.nav__link:hover {
  border-color: var(--line);
  background: var(--paper);
}
.nav__link.is-active {
  color: var(--on-accent);
  background: var(--yellow);
  border-color: var(--line);
}

.hdr__actions {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.hdr__resume,
.hdr__palette {
  display: none;
}
.hdr__palette {
  font-size: 0.78rem;
  font-weight: 700;
  width: auto;
  padding-inline: 0.7rem;
}

.mobile {
  border-top: var(--bw) solid var(--line);
  background: var(--paper);
}
.mobile__in {
  display: grid;
  gap: 0.25rem;
  padding-block: 1rem 1.25rem;
}
.mobile__link {
  display: flex;
  align-items: baseline;
  gap: 0.8rem;
  padding: 0.65rem 0.25rem;
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  text-decoration: none;
  border-bottom: 2px dashed var(--line);
}
.mobile__link .mono {
  font-size: 0.8rem;
  color: var(--muted);
}
.mobile__resumes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.9rem;
}

@media (min-width: 900px) {
  .nav,
  .hdr__resume,
  .hdr__palette {
    display: flex;
  }
  .hdr__burger {
    display: none;
  }
  .mobile {
    display: none;
  }
}
</style>
