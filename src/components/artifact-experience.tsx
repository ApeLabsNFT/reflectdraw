"use client";

import { useEffect, useMemo } from "react";
import { ReflectionResult } from "@/components/reflection-result";
import { seedArtifacts, seedComparison, seedReflections } from "@/lib/demo-data";
import { trackClientEvent } from "@/lib/analytics";
import { useLatestRun } from "@/lib/use-latest-run";

export function ArtifactExperience({ artifactId }: { artifactId: string }) {
  const latestRun = useLatestRun();

  const fallbackArtifact = useMemo(
    () => seedArtifacts.find((artifact) => artifact.id === artifactId) ?? seedArtifacts[0],
    [artifactId],
  );

  const artifact =
    artifactId === "latest" ? latestRun?.artifact ?? seedArtifacts[0] : fallbackArtifact;
  const reflection =
    artifactId === "latest"
      ? latestRun?.reflection ?? seedReflections["a-threshold"]
      : seedReflections[artifact.id] ?? seedReflections["a-threshold"];

  useEffect(() => {
    trackClientEvent("reflection_result_viewed", {
      artifact_id: artifact.id,
      source: artifactId === "latest" ? "latest" : "archive",
    });
  }, [artifact.id, artifactId]);

  return (
    <ReflectionResult
      artifact={artifact}
      reflection={reflection}
      comparison={seedComparison}
    />
  );
}
