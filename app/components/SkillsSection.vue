<script setup lang="ts">
import { skillGroups } from "~/data/skills";

const colors = ["var(--yellow)", "var(--pink)", "var(--blue)", "var(--green)", "var(--orange)", "var(--violet)"];
</script>

<template>
  <section id="skills" class="section" aria-labelledby="skills-h">
    <div class="container">
      <SectionHeading id="skills-h" index="04" label="skills" title="Skills" color="var(--green)">
        My <span class="mark" style="--c: var(--green)">toolbox</span>
      </SectionHeading>

      <ul class="skills">
        <li v-for="(g, i) in skillGroups" :key="g.label" v-reveal="(i % 3) * 70">
          <div class="group card card--lift">
            <h3 class="group__label" :style="{ background: colors[i % colors.length] }">
              <span class="mono">{{ String(i + 1).padStart(2, "0") }}</span>
              {{ g.label }}
            </h3>
            <ul class="group__chips">
              <li v-for="s in g.skills" :key="s" class="chip">{{ s }}</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.skills {
  display: grid;
  gap: 1.5rem;
}
.skills > li {
  display: flex;
}
.group {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
}
.group__label {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  padding: 0.7rem 1.1rem;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--on-accent);
  border-bottom: var(--bw) solid var(--line);
}
.group__label .mono {
  font-size: 0.75rem;
  opacity: 0.7;
}
.group__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1.1rem;
}

@media (min-width: 700px) {
  .skills {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1080px) {
  .skills {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
