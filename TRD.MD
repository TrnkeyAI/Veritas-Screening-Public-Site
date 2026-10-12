# Technical Requirements

Migrated by trnkey-cleanup from the old PLAN.MD (a placeholder stub); the content below was derived from the code and README - updated from code by trnkey-cleanup - verify.

## Stack
- Next.js 16.3.0 (App Router), React 19.2.8, TypeScript, Tailwind CSS v4, ESLint 9.
- Static export: `output: "export"`, `images.unoptimized`, `trailingSlash: true` (`next.config.ts`). Build output goes to `out/`.
- Fonts: Lora (headings) and Inter (body) via `next/font/google`, self-hosted at build time.
- Note: `AGENTS.md` (written by `next dev`) warns this Next.js version has breaking changes; read `node_modules/next/dist/docs/` before changing framework code.

## Hosting and deploy
- Plain files served by nginx on a VPS at `/opt/veritas-site/html` (`deploy/nginx.conf`, `deploy/docker-compose.yml`, `deploy/deploy.sh`).
- `scripts/ship-static.sh` is the current build-and-ship script: loads `.env.ship`, `npm ci`, builds, snapshots the live folder to `html.prev` for rollback, uploads (rsync or tar over ssh), then checks status codes straight against the VPS. Domain `www.veritas-screening.com`.
- Local run: `npm run dev` (port 3000, `.claude/launch.json` entry `veritas-dev`).

## Integrations
| Service | Use | Config |
|---|---|---|
| GlitchTip (self-hosted, glitchtip.trnkeyai.com) | Browser errors and performance via `@sentry/browser` | `NEXT_PUBLIC_SENTRY_DSN`, `NEXT_PUBLIC_SENTRY_ENVIRONMENT`, `NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE`, `NEXT_PUBLIC_SENTRY_SMOKE` (see `.env.example`; real values in gitignored `.env.ship`) |
| GoHighLevel (api.leadconnectorhq.com, link.msgsndr.com) | Contact form embed | `siteConfig.contactForm` in `src/config/site.ts` |
| Veritas screening app (app.veritas-screening.com) | Login and signup links only | `LOGIN_URL`, `SIGNUP_URL` |

## Non-functional
- Privacy: GlitchTip events are scrubbed in `src/observability/scrub.ts` (drops bodies, cookies and auth headers; redacts ssn/dob/address/phone/email; `sendDefaultPii: false`).
- No Content-Security-Policy header is set by nginx today.
- Accessibility: colour tokens carry WCAG contrast notes in `src/app/globals.css`.
