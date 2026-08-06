import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import logoMark from "../../public/logo-mark.png";

const consumerLinks = [
  { label: "Your Rights Under the FCRA", href: "/compliance#fcra-rights" },
  { label: "Filing a Dispute", href: "/compliance#dispute" },
  { label: "Requesting a Copy of Your Report", href: "/compliance#request-report" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-inverted text-content-inverted">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="flex items-center gap-2 font-serif text-lg font-semibold text-content-inverted">
              <Image src={logoMark} alt="" aria-hidden="true" className="h-8 w-auto" />
              {siteConfig.brand.name}
            </p>
            <p className="mt-2 max-w-xs text-sm text-content-inverted-muted">
              {siteConfig.brand.tagline}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">
              Navigate
            </h2>
            <ul className="mt-4 space-y-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-content-inverted-muted transition-colors hover:text-content-inverted"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">
              Consumer Info
            </h2>
            <ul className="mt-4 space-y-2">
              {consumerLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-content-inverted-muted transition-colors hover:text-content-inverted"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">
              Contact
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-content-inverted-muted">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="transition-colors hover:text-content-inverted"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-xs text-content-inverted-subtle">
            &copy; {year} {siteConfig.brand.name}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
