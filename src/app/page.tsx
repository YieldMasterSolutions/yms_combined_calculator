// src/app/page.tsx

'use client';

import React, { useState } from 'react';
import CalculatorForm from '../components/CalculatorForm';
import ResultsDisplay from '../components/ResultsDisplay';
import PDFDownloadButton from '../components/PDFDownloadButton';
import {
  seedTypes,
  productsSeedTreatment,
  productsInFurrowFoliar,
} from '../utils/data';
import {
  calculateSeedTreatmentData,
  calculateAllFoliarProductCosts,
  calculateTotalProgramCost,
  calculateROI,
} from '../utils/calculations';
import { SeedTreatmentResult, InFurrowFoliarResult, ROIResult } from '../utils/calculations';
import Image from 'next/image';

export default function Home() {
  const [formData, setFormData] = useState<any>(null);
  const [seedTreatmentResults, setSeedTreatmentResults] = useState<SeedTreatmentResult[]>([]);
  const [inFurrowFoliarResults, setInFurrowFoliarResults] = useState<InFurrowFoliarResult[]>([]);
  const [programCost, setProgramCost] = useState<number>(0);
  const [roi, setRoi] = useState<ROIResult | null>(null);

  const handleFormSubmit = (data: any) => {
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
      cropPriceUnit,
      seedsPerPoundOverride,
    } = data;

    if (!acres || !seedingRate) return; // Ensure required fields are provided

    const seedTreatmentResults = calculateSeedTreatmentData(
      seedType,
      Number(acres),
      Number(seedingRate),
      rateUnit,
      Number(dealerDiscount) || 0,
      Number(growerDiscount) || 0,
      seedTreatmentProducts,
      seedsPerPoundOverride ? Number(seedsPerPoundOverride) : undefined
    );

    const inFurrowFoliarResults = calculateAllFoliarProductCosts(
      Number(acres),
      inFurrowFoliarProducts,
      Number(dealerDiscount) || 0,
      Number(growerDiscount) || 0
    );

    const totalProgramCost = calculateTotalProgramCost(
      seedTreatmentResults,
      inFurrowFoliarResults
    );

    const roiResult = marketPrice
      ? calculateROI(totalProgramCost, Number(marketPrice), cropPriceUnit)
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
        productsSeedTreatment={productsSeedTreatment}
        productsInFurrow={productsInFurrowFoliar}
        onSubmit={handleFormSubmit}
      />
      <ResultsDisplay
        seedTreatmentResults={seedTreatmentResults}
        inFurrowFoliarResults={inFurrowFoliarResults}
        programCost={programCost}
        roi={roi}
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