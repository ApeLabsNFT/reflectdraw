"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Camera,
  ShieldCheck,
  Sparkles,
  Wind,
} from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BrandMark } from "@/components/brand-mark";
import { EmailAuthForm } from "@/components/email-auth-form";
import { useAuthSession } from "@/lib/use-auth-session";

const steps = [
  {
    title: "Authenticate",
    body: "Use email or Google inside ReflectDraw's Supabase flow.",
    icon: ShieldCheck,
  },
  {
    title: "Onboard",
    body: "Set tone, boundaries, and sanctuary preferences next.",
    icon: Sparkles,
  },
  {
    title: "Continue",
    body: "Move directly into archive, ritual capture, and longer-term reflection.",
    icon: Camera,
  },
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
    <main className="landing-shell overflow-hidden px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-[1460px] flex-col">
        <header className="route-section flex items-center justify-between gap-3">
          <div className="glass-soft-dark inline-flex items-center rounded-full px-4 py-3">
            <BrandMark href="/" />
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="glass-soft-dark inline-flex h-12 items-center gap-2 rounded-full px-4 text-xs font-semibold tracking-[0.14em] text-white uppercase"
            >
              <ArrowLeft className="size-4" />
              Back
            </Link>
          </div>
        </header>

        <section className="mt-4 grid flex-1 gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="route-section glass-dark flex flex-col justify-between rounded-[2.5rem] p-5 sm:p-6 lg:p-8">
            <div className="space-y-6">
              <div className="glass-soft-dark inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-[0.68rem] font-semibold tracking-[0.16em] text-white uppercase">
                <Wind className="size-3.5" />
                The entry ritual
              </div>

              <div className="space-y-4">
                <h1 className="display-heading max-w-[12ch] text-balance text-[clamp(3rem,6vw,5.6rem)] leading-[0.9] text-white">
                  Step in once.
                  <br />
                  The rest should
                  <br />
                  continue.
                </h1>
                <p className="max-w-[34rem] text-base leading-8 text-[rgba(245,245,238,0.82)]">
                  This page is no longer a dead-end signup form. It is the handoff
                  point between landing and onboarding, built for phone and web,
                  and fully scoped to the ReflectDraw journey.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {steps.map((step) => (
                  <div key={step.title} className="glass-soft-dark rounded-[1.8rem] p-4">
                    <div className="secondary-cta size-11">
                      <step.icon className="size-5" />
                    </div>
                    <p className="mt-4 font-semibold text-white">{step.title}</p>
                    <p className="mt-2 text-sm leading-7 text-[rgba(245,245,238,0.78)]">
                      {step.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="glass-soft-dark rounded-[1.8rem] p-4">
                <p className="eyebrow text-[rgba(245,245,238,0.62)]">Responsive flow</p>
                <p className="mt-3 text-sm leading-7 text-white/82">
                  Desktop gets a calmer split layout. Mobile stays stacked and thumb-friendly.
                </p>
              </div>
              <div className="glass-soft-dark rounded-[1.8rem] p-4">
                <p className="eyebrow text-[rgba(245,245,238,0.62)]">Auth owner</p>
                <p className="mt-3 text-sm leading-7 text-white/82">
                  Supabase owns identity and session state. Vercel is only the host.
                </p>
              </div>
            </div>
          </div>

          <div className="route-section flex flex-col gap-4">
            <div className="glass-soft-dark grid grid-cols-2 gap-3 rounded-[2rem] p-2">
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
