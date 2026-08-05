import { siteConfig } from "@/config/site";

type TrustBandProps = {
  /** "full" (badges + stats, home page) or "compact" (badges only, other pages). */
  variant?: "full" | "compact";
  className?: string;
};

function ShieldOutline() {
  return (
    <svg
      className="h-7 w-7 text-content-muted"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z"
      />
    </svg>
  );
}

function CheckOutline() {
  return (
    <svg
      className="h-7 w-7 text-content-muted"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12.5l2.5 2.5L16 9" />
    </svg>
  );
}

function LockOutline() {
  return (
    <svg
      className="h-7 w-7 text-content-muted"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <rect x="5" y="11" width="14" height="9" rx="1.5" />
      <path strokeLinecap="round" d="M8 11V8a4 4 0 018 0v3" />
    </svg>
  );
}

function DocumentOutline() {
  return (
    <svg
      className="h-7 w-7 text-content-muted"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 3h7l4 4v14H7V3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v4h4M9.5 12h5M9.5 15.5h5" />
    </svg>
  );
}

const badges = [
  { Icon: ShieldOutline, label: "[[PLACEHOLDER: accreditation or affiliation 1]]" },
  { Icon: CheckOutline, label: "[[PLACEHOLDER: accreditation or affiliation 2]]" },
  { Icon: LockOutline, label: "[[PLACEHOLDER: accreditation or affiliation 3]]" },
  { Icon: DocumentOutline, label: "[[PLACEHOLDER: accreditation or affiliation 4]]" },
];

const stats = [
  { value: "[[PLACEHOLDER: metric value]]", label: "[[PLACEHOLDER: metric label]]" },
  { value: "[[PLACEHOLDER: metric value]]", label: "[[PLACEHOLDER: metric label]]" },
  { value: "[[PLACEHOLDER: metric value]]", label: "[[PLACEHOLDER: metric label]]" },
];

/**
 * Trust / credibility band. Structure only — every fact-bearing slot is a
 * literal [[PLACEHOLDER: ...]] string. This is a real, compliance-regulated
 * client: nothing here may be filled with an invented credential,
 * membership, certification, client count, testimonial, rating, or
 * statistic. Every placeholder must be replaced with a verified fact
 * supplied by the client before launch.
 *
 * NOTE TO CLIENT / DEV: Rendering is gated by
 * `siteConfig.sections.showTrustBadges` and `showStats`. Both default to
 * false so nothing below ever renders with invented content. Flip the
 * flags in `src/config/site.ts` only once VERIFIED content exists — the
 * PLACEHOLDER copy above stays in source either way.
 */
export default function TrustBand({ variant = "full", className = "" }: TrustBandProps) {
  const compact = variant === "compact";
  const { showTrustBadges, showStats } = siteConfig.sections;
  const showStatsStrip = showStats && !compact;

  if (!showTrustBadges && !showStatsStrip) {
    return null;
  }

  return (
    <div className={className}>
      {showTrustBadges && (
        <>
          {/*
            NOTE TO CLIENT: The four badge slots below are structural
            placeholders only. Each must be replaced with a real, verified
            accreditation, membership, or affiliation before launch — do not
            invent or imply a credential that hasn't been confirmed.
          */}
          <div
            className={`grid grid-cols-2 gap-4 sm:grid-cols-4 ${compact ? "" : "sm:gap-6"}`}
          >
            {badges.map((badge) => (
              <div
                key={badge.label}
                className="flex flex-col items-center gap-3 rounded-card border border-border bg-surface px-4 py-6 text-center transition-colors duration-200 hover:border-border-strong"
              >
                <badge.Icon />
                <p className="text-xs font-medium leading-snug text-content-muted">
                  {badge.label}
                </p>
              </div>
            ))}
          </div>

          {!compact && (
            <p className="mt-4 text-center text-xs text-content-muted">
              [[PLACEHOLDER: certification logos — client to supply image assets]]
            </p>
          )}
        </>
      )}

      {showStatsStrip && (
        <>
          {/*
            NOTE TO CLIENT: The stats below are structural placeholders
            only. Replace with real, verified metrics supplied by the
            client before launch — do not invent a statistic, client
            count, rating, or performance claim.
          */}
          <div
            className={`grid grid-cols-1 gap-8 sm:grid-cols-3 ${showTrustBadges ? "mt-12 border-t border-border pt-12" : ""}`}
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-serif text-4xl font-semibold text-content-strong">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-content-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
