import { checkSession } from "@/app/lib/actions";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Quizoor",
  description: "Login to your account",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await checkSession("Done");
  if (session !== null) {
    redirect("/quiz");
  }
  return <>{children}</>;
}
