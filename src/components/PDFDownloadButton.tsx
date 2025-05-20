// src/components/PDFDownloadButton.tsx

"use client";

import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface PDFDownloadButtonProps {
  targetRef: React.RefObject<HTMLDivElement | null>;
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({ targetRef }) => {
  const handleDownload = async () => {
    const input = targetRef.current;
    if (!input) return;

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      scrollX: 0,
      scrollY: -window.scrollY,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let position = 0;
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

    // Add pages if content is taller than one page
    while (position + imgHeight > pdfHeight) {
      position -= pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    }

    pdf.save("YMS_Calculator_Results.pdf");
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
