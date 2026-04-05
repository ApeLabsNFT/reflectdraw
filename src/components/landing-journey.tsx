"use client";

import Link from "next/link";
import {
  ArrowRight,
  Camera,
  ShieldCheck,
  Sparkles,
  Volume2,
  VolumeX,
  Wind,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BrandMark } from "@/components/brand-mark";
import { useAuthSession } from "@/lib/use-auth-session";

const sidePillars = [
  "Private drawing archive",
  "Breath-led regulation",
  "Sleep-supportive rituals",
  "Scoped reflective AI",
];

const journeySteps = [
  {
    title: "Draw or upload",
    body: "Capture a drawing, a page, or a quiet photo from your phone.",
    icon: Camera,
  },
  {
    title: "Regulate first",
    body: "Let breath, pacing, and lower stimulation lead the ritual.",
    icon: Wind,
  },
  {
    title: "Receive reflection",
    body: "Get emotionally intelligent feedback that stays non-diagnostic.",
    icon: ShieldCheck,
  },
];

const deviceNotes = [
  "Web: spacious archive, comparison, guides, and settings",
  "Mobile: capture-first ritual, camera, haptics, and share",
];

const ritualLayers = [
  {
    label: "Arrival",
    title: "Landing that slows people down before they tap through.",
    body: "The front door feels more like a ritual space than a generic SaaS screen, so the journey starts with tone and pacing instead of instant friction.",
  },
  {
    label: "Identity",
    title: "Auth that closes the loop and hands off cleanly.",
    body: "Sign in or create an account inside ReflectDraw, then move directly into onboarding and onward to the archive without losing context.",
  },
  {
    label: "Continuity",
    title: "A responsive experience with different strengths by device.",
    body: "Desktop leans into archive, compare, and guides. Mobile leans into capture, haptics, camera, and quick regulation moments.",
  },
];

const experienceSurfaces = [
  {
    title: "Desktop sanctuary",
    eyebrow: "Wide-format reflection",
    body: "A calmer editorial archive, richer compare views, and more breathing room for longer reads and guide exploration.",
    className: "artwork-mist",
  },
  {
    title: "Mobile ritual",
    eyebrow: "Thumb-first capture",
    body: "Faster camera access, quieter night-mode pacing, and tactile ritual cues for breath and capture flows on the phone.",
    className: "artwork-water",
  },
];

export function LandingJourney() {
  const router = useRouter();
  const { isConfigured, isSignedIn, isLoading } = useAuthSession();
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    if (!isLoading && isSignedIn) {
      router.replace("/welcome");
    }
  }, [isLoading, isSignedIn, router]);

  return (
    <main className="landing-shell overflow-hidden px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-[1460px] flex-col">
        <header className="route-section flex items-center justify-between gap-3">
          <div className="glass-soft-dark inline-flex items-center rounded-full px-4 py-3">
            <BrandMark href="/" />
          </div>

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

        <section className="mt-4 grid flex-1 gap-5 lg:grid-cols-[1.02fr_0.98fr] lg:items-stretch">
          <div className="route-section glass-dark flex min-h-[560px] flex-col justify-between overflow-hidden rounded-[2.5rem] px-5 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
            <div className="grid gap-6 xl:grid-cols-[1fr_240px] xl:items-start">
              <div className="space-y-5">
                <div className="glass-soft-dark inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-[0.68rem] font-semibold tracking-[0.16em] text-white uppercase">
                  <Sparkles className="size-3.5" />
                  Somatic reflection and regulation
                </div>

                <div className="space-y-4">
                  <h1 className="display-heading max-w-[11ch] text-balance text-[clamp(3.4rem,8vw,7rem)] leading-[0.9] text-white">
                    Personalized
                    <br />
                    reflective
                    <br />
                    wellness.
                  </h1>
                  <p className="max-w-[34rem] text-base leading-8 text-[rgba(245,245,238,0.82)] sm:text-lg">
                    ReflectDraw is our slower, more soulful version of a wellness
                    front door: draw, breathe, notice patterns over time, and let
                    the app guide you from landing to auth to onboarding without
                    breaking the ritual.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={isSignedIn ? "/welcome" : "/auth"}
                    className="hero-cta h-16 px-7 text-sm font-semibold tracking-[0.14em] uppercase sm:text-base"
                  >
                    <span className="hero-pulse" />
                    {isSignedIn ? "Continue journey" : "Start experience"}
                    <ArrowRight className="size-5" />
                  </Link>
                  <Link
                    href="/archive"
                    className="glass-soft-dark inline-flex h-16 items-center rounded-full px-7 text-sm font-semibold tracking-[0.14em] text-white uppercase"
                  >
                    Preview archive
                  </Link>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {deviceNotes.map((note) => (
                    <div key={note} className="glass-soft-dark rounded-[1.7rem] p-4">
                      <p className="text-sm leading-7 text-[rgba(245,245,238,0.8)]">{note}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden space-y-3 xl:block">
                {sidePillars.map((pillar, index) => (
                  <div
                    key={pillar}
                    className="glass-soft-dark rounded-[1.7rem] p-4"
                  >
                    <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-[rgba(245,245,238,0.62)] uppercase">
                      0{index + 1}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/84">{pillar}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {journeySteps.map((step) => (
                  <div key={step.title} className="glass-soft-dark rounded-[1.8rem] p-4">
                    <div className="secondary-cta size-11">
                      <step.icon className="size-5" />
                    </div>
                    <p className="mt-4 font-semibold text-white">{step.title}</p>
                    <p className="mt-2 text-sm leading-7 text-[rgba(245,245,238,0.76)]">
                      {step.body}
                    </p>
                  </div>
                ))}
              </div>

              <div className="orb-stage relative min-h-[320px] p-4 sm:min-h-[380px] sm:p-5">
                <div className="absolute inset-x-0 top-6 mx-auto h-[72%] w-[72%] rounded-full border border-white/10" />

                <div className="phone-shell absolute left-1/2 top-1/2 w-[min(84%,340px)] -translate-x-1/2 -translate-y-1/2 rounded-[2.6rem] p-4">
                  <div className="space-y-3 rounded-[2rem] bg-[linear-gradient(180deg,rgba(250,249,246,0.98),rgba(241,242,236,0.94))] p-4 text-[var(--charcoal)]">
                    <div className="flex items-center justify-between">
                      <p className="eyebrow">Tonight&apos;s ritual</p>
                      <span className="ghost-chip px-3 py-1.5 text-[0.64rem] font-semibold tracking-[0.14em] uppercase">
                        Quiet mode
                      </span>
                    </div>
                    <div className="rounded-[1.8rem] bg-[linear-gradient(160deg,#2f3931,#8e9f88)] p-4 text-white shadow-[0_24px_48px_-36px_rgba(27,34,29,0.8)]">
                      <p className="font-serif text-[2rem] leading-[0.96]">
                        Wind-down
                        <br />
                        Reflection
                      </p>
                      <p className="mt-2 text-sm leading-7 text-white/82">
                        Draw first, then exhale longer than you inhale.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="surface-panel-soft rounded-[1.6rem] p-3">
                        <p className="eyebrow">Breath</p>
                        <p className="mt-2 font-semibold text-[var(--charcoal)]">4 in / 6 out</p>
                      </div>
                      <div className="surface-panel-soft rounded-[1.6rem] p-3">
                        <p className="eyebrow">Archive</p>
                        <p className="mt-2 font-semibold text-[var(--charcoal)]">Private by default</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-soft-dark absolute left-4 top-5 max-w-[180px] rounded-[1.6rem] p-4 text-white sm:left-6 sm:top-7">
                  <p className="eyebrow text-[rgba(245,245,238,0.62)]">Web + mobile</p>
                  <p className="mt-3 text-sm leading-7 text-white/82">
                    One experience, with different pacing on large and small screens.
                  </p>
                </div>

                <div className="glass-soft-dark absolute bottom-4 right-4 max-w-[180px] rounded-[1.6rem] p-4 text-white sm:bottom-6 sm:right-6">
                  <p className="eyebrow text-[rgba(245,245,238,0.62)]">Guardrails</p>
                  <p className="mt-3 text-sm leading-7 text-white/82">
                    Reflective support only. No diagnosis claims, no passive surveillance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="route-section grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <div className="glass-dark rounded-[2.4rem] p-5 sm:p-6">
              <p className="eyebrow text-[rgba(245,245,238,0.64)]">How the journey works</p>
              <div className="mt-5 space-y-4">
                {[
                  "1. User clicks the link and lands on the editorial landing page.",
                  "2. Auth begins inside ReflectDraw, not inside Vercel.",
                  "3. After login or signup, the app moves directly into onboarding.",
                  "4. After onboarding, the archive, capture ritual, and compare flows open up.",
                ].map((item) => (
                  <div key={item} className="glass-soft-dark rounded-[1.7rem] p-4">
                    <p className="text-sm leading-7 text-[rgba(245,245,238,0.82)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-dark rounded-[2.4rem] p-5 sm:p-6">
              <p className="eyebrow text-[rgba(245,245,238,0.64)]">Current stack posture</p>
              <div className="mt-5 grid gap-3">
                {[
                  isConfigured
                    ? "Supabase auth is connected and ready to own user state."
                    : "Supabase public auth still needs to be present on the client.",
                  "Gemma 3 powers scoped reflective output server-side.",
                  "Archive preview remains open for guests, but saved continuity belongs to authenticated users.",
                ].map((item) => (
                  <div key={item} className="glass-soft-dark rounded-[1.7rem] p-4">
                    <p className="text-sm leading-7 text-[rgba(245,245,238,0.8)]">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/auth?mode=sign-up"
                  className="glass-soft-dark inline-flex h-13 items-center rounded-full px-5 text-sm font-semibold text-white"
                >
                  Create account
                </Link>
                <Link
                  href="/terms"
                  className="glass-soft-dark inline-flex h-13 items-center rounded-full px-5 text-sm font-semibold text-white"
                >
                  Terms
                </Link>
                <Link
                  href="/privacy"
                  className="glass-soft-dark inline-flex h-13 items-center rounded-full px-5 text-sm font-semibold text-white"
                >
                  Privacy
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="route-section glass-dark rounded-[2.5rem] p-5 sm:p-6 lg:p-8">
            <div className="max-w-[36rem] space-y-4">
              <p className="eyebrow text-[rgba(245,245,238,0.62)]">Why this landing works</p>
              <h2 className="display-heading max-w-[13ch] text-[clamp(2.4rem,4vw,4.25rem)] leading-[0.95] text-white">
                The front door now matches the product&rsquo;s emotional logic.
              </h2>
              <p className="text-base leading-8 text-[rgba(245,245,238,0.8)]">
                Instead of a detached signup page, the landing explains the rhythm:
                arrive, authenticate, onboard, then move into the archive and ritual
                tools with continuity.
              </p>
            </div>

            <div className="mt-6 grid gap-3">
              {ritualLayers.map((layer) => (
                <div key={layer.title} className="glass-soft-dark rounded-[2rem] p-4 sm:p-5">
                  <p className="eyebrow text-[rgba(245,245,238,0.56)]">{layer.label}</p>
                  <p className="mt-3 font-serif text-[1.7rem] leading-[1.02] text-white">
                    {layer.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[rgba(245,245,238,0.78)]">
                    {layer.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="route-section grid gap-5 md:grid-cols-2">
            {experienceSurfaces.map((surface) => (
              <div key={surface.title} className="glass-dark rounded-[2.5rem] p-4 sm:p-5">
                <div className={`paper-image ${surface.className} aspect-[0.9] rounded-[2.2rem] p-4`}>
                  <div className="flex h-full flex-col justify-between">
                    <div className="glass-soft-dark inline-flex w-fit rounded-full px-3 py-2">
                      <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-white uppercase">
                        {surface.eyebrow}
                      </p>
                    </div>
                    <div className="glass-soft-dark rounded-[1.8rem] p-4 text-white">
                      <p className="font-serif text-[1.9rem] leading-[1]">{surface.title}</p>
                      <p className="mt-3 text-sm leading-7 text-white/82">{surface.body}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="route-section mt-5 pb-3">
          <div className="glass-dark rounded-[2.8rem] px-5 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="space-y-4">
                <p className="eyebrow text-[rgba(245,245,238,0.62)]">Next step</p>
                <h2 className="display-heading max-w-[12ch] text-[clamp(2.5rem,4.4vw,4.7rem)] leading-[0.95] text-white">
                  Click in, then let the app carry the rest of the route.
                </h2>
                <p className="max-w-[38rem] text-base leading-8 text-[rgba(245,245,238,0.8)]">
                  New users begin with account creation and onboarding. Returning
                  users move straight back into their sanctuary, compare history,
                  and capture ritual with less friction on every visit.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={isSignedIn ? "/welcome" : "/auth?mode=sign-up"}
                  className="hero-cta h-15 px-6 text-sm font-semibold tracking-[0.14em] uppercase"
                >
                  <span className="hero-pulse" />
                  {isSignedIn ? "Continue journey" : "Create account"}
                  <ArrowRight className="size-5" />
                </Link>
                <Link
                  href="/auth?mode=sign-in"
                  className="glass-soft-dark inline-flex h-15 items-center rounded-full px-6 text-sm font-semibold tracking-[0.14em] text-white uppercase"
                >
                  Sign in instead
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
