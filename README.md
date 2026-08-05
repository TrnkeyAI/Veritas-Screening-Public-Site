# Veritas Screening — Public Marketing Site

A five-page marketing site for Veritas Screening (a Consumer Reporting
Agency), built with Next.js App Router, TypeScript, and Tailwind CSS v4.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

`npm run build` currently passes cleanly (static pages for all five routes,
no type or lint errors).

## Editing brand, contact, and login info

Everything the client needs to change on an ongoing basis — brand name,
tagline, nav items, the six services (and their "typical searches"
bullets), the login URL, and every contact field — lives in one file:

```
src/config/site.ts
```

Every page reads from this file rather than hardcoding copy. In
particular:

- `LOGIN_URL` currently points to `/login` with a `// TODO: replace with
  the client's existing app URL (external)` comment — update it to the
  real app URL and the header/footer "Log In" button will follow.
- `contact.*` fields are placeholders (see checklist below) — fill them in
  and they'll propagate to the footer, `/contact`, and the dispute-intake
  block on `/compliance`.

## Placeholder checklist

No factual claim (turnaround times, accreditations, headcounts, contact
details, legal text, team bios, etc.) was invented. Every spot that needs
a real fact from the client is a literal, visible `[[PLACEHOLDER: ...]]`
string in the rendered page. Found via `grep -rn "PLACEHOLDER" src`:

| Placeholder | File | Notes |
|---|---|---|
| `[[PLACEHOLDER: phone number]]` | `src/config/site.ts` (`contact.phone`) | Renders in footer and `/contact`. |
| `[[PLACEHOLDER: general inquiries email]]` | `src/config/site.ts` (`contact.email`) | Renders in footer and `/contact`. |
| `[[PLACEHOLDER: dispute intake email]]` | `src/config/site.ts` (`contact.disputeEmail`) | Renders in the "Dispute intake" box on `/compliance`. |
| `[[PLACEHOLDER: dispute intake phone]]` | `src/config/site.ts` (`contact.disputePhone`) | Renders in the "Dispute intake" box on `/compliance`. |
| `[[PLACEHOLDER: business hours]]` | `src/config/site.ts` (`contact.hours`) | Renders in footer and `/contact`. |
| `[[PLACEHOLDER: mailing / office address]]` | `src/config/site.ts` (`contact.address`) | Renders in footer and `/contact`. |
| `[[PLACEHOLDER: accreditation or affiliation 1]]` through `4` | `src/components/TrustBand.tsx` | Four badge slots in the trust band (shield / checkmark / lock / document icons). Rendered on `/` (full) and above the footer on `/about`, `/services`, `/compliance`, `/contact` (compact). |
| `[[PLACEHOLDER: certification logos — client to supply image assets]]` | `src/components/TrustBand.tsx` | Full variant only (home page). Client to supply actual logo image assets. |
| `[[PLACEHOLDER: metric value]]` / `[[PLACEHOLDER: metric label]]` (×3) | `src/components/TrustBand.tsx` | Stats strip, full variant only (home page). No metric may be invented — real, verified numbers only. |
| `[[PLACEHOLDER: leadership team]]` | `src/app/about/page.tsx` | Leadership section on `/about`. |
| `[[PLACEHOLDER: legal disclosure / CRA statement]]` | `src/components/Footer.tsx` | Required CRA-style disclosure line, site-wide footer. |
| `[[PLACEHOLDER: dispute intake form / mailing address]]` | `src/app/compliance/page.tsx` | Filing a Dispute section. |
| `[[PLACEHOLDER: full privacy policy text — client legal to supply]]` | `src/app/compliance/page.tsx` | Privacy Policy section. |
| `[[PLACEHOLDER: trafficking block process]]` | `src/app/compliance/page.tsx` | Victims of Human Trafficking section. |

## Design tokens

All brand color, spacing, type, radius, and shadow live in one file,
`src/app/globals.css`, as a two-layer token system:

1. **Primitives** — an `ink` ramp (hue 272°, anchored on the brand purple
   `#311847`), plus `blue`, `orange`, `critical`, and `yellow` ramps —
   declared in `:root` under non-`--color-*` names so they generate **no**
   Tailwind utilities and can never be reached directly from markup.
2. **Semantics** — `@theme inline`, e.g. `--color-surface`,
   `--color-content-strong`, `--color-interactive`, `--color-accent`,
   `--color-critical`, `--color-focus`. **Only these semantic names may be
   used in `.tsx` markup** (`bg-surface-inverted`, `text-content-muted`,
   `border-border-control`, etc.) — never a primitive, never a raw hex or
   `rgba()`/`hsla()` literal.

Two invariants, both grep-checkable, must hold at all times:

- **`accent` (yellow, `#FFC857`) only appears inside a `bg-surface-inverted`
  subtree.** Yellow is illegible on white (1.54:1) — it's the accent for
  dark/purple surfaces only. Editorial ornament on *light* surfaces uses
  `accent-warm-strong` (`#C34B22`) instead.
- **`critical` tokens (`critical`, `critical-strong`, `border-critical`,
  `surface-critical`) only appear in `src/app/contact/ContactForm.tsx`.**
  Red is reserved for form validation/error states — never brand chrome,
  since the client's product renders pass/fail screening results and brand
  red would collide with "this person failed."

Check both before merging any change that touches color:

```bash
grep -rn "accent" src --include='*.tsx' | grep -v accent-warm   # every hit: dark surface only
grep -rn "critical" src --include='*.tsx'                       # ContactForm.tsx only
```

`src/components/VMark.tsx` is pure `currentColor` and takes no color
classes of its own — the token applies via whatever `className` the parent
passes in.

## Legal review required

**`src/app/compliance/page.tsx` must be reviewed and approved by the
client's legal counsel before launch.** This includes the FCRA rights
summary, the dispute process, the report-request process, the privacy
policy, and the human-trafficking-victim process. A note to this effect
is left as a comment at the top of that file. Nothing on that page should
be treated as final legal language until that review happens.

## Notes

- No external assets, fonts, or scripts are fetched at runtime — headings
  use Lora and body text uses Inter, both self-hosted at build time via
  `next/font/google`.
- No analytics, cookie banners, or third-party scripts are included.
- The contact form (`src/app/contact/ContactForm.tsx`) is UI-only: it
  validates client-side and simulates a network round trip, but does not
  send data anywhere. See the `// TODO: wire to real endpoint` comment.
- The client's real logo lives in `public/` (`logo.png` full lockup,
  `logo@1x.png` half-scale, `logo-mark.png` shield only, and
  `src/app/icon.png` for the favicon) and is wired in via `next/image` with
  a static import in `Header.tsx` and `Footer.tsx`. Paths, intrinsic
  dimensions, and the shared alt text live in `siteConfig.logo`
  (`src/config/site.ts`).
- `src/components/VMark.tsx` is now decorative-only: the hand-authored "V"
  monogram survives solely as the oversized, low-opacity background
  watermark behind the home hero and closing CTA band, since the real
  (multicolour) logo can't serve that purpose. It should ideally be
  replaced with a silhouette traced from the real shield once an SVG
  version of the client's logo exists.
- `src/components/TrustBand.tsx` is the trust/credibility band (badge
  slots + stats). It renders structure only — every fact-bearing string in
  it is a literal `[[PLACEHOLDER: ...]]`; see the checklist above and the
  `NOTE TO CLIENT` comments in that file before launch.
