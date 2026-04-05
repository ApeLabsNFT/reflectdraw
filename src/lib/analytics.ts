"use client";

import posthog from "posthog-js";
import { readBooleanPreference } from "@/lib/preferences";

export function trackClientEvent(
  event: string,
  properties?: Record<string, string | number | boolean | null | undefined>,
) {
  if (typeof window === "undefined") {
    return;
  }

  if (
    !process.env.NEXT_PUBLIC_POSTHOG_KEY &&
    !process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
    !process.env.NEXT_PUBLIC_POSTHOG_TOKEN
  ) {
    return;
  }

  if (!readBooleanPreference("analytics-consent", false)) {
    return;
  }

  posthog.capture(event, properties);
}
