"use client";

import { Wind } from "lucide-react";
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
    <main className="app-canvas min-h-screen px-6 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[430px] flex-col justify-between">
        <div className="route-section space-y-6">
          <BrandMark />
          <section className="paper-image artwork-forest flex aspect-[0.96] flex-col justify-between rounded-[2.9rem] p-6 text-white">
            <div className="surface-panel inline-flex w-fit items-center gap-2 rounded-full px-3 py-2 text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-[var(--sage)]">
              <Wind className="size-3.5" />
              Opening the sanctuary
            </div>
            <div className="space-y-4 rounded-[2rem] bg-[rgba(255,255,255,0.12)] p-5 backdrop-blur-md">
              <p className="eyebrow text-white/74">Next step</p>
              <h1 className="display-heading text-white">
                {isLoading
                  ? "Settling your session."
                  : isSignedIn && !isOnboarded
                    ? `Welcome, ${displayName}. Let's start onboarding.`
                    : "Welcome back. Taking you to the archive."}
              </h1>
              <p className="text-sm leading-7 text-white/82">
                ReflectDraw now routes every signed-in session intentionally,
                so you land in the right place instead of guessing what comes next.
              </p>
            </div>
          </section>
        </div>

        <div className="route-section pb-4 text-center text-xs font-semibold tracking-[0.16em] text-[rgba(117,123,116,0.82)] uppercase">
          This should only take a moment
        </div>
      </div>
    </main>
  );
}
