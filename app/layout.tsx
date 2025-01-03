"use client";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";
import { poppins } from "./fonts/poppins";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";

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
  }, [pathname]);
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" sizes="32*32" />
        <link rel="prefetch" href="/videos/backgroundVideo.mp4" as="video" />
        <title>Quizoor</title>
      </head>
      <body className={`${poppins.className}`}>
        <Analytics />
        <SpeedInsights />
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
