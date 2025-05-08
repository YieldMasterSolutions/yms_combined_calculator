// src/app/page.tsx

"use client";

import React, { useState } from "react";
import CalculatorForm from "../components/CalculatorForm";
import ResultsDisplay from "../components/ResultsDisplay";
import PDFDownloadButton from "../components/PDFDownloadButton";
import {
  seedTypes,
  FormData
} from "../utils/data";
import {
  calculateSeedTreatmentData,
  calculateAllFoliarProductCosts,
  calculateProgramCost,
  calculateROI,
  SeedTreatmentResult,
  FoliarProductResult,
  ROIResults,
} from "../utils/calculations";
import Image from "next/image";

export default function Home() {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [seedTreatmentResults, setSeedTreatmentResults] = useState<SeedTreatmentResult[]>([]);
  const [inFurrowFoliarResults, setInFurrowFoliarResults] = useState<FoliarProductResult[]>([]);
  const [programCost, setProgramCost] = useState<number>(0);
  const [roi, setRoi] = useState<ROIResults | null>(null);

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);

    const {
      acres,
      seedingRate,
      seedType,
      rateUnit,
      seedTreatmentProducts,
      inFurrowFoliarProducts,
      dealerDiscount,
      growerDiscount,
      marketPrice,
      seedsPerPoundOverride,
      lbsPerUnit,
    } = data;

    if (!acres || !seedingRate) return;

    const seedTreatmentResults = calculateSeedTreatmentData(
      seedType,
      acres,
      seedingRate,
      rateUnit,
      dealerDiscount || 0,
      growerDiscount || 0,
      seedTreatmentProducts,
      seedsPerPoundOverride || 0,
      lbsPerUnit
    );

    const inFurrowFoliarResults = calculateAllFoliarProductCosts(
      acres,
      dealerDiscount || 0,
      growerDiscount || 0,
      inFurrowFoliarProducts
    );

    const totalProgramCost = calculateProgramCost(
      seedTreatmentResults,
      inFurrowFoliarResults
    );

    const roiResult = marketPrice
      ? calculateROI(marketPrice, totalProgramCost)
      : null;

    setSeedTreatmentResults(seedTreatmentResults);
    setInFurrowFoliarResults(inFurrowFoliarResults);
    setProgramCost(totalProgramCost);
    setRoi(roiResult);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-800">YMS Combined Calculator</h1>
        <Image src="/YMSlogo5.png" alt="YMS Logo" width={120} height={60} />
      </div>

      <CalculatorForm
        seedTypes={seedTypes}
        onSubmit={handleFormSubmit}
      />

      <ResultsDisplay
        seedResults={seedTreatmentResults}
        foliarResults={inFurrowFoliarResults}
        programCost={programCost}
        roi={roi}
        cropPriceUnit={formData?.cropPriceUnit || ""}
        growerName={formData?.growerName || ""}
        dealerRep={formData?.repName || ""}
      />

      {formData && (
        <div className="mt-6">
          <PDFDownloadButton
            formData={formData}
            seedTreatmentResults={seedTreatmentResults}
            inFurrowFoliarResults={inFurrowFoliarResults}
            programCost={programCost}
            roi={roi}
          />
        </div>
      )}
    </main>
  );
}
