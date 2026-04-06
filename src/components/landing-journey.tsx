"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  MoonStar,
  NotebookPen,
  ShieldCheck,
  Sparkles,
  Wind,
} from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BrandMark } from "@/components/brand-mark";
import { useAuthSession } from "@/lib/use-auth-session";

const headerLinks = [
  { href: "#story", label: "Our story" },
  { href: "#support", label: "Who it helps" },
  { href: "#journey", label: "The journey" },
];

const supportStates = [
  {
    title: "For anxious activation",
    body: "When your chest feels tight, your thoughts speed up, or the whole day starts too loud, ReflectDraw gives you a slower first step.",
    icon: Wind,
  },
  {
    title: "For scattered attention",
    body: "When focus keeps drifting, tabbing away, or breaking apart, the app helps you come back through the body before asking for clarity.",
    icon: Sparkles,
  },
  {
    title: "For nighttime overthinking",
    body: "When your body is tired but your mind is still cycling, the ritual shifts into quiet mode, gentler pacing, and low-stimulation reflection.",
    icon: MoonStar,
  },
];

const journeyMoments = [
  {
    index: "01",
    title: "Arrive gently",
    body: "You land on a calmer screen, not a dashboard shouting for attention.",
  },
  {
    index: "02",
    title: "Capture what the moment feels like",
    body: "Draw, upload, or hold a reflection with a short intention before the analysis begins.",
  },
  {
    index: "03",
    title: "Receive language that helps you notice",
    body: "The AI stays inside the app's scope: reflective, grounded, and never diagnostic.",
  },
  {
    index: "04",
    title: "Return over time",
    body: "Archive, compare, breathe, and build a softer understanding of your own patterns.",
  },
];

const footerColumns = [
  {
    title: "Explore",
    items: [
      { href: "#story", label: "Our story" },
      { href: "#support", label: "Who it helps" },
      { href: "#journey", label: "The journey" },
      { href: "/archive", label: "Preview archive" },
    ],
  },
  {
    title: "Start",
    items: [
      { href: "/auth?mode=sign-up", label: "Create account" },
      { href: "/auth?mode=sign-in", label: "Sign in" },
    ],
  },
  {
    title: "Trust",
    items: [
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
      { href: "/settings", label: "Support settings" },
    ],
  },
];

function ScreenCard({
  src,
  alt,
  title,
  detail,
  className = "",
}: {
  src: string;
  alt: string;
  title: string;
  detail: string;
  className?: string;
}) {
  return (
    <figure className={`story-panel overflow-hidden p-4 sm:p-5 ${className}`}>
      <div className="relative overflow-hidden rounded-[2rem] bg-[rgba(246,239,230,0.92)] shadow-[0_32px_70px_-52px_rgba(23,29,27,0.34)]">
        <div className="relative mx-auto aspect-[0.48] w-full max-w-[340px]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </div>
      <figcaption className="space-y-2 px-1 pt-4">
        <p className="story-kicker">{title}</p>
        <p className="text-sm leading-7 text-[rgba(105,113,107,0.95)]">{detail}</p>
      </figcaption>
    </figure>
  );
}

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
      <div className="mx-auto flex min-h-screen max-w-[1480px] flex-col">
        <header className="route-section sticky top-4 z-20">
          <div className="story-frame flex items-center justify-between gap-4 rounded-full px-4 py-3 sm:px-5">
            <BrandMark href="/" />

            <nav className="hidden items-center gap-2 lg:flex">
              {headerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="secondary-cta h-11 rounded-full px-4 text-xs font-semibold tracking-[0.14em] uppercase"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/auth?mode=sign-in"
                className="secondary-cta h-11 rounded-full px-4 text-xs font-semibold tracking-[0.14em] uppercase"
              >
                Sign in
              </Link>
              <Link
                href={isSignedIn ? "/welcome" : "/auth?mode=sign-up"}
                className="primary-cta hidden h-11 px-5 text-xs font-semibold tracking-[0.14em] uppercase sm:inline-flex"
              >
                {isSignedIn ? "Continue" : "Begin"}
              </Link>
            </div>
          </div>
        </header>

        <section
          id="story"
          className="route-section scroll-mt-28 grid gap-8 px-1 pb-12 pt-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:gap-10 lg:pb-20 lg:pt-16"
        >
          <div className="space-y-8 lg:sticky lg:top-28">
            <p className="story-kicker">our story</p>
            <div className="space-y-5">
              <h1 className="serif-heading max-w-[10ch] text-balance text-[clamp(3.6rem,7vw,7rem)] leading-[0.88] text-[var(--charcoal)]">
                A softer place to begin when your inner world feels loud.
              </h1>
              <p className="max-w-[39rem] text-[1rem] leading-8 text-[rgba(105,113,107,0.96)] sm:text-[1.08rem]">
                ReflectDraw is a guided drawing and reflection space for anxious
                spirals, ADHD-like scattered attention, overstimulation, and
                evenings when rest feels far away. It is built to help you settle,
                notice, and continue with more gentleness.
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
                href="/auth?mode=sign-in"
                className="secondary-cta h-14 rounded-full px-6 text-sm font-semibold tracking-[0.14em] uppercase"
              >
                Sign in
              </Link>
            </div>

            <div className="story-frame max-w-[36rem] p-5 sm:p-6">
              <p className="story-kicker">what this is for</p>
              <p className="mt-4 font-serif text-[clamp(2rem,3.5vw,3.3rem)] leading-[0.96] text-[var(--charcoal)]">
                Not a diagnosis.
                <br />
                Not another performance tool.
                <br />
                A ritual for coming back to yourself.
              </p>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
            <ScreenCard
              src="/editorial/onboarding.png"
              alt="ReflectDraw onboarding screen preview"
              title="arrival"
              detail="The first touchpoint is warm, spacious, and human. It slows the tempo before anything else begins."
            />

            <div className="grid gap-5">
              <div className="story-frame flex flex-col justify-between gap-8 p-6 sm:p-7">
                <div className="space-y-3">
                  <p className="story-kicker">why it exists</p>
                  <p className="font-serif text-[clamp(2rem,3.4vw,3.4rem)] leading-[0.96] text-[var(--charcoal)]">
                    We wanted something calmer than tracking, scoring, and fixing.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="story-panel rounded-[1.8rem] p-4">
                    <div className="secondary-cta inline-flex size-10 items-center justify-center rounded-full">
                      <Wind className="size-4" />
                    </div>
                    <p className="mt-4 text-sm leading-7 text-[rgba(105,113,107,0.95)]">
                      Breath support before drawing, while waiting, or before sleep.
                    </p>
                  </div>
                  <div className="story-panel rounded-[1.8rem] p-4">
                    <div className="secondary-cta inline-flex size-10 items-center justify-center rounded-full">
                      <NotebookPen className="size-4" />
                    </div>
                    <p className="mt-4 text-sm leading-7 text-[rgba(105,113,107,0.95)]">
                      Reflection language that helps you notice patterns without shaming you.
                    </p>
                  </div>
                </div>
              </div>

              <ScreenCard
                src="/editorial/processing.png"
                alt="ReflectDraw processing state preview"
                title="transition"
                detail="Waiting becomes part of the ritual, with soft pacing instead of dead air."
              />
            </div>
          </div>
        </section>

        <section className="route-section px-1 pb-10 lg:pb-16">
          <div className="story-divider" />
        </section>

        <section className="route-section grid gap-6 px-1 pb-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-start lg:pb-20">
          <div className="story-frame p-6 sm:p-8">
            <p className="story-kicker">the approach</p>
            <h2 className="serif-heading mt-4 max-w-[12ch] text-balance text-[clamp(2.7rem,5vw,4.9rem)] leading-[0.92] text-[var(--charcoal)]">
              Support should feel like somewhere you can land.
            </h2>
            <p className="mt-6 max-w-[42rem] text-[1rem] leading-8 text-[rgba(105,113,107,0.96)]">
              That means fewer hard edges, fewer jolting decisions, and less of
              the language that makes people feel measured. ReflectDraw brings
              together guided capture, reflective AI, breath rituals, sleep-aware
              pacing, and a private archive so the experience feels more like a
              companioned practice than a tool demanding output.
            </p>
          </div>

          <div className="story-panel p-6 sm:p-8">
            <p className="story-kicker">a promise</p>
            <p className="mt-4 font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] text-[var(--charcoal)]">
              The app meets anxious, scattered, and exhausted moments with
              reflection, regulation, and privacy.
            </p>
            <p className="mt-5 text-[1rem] leading-8 text-[rgba(105,113,107,0.95)]">
              It does not diagnose, score, surveil, or turn distress into a
              number. It helps you pause, make meaning, and return to yourself.
            </p>
          </div>
        </section>

        <section
          id="support"
          className="route-section scroll-mt-28 grid gap-6 px-1 pb-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:pb-20"
        >
          <div className="grid gap-4">
            {supportStates.map((state) => {
              const Icon = state.icon;

              return (
                <article key={state.title} className="story-panel rounded-[2rem] p-5 sm:p-6">
                  <div className="secondary-cta inline-flex size-11 items-center justify-center rounded-full">
                    <Icon className="size-4" />
                  </div>
                  <h3 className="mt-5 font-serif text-[2rem] leading-[0.98] text-[var(--charcoal)]">
                    {state.title}
                  </h3>
                  <p className="mt-3 text-[1rem] leading-8 text-[rgba(105,113,107,0.95)]">
                    {state.body}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="grid gap-5">
            <ScreenCard
              src="/editorial/archive.png"
              alt="ReflectDraw archive preview"
              title="archive"
              detail="The archive is not a productivity log. It is a visual record of how your inner life changes over time."
            />
            <ScreenCard
              src="/editorial/analysis.png"
              alt="ReflectDraw insight screen preview"
              title="reflection"
              detail="Insights are written to help you notice patterns, not to label your mind or tell you who you are."
            />
          </div>
        </section>

        <section className="route-section px-1 pb-14 lg:pb-20">
          <div className="story-frame grid gap-6 overflow-hidden p-6 sm:p-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:p-10">
            <div className="space-y-4">
              <p className="story-kicker">a quieter interface</p>
              <p className="font-serif text-[clamp(2.2rem,4vw,4.5rem)] leading-[0.94] text-[var(--charcoal)]">
                Every part of the product is designed to calm, not crowd.
              </p>
              <p className="max-w-[38rem] text-[1rem] leading-8 text-[rgba(105,113,107,0.96)]">
                From the landing page to the archive, the rhythm stays soft:
                generous spacing, lower stimulation, grounded language, and a
                journey that keeps moving once you sign in instead of dropping you
                into technical detours.
              </p>
            </div>

            <div className="story-panel overflow-hidden p-4 sm:p-5">
              <div className="relative overflow-hidden rounded-[2rem] bg-[rgba(246,239,230,0.92)] shadow-[0_32px_70px_-52px_rgba(23,29,27,0.34)]">
                <div className="relative mx-auto aspect-[0.48] w-full max-w-[340px]">
                  <Image
                    src="/editorial/sanctuary.png"
                    alt="ReflectDraw sanctuary and profile screen preview"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="journey"
          className="route-section scroll-mt-28 grid gap-6 px-1 pb-14 lg:grid-cols-[0.94fr_1.06fr] lg:items-start lg:pb-20"
        >
          <div className="story-panel p-6 sm:p-8">
            <p className="story-kicker">the journey</p>
            <p className="mt-4 font-serif text-[clamp(2.4rem,4.4vw,4.6rem)] leading-[0.94] text-[var(--charcoal)]">
              Click the link.
              <br />
              Land softly.
              <br />
              Create your account.
              <br />
              Move into onboarding.
              <br />
              Keep going.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {journeyMoments.map((moment) => (
              <article key={moment.index} className="story-frame p-5 sm:p-6">
                <p className="story-kicker">{moment.index}</p>
                <h3 className="mt-4 font-serif text-[2rem] leading-[0.98] text-[var(--charcoal)]">
                  {moment.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[rgba(105,113,107,0.95)]">
                  {moment.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="route-section px-1 pb-14 lg:pb-20">
          <div className="story-frame grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end lg:p-10">
            <div className="space-y-5">
              <p className="story-kicker">begin now</p>
              <p className="font-serif text-[clamp(2.6rem,5vw,5rem)] leading-[0.93] text-[var(--charcoal)]">
                Start with the version of support that knows how to lower its voice.
              </p>
              <p className="max-w-[42rem] text-[1rem] leading-8 text-[rgba(105,113,107,0.96)]">
                New users go into signup and onboarding. Returning users re-enter
                their archive, capture ritual, breath support, and saved
                reflections without having to explain themselves again.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                href={isSignedIn ? "/welcome" : "/auth?mode=sign-up"}
                className="primary-cta h-14 px-6 text-sm font-semibold tracking-[0.14em] uppercase"
              >
                {isSignedIn ? "Continue journey" : "Create account"}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/archive"
                className="secondary-cta h-14 rounded-full px-6 text-sm font-semibold tracking-[0.14em] uppercase"
              >
                Preview archive
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        <footer className="route-section px-1 pb-8">
          <div className="story-panel grid gap-8 rounded-[2.4rem] p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <BrandMark href="/" />
              <p className="max-w-[33rem] text-sm leading-7 text-[rgba(105,113,107,0.95)]">
                ReflectDraw is a private somatic reflection and regulation app for
                anxious, scattered, and overclocked moments. It offers drawing,
                breathwork, reflective AI, and a softer way to notice how you are
                doing over time.
              </p>
              <div className="story-frame inline-flex w-fit items-start gap-3 rounded-[1.6rem] px-4 py-3">
                <ShieldCheck className="mt-1 size-4 shrink-0 text-[var(--sage)]" />
                <p className="max-w-[28rem] text-sm leading-7 text-[rgba(105,113,107,0.95)]">
                  ReflectDraw is supportive, not diagnostic, and is not a replacement
                  for emergency or professional care.
                </p>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              {footerColumns.map((column) => (
                <div key={column.title} className="space-y-3">
                  <p className="story-kicker">{column.title}</p>
                  <div className="grid gap-2">
                    {column.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="text-sm leading-7 text-[rgba(105,113,107,0.95)] hover:text-[var(--charcoal)]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
