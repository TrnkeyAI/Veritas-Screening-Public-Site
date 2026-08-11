import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// /privacy has no authored policy text yet and 404s while
// siteConfig.sections.showPrivacyPolicy is false — keep crawlers off it
// until the flag flips.

// Required by `output: "export"` in next.config.ts — a route handler must
// declare itself static or the export build fails collecting page data.
export const dynamic = "force-static";

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
