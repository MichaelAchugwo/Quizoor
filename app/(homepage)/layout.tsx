"use client";
import "../globals.css";
import Navbar from "./extras/Navbar";
import Footer from "./extras/Footer";
import Loader from "./extras/Loader";
import { useEffect, useState } from "react";
import styles from "../css/Hero.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
      <video autoPlay muted loop className={`${styles.backgroundVideo}`}>
        <source src="/videos/backgroundVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="overflow-y-scroll max-h-[85dvh] no-scrollbar text-white">
          {children}
        </div>
      )}
      <Footer />
    </>
  );
}
