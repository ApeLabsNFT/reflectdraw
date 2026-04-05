import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";
import { capturePayloadSchema } from "@/lib/contracts";
import { generateReflectiveRun } from "@/lib/ai/reflect";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const payload = capturePayloadSchema.parse(json);

    const run = await Sentry.startSpan(
      {
        name: "reflectdraw-reflection-pipeline",
        op: "ai.pipeline",
      },
      async () => generateReflectiveRun(payload),
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
