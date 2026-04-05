"use client";

import { LoaderCircle, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getAuthCallbackUrl } from "@/lib/journey";
import { useAuthSession } from "@/lib/use-auth-session";

type AuthMode = "sign-in" | "sign-up";

function GoogleGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
    >
      <path
        d="M21.8 12.23c0-.72-.06-1.25-.19-1.8H12v3.38h5.65c-.11.84-.72 2.1-2.08 2.95l-.02.11 3.06 2.32.21.02c1.9-1.72 2.98-4.25 2.98-6.98Z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.76 0 5.08-.89 6.77-2.4l-3.22-2.45c-.86.59-2.01 1-3.55 1-2.7 0-4.98-1.72-5.79-4.1l-.1.01-3.18 2.41-.03.09A10.24 10.24 0 0 0 12 22Z"
        fill="#34A853"
      />
      <path
        d="M6.21 14.05A6.03 6.03 0 0 1 5.87 12c0-.71.12-1.39.33-2.05l-.01-.14-3.22-2.45-.11.05A9.82 9.82 0 0 0 1.8 12c0 1.63.39 3.17 1.07 4.54l3.34-2.49Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.85c1.93 0 3.23.82 3.98 1.5l2.9-2.77C17.07 2.95 14.76 2 12 2a10.24 10.24 0 0 0-9.13 5.46l3.34 2.49C7.02 7.57 9.3 5.85 12 5.85Z"
        fill="#EA4335"
      />
    </svg>
  );
}

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
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (!client) {
      setError(
        "Supabase public auth keys are still missing, so this form cannot connect yet.",
      );
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

  async function handleGoogleAuth() {
    setError(null);
    setMessage(null);

    if (!client) {
      setError("Supabase auth is not configured in the browser yet.");
      return;
    }

    if (mode === "sign-up" && !acceptedTerms) {
      setError("Please accept the terms and privacy links before continuing with Google.");
      return;
    }

    setIsGoogleSubmitting(true);

    try {
      const { error: googleError } = await client.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: getAuthCallbackUrl("/welcome"),
          queryParams: {
            access_type: "offline",
            prompt: "select_account",
          },
        },
      });

      if (googleError) {
        throw googleError;
      }
    } catch (oauthError) {
      setError(
        oauthError instanceof Error
          ? oauthError.message
          : "Google sign-in could not start on this device.",
      );
      setIsGoogleSubmitting(false);
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
                ? "Start with auth, then move straight into onboarding."
                : "Resume the ritual without rethinking the route."}
            </h2>
          </div>

          {!isConfigured ? (
            <div className="surface-panel-soft rounded-[1.8rem] p-4 text-sm leading-7 text-[rgba(117,123,116,0.92)]">
              Supabase auth is not fully configured yet. You can still preview the
              archive, but live email and Google auth need the browser-safe key.
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

          <button
            type="button"
            onClick={() => void handleGoogleAuth()}
            disabled={isGoogleSubmitting || !isConfigured}
            className="secondary-cta h-14 w-full px-6 text-sm font-semibold disabled:opacity-60"
          >
            {isGoogleSubmitting ? (
              <>
                <LoaderCircle className="size-4 animate-spin" />
                Redirecting to Google
              </>
            ) : (
              <>
                <GoogleGlyph />
                Continue with Google
              </>
            )}
          </button>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-[rgba(117,123,116,0.18)]" />
            <span className="text-[0.68rem] font-semibold tracking-[0.16em] text-[rgba(117,123,116,0.76)] uppercase">
              or with email
            </span>
            <div className="h-px flex-1 bg-[rgba(117,123,116,0.18)]" />
          </div>

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
              After auth, ReflectDraw routes new users into onboarding immediately.
              Returning users go back to their archive without extra steps.
            </p>
          </div>
        </>
      )}
    </section>
  );
}
