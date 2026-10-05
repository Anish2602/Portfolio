<script setup lang="ts">
import { ArrowUp } from "lucide-vue-next";
import { site } from "~/data/site";

const year = new Date().getFullYear();
</script>

<template>
  <footer class="foot">
    <div class="container foot__in">
      <p class="mono">© {{ year }} {{ site.name }} · Built with Nuxt &amp; Vue</p>
      <a href="#top" class="foot__top mono">Back to top <ArrowUp :size="16" aria-hidden="true" /></a>
    </div>
  </footer>
</template>

<style scoped>
.foot {
  color: var(--bg);
  background: var(--ink);
  border-top: var(--bw) solid var(--line);
}
.foot__in {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem 1.5rem;
  padding-block: 1.4rem;
  font-size: 0.82rem;
}
.foot__top {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 700;
  text-decoration: none;
}
.foot__top:hover {
  color: var(--yellow);
}
</style>
