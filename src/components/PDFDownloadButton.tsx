// src/components/PDFDownloadButton.tsx

"use client";

import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PDFResults from "./PDFResults";
import { SeedTreatmentResult, FoliarProductResult, ROIResults } from "../utils/calculations";

interface PDFDownloadButtonProps {
  seedResults: SeedTreatmentResult[];
  foliarResults: FoliarProductResult[];
  roi: ROIResults;
  cropPriceUnit: string;
  growerName: string;
  repName: string;
  programCost: number;
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({
  seedResults,
  foliarResults,
  roi,
  cropPriceUnit,
  growerName,
  repName,
  programCost,
}) => {
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "YMS_Calculator_Results",
  });

  return (
    <>
      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          <PDFResults
            seedResults={seedResults}
            foliarResults={foliarResults}
            roi={roi}
            cropPriceUnit={cropPriceUnit}
            growerName={growerName}
            repName={repName}
            programCost={programCost}
          />
        </div>
      </div>
      <button
        onClick={() => handlePrint?.()}
        className="bg-green-600 text-white px-4 py-2 rounded shadow"
      >
        Download PDF
      </button>
    </>
  );
};

export default PDFDownloadButton;
