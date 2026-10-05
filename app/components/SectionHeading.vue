<script setup lang="ts">
defineProps<{ index: string; label: string; title: string; color?: string; id?: string }>();
</script>

<template>
  <div v-reveal class="sh">
    <p class="eyebrow" :style="{ '--c': color ?? 'var(--yellow)' }">{{ index }} / {{ label }}</p>
    <h2 :id="id" class="h2"><slot>{{ title }}</slot></h2>
  </div>
</template>

<style scoped>
.sh {
  margin-bottom: clamp(32px, 5vw, 56px);
}
</style>
