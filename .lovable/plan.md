## Refactor to Multi-Page Portfolio + Fix Unsubscribe on GitHub Pages

### Scope
Convert the single-page site into a routed multi-page app, add per-page SEO, and fix the `/unsubscribe` 404 on GitHub Pages.

### Pages (React Router routes)
- `/` — Home (Hero, summary highlights, CTAs)
- `/about` — Detailed background, journey, values
- `/experience` — Timeline (reuse `ExperienceSection`)
- `/projects` — Project cards (reuse `ProjectsSection`)
- `/skills` — Categorized skills + certifications (reuse `SkillsSection`, `EducationSection` certs)
- `/articles` — LinkedIn articles list (reuse `ArticlesSection`)
- `/resume` — Embedded PDF viewer + Download CV button
- `/contact` — Contact form + social/email links
- `/unsubscribe` — Existing page (kept)
- `*` — NotFound

### Navigation
- Convert `Navigation.tsx` from in-page anchor scroll to `NavLink` routes with active highlighting
- Sticky navbar, mobile menu, theme toggle preserved
- Smooth route transitions via Framer Motion `AnimatePresence` on `<Routes>`
- Scroll-to-top on route change

### SEO
- Install `react-helmet-async`, wrap app in `HelmetProvider`
- `<Helmet>` per page: unique title, meta description, canonical, og:title/url/type
- Remove canonical from `index.html` (per-route owns it); keep sitewide og:* fallback
- `scripts/generate-sitemap.ts` with `predev`/`prebuild` hooks, listing all routes with `BASE_URL = https://sateeshsingh.lovable.app`
- `public/robots.txt` already exists — verify Allow: /
- Keep Person JSON-LD on Home; add WebSite JSON-LD sitewide

### GitHub Pages compatibility (fixes /unsubscribe 404)
The published Lovable domain already supports SPA fallback, but the user references `sateesh1976.github.io`. To make GitHub Pages serve deep links:
- Add `public/404.html` that mirrors `index.html` (GitHub Pages serves it for any unknown path; SPA boots and React Router handles the URL)
- Add SPA redirect snippet in `404.html` that rewrites the path so React Router sees the original URL on first load
- Add matching decode snippet in `index.html` to restore the path
- Document in README: deep links (incl. `/unsubscribe?email=…`) now work on GitHub Pages and Lovable hosting

### Performance
- `React.lazy` + `Suspense` for each route page (code splitting)
- `loading="lazy"` on non-hero images
- Keep existing Framer Motion usage (already animated)

### File changes
**New**
- `src/pages/Home.tsx`, `About.tsx`, `Experience.tsx`, `Projects.tsx`, `Skills.tsx`, `Articles.tsx`, `Resume.tsx`, `Contact.tsx`
- `src/components/Layout.tsx` (Nav + `<Outlet/>` + Footer + BackToTop + VoiceAssistant)
- `src/components/SEO.tsx` (Helmet wrapper)
- `scripts/generate-sitemap.ts`
- `public/404.html`

**Modified**
- `src/App.tsx` — routes + lazy loading + HelmetProvider + AnimatePresence
- `src/main.tsx` — wrap with `HelmetProvider`
- `src/components/Navigation.tsx` — `NavLink` to routes, active state
- `src/components/FooterSection.tsx` — split into `Footer.tsx` (used in Layout) + Contact content into `Contact.tsx`
- `index.html` — SPA-decoder snippet, refreshed sitewide meta
- `package.json` — add `react-helmet-async`, `predev`/`prebuild` scripts
- `README.md` — routing + deployment notes

### Out of scope
- New blog content/CMS (Blog page deferred — Articles page covers content needs)
- Backend changes (unsubscribe still posts to existing endpoint)
- Visual redesign — keeping current design tokens & light/dark theme

### Verification
- Build succeeds
- Playwright: visit each route, refresh, screenshot
- Confirm `/unsubscribe?email=…` renders correctly
