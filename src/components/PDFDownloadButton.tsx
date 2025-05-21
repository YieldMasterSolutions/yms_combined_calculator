// src/components/PDFDownloadButton.tsx

import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface PDFDownloadButtonProps {
  targetRef: React.RefObject<HTMLDivElement | null>;
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({ targetRef }) => {
  const handleDownloadPDF = async () => {
    if (!targetRef.current) return;

    const element = targetRef.current;

    // Ensure element is visible during capture
    const previousDisplay = element.style.display;
    element.style.display = "block";

    // Give time for layout/fonts to finalize
    await new Promise((resolve) => setTimeout(resolve, 250));

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgProps = {
      width: canvas.width,
      height: canvas.height,
    };

    const ratio = Math.min(pageWidth / imgProps.width, pageHeight / imgProps.height);
    const imgWidth = imgProps.width * ratio;
    const imgHeight = imgProps.height * ratio;

    let position = 0;
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

    // Add pages if content overflows
    let remainingHeight = imgHeight - pageHeight;
    while (remainingHeight > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      remainingHeight -= pageHeight;
    }

    pdf.save("YMS_Calculator_Results.pdf");

    // Reset display
    element.style.display = previousDisplay;
  };

  return (
    <button
      onClick={handleDownloadPDF}
      className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded shadow hover:bg-yellow-500"
    >
      Download PDF
    </button>
  );
};

export default PDFDownloadButton;
