import { ArtifactExperience } from "@/components/artifact-experience";

export default async function ArtifactPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ArtifactExperience artifactId={id} />;
}
