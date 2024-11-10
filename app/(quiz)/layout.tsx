"use client";
import Navbar from "./extras/Navbar";
import Footer from "./extras/Footer";
import Loader from "./extras/Loader"
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  const loggedIn = false;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loggedIn === false) {
      redirect("/login");
    }
    setLoading(false);
  }, []);
  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="overflow-y-scroll max-h-[85dvh] no-scrollbar">
          {children}
        </div>
      )}
      <Footer />
    </>
  );
}
