"use client";
import { useEffect, useRef, useState } from "react";
import { getQuiz, Question } from "@/app/lib/actions"; // Assuming this function fetches the quiz data
import Loader from "@/app/(quiz)/extras/Loader";
import { usePathname, useRouter } from "next/navigation";
import GeneratePDF from "@/app/lib/GeneratePdf";
import { toast, Bounce } from "react-toastify";

type Result = {
  name: string;
  email: string;
  score: number;
  ipAddress: string;
  identification: string;
};

type Quiz = {
  _id: string;
  quizName: string;
  creatorName: string;
  startTime: string;
  endTime: string;
  identification_name: string;
  results: Result[];
  questions: Question[];
};

export default function ResultsPage() {
  const pathName = usePathname();
  const id = pathName.split("/")[2];
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tableRef = useRef<HTMLTableElement | null>(null);
  const [toastDisplayed, setToastDisplayed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const fetchedQuiz = await getQuiz(id);
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
      document.title = `${quiz.quizName} Results`;
    } else {
      document.title = "Loading Quiz...";
    }
    if (quiz && quiz.results.length === 0 && !toastDisplayed) {
      toast.error("No results available for that quiz", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setToastDisplayed(true);
      setTimeout(() => {
        router.push("/quiz");
      }, 2000);
    }
  }, [quiz, toastDisplayed, router]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const sortedResults = quiz?.results.sort((a, b) => b.score - a.score) || [];
  const now = new Date();
  const start = new Date(quiz?.startTime || "");

  if (now < start) {
    return (
      <div className="mt-6 text-center">
        <h1 className="text-2xl font-bold mb-4">{quiz?.quizName}</h1>
        <p className="mb-6 text-gray-400">Created by: {quiz?.creatorName}</p>
        <p className="text-red-500 text-lg mb-4">
          This quiz has not started yet. Please check back later.
        </p>
      </div>
    );
  }
  return (
    <div className="mt-7">
      <h1 className="text-2xl font-bold text-center mb-6">
        {quiz?.quizName} - Results
      </h1>
      <div className="overflow-x-auto">
        <table
          ref={tableRef}
          className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg"
        >
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Rank</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">
                {quiz?.identification_name}
              </th>
              <th className="py-2 px-4 border-b">Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedResults.map((result, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                <td className="py-2 px-4 border-b text-center">
                  {result.name}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {result.identification}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {result.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center py-7">
          <GeneratePDF tableRef={tableRef} quizName={quiz?.quizName || ""} />
        </div>
      </div>
    </div>
  );
}
