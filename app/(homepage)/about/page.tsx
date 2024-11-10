import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Quizoor",
  description: "Quizoor is an intuitive platform designed to make quiz creation adn learning accessible, interactive, and enjoyable.",
};

export default function Home() {
  return (
    <>
      <div className="md:text-start z-1 relative px-[50px] my-10">
        <h1 className="text-4xl text-center text-[#C3F094] font-bold mb-6">
          About Us
        </h1>
        <p className="text-2xl text-center md:text-justify leading-loose mt-3">
          Quizoor is an intuitive platform designed to make quiz creation and
          learning accessible, interactive, and enjoyable. Created with a focus
          on simplicity and ease of use, Quizoor empowers users to create custom
          quizzes, take quizzes on a wide variety of topics, and share knowledge
          in a dynamic and engaging way. Whether you&apos;re a student, educator, or
          a knowledge enthusiast, Quizoor offers a personalized approach to
          learning and testing your knowledge. Our goal is to help you learn at
          your own pace, while keeping track of your progress. With
          Quizoor&apos;s tools for designing questions, managing topics, and
          tracking scores, quiz-making and taking becomes a seamless, efficient,
          and productive experience.
        </p>
      </div>
    </>
  );
}
