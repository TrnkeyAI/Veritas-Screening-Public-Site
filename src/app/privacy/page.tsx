/**
 * NOTE TO CLIENT: This page is a structural scaffold only — it contains NO
 * authored privacy-policy text. Every placeholder marker below must be
 * filled in by the client's legal counsel (this is legally operative text
 * for a CRA handling consumer report data) before this page goes live.
 */
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import TrustBand from "@/components/TrustBand";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Veritas Screening collects, uses, discloses, retains, and protects information, and your rights and choices.",
};

const sections = [
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use-information", label: "How We Use Information" },
  { id: "disclosure-to-third-parties", label: "Disclosure to Third Parties" },
  { id: "data-retention", label: "Data Retention" },
  { id: "data-security", label: "Data Security" },
  { id: "your-rights-and-choices", label: "Your Rights and Choices" },
  { id: "cookies-and-tracking", label: "Cookies and Tracking Technologies" },
  { id: "childrens-privacy", label: "Children's Privacy" },
  { id: "changes-to-this-policy", label: "Changes to This Policy" },
  { id: "contact-us", label: "Contact Us" },
];

export default function PrivacyPage() {
  // No authored policy text exists yet (see NOTE TO CLIENT above) — keep the
  // route a genuine 404 until siteConfig.sections.showPrivacyPolicy flips.
  if (!siteConfig.sections.showPrivacyPolicy) {
    notFound();
  }

  return (
    <>
      {/* Intro — full-bleed inverted section */}
      <section className="bg-surface-inverted">
        <div className="mx-auto max-w-6xl px-4 py-band sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl font-semibold text-content-inverted sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm font-medium text-content-inverted-subtle">
              Last updated: [[PLACEHOLDER: last updated date]]
            </p>
            <p className="mt-4 text-lg leading-relaxed text-content-inverted-muted">
              This page explains how {siteConfig.brand.name} collects, uses,
              discloses, retains, and protects information, and the choices
              you have about that information.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface-sunken">
        <div className="mx-auto max-w-6xl px-4 py-band sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
            <nav
              aria-label="Privacy policy sections"
              className="flex gap-2 overflow-x-auto border-b border-border pb-4 lg:sticky lg:top-24 lg:w-72 lg:shrink-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:border-b-0 lg:pb-0"
            >
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="whitespace-nowrap rounded-control px-3 py-2 text-sm font-medium text-content transition-colors duration-200 hover:bg-surface hover:text-content-strong lg:whitespace-normal"
                >
                  {section.label}
                </a>
              ))}
            </nav>

            <div className="flex min-w-0 flex-1 flex-col gap-8">
              <section
                id="information-we-collect"
                className="scroll-mt-24 rounded-card border border-border bg-surface p-6 sm:p-8"
              >
                <h2 className="font-serif text-2xl font-semibold text-content-strong">
                  Information We Collect
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-content-muted">
                  [[PLACEHOLDER: information we collect — client legal to
                  supply]]
                </p>
              </section>

              <section
                id="how-we-use-information"
                className="scroll-mt-24 rounded-card border border-border bg-surface p-6 sm:p-8"
              >
                <h2 className="font-serif text-2xl font-semibold text-content-strong">
                  How We Use Information
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-content-muted">
                  [[PLACEHOLDER: how we use information — client legal to
                  supply]]
                </p>
              </section>

              <section
                id="disclosure-to-third-parties"
                className="scroll-mt-24 rounded-card border border-border bg-surface p-6 sm:p-8"
              >
                <h2 className="font-serif text-2xl font-semibold text-content-strong">
                  Disclosure to Third Parties
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-content-muted">
                  [[PLACEHOLDER: disclosure to third parties — client legal
                  to supply]]
                </p>
              </section>

              <section
                id="data-retention"
                className="scroll-mt-24 rounded-card border border-border bg-surface p-6 sm:p-8"
              >
                <h2 className="font-serif text-2xl font-semibold text-content-strong">
                  Data Retention
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-content-muted">
                  [[PLACEHOLDER: data retention — client legal to supply]]
                </p>
              </section>

              <section
                id="data-security"
                className="scroll-mt-24 rounded-card border border-border bg-surface p-6 sm:p-8"
              >
                <h2 className="font-serif text-2xl font-semibold text-content-strong">
                  Data Security
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-content-muted">
                  [[PLACEHOLDER: data security — client legal to supply]]
                </p>
              </section>

              <section
                id="your-rights-and-choices"
                className="scroll-mt-24 rounded-card border border-border bg-surface p-6 sm:p-8"
              >
                <h2 className="font-serif text-2xl font-semibold text-content-strong">
                  Your Rights and Choices
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-content-muted">
                  [[PLACEHOLDER: your rights and choices — client legal to
                  supply]]
                </p>
              </section>

              <section
                id="cookies-and-tracking"
                className="scroll-mt-24 rounded-card border border-border bg-surface p-6 sm:p-8"
              >
                <h2 className="font-serif text-2xl font-semibold text-content-strong">
                  Cookies and Tracking Technologies
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-content-muted">
                  [[PLACEHOLDER: cookies and tracking technologies — client
                  legal to supply]]
                </p>
              </section>

              <section
                id="childrens-privacy"
                className="scroll-mt-24 rounded-card border border-border bg-surface p-6 sm:p-8"
              >
                <h2 className="font-serif text-2xl font-semibold text-content-strong">
                  Children&apos;s Privacy
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-content-muted">
                  [[PLACEHOLDER: children&apos;s privacy — client legal to
                  supply]]
                </p>
              </section>

              <section
                id="changes-to-this-policy"
                className="scroll-mt-24 rounded-card border border-border bg-surface p-6 sm:p-8"
              >
                <h2 className="font-serif text-2xl font-semibold text-content-strong">
                  Changes to This Policy
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-content-muted">
                  [[PLACEHOLDER: changes to this policy — client legal to
                  supply]]
                </p>
              </section>

              <section
                id="contact-us"
                className="scroll-mt-24 rounded-card border border-border bg-surface p-6 sm:p-8"
              >
                <h2 className="font-serif text-2xl font-semibold text-content-strong">
                  Contact Us
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-content-muted">
                  Questions about this privacy policy can be directed to us
                  at{" "}
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="font-medium text-interactive underline decoration-interactive decoration-2 underline-offset-4 transition-colors duration-200 hover:text-interactive-hover"
                  >
                    {siteConfig.contact.email}
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>

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
              Questions about this privacy policy?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-control bg-surface-inverted px-6 py-3 text-sm font-semibold text-content-inverted transition-colors duration-200 hover:bg-surface-inverted-hover"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
