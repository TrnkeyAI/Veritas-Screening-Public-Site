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
