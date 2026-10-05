// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  css: [
    "@fontsource-variable/space-grotesk",
    "@fontsource/jetbrains-mono/400.css",
    "@fontsource/jetbrains-mono/600.css",
    "@fontsource/jetbrains-mono/700.css",
    "~/assets/css/main.css",
  ],
  typescript: { strict: true },
  // Fully static output: every route is prerendered at build time.
  routeRules: { "/": { prerender: true } },
  nitro: { prerender: { routes: ["/"] } },
});
