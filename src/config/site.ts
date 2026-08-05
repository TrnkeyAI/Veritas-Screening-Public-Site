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
  /**
   * TODO: replace with the client's existing app URL (external).
   * The "Log In" button in the header points here.
   */
  LOGIN_URL: string;
  nav: NavItem[];
  services: Service[];
  contact: {
    /** [[PLACEHOLDER: phone number]] */
    phone: string;
    /** [[PLACEHOLDER: general inquiries email]] */
    email: string;
    /** [[PLACEHOLDER: consumer/dispute intake email]] */
    disputeEmail: string;
    /** [[PLACEHOLDER: consumer/dispute intake phone]] */
    disputePhone: string;
    /** [[PLACEHOLDER: business hours]] */
    hours: string;
    /** [[PLACEHOLDER: mailing / office address]] */
    address: string;
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
  LOGIN_URL: "/login", // TODO: replace with the client's existing app URL (external)
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
      slug: "drug-testing",
      title: "Drug Testing",
      intro:
        "Pre-employment, random, and reasonable-suspicion drug and alcohol testing coordinated through a nationwide collection network.",
      searches: [
        "5-panel and 10-panel urine drug screens",
        "Instant and lab-based testing",
        "Alcohol testing (breath and urine)",
        "DOT-regulated testing programs",
        "Random testing pool management",
        "Chain-of-custody documentation",
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
      slug: "motor-vehicle-records",
      title: "Motor Vehicle Records",
      intro:
        "Driving history reports for roles where operating a vehicle is part of the job, with ongoing monitoring options.",
      searches: [
        "State motor vehicle record (MVR) pull",
        "Driver's license verification",
        "Commercial driver's license (CDL) verification",
        "Violation and accident history",
        "Continuous MVR monitoring",
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
  contact: {
    phone: "[[PLACEHOLDER: phone number]]",
    email: "[[PLACEHOLDER: general inquiries email]]",
    disputeEmail: "[[PLACEHOLDER: dispute intake email]]",
    disputePhone: "[[PLACEHOLDER: dispute intake phone]]",
    hours: "[[PLACEHOLDER: business hours]]",
    address: "[[PLACEHOLDER: mailing / office address]]",
  },
  sections: {
    /** Accreditation/affiliation badge row. Flip to true once the client
     *  supplies VERIFIED credentials — never invent these. */
    showTrustBadges: false,
    /** Numeric stats strip. Flip to true once the client supplies real figures. */
    showStats: false,
    /** Leadership team section on /about. */
    showLeadership: false,
  },
};
