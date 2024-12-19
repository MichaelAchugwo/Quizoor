import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Quiz",
  description: "Create a new quiz to share to your students or friends",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
