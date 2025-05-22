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

    // Clone the hidden content
    const original = targetRef.current;
    const clone = original.cloneNode(true) as HTMLElement;
    clone.style.position = "fixed";
    clone.style.top = "0";
    clone.style.left = "0";
    clone.style.opacity = "1";
    clone.style.zIndex = "-1";
    clone.style.backgroundColor = "white";
    clone.style.display = "block";
    document.body.appendChild(clone);

    await new Promise((resolve) => setTimeout(resolve, 250)); // Wait for fonts/layout

    const canvas = await html2canvas(clone, {
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

    let remainingHeight = imgHeight - pageHeight;
    while (remainingHeight > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      remainingHeight -= pageHeight;
    }

    pdf.save("YMS_Calculator_Results.pdf");

    document.body.removeChild(clone); // Clean up
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
