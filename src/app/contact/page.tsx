import type { Metadata } from "next";
import Script from "next/script";
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
            <div
              className="rounded-panel bg-surface p-6 shadow-xl sm:p-8 lg:col-span-2"
              // GHL's resize script briefly takes the iframe out of layout
              // flow (position: absolute) while it hides/reveals it, which
              // would otherwise collapse this panel to just its padding and
              // break the two-column balance next to the aside. min-height
              // holds the panel at the iframe's own pre-script height in
              // the meantime — same justified-dimension exception as the
              // iframe's height below.
              style={
                siteConfig.contactForm.provider === "ghl"
                  ? { minHeight: siteConfig.contactForm.ghlInitialHeight }
                  : undefined
              }
            >
              {/* KNOWN ISSUE — VERIFY ON THE PRODUCTION DOMAIN BEFORE LAUNCH.
                  On localhost this embed usually does NOT reveal. Both
                  requests succeed (widget + form_embed.js return 200, no
                  console errors), but GHL's script hides the iframe on load
                  (opacity:0; visibility:hidden; position:absolute;
                  left:-9999px) and only reveals it after the iframe posts a
                  height message back. That handshake mostly doesn't complete
                  here — observed stuck hidden for 18s+ at both 375 and 1280,
                  and reproduced with a byte-for-byte copy of GHL's raw embed
                  on a plain static page, so it is NOT caused by this code.
                  Most likely GHL's per-form allowed-domains setting rejects
                  `localhost` as the parent origin.

                  FAILURE MODE IF IT ALSO FAILS IN PRODUCTION: visitors see an
                  empty white panel with no form and no error — a dead contact
                  page. To check: load /contact on the real domain and confirm
                  the iframe's computed visibility is `visible` and its height
                  has changed from ghlInitialHeight (the script resizes it on
                  a successful handshake).

                  IF IT FAILS THERE TOO, two fixes, either is fine:
                  (a) add the domain to the form's allowed domains in GHL, or
                  (b) set `contactForm.provider` back to "builtin" — the React
                      form in ContactForm.tsx still works and is kept for
                      exactly this. */}
              {siteConfig.contactForm.provider === "ghl" ? (
                <>
                  <iframe
                    src={siteConfig.contactForm.ghlEmbedUrl}
                    style={{ height: siteConfig.contactForm.ghlInitialHeight }}
                    id={`inline-${siteConfig.contactForm.ghlFormId}`}
                    data-layout="{'id':'INLINE'}"
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name={siteConfig.contactForm.ghlFormName}
                    data-height={siteConfig.contactForm.ghlInitialHeight}
                    data-layout-iframe-id={`inline-${siteConfig.contactForm.ghlFormId}`}
                    data-form-id={siteConfig.contactForm.ghlFormId}
                    title={siteConfig.contactForm.ghlFormName}
                    className="w-full rounded-control border-0"
                  />
                  {/* GHL's resize script reads the data-* attributes above and
                      posts height updates to the iframe at runtime. Loaded
                      afterInteractive (not lazyOnload): the form is the
                      primary content of this page, so it should be resized
                      to its real height, not the ghlInitialHeight fallback,
                      as soon as the page is interactive rather than waiting
                      for the browser to go idle. */}
                  <Script
                    src="https://link.msgsndr.com/js/form_embed.js"
                    strategy="afterInteractive"
                  />
                </>
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
