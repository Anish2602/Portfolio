# Anish Kumar — Developer Portfolio

Personal portfolio of **Anish Kumar**, Backend & AI Infrastructure Engineer — building event-driven backend systems and GPU-backed AI model-serving pipelines with FastAPI, Kafka, Kubernetes, on Azure & AWS.

Built with **Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion**, fully static (SSG), deployed on Vercel.

> 🔗 **Live site:** https://portfolio-seven-lilac-86wrjccips.vercel.app

---

## ✨ Highlights

### Interactive hero terminal
The hero features a working terminal that auto-types `whoami` on load and then accepts real commands:

| Command | What it does |
| --- | --- |
| `help` | List all available commands |
| `whoami` | Name + title |
| `skills` | Top skill groups |
| `projects` | Featured project list |
| `contact` | Email, phone, GitHub |
| `interview` | **10 real interview questions recruiters ask me** |
| `ask <n>` | My answer to interview question *n* (e.g. `ask 2`) |
| `resume` | Opens `resume.pdf` |
| `github` | Opens my GitHub profile |
| `theme` | Toggles light/dark mode |
| `sudo hire-me` | `[sudo] permission granted ✓` |
| `clear` | Clears the terminal |

### ⌘K command palette
Press <kbd>⌘</kbd><kbd>K</kbd> (or <kbd>Ctrl</kbd><kbd>K</kbd>) anywhere — Linear-style palette with fuzzy filtering: jump to any section, download the résumé, open GitHub/LinkedIn, email me, or toggle the theme. Full keyboard navigation (arrows / Enter / Esc).

### Design & motion
- **Dark mode by default** with a persisting light/dark toggle (`next-themes`, stored in `localStorage`)
- Cursor-following **accent spotlight** across the page
- **Mouse-tracked glow borders** on project cards
- Technical **grid backdrop** in the hero, shimmering gradient headline, pulsing "open to roles" badge
- **Scroll progress bar** + scrollspy nav (active section highlighted)
- Subtle fade/slide-up reveals on scroll
- Every animation respects **`prefers-reduced-motion`**; the cursor spotlight is skipped on touch devices

### Engineering quality
- **100% static output** — every route prerendered, no server required (~169 kB first load JS)
- **Zero animation/UI libraries beyond Framer Motion** — the terminal, palette, glow cards, and spotlight are all hand-rolled
- Semantic HTML, keyboard accessible (skip link, focus rings, ARIA labels), WCAG AA contrast
- SEO complete: per-page meta, Open Graph + Twitter cards, **generated OG image** (`next/og`), `sitemap.xml`, `robots.txt`, favicon

---

## 🧱 Tech stack

| Layer | Choice |
| --- | --- |
| Framework | [Next.js 15](https://nextjs.org) (App Router, static generation) |
| Language | TypeScript (strict) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) + CSS custom properties for theming |
| Components | shadcn/ui-style primitives (`Button`, `Badge`, `Card` with `class-variance-authority`) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) (class strategy, persisted) |
| Icons | [lucide-react](https://lucide.dev) |
| Fonts | Inter (headings/body) + JetBrains Mono (labels, code, terminal) via `next/font` |
| Deploy | Vercel (zero-config) |

---

## 🚀 Getting started

```bash
# install
npm install

# dev server → http://localhost:3000
npm run dev

# production build + serve
npm run build
npm start
```

Requires Node 18.18+ (Node 20+ recommended).

---

## 📁 Project structure

```
├── app/
│   ├── layout.tsx            # Root layout: fonts, theme provider, metadata/SEO
│   ├── page.tsx              # Single-page composition of all sections
│   ├── globals.css           # Tailwind 4 theme tokens (light/dark), keyframes
│   ├── opengraph-image.tsx   # OG image generated at build time (next/og)
│   ├── sitemap.ts            # /sitemap.xml
│   ├── robots.ts             # /robots.txt
│   └── icon.svg              # Favicon
├── components/
│   ├── hero.tsx              # Hero: badge, gradient name, CTAs, terminal
│   ├── terminal.tsx          # Interactive terminal (all commands)
│   ├── command-palette.tsx   # ⌘K palette
│   ├── navbar.tsx            # Sticky nav: scrollspy, palette trigger, theme toggle
│   ├── scroll-progress.tsx   # Top scroll progress bar
│   ├── spotlight.tsx         # Cursor-following accent glow
│   ├── glow-card.tsx         # Mouse-tracked glow border wrapper
│   ├── reveal.tsx            # Scroll-reveal wrapper (reduced-motion aware)
│   ├── section.tsx           # Section shell: numbered mono tag + heading
│   ├── about / experience / projects / skills / education / contact
│   └── ui/                   # Button, Badge, Card primitives
├── data/                     # ⬅ ALL editable content lives here
│   ├── site.ts               # Name, title, tagline, links, site URL, nav
│   ├── about.ts              # About paragraphs
│   ├── experience.ts         # Jobs, highlights, tech tags, company logos
│   ├── projects.ts           # Featured projects + secondary GitHub repos
│   ├── skills.ts             # Skill groups
│   ├── education.ts          # Degree + achievements
│   └── interview.ts          # The 10 interview Q&As for `interview` / `ask <n>`
├── lib/utils.ts              # cn() class-merge helper
└── public/
    ├── resume.pdf            # Served at /resume.pdf
    └── logos/                # Company logo SVGs (Centific, Movidu, Adoptev)
```

---

## ✏️ Editing content (no component changes needed)

Every piece of content is typed data in [`/data`](data) — components just map over it.

| To change… | Edit |
| --- | --- |
| Name, title, tagline, email, phone, socials, **site URL** | [`data/site.ts`](data/site.ts) |
| About paragraphs | [`data/about.ts`](data/about.ts) |
| Jobs, bullet points, tech tags, company logos | [`data/experience.ts`](data/experience.ts) |
| Featured projects & secondary GitHub repo cards | [`data/projects.ts`](data/projects.ts) |
| Skill groups / pills | [`data/skills.ts`](data/skills.ts) |
| Degree, CGPA, achievements | [`data/education.ts`](data/education.ts) |
| Interview questions & answers (terminal) | [`data/interview.ts`](data/interview.ts) |
| Résumé | Replace [`public/resume.pdf`](public/resume.pdf) (keep the filename) |

### Adding a company logo
1. Drop an SVG/PNG into `public/logos/`
2. In `data/experience.ts` set `logo: "/logos/yourfile.svg"` — and for non-square logos also `logoWidth` / `logoHeight` (intrinsic ratio)

### Changing the accent color / theme
All theme tokens are CSS variables in [`app/globals.css`](app/globals.css) (`:root` for light, `.dark` for dark) — change `--accent` in both blocks and the whole site follows: buttons, glows, terminal prompt, progress bar, selection color.

---

## ☁️ Deploying to Vercel

1. Push the repo to GitHub (already done if you're reading this there)
2. Go to [vercel.com/new](https://vercel.com/new) → **Import** this repository
3. Vercel auto-detects Next.js — accept defaults, click **Deploy**
4. After the first deploy, copy the production URL into `url` in [`data/site.ts`](data/site.ts) and push — this points the OG tags, sitemap, and robots at your real domain

No `vercel.json` is needed; Next.js is zero-config on Vercel. Every push to `main` auto-deploys.

---

## ♿ Accessibility & performance notes

- Skip-to-content link, semantic landmarks, `aria-label`s on icon-only controls, visible focus rings
- Scrollspy and palette are keyboard-first; the palette is a proper `role="dialog"` with listbox semantics
- `prefers-reduced-motion` disables the shimmer, caret blink, reveals, spotlight, and progress bar
- All routes statically prerendered; fonts self-hosted via `next/font` (no layout shift, no external font requests)

---

## 📬 Contact

- **Email:** anish.26022002@gmail.com
- **GitHub:** [github.com/Anish2602](https://github.com/Anish2602)
- **LinkedIn:** [linkedin.com/in/anish-kumar](https://linkedin.com/in/anish-kumar)

Or just open the site and type `sudo hire-me` in the terminal. 😄
