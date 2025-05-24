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

    // Show for rendering (in case hidden)
    const originalDisplay = input.style.display;
    input.style.display = "block";

    // Scroll to top to ensure proper rendering
    window.scrollTo(0, 0);

    // Use html2canvas to capture styled content
    const canvas = await html2canvas(input, {
      backgroundColor: "#fff",
      scale: 2,
      useCORS: true,
      // remove container shadows for PDF clarity
      ignoreElements: (el) => el.classList?.contains("no-print"),
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Scale the image to fit PDF page width
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pageWidth;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    // Center vertically if needed (small reports)
    const y = imgHeight < pageHeight ? (pageHeight - imgHeight) / 2 : 0;
    pdf.addImage(imgData, "PNG", 0, y, imgWidth, imgHeight);

    pdf.save("YMS_Program_Summary.pdf");

    // Restore original display
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
