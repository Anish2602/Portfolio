// v-reveal="delayMs" — fade/slide an element in as it scrolls into view.
// Elements already on screen at mount are left alone, and nothing is hidden
// without JS, so content never depends on the observer firing.
export default defineNuxtPlugin((nuxtApp) => {
  let io: IntersectionObserver | null = null;

  const clear = (el: HTMLElement) => {
    el.classList.remove("reveal-pending", "is-in");
    el.style.transitionDelay = "";
  };

  const observer = () =>
    (io ??= new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          io?.unobserve(el);
          el.classList.add("is-in");
          // Drop the reveal classes once done so hover transitions stay snappy.
          const done = () => clear(el);
          el.addEventListener("transitionend", done, { once: true });
          setTimeout(done, 1600);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.04 },
    ));

  nuxtApp.vueApp.directive("reveal", {
    mounted(el: HTMLElement, binding) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return;
      if (binding.value) el.style.transitionDelay = `${binding.value}ms`;
      el.classList.add("reveal-pending");
      observer().observe(el);
    },
    unmounted(el: HTMLElement) {
      io?.unobserve(el);
    },
    getSSRProps: () => ({}),
  });
});
