import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig, visibleServices } from "@/config/site";
import TrustBand from "@/components/TrustBand";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Employment screening and volunteer screening, each built from standard industry search components and configurable to your program.",
};

export default function ServicesPage() {
  return (
    <>
      <div className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-band sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl font-semibold text-content-strong sm:text-5xl">
              Services
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-content-muted">
              Screening product lines built from standard industry search
              components and configurable to your program.
            </p>
          </div>
        </div>
      </div>

      <section className="bg-surface-sunken">
        <div className="mx-auto max-w-6xl px-4 py-band sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
            {/* In-page nav: horizontal on mobile, sticky sidebar on desktop */}
            <nav
              aria-label="Service sections"
              className="flex gap-2 overflow-x-auto border-b border-border pb-4 lg:sticky lg:top-24 lg:w-64 lg:shrink-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:border-b-0 lg:pb-0"
            >
              {visibleServices.map((service) => (
                <a
                  key={service.slug}
                  href={`#${service.slug}`}
                  className="whitespace-nowrap rounded-control px-3 py-2 text-sm font-medium text-content transition-colors duration-200 hover:bg-surface hover:text-content-strong lg:whitespace-normal"
                >
                  {service.title}
                </a>
              ))}
            </nav>

            <div className="flex min-w-0 flex-1 flex-col gap-6">
              {visibleServices.map((service, index) => (
                <section
                  key={service.slug}
                  id={service.slug}
                  className="scroll-mt-24 rounded-card border border-border bg-surface p-6 transition-colors duration-200 hover:border-border-strong sm:p-8"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-serif text-3xl font-semibold text-border-strong">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-serif text-2xl font-semibold text-content-strong">
                      {service.title}
                    </h2>
                  </div>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-content-muted">
                    {service.intro}
                  </p>
                  <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-content-muted">
                    Typical searches included
                  </h3>
                  <ul className="mt-3 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                    {service.searches.map((search) => (
                      <li
                        key={search}
                        className="flex items-start gap-2 text-sm leading-relaxed text-content"
                      >
                        <svg
                          className="mt-1 h-3.5 w-3.5 shrink-0 text-interactive"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {search}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA — full-bleed inverted section */}
      <section className="bg-surface-inverted">
        <div className="mx-auto max-w-6xl px-4 py-band text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-semibold text-content-inverted sm:text-3xl">
            Not sure which services you need?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-content-inverted-muted">
            Tell us about your hiring program and we&apos;ll help you put
            together the right package.
          </p>
          <Link
            href={siteConfig.SIGNUP_URL}
            rel="noopener"
            className="mt-6 inline-flex items-center justify-center rounded-control bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition-colors duration-200 hover:bg-accent-hover"
          >
            Start a Background Check
          </Link>
        </div>
      </section>

      {/* Compact trust band above footer — hidden entirely until the
          client supplies verified badges (src/config/site.ts, `sections`) */}
      {siteConfig.sections.showTrustBadges && (
        <section className="bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-band sm:px-6 lg:px-8">
            <TrustBand variant="compact" />
          </div>
        </section>
      )}
    </>
  );
}
