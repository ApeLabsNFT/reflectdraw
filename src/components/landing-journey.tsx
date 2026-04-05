"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BrandMark } from "@/components/brand-mark";
import { useAuthSession } from "@/lib/use-auth-session";

const pillars = [
  {
    title: "Reflect",
    body: "Draw, upload, or begin with a quieter prompt instead of a generic journal field.",
  },
  {
    title: "Regulate",
    body: "Use breath pacing, arrival rituals, and low-stimulation flows before interpretation.",
  },
  {
    title: "Return",
    body: "Notice changes over time across your archive, sleep rituals, and reflective prompts.",
  },
];

const featureNotes = [
  "Private-by-default archive",
  "Breath and sleep support",
  "Reflective AI inside strict guardrails",
  "Designed for both desktop and mobile",
];

export function LandingJourney() {
  const router = useRouter();
  const { isSignedIn, isLoading } = useAuthSession();
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    if (!isLoading && isSignedIn) {
      router.replace("/welcome");
    }
  }, [isLoading, isSignedIn, router]);

  return (
    <main className="landing-shell overflow-hidden px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-[1480px] flex-col">
        <header className="route-section flex items-center justify-between gap-3">
          <BrandMark href="/" tone="light" />

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSoundOn((current) => !current)}
              className="glass-soft-dark inline-flex h-12 items-center gap-2 rounded-full px-4 text-xs font-semibold tracking-[0.14em] text-white uppercase"
            >
              {soundOn ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
              {soundOn ? "Atmosphere on" : "Atmosphere off"}
            </button>
            <Link
              href="/auth?mode=sign-in"
              className="glass-soft-dark inline-flex h-12 items-center rounded-full px-5 text-xs font-semibold tracking-[0.14em] text-white uppercase"
            >
              Log in
            </Link>
          </div>
        </header>

        <section className="route-section mt-4 flex-1">
          <div className="glass-dark grid min-h-[calc(100vh-10rem)] gap-6 rounded-[2.75rem] px-5 py-5 sm:px-6 sm:py-6 lg:grid-cols-[1.05fr_0.78fr_0.62fr] lg:px-8 lg:py-8">
            <div className="flex flex-col justify-between gap-6">
              <div className="space-y-6">
                <div className="glass-soft-dark inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-[0.68rem] font-semibold tracking-[0.16em] text-white uppercase">
                  <Sparkles className="size-3.5" />
                  Somatic reflection and regulation
                </div>

                <div className="space-y-5">
                  <h1 className="display-heading max-w-[9ch] text-balance text-[clamp(3.8rem,8vw,7.6rem)] leading-[0.88] text-white">
                    Draw.
                    <br />
                    Breathe.
                    <br />
                    Notice.
                  </h1>
                  <p className="max-w-[34rem] text-base leading-8 text-[rgba(245,245,238,0.8)] sm:text-lg">
                    ReflectDraw is a reflective wellness experience for grounding,
                    breath-led ritual, sleep-supportive pacing, and image-based
                    journaling. The journey starts here, then continues into auth,
                    onboarding, and your private archive without breaking tone.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={isSignedIn ? "/welcome" : "/auth?mode=sign-up"}
                  className="hero-cta h-16 px-7 text-sm font-semibold tracking-[0.14em] uppercase sm:text-base"
                >
                  <span className="hero-pulse" />
                  {isSignedIn ? "Continue journey" : "Start your journey"}
                  <ArrowRight className="size-5" />
                </Link>
                <Link
                  href="/archive"
                  className="glass-soft-dark inline-flex h-16 items-center rounded-full px-7 text-sm font-semibold tracking-[0.14em] text-white uppercase"
                >
                  Preview archive
                </Link>
              </div>
            </div>

            <div className="orb-stage relative min-h-[420px] rounded-[2.4rem] p-4 sm:min-h-[520px] sm:p-5">
              <div className="glass-soft-dark absolute left-4 top-4 max-w-[180px] rounded-[1.5rem] p-4 text-white sm:left-6 sm:top-6">
                <p className="eyebrow text-[rgba(245,245,238,0.6)]">Designed for</p>
                <p className="mt-3 text-sm leading-7 text-white/84">
                  Web for reflection depth, mobile for camera-first ritual.
                </p>
              </div>

              <div className="phone-shell absolute left-1/2 top-1/2 w-[min(82%,360px)] -translate-x-1/2 -translate-y-1/2 rounded-[2.8rem] p-4">
                <div className="space-y-4 rounded-[2.1rem] bg-[linear-gradient(180deg,rgba(255,252,247,0.99),rgba(242,238,229,0.96))] p-4 text-[var(--charcoal)]">
                  <div className="flex items-center justify-between">
                    <p className="eyebrow">Tonight&apos;s ritual</p>
                    <span className="ghost-chip px-3 py-1.5 text-[0.64rem] font-semibold tracking-[0.14em] uppercase">
                      Quiet mode
                    </span>
                  </div>

                  <div className="rounded-[1.9rem] bg-[linear-gradient(155deg,#18231f,#314238,#7f937e)] p-5 text-white shadow-[0_24px_48px_-32px_rgba(12,18,16,0.72)]">
                    <p className="font-serif text-[2.25rem] leading-[0.92]">
                      Wind-down
                      <br />
                      reflection
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/82">
                      Exhale longer than you inhale. Draw first. Read gently.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="surface-panel-soft rounded-[1.5rem] p-3">
                      <p className="eyebrow">Breath</p>
                      <p className="mt-2 font-semibold text-[var(--charcoal)]">4 in / 6 out</p>
                    </div>
                    <div className="surface-panel-soft rounded-[1.5rem] p-3">
                      <p className="eyebrow">Archive</p>
                      <p className="mt-2 font-semibold text-[var(--charcoal)]">Private by default</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-soft-dark absolute bottom-4 right-4 max-w-[180px] rounded-[1.5rem] p-4 text-white sm:bottom-6 sm:right-6">
                <p className="eyebrow text-[rgba(245,245,238,0.6)]">Guardrails</p>
                <p className="mt-3 text-sm leading-7 text-white/84">
                  Reflective support only. No diagnosis claims, no passive surveillance.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-4">
              <div className="space-y-3">
                {featureNotes.map((note, index) => (
                  <div key={note} className="glass-soft-dark rounded-[1.5rem] p-4">
                    <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-[rgba(245,245,238,0.58)] uppercase">
                      0{index + 1}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/84">{note}</p>
                  </div>
                ))}
              </div>

              <div className="glass-soft-dark rounded-[1.8rem] p-4">
                <p className="eyebrow text-[rgba(245,245,238,0.6)]">Flow</p>
                <p className="mt-3 font-serif text-[1.8rem] leading-[0.98] text-white">
                  Landing.
                  <br />
                  Auth.
                  <br />
                  Onboarding.
                  <br />
                  Archive.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="route-section mt-5 grid gap-4 pb-3 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="glass-soft-dark rounded-[1.8rem] p-5 text-white">
              <p className="eyebrow text-[rgba(245,245,238,0.58)]">{pillar.title}</p>
              <p className="mt-3 font-serif text-[1.9rem] leading-[0.98] text-white">
                {pillar.title}
              </p>
              <p className="mt-3 text-sm leading-7 text-white/82">{pillar.body}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
