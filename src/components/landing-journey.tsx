"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BrandMark } from "@/components/brand-mark";
import { useAuthSession } from "@/lib/use-auth-session";

const principles = [
  "For anxious, buzzy, or overstimulated days",
  "For attention that keeps drifting or skipping away",
  "For nights when your body is tired but your mind is still loud",
];

const storyBlocks = [
  {
    title: "We wanted a softer beginning for hard days.",
    body: "When your chest feels tight, your thoughts keep looping, or your attention will not stay in one place, the last thing you need is a loud interface. ReflectDraw begins more slowly on purpose.",
  },
  {
    title: "We built around rhythm, not performance.",
    body: "Drawing, breath pacing, and reflective language work best when they create a small sense of return. The app is here to help you settle, notice, and continue, not to judge or diagnose you.",
  },
];

export function LandingJourney() {
  const router = useRouter();
  const { isSignedIn, isLoading } = useAuthSession();

  useEffect(() => {
    if (!isLoading && isSignedIn) {
      router.replace("/welcome");
    }
  }, [isLoading, isSignedIn, router]);

  return (
    <main className="story-shell overflow-hidden px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-[1420px] flex-col">
        <header className="route-section flex items-center justify-between gap-4 py-2">
          <BrandMark href="/" />

          <nav className="hidden items-center gap-6 lg:flex">
            <Link href="/archive" className="text-sm font-medium text-[rgba(105,113,107,0.9)]">
              archive
            </Link>
            <Link href="/terms" className="text-sm font-medium text-[rgba(105,113,107,0.9)]">
              terms
            </Link>
            <Link href="/privacy" className="text-sm font-medium text-[rgba(105,113,107,0.9)]">
              privacy
            </Link>
          </nav>

          <Link
            href="/auth?mode=sign-in"
            className="secondary-cta h-12 rounded-full px-5 text-xs font-semibold tracking-[0.14em] uppercase"
          >
            Log in
          </Link>
        </header>

        <section className="route-section grid flex-1 gap-8 pt-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:pt-14">
          <div className="space-y-7">
            <p className="story-kicker">our story</p>
            <div className="space-y-5">
              <h1 className="serif-heading max-w-[10ch] text-balance text-[clamp(3.5rem,7vw,6.8rem)] leading-[0.88] text-[var(--charcoal)]">
                For the days your mind will not settle.
              </h1>
              <p className="max-w-[41rem] text-[1rem] leading-8 text-[rgba(105,113,107,0.94)] sm:text-[1.06rem]">
                ReflectDraw is for anxious mornings, scattered attention,
                overstimulated afternoons, and nights when sleep feels far away.
                It brings together drawing, breath-led regulation, and gentle
                reflection so you have somewhere softer to begin.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={isSignedIn ? "/welcome" : "/auth?mode=sign-up"}
                className="primary-cta h-14 px-6 text-sm font-semibold tracking-[0.14em] uppercase"
              >
                {isSignedIn ? "Continue journey" : "Begin the journey"}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/archive"
                className="secondary-cta h-14 rounded-full px-6 text-sm font-semibold tracking-[0.14em] uppercase"
              >
                Preview archive
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {principles.map((item) => (
                <div key={item} className="story-panel p-4">
                  <p className="text-sm leading-7 text-[rgba(105,113,107,0.94)]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="route-section">
            <div className="story-figure relative min-h-[420px] p-6 sm:min-h-[560px]">
              <div className="story-panel absolute left-5 top-5 max-w-[220px] p-4 sm:left-8 sm:top-8">
                <p className="story-kicker">night ritual</p>
                <p className="mt-3 font-serif text-[2rem] leading-[0.96] text-[var(--charcoal)]">
                  When thoughts race,
                  <br />
                  begin with the body.
                </p>
              </div>

              <div className="story-panel absolute bottom-5 right-5 max-w-[230px] p-4 sm:bottom-8 sm:right-8">
                <p className="story-kicker">what this is for</p>
                <p className="mt-3 text-sm leading-7 text-[rgba(105,113,107,0.94)]">
                  Settling anxious activation, easing back into focus, and creating a calmer bedtime ritual through drawing and reflection.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="route-section pt-8">
          <div className="story-divider" />
        </div>

        <section className="route-section grid gap-6 py-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-14">
          <div className="space-y-3">
            <p className="story-kicker">why we made it</p>
            <h2 className="serif-heading max-w-[12ch] text-balance text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.92] text-[var(--charcoal)]">
              Support should feel like a place to land.
            </h2>
          </div>

          <div className="grid gap-4">
            {storyBlocks.map((block) => (
              <div key={block.title} className="story-frame p-5 sm:p-6">
                <p className="font-serif text-[2rem] leading-[0.98] text-[var(--charcoal)]">
                  {block.title}
                </p>
                <p className="mt-4 max-w-[42rem] text-[1rem] leading-8 text-[rgba(105,113,107,0.94)]">
                  {block.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="route-section grid gap-6 pb-6 lg:grid-cols-[1.04fr_0.96fr] lg:items-start lg:pb-10">
          <div className="story-frame p-6 sm:p-7">
            <p className="story-kicker">what happens next</p>
            <p className="mt-4 font-serif text-[clamp(2.3rem,4vw,4rem)] leading-[0.94] text-[var(--charcoal)]">
              Click the link.
              <br />
              Land here.
              <br />
              Sign in.
              <br />
              Begin onboarding.
              <br />
              Continue into your sanctuary.
            </p>
          </div>

          <div className="story-panel p-6 sm:p-7">
            <p className="story-kicker">begin</p>
            <p className="mt-4 font-serif text-[2.3rem] leading-[0.96] text-[var(--charcoal)]">
              Start with something that understands the day you are having.
            </p>
            <p className="mt-4 text-[1rem] leading-8 text-[rgba(105,113,107,0.94)]">
              New users move into email signup and onboarding. Returning users
              come back to breath, archive, capture, and compare without needing
              to explain themselves all over again.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={isSignedIn ? "/welcome" : "/auth?mode=sign-up"}
                className="primary-cta h-14 px-6 text-sm font-semibold tracking-[0.14em] uppercase"
              >
                {isSignedIn ? "Continue journey" : "Create account"}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/auth?mode=sign-in"
                className="secondary-cta h-14 rounded-full px-6 text-sm font-semibold tracking-[0.14em] uppercase"
              >
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
