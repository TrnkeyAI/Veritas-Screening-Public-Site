# Decisions

## 2026-09-08 — GlitchTip adopted for browser error + perf monitoring

This is a static export (`output: "export"`, next.config.ts) with no
backend — nginx serves plain files on the VPS at /opt/veritas-site/html.
Scope is therefore browser-only: `@sentry/browser` (not `@sentry/nextjs` —
static export has no server/edge runtime worth instrumenting, and skipping
it avoids the webpack-plugin/source-map-upload machinery a five-page
marketing site doesn't need), initialized client-side in
`src/components/SentryInit.tsx`, wired into `src/app/layout.tsx`.

- DSN baked at build time from `NEXT_PUBLIC_SENTRY_DSN`, read from the
  gitignored `.env.ship` (keys documented in `.env.example`). No DSN in
  git; no `.env` needed on the VPS since nginx serves static files and
  never reads env vars.
- Scrub: strict variant, same rule as the main Veritas app —
  `src/observability/scrub.ts` mirrors
  `veritas-screening/app/apps/frontend/src/observability/scrub.ts`
  (`strictBeforeSend`): drops request body/cookies/Authorization,
  reduces user to `{ id }`, recursively redacts any field matching
  ssn/dob/address/phone/email, and scrubs SSN-shaped substrings out of
  free-text messages/exception values/breadcrumbs. `sendDefaultPii: false`.
- GlitchTip project: `veritas-site` (platform `javascript`), created via
  `tools/glitchtip/provision.sh project veritas-site javascript`.
- Uptime: already covered by the existing monitors on
  `https://www.veritas-screening.com/` and
  `https://veritas-screening.com/` (GLITCHTIP-ROLLOUT.md ids 17, 58) — no
  new monitor needed for a static site with nothing to heartbeat.
- CSP: `deploy/nginx.conf` sets no `Content-Security-Policy` header at
  all (confirmed against the live file on the box), so there is nothing
  to add `https://glitchtip.trnkeyai.com` to this round.
- Deploy is out of scope for this round (2026-09-08 lane brief round 2:
  code + provisioning only, no deploys). `scripts/ship-static.sh` is the
  ready-to-run build-and-ship script; the orchestrator runs it later.
