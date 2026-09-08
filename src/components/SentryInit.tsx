"use client";

import { useEffect } from "react";
import { initSentry } from "@/observability/instrumentation";

/**
 * Fires GlitchTip init once on mount. A client component because
 * `layout.tsx` is a server component under static export and
 * `@sentry/browser` must only run in the browser (see instrumentation.ts's
 * `typeof window` guard, which also covers the case where this somehow
 * still runs during the static build).
 */
export default function SentryInit() {
  useEffect(() => {
    initSentry();
  }, []);

  return null;
}
