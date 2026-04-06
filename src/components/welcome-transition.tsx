"use client";

import { ArrowRight, Wind } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BrandMark } from "@/components/brand-mark";
import { useAuthSession } from "@/lib/use-auth-session";

export function WelcomeTransition() {
  const router = useRouter();
  const { isLoading, isSignedIn, isOnboarded, displayName } = useAuthSession();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isSignedIn) {
      router.replace("/auth");
      return;
    }

    router.replace(isOnboarded ? "/archive" : "/onboarding");
  }, [displayName, isLoading, isOnboarded, isSignedIn, router]);

  return (
    <main className="landing-shell min-h-screen overflow-hidden px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-[920px] flex-col">
        <header className="route-section flex items-center justify-between gap-3">
          <div className="glass-soft-dark inline-flex items-center rounded-full px-4 py-3">
            <BrandMark href="/" tone="light" />
          </div>
          <div className="glass-soft-dark inline-flex h-12 items-center rounded-full px-5 text-xs font-semibold tracking-[0.14em] text-white uppercase">
            Routing your journey
          </div>
        </header>

        <section className="route-section mt-4 flex flex-1 items-center">
          <div className="glass-dark grid w-full gap-5 rounded-[2.8rem] p-5 sm:p-6 lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
            <div className="space-y-4">
              <div className="glass-soft-dark inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-[0.68rem] font-semibold tracking-[0.16em] text-white uppercase">
                <Wind className="size-3.5" />
                Opening the sanctuary
              </div>
              <h1 className="display-heading max-w-[11ch] text-[clamp(2.8rem,5.2vw,5rem)] leading-[0.92] text-white">
                {isLoading
                  ? "Settling your session."
                  : isSignedIn && !isOnboarded
                    ? `Welcome, ${displayName}. Onboarding is next.`
                    : "Welcome back. Returning you to the archive."}
              </h1>
              <p className="max-w-[32rem] text-base leading-8 text-[rgba(245,245,238,0.8)]">
                ReflectDraw now closes the loop after auth. New users continue
                into onboarding, and returning users land back inside their
                sanctuary without detours.
              </p>
            </div>

            <div className="orb-stage relative min-h-[320px] rounded-[2.4rem] p-4 sm:min-h-[360px] sm:p-5">
              <div className="phone-shell absolute left-1/2 top-1/2 w-[min(82%,330px)] -translate-x-1/2 -translate-y-1/2 rounded-[2.6rem] p-4">
                <div className="space-y-4 rounded-[2rem] bg-[linear-gradient(180deg,rgba(250,249,246,0.98),rgba(241,242,236,0.94))] p-4 text-[var(--charcoal)]">
                  <div className="flex items-center justify-between">
                    <p className="eyebrow">Session handoff</p>
                    <ArrowRight className="size-4 text-[var(--sage)]" />
                  </div>
                  <div className="surface-panel-soft rounded-[1.8rem] p-4">
                    <p className="font-serif text-[1.8rem] leading-[0.98] text-[var(--charcoal)]">
                      {isLoading
                        ? "Checking session"
                        : isSignedIn && !isOnboarded
                          ? "Preparing onboarding"
                          : "Opening archive"}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[rgba(117,123,116,0.92)]">
                      This should only take a moment.
                    </p>
                  </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="surface-panel-soft rounded-[1.6rem] p-3">
                      <p className="eyebrow">First feeling</p>
                      <p className="mt-2 font-semibold text-[var(--charcoal)]">A little more settled</p>
                    </div>
                    <div className="surface-panel-soft rounded-[1.6rem] p-3">
                      <p className="eyebrow">Next stop</p>
                      <p className="mt-2 font-semibold text-[var(--charcoal)]">
                        {isSignedIn && !isOnboarded ? "Onboarding" : "Archive"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
