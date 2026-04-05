"use client";

import Link from "next/link";
import { ArrowRight, Camera, ShieldCheck, Wind } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { useAuthSession } from "@/lib/use-auth-session";

const journeySteps = [
  {
    title: "Arrive gently",
    body: "Begin with breath, orientation, and a pace that calms rather than rushes.",
    icon: Wind,
  },
  {
    title: "Capture what is here",
    body: "Use your phone camera, photo library, or a text-only ritual when you want less stimulation.",
    icon: Camera,
  },
  {
    title: "Receive reflective feedback",
    body: "AI responses stay inside ReflectDraw's scope: grounded reflection, gentle pattern noticing, and non-diagnostic support.",
    icon: ShieldCheck,
  },
];

export function LandingJourney() {
  const { isConfigured, isSignedIn, user } = useAuthSession();

  return (
    <main className="app-canvas min-h-screen px-6 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[430px] flex-col justify-between">
        <div className="route-section space-y-6">
          <BrandMark />

          <section className="space-y-8">
            <div className="paper-image artwork-glow aspect-[0.9] w-full" />
            <div className="space-y-5 px-1">
              <p className="eyebrow">Somatic reflection and regulation</p>
              <h1 className="display-heading text-balance text-[clamp(3rem,9vw,4.5rem)] text-[var(--charcoal)]">
                Start the journey with more steadiness than pressure.
              </h1>
              <p className="muted-copy max-w-md text-lg">
                ReflectDraw helps you draw, breathe, notice patterns, and
                receive intelligent feedback framed for grounding, not diagnosis.
              </p>
              <p className="text-sm leading-7 text-[rgba(117,123,116,0.94)]">
                {isConfigured
                  ? isSignedIn
                    ? `Signed in as ${user?.email ?? "your account"}.`
                    : "Sign up to save your archive and carry your rituals across devices."
                  : "Auth is ready to connect as soon as your Supabase public and server keys are added."}
              </p>
            </div>
          </section>

          <section className="space-y-3">
            {journeySteps.map((step) => (
              <div
                key={step.title}
                className="surface-panel-soft flex items-start gap-3 rounded-[2rem] p-4"
              >
                <div className="secondary-cta size-11 shrink-0">
                  <step.icon className="size-5" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--charcoal)]">
                    {step.title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[rgba(117,123,116,0.92)]">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </section>
        </div>

        <section className="route-section mt-8 space-y-4 pb-4">
          {isSignedIn ? (
            <Link
              href="/archive"
              className="primary-cta h-16 w-full px-6 text-lg font-semibold"
            >
              Open your archive
              <ArrowRight className="size-5" />
            </Link>
          ) : (
            <>
              <Link
                href="/sign-up"
                className="primary-cta h-16 w-full px-6 text-lg font-semibold"
              >
                Create your sanctuary
                <ArrowRight className="size-5" />
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/sign-in"
                  className="secondary-cta h-14 w-full px-4 text-sm font-semibold"
                >
                  Log in
                </Link>
                <Link
                  href="/archive"
                  className="secondary-cta h-14 w-full px-4 text-sm font-semibold"
                >
                  Continue demo
                </Link>
              </div>
            </>
          )}

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold tracking-[0.16em] text-[rgba(117,123,116,0.84)] uppercase">
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/settings">Safety and support</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
