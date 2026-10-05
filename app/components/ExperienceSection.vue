<script setup lang="ts">
import { experience } from "~/data/experience";

const trackColors = ["var(--blue)", "var(--orange)", "var(--green)"];
</script>

<template>
  <section id="experience" class="section" aria-labelledby="exp-h">
    <div class="container">
      <SectionHeading id="exp-h" index="02" label="experience" title="Experience" color="var(--blue)">
        Where I've <span class="mark" style="--c: var(--blue)">shipped</span>
      </SectionHeading>

      <div class="jobs">
        <article
          v-for="(job, ji) in experience"
          :key="`${job.company}-${job.role}`"
          v-reveal="ji * 60"
          class="job card"
        >
          <header class="job__head">
            <div v-if="job.logo" class="job__logo">
              <img :src="job.logo" :alt="`${job.company} logo`" :width="job.logoWidth ?? 28" :height="job.logoHeight ?? 28" />
            </div>
            <div class="job__id">
              <h3 class="job__company">{{ job.company }}</h3>
              <p class="job__role">{{ job.role }}</p>
            </div>
            <p class="job__meta mono">
              <span class="job__period">{{ job.period }}</span>
              <span>{{ job.location }}</span>
            </p>
          </header>

          <div v-if="job.tracks" class="tracks">
            <section v-for="(track, ti) in job.tracks" :key="track.label" class="track" :style="{ '--c': trackColors[ti % trackColors.length] }">
              <h4 class="track__label"><span class="mono">0{{ ti + 1 }}</span> {{ track.label }}</h4>
              <ul class="bullets">
                <li v-for="h in track.highlights" :key="h">{{ h }}</li>
              </ul>
              <ul v-if="track.tech" class="chips">
                <li v-for="t in track.tech" :key="t" class="chip">{{ t }}</li>
              </ul>
            </section>
          </div>

          <div v-else class="track track--flat" style="--c: var(--green)">
            <ul class="bullets">
              <li v-for="h in job.highlights" :key="h">{{ h }}</li>
            </ul>
            <ul v-if="job.tech" class="chips">
              <li v-for="t in job.tech" :key="t" class="chip">{{ t }}</li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.jobs {
  display: grid;
  gap: clamp(28px, 4vw, 44px);
}
.job {
  padding: clamp(18px, 3vw, 30px);
}
.job__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.25rem;
  padding-bottom: 1.25rem;
  margin-bottom: 1.5rem;
  border-bottom: var(--bw) solid var(--line);
}
.job__logo {
  display: grid;
  place-items: center;
  flex: none;
  min-width: 56px;
  height: 56px;
  padding: 0 0.6rem;
  background: #fff;
  border: var(--bw) solid var(--line);
  border-radius: 12px;
  box-shadow: 3px 3px 0 var(--shadow);
}
.job__logo img {
  height: 30px;
  width: auto;
}
.job__company {
  font-size: clamp(1.6rem, 3.4vw, 2.4rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
  text-transform: uppercase;
}
.job__role {
  display: inline-block;
  margin-top: 0.4rem;
  padding: 0.1rem 0.55rem;
  font-weight: 700;
  color: var(--on-accent);
  background: var(--yellow);
  border: 2px solid var(--line);
  border-radius: 6px;
}
.job__meta {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;
  margin-left: auto;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--muted);
}
.job__period {
  padding: 0.15rem 0.6rem;
  color: var(--on-accent);
  background: var(--pink);
  border: 2px solid var(--line);
  border-radius: 999px;
  font-weight: 700;
}

.tracks {
  display: grid;
  gap: 1.5rem;
}
.track {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.1rem;
  background: var(--paper-2);
  border: var(--bw) solid var(--line);
  border-radius: 14px;
}
.track--flat {
  background: transparent;
  border: 0;
  padding: 0;
}
.track__label {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.35rem 0.85rem;
  font-size: 1.02rem;
  font-weight: 700;
  color: var(--on-accent);
  background: var(--c);
  border: var(--bw) solid var(--line);
  border-radius: 10px;
  box-shadow: 3px 3px 0 var(--shadow);
  transform: rotate(-1deg);
}
.track__label .mono {
  font-size: 0.78rem;
  opacity: 0.75;
}
.bullets {
  display: grid;
  gap: 0.75rem;
}
.bullets li {
  position: relative;
  padding-left: 1.6rem;
  font-size: 0.97rem;
  line-height: 1.5;
  font-weight: 500;
}
.bullets li::before {
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
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: auto;
}

@media (min-width: 1000px) {
  .tracks {
    grid-template-columns: 1fr 1fr;
    align-items: stretch;
  }
}
</style>
