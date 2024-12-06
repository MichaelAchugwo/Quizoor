"use client";
import Navbar from "./extras/Navbar";
import Footer from "./extras/Footer";
import { Suspense, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { checkSession } from "../lib/actions";
import { User } from "next-auth";
import Loader from "./extras/Loader";

export type Session = {
  user?: User;
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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const sessionCheck = async () => {
      const currentSession = (await checkSession("Done")) as Session;
      if (!currentSession) {
        router.push(redirectUrl);
      } else {
        setLoading(false);
      }
    };
    sessionCheck();
  }, [redirectUrl, router]);

  if(loading){
    return(
      <Suspense fallback={<Loader />}>
        <Loader />
      </Suspense>
    )
  }
  return (
    <>
      <Navbar />
      <div className="overflow-y-scroll px-5 max-h-[85dvh] no-scrollbar">
        {children}
      </div>
      <Footer />
    </>
  );
}
