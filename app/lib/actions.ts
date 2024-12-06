"use server";
import { auth, signIn, signOut } from "@/auth";
import { Quiz } from "./mongoose";
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI as string;

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
  return { user: session.user, message: message };
};

export async function connectToDB() {
  try {
    if (!uri) {
      throw new Error("Please define the MONGODB_URI environment variable.");
    }
    await mongoose.connect(uri);
    console.log("Connected to DB");
  } catch (error) {
    console.error("Error connecting to DB:", error);
  }
}

type Question = {
  question: string;
  options: string[];
  correctOption: string;
};

export type Quiz = {
  quizName: string;
  creatorName: string;
  startTime: string;
  endTime: string;
  questions: Question[];
};

export async function getQuiz(id: string): Promise<Quiz | null> {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("Invalid ID format");
      return null;
    }
    const quiz = await Quiz.findById(id).lean<Quiz | null>();
    return quiz;
  } catch (err) {
    console.error(`Error fetching quiz with ID ${id}:`, err);
    throw err;
  }
}

export async function getAllQuizzes(): Promise<Quiz[] | null> {
  try {
    const quiz = await Quiz.find().lean();
    if (!quiz) {
      return null;
    }
    return quiz as unknown as Quiz[];
  } catch (err) {
    console.error("Error fetching quizzes");
    throw err;
  }
}

export async function createQuiz(
  name: string,
  creator: string,
  beginTime: string,
  finishTime: string,
  questionList: Question[]
) {
  try {
    const newQuiz = new Quiz({
      quizName: name,
      creatorName: creator,
      startTime: beginTime,
      endTime: finishTime,
      questions: questionList,
    });
    await newQuiz.save();
    return;
  } catch (err) {
    console.error("Error fetching quizzes");
    throw err;
  }
}
