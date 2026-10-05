<script setup lang="ts">
import { about } from "~/data/about";
import { education } from "~/data/education";
import { site } from "~/data/site";
import { stats } from "~/data/stats";

const [lead = "", ...more] = about.paragraphs;
const statColors = ["var(--yellow)", "var(--pink)", "var(--green)", "var(--blue)"];
const facts = [
  { k: "Role", v: site.title },
  { k: "Based in", v: site.location },
  { k: "Education", v: `${education.school} · ${education.period}` },
  { k: "Focus", v: "FastAPI · Kafka · Kubernetes · Azure & AWS" },
];
</script>

<template>
  <section id="about" class="section" aria-labelledby="about-h">
    <div class="container">
      <SectionHeading id="about-h" index="01" label="about" title="About" color="var(--yellow)">
        About <span class="mark">me</span>
      </SectionHeading>

      <div class="about">
        <div class="about__text">
          <p v-reveal class="about__lead">{{ lead }}</p>
          <p v-for="(p, i) in more" :key="i" v-reveal="(i + 1) * 80" class="about__p">{{ p }}</p>
        </div>

        <div v-reveal="120">
          <aside class="id card" aria-label="Quick facts">
            <div class="id__bar mono">ID · {{ site.name.toUpperCase() }}</div>
            <dl class="id__rows">
              <div v-for="f in facts" :key="f.k" class="id__row">
                <dt class="mono">{{ f.k }}</dt>
                <dd>{{ f.v }}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>

      <ul class="stats">
        <li
          v-for="(s, i) in stats"
          :key="s.value"
          v-reveal="i * 80"
          class="stat card card--lift"
          :style="{ background: statColors[i % statColors.length], color: 'var(--on-accent)' }"
        >
          <strong class="stat__value">{{ s.value }}</strong>
          <span class="stat__label">{{ s.label }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.about {
  display: grid;
  gap: clamp(28px, 4vw, 48px);
  align-items: start;
}
.about__text {
  display: grid;
  gap: 1.25rem;
}
.about__lead {
  font-size: clamp(1.35rem, 2.6vw, 1.9rem);
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: -0.02em;
}
.about__p {
  max-width: 44rem;
  color: var(--muted);
  font-weight: 500;
}

.id {
  overflow: hidden;
  transform: rotate(1.2deg);
}
.id__bar {
  padding: 0.6rem 1rem;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--on-accent);
  background: var(--pink);
  border-bottom: var(--bw) solid var(--line);
}
.id__rows {
  margin: 0;
}
.id__row {
  padding: 0.85rem 1rem;
  border-bottom: 2px dashed var(--line);
}
.id__row:last-child {
  border-bottom: 0;
}
.id__row dt {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}
.id__row dd {
  margin: 0.15rem 0 0;
  font-weight: 700;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 1.4rem;
  margin-top: clamp(40px, 6vw, 72px);
}
.stat {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1.3rem 1.3rem 1.4rem;
}
.stat__value {
  font-size: clamp(2.8rem, 5.5vw, 4rem);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.05em;
}
.stat__label {
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.35;
}

@media (min-width: 900px) {
  .about {
    grid-template-columns: 1.5fr 0.8fr;
  }
}
</style>
