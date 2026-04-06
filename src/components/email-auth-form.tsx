"use client";

import { LoaderCircle, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getAuthCallbackUrl } from "@/lib/journey";
import { useAuthSession } from "@/lib/use-auth-session";

type AuthMode = "sign-in" | "sign-up";

export function EmailAuthForm({
  mode,
  serverError,
}: {
  mode: AuthMode;
  serverError?: string;
}) {
  const router = useRouter();
  const {
    client,
    isConfigured,
    isSignedIn,
    user,
    hasAcceptedScope,
  } = useAuthSession();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedScope, setAcceptedScope] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (!client) {
      setError("Sign in is not available on this device yet. Please try again shortly.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === "sign-up") {
        if (!acceptedTerms || !acceptedScope) {
          throw new Error(
            "Please accept the legal terms and reflective-scope notice before creating an account.",
          );
        }

        const { data, error: signUpError } = await client.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: getAuthCallbackUrl("/welcome"),
            data: {
              full_name: fullName,
              display_name: fullName,
              onboarding_completed: false,
              accepted_terms_at: new Date().toISOString(),
              accepted_privacy_at: new Date().toISOString(),
              accepted_reflective_scope_at: new Date().toISOString(),
            },
          },
        });

        if (signUpError) {
          throw signUpError;
        }

        if (data.session) {
          router.replace("/welcome");
          router.refresh();
          return;
        }

        setMessage(
          "Check your email to verify the account. Once you're back, ReflectDraw will start onboarding instead of leaving you in signup limbo.",
        );
        return;
      }

      const { error: signInError } = await client.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw signInError;
      }

      router.replace("/welcome");
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "We couldn't complete that auth step.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSignOut() {
    if (!client) return;
    await client.auth.signOut();
    router.replace("/");
    router.refresh();
  }

  const feedback = error ?? serverError ?? null;

  return (
    <section className="route-section surface-panel space-y-5 rounded-[2.4rem] p-6">
      {isSignedIn ? (
        <div className="space-y-4">
          <p className="eyebrow">Account connected</p>
          <p className="font-serif text-[2rem] leading-[1] text-[var(--charcoal)]">
            {user?.email}
          </p>
          <p className="text-sm leading-7 text-[rgba(117,123,116,0.92)]">
            {hasAcceptedScope
              ? "You're already inside the journey. Continue and ReflectDraw will route you to the right next step."
              : "You're connected, but the reflective-scope acknowledgements still need to be completed in onboarding."}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/welcome"
              className="primary-cta h-13 w-full px-4 text-sm font-semibold"
            >
              Continue journey
            </Link>
            <button
              type="button"
              onClick={() => void handleSignOut()}
              className="secondary-cta h-13 w-full px-4 text-sm font-semibold"
            >
              Sign out
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <p className="eyebrow">
              {mode === "sign-up" ? "Create your sanctuary" : "Welcome back"}
            </p>
            <h2 className="serif-heading text-[2.7rem] leading-[0.95] text-[var(--charcoal)]">
              {mode === "sign-up"
                ? "Make space for the version of you that needs gentleness today."
                : "Come back without having to start from zero."}
            </h2>
          </div>

          {!isConfigured ? (
            <div className="surface-panel-soft rounded-[1.8rem] p-4 text-sm leading-7 text-[rgba(117,123,116,0.92)]">
              Sign-in is still being prepared here. You can continue exploring the
              product, then come back once account access is available.
            </div>
          ) : null}

          {mode === "sign-up" ? (
            <div className="space-y-3 rounded-[1.8rem] bg-[rgba(244,244,240,0.94)] p-4">
              <label className="flex items-start gap-3 text-sm leading-6 text-[rgba(117,123,116,0.94)]">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(event) => setAcceptedTerms(event.target.checked)}
                  className="mt-1"
                />
                <span>
                  I agree to the <Link href="/terms" className="font-semibold text-[var(--sage)]">Terms</Link> and <Link href="/privacy" className="font-semibold text-[var(--sage)]">Privacy Policy</Link>.
                </span>
              </label>
              <label className="flex items-start gap-3 text-sm leading-6 text-[rgba(117,123,116,0.94)]">
                <input
                  type="checkbox"
                  checked={acceptedScope}
                  onChange={(event) => setAcceptedScope(event.target.checked)}
                  className="mt-1"
                />
                <span>
                  I understand ReflectDraw offers reflective support and regulation tools, not diagnosis, emergency response, or treatment.
                </span>
              </label>
            </div>
          ) : null}

          <form className="space-y-4" onSubmit={(event) => void handleSubmit(event)}>
            {mode === "sign-up" ? (
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-[var(--charcoal)]">
                  Full name
                </span>
                <input
                  required
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className="soft-input h-14 w-full px-4 text-sm outline-none"
                  placeholder="What should we call you?"
                />
              </label>
            ) : null}

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-[var(--charcoal)]">
                Email
              </span>
              <div className="soft-input flex h-14 items-center gap-3 px-4">
                <Mail className="size-4 text-[rgba(117,123,116,0.78)]" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="you@example.com"
                />
              </div>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-[var(--charcoal)]">
                Password
              </span>
              <input
                required
                type="password"
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="soft-input h-14 w-full px-4 text-sm outline-none"
                placeholder="At least 8 characters"
              />
            </label>

            {message ? (
              <div className="surface-panel-soft rounded-[1.6rem] px-4 py-3 text-sm text-[var(--sage)]">
                {message}
              </div>
            ) : null}

            {feedback ? (
              <div className="surface-panel-soft rounded-[1.6rem] px-4 py-3 text-sm text-[#8b5b4f]">
                {feedback}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="primary-cta h-14 w-full px-6 text-base font-semibold disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="size-5 animate-spin" />
                  {mode === "sign-up" ? "Creating account" : "Signing in"}
                </>
              ) : mode === "sign-up" ? (
                "Create account"
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="surface-panel-soft flex items-start gap-3 rounded-[1.8rem] p-4">
            <span className="secondary-cta size-10 shrink-0">
              <ShieldCheck className="size-4" />
            </span>
            <p className="text-sm leading-7 text-[rgba(117,123,116,0.9)]">
              After you enter, ReflectDraw routes new users into onboarding and
              returning users back to their archive, breath rituals, and saved reflections.
            </p>
          </div>
        </>
      )}
    </section>
  );
}
