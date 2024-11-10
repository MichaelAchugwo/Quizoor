import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Quizoor",
  description: "All our frequently asked questions can be found here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
