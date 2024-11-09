"use client";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { inter } from "./fonts/inter";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/") {
      redirect("/home");
    }
  }, []);
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" sizes="32*32" />
        <title>Quizoor</title>
      </head>
      <body className={`${inter.className}`}>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
