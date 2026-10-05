<script setup lang="ts">
import { GraduationCap, Trophy } from "lucide-vue-next";
import { achievements, education } from "~/data/education";
</script>

<template>
  <section id="education" class="section" aria-labelledby="edu-h">
    <div class="container">
      <SectionHeading id="edu-h" index="05" label="education" title="Education & Achievements" color="var(--orange)">
        Education <span class="mark" style="--c: var(--orange)">&amp;</span> achievements
      </SectionHeading>

      <div class="edu">
        <div v-reveal>
          <article class="card card--lift edu__card" style="--c: var(--green)">
            <span class="edu__icon"><GraduationCap :size="26" aria-hidden="true" /></span>
            <h3 class="edu__title">{{ education.degree }}</h3>
            <p class="edu__school">{{ education.school }}, {{ education.location }}</p>
            <p class="edu__meta mono">
              <span class="chip">{{ education.period }}</span>
              <span class="chip">{{ education.detail }}</span>
            </p>
          </article>
        </div>

        <div v-reveal="80">
          <article class="card card--lift edu__card" style="--c: var(--pink)">
            <span class="edu__icon"><Trophy :size="26" aria-hidden="true" /></span>
            <h3 class="edu__title">Achievements</h3>
            <ul class="edu__list">
              <li v-for="a in achievements" :key="a">{{ a }}</li>
            </ul>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.edu {
  display: grid;
  gap: 1.75rem;
}
.edu > div {
  display: flex;
}
.edu__card {
  position: relative;
  width: 100%;
  padding: 1.5rem 1.5rem 1.6rem;
}
.edu__icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  margin-bottom: 1rem;
  color: var(--on-accent);
  background: var(--c);
  border: var(--bw) solid var(--line);
  border-radius: 12px;
  box-shadow: 3px 3px 0 var(--shadow);
  transform: rotate(-4deg);
}
.edu__title {
  font-size: clamp(1.3rem, 2.4vw, 1.7rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.03em;
}
.edu__school {
  margin-top: 0.6rem;
  font-weight: 600;
  color: var(--muted);
}
.edu__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}
.edu__list {
  display: grid;
  gap: 0.7rem;
  margin-top: 1rem;
}
.edu__list li {
  position: relative;
  padding-left: 1.6rem;
  font-weight: 600;
}
.edu__list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.4em;
  width: 0.7rem;
  height: 0.7rem;
  background: var(--c);
  border: 2px solid var(--line);
  border-radius: 3px;
}

@media (min-width: 800px) {
  .edu {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
