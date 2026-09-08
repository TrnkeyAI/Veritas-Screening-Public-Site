# Sprint log

## 2026-09-08 — GlitchTip rollout, Lane J (round 2)

Wired browser-only GlitchTip (errors + perf) into the static export.
See DECISIONS.MD for the design rationale. Files: `src/observability/scrub.ts`,
`src/observability/instrumentation.ts`, `src/components/SentryInit.tsx`,
`src/components/ErrorBoundary.tsx`, `src/app/layout.tsx`, `.env.example`,
`scripts/ship-static.sh`, `package.json` (`@sentry/browser`).

Project `veritas-site` created in GlitchTip; DSN in the gitignored
`.env.ship`. No deploy this round (round-2 lane brief: code +
provisioning only) — `scripts/ship-static.sh` is ready for the
orchestrator to run.
