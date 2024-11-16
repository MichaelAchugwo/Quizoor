import Navbar from "./extras/Navbar";
import Footer from "./extras/Footer";
import { redirect } from "next/navigation";
import { checkSession } from "../lib/actions";
import { connectToDB } from "../lib/connect";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await checkSession("Done");
  if (session === null) {
    redirect("/login");
  }
  connectToDB();
  return (
    <>
      <Navbar />
      <div className="overflow-y-scroll max-h-[85dvh] no-scrollbar">
        {children}
      </div>
      <Footer />
    </>
  );
}
