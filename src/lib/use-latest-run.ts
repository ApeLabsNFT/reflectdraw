"use client";

import { useSyncExternalStore } from "react";
import { readLatestRun, subscribeToLatestRun } from "@/lib/storage";

export function useLatestRun() {
  return useSyncExternalStore(subscribeToLatestRun, readLatestRun, () => null);
}
