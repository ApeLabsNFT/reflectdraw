import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";
import { capturePayloadSchema } from "@/lib/contracts";
import { createDemoRun } from "@/lib/demo-pipeline";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const payload = capturePayloadSchema.parse(json);

    const run = await Sentry.startSpan(
      {
        name: "demo-reflection-pipeline",
        op: "ai.pipeline",
      },
      async () => {
        await new Promise((resolve) => {
          setTimeout(resolve, 650);
        });

        return createDemoRun(payload);
      },
    );

    return NextResponse.json(run);
  } catch (error) {
    Sentry.captureException(error);

    return NextResponse.json(
      {
        error: "Unable to create reflection",
      },
      { status: 500 },
    );
  }
}
