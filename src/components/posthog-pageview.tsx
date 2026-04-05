"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { useBooleanPreference } from "@/lib/preferences";

export function PostHogPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [analyticsConsent] = useBooleanPreference("analytics-consent", false);
  const query = searchParams.toString();

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY || !analyticsConsent) {
      return;
    }

    const url = `${window.location.origin}${pathname}${query ? `?${query}` : ""}`;

    posthog.capture("$pageview", {
      pathname,
      url,
    });
  }, [analyticsConsent, pathname, query]);

  return null;
}
