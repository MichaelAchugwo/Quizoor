"use client";
import { checkSession, createQuiz } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { ArrowBackIos } from "@mui/icons-material";
import { Session } from "../layout";

export default function Home() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState<"details" | "questions">(
    "details"
  );
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: [""],
      correctOption: "",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const questionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = (await checkSession("Done")) as Session;
        setUserName(session?.user?.name || "Guest");
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };
    const startTimeInput = document.getElementById(
      "startTime"
    ) as HTMLInputElement;
    if (startTimeInput) {
      startTimeInput.value = new Date().toISOString().slice(0, 16);
    }
    fetchSession();
  }, []);

  const goToDetails = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentSection("details");
    detailsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const goToQuestions = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const questionNumber = document.getElementById(
      "questionNumber"
    ) as HTMLInputElement;
    const count = Number(questionNumber.value);

    setQuestions((prev) => {
      if (prev.length >= count) return prev;
      const additionalQuestions = Array(count - prev.length).fill({
        question: "",
        options: [""],
        correctOption: "",
      });
      return [...prev, ...additionalQuestions];
    });

    setCurrentSection("questions");
    questionsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const updateQuestion = (index: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, question: value } : q))
    );
  };

  const addOption = (questionIndex: number) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === questionIndex ? { ...q, options: [...q.options, ""] } : q
      )
    );
  };

  const updateOption = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === questionIndex
          ? {
              ...q,
              options: q.options.map((opt, j) =>
                j === optionIndex ? value : opt
              ),
            }
          : q
      )
    );
  };

  const createNewQuiz = async () => {
    setLoading(true);

    try {
      const currentSession = (await checkSession("Done")) as Session;
      const creatorName = currentSession?.user?.name as string;
      const name = document.getElementById("quizName") as HTMLInputElement;
      const identificationType = document.getElementById(
        "identificationType"
      ) as HTMLInputElement;
      const startTime = document.getElementById(
        "startTime"
      ) as HTMLInputElement;
      const quizLength = document.getElementById(
        "quizLength"
      ) as HTMLInputElement;

      const startDateTime = new Date(startTime.value);
      const quizLengthMinutes = Number(quizLength.value);

      // Calculate end time
      const endDateTime = new Date(
        startDateTime.getTime() + quizLengthMinutes * 60000
      );

      const formattedQuestions = questions.map((q) => {
        if (!q.correctOption || !q.options.includes(q.correctOption)) {
          throw new Error(
            `Question "${q.question}" has an invalid correct option.`
          );
        }
        return {
          question: q.question.trim(),
          options: q.options.map((opt) => opt.trim()).filter(Boolean),
          correctOption: q.correctOption.trim(),
        };
      });

      await createQuiz(
        name.value.trim(),
        creatorName,
        startDateTime.toISOString(),
        endDateTime.toISOString(),
        identificationType.value.trim(),
        formattedQuestions
      );
      alert("Quiz created successfully!");
      router.push("/quiz");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error creating quiz:", error);
        alert(error.message || "Failed to create quiz. Please try again.");
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-gray-500 text-xl text-center mt-4 mb-2">
      Create New Quiz - {userName ? `${userName}` : "Loading..."}
      </h1>
      <div
        className={`${
          currentSection === "details" ? "flex flex-col" : "hidden"
        } justify-center place-items-center`}
        ref={detailsRef}
      >
        <h1 className="text-2xl text-center font-bold">Quiz Details</h1>
        <form className="flex flex-col gap-y-4 my-3 w-full px-3 md:px-0 md:w-1/2">
          <div className="flex flex-col gap-y-3">
            <label htmlFor="quizName" className="font-semibold">
              Quiz Name
            </label>
            <input
              type="text"
              id="quizName"
              className="p-2 rounded-md border-2 border-gray-300 w-full"
              placeholder="Enter the name for your quiz"
              required={true}
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <label htmlFor="identificationType" className="font-semibold">
              Identification Type
            </label>
            <input
              type="text"
              id="identificationType"
              className="p-2 rounded-md border-2 border-gray-300 w-full"
              placeholder="Registration Number or Username e.t.c"
              required={true}
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <label htmlFor="startTime" className="font-semibold">
              Start Time
            </label>
            <input
              type="datetime-local"
              id="startTime"
              className="p-2 rounded-md border-2 border-gray-300 w-full"
              required={true}
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <label htmlFor="quizLength" className="font-semibold">
              Quiz Length (Minutes)
            </label>
            <input
              type="number"
              id="quizLength"
              className="p-2 rounded-md border-2 border-gray-300 w-full"
              placeholder="Enter quiz length in minutes"
              required={true}
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <label htmlFor="questionNumber" className="font-semibold">
              Number of Questions
            </label>
            <input
              type="number"
              id="questionNumber"
              className="p-2 rounded-md border-2 border-gray-300 w-full"
              defaultValue={1}
              required={true}
            />
          </div>
          <button
            className="flex place-items-center justify-center p-2 px-4 mt-3 bg-[#066C5D] hover:opacity-75 text-white font-semibold rounded-lg"
            onClick={goToQuestions}
          >
            <AddIcon /> Add Questions
          </button>
        </form>
      </div>
      <div
        className={`${
          currentSection === "questions" ? "flex flex-col" : "hidden"
        } justify-center place-items-center`}
        ref={questionsRef}
      >
        <h1 className="text-2xl text-center font-bold mb-3">Add Questions</h1>
        <form className="flex flex-col gap-y-7 my-3 w-full px-3 md:px-0 md:w-1/2">
          {questions.map((q, questionIndex) => (
            <div key={questionIndex} className="flex flex-col gap-y-3">
              <label className="font-semibold">
                Question {questionIndex + 1}
              </label>
              <input
                type="text"
                className="p-2 rounded-md border-2 border-gray-300 w-full"
                value={q.question}
                onChange={(e) => updateQuestion(questionIndex, e.target.value)}
                placeholder={`Enter question ${questionIndex + 1}`}
                required={true}
              />
              <div className="pl-4">
                {q.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex gap-3 mb-2">
                    <input
                      type="text"
                      className="p-2 rounded-md border-2 border-gray-300 w-full"
                      value={option}
                      onChange={(e) =>
                        updateOption(questionIndex, optionIndex, e.target.value)
                      }
                      placeholder={`Option ${optionIndex + 1}`}
                      required={true}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  className="text-blue-500"
                  onClick={() => addOption(questionIndex)}
                >
                  + Add Option
                </button>
                <label className="font-semibold mt-3 block">
                  Correct Option
                </label>
                <select
                  className="p-2 rounded-md border-2 border-gray-300 w-full"
                  value={q.correctOption}
                  onChange={(e) =>
                    setQuestions((prev) =>
                      prev.map((question, i) =>
                        i === questionIndex
                          ? { ...question, correctOption: e.target.value }
                          : question
                      )
                    )
                  }
                >
                  <option value="" disabled>
                    Select the correct option
                  </option>
                  {q.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
          <div className="flex gap-3 w-full">
            <button
              type="submit"
              className="flex place-items-center justify-center p-2 px-4 mt-3 w-1/2 bg-[#066C5D] hover:opacity-75 text-white font-semibold rounded-lg"
              onClick={createNewQuiz}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Quiz"}
              <CheckIcon className="ml-2" />
            </button>
            <button
              type="button"
              className="flex place-items-center justify-center p-2 px-4 mt-3 w-1/2 bg-gray-200 hover:opacity-75 text-black font-semibold rounded-lg"
              onClick={goToDetails}
            >
              <ArrowBackIos />
              Go Back
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
