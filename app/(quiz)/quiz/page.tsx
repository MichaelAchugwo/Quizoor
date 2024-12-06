"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { User } from "next-auth";
import { checkSession, getAllQuizzes } from "@/app/lib/actions";
import Loader from "../extras/Loader";

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

function useDebouncedCallback(callback: (term: string) => void, delay: number) {
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  return (term: string) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      callback(term);
    }, delay);
  };
}

function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);
  const [query, setQuery] = useState(() => searchParams.get("search") || "");
  const [quizzes, setQuizzes] = useState<Quiz[] | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userDetails = await checkSession("Done");
      setUser(userDetails?.user || null);
    };

    const fetchQuizzes = async () => {
      try {
        const data = await getAllQuizzes();
        console.log(data)
        setQuizzes(data);
      } catch (error) {
        console.error("Failed to fetch quizzes", error);
        setQuizzes([]); // Set empty array on failure
      }
    };

    fetchUser();
    fetchQuizzes();
  }, []);

  const changeSearchParam = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/quiz?search=${query}`);
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
          onChange={(e) => {
            setQuery(e.target.value);
            changeSearchParam(e.target.value);
          }}
          placeholder="Quiz ID"
          className="border-b-2 border-gray-400 rounded-md px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="bg-[#066C5D] text-white px-4 py-2 rounded-md hover:bg-[#066c5de9]"
        >
          Find Quiz
        </button>
      </form>
      <div className="mt-9">
        <ul>
          {quizzes === null ? (
            <Loader smaller={true} />
          ) : quizzes.length === 0 ? (
            <p>No quizzes available currently.</p>
          ) : (
            quizzes.map((quiz) => (
              <li key={quiz.quizName} className="mt-4">
                <h2 className="text-lg font-semibold">{quiz.quizName}</h2>
                <p>Created by: {quiz.creatorName}</p>
                <p>
                  Start: {new Date(quiz.startTime).toLocaleString()} | End:{" "}
                  {new Date(quiz.endTime).toLocaleString()}
                </p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default function Page() {
  return <Home />;
}
