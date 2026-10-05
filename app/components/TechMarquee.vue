<script setup lang="ts">
import { skillGroups } from "~/data/skills";

const techs = [...new Set(skillGroups.flatMap((g) => g.skills))];
const colors = ["var(--yellow)", "var(--pink)", "var(--green)", "var(--blue)", "var(--orange)"];
</script>

<template>
  <div class="marquee" aria-hidden="true">
    <div class="marquee__track">
      <template v-for="copy in 2" :key="copy">
        <span v-for="(t, i) in techs" :key="`${copy}-${t}`" class="marquee__item">
          {{ t }}<b :style="{ color: colors[i % colors.length] }">✱</b>
        </span>
      </template>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  overflow: hidden;
  color: var(--bg);
  background: var(--ink);
  border-block: var(--bw) solid var(--line);
  transform: rotate(-1deg);
  margin-inline: -2%;
  width: 104%;
}
.marquee__track {
  display: flex;
  width: max-content;
  padding-block: 0.9rem;
  animation: marquee 60s linear infinite;
}
.marquee__item {
  display: inline-flex;
  align-items: center;
  gap: 1.4rem;
  padding-right: 1.4rem;
  font-size: clamp(1.1rem, 2.4vw, 1.6rem);
  font-weight: 700;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  white-space: nowrap;
}
.marquee__item b {
  font-size: 1.2em;
}
.marquee:hover .marquee__track {
  animation-play-state: paused;
}
</style>
