import type { Metadata } from "next";
import { connectToDB } from "@/app/lib/connect";

export const metadata: Metadata = {
  title: "Available Quizzes - Quizoor",
  description: "A list of all public quizzes available to take on Quizoor.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connectToDB();
  return <>{children}</>;
}
