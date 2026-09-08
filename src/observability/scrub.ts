/**
 * Strict PII scrub for GlitchTip browser events — mirrors
 * veritas-screening/app/apps/frontend/src/observability/scrub.ts (same
 * PII policy applied by the main Veritas app). This site is a static
 * marketing brochure with no login and no PII form fields of its own, but
 * it shares the Veritas name/domain and the owner decision (2026-09-04,
 * superseding D-031 in the main app) applies the same strict posture here:
 * `sendDefaultPii: false` plus a recursive filter for anything that looks
 * like ssn/dob/address/phone/email, in case a future contact-form
 * integration or third-party embed ever puts one in scope.
 */
import type { ErrorEvent, EventHint } from "@sentry/browser";

// Matches key names by substring, not exact match — catches `ssn`,
// `ssn_encrypted`, `subject_ssn`, `dateOfBirth`, `dob`, `mailingAddress`,
// `phoneNumber`, `emailAddress`, etc. Case-insensitive.
const SENSITIVE_KEY_PATTERN = /ssn|social_?security|dob|date_?of_?birth|address|phone|e[-_]?mail/i;

const REDACTED = "[Redacted]";

function scrubValue(value: unknown, seen: WeakSet<object>, depth: number): unknown {
  if (value === null || value === undefined) return value;
  if (depth > 12) return REDACTED; // circular/pathological depth guard, not a real payload shape
  if (typeof value !== "object") return value;

  if (seen.has(value as object)) return REDACTED;
  seen.add(value as object);

  if (Array.isArray(value)) {
    return value.map((item) => scrubValue(item, seen, depth + 1));
  }

  const out: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
    if (SENSITIVE_KEY_PATTERN.test(key)) {
      out[key] = REDACTED;
      continue;
    }
    out[key] = scrubValue(val, seen, depth + 1);
  }
  return out;
}

// A free-text message/exception value can't be key-scrubbed (no object
// shape) — catches the one concrete pattern worth catching cheaply: text
// that reads exactly like a 9-digit SSN. Backstop, not the control.
const SSN_LIKE_PATTERN = /\b\d{3}-?\d{2}-?\d{4}\b/g;

function scrubStringMessage(message: string): string {
  return message.replace(SSN_LIKE_PATTERN, REDACTED);
}

/**
 * `beforeSend` for `Sentry.init` — see instrumentation.ts.
 */
export function strictBeforeSend(event: ErrorEvent, _hint: EventHint): ErrorEvent | null {
  // Request body/cookies/Authorization: drop wholesale rather than
  // field-scrub — a request body can legitimately BE an SSN/DOB submission.
  if (event.request) {
    delete event.request.data;
    delete event.request.cookies;
    if (event.request.headers) {
      const headers = { ...event.request.headers };
      delete headers.Authorization;
      delete headers.authorization;
      delete headers.Cookie;
      delete headers.cookie;
      event.request.headers = headers;
    }
  }

  // User context reduced to id only — no email/username/ip_address.
  if (event.user) {
    event.user = event.user.id !== undefined ? { id: event.user.id } : {};
  }

  const seen = new WeakSet<object>();

  if (event.extra) {
    event.extra = scrubValue(event.extra, seen, 0) as typeof event.extra;
  }
  if (event.contexts) {
    event.contexts = scrubValue(event.contexts, seen, 0) as typeof event.contexts;
  }
  if (event.exception?.values) {
    event.exception.values = event.exception.values.map((exceptionValue) => ({
      ...exceptionValue,
      value: exceptionValue.value ? scrubStringMessage(exceptionValue.value) : exceptionValue.value,
    }));
  }
  if (event.message) {
    event.message = scrubStringMessage(event.message);
  }
  if (event.breadcrumbs) {
    event.breadcrumbs = event.breadcrumbs.map((crumb) => ({
      ...crumb,
      data: crumb.data ? (scrubValue(crumb.data, seen, 0) as typeof crumb.data) : crumb.data,
    }));
  }

  return event;
}
