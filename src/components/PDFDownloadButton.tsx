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

    input.classList.remove("sr-only"); // Temporarily reveal content
    window.scrollTo(0, 0);

    // Wait for render
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const canvas = await html2canvas(input, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
        scrollY: -window.scrollY,
        ignoreElements: (el) => el.classList?.contains("no-print"),
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Multi-page logic
      let remainingHeight = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      remainingHeight -= pageHeight;

      while (remainingHeight > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        remainingHeight -= pageHeight;
      }

      pdf.save("Biological_Program_Summary.pdf");
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      input.classList.add("sr-only");
      window.scrollTo(0, 0);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="bg-blue-600 hover:bg-blue-700 text-white font-[Montserrat] font-semibold py-2 px-6 rounded text-lg shadow"
      aria-label="Download PDF"
    >
      Download PDF
    </button>
  );
};

export default PDFDownloadButton;
