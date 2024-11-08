"use client";
import "./globals.css";
import styles from "./css/Hero.module.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/extras/Loader";
import { inter } from "./fonts/inter";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);
  const [videoToggle, enableVideo] = useState(true);
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.startsWith("/quiz") || pathname.startsWith("/login")) {
      enableVideo(false);
    } else {
      enableVideo(true);
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
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
        {loading ? (
          <Loader />
        ) : (
          <>
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
            <div className="overflow-y-scroll max-h-[85dvh] no-scrollbar">
              {children}
            </div>
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}
