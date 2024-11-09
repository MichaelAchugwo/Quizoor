"use client";
import { useState } from "react";
import FaqQuestion from "../../components/extras/FaqQuestion";
import { faqData } from "../../lib/faqObjects";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div className="text-justify z-1 relative px-[50px] mt-7 cursor-pointer">
      <h1 className="text-3xl text-[#C3F094] font-bold mb-6">FAQ</h1>
      <div className="flex flex-col gap-y-6">
        {faqData.map((faq, index) => (
          <FaqQuestion
            key={index}
            question={faq.question}
            answer={faq.answer}
            faqClicked={activeIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  );
}
