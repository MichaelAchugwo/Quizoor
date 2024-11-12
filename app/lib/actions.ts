"use server";
import { auth, signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";

export const signInToGoogle = async (message: string) => {
  await signIn("google", { redirectTo: "/quiz" });
  console.log(message);
};

export const signUserOut = async (message: string) => {
  await signOut();
  console.log(message);
  redirect("/login");
};

export const checkSession = async (message: string) => {
  const session = await auth();
  return session;
};
