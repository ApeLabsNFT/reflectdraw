"use client";

import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthSession } from "@/lib/use-auth-session";

type AuthMode = "sign-in" | "sign-up";

export function EmailAuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const { client, isConfigured, isSignedIn, user } = useAuthSession();
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

        const { error: signUpError } = await client.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              accepted_terms_at: new Date().toISOString(),
              accepted_privacy_at: new Date().toISOString(),
              accepted_reflective_scope_at: new Date().toISOString(),
            },
          },
        });

        if (signUpError) {
          throw signUpError;
        }

        setMessage(
          "Your account request is in motion. If email confirmation is enabled in Supabase, check your inbox before logging in.",
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

      router.push("/archive");
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
    router.refresh();
  }

  return (
    <section className="surface-panel space-y-5 rounded-[2.4rem] p-6">
      {isSignedIn ? (
        <div className="space-y-4">
          <p className="eyebrow">Account connected</p>
          <p className="font-serif text-[2rem] leading-[1] text-[var(--charcoal)]">
            {user?.email}
          </p>
          <p className="text-sm leading-7 text-[rgba(117,123,116,0.92)]">
            Your sanctuary is already open. You can continue into the archive or
            sign out from this device.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/archive"
              className="primary-cta h-13 w-full px-4 text-sm font-semibold"
            >
              Open archive
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
        <form className="space-y-4" onSubmit={(event) => void handleSubmit(event)}>
          <div className="space-y-2">
            <p className="eyebrow">
              {mode === "sign-up" ? "Create your sanctuary" : "Welcome back"}
            </p>
            <h1 className="serif-heading text-[2.7rem] leading-[0.95] text-[var(--charcoal)]">
              {mode === "sign-up"
                ? "Save your rituals, archive, and safety preferences."
                : "Resume your reflective practice."}
            </h1>
          </div>

          {!isConfigured ? (
            <div className="surface-panel-soft rounded-[1.8rem] p-4 text-sm leading-7 text-[rgba(117,123,116,0.92)]">
              Supabase auth is not fully configured yet. You can still explore the
              experience in demo mode while we connect the public auth keys.
            </div>
          ) : null}

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
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="soft-input h-14 w-full px-4 text-sm outline-none"
              placeholder="you@example.com"
            />
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

          {message ? (
            <div className="surface-panel-soft rounded-[1.6rem] px-4 py-3 text-sm text-[var(--sage)]">
              {message}
            </div>
          ) : null}

          {error ? (
            <div className="surface-panel-soft rounded-[1.6rem] px-4 py-3 text-sm text-[#8b5b4f]">
              {error}
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

          <p className="text-center text-sm text-[rgba(117,123,116,0.88)]">
            {mode === "sign-up" ? "Already have an account?" : "New here?"}{" "}
            <Link
              href={mode === "sign-up" ? "/sign-in" : "/sign-up"}
              className="font-semibold text-[var(--sage)]"
            >
              {mode === "sign-up" ? "Log in" : "Create one"}
            </Link>
          </p>
        </form>
      )}
    </section>
  );
}
