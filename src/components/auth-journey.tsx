"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck, Sparkles, Wind } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BrandMark } from "@/components/brand-mark";
import { EmailAuthForm } from "@/components/email-auth-form";
import { useAuthSession } from "@/lib/use-auth-session";

const promises = [
  "A quieter place to return when everything feels loud",
  "Email entry that moves straight into your sanctuary setup",
  "Built for overwhelm, scattered attention, and bedtime overthinking",
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
    <main className="story-shell overflow-hidden px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-[1480px] flex-col">
        <header className="route-section flex items-center justify-between gap-3">
          <BrandMark href="/" />

          <Link
            href="/"
            className="secondary-cta inline-flex h-12 items-center gap-2 rounded-full px-4 text-xs font-semibold tracking-[0.14em] uppercase"
          >
            <ArrowLeft className="size-4" />
            Back
          </Link>
        </header>

        <section className="mt-4 grid flex-1 gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="route-section story-frame flex flex-col justify-between rounded-[2.6rem] p-5 sm:p-6 lg:p-8">
            <div className="space-y-6">
              <div className="story-panel inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-[0.68rem] font-semibold tracking-[0.16em] uppercase">
                <Wind className="size-3.5 text-[var(--sage)]" />
                The handoff
              </div>

              <div className="space-y-4">
                <h1 className="display-heading max-w-[9ch] text-balance text-[clamp(3.2rem,6vw,6rem)] leading-[0.9] text-[var(--charcoal)]">
                  Step in once.
                  <br />
                  Keep moving.
                </h1>
                <p className="max-w-[34rem] text-base leading-8 text-[rgba(105,113,107,0.94)]">
                  This is the point where you step out of the noise and into your
                  own space. New users move directly into onboarding, and returning
                  users continue straight back to the rhythms they already know.
                </p>
              </div>

              <div className="grid gap-3">
                {promises.map((promise) => (
                  <div key={promise} className="story-panel rounded-[1.6rem] p-4">
                    <p className="text-sm leading-7 text-[rgba(105,113,107,0.94)]">{promise}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="story-panel rounded-[1.8rem] p-4">
                <div className="secondary-cta inline-flex size-10 items-center justify-center rounded-full">
                  <ShieldCheck className="size-4" />
                </div>
                <p className="mt-4 font-semibold text-[var(--charcoal)]">Inside the app</p>
                <p className="mt-2 text-sm leading-7 text-[rgba(105,113,107,0.9)]">
                  No extra detour. No jarring restart. Just a clean handoff into your next step.
                </p>
              </div>
              <div className="story-panel rounded-[1.8rem] p-4">
                <div className="secondary-cta inline-flex size-10 items-center justify-center rounded-full">
                  <Sparkles className="size-4" />
                </div>
                <p className="mt-4 font-semibold text-[var(--charcoal)]">Responsive by default</p>
                <p className="mt-2 text-sm leading-7 text-[rgba(105,113,107,0.9)]">
                  Spacious on desktop, simple on mobile, and calmer on both.
                </p>
              </div>
            </div>
          </div>

          <div className="route-section flex flex-col gap-4">
            <div className="story-panel grid grid-cols-2 gap-2 rounded-[1.75rem] p-2">
              <Link
                href="/auth?mode=sign-up"
                data-active={mode === "sign-up"}
                className="ghost-chip flex h-12 items-center justify-center px-4 text-sm font-semibold data-[active=true]:bg-white data-[active=true]:text-[var(--sage)]"
              >
                Create account
              </Link>
              <Link
                href="/auth?mode=sign-in"
                data-active={mode === "sign-in"}
                className="ghost-chip flex h-12 items-center justify-center px-4 text-sm font-semibold data-[active=true]:bg-white data-[active=true]:text-[var(--sage)]"
              >
                Sign in
              </Link>
            </div>

            <EmailAuthForm mode={mode} serverError={error} />
          </div>
        </section>
      </div>
    </main>
  );
}
