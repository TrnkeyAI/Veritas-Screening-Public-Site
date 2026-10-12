# Backend Schema

drafted by trnkey-cleanup - verify.

This site has no backend, database, accounts or stored data. It is a static export (`output: "export"`) served by nginx; there are no tables, migrations, ORM models or access rules.

Data that leaves the browser:
- Error and performance events to GlitchTip (scrubbed, see `src/observability/scrub.ts`).
- Contact form submissions to GoHighLevel when `contactForm.provider` is "ghl" (handled inside GHL's iframe, not by this code). The built-in form sends nothing.

| Role | Can see | Can create | Can edit | Can delete |
|---|---|---|---|---|
| Public visitor | All public pages | Contact submission (GHL) | n/a | n/a |
