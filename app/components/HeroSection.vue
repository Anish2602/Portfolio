<script setup lang="ts">
import { ArrowDown, Mail } from "lucide-vue-next";
import { site } from "~/data/site";

const [first = "", ...rest] = site.name.split(" ");
const last = rest.join(" ");
</script>

<template>
  <section id="top" class="hero">
    <div class="container hero__grid">
      <div class="hero__copy">
        <p v-reveal class="hero__status mono">
          <span class="hero__ping" aria-hidden="true"><i /></span>
          Open to backend, AI infra &amp; DevOps roles
        </p>

        <h1 v-reveal="80" class="hero__name">
          <span class="hero__first">{{ first }}</span>
          <span class="hero__last"><span>{{ last }}</span></span>
        </h1>

        <p v-reveal="160" class="hero__title">{{ site.title }}</p>
        <p v-reveal="220" class="hero__tagline">{{ site.tagline }}</p>

        <div v-reveal="280" class="hero__cta">
          <a href="#projects" class="btn">
            View projects <ArrowDown :size="18" aria-hidden="true" />
          </a>
          <a href="#contact" class="btn btn--paper" style="--c: var(--pink)">
            <Mail :size="18" aria-hidden="true" /> Get in touch
          </a>
          <ResumeMenu />
        </div>
      </div>

      <div v-reveal="200">
        <div class="hero__term">
          <div class="hero__badge"><RotatingBadge /></div>
          <TerminalWindow />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding-block: clamp(40px, 7vw, 88px) clamp(56px, 8vw, 104px);
}
.hero__grid {
  display: grid;
  gap: clamp(36px, 5vw, 64px);
  align-items: center;
}

.hero__status {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 0.9rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--on-accent);
  background: var(--green);
  border: 2px solid var(--line);
  border-radius: 999px;
  box-shadow: 3px 3px 0 var(--shadow);
  transform: rotate(-1.5deg);
}
.hero__ping {
  position: relative;
  width: 10px;
  height: 10px;
  background: #121212;
  border-radius: 50%;
}
.hero__ping i {
  position: absolute;
  inset: 0;
  background: #121212;
  border-radius: 50%;
  animation: ping 1.6s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.hero__name {
  margin-top: 1.4rem;
  font-size: clamp(3.4rem, 16vw, 8.6rem);
  font-weight: 700;
  line-height: 0.86;
  letter-spacing: -0.06em;
  text-transform: uppercase;
}
.hero__first,
.hero__last {
  display: block;
}
.hero__last span {
  display: inline-block;
  padding: 0.02em 0.14em 0.06em;
  margin-left: -0.04em;
  color: var(--on-accent);
  background: var(--yellow);
  border: var(--bw) solid var(--line);
  border-radius: 0.1em;
  box-shadow: 0.06em 0.06em 0 var(--shadow);
  transform: rotate(-2deg);
}

.hero__title {
  display: inline-block;
  margin-top: 1.6rem;
  padding: 0.35rem 0.9rem;
  font-size: clamp(1.05rem, 2.4vw, 1.4rem);
  font-weight: 700;
  color: var(--on-accent);
  background: var(--pink);
  border: var(--bw) solid var(--line);
  border-radius: 10px;
  box-shadow: 4px 4px 0 var(--shadow);
}
.hero__tagline {
  max-width: 34rem;
  margin-top: 1.4rem;
  font-size: clamp(1.05rem, 1.6vw, 1.25rem);
  line-height: 1.55;
  color: var(--muted);
  font-weight: 500;
}
.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  margin-top: 2rem;
}

.hero__term {
  position: relative;
  transform: rotate(0.8deg);
}
.hero__badge {
  position: absolute;
  top: -58px;
  right: -14px;
  z-index: 2;
}

@media (min-width: 1000px) {
  .hero__grid {
    grid-template-columns: 1.1fr 0.9fr;
  }
}
@media (max-width: 999px) {
  /* Leave room above the terminal for the badge so it never overlaps the CTAs. */
  .hero__term {
    margin-top: 4.5rem;
  }
}
@media (max-width: 520px) {
  .hero__badge {
    top: -78px;
    right: -4px;
    transform: scale(0.8);
    transform-origin: top right;
  }
}
</style>
