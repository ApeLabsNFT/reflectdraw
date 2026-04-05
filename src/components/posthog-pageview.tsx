"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { useBooleanPreference } from "@/lib/preferences";

export function PostHogPageview() {
  const pathname = usePathname();
  const [analyticsConsent] = useBooleanPreference("analytics-consent", false);
  const posthogKey =
    process.env.NEXT_PUBLIC_POSTHOG_KEY ??
    process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ??
    process.env.NEXT_PUBLIC_POSTHOG_TOKEN;

  useEffect(() => {
    if (!posthogKey || !analyticsConsent || typeof window === "undefined") {
      return;
    }

    const url = window.location.href;

    posthog.capture("$pageview", {
      pathname,
      url,
    });
  }, [analyticsConsent, pathname, posthogKey]);

  return null;
}
