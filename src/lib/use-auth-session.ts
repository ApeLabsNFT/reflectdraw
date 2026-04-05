"use client";

import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import {
  getDisplayName,
  getPreferredTone,
  getSanctuaryLabel,
  hasAcceptedReflectiveScope,
  hasCompletedOnboarding,
} from "@/lib/journey";
import { createClient } from "@/lib/supabase/client";

export function useAuthSession() {
  const client = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(client));

  useEffect(() => {
    if (!client) {
      return;
    }

    let isMounted = true;

    void (async () => {
      const result = await client.auth.getUser();
      const { data, error } = result;
      if (!isMounted) return;
      if (!error) {
        setUser(data.user ?? null);
      }
      setIsLoading(false);
    })();

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
      },
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [client]);

  return {
    client,
    user,
    isLoading,
    isConfigured: Boolean(client),
    isSignedIn: Boolean(user),
    isOnboarded: hasCompletedOnboarding(user),
    hasAcceptedScope: hasAcceptedReflectiveScope(user),
    displayName: getDisplayName(user),
    sanctuaryLabel: getSanctuaryLabel(user),
    preferredTone: getPreferredTone(user),
  };
}
