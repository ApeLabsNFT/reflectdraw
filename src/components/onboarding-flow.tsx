"use client";

import { LoaderCircle, ShieldCheck, Sparkles, Wind } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BrandMark } from "@/components/brand-mark";
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
    <main className="landing-shell overflow-hidden px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-[1460px] flex-col">
        <header className="route-section flex items-center justify-between gap-3">
          <div className="glass-soft-dark inline-flex items-center rounded-full px-4 py-3">
            <BrandMark href="/" tone="light" />
          </div>
          <div className="glass-soft-dark inline-flex h-12 items-center rounded-full px-5 text-xs font-semibold tracking-[0.14em] text-white uppercase">
            Onboarding
          </div>
        </header>

        <section className="mt-4 grid flex-1 gap-5 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="route-section glass-dark flex flex-col justify-between rounded-[2.5rem] p-5 sm:p-6 lg:p-8">
            <div className="space-y-6">
              <div className="glass-soft-dark inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-[0.68rem] font-semibold tracking-[0.16em] text-white uppercase">
                <Sparkles className="size-3.5" />
                Sanctuary setup
              </div>

              <div className="space-y-4">
                <h1 className="display-heading max-w-[12ch] text-balance text-[clamp(3rem,5.2vw,5.3rem)] leading-[0.9] text-white">
                  Build the sanctuary before the archive opens.
                </h1>
                <p className="max-w-[34rem] text-base leading-8 text-[rgba(245,245,238,0.82)]">
                  This is where the app learns tone, support boundaries, and
                  the shape of your personal space, so the journey after login
                  feels intentional instead of generic.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  "Name the sanctuary and make it feel like yours.",
                  "Choose how the reflection should sound back to you.",
                  "Confirm privacy, scope, and what support the app is actually for.",
                ].map((item, index) => (
                  <div key={item} className="glass-soft-dark rounded-[1.8rem] p-4">
                    <p className="eyebrow text-[rgba(245,245,238,0.62)]">0{index + 1}</p>
                    <p className="mt-3 text-sm leading-7 text-white/82">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 glass-soft-dark rounded-[2rem] p-4">
              <div className="flex items-center justify-between gap-4">
                <p className="font-semibold text-white">Progress</p>
                <p className="text-sm text-white/68">{Math.round(progress)}%</p>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#f6f1df,#d3e2d3)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="route-section flex flex-col gap-4">
            {step === 0 ? (
              <section className="surface-panel space-y-4 rounded-[2.4rem] p-5 sm:p-6">
                <div className="paper-image artwork-glow aspect-[0.62] w-full rounded-[2.2rem] p-5 sm:aspect-[0.42]">
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

                <div className="grid gap-4 lg:grid-cols-2">
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
                  <label className="block space-y-2">
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
              <section className="surface-panel space-y-5 rounded-[2.4rem] p-5 sm:p-6">
                <div>
                  <p className="eyebrow">Voice and focus</p>
                  <p className="mt-3 serif-heading text-[2.4rem] leading-[0.96] text-[var(--charcoal)]">
                    Choose the emotional register of the app.
                  </p>
                </div>

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

                <div className="surface-panel-soft rounded-[2rem] p-4">
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
                      className="surface-panel rounded-[1.8rem] p-4 text-left"
                    >
                      <p className="font-semibold text-[var(--charcoal)]">Haptics</p>
                      <p className="mt-2 text-sm text-[rgba(117,123,116,0.9)]">
                        {hapticsEnabled ? "Enabled for ritual cues." : "Currently off."}
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSoundscapeEnabled((current) => !current)}
                      className="surface-panel rounded-[1.8rem] p-4 text-left"
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
              <section className="surface-panel space-y-5 rounded-[2.4rem] p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <span className="secondary-cta size-11 shrink-0">
                    <ShieldCheck className="size-5" />
                  </span>
                  <div className="space-y-2">
                    <p className="font-semibold text-[var(--charcoal)]">
                      Boundaries before interpretation
                    </p>
                    <p className="text-sm leading-7 text-[rgba(117,123,116,0.92)]">
                      ReflectDraw supports grounding, breathwork, sleep-supportive
                      ritual, and reflective image journaling. It does not diagnose,
                      replace treatment, or act as emergency support.
                    </p>
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

            <section className="grid grid-cols-2 gap-3 pb-2">
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
        </section>
      </div>
    </main>
  );
}
