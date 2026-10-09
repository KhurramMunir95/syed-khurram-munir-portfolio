# Syed Khurram Munir — portfolio

The approved jet-black portfolio implemented with Next.js App Router, React and TypeScript. It includes light mode, ten selected contributions, the original three-card career journey, five detailed career roles, interactive project workflows and expertise, section navigation, and one animated floating double-chevron back-to-top control.

## Run locally

Requires Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Build and preview

```sh
npm run build
npm run typecheck
npm run verify
npm run preview
```

The production build exports a static site into `out/`. The preview command serves it locally at `http://127.0.0.1:3000/`. No account secrets or backend services are required.

## GitHub Pages

The separate source repository is `KhurramMunir95/syed-khurram-munir-portfolio`. The portfolio source is at the repository root.

Enable **Settings → Pages → Build and deployment → Source: GitHub Actions**. The workflow in `.github/workflows/deploy-pages.yml` installs dependencies, builds the static export, checks TypeScript, verifies the journey cards, icons, contact options and asset paths, and publishes `out/` on each push to `main`. It also supports a manual run from the Actions tab.

Once the first deployment succeeds, the public portfolio URL is:

https://khurrammunir95.github.io/syed-khurram-munir-portfolio/

The workflow sets the repository base path during the build. JavaScript, styles and the favicon use that path. Build and TypeScript checks run before GitHub Pages configuration is checked; a new repository still needs **Source: GitHub Actions** enabled before the deployment can publish. For a local preview of the GitHub Pages build:

```sh
NEXT_PUBLIC_BASE_PATH=/syed-khurram-munir-portfolio npm run build
NEXT_PUBLIC_BASE_PATH=/syed-khurram-munir-portfolio npm run preview
```

Open `http://127.0.0.1:3000/syed-khurram-munir-portfolio/`. Omit `NEXT_PUBLIC_BASE_PATH` when building for a domain root.

## Structure

- `app/page.tsx` — server-rendered project, career, about and contact content.
- `app/globals.css` — the approved responsive theme, typography and motion.
- `components/` — React controls for theme, work filtering, project workflows, expertise, navigation and back-to-top behavior.
- `lib/expertise.ts` — engineering expertise content.
- `public/icon.svg` — portfolio favicon.

All portfolio sections stay on the page when navigating. Email actions open an accessible dialog with Gmail, a native mail-app link and a copy-address fallback. With JavaScript disabled, the original mailto links remain usable. Motion honors `prefers-reduced-motion`. Project illustrations describe simplified architecture and workflows; they do not represent live production screenshots or operational metrics.

The earlier website preview is available at https://khurram-portfolio-interactive.khurrammunir95.chatgpt.site. This repository contains its Next.js implementation; it does not automatically republish that hosted preview.

Icons use Lucide React under the ISC license. Font families are DM Sans, Michroma and Titillium Web, loaded from Google Fonts.
