import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface faqProps {
  question: string;
  answer: string;
  faqClicked: boolean;
}
export default function FaqQuestion({
  question,
  answer,
  faqClicked,
}: faqProps) {
  return (
    <div className="text-xl text-white">
      <div
        className={`${
          faqClicked ? "border-b-2 border-white" : ""
        }border-white hover:border-b-2 md:border-b-2 md:border-white flex justify-between pb-3`}
      >
        <p>{question}</p>
        {faqClicked ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </div>
      <div
        className={`leading-relaxed overflow-hidden transition-all duration-500 ease-in-out ${
          faqClicked ? "max-h-[500px] py-3" : "max-h-0"
        }`}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
}
