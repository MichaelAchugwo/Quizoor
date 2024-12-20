import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Results",
  description: "Result of the quiz.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
