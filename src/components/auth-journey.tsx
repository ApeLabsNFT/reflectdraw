"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck, Sparkles, Wind } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BrandMark } from "@/components/brand-mark";
import { EmailAuthForm } from "@/components/email-auth-form";
import { useAuthSession } from "@/lib/use-auth-session";

const steps = [
  "Choose how the reflections should sound.",
  "Set boundaries, privacy, and support expectations.",
  "Begin onboarding the moment auth is complete.",
];

export function AuthJourney({
  mode,
  error,
}: {
  mode: "sign-in" | "sign-up";
  error?: string;
}) {
  const router = useRouter();
  const { isSignedIn, isLoading } = useAuthSession();

  useEffect(() => {
    if (!isLoading && isSignedIn) {
      router.replace("/welcome");
    }
  }, [isLoading, isSignedIn, router]);

  return (
    <main className="app-canvas min-h-screen px-6 py-7">
      <div className="mx-auto max-w-[430px] space-y-6">
        <div className="route-section flex items-center justify-between">
          <BrandMark />
          <Link
            href="/"
            className="secondary-cta h-11 px-4 text-xs font-semibold tracking-[0.14em] uppercase"
          >
            <ArrowLeft className="size-4" />
            Back
          </Link>
        </div>

        <section className="route-section space-y-5">
          <div className="paper-image artwork-mist relative aspect-[0.92] overflow-hidden rounded-[2.7rem]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.38),transparent_34%),linear-gradient(180deg,rgba(17,18,16,0.04),rgba(17,18,16,0.32))]" />
            <div className="relative flex h-full flex-col justify-between p-5 text-white">
              <div className="surface-panel inline-flex w-fit items-center gap-2 rounded-full px-3 py-2 text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-[var(--sage)]">
                <Sparkles className="size-3.5" />
                Auth + onboarding
              </div>
              <div className="space-y-4 rounded-[2rem] bg-[rgba(255,255,255,0.12)] p-5 backdrop-blur-md">
                <p className="eyebrow text-white/72">The entry ritual</p>
                <h1 className="display-heading text-balance text-[clamp(2.6rem,8vw,4rem)] text-white">
                  Step in once. The app should know what comes next.
                </h1>
                <p className="max-w-sm text-sm leading-7 text-white/82">
                  No more loose signup dead ends. ReflectDraw now routes from
                  auth into onboarding, then into your archive.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {steps.map((step, index) => (
              <div
                key={step}
                className="surface-panel-soft rounded-[1.8rem] p-3"
              >
                <p className="eyebrow">0{index + 1}</p>
                <p className="mt-3 text-sm leading-6 text-[rgba(47,52,48,0.88)]">
                  {step}
                </p>
              </div>
            ))}
          </div>

          <div className="surface-panel-soft flex items-start gap-3 rounded-[2rem] p-4">
            <span className="secondary-cta size-11 shrink-0">
              <ShieldCheck className="size-5" />
            </span>
            <div className="space-y-2">
              <p className="font-semibold text-[var(--charcoal)]">
                Reflective scope stays explicit.
              </p>
              <p className="text-sm leading-7 text-[rgba(117,123,116,0.9)]">
                Auth methods are only the door. The app still keeps its
                non-diagnostic guardrails, privacy promises, and crisis support
                boundaries in view.
              </p>
            </div>
          </div>
        </section>

        <div className="route-section grid grid-cols-2 gap-3">
          <Link
            href="/auth?mode=sign-up"
            data-active={mode === "sign-up"}
            className="ghost-chip h-12 px-4 text-sm font-semibold"
          >
            Create account
          </Link>
          <Link
            href="/auth?mode=sign-in"
            data-active={mode === "sign-in"}
            className="ghost-chip h-12 px-4 text-sm font-semibold"
          >
            Sign in
          </Link>
        </div>

        <EmailAuthForm mode={mode} serverError={error} />

        <div className="route-section flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.15em] text-[rgba(117,123,116,0.82)] uppercase">
          <Wind className="size-3.5" />
          Guest preview is still available in the archive if you just want to look around.
        </div>
      </div>
    </main>
  );
}
