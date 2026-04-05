"use client";

import Link from "next/link";
import {
  ChevronRight,
  HeartPulse,
  Layers3,
  LogIn,
  LogOut,
  ShieldCheck,
  ToggleLeft,
  ToggleRight,
  Wind,
} from "lucide-react";
import { seedProfile } from "@/lib/demo-data";
import { useBooleanPreference } from "@/lib/preferences";
import { useAuthSession } from "@/lib/use-auth-session";
import { initialsFromName } from "@/lib/utils";

function SettingToggle({
  label,
  description,
  preferenceKey,
  fallback,
}: {
  label: string;
  description: string;
  preferenceKey: string;
  fallback: boolean;
}) {
  const [enabled, setEnabled] = useBooleanPreference(preferenceKey, fallback);

  return (
    <button
      type="button"
      onClick={() => setEnabled((current) => !current)}
      className="surface-panel-soft flex w-full items-start justify-between gap-4 rounded-[1.8rem] p-4 text-left"
    >
      <div>
        <p className="font-semibold text-[var(--charcoal)]">{label}</p>
        <p className="mt-1.5 text-sm text-[rgba(117,123,116,0.88)]">
          {description}
        </p>
      </div>
      {enabled ? (
        <ToggleRight className="size-8 text-[var(--sage)]" />
      ) : (
        <ToggleLeft className="size-8 text-[rgba(117,123,116,0.5)]" />
      )}
    </button>
  );
}

export function SettingsPanel() {
  const {
    client,
    isSignedIn,
    isOnboarded,
    user,
    displayName,
    sanctuaryLabel,
  } = useAuthSession();

  return (
    <div className="route-section space-y-6 pt-1 pb-6">
      <section className="surface-panel rounded-[2.5rem] px-5 py-6 text-center">
        <div className="mx-auto flex size-28 items-center justify-center rounded-full bg-[linear-gradient(180deg,rgba(217,230,211,0.9),rgba(255,255,255,0.96))] shadow-[0_36px_76px_-44px_rgba(47,52,48,0.45)]">
          <span className="font-serif text-4xl text-[var(--sage)]">
            {initialsFromName(isSignedIn ? displayName : seedProfile.name)}
          </span>
        </div>
        <div className="mt-5 space-y-2">
          <p className="eyebrow">Personal sanctuary</p>
          <h1 className="serif-heading text-[3rem] leading-[0.95]">
            {isSignedIn ? sanctuaryLabel : seedProfile.sanctuaryLabel}
          </h1>
          <p className="muted-copy text-sm">
            Nervous system care, soft privacy boundaries, and rituals that stay
            in your control.
          </p>
          <p className="text-sm text-[rgba(117,123,116,0.88)]">
            {isSignedIn
              ? isOnboarded
                ? `Signed in as ${user?.email ?? "your account"}`
                : "Signed in, but onboarding still needs to be completed."
              : "Guest mode is active until auth is connected."}
          </p>
        </div>
      </section>

      {!isOnboarded && isSignedIn ? (
        <Link
          href="/onboarding"
          className="surface-panel flex items-center justify-between rounded-[2rem] px-5 py-4"
        >
          <div>
            <p className="eyebrow">Finish onboarding</p>
            <p className="mt-2 text-sm text-[rgba(117,123,116,0.9)]">
              Complete the sanctuary setup before continuing deeper into the app.
            </p>
          </div>
          <ChevronRight className="size-5 text-[var(--sage)]" />
        </Link>
      ) : null}

      <section className="surface-panel rounded-[2rem] p-5">
        <div className="flex items-start gap-3">
          <div className="secondary-cta size-11">
            <HeartPulse className="size-5" />
          </div>
          <div>
            <p className="font-semibold text-[var(--charcoal)]">System Summary</p>
            <p className="mt-2 text-sm text-[rgba(117,123,116,0.9)]">
              Morning breath rituals are supporting steadier pacing, while
              evening sessions are reducing friction before sleep.
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <div className="surface-panel-soft rounded-[1.8rem] p-4">
          <p className="eyebrow">Resonance streak</p>
          <p className="mt-3 font-serif text-[2rem] leading-none text-[var(--charcoal)]">
            {seedProfile.streakDays} days
          </p>
        </div>
        <div className="surface-panel-soft rounded-[1.8rem] p-4">
          <p className="eyebrow">Average coherence</p>
          <p className="mt-3 font-serif text-[2rem] leading-none text-[var(--charcoal)]">
            82%
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <SettingToggle
          label="Haptics enabled"
          description="Light ritual cues during capture and breath pacing."
          preferenceKey="haptics-enabled"
          fallback
        />
        <SettingToggle
          label="Soundscape enabled"
          description="Low-stimulation atmosphere for nighttime rituals."
          preferenceKey="soundscape-enabled"
          fallback
        />
        <SettingToggle
          label="Analytics consent"
          description="Product improvement only. No raw reflections or image URLs."
          preferenceKey="analytics-consent"
          fallback={false}
        />
      </section>

      <section className="space-y-3">
        {[
          "Privacy & boundaries",
          "Account sanctuary",
          "Theme & atmosphere",
          "Delete my reflections",
        ].map((item) => (
          <button
            key={item}
            type="button"
            className="surface-panel-soft flex w-full items-center justify-between rounded-[1.8rem] px-4 py-4 text-left"
          >
            <span className="font-medium text-[var(--charcoal)]">{item}</span>
            <ChevronRight className="size-4 text-[rgba(117,123,116,0.72)]" />
          </button>
        ))}

        <Link
          href="/privacy"
          className="surface-panel-soft flex w-full items-center justify-between rounded-[1.8rem] px-4 py-4 text-left"
        >
          <span className="font-medium text-[var(--charcoal)]">Privacy policy</span>
          <ChevronRight className="size-4 text-[rgba(117,123,116,0.72)]" />
        </Link>

        <Link
          href="/terms"
          className="surface-panel-soft flex w-full items-center justify-between rounded-[1.8rem] px-4 py-4 text-left"
        >
          <span className="font-medium text-[var(--charcoal)]">Terms and conditions</span>
          <ChevronRight className="size-4 text-[rgba(117,123,116,0.72)]" />
        </Link>

        <Link
          href="/integrations"
          className="surface-panel flex w-full items-center justify-between rounded-[1.8rem] px-4 py-4 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="secondary-cta size-10">
              <Layers3 className="size-4" />
            </span>
            <div>
              <p className="font-medium text-[var(--charcoal)]">Feature and integration audit</p>
              <p className="mt-1 text-sm text-[rgba(117,123,116,0.88)]">
                See what is working locally and what still needs credentials.
              </p>
            </div>
          </div>
          <ChevronRight className="size-4 text-[rgba(117,123,116,0.72)]" />
        </Link>

        {isSignedIn ? (
          <button
            type="button"
            onClick={() => void client?.auth.signOut()}
            className="surface-panel flex w-full items-center justify-between rounded-[1.8rem] px-4 py-4 text-left"
          >
            <div className="flex items-center gap-3">
              <span className="secondary-cta size-10">
                <LogOut className="size-4" />
              </span>
              <div>
                <p className="font-medium text-[var(--charcoal)]">Sign out</p>
                <p className="mt-1 text-sm text-[rgba(117,123,116,0.88)]">
                  End the current device session.
                </p>
              </div>
            </div>
            <ChevronRight className="size-4 text-[rgba(117,123,116,0.72)]" />
          </button>
        ) : (
          <Link
            href="/auth"
            className="surface-panel flex w-full items-center justify-between rounded-[1.8rem] px-4 py-4 text-left"
          >
            <div className="flex items-center gap-3">
              <span className="secondary-cta size-10">
                <LogIn className="size-4" />
              </span>
              <div>
                <p className="font-medium text-[var(--charcoal)]">Log in or sign up</p>
                <p className="mt-1 text-sm text-[rgba(117,123,116,0.88)]">
                  Save your archive and ritual preferences across devices.
                </p>
              </div>
            </div>
            <ChevronRight className="size-4 text-[rgba(117,123,116,0.72)]" />
          </Link>
        )}
      </section>

      <section className="surface-panel rounded-[2rem] p-5">
        <div className="flex items-start gap-3">
          <div className="secondary-cta size-11">
            <ShieldCheck className="size-5" />
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-[var(--charcoal)]">
              Crisis and human support
            </p>
            <p className="text-sm text-[rgba(117,123,116,0.9)]">
              ReflectDraw stays reflective, not diagnostic. If you feel at risk
              or unable to stay safe, seek local emergency support or a crisis
              line immediately.
            </p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link
            href="/sanctuary"
            className="secondary-cta h-12 w-full px-4 text-sm font-semibold"
          >
            <Wind className="size-4" />
            Closing breath
          </Link>
          <Link
            href={isSignedIn ? "/welcome" : "/archive"}
            className="primary-cta h-12 w-full px-4 text-sm font-semibold"
          >
            {isSignedIn ? "Continue journey" : "Back to archive"}
          </Link>
        </div>
      </section>
    </div>
  );
}
