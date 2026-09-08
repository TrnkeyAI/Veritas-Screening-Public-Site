"use client";

import { Component, type ReactNode } from "react";
import { Sentry } from "@/observability/instrumentation";

type Props = { children: ReactNode };
type State = { hasError: boolean };

/**
 * Root error boundary — reports render errors to GlitchTip via
 * `Sentry.captureException`, same as the main Veritas app's
 * ErrorBoundary.tsx. A five-page marketing site has almost nothing that
 * can throw during render, but this is the correct place to catch it if
 * something does (a bad content flag combination, a third-party embed
 * failing) rather than a blank page with no signal.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    Sentry.captureException(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-2 px-4 text-center">
          <p className="text-lg font-medium text-content">Something went wrong.</p>
          <p className="text-sm text-content-muted">Please refresh the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
