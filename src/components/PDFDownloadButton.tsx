// src/components/PDFDownloadButton.tsx

"use client";

import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PDFResults from "./PDFResults";
import { SeedTreatmentResult, FoliarProductResult, ROIResults } from "../utils/calculations";

interface PDFDownloadButtonProps {
  formData: any;
  seedTreatmentResults: SeedTreatmentResult[];
  inFurrowFoliarResults: FoliarProductResult[];
  programCost: number;
  roi: ROIResults | null;
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({
  formData,
  seedTreatmentResults,
  inFurrowFoliarResults,
  programCost,
  roi,
}) => {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "YMS_Calculator_Results",
    removeAfterPrint: true,
  });

  return (
    <div className="mt-4">
      <button
        onClick={handlePrint}
        className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
      >
        Download PDF
      </button>

      {/* Hidden PDF Rendered Content */}
      <div style={{ display: "none" }}>
        <PDFResults
          ref={componentRef}
          formData={formData}
          seedTreatmentResults={seedTreatmentResults}
          inFurrowFoliarResults={inFurrowFoliarResults}
          programCost={programCost}
          roi={roi}
        />
      </div>
    </div>
  );
};

export default PDFDownloadButton;
