import { redirect } from "next/navigation";

export default function LegacySignInPage() {
  redirect("/auth?mode=sign-in");
}
