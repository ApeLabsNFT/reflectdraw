import { EmailAuthForm } from "@/components/email-auth-form";

export default function SignInPage() {
  return (
    <main className="app-canvas min-h-screen px-6 py-8">
      <div className="mx-auto max-w-[430px] space-y-6">
        <EmailAuthForm mode="sign-in" />
      </div>
    </main>
  );
}
