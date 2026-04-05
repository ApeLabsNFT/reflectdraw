import { AuthJourney } from "@/components/auth-journey";

type SearchParams = Promise<{
  mode?: string;
  error?: string;
}>;

export default async function AuthPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const mode = params.mode === "sign-in" ? "sign-in" : "sign-up";

  return <AuthJourney mode={mode} error={params.error} />;
}
