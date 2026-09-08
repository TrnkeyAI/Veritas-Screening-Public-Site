/**
 * GlitchTip (self-hosted, Sentry-protocol-compatible) initialization for
 * this static-export marketing site — browser-only, errors + perf, no
 * backend to instrument.
 *
 * `@sentry/browser` rather than `@sentry/nextjs`: this app builds with
 * `output: "export"` (see next.config.ts) — no Node server, no route
 * handlers, no server components worth instrumenting, and no build-time
 * webpack plugin step to wire up. `@sentry/browser` is the plain client
 * SDK with zero server-side assumptions, so it drops straight into a
 * "use client" component with no extra Next.js config.
 *
 * No-ops entirely when NEXT_PUBLIC_SENTRY_DSN is unset — no network
 * calls, no bundle-time DSN committed to git (.env.example documents the
 * placeholder; the real value lives in the gitignored .env.ship, read by
 * scripts/ship-static.sh at build time).
 *
 * PII posture: `sendDefaultPii: false` plus `strictBeforeSend`
 * (./scrub.ts) — same strict variant the main Veritas app uses.
 */
import * as Sentry from "@sentry/browser";
import { strictBeforeSend } from "./scrub";

let initialized = false;

export function initSentry(): void {
  if (initialized) return;
  if (typeof window === "undefined") return;

  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) return;

  initialized = true;

  Sentry.init({
    dsn,
    environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || "production",
    release: process.env.NEXT_PUBLIC_GIT_SHA,
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: Number(process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE ?? 0.05),
    sendDefaultPii: false,
    beforeSend: strictBeforeSend,
  });

  if (process.env.NEXT_PUBLIC_SENTRY_SMOKE === "1") {
    Sentry.captureMessage("glitchtip smoke: veritas-site");
    Sentry.startSpan({ name: "glitchtip.smoke", op: "smoke" }, () => {});
  }
}

export { Sentry };
