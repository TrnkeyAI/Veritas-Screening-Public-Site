// Single source of truth for brand, navigation, services, and contact info.
// Client: edit this file to update copy that appears across the site —
// nothing below should be hardcoded elsewhere in the app.

export type NavItem = {
  label: string;
  href: string;
};

export type ServiceSearch = string;

export type Service = {
  /** Used to build the #anchor on /services and for links from Home. */
  slug: string;
  title: string;
  intro: string;
  searches: ServiceSearch[];
};

export type SiteConfig = {
  brand: {
    name: string;
    shortName: string;
    tagline: string;
  };
  /** Real logo assets (public/), for the header, footer, and favicon. */
  logo: {
    /** Full lockup — shield + wordmark. Header, desktop/tablet. */
    full: { src: string; width: number; height: number };
    /** Half-scale full lockup, kept for smaller/denser layouts. */
    fullHalf: { src: string; width: number; height: number };
    /** Shield mark alone. Header on small screens; footer. */
    mark: { src: string; width: number; height: number };
    /** Mark centred on a transparent square, source for src/app/icon.png. */
    icon: { src: string; width: number; height: number };
    /** Accessible name for the logo link/image, site-wide. */
    alt: string;
  };
  /** The client's screening-platform app. The "Log In" button and the
   *  primary CTA both point here — external, opens in the same tab. */
  LOGIN_URL: string;
  nav: NavItem[];
  services: Service[];
  /** Contact form provider. "builtin" renders the in-repo <ContactForm />;
   *  "ghl" renders a GoHighLevel embed iframe at `ghlEmbedUrl`. Switch to
   *  "ghl" once the embed URL is supplied — see README for the third-party
   *  cookie/consent note that switch requires. */
  contactForm: {
    provider: "builtin" | "ghl";
    ghlEmbedUrl: string;
  };
  contact: {
    /** General inquiries mailbox. Rendered in the footer and on /contact. */
    email: string;
    /** Consumer/dispute intake mailbox. Rendered in the dispute intake
     *  block on /compliance. */
    disputeEmail: string;
  };
  /**
   * Section visibility flags for content the client hasn't supplied yet.
   * Every flag defaults to false so the site never shows an invented
   * credential, metric, or bio. Flip a flag to true only once the client
   * has supplied VERIFIED content for that section — the underlying
   * PLACEHOLDER copy stays in source either way, it's just not rendered
   * while the flag is false.
   */
  sections: {
    /** Accreditation/affiliation badge row (TrustBand). Flip to true once
     *  the client supplies VERIFIED credentials — never invent these. */
    showTrustBadges: boolean;
    /** Numeric stats strip (TrustBand, home page only). Flip to true once
     *  the client supplies real figures. */
    showStats: boolean;
    /** Leadership team section on /about. Flip to true once the client
     *  supplies real leadership bios. */
    showLeadership: boolean;
    /** Executive & Partner Screening service card/section. The client has
     *  NOT confirmed they still offer this — flip to true only once they
     *  confirm delivery. */
    showExecutiveScreening: boolean;
    /** International Searches service card/section. The client has NOT
     *  confirmed they still offer this — flip to true only once they
     *  confirm delivery. */
    showInternationalSearches: boolean;
    /** Client proof-point block ("Not all background checks are the same"
     *  section, home page) — verified source/record counts and other
     *  client-specific figures. Flip to true once the client supplies
     *  VERIFIED figures — never invent these. */
    showWhyProofPoints: boolean;
    /** MOCK stat-card row overlapping the hero (home page only, see
     *  MOCK_STATS in page.tsx). Authorised for design review with
     *  invented-but-labeled mock values — NOT the same guarantee as the
     *  other flags above: it defaults to true, and this is the one flag
     *  in this block that is NOT "false until verified." See the default
     *  below for what must happen before launch. */
    showMockStats: boolean;
  };
};

export const siteConfig: SiteConfig = {
  brand: {
    name: "Veritas Screening",
    shortName: "Veritas",
    tagline: "Hire with confidence. Verify with speed.",
  },
  logo: {
    full: { src: "/logo.png", width: 826, height: 256 },
    fullHalf: { src: "/logo@1x.png", width: 413, height: 128 },
    mark: { src: "/logo-mark.png", width: 262, height: 256 },
    icon: { src: "/icon.png", width: 512, height: 512 },
    alt: "Veritas Screening",
  },
  LOGIN_URL: "https://app.veritas-screening.com",
  nav: [
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Compliance", href: "/compliance" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    {
      slug: "employment-screening",
      title: "Employment Screening",
      intro:
        "Pre-employment and ongoing background checks built into your hiring workflow, from application to offer.",
      searches: [
        "County criminal records search",
        "Statewide criminal records search",
        "Federal criminal records search",
        "National criminal database search",
        "Sex offender registry search",
        "SSN trace",
        "Employment verification",
        "Education verification",
        "Professional license verification",
      ],
    },
    {
      slug: "volunteer-screening",
      title: "Volunteer Screening",
      intro:
        "Screening programs sized for nonprofits, faith-based organizations, and youth-serving programs that place volunteers in positions of trust.",
      searches: [
        "County criminal records search",
        "National criminal database search",
        "Sex offender registry search",
        "SSN trace",
        "Identity verification",
        "Reference checks",
      ],
    },
    {
      slug: "executive-partner-screening",
      title: "Executive & Partner Screening",
      intro:
        "Enhanced due diligence for executive hires, board appointments, mergers, acquisitions, and new business partnerships.",
      searches: [
        "Enhanced criminal records search",
        "Civil litigation search (federal and state)",
        "Bankruptcy and lien records search",
        "UCC filings search",
        "Media and adverse-news search",
        "Directorship and business affiliation search",
        "Education and credential verification",
      ],
    },
    {
      slug: "international-searches",
      title: "International Searches",
      intro:
        "Background checks for candidates with residency, work, or education history outside the United States.",
      searches: [
        "International criminal records search",
        "Global sanctions and watchlist search",
        "International education verification",
        "International employment verification",
        "Global identity document verification",
      ],
    },
  ],
  contactForm: {
    provider: "builtin",
    ghlEmbedUrl: "",
  },
  contact: {
    email: "info@veritas-screening.com",
    disputeEmail: "info@veritas-screening.com",
  },
  sections: {
    /** Accreditation/affiliation badge row. Flip to true once the client
     *  supplies VERIFIED credentials — never invent these. */
    showTrustBadges: false,
    /** Numeric stats strip. Flip to true once the client supplies real figures. */
    showStats: false,
    /** Leadership team section on /about. */
    showLeadership: false,
    /** Executive & Partner Screening service. Confirmed offered by the client. */
    showExecutiveScreening: true,
    /** International Searches service. Confirmed offered by the client. */
    showInternationalSearches: true,
    /** Client proof-point block on the home page "Not all background
     *  checks are the same" section. */
    showWhyProofPoints: false,
    /** MOCK stat-card row on the home hero — see MOCK_STATS in page.tsx.
     *  Defaults true for design review. MUST be set false — or the values
     *  replaced with client-verified figures — before launch. */
    showMockStats: true,
  },
};

/** Services gated behind an unconfirmed `sections` flag, keyed by slug. */
const GATED_SERVICE_FLAGS: Record<string, keyof SiteConfig["sections"]> = {
  "executive-partner-screening": "showExecutiveScreening",
  "international-searches": "showInternationalSearches",
};

/**
 * The services that should actually render. Every consumer (home grid,
 * /services anchor nav + sections, ContactForm's "service of interest"
 * select) reads this instead of `siteConfig.services` directly, so they
 * can never drift apart when a flag flips.
 */
export const visibleServices: Service[] = siteConfig.services.filter(
  (service) => {
    const flag = GATED_SERVICE_FLAGS[service.slug];
    return flag === undefined || siteConfig.sections[flag];
  },
);
