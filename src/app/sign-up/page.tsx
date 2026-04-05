import { redirect } from "next/navigation";

export default function LegacySignUpPage() {
  redirect("/auth?mode=sign-up");
}
