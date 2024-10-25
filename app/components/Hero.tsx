import Link from "next/link";

export default function Hero() {
  return (
    <div className="text-center px-[70px] md:px-[200px] mt-[30px] md:mt-[60px]">
      <div className={`mb-7`}>
        <h1 className="text-4xl md:text-7xl font-bold text-white leading-relaxed md:leading-relaxed mb-[30px] md:mb-[50px]">
          Easily create or take{" "}
          <span className="bg-custom-gradient bg-clip-text text-transparent italic">
            quizzes
          </span>{" "}
          made by people from around the globe.
        </h1>
        <div className="flex justify-center text-xl gap-2">
          <Link
            href="/quiz/create"
            className="p-3 px-5 bg-[#066C5D] text-white font-semibold rounded-md "
          >
            Create Quiz
          </Link>
          <Link
            href="/quiz"
            className="p-3 px-5 bg-[#C3F094] text-black font-semibold rounded-md"
          >
            Take a Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}
