"use client";

import * as Sentry from "@sentry/nextjs";
import Link from "next/link";
import { ArrowRight, RefreshCcw } from "lucide-react";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="app-canvas min-h-screen px-6 py-8">
        <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[430px] flex-col justify-center">
          <section className="surface-panel space-y-5 rounded-[2.4rem] p-6 text-center">
            <p className="eyebrow">A softer reset</p>
            <h1 className="display-heading text-[clamp(2.5rem,8vw,3.8rem)] text-[var(--charcoal)]">
              Something slipped out of rhythm.
            </h1>
            <p className="muted-copy text-sm">
              The moment has been logged so we can harden the experience. You can
              try again, or return to the archive without losing your place.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={reset}
                className="secondary-cta h-13 w-full px-4 text-sm font-semibold"
              >
                <RefreshCcw className="size-4" />
                Try again
              </button>
              <Link
                href="/archive"
                className="primary-cta h-13 w-full px-4 text-sm font-semibold"
              >
                Back to archive
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
