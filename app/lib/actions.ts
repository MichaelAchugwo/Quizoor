"use server";
import { auth, signIn, signOut } from "@/auth";

export const signInToGoogle = async (redirectUrl: string) => {
  await signIn("google", { redirectTo: redirectUrl });
};

export const signUserOut = async (message: string) => {
  await signOut();
  console.log(message);
};

export const checkSession = async (message: string) => {
  const session = await auth();
  if (!session?.user) return null;
  return {user: session.user, message: message};
};
