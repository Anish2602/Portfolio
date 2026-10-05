<script setup lang="ts">
import { ArrowUpRight, Github, PlayCircle } from "lucide-vue-next";
import { featuredProjects, flagshipProject as fp, githubProjects } from "~/data/projects";
import { site } from "~/data/site";

const colors = ["var(--yellow)", "var(--pink)", "var(--blue)", "var(--green)", "var(--orange)"];
const pad = (n: number) => String(n).padStart(2, "0");

// "Lead phrase: detail" → bold lead + detail.
const splitPoint = (text: string): [string, string] => {
  const i = text.indexOf(": ");
  if (i === -1) return ["", text];
  const rest = text.slice(i + 2);
  return [text.slice(0, i), rest.charAt(0).toUpperCase() + rest.slice(1)];
};
</script>

<template>
  <section id="projects" class="section" aria-labelledby="proj-h">
    <div class="container">
      <SectionHeading id="proj-h" index="03" label="projects" title="Featured Projects" color="var(--pink)">
        Featured <span class="mark" style="--c: var(--pink)">projects</span>
      </SectionHeading>

      <div v-reveal class="flag-wrap">
        <article class="flag card" aria-labelledby="flagship-title">
          <div class="flag__bar mono">
            <span>★ Flagship project</span>
            <span class="proj__links">
              <a v-if="fp.video" :href="fp.video" target="_blank" rel="noopener noreferrer" :aria-label="`${fp.name} demo video`">
                <PlayCircle :size="18" aria-hidden="true" />
              </a>
              <a v-if="fp.live" :href="fp.live" target="_blank" rel="noopener noreferrer" :aria-label="`${fp.name} live site`">
                <ArrowUpRight :size="18" aria-hidden="true" />
              </a>
              <a v-if="fp.github" :href="fp.github" target="_blank" rel="noopener noreferrer" :aria-label="`${fp.name} on GitHub`">
                <Github :size="18" aria-hidden="true" />
              </a>
            </span>
          </div>
          <div class="flag__grid">
            <div class="flag__main">
              <h3 id="flagship-title" class="flag__title">{{ fp.name }}</h3>
              <p class="flag__tag mono">{{ fp.tagline }}</p>
              <p class="flag__desc">{{ fp.description }}</p>
              <ul class="chips">
                <li v-for="t in fp.tech" :key="t" class="chip">{{ t }}</li>
              </ul>
              <div class="proj__actions">
                <a v-if="fp.live" :href="fp.live" class="btn btn--sm" style="--c: var(--violet)" target="_blank" rel="noopener noreferrer">
                  Live demo <ArrowUpRight :size="16" aria-hidden="true" />
                </a>
                <a v-if="fp.video" :href="fp.video" class="btn btn--sm" style="--c: var(--pink)" target="_blank" rel="noopener noreferrer">
                  <PlayCircle :size="16" aria-hidden="true" /> Demo video
                </a>
                <a v-if="fp.github" :href="fp.github" class="btn btn--sm btn--paper" target="_blank" rel="noopener noreferrer">
                  <Github :size="16" aria-hidden="true" /> GitHub
                </a>
              </div>
            </div>
            <ol class="flag__points">
              <li v-for="(pt, i) in fp.keyPoints" :key="i">
                <span class="flag__num mono">{{ pad(i + 1) }}</span>
                <p>
                  <strong v-if="splitPoint(pt)[0]">{{ splitPoint(pt)[0] }}.</strong>
                  {{ splitPoint(pt)[1] }}
                </p>
              </li>
            </ol>
          </div>
        </article>
      </div>

      <div class="featured">
        <div v-for="(p, i) in featuredProjects" :key="p.name" v-reveal="(i % 2) * 80" class="featured__cell">
          <article class="proj card card--lift" :style="{ '--c': colors[i % colors.length] }">
            <div class="proj__bar mono">
              <span>No. {{ pad(i + 1) }}</span>
              <span class="proj__links">
                <a v-if="p.video" :href="p.video" target="_blank" rel="noopener noreferrer" :aria-label="`${p.name} demo video`">
                  <PlayCircle :size="18" aria-hidden="true" />
                </a>
                <a v-if="p.live" :href="p.live" target="_blank" rel="noopener noreferrer" :aria-label="`${p.name} live site`">
                  <ArrowUpRight :size="18" aria-hidden="true" />
                </a>
                <a v-if="p.github" :href="p.github" target="_blank" rel="noopener noreferrer" :aria-label="`${p.name} on GitHub`">
                  <Github :size="18" aria-hidden="true" />
                </a>
              </span>
            </div>
            <div class="proj__body">
              <h3 class="proj__title">{{ p.name }}</h3>
              <p class="proj__desc">{{ p.description }}</p>
              <ul class="chips">
                <li v-for="t in p.tech" :key="t" class="chip">{{ t }}</li>
              </ul>
              <div class="proj__actions">
                <a
                  v-if="p.live"
                  :href="p.live"
                  class="btn btn--sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live demo <ArrowUpRight :size="16" aria-hidden="true" />
                </a>
                <a
                  v-if="p.video"
                  :href="p.video"
                  class="btn btn--sm"
                  style="--c: var(--pink)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PlayCircle :size="16" aria-hidden="true" /> Demo video
                </a>
                <a
                  v-if="p.github"
                  :href="p.github"
                  class="btn btn--sm btn--paper"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github :size="16" aria-hidden="true" /> GitHub
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div class="more">
        <div v-reveal class="more__head">
          <h3 class="more__title">More <span class="mono">//</span> on GitHub</h3>
        </div>
        <ul class="more__grid">
          <li v-for="(p, i) in githubProjects" :key="p.name" v-reveal="(i % 3) * 70">
            <article class="mini card card--lift" :style="{ '--c': colors[(i + 2) % colors.length] }">
              <h4 class="mini__title">
                <a :href="p.github" target="_blank" rel="noopener noreferrer">{{ p.name }}</a>
                <Github :size="18" aria-hidden="true" />
              </h4>
              <p class="mini__desc">{{ p.description }}</p>
              <ul class="chips">
                <li v-for="t in p.tech" :key="t" class="chip">{{ t }}</li>
              </ul>
            </article>
          </li>
        </ul>
        <div v-reveal class="more__all">
          <a :href="site.social.github" class="btn" target="_blank" rel="noopener noreferrer">
            View all repositories <ArrowUpRight :size="18" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.featured {
  display: grid;
  gap: clamp(24px, 3vw, 36px);
}
.featured__cell {
  display: flex;
}
.proj {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
}
.proj__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.55rem 1rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--on-accent);
  background: var(--c);
  border-bottom: var(--bw) solid var(--line);
}
.proj__links {
  display: inline-flex;
  gap: 0.4rem;
}
.proj__links a {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  color: var(--on-accent);
  background: rgba(255, 255, 255, 0.55);
  border: 2px solid #121212;
  border-radius: 8px;
  transition: background 0.12s;
}
.proj__links a:hover {
  background: #fff;
}
.proj__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: clamp(18px, 2.4vw, 26px);
}
.proj__title {
  font-size: clamp(1.35rem, 2.4vw, 1.75rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.03em;
}
.proj__desc {
  flex: 1;
  font-size: 0.97rem;
  font-weight: 500;
  color: var(--muted);
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}
.proj__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.flag-wrap {
  margin-bottom: clamp(24px, 3vw, 36px);
}
.flag {
  overflow: hidden;
  box-shadow: 10px 10px 0 var(--shadow);
}
.flag__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 1.1rem;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--on-accent);
  background: var(--violet);
  border-bottom: var(--bw) solid var(--line);
}
.flag__grid {
  display: grid;
  gap: clamp(24px, 4vw, 48px);
  padding: clamp(20px, 3vw, 36px);
}
.flag__main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.1rem;
}
.flag__title {
  font-size: clamp(2rem, 4.4vw, 3.2rem);
  font-weight: 700;
  line-height: 0.98;
  letter-spacing: -0.045em;
  text-transform: uppercase;
}
.flag__tag {
  display: inline-block;
  padding: 0.25rem 0.7rem;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--on-accent);
  background: var(--yellow);
  border: 2px solid var(--line);
  border-radius: 8px;
  transform: rotate(-1deg);
}
.flag__desc {
  font-size: 1.02rem;
  font-weight: 500;
  color: var(--muted);
}
.flag__points {
  display: grid;
  gap: 0.85rem;
  align-content: start;
}
.flag__points li {
  display: flex;
  gap: 0.9rem;
  padding: 0.85rem 1rem;
  background: var(--paper-2);
  border: 2px solid var(--line);
  border-radius: 12px;
}
.flag__num {
  flex: none;
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--on-accent);
  background: var(--violet);
  border: 2px solid var(--line);
  border-radius: 8px;
}
.flag__points p {
  font-size: 0.93rem;
  font-weight: 500;
  line-height: 1.5;
}
.flag__points strong {
  font-weight: 700;
}

.more {
  margin-top: clamp(56px, 8vw, 96px);
}
.more__title {
  font-size: clamp(1.6rem, 3.5vw, 2.4rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  text-transform: uppercase;
}
.more__title .mono {
  color: var(--pink);
}
.more__grid {
  display: grid;
  gap: 1.4rem;
  margin-top: 1.75rem;
}
.more__grid > li {
  display: flex;
}
.mini {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  padding: 1.1rem 1.2rem 1.2rem;
  border-top: 10px solid var(--c);
}
.mini__title {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
}
.mini__title a {
  text-decoration: none;
}
/* Stretch the title link over the whole card. */
.mini__title a::after {
  content: "";
  position: absolute;
  inset: 0;
}
.mini__desc {
  flex: 1;
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--muted);
}
.more__all {
  margin-top: 2rem;
}

@media (min-width: 1000px) {
  .flag__grid {
    grid-template-columns: 0.9fr 1.1fr;
  }
}
@media (min-width: 860px) {
  .featured {
    grid-template-columns: 1fr 1fr;
  }
  .more__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1080px) {
  .more__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
