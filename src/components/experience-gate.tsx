"use client";

import { Wind } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthSession } from "@/lib/use-auth-session";

export function ExperienceGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoading, isSignedIn, isOnboarded } = useAuthSession();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (isSignedIn && !isOnboarded) {
      router.replace("/onboarding");
    }
  }, [isLoading, isOnboarded, isSignedIn, pathname, router]);

  if (!isLoading && isSignedIn && !isOnboarded) {
    return (
      <div className="route-section flex min-h-[50vh] items-center justify-center px-4">
        <div className="surface-panel max-w-sm rounded-[2.2rem] p-6 text-center">
          <div className="secondary-cta mx-auto size-12">
            <Wind className="size-5" />
          </div>
          <p className="mt-4 font-serif text-[2rem] leading-[1.02] text-[var(--charcoal)]">
            Taking you into onboarding.
          </p>
          <p className="mt-3 text-sm leading-7 text-[rgba(117,123,116,0.9)]">
            New sessions complete the sanctuary setup before the archive opens.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
