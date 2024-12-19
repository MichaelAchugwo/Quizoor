import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "All our frequently asked questions can be found here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
