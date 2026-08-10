import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// /privacy has no authored policy text yet and 404s while
// siteConfig.sections.showPrivacyPolicy is false — keep crawlers off it
// until the flag flips.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      ...(siteConfig.sections.showPrivacyPolicy
        ? {}
        : { disallow: "/privacy" }),
    },
  };
}
