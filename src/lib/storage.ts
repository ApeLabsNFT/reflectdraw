import type { DemoRun } from "@/lib/contracts";

const DEMO_RUN_KEY = "reflectdraw.demo.latest";
const DEMO_RUN_EVENT = "reflectdraw.demo.updated";

export function writeLatestRun(run: DemoRun) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DEMO_RUN_KEY, JSON.stringify(run));
  window.dispatchEvent(new Event(DEMO_RUN_EVENT));
}

export function readLatestRun(): DemoRun | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(DEMO_RUN_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as DemoRun;
  } catch {
    return null;
  }
}

export function subscribeToLatestRun(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const listener = () => onStoreChange();
  window.addEventListener("storage", listener);
  window.addEventListener(DEMO_RUN_EVENT, listener);

  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(DEMO_RUN_EVENT, listener);
  };
}
