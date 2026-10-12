# Design Brief

Migrated by trnkey-cleanup from the old DESIGN.MD (a placeholder stub). The content was derived from `src/app/globals.css` and the README - updated from code by trnkey-cleanup - verify. The source of truth for values is `src/app/globals.css`.

## Tokens
Two layers: primitives in `:root` (no Tailwind utilities), semantic names in `@theme inline` (the only names allowed in markup: `bg-surface-inverted`, `text-content-muted`, `border-border-control` and so on). Never use a primitive, raw hex or rgba literal in `.tsx`.

## Brand palette
Yellow #FFC857, orange #E9724C, red #C5283D, purple #311847 (dominant dark surface), blue #255F85 (buttons and links). Ink ramp hue 272 anchored on #311847.

## Invariants (grep-checkable)
- `accent` (yellow) appears only inside a `bg-surface-inverted` subtree. On light surfaces use `accent-warm-strong` (#C34B22).
- `critical` tokens appear only in `src/app/contact/ContactForm.tsx`. Red is for form errors only, never brand chrome, because the client's product shows pass/fail results.

## Type
Lora for headings, Inter for body, via CSS variables `--font-heading` and `--font-body`.

## Layout and components
Sticky header (`--header-h` 4.0625rem); hero sized to the remaining viewport (`--viewport-h`, dvh with vh fallback). Logo assets in `public/` wired through `siteConfig.logo`. `VMark.tsx` is a decorative watermark only. Hero image `public/hero-records.webp` is faded with `.hero-image-mask`.
