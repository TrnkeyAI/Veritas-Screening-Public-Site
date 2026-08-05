import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import TrustBand from "@/components/TrustBand";

export const metadata: Metadata = {
  title: "About",
  description:
    "Our mission, our values, and why employers and candidates trust the way we handle background screening.",
};

const values = [
  {
    title: "Accuracy first",
    description:
      "We verify before we report — every search is checked against source data, not assumptions.",
  },
  {
    title: "Compliance by design",
    description:
      "Every product starts from FCRA and applicable state-law requirements, not bolted on after the fact.",
  },
  {
    title: "Transparency with candidates",
    description:
      "The people behind every report have the same right to clarity as the employers who order it.",
  },
  {
    title: "Responsiveness",
    description:
      "Slow screening blocks hiring. We treat turnaround as a service commitment, not an afterthought.",
  },
  {
    title: "Data stewardship",
    description:
      "Background information is sensitive by nature, and we handle it with the security and restraint that demands.",
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="bg-surface">
        <div className="mx-auto max-w-4xl px-4 py-band sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-semibold text-content-strong sm:text-5xl">
            About {siteConfig.brand.name}
          </h1>

          <div className="mt-8 space-y-6 text-base leading-relaxed text-content">
            <p>
              {siteConfig.brand.name} was built on a simple premise: hiring
              decisions deserve accurate information, delivered without
              unnecessary delay. Background screening sits at the
              intersection of two responsibilities that are easy to treat as
              opposing forces — protecting organizations and their people,
              and protecting the rights of the candidates being screened. We
              built our process around the idea that both can be honored at
              once.
            </p>
            <p>
              Employers come to us to reduce risk and make confident hiring
              decisions. Candidates encounter us, often without having chosen
              to, as a required step in getting hired. We take that second
              relationship as seriously as the first — every report we
              produce is something a real person&apos;s employment may depend
              on.
            </p>
          </div>
        </div>
      </div>

      {/* Mission */}
      <section className="bg-surface-sunken">
        <div className="mx-auto max-w-4xl px-4 py-band sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-semibold text-content-strong sm:text-3xl">
            Our mission
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-content">
            To give employers accurate, compliant background information
            they can act on quickly, while treating every candidate whose
            information passes through our hands fairly and transparently.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface">
        <div className="mx-auto max-w-4xl px-4 py-band sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-semibold text-content-strong sm:text-3xl">
            Our values
          </h2>
          <dl className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-card border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-border-strong hover:shadow-md"
              >
                <dt className="border-l-2 border-accent-warm-strong pl-4 font-semibold text-content-strong">
                  {value.title}
                </dt>
                <dd className="mt-2 pl-4 text-sm leading-relaxed text-content-muted">
                  {value.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Leadership — full-bleed inverted section. Hidden entirely until
          the client supplies real bios (src/config/site.ts, `sections`) */}
      {siteConfig.sections.showLeadership && (
        <section className="bg-surface-inverted">
          <div className="mx-auto max-w-4xl px-4 py-band sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl font-semibold text-content-inverted sm:text-3xl">
              Leadership team
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-content-inverted-muted">
              [[PLACEHOLDER: leadership team]]
            </p>
          </div>
        </section>
      )}

      {/* Compact trust band + CTA above footer. The trust band is hidden
          until the client supplies verified badges; the CTA always shows */}
      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-band sm:px-6 lg:px-8">
          {siteConfig.sections.showTrustBadges && <TrustBand variant="compact" />}
          <div
            className={`flex flex-col items-center gap-4 text-center ${
              siteConfig.sections.showTrustBadges
                ? "mt-12 border-t border-border pt-10"
                : ""
            }`}
          >
            <p className="font-serif text-xl font-semibold text-content-strong">
              Have questions about how we work?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-control bg-surface-inverted px-6 py-3 text-sm font-semibold text-content-inverted transition-colors duration-200 hover:bg-surface-inverted-hover"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
