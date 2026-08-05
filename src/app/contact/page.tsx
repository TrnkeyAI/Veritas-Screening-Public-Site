import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import ContactForm from "./ContactForm";
import TrustBand from "@/components/TrustBand";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch to talk about a screening program, ask a question, or request a free consultation.",
};

export default function ContactPage() {
  return (
    <>
      {/* Full-bleed inverted section — form as a floating card, details balanced beside it */}
      <section className="bg-surface-inverted">
        <div className="mx-auto max-w-6xl px-4 py-band sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl font-semibold text-content-inverted sm:text-5xl">
              Contact Us
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-content-inverted-muted">
              Tell us about your hiring program and we&apos;ll follow up to
              talk through the right screening package for your team.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
            <div className="rounded-panel bg-surface p-6 shadow-xl sm:p-8 lg:col-span-2">
              {siteConfig.contactForm.provider === "ghl" ? (
                <iframe
                  title="Contact form"
                  src={siteConfig.contactForm.ghlEmbedUrl}
                  className="h-[720px] w-full rounded-control border-0"
                />
              ) : (
                <ContactForm />
              )}
            </div>

            <aside
              aria-label="Contact details"
              className="space-y-6 rounded-panel border border-white/15 bg-white/5 p-6 sm:p-8"
            >
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-accent">
                  Phone
                </h2>
                <p className="mt-2 text-sm text-white/90">
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/[^\d+]/g, "")}`}
                    className="transition-colors hover:text-content-inverted"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </p>
              </div>
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-accent">
                  Email
                </h2>
                <p className="mt-2 text-sm text-white/90">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="transition-colors hover:text-content-inverted"
                  >
                    {siteConfig.contact.email}
                  </a>
                </p>
              </div>
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-accent">
                  Address
                </h2>
                <p className="mt-2 text-sm text-white/90">
                  {siteConfig.contact.address}
                </p>
              </div>
              <div className="rounded-card border border-white/15 bg-white/10 p-5">
                <p className="text-sm leading-relaxed text-content-inverted-muted">
                  Are you a job candidate with a question about a background
                  check report? Visit our{" "}
                  <a
                    href="/compliance"
                    className="font-medium text-accent underline decoration-accent decoration-2 underline-offset-4 transition-colors duration-200 hover:text-content-inverted"
                  >
                    Compliance page
                  </a>{" "}
                  for information on your rights and how to file a dispute.
                </p>
              </div>
            </aside>
          </div>
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
