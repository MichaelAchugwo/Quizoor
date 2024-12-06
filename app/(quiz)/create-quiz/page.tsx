"use client";
import { createQuiz } from "@/app/lib/actions";
export default function Home() {
  const quiz = {
    quizName: "General Knowledge Quiz",
    creatorName: "John Doe",
    startTime: "2024-11-26T08:00:00Z",
    endTime: "2024-11-26T09:00:00Z",
    questions: [
      {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctOption: "Paris",
      },
      {
        question: "Who wrote 'Hamlet'?",
        options: [
          "Charles Dickens",
          "William Shakespeare",
          "Mark Twain",
          "Leo Tolstoy",
        ],
        correctOption: "William Shakespeare",
      },
      {
        question: "What is the chemical symbol for water?",
        options: ["O2", "CO2", "H2O", "NaCl"],
        correctOption: "H2O",
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctOption: "Mars",
      },
    ],
    results: [],
  };
  return (
    <>
      <h1>Create New Quiz</h1>
      <button
        className="p-2 px-4 bg-blue-500 rounded-lg"
        onClick={() => {
          createQuiz(quiz.quizName, quiz.creatorName, quiz.startTime, quiz.endTime, quiz.questions);
        }}
      >
        Add Quiz
      </button>
    </>
  );
}
