import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Props = {
  tableRef: React.MutableRefObject<HTMLTableElement | null>;
  quizName: string;
};

const GeneratePDF: React.FC<Props> = ({ tableRef, quizName }) => {
  const generatePdf = () => {
    const doc = new jsPDF("p", "pt", "a4");

    if (tableRef.current) {
      autoTable(doc, { html: tableRef.current });
      doc.save(`${quizName} results`);
    } else {
      console.error("Table reference is null");
    }
  };

  return (
    <button
      className="rounded-md text-lg p-3 px-5 bg-[#066C5D] text-white"
      onClick={generatePdf}
    >
      Download PDF
    </button>
  );
};

export default GeneratePDF;
