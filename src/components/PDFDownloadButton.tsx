// src/components/PDFDownloadButton.tsx

"use client";

import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface PDFDownloadButtonProps {
  targetRef: React.RefObject<HTMLDivElement>;
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({ targetRef }) => {
  const handleDownload = async () => {
    const input = targetRef.current;
    if (!input) return;

    // Temporarily force light mode and visibility
    document.documentElement.classList.remove("dark");
    input.classList.remove("hidden");

    // Wait for layout to stabilize
    await new Promise((res) => setTimeout(res, 300));

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      scrollY: -window.scrollY,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pageHeight = pdf.internal.pageSize.getHeight();

    let position = 0;

    // Split into multiple pages if needed
    while (position < imgHeight) {
      pdf.addImage(imgData, "PNG", 0, -position, imgWidth, imgHeight);
      position += pageHeight;
      if (position < imgHeight) pdf.addPage();
    }

    pdf.save("YMS_Calculator_Results.pdf");

    // Re-hide and restore dark mode after export
    input.classList.add("hidden");
    document.documentElement.classList.add("dark");
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
    >
      📄 Download PDF
    </button>
  );
};

export default PDFDownloadButton;
