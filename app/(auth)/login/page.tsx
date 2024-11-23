"use client";
import Image from "next/image";
import Link from "next/link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Divider } from "@mui/material";
import GoogleIcon from "../extras/GoogleIcon";
import { signInToGoogle } from "@/app/lib/actions";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirectUrl") || "/"
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/home"
        className="absolute left-4 top-4 md:left-8 md:top-8 text-sm hover:bg-[#deffbb] p-3 rounded-lg"
        suppressHydrationWarning
      >
        <>
          <ArrowBackIosIcon />
          <span>Home</span>
        </>
      </Link>
      <div
        className="mx-auto flex w-[80dvw] flex-col text-center space-y-6 md:w-[350px]"
        suppressHydrationWarning
      >
        <Image
          src="/icon.png"
          alt="Quizoor Logo"
          width={50}
          height={50}
          className="self-center w-auto h-auto"
          priority
        />
        <div className="space-y-2">
          <h1 className="text-2xl tracking-tight">Welcome back</h1>
          <Divider suppressHydrationWarning>
            <p className="text-sm text-gray-800">Login or Signup with Google</p>
          </Divider>
        </div>
        <div className="mt-8" suppressHydrationWarning>
          <button
            className="py-3 px-5 bg-[#066C5D] hover:bg-[#066c5de9] text-white font-semibold flex justify-center gap-4 w-full rounded-md"
            onClick={() => {
              signInToGoogle(redirectUrl);
            }}
          >
            <GoogleIcon />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
