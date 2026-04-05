export type FeatureStatus = {
  id: string;
  name: string;
  route: string;
  status: "working" | "partial";
  summary: string;
};

export type IntegrationStatus = {
  id: string;
  name: string;
  category: "core" | "ai" | "ops" | "growth" | "billing";
  status: "connected" | "partial" | "missing" | "demo";
  summary: string;
  presentKeys: string[];
  missingKeys: string[];
};

function pickFirst(...values: Array<string | undefined>) {
  return values.find((value) => Boolean(value));
}

function hasAll(...values: Array<string | undefined>) {
  return values.every((value) => Boolean(value));
}

function hasAny(...values: Array<string | undefined>) {
  return values.some((value) => Boolean(value));
}

function evaluateKeys(
  env: NodeJS.ProcessEnv,
  requiredKeys: string[],
  optionalKeys: string[] = [],
) {
  const presentKeys = [...requiredKeys, ...optionalKeys].filter(
    (key) => Boolean(env[key]),
  );

  return {
    presentKeys,
    missingKeys: requiredKeys.filter((key) => !env[key]),
  };
}

export function getFeatureStatuses(): FeatureStatus[] {
  return [
    {
      id: "landing",
      name: "Landing Journey",
      route: "/",
      status: "working",
      summary: "Entry experience now introduces the product, legal framing, and auth paths.",
    },
    {
      id: "onboarding",
      name: "Onboarding",
      route: "/",
      status: "working",
      summary: "Editorial landing screen is live and navigates into the app.",
    },
    {
      id: "archive",
      name: "Archive",
      route: "/archive",
      status: "working",
      summary: "Archive browsing, filtering, and local demo history are working.",
    },
    {
      id: "capture",
      name: "Capture Ritual",
      route: "/capture",
      status: "working",
      summary: "Resonance, tone, three-word capture, note entry, and image preview work locally.",
    },
    {
      id: "processing",
      name: "Processing State",
      route: "/processing",
      status: "working",
      summary: "Animated holding state and handoff to results are working.",
    },
    {
      id: "reflection",
      name: "AI Reflection Result",
      route: "/artifact/latest",
      status: "working",
      summary: "Typed demo reflection output renders end to end.",
    },
    {
      id: "breath",
      name: "Breath and Sleep Support",
      route: "/sanctuary",
      status: "working",
      summary: "Arrival, box, extended exhale, and wind-down practices are interactive.",
    },
    {
      id: "compare",
      name: "Compare Over Time",
      route: "/compare",
      status: "working",
      summary: "Comparison storytelling screen is live with seeded reflection history.",
    },
    {
      id: "guides",
      name: "Guides",
      route: "/guides",
      status: "working",
      summary: "Guide discovery and request surfaces are implemented.",
    },
    {
      id: "shop",
      name: "Shop",
      route: "/shop",
      status: "working",
      summary: "Shop catalog UI is implemented with product cards.",
    },
    {
      id: "settings",
      name: "Settings and Privacy",
      route: "/settings",
      status: "working",
      summary: "Privacy controls, toggles, and support framing are live.",
    },
    {
      id: "integrations",
      name: "Integrations and AI Providers",
      route: "/integrations",
      status: "working",
      summary: "Feature audit and provider readiness view are now built into the app.",
    },
    {
      id: "auth",
      name: "Login and Sign Up",
      route: "/sign-up",
      status: "working",
      summary: "Email auth screens are live and connect to Supabase once auth keys are present.",
    },
    {
      id: "legal",
      name: "Terms and Privacy",
      route: "/terms",
      status: "working",
      summary: "Legal and privacy documents are available as part of the user journey.",
    },
    {
      id: "production-backend",
      name: "Production Backend",
      route: "/integrations",
      status: "partial",
      summary: "Schema and contracts exist, but real auth, storage, webhooks, and jobs need live credentials.",
    },
  ];
}

export function getIntegrationStatuses(): IntegrationStatus[] {
  const env = process.env;
  const supabasePublicKey = pickFirst(
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
  const supabaseServerKey = pickFirst(
    env.SUPABASE_SERVICE_ROLE_KEY,
    env.SUPABASE_SECRET_KEY,
  );
  const supabaseKeys = evaluateKeys(
    env,
    ["NEXT_PUBLIC_SUPABASE_URL"],
    [
      "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
      "SUPABASE_SERVICE_ROLE_KEY",
      "SUPABASE_SECRET_KEY",
      "SUPABASE_PROJECT_REF",
      "SUPABASE_DB_PASSWORD",
      "SUPABASE_DB_URL",
      "SUPABASE_JWT_SECRET",
    ],
  );
  const clerkKeys = evaluateKeys(
    env,
    ["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", "CLERK_SECRET_KEY"],
    ["NEXT_PUBLIC_CLERK_SIGN_IN_URL", "NEXT_PUBLIC_CLERK_SIGN_UP_URL"],
  );
  const openAiKeys = evaluateKeys(env, ["OPENAI_API_KEY"]);
  const anthropicKeys = evaluateKeys(env, ["ANTHROPIC_API_KEY"]);
  const googleKeys = {
    presentKeys: ["GOOGLE_GENERATIVE_AI_API_KEY", "GEMINI_API_KEY"].filter(
      (key) => Boolean(env[key]),
    ),
    missingKeys:
      hasAny(env.GOOGLE_GENERATIVE_AI_API_KEY, env.GEMINI_API_KEY) ? [] : [
        "GOOGLE_GENERATIVE_AI_API_KEY or GEMINI_API_KEY",
      ],
  };
  const xAiKeys = evaluateKeys(env, ["XAI_API_KEY"]);
  const pineconeKeys = evaluateKeys(
    env,
    ["PINECONE_API_KEY", "PINECONE_INDEX_NAME"],
    ["PINECONE_INDEX_HOST", "PINECONE_NAMESPACE"],
  );
  const resendKeys = evaluateKeys(env, [
    "RESEND_API_KEY",
    "RESEND_FROM_EMAIL",
  ]);
  const stripeKeys = evaluateKeys(env, [
    "STRIPE_SECRET_KEY",
    "STRIPE_WEBHOOK_SECRET",
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
  ]);
  const posthogKeys = evaluateKeys(
    env,
    [],
    ["NEXT_PUBLIC_POSTHOG_HOST", "POSTHOG_PROJECT_API_KEY"],
  );
  const hasPostHogKey = hasAny(
    env.NEXT_PUBLIC_POSTHOG_KEY,
    env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN,
    env.NEXT_PUBLIC_POSTHOG_TOKEN,
  );
  const sentryKeys = {
    presentKeys: [
      "NEXT_PUBLIC_SENTRY_DSN",
      "SENTRY_DSN",
      "SENTRY_AUTH_TOKEN",
      "SENTRY_ORG",
      "SENTRY_PROJECT",
    ].filter((key) => Boolean(env[key])),
    missingKeys:
      hasAny(env.NEXT_PUBLIC_SENTRY_DSN, env.SENTRY_DSN) ? [] : [
        "NEXT_PUBLIC_SENTRY_DSN or SENTRY_DSN",
      ],
  };

  return [
    {
      id: "supabase",
      name: "Supabase",
      category: "core",
      status: hasAll(env.NEXT_PUBLIC_SUPABASE_URL, supabasePublicKey, supabaseServerKey)
        ? "connected"
        : hasAny(
            env.NEXT_PUBLIC_SUPABASE_URL,
            env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
            env.SUPABASE_SERVICE_ROLE_KEY,
            env.SUPABASE_SECRET_KEY,
            env.SUPABASE_PROJECT_REF,
            env.SUPABASE_DB_PASSWORD,
          )
          ? "partial"
          : "missing",
      summary:
        "Auth, Postgres, Storage, RLS, and Edge Functions backbone.",
      presentKeys: supabaseKeys.presentKeys,
      missingKeys: [
        ...supabaseKeys.missingKeys,
        ...(supabasePublicKey
          ? []
          : ["NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"]),
        ...(supabaseServerKey
          ? []
          : ["SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SECRET_KEY"]),
      ],
    },
    {
      id: "clerk",
      name: "Clerk",
      category: "core",
      status: hasAll(
        env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        env.CLERK_SECRET_KEY,
      )
        ? "connected"
        : hasAny(
            env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
            env.CLERK_SECRET_KEY,
          )
          ? "partial"
          : "missing",
      summary:
        "Optional alternate auth provider if you choose Clerk over Supabase Auth.",
      presentKeys: clerkKeys.presentKeys,
      missingKeys: clerkKeys.missingKeys,
    },
    {
      id: "openai",
      name: "OpenAI",
      category: "ai",
      status: env.OPENAI_API_KEY ? "connected" : "demo",
      summary:
        "Best fit for primary reflection generation and typed JSON response contracts.",
      presentKeys: openAiKeys.presentKeys,
      missingKeys: openAiKeys.missingKeys,
    },
    {
      id: "anthropic",
      name: "Anthropic",
      category: "ai",
      status: env.ANTHROPIC_API_KEY ? "connected" : "demo",
      summary:
        "Useful as a secondary safety or rewrite model for tone control.",
      presentKeys: anthropicKeys.presentKeys,
      missingKeys: anthropicKeys.missingKeys,
    },
    {
      id: "google",
      name: "Google AI / Gemma 3",
      category: "ai",
      status: hasAny(env.GOOGLE_GENERATIVE_AI_API_KEY, env.GEMINI_API_KEY)
        ? "connected"
        : "demo",
      summary:
        "Primary Gemma 3-ready multimodal reflection provider with scoped JSON output.",
      presentKeys: [
        ...googleKeys.presentKeys,
        ...(env.GOOGLE_GEMMA_MODEL ? ["GOOGLE_GEMMA_MODEL"] : []),
      ],
      missingKeys: googleKeys.missingKeys,
    },
    {
      id: "xai",
      name: "xAI",
      category: "ai",
      status: env.XAI_API_KEY ? "connected" : "demo",
      summary:
        "Optional alternate provider for experimentation or model redundancy.",
      presentKeys: xAiKeys.presentKeys,
      missingKeys: xAiKeys.missingKeys,
    },
    {
      id: "pinecone",
      name: "Pinecone",
      category: "ai",
      status: hasAll(env.PINECONE_API_KEY, env.PINECONE_INDEX_NAME)
        ? "connected"
        : hasAny(env.PINECONE_API_KEY, env.PINECONE_INDEX_NAME)
          ? "partial"
          : "missing",
      summary:
        "Vector memory layer for prompt retrieval and semantic comparison over time.",
      presentKeys: pineconeKeys.presentKeys,
      missingKeys: pineconeKeys.missingKeys,
    },
    {
      id: "resend",
      name: "Resend",
      category: "growth",
      status: hasAll(env.RESEND_API_KEY, env.RESEND_FROM_EMAIL)
        ? "connected"
        : hasAny(env.RESEND_API_KEY, env.RESEND_FROM_EMAIL)
          ? "partial"
          : "missing",
      summary: "Transactional email for auth and future guide notifications.",
      presentKeys: resendKeys.presentKeys,
      missingKeys: resendKeys.missingKeys,
    },
    {
      id: "stripe",
      name: "Stripe",
      category: "billing",
      status: hasAll(env.STRIPE_SECRET_KEY, env.STRIPE_WEBHOOK_SECRET)
        ? "connected"
        : hasAny(env.STRIPE_SECRET_KEY, env.STRIPE_WEBHOOK_SECRET)
          ? "partial"
          : "missing",
      summary: "Billing for Guides and Shop once commerce goes live.",
      presentKeys: stripeKeys.presentKeys,
      missingKeys: stripeKeys.missingKeys,
    },
    {
      id: "posthog",
      name: "PostHog",
      category: "ops",
      status: hasPostHogKey
        ? "connected"
        : "missing",
      summary:
        "Privacy-aware product analytics gated by explicit in-app consent.",
      presentKeys: [
        ...posthogKeys.presentKeys,
        ...(env.NEXT_PUBLIC_POSTHOG_KEY ? ["NEXT_PUBLIC_POSTHOG_KEY"] : []),
        ...(env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
          ? ["NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN"]
          : []),
        ...(env.NEXT_PUBLIC_POSTHOG_TOKEN ? ["NEXT_PUBLIC_POSTHOG_TOKEN"] : []),
      ],
      missingKeys: hasPostHogKey
        ? []
        : [
            "NEXT_PUBLIC_POSTHOG_KEY or NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN or NEXT_PUBLIC_POSTHOG_TOKEN",
          ],
    },
    {
      id: "sentry",
      name: "Sentry",
      category: "ops",
      status: hasAny(env.NEXT_PUBLIC_SENTRY_DSN, env.SENTRY_DSN)
        ? "connected"
        : hasAny(env.SENTRY_AUTH_TOKEN, env.SENTRY_ORG, env.SENTRY_PROJECT)
          ? "partial"
          : "missing",
      summary:
        "Error monitoring and tracing are wired in; DSN and build credentials make it live.",
      presentKeys: sentryKeys.presentKeys,
      missingKeys: sentryKeys.missingKeys,
    },
    {
      id: "demo-pipeline",
      name: "Local Demo Reflection Pipeline",
      category: "core",
      status: "connected",
      summary:
        "Current local flow is fully operational with a typed mock reflection API.",
      presentKeys: [],
      missingKeys: [],
    },
  ];
}
