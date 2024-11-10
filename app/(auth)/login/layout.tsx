import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login - Quizoor",
    description: "Login to your account",
  };
  

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
