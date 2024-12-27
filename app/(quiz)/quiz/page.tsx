"use client";
import { useEffect, useState } from "react";
import type { User } from "next-auth";
import { checkSession, getAllQuizzes } from "@/app/lib/actions";
import Loader from "../extras/Loader";
import Link from "next/link";
import PersonIcon from "@mui/icons-material/Person";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

type Question = {
  question: string;
  options: string[];
  correctOption: string;
};

type Quiz = {
  _id: string;
  quizName: string;
  creatorName: string;
  startTime: string;
  endTime: string;
  identification_name: string;
  questions: Question[];
};

function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [query, setQuery] = useState("");
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReset, setShowReset] = useState(false);

  const fetchQuizzes = async () => {
    try {
      const data = await getAllQuizzes();
      const sortedQuizzes = data.sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      );
      setQuizzes(sortedQuizzes);
      setFilteredQuizzes(sortedQuizzes);
    } catch (error) {
      console.error("Failed to fetch quizzes", error);
      setQuizzes([]);
      setFilteredQuizzes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userDetails = await checkSession("Done");
      setUser(userDetails?.user || null);
    };

    fetchUser();
    fetchQuizzes();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFilteredQuizzes((prev) => [...prev]); // Trigger re-render for timer updates
    }, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const filtered = quizzes.filter((quiz) =>
      quiz.quizName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredQuizzes(filtered);
    setShowReset(true);
  };

  const resetQuizPage = async () => {
    await fetchQuizzes();
    setQuery("");
    setShowReset(false);
  };

  const formatTimeRemaining = (startTime: string, endTime: string): string => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (now < start) {
      const diff = start.getTime() - now.getTime();
      return formatTime(diff, "starts in");
    } else if (now < end) {
      const diff = end.getTime() - now.getTime();
      return formatTime(diff, "ends in");
    } else {
      return "Event ended";
    }
  };

  const formatTime = (diff: number, label: string): string => {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${label}: ${days} day${days > 1 ? "s" : ""}`;
    if (hours > 0) return `${label}: ${hours} hour${hours > 1 ? "s" : ""}`;
    return `${label}: ${minutes} minute${minutes > 1 ? "s" : ""}`;
  };

  return (
    <div className="mt-7">
      <h1 className="text-3xl font-semibold text-[#066C5D] text-center">
        Take a Quiz, {user?.name?.split(" ")[0]}
      </h1>
      <form
        onSubmit={handleSearch}
        className="text-center mt-7 md:flex md:gap-4 md:place-items-center md:justify-center"
      >
        <label
          htmlFor="searchQuery"
          className="text-xl block mb-3 md:mb-0 md:inline-block"
        >
          Have a Quiz ID?
        </label>
        <input
          type="text"
          name="query"
          id="searchQuery"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Quiz ID"
          className="border-b-2 border-gray-400 rounded-md px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="bg-[#066C5D] text-white px-4 py-2 rounded-md hover:opacity-75"
        >
          Find Quiz
        </button>
        {showReset && (
          <button
            type="button"
            onClick={resetQuizPage}
            className="bg-gray-400 text-white px-4 py-2 mt-3 md:mt-0 rounded-md hover:opacity-75 ml-4"
          >
            Reset
          </button>
        )}
      </form>

      <div className="mt-9">
        {loading ? (
          <Loader smaller={true} />
        ) : (
          <ul className="px-7">
            {filteredQuizzes.length === 0 ? (
              <p>No quizzes found.</p>
            ) : (
              filteredQuizzes
                .filter((quiz) => {
                  const endTime = new Date(quiz.endTime).getTime();
                  return endTime > new Date().getTime();
                })
                .map((quiz) => (
                  <li
                    key={quiz._id}
                    className="my-4 p-6 bg-white rounded-lg shadow-lg border border-gray-200 md:flex md:place-items-center md:justify-between"
                  >
                    <div className="mb-4 md:mb-0 md:flex md:place-items-center md:gap-4">
                      <h2 className="text-lg font-semibold text-gray-800">
                        {quiz.quizName}
                      </h2>
                      <p className="flex place-items-center gap-2 text-gray-600 md:ml-7">
                        <PersonIcon /> {quiz.creatorName}
                      </p>
                      <p className="flex place-items-center gap-2 text-gray-600">
                        <EventAvailableIcon />{" "}
                        {formatTimeRemaining(quiz.startTime, quiz.endTime)}
                      </p>
                    </div>
                    <div className="text-right md:flex md:gap-4">
                      <Link
                        href={`/quiz/${quiz._id}`}
                        className="inline-block bg-[#066C5D] text-white p-2 px-4 rounded-lg hover:opacity-75"
                      >
                        Take Quiz
                      </Link>
                      <Link
                        href={`/quiz/${quiz._id}/results`}
                        className="inline-block ml-3 md:ml-0 bg-gray-400 text-white p-2 px-4 rounded-lg hover:opacity-75"
                      >
                        Results
                      </Link>
                    </div>
                  </li>
                ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return <Home />;
}
