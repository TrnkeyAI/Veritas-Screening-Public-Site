/**
 * NOTE TO CLIENT: The content on this page (FCRA rights summary, California
 * ICRAA summary, dispute process, report-request process, privacy policy,
 * and trafficking-victim process) MUST be reviewed and approved by the
 * client's legal counsel before this page goes live. Nothing here should be
 * treated as final legal language until that review is complete. The
 * California Residents section in particular still needs counsel to supply
 * the state-specific disclosure and notice text — see the placeholder below.
 */
import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import TrustBand from "@/components/TrustBand";

export const metadata: Metadata = {
  title: "Compliance & Your Rights",
  description:
    "Your rights under the FCRA, how to file a dispute, how to request a copy of your report, our privacy policy, and resources for victims of human trafficking.",
};

const sections = [
  { id: "fcra-rights", label: "Your Rights Under the FCRA" },
  { id: "california-residents", label: "California Residents" },
  { id: "dispute", label: "Filing a Dispute" },
  { id: "request-report", label: "Requesting a Copy of Your Report" },
  { id: "privacy-policy", label: "Privacy Policy" },
  { id: "trafficking", label: "Victims of Human Trafficking" },
];

const fcraRights = [
  "You have the right to know if information in your file has been used against you, such as in a decision not to hire you.",
  "You have the right to know what is in your file, and to request the information in your file.",
  "You have the right to know the source of the information in your file.",
  "You have the right to dispute incomplete or inaccurate information, and to have it reinvestigated.",
  "If a reinvestigation confirms that information is inaccurate, incomplete, or cannot be verified, it must be corrected or removed from your file.",
  "You have the right to add a statement to your file explaining a dispute if a reinvestigation does not resolve it to your satisfaction.",
  "Your consent is generally required before a consumer report is provided to an employer for employment purposes.",
  "You have the right to seek damages from violators under the FCRA if your rights are violated.",
];

export default function CompliancePage() {
  return (
    <>
      {/* Intro — full-bleed inverted section */}
      <section className="bg-surface-inverted">
        <div className="mx-auto max-w-6xl px-4 py-band sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl font-semibold text-content-inverted sm:text-5xl">
              Compliance &amp; Your Rights
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-content-inverted-muted">
              If {siteConfig.brand.name} provided a background check report
              about you, this page explains your rights under the Fair
              Credit Reporting Act (FCRA), how to dispute information you
              believe is wrong, and how to request a copy of your report.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface-sunken">
        <div className="mx-auto max-w-6xl px-4 py-band sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
            <nav
              aria-label="Compliance sections"
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
                id="fcra-rights"
                className="scroll-mt-24 rounded-card border border-border bg-surface p-6 sm:p-8"
              >
                <h2 className="font-serif text-2xl font-semibold text-content-strong">
                  Your Rights Under the FCRA
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-content-muted">
                  The Fair Credit Reporting Act (FCRA) gives consumers
                  specific rights when a consumer reporting agency prepares a
                  background check report about them. At a high level, those
                  rights include:
                </p>
                <ul className="mt-4 space-y-3">
                  {fcraRights.map((right) => (
                    <li
                      key={right}
                      className="flex items-start gap-3 text-sm leading-relaxed text-content"
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
                      {right}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 max-w-2xl text-sm leading-relaxed text-content-muted">
                  Consumer reporting agencies are expected to provide
                  consumers with the CFPB&apos;s official summary of these
                  rights, reproduced in full below.
                </p>
                <a
                  href="https://files.consumerfinance.gov/f/documents/bcfp_consumer-rights-summary_2018-09.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center text-sm font-medium text-interactive underline decoration-interactive decoration-2 underline-offset-4 transition-colors duration-200 hover:text-interactive-hover"
                >
                  Read: A Summary of Your Rights Under the Fair Credit
                  Reporting Act (PDF)
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </section>

              <section
                id="california-residents"
                className="scroll-mt-24 rounded-card border border-border bg-surface p-6 sm:p-8"
              >
                <h2 className="font-serif text-2xl font-semibold text-content-strong">
                  California Residents
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-content-muted">
                  California residents have additional rights under the
                  state&apos;s Investigative Consumer Reporting Agencies Act
                  (ICRAA), California Civil Code § 1786 et seq., which
                  applies alongside the federal FCRA when an investigative
                  consumer report is prepared about you.
                </p>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3 text-sm leading-relaxed text-content">
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
                    You have the right to inspect the file an investigative
                    consumer reporting agency holds on you (Cal. Civ. Code §
                    1786.22).
                  </li>
                  <li className="flex items-start gap-3 text-sm leading-relaxed text-content">
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
                    Employers must give notice and obtain your authorization
                    before obtaining an investigative consumer report about
                    you, and you may request a copy of that report (Cal.
                    Civ. Code § 1786.16).
                  </li>
                </ul>
                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href="https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=CIV&division=3.&title=1.6A.&part=4.&chapter=&article=1."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-interactive underline decoration-interactive decoration-2 underline-offset-4 transition-colors duration-200 hover:text-interactive-hover"
                  >
                    Read: California Investigative Consumer Reporting
                    Agencies Act (Cal. Civ. Code § 1786 et seq.)
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  <a
                    href="https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1786.22"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-interactive underline decoration-interactive decoration-2 underline-offset-4 transition-colors duration-200 hover:text-interactive-hover"
                  >
                    Cal. Civ. Code § 1786.22 — Right to Inspect Your File
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  <a
                    href="https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=1786.16.&lawCode=CIV"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-interactive underline decoration-interactive decoration-2 underline-offset-4 transition-colors duration-200 hover:text-interactive-hover"
                  >
                    Cal. Civ. Code § 1786.16 — Notice and Authorization
                    Requirements
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
                <p className="mt-6 max-w-2xl text-sm leading-relaxed text-content-muted">
                  [[PLACEHOLDER: California-specific disclosures and notice
                  text — client legal to supply]]
                </p>
              </section>

              <section
                id="dispute"
                className="scroll-mt-24 rounded-card border border-border bg-surface p-6 sm:p-8"
              >
                <h2 className="font-serif text-2xl font-semibold text-content-strong">
                  Filing a Dispute
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-content-muted">
                  If you believe information in your report is inaccurate or
                  incomplete, you can dispute it by following these steps:
                </p>
                <ol className="mt-6 space-y-5">
                  {[
                    "Contact us using the dispute channel below and let us know you'd like to dispute information in your report.",
                    "Identify yourself and the specific information you believe is inaccurate, incomplete, or unverifiable.",
                    "We will reinvestigate your dispute, which may include contacting the original source(s) of the information.",
                    "We will provide you with the written results of the reinvestigation.",
                    "If the disputed information is confirmed to be inaccurate, incomplete, or unverifiable, it will be corrected or deleted from your file.",
                  ].map((step, i) => (
                    <li key={step} className="flex gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-inverted text-xs font-semibold text-content-inverted">
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed text-content">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
                {/* `disputeEmail` currently points at the general `info@`
                    inbox as an interim route. FCRA disputes carry statutory
                    reinvestigation timelines, so a dedicated `disputes@`
                    mailbox (routed separately from general sales inquiries)
                    is better practice once the client can provision one. */}
                <div className="mt-6 rounded-card border border-border bg-surface-sunken p-6">
                  <p className="text-sm font-semibold text-content-strong">
                    Dispute intake
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-content-muted">
                    Email: {siteConfig.contact.disputeEmail}
                    <br />
                    [[PLACEHOLDER: dispute intake form / mailing address]]
                  </p>
                </div>
              </section>

              <section
                id="request-report"
                className="scroll-mt-24 rounded-card border border-border bg-surface p-6 sm:p-8"
              >
                <h2 className="font-serif text-2xl font-semibold text-content-strong">
                  Requesting a Copy of Your Report
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-content-muted">
                  You may be entitled to a free or low-cost copy of your
                  report under certain circumstances, including after an
                  adverse action. To request a copy of your report, contact
                  us using the same channel listed above and provide your
                  full name and enough identifying information for us to
                  locate your file. We will respond to verified requests
                  within the timeframe required by law.
                </p>
              </section>

              <section
                id="privacy-policy"
                className="scroll-mt-24 rounded-card border border-border bg-surface p-6 sm:p-8"
              >
                <h2 className="font-serif text-2xl font-semibold text-content-strong">
                  Privacy Policy
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-content-muted">
                  [[PLACEHOLDER: full privacy policy text — client legal to
                  supply]]
                </p>
              </section>

              <section
                id="trafficking"
                className="scroll-mt-24 rounded-card border border-border bg-surface p-6 sm:p-8"
              >
                <h2 className="font-serif text-2xl font-semibold text-content-strong">
                  Victims of Human Trafficking
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-content-muted">
                  [[PLACEHOLDER: trafficking block process]]
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
              Questions about a report or a dispute?
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
