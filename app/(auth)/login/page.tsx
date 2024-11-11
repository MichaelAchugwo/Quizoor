"use client";
import Image from "next/image";
import Link from "next/link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, Divider } from "@mui/material";
import GoogleIcon from "../extras/GoogleIcon";
import { signInToGoogle, checkSession } from "@/app/lib/actions";
import { useEffect } from "react";

export default async function LoginPage() {
  useEffect(() => {
    checkSession("Done");
  }, []);
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center ">
      <Link
        href="/home"
        className="absolute left-4 top-4 md:left-8 md:top-8 text-sm hover:bg-[#deffbb] p-3 rounded-lg"
      >
        <>
          <ArrowBackIosIcon />
          Home
        </>
      </Link>
      <div className="mx-auto flex w-[80dvw] flex-col text-center space-y-6 md:w-[350px]">
        <Image
          src={"/icon.png"}
          alt="Quizoor Logo"
          width={"50"}
          height={"50"}
          className="self-center"
        />
        <div className="space-y-2">
          <h1 className="text-2xl tracking-tight">Welcome back</h1>
          <Divider>
            <p className="text-sm text-gray-800">Login or Signup with Google</p>
          </Divider>
        </div>
        <div className="mt-8">
          <Button
            fullWidth
            startIcon={<GoogleIcon />}
            className="py-2 bg-[#066C5D] hover:bg-[#066c5de9] text-white font-semibold"
            onClick={() => signInToGoogle("Done")}
          >
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
