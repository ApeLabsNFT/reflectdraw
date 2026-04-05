import type { User } from "@supabase/supabase-js";
import { preferredToneSchema, type CapturePayload } from "@/lib/contracts";

type UserMetadata = {
  full_name?: string;
  name?: string;
  display_name?: string;
  sanctuary_label?: string;
  preferred_tone?: CapturePayload["preferredTone"];
  onboarding_completed?: boolean;
  accepted_terms_at?: string;
  accepted_privacy_at?: string;
  accepted_reflective_scope_at?: string;
};

function getMetadata(user: User | null | undefined): UserMetadata {
  return ((user?.user_metadata ?? {}) as UserMetadata) ?? {};
}

export function getDisplayName(user: User | null | undefined) {
  const metadata = getMetadata(user);
  const emailFallback = user?.email?.split("@")[0];

  return (
    metadata.display_name ??
    metadata.full_name ??
    metadata.name ??
    emailFallback ??
    "ReflectDraw user"
  );
}

export function getSanctuaryLabel(user: User | null | undefined) {
  const metadata = getMetadata(user);
  return metadata.sanctuary_label ?? `${getDisplayName(user)}'s Sanctuary`;
}

export function getPreferredTone(user: User | null | undefined) {
  const parsed = preferredToneSchema.safeParse(getMetadata(user).preferred_tone);
  return parsed.success ? parsed.data : "softly-held";
}

export function hasCompletedOnboarding(user: User | null | undefined) {
  return Boolean(getMetadata(user).onboarding_completed);
}

export function hasAcceptedReflectiveScope(user: User | null | undefined) {
  const metadata = getMetadata(user);
  return Boolean(
    metadata.accepted_terms_at &&
      metadata.accepted_privacy_at &&
      metadata.accepted_reflective_scope_at,
  );
}

export function getAuthCallbackUrl(next = "/welcome") {
  if (typeof window === "undefined") {
    return undefined;
  }

  const callback = new URL("/auth/callback", window.location.origin);
  callback.searchParams.set("next", next);
  return callback.toString();
}
