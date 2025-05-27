// src/components/PDFDownloadButton.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFResults from "./PDFResults";
import { ProductCalculation } from "../utils/calculations";

interface PDFDownloadButtonProps {
  growerName: string;
  repName: string;
  seedTreatmentResults: ProductCalculation[];
  inFurrowFoliarResults: ProductCalculation[];
  totalCostPerAcre: number;
  totalUndiscountedCost: number;
  totalDiscountedCost: number;
  roi: {
    breakevenYield: number;
    roi2to1: number;
    roi3to1: number;
    roi4to1: number;
    roi5to1: number;
  };
  marketPriceUnit: string;
  seedType: string;
  acres: number;
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({
  growerName,
  repName,
  seedTreatmentResults,
  inFurrowFoliarResults,
  totalCostPerAcre,
  totalUndiscountedCost,
  totalDiscountedCost,
  roi,
  marketPriceUnit,
  seedType,
  acres,
}) => {
  const documentProps = (
    <PDFResults
      growerName={growerName}
      repName={repName}
      seedTreatmentResults={seedTreatmentResults}
      inFurrowFoliarResults={inFurrowFoliarResults}
      totalCostPerAcre={totalCostPerAcre}
      totalUndiscountedCost={totalUndiscountedCost}
      totalDiscountedCost={totalDiscountedCost}
      roi={roi}
      marketPriceUnit={marketPriceUnit}
      seedType={seedType}
      acres={acres}
    />
  );

  return (
    <div className="inline-block">
      <PDFDownloadLink
        document={documentProps}
        fileName="Biological_Program_Summary.pdf"
        className="bg-blue-600 hover:bg-blue-700 text-white font-[Montserrat] font-semibold py-2 px-6 rounded text-lg shadow transition"
      >
        {({ loading }) =>
          loading ? "Preparing PDF..." : "Download PDF Summary"
        }
      </PDFDownloadLink>
    </div>
  );
};

export default PDFDownloadButton;
