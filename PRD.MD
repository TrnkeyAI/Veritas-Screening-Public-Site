# Product Requirements

Migrated by trnkey-cleanup from the old PLAN.MD (a placeholder stub) and the README. Items marked "verify" were derived from the code and README, not from the old docs.

## What it is
Five-page public marketing site for Veritas Screening, a Consumer Reporting Agency (background screening). Pages: Home, Services, About, Compliance, Contact (Privacy is built but gated off). Updated from code by trnkey-cleanup - verify.

## Who it is for
Prospective employers and volunteer organisations looking for screening, and consumers who need to know their FCRA rights, file a dispute or request their report. Existing customers use "Log In" to the separate app at https://app.veritas-screening.com. Verify.

## Features (MVP)
- Brand, navigation, services, login/signup URLs and contact details all driven from one file, `src/config/site.ts`, so the client can edit copy in one place.
- Services: Employment Screening and Volunteer Screening shown. Executive & Partner Screening and International Searches are hidden until the client confirms they offer them (`sections.showExecutiveScreening`, `sections.showInternationalSearches`).
- Primary CTA "Start a Background Check" goes to the app signup (`SIGNUP_URL`); "Log In" goes to `LOGIN_URL`.
- Compliance page: FCRA rights summary, California ICRAA summary, dispute process, report-request process. Needs legal counsel approval before launch.
- Contact page: either the in-repo form (UI only, sends nothing) or the GoHighLevel embedded form (current default), switched by `contactForm.provider`.
- Browser-only error and performance monitoring through GlitchTip (see DECISIONS.MD, 2026-09-08).
- Trust badges, stats strip and leadership section stay hidden until the client supplies verified content (flags `showTrustBadges`, `showStats`, `showLeadership`).

## Acceptance
- No invented facts: every missing fact is a visible `[[PLACEHOLDER: ...]]` string or is hidden behind a flag.
- All five routes build and export statically; `/privacy` returns 404 on the server while gated.

## Out of scope
- Any backend, accounts or data storage on this site (the screening product lives in the separate Veritas app).
- Analytics and cookie banners (none today).

## Future
- Real endpoint for the built-in contact form (currently a TODO), or removal once the GHL form is confirmed live.
- Dedicated `disputes@` mailbox instead of the shared `info@`.
- Replace the decorative V monogram watermark with a trace of the real shield logo once an SVG exists.
- Privacy page copy covering GHL third-party origins; consent-notice decision by client counsel.
