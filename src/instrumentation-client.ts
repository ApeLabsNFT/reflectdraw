import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    sendDefaultPii: true,
    tracesSampleRate: process.env.NODE_ENV === "development" ? 1 : 0.15,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 1,
    enableLogs: true,
    environment: process.env.NEXT_PUBLIC_APP_ENV,
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
