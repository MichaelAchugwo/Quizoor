import type { Metadata } from "next";
import { connectToDB } from "@/app/lib/connect";

export const metadata: Metadata = {
  title: "Create New Quiz - Quizoor",
  description: "Create a new quiz to share to your students or friends",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connectToDB;
  return <>{children}</>;
}
