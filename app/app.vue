<script setup lang="ts">
import { site } from "~/data/site";

const { sync } = useTheme();

const title = `${site.name} — ${site.title}`;
const image = `${site.url}/og.png`;

useHead({
  htmlAttrs: { lang: "en" },
  title,
  link: [
    { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    { rel: "canonical", href: site.url },
  ],
  meta: [
    { name: "keywords", content: site.keywords.join(", ") },
    { name: "author", content: site.name },
    { name: "theme-color", content: "#fff1cf" },
  ],
  script: [
    {
      // Apply the saved theme before first paint to avoid a flash.
      innerHTML:
        "try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t)}catch(e){}",
      tagPosition: "head",
    },
  ],
});

useSeoMeta({
  description: site.description,
  robots: "index, follow",
  ogType: "website",
  ogUrl: site.url,
  ogTitle: title,
  ogDescription: site.description,
  ogSiteName: site.name,
  ogImage: image,
  twitterCard: "summary_large_image",
  twitterTitle: title,
  twitterDescription: site.description,
  twitterImage: image,
});

onMounted(sync);
</script>

<template>
  <div>
    <a class="skip-link" href="#main">Skip to content</a>
    <AppHeader />
    <main id="main">
      <HeroSection />
      <TechMarquee />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
    </main>
    <AppFooter />
    <CommandPalette />
  </div>
</template>
