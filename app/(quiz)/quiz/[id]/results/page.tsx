"use client";
import { useEffect, useState } from "react";
import { getQuiz, Question } from "@/app/lib/actions"; // Assuming this function fetches the quiz data
import Loader from "@/app/(quiz)/extras/Loader";
import { usePathname } from "next/navigation";

type Result = {
  name: string;
  email: string;
  score: number;
  ipAddress: string;
  [key: string]: any;
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

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (quiz === null || quiz.results.length === 0) {
    return <p>No results available for this quiz.</p>;
  }

  const sortedResults = quiz.results.sort((a, b) => b.score - a.score);

  return (
    <div className="mt-7">
      <h1 className="text-2xl font-bold text-center mb-6">
        {quiz.quizName} - Results
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Rank</th>
              <th className="py-2 px-4 border-b">Name</th>
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
                  {result.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
