"use client";
import Navbar from "./extras/Navbar";
import Footer from "./extras/Footer";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { checkSession } from "../lib/actions";
import { User } from "next-auth";

export type Session = {
  user?: User,
  message?: string;
} | null;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathName = usePathname();
  const redirectUrl = `/login?redirectUrl=${encodeURIComponent(pathName)}`;
  const [session, setSession] = useState<Session>(null);

  useEffect(() => {
    const sessionCheck = async () => {
      const currentSession = await checkSession("Done") as Session;
      if (!currentSession) {
        router.push(redirectUrl);
      } else {
        setSession(currentSession);
      }
    };
    sessionCheck();
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <>
      <Navbar session={session} /> {/* Pass session directly if needed */}
      <div className="overflow-y-scroll px-5 max-h-[85dvh] no-scrollbar">
        {children}
      </div>
      <Footer />
    </>
  );
}
