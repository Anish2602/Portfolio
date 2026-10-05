# Anish Kumar — Developer Portfolio (Nuxt / Vue redesign)

Personal portfolio of **Anish Kumar**, Backend & AI Infrastructure Engineer.
A neo-brutalist redesign built with **Nuxt 4 · Vue 3 (Composition API) · TypeScript**, fully static (prerendered), deployable to Vercel with zero config.

> The previous Next.js version lives on the `main` branch.

## Design

- **Neo-brutalist** system: thick ink borders, hard offset shadows, flat saturated colour, chunky type (Space Grotesk + JetBrains Mono, self-hosted via Fontsource)
- **Light + dark** themes, persisted in `localStorage` and applied before first paint (no flash)
- Interactive hero **terminal** (`help`, `skills`, `projects`, `interview`, `ask <n>`, `resume`, `resume devops`, `theme`, `sudo hire-me` …) with quick-command chips and ↑/↓ history
- **⌘K / Ctrl+K command palette** — jump to sections, open either résumé, GitHub/LinkedIn, toggle theme
- **Two résumés** (Backend & AI / DevOps) behind a dropdown in the header and hero
- Scrollspy nav, scroll-progress bar, scroll reveals, tech marquee
- Respects `prefers-reduced-motion`; keyboard accessible with visible focus states and a skip link

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run generate   # static build → .output/public
npm run preview
```

Requires Node 20+.

## Project structure

```
app/
├── app.vue                  # Page composition, SEO/OG meta, theme bootstrap
├── error.vue                # 404 / error page
├── assets/css/main.css      # Design tokens (light/dark), buttons, cards, chips
├── plugins/reveal.ts        # v-reveal scroll-reveal directive
├── composables/             # useTheme, usePalette
├── components/              # AppHeader, HeroSection, TerminalWindow, CommandPalette,
│                            # ResumeMenu, TechMarquee, About/Experience/Projects/
│                            # Skills/Education/Contact sections, AppFooter …
└── data/                    # ⬅ ALL editable content lives here
public/
├── resume.pdf               # Backend & AI résumé
├── resume-devops.pdf        # DevOps résumé
├── logos/                   # Company logos
├── og.png, favicon.svg, robots.txt, sitemap.xml
```

## Editing content

Every piece of content is typed data in [`app/data`](app/data) — components just render it.

| To change… | Edit |
| --- | --- |
| Name, title, tagline, contact, socials, résumé paths, **site URL** | `app/data/site.ts` |
| About paragraphs | `app/data/about.ts` |
| Headline numbers under About | `app/data/stats.ts` |
| Jobs, bullet points, tech tags, logos (supports multi-`tracks` roles) | `app/data/experience.ts` |
| Featured projects & GitHub cards | `app/data/projects.ts` |
| Skill groups | `app/data/skills.ts` |
| Degree & achievements | `app/data/education.ts` |
| Terminal interview Q&A | `app/data/interview.ts` |
| Résumés | Replace `public/resume.pdf` / `public/resume-devops.pdf` (keep filenames) |

Theme colours and spacing are CSS variables at the top of `app/assets/css/main.css`.

## Deploying to Vercel

Import the repo — Vercel detects Nuxt automatically. Update `url` in `app/data/site.ts` (and the URL in `public/sitemap.xml` / `public/robots.txt`) if the domain changes.
