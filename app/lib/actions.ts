"use server";
import { auth, signIn } from "@/auth";

export const signInToGoogle = async (message: string) => {
  await signIn("google");
  console.log(message);
};

export const checkSession = async (message: string) => {
  const session = await auth();
  console.log(session);
  console.log(message);
};
