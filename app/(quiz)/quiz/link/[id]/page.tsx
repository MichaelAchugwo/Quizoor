"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { toast, Bounce } from "react-toastify";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const id = params.id;
  const [quizId, setQuizId] = useState<string | null>(null);
  const [toastDisplayed, setToastDisplayed] = useState(false);

  useEffect(() => {
    if (!id && !toastDisplayed) {
      toast.error("Quiz ID not found. Redirecting to home...", {
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
        router.push("/create-quiz");
      }, 2000);
    } else {
      setQuizId(id);
    }
  }, [id, router, toastDisplayed]);

  const currentBaseUrl = window.location.origin;
  const baseUrl = currentBaseUrl.includes("localhost:3000")
    ? "http://localhost:3000"
    : "https://quizoor.vercel.app";
  const quizLink = `${baseUrl}/quiz/${quizId}`;

  const copyToClipboard = () => {
    if (quizLink) {
      navigator.clipboard.writeText(quizLink);
      toast.success("Link copied to clipboard!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        style: { backgroundColor: "#C3F094", color: "black" },
      });
    }
  };

  if (!quizId) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[75dvh] p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz Link Created</h1>
      <p className="text-gray-700 mb-6 text-center">
        Share the link below with participants to allow them to access your
        quiz.
      </p>
      <div className="flex flex-col items-center gap-6">
        <p
          role="button"
          onClick={copyToClipboard}
          className="p-3 px-5 rounded-lg text-lg w-4/5 md:w-auto overflow-x-scroll md:overflow-hidden bg-gray-100 hover:bg-gray-200 active:bg-gray-200"
        >
          {quizLink}
        </p>
        <div className="flex gap-x-3">
          <Link
            href={`${quizLink}`}
            className="p-2 px-4 bg-[#066C5D] text-white font-semibold rounded-md hover:opacity-75"
          >
            Go To Quiz
          </Link>
          <Link
            href="/quiz"
            className="p-2 px-4 bg-gray-300 font-semibold rounded-md hover:opacity-75"
          >
            <ArrowBackIosIcon />
            Back to Quizzes
          </Link>
        </div>
      </div>
    </div>
  );
}
