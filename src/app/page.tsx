import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig, visibleServices } from "@/config/site";
import VMark from "@/components/VMark";
import TrustBand from "@/components/TrustBand";
import heroBg from "../../public/hero-image.webp";

export const metadata: Metadata = {
  title: siteConfig.brand.tagline,
  description:
    "Employment background screening and verification services designed for accuracy, compliance, and speed.",
};

const whyPoints = [
  {
    title: "National databases are a starting point, not an answer.",
    description:
      "Multi-jurisdictional criminal databases aggregate records from secondary sources, and their coverage varies by county — some records are incomplete or out of date. Searching the courts of record directly is what catches what a database lookup can miss.",
  },
  {
    title: "A database hit is a lead, not a finding.",
    description:
      "A potential match in a database has to be confirmed at the original source before it's reported. Reporting an unverified hit is how the wrong person ends up denied a job.",
  },
  {
    title: "Identity resolution decides what gets searched.",
    description:
      "An SSN trace establishes the name and address history that determines which jurisdictions get searched in the first place. Get that step wrong, and a clean report can simply mean nobody looked in the right place.",
  },
  {
    title: "Compliance is a process, not a checkbox.",
    description:
      "The FCRA requires a specific adverse-action sequence: a pre-adverse-action notice with a copy of the report and a summary of rights, a waiting period, then a final notice. Skipping a step in that sequence is where employers get sued.",
  },
  {
    title: "Candidates have rights, and disputes will happen.",
    description:
      "Consumers can dispute what a report says about them and are entitled to a reinvestigation. How a screening provider handles that dispute process is part of the product, not an afterthought.",
  },
  {
    title: "Rules vary by state and role.",
    description:
      "Ban-the-box laws and other state-level restrictions change what may be asked, when it may be asked, and what may ultimately be reported. A screening program has to account for where — and for what role — a candidate is being hired.",
  },
];

const steps = [
  {
    number: "01",
    title: "Tell us what you need",
    description:
      "We work with you to build a screening package that fits your industry, role types, and compliance requirements.",
  },
  {
    number: "02",
    title: "We run the screening",
    description:
      "Requests are processed through our screening workflow, with searches and verifications tracked from intake to completion.",
  },
  {
    number: "03",
    title: "Review results and decide",
    description:
      "Results are delivered in a clear, organized report so you can make an informed, compliant hiring decision.",
  },
];

function ShieldIcon() {
  return (
    <svg
      className="h-6 w-6 text-interactive"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
    </svg>
  );
}

export default function Home() {
  // Split "Hire with confidence. Verify with speed." so the two sentences
  // can break onto separate lines on desktop without a hardcoded <br> that
  // would also fire (and cause overflow risk) on mobile.
  const [taglineLine1, taglineLine2] = siteConfig.brand.tagline.split(". ");

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-surface-inverted">
        {/* Full-bleed hero artwork — LCP element */}
        <Image
          src={heroBg}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-[20%_center] sm:object-center"
        />
        {/* Left-to-right scrim: keeps the copy column legible against the
            artwork no matter how object-fit: cover crops at a given
            viewport (see .hero-scrim in globals.css). */}
        <div
          aria-hidden="true"
          className="hero-scrim pointer-events-none absolute inset-0 -z-10"
        />

        <div className="relative mx-auto flex min-h-[calc(var(--viewport-h)-var(--header-h))] max-w-6xl flex-col justify-center px-4 py-band-xl sm:px-6 lg:px-8">
          <div className="max-w-xl sm:max-w-[min(34rem,calc(50vw-2rem))]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {siteConfig.brand.name}
            </p>
            <h1 className="mt-4 font-serif text-5xl font-semibold text-content-inverted lg:text-[2.9rem]">
              {taglineLine1}.
              <br className="hidden lg:block" /> {taglineLine2}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-content-inverted-muted">
              {siteConfig.brand.name} delivers background screening and
              verification services built around accuracy, compliance, and a
              hiring process you can stand behind.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={siteConfig.LOGIN_URL}
                rel="noopener"
                className="inline-flex items-center justify-center rounded-control bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition-colors duration-200 hover:bg-accent-hover"
              >
                Start a Background Check
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-control border border-white/30 px-6 py-3 text-sm font-semibold text-content-inverted transition-colors duration-200 hover:border-white hover:bg-white/5"
              >
                Talk to Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stat-card row — see the provenance comment on `siteConfig.stats`.
          This sat overlapping the hero's bottom edge as a scroll affordance;
          removed at the client's request. The hero image has the podium and
          server detail right at that edge, so the cards read as slicing
          through the artwork rather than layering over it. Now a clean band
          below the hero. */}
      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 pt-band sm:grid-cols-3">
            {siteConfig.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-card border border-border bg-surface p-6 text-center shadow-xl sm:text-left"
              >
                <span
                  aria-hidden="true"
                  className="mx-auto block h-1 w-10 rounded-full bg-accent-warm-strong sm:mx-0"
                />
                <p className="mt-4 font-serif text-3xl font-semibold text-content-strong sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm leading-snug text-content-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-band sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl font-semibold text-content-strong sm:text-4xl">
              Screening services
            </h2>
            <p className="mt-4 text-base leading-relaxed text-content-muted">
              A full range of screening products, each built to standard
              industry components and tailored to your hiring program.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
            {visibleServices.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services#${service.slug}`}
                className="group relative flex flex-col rounded-card border border-border bg-surface p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-interactive hover:shadow-md focus-visible:-translate-y-1 focus-visible:shadow-md"
              >
                <span className="absolute right-6 top-6 font-serif text-2xl font-semibold text-border-strong">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <ShieldIcon />
                <h3 className="mt-4 font-serif text-lg font-semibold text-content-strong">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-content-muted">
                  {service.intro}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-content-strong underline decoration-interactive decoration-2 underline-offset-4 group-hover:text-content">
                  Learn more
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-surface-sunken">
        <div className="mx-auto max-w-6xl px-4 py-band sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold text-content-strong sm:text-4xl">
            How it works
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-card border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-border-strong hover:shadow-md"
              >
                <span className="block border-b-2 border-accent-warm-strong pb-3 font-serif text-4xl font-semibold text-accent-warm-strong">
                  {step.number}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-content-strong">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-content-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Not all background checks are the same — buyer education, not a
          "why us" claim. Deliberately makes no assertion about Veritas
          itself; see the client proof-point block at the end, gated behind
          `showWhyProofPoints` until the client supplies verified figures. */}
      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-band sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl font-semibold text-content-strong sm:text-4xl">
              Not all background checks are the same.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-content-muted">
              What separates a thorough screening partner from a shallow
              one — here&apos;s what to look for before you choose one.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyPoints.map((point) => (
              <div
                key={point.title}
                className="rounded-card border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-border-strong hover:shadow-md"
              >
                <h3 className="font-serif text-lg font-semibold text-content-strong">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-content-muted">
                  {point.description}
                </p>
              </div>
            ))}
          </div>

          {/* Client proof-point slot — hidden entirely until the client
              supplies verified figures (src/config/site.ts, `sections`).
              Never invent a source count, record count, or other metric. */}
          {siteConfig.sections.showWhyProofPoints && (
            <div className="mt-12 rounded-card border border-border bg-surface-sunken p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-content-muted">
                Verified at a glance
              </p>
              <p className="mt-3 font-serif text-2xl font-semibold text-content-strong">
                [[PLACEHOLDER: number of sources / records searched — client
                to supply verified figure]]
              </p>
              <ul className="mt-6 space-y-2 text-sm leading-relaxed text-content-muted">
                <li>[[PLACEHOLDER: verified proof point 1]]</li>
                <li>[[PLACEHOLDER: verified proof point 2]]</li>
                <li>[[PLACEHOLDER: verified proof point 3]]</li>
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Trust / credibility band — hidden entirely until the client
          supplies verified badges or stats (src/config/site.ts, `sections`) */}
      {(siteConfig.sections.showTrustBadges || siteConfig.sections.showStats) && (
        <section className="border-y border-border bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-band sm:px-6 lg:px-8">
            <h2 className="text-center font-serif text-2xl font-semibold text-content-strong sm:text-3xl">
              Accreditations &amp; Affiliations
            </h2>
            <div className="mt-10">
              <TrustBand variant="full" />
            </div>
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section className="relative isolate overflow-hidden bg-surface-inverted">
        <VMark
          className="pointer-events-none absolute -bottom-24 -left-20 h-[55vw] w-[55vw] max-h-[480px] max-w-[480px] text-content-inverted opacity-watermark"
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 py-band sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-semibold text-content-inverted sm:text-3xl">
            Ready to build a screening program that fits your team?
          </h2>
          <Link
            href={siteConfig.LOGIN_URL}
            rel="noopener"
            className="inline-flex shrink-0 items-center justify-center rounded-control bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition-colors duration-200 hover:bg-accent-hover"
          >
            Start a Background Check
          </Link>
        </div>
      </section>
    </>
  );
}
