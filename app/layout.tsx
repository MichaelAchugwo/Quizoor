"use client";
import "./globals.css";
import styles from "./css/Hero.module.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { inter } from "./fonts/inter";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [videoToggle, enableVideo] = useState(true);
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.startsWith("/quiz")) {
      enableVideo(false);
    } else {
      enableVideo(true);
    }
  }, [pathname]);
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" sizes="32*32" />
        <title>Quizoor</title>
      </head>
      <body
        className={`${inter.className} ${
          videoToggle ? "text-white" : "text-[#066C5D]"
        } min-h-[100dvh] min-w-[100dvw]`}
      >
        <video
          autoPlay
          muted
          loop
          className={`${styles.backgroundVideo} ${
            videoToggle ? " " : "hidden"
          }`}
        >
          <source src="/videos/backgroundVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Navbar toggleVideo={videoToggle} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
