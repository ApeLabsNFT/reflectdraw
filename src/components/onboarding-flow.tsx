"use client";

import { LoaderCircle, ShieldCheck, Sparkles, Wind } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useBooleanPreference } from "@/lib/preferences";
import { useAuthSession } from "@/lib/use-auth-session";

const toneCards = [
  {
    id: "softly-held",
    title: "Softly held",
    body: "Gentle, steady, and emotionally spacious without feeling vague.",
  },
  {
    id: "clear-eyed",
    title: "Clear eyed",
    body: "Direct and grounded when you want less poetry and more clarity.",
  },
  {
    id: "poetic",
    title: "Poetic",
    body: "Lyrical and image-rich, while still staying inside ReflectDraw's scope.",
  },
] as const;

const focusCards = [
  "Grounding before or after drawing",
  "Anxiety downshifting and breath pacing",
  "Wind-down rituals for nighttime",
];

export function OnboardingFlow() {
  const router = useRouter();
  const {
    client,
    isConfigured,
    isLoading,
    isOnboarded,
    isSignedIn,
    displayName,
    preferredTone,
    hasAcceptedScope,
  } = useAuthSession();
  const [step, setStep] = useState(0);
  const [name, setName] = useState(displayName);
  const [sanctuaryLabel, setSanctuaryLabel] = useState(`${displayName}'s Sanctuary`);
  const [tone, setTone] = useState(preferredTone);
  const [focus, setFocus] = useState(focusCards[0]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [acceptedScope, setAcceptedScope] = useState(false);
  const [hapticsEnabled, setHapticsEnabled] = useBooleanPreference("haptics-enabled", true);
  const [soundscapeEnabled, setSoundscapeEnabled] = useBooleanPreference("soundscape-enabled", true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isLoading && !isSignedIn) {
      router.replace("/auth");
      return;
    }

    if (!isLoading && isOnboarded) {
      router.replace("/archive");
    }
  }, [isLoading, isOnboarded, isSignedIn, router]);

  useEffect(() => {
    setName(displayName);
    setSanctuaryLabel(`${displayName}'s Sanctuary`);
    setTone(preferredTone);
  }, [displayName, preferredTone]);

  useEffect(() => {
    if (hasAcceptedScope) {
      setAcceptedTerms(true);
      setAcceptedPrivacy(true);
      setAcceptedScope(true);
    }
  }, [hasAcceptedScope]);

  const progress = useMemo(() => ((step + 1) / 3) * 100, [step]);

  async function completeOnboarding() {
    setError(null);

    if (!client) {
      setError("Supabase auth is not ready yet on this device.");
      return;
    }

    if (!acceptedTerms || !acceptedPrivacy || !acceptedScope) {
      setError("Please confirm the terms, privacy promise, and reflective scope before continuing.");
      return;
    }

    setIsSaving(true);

    try {
      const now = new Date().toISOString();
      const { error: updateError } = await client.auth.updateUser({
        data: {
          display_name: name.trim(),
          full_name: name.trim(),
          sanctuary_label: sanctuaryLabel.trim(),
          preferred_tone: tone,
          primary_focus: focus,
          onboarding_completed: true,
          accepted_terms_at: now,
          accepted_privacy_at: now,
          accepted_reflective_scope_at: now,
          haptics_enabled: hapticsEnabled,
          soundscape_enabled: soundscapeEnabled,
        },
      });

      if (updateError) {
        throw updateError;
      }

      router.replace("/archive");
      router.refresh();
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "We couldn't save your onboarding choices.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="app-canvas min-h-screen px-6 py-7">
      <div className="mx-auto max-w-[430px] space-y-6">
        <section className="route-section space-y-4">
          <div className="surface-panel rounded-[2.4rem] p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="eyebrow">Onboarding</p>
                <h1 className="serif-heading mt-3 text-[3rem] leading-[0.93] text-[var(--charcoal)]">
                  Build the sanctuary before the archive opens.
                </h1>
              </div>
              <span className="secondary-cta size-12 shrink-0">
                <Sparkles className="size-5" />
              </span>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-[rgba(217,230,211,0.56)]">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,var(--sage),#a8b5a2)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </section>

        {step === 0 ? (
          <section className="route-section space-y-4">
            <div className="paper-image artwork-glow aspect-[0.84] w-full rounded-[2.7rem] p-5">
              <div className="flex h-full flex-col justify-between">
                <div className="surface-panel inline-flex w-fit items-center gap-2 rounded-full px-3 py-2">
                  <Wind className="size-4 text-[var(--sage)]" />
                  <span className="text-xs font-semibold tracking-[0.14em] text-[var(--sage)] uppercase">
                    Personal entry
                  </span>
                </div>
                <div className="surface-panel rounded-[2rem] p-4">
                  <p className="eyebrow">First impression</p>
                  <p className="mt-3 font-serif text-[2rem] leading-[1.02] text-[var(--charcoal)]">
                    Let the app learn your rhythm before it starts speaking back.
                  </p>
                </div>
              </div>
            </div>

            <div className="surface-panel-soft rounded-[2rem] p-4">
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-[var(--charcoal)]">
                  What should ReflectDraw call you?
                </span>
                <input
                  value={name}
                  onChange={(event) => {
                    const next = event.target.value;
                    setName(next);
                    if (!sanctuaryLabel || sanctuaryLabel === `${displayName}'s Sanctuary`) {
                      setSanctuaryLabel(`${next || "Your"}'s Sanctuary`);
                    }
                  }}
                  className="soft-input h-14 w-full px-4 text-sm outline-none"
                  placeholder="Your name"
                />
              </label>
              <label className="mt-4 block space-y-2">
                <span className="text-sm font-semibold text-[var(--charcoal)]">
                  Sanctuary label
                </span>
                <input
                  value={sanctuaryLabel}
                  onChange={(event) => setSanctuaryLabel(event.target.value)}
                  className="soft-input h-14 w-full px-4 text-sm outline-none"
                  placeholder="A calmer title for your archive"
                />
              </label>
            </div>
          </section>
        ) : null}

        {step === 1 ? (
          <section className="route-section space-y-4">
            <div className="grid gap-3">
              {toneCards.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  data-active={tone === card.id}
                  onClick={() => setTone(card.id)}
                  className="surface-panel-soft rounded-[2rem] p-4 text-left data-[active=true]:bg-[linear-gradient(180deg,rgba(217,230,211,0.92),rgba(255,255,255,0.92))] data-[active=true]:shadow-[0_28px_56px_-44px_rgba(86,98,83,0.45)]"
                >
                  <p className="font-semibold text-[var(--charcoal)]">{card.title}</p>
                  <p className="mt-2 text-sm leading-7 text-[rgba(117,123,116,0.9)]">
                    {card.body}
                  </p>
                </button>
              ))}
            </div>

            <div className="surface-panel rounded-[2rem] p-4">
              <p className="eyebrow">What are you here for first?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {focusCards.map((item) => (
                  <button
                    key={item}
                    type="button"
                    data-active={focus === item}
                    onClick={() => setFocus(item)}
                    className="ghost-chip px-4 py-2 text-xs font-semibold"
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setHapticsEnabled((current) => !current)}
                  className="surface-panel-soft rounded-[1.8rem] p-4 text-left"
                >
                  <p className="font-semibold text-[var(--charcoal)]">Haptics</p>
                  <p className="mt-2 text-sm text-[rgba(117,123,116,0.9)]">
                    {hapticsEnabled ? "Enabled for ritual cues." : "Currently off."}
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setSoundscapeEnabled((current) => !current)}
                  className="surface-panel-soft rounded-[1.8rem] p-4 text-left"
                >
                  <p className="font-semibold text-[var(--charcoal)]">Soundscape</p>
                  <p className="mt-2 text-sm text-[rgba(117,123,116,0.9)]">
                    {soundscapeEnabled ? "Ready for low-light sessions." : "Kept quiet for now."}
                  </p>
                </button>
              </div>
            </div>
          </section>
        ) : null}

        {step === 2 ? (
          <section className="route-section space-y-4">
            <div className="surface-panel rounded-[2.2rem] p-5">
              <div className="flex items-start gap-3">
                <span className="secondary-cta size-11 shrink-0">
                  <ShieldCheck className="size-5" />
                </span>
                <div className="space-y-2">
                  <p className="font-semibold text-[var(--charcoal)]">
                    Boundaries before interpretation
                  </p>
                  <p className="text-sm leading-7 text-[rgba(117,123,116,0.92)]">
                    ReflectDraw supports grounding, breathwork, sleep-supportive ritual,
                    and reflective image journaling. It does not diagnose, replace
                    treatment, or act as emergency support.
                  </p>
                </div>
              </div>
            </div>

            <div className="surface-panel-soft space-y-3 rounded-[2rem] p-4">
              <label className="flex items-start gap-3 text-sm leading-6 text-[rgba(117,123,116,0.94)]">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(event) => setAcceptedTerms(event.target.checked)}
                  className="mt-1"
                />
                <span>
                  I agree to the <Link href="/terms" className="font-semibold text-[var(--sage)]">Terms</Link>.
                </span>
              </label>
              <label className="flex items-start gap-3 text-sm leading-6 text-[rgba(117,123,116,0.94)]">
                <input
                  type="checkbox"
                  checked={acceptedPrivacy}
                  onChange={(event) => setAcceptedPrivacy(event.target.checked)}
                  className="mt-1"
                />
                <span>
                  I understand the <Link href="/privacy" className="font-semibold text-[var(--sage)]">Privacy Policy</Link> and want private-by-default handling.
                </span>
              </label>
              <label className="flex items-start gap-3 text-sm leading-6 text-[rgba(117,123,116,0.94)]">
                <input
                  type="checkbox"
                  checked={acceptedScope}
                  onChange={(event) => setAcceptedScope(event.target.checked)}
                  className="mt-1"
                />
                <span>
                  I understand this app offers reflective support inside its scope, not diagnosis, treatment, or crisis response.
                </span>
              </label>
            </div>
          </section>
        ) : null}

        {error ? (
          <div className="surface-panel-soft rounded-[1.8rem] px-4 py-3 text-sm text-[#8b5b4f]">
            {error}
          </div>
        ) : null}

        <section className="route-section grid grid-cols-2 gap-3 pb-6">
          <button
            type="button"
            onClick={() => setStep((current) => Math.max(0, current - 1))}
            disabled={step === 0}
            className="secondary-cta h-14 w-full px-4 text-sm font-semibold disabled:opacity-55"
          >
            Back
          </button>
          {step < 2 ? (
            <button
              type="button"
              onClick={() => setStep((current) => Math.min(2, current + 1))}
              className="primary-cta h-14 w-full px-4 text-sm font-semibold"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={() => void completeOnboarding()}
              disabled={isSaving || !isConfigured}
              className="primary-cta h-14 w-full px-4 text-sm font-semibold disabled:opacity-60"
            >
              {isSaving ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  Saving
                </>
              ) : (
                "Open my archive"
              )}
            </button>
          )}
        </section>
      </div>
    </main>
  );
}
