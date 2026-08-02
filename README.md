# Anish Kumar — Portfolio

Personal portfolio of **Anish Kumar**, Backend & AI Infrastructure Engineer.
Built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Features

- Static-first (SSG) — fast, no backend required
- Dark mode by default with a persisting light/dark toggle (`next-themes`)
- Subtle scroll animations that respect `prefers-reduced-motion`
- SEO: meta tags, Open Graph + Twitter cards, generated OG image, `sitemap.xml`, `robots.txt`
- Fully responsive, keyboard-accessible, semantic HTML

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000. Production build:

```bash
npm run build
npm start
```

## Editing content

**All content lives in `/data` — you never need to touch components.**

| File                 | What it controls                                              |
| -------------------- | ------------------------------------------------------------- |
| `data/site.ts`       | Name, title, tagline, email, phone, social links, site URL    |
| `data/about.ts`      | About section paragraphs                                      |
| `data/experience.ts` | Work experience timeline                                      |
| `data/projects.ts`   | Featured projects + secondary GitHub repo cards               |
| `data/skills.ts`     | Skill groups and pills                                        |
| `data/education.ts`  | Education and achievements                                    |

Components in `/components` simply map over these files.

### Things to update

1. **Résumé** — replace `public/resume.pdf` (currently a placeholder) with your
   real résumé. Keep the filename `resume.pdf`.
2. **Site URL** — after your first Vercel deploy, set `url` in `data/site.ts`
   to your real domain (used by OG tags, sitemap, and robots).
3. **LinkedIn** — confirm the handle in `data/site.ts` (`social.linkedin`).
4. **Distributed Task Processing Platform** — add its GitHub URL in
   `data/projects.ts` once the repo is public.

## Deploying to Vercel

1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add -A
   git commit -m "Portfolio"
   git remote add origin https://github.com/Anish2602/<repo-name>.git
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects Next.js — accept the defaults and click **Deploy**.
   (No `vercel.json` is needed; Next.js is zero-config on Vercel.)
4. After the deploy, copy your production URL into `data/site.ts` (`url`) and
   push again so SEO tags and the sitemap point at the right domain.

## Project structure

```
app/            Layout, page, globals.css, SEO routes (sitemap, robots, OG image)
components/     Section components (map over /data) + ui primitives
data/           ← all editable content
lib/            cn() utility
public/         resume.pdf (replace with yours)
```
