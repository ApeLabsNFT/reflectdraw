"use client";

import { ClerkProvider } from "@clerk/nextjs";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";
import { PostHogPageview } from "@/components/posthog-pageview";
import { useBooleanPreference } from "@/lib/preferences";

let posthogStarted = false;

function PostHogLayer({ children }: { children: React.ReactNode }) {
  const [analyticsConsent] = useBooleanPreference("analytics-consent", false);
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost =
    process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

  useEffect(() => {
    if (!posthogKey) {
      return;
    }

    if (!posthogStarted && analyticsConsent) {
      posthog.init(posthogKey, {
        api_host: posthogHost,
        capture_pageview: false,
        capture_pageleave: true,
        autocapture: false,
        person_profiles: "identified_only",
        loaded: (client) => {
          if (process.env.NODE_ENV === "development") {
            client.debug();
          }
        },
      });
      posthogStarted = true;
      return;
    }

    if (posthogStarted) {
      if (analyticsConsent) {
        posthog.opt_in_capturing();
      } else {
        posthog.opt_out_capturing();
      }
    }
  }, [analyticsConsent, posthogHost, posthogKey]);

  if (!posthogKey) {
    return <>{children}</>;
  }

  return (
    <PostHogProvider client={posthog}>
      <PostHogPageview />
      {children}
    </PostHogProvider>
  );
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const content = <PostHogLayer>{children}</PostHogLayer>;

  if (!clerkPublishableKey) {
    return content;
  }

  return (
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      afterSignOutUrl="/"
      appearance={{
        variables: {
          colorPrimary: "#6d7d66",
          colorText: "#2f342f",
          colorBackground: "#faf8f3",
          borderRadius: "1rem",
        },
        elements: {
          card: "bg-white/88 shadow-none backdrop-blur-xl",
          footerActionLink: "text-[var(--sage)]",
        },
      }}
    >
      {content}
    </ClerkProvider>
  );
}
