import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Available Quizzes",
  description: "A list of all public quizzes available to take on Quizoor.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
