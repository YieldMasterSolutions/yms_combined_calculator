// src/components/PDFDownloadButton.tsx

"use client";

import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface PDFDownloadButtonProps {
  targetRef: React.RefObject<HTMLDivElement | null>;
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({ targetRef }) => {
  const handleDownload = async () => {
    const input = targetRef.current;
    if (!input) return;

    const originalDisplay = input.style.display;
    input.style.display = "block";
    window.scrollTo(0, 0);

    const canvas = await html2canvas(input, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
      ignoreElements: (el) => el.classList?.contains("no-print"),
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pageWidth;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    let position = 0;
    let remainingHeight = imgHeight;

    while (remainingHeight > 0) {
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      remainingHeight -= pageHeight;
      position -= pageHeight;
      if (remainingHeight > 0) pdf.addPage();
    }

    pdf.save("Biological_Program_Summary.pdf");
    input.style.display = originalDisplay;
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded text-lg shadow"
      aria-label="Download PDF"
    >
      Download PDF
    </button>
  );
};

export default PDFDownloadButton;
