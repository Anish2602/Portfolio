<script setup lang="ts">
const bar = ref<HTMLElement | null>(null);
let raf = 0;

function update() {
  raf = 0;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
  if (bar.value) bar.value.style.transform = `scaleX(${p})`;
}
function onScroll() {
  if (!raf) raf = requestAnimationFrame(update);
}

onMounted(() => {
  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
  if (raf) cancelAnimationFrame(raf);
});
</script>

<template>
  <div ref="bar" class="progress" aria-hidden="true" />
</template>

<style scoped>
.progress {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 90;
  height: 6px;
  background: var(--pink);
  border-bottom: 2px solid var(--line);
  transform: scaleX(0);
  transform-origin: left;
}
</style>
