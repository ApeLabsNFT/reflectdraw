"use client";

import { useCallback, useEffect, useState } from "react";

const PREFERENCE_EVENT = "reflectdraw.preferences.updated";
const PREFERENCE_PREFIX = "reflectdraw.preference.";

function toStorageKey(key: string) {
  return `${PREFERENCE_PREFIX}${key}`;
}

export function readBooleanPreference(key: string, fallback: boolean) {
  if (typeof window === "undefined") {
    return fallback;
  }

  const raw = window.localStorage.getItem(toStorageKey(key));

  if (raw === null) {
    return fallback;
  }

  return raw === "true";
}

export function useBooleanPreference(key: string, fallback: boolean) {
  const [value, setValue] = useState(fallback);

  useEffect(() => {
    const sync = () => setValue(readBooleanPreference(key, fallback));

    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(PREFERENCE_EVENT, sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(PREFERENCE_EVENT, sync);
    };
  }, [fallback, key]);

  const update = useCallback(
    (next: boolean | ((current: boolean) => boolean)) => {
      setValue((current) => {
        const resolved = typeof next === "function" ? next(current) : next;
        window.localStorage.setItem(toStorageKey(key), String(resolved));
        window.dispatchEvent(new Event(PREFERENCE_EVENT));
        return resolved;
      });
    },
    [key],
  );

  return [value, update] as const;
}
