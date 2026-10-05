<script setup lang="ts">
import { Github, Linkedin, Mail, Phone } from "lucide-vue-next";
import { site } from "~/data/site";

const tel = site.phone.replace(/\s/g, "");
</script>

<template>
  <section id="contact" class="section" aria-labelledby="contact-h">
    <div class="container">
      <div v-reveal>
        <div class="cta card">
          <p class="eyebrow" style="--c: var(--pink)">06 / contact</p>
          <h2 id="contact-h" class="cta__title">Get in <span>touch</span></h2>
          <p class="cta__copy">
            Open to senior backend (Python/FastAPI), AI infrastructure and DevOps engineering roles.
            My inbox is always open — say hello.
          </p>
          <a :href="`mailto:${site.email}`" class="cta__mail">{{ site.email }}</a>
          <div class="cta__actions">
            <a :href="`mailto:${site.email}`" class="btn btn--paper"><Mail :size="18" aria-hidden="true" /> Email me</a>
            <a :href="`tel:${tel}`" class="btn btn--paper" style="--c: var(--green)"><Phone :size="18" aria-hidden="true" /> {{ site.phone }}</a>
            <a :href="site.social.github" class="icon-btn" style="--c: var(--blue)" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
              <Github :size="20" aria-hidden="true" />
            </a>
            <a :href="site.social.linkedin" class="icon-btn" style="--c: var(--pink)" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
              <Linkedin :size="20" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.4rem;
  padding: clamp(24px, 5vw, 56px);
  color: var(--on-accent);
  background: var(--yellow);
  box-shadow: 10px 10px 0 var(--shadow);
  overflow: hidden;
}
.cta::after {
  content: "✱";
  position: absolute;
  right: -0.1em;
  bottom: -0.35em;
  font-size: clamp(9rem, 26vw, 20rem);
  line-height: 1;
  color: rgba(18, 18, 18, 0.1);
  pointer-events: none;
}
.cta__title {
  font-size: clamp(3rem, 10vw, 7.5rem);
  font-weight: 700;
  line-height: 0.88;
  letter-spacing: -0.06em;
  text-transform: uppercase;
}
.cta__title span {
  display: inline-block;
  padding: 0 0.12em 0.04em;
  color: #fff;
  background: #121212;
  border-radius: 0.1em;
  transform: rotate(-2deg);
}
.cta__copy {
  max-width: 38rem;
  font-size: clamp(1.05rem, 1.8vw, 1.3rem);
  font-weight: 600;
  line-height: 1.5;
}
.cta__mail {
  font-size: clamp(1.15rem, 3.6vw, 2.4rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  word-break: break-all;
  text-decoration: underline;
  text-decoration-thickness: 4px;
  text-underline-offset: 6px;
}
.cta__mail:hover {
  text-decoration-color: var(--pink);
}
.cta__actions {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.9rem;
}
</style>
