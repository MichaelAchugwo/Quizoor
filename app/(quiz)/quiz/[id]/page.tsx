"use client";
import { Suspense, useEffect, useState } from "react";
import Loader from "../../extras/Loader";
import { getQuiz, connectToDB } from "@/app/lib/actions";

type Question = {
  question: string;
  options: string[];
  correctOption: string;
};

type Quiz = {
  quizName: string;
  creatorName: string;
  startTime: string;
  endTime: string;
  questions: Question[];
};

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        await connectToDB();
        const fetchedQuiz = await getQuiz(id);
        console.log(fetchedQuiz);
        setQuiz(fetchedQuiz);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  useEffect(() => {
    if (quiz) {
      // Dynamically set the page title
      document.title = `${quiz.quizName}`;
    } else {
      document.title = "Loading Quiz...";
    }
  }, [quiz]);

  if (loading) {
    return (
      <Suspense fallback={<Loader />}>
        <Loader />
      </Suspense>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (quiz !== null) {
    return (
      <div>
        <h1 className="text-2xl font-bold">{quiz.quizName}</h1>
        <p>Created by: {quiz.creatorName}</p>
        <p>
          Start: {new Date(quiz.startTime).toLocaleString()} | End:{" "}
          {new Date(quiz.endTime).toLocaleString()}
        </p>
        <h2 className="text-xl mt-4">Questions:</h2>
        <ul>
          {quiz.questions.map((q, index) => (
            <li key={index} className="mt-2">
              <p>{`${index + 1}. ${q.question}`}</p>
              <ul className="list-disc ml-5">
                {q.options.map((option, optIndex) => (
                  <li key={optIndex}>{option}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return <p>No quiz found with ID {id}</p>;
}
