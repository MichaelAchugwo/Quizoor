"use client";
import { useEffect, useState } from "react";
import Loader from "../../extras/Loader";
import {
  checkSession,
  getQuiz,
  addResult,
  checkStudentIP,
} from "@/app/lib/actions";
import { motion, AnimatePresence } from "framer-motion";
import { Session } from "../../layout";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

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
  identification_name: string;
  results: [];
  questions: Question[];
};

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [identity, setIdentity] = useState("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [identification, setIdentification] = useState<string>("");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [showRedirect, setShowRedirect] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const fetchedQuiz = await getQuiz(id);

        if (!fetchedQuiz) {
          setError("Quiz not found or unavailable.");
          const timer = setTimeout(() => router.push("/quiz"), 2000);
          return () => clearTimeout(timer);
        }

        const now = new Date();
        const end = new Date(fetchedQuiz.endTime || "");

        if (end.getTime() <= now.getTime()) {
          setError("Quiz time is over.");
          const timer = setTimeout(() => router.push("/quiz"), 2000);
          return () => clearTimeout(timer);
        }

        setQuiz(fetchedQuiz);
        setSelectedOptions(new Array(fetchedQuiz.questions.length).fill(""));
        setLoading(false);

        const checkRepetition = async () => {
          const ipToCheck = await axios
            .get("https://api.ipify.org?format=json")
            .then((response) => response.data.ip)
            .catch((error) => console.log(error));
          const quizTaken = await checkStudentIP(id, ipToCheck);
          if (quizTaken === true) {
            setShowRedirect(true);
            const timer = setTimeout(() => router.push("/quiz"), 2000);
            return () => clearTimeout(timer);
          }
        };

        checkRepetition();

        // Timer Function
        const updateTimer = () => {
          const now = new Date();
          const end = new Date(fetchedQuiz.endTime);
          const remainingTime = end.getTime() - now.getTime();

          if (remainingTime <= 0) {
            setTimeRemaining("Quiz time is over.");
            const timer = setTimeout(() => router.push("/quiz"), 3000);
            return () => clearTimeout(timer);
          } else {
            const formattedTime = formatDistanceToNow(end);
            setTimeRemaining(formattedTime);
          }
        };

        updateTimer();
        const timerInterval = setInterval(updateTimer, 1000);

        return () => clearInterval(timerInterval);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id, router]);

  useEffect(() => {
    if (quiz) {
      document.title = `${quiz.quizName}`;
    } else {
      document.title = "Loading Quiz...";
    }
  }, [quiz]);

  const handleOptionSelect = (index: number, option: string) => {
    setSelectedOptions((prev) => {
      const updated = [...prev];
      updated[index] = option;
      return updated;
    });
  };

  const handleNext = () => {
    if (currentIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (quiz) {
      try {
        const correctAnswers = quiz.questions.filter(
          (q, index) => q.correctOption === selectedOptions[index]
        ).length;
        const currentSession = (await checkSession("Done")) as Session;
        const studentName = currentSession?.user?.name as string;
        const studentEmail = currentSession?.user?.email as string;
        const userIP = await axios
          .get("https://api.ipify.org?format=json")
          .then((response) => {
            return response.data.ip;
          })
          .catch((error) => {
            console.log(error);
          });
        const userResult = {
          name: studentName,
          email: studentEmail,
          score: correctAnswers,
          [quiz?.identification_name]: identity,
          ipAddress: userIP,
        };
        setScore(correctAnswers);
        const updatedQuiz = (await addResult(
          id,
          userResult
        )) as unknown as Quiz;
        setQuiz(updatedQuiz);
        setShowResults(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleStartQuiz = () => {
    if (identification.trim()) {
      const identityName = document.getElementById(
        "identification"
      ) as HTMLInputElement;
      setIdentity(identityName.value);
      setShowQuiz(true);
    } else {
      alert("Please enter your identification name.");
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (showRedirect) {
    return (
      <>
        <div className="flex min-h-[75dvh] place-items-center justify-center text-center text-xl">
          <div>
            <p>You have taken this quiz.</p>
            <p className="mb-5">Redirecting you to Quiz Page</p>
            <CircularProgress />
            <Link
              href="/quiz"
              className="bg-[#066C5D] text-white p-2 px-4 rounded-md block mt-5"
            >
              Or Click Here
            </Link>
          </div>
        </div>
      </>
    );
  }

  if (!showQuiz) {
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
      <div className="mt-6 text-center">
        <h1 className="text-2xl font-bold mb-4">{quiz?.quizName}</h1>
        <p className="mb-6 text-gray-400">Created by: {quiz?.creatorName}</p>
        <div className="mb-6">
          <label htmlFor="identification" className="block text-lg mb-2">
            Enter your {quiz?.identification_name}:
          </label>
          <input
            type="text"
            id="identification"
            value={identification}
            onChange={(e) => setIdentification(e.target.value)}
            className="w-2/3 max-w-md px-4 py-2 border rounded-md shadow-md"
            placeholder={quiz?.identification_name}
          />
        </div>
        <button
          onClick={handleStartQuiz}
          className="px-6 py-2 bg-[#066C5D] text-white rounded-md hover:bg-opacity-75"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  if (quiz !== null) {
    return (
      <div className="relative mt-6">
        <h1 className="text-2xl font-bold text-center mb-4">{quiz.quizName}</h1>
        <p className="text-center mb-6">Created by: {quiz.creatorName}</p>

        {showResults ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            <p className="text-4xl font-bold bg-gradient-to-r from-green-400 to-green-800 bg-clip-text text-transparent">
              {score} / {quiz.questions.length}
            </p>
            <p className="my-5 text-center">Redirecting you to Quiz Page</p>
            <div className="flex flex-col md:max-w-[25vw] text-center place-items-center mx-auto">
              <CircularProgress />
              <Link
                href="/quiz"
                className="bg-[#066C5D] text-white p-2 px-4 rounded-md mt-5"
              >
                Or Click Here
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center md:absolute md:top-4 right-4 p-2 bg-gray-200 rounded-md shadow-md">
              <p className="text-gray-700">Time Remaining: {timeRemaining}</p>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="p-4 border rounded-md shadow-md mb-6"
              >
                <p className="mb-4 font-medium">
                  Question {currentIndex + 1} of {quiz.questions.length}
                </p>
                <h2 className="text-lg font-semibold mb-4">
                  {quiz.questions[currentIndex].question}
                </h2>
                <ul className="space-y-2">
                  {quiz.questions[currentIndex].options.map(
                    (option, optIndex) => (
                      <li key={optIndex}>
                        <button
                          onClick={() =>
                            handleOptionSelect(currentIndex, option)
                          }
                          className={`w-full text-left px-4 py-2 rounded-md border transition-all duration-300 ${
                            selectedOptions[currentIndex] === option
                              ? "bg-green-100 border-green-500"
                              : "bg-white border-gray-300"
                          } hover:shadow-md`}
                        >
                          {option}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
                disabled={currentIndex === 0}
              >
                Previous
              </button>
              {currentIndex < quiz.questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-[#066C5D] text-white rounded-md hover:bg-opacity-75"
                >
                  Submit
                </button>
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  return <p>No quiz found with ID {id}</p>;
}
