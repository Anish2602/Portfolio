<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();
const is404 = computed(() => props.error?.statusCode === 404);
useHead({ title: is404.value ? "Page not found — Anish Kumar" : "Something broke — Anish Kumar" });
</script>

<template>
  <main class="err">
    <div class="err__card card">
      <p class="eyebrow" style="--c: var(--pink)">error / {{ error.statusCode }}</p>
      <h1 class="err__code">{{ error.statusCode }}</h1>
      <p class="err__msg">
        {{ is404 ? "That page doesn't exist — the route you wanted is not deployed." : "Something broke on my end." }}
      </p>
      <a href="/" class="btn">← Back to the portfolio</a>
    </div>
  </main>
</template>

<style scoped>
.err {
  display: grid;
  place-items: center;
  min-height: 100vh;
  padding: 24px;
}
.err__card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.2rem;
  max-width: 34rem;
  padding: clamp(24px, 5vw, 48px);
  box-shadow: 10px 10px 0 var(--shadow);
}
.err__code {
  font-size: clamp(5rem, 22vw, 10rem);
  font-weight: 700;
  line-height: 0.85;
  letter-spacing: -0.07em;
  color: var(--on-accent);
  background: var(--yellow);
  padding: 0 0.1em;
  border: var(--bw) solid var(--line);
  border-radius: 0.1em;
  transform: rotate(-2deg);
}
.err__msg {
  font-size: 1.15rem;
  font-weight: 600;
}
</style>
