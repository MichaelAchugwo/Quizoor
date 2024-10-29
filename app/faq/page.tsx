"use client";
import { useState } from "react";
import FaqQuestion from "../components/extras/FaqQuestion";

export default function Home() {
  const [faqClicked, openFaq] = useState(false);
  const openQuestion = () => {
    openFaq(!faqClicked);
  };
  return (
    <div
      className="text-justify z-1 relative px-[50px] mt-7 cursor-pointer"
      onClick={openQuestion}
    >
      <h1 className="text-3xl text-[#C3F094] font-bold mb-6">FAQ</h1>
      <div className="flex flex-col gap-y-6">
        <FaqQuestion
          question="What is Quizoor?"
          answer="Quizoor is an online platform for creating, taking, and sharing custom quizzes on a wide variety of topics. It's designed for anyone looking to engage with knowledge in a fun, interactive way."
          faqClicked={faqClicked}
        />
        <FaqQuestion
          question="Is Quizoor free to use?"
          answer="Yes! Quizoor is completely free to use."
          faqClicked={faqClicked}
        />
      </div>
    </div>
  );
}
