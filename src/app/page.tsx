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
  calculateProgramCost,
  calculateROI,
} from '../utils/calculations';
import { SeedTreatmentResult, FoliarProductResult, ROIResults } from '../utils/calculations';
import Image from 'next/image';

export default function Home() {
  const [formData, setFormData] = useState<any>(null);
  const [seedTreatmentResults, setSeedTreatmentResults] = useState<SeedTreatmentResult[]>([]);
  const [inFurrowFoliarResults, setInFurrowFoliarResults] = useState<FoliarProductResult[]>([]);
  const [programCost, setProgramCost] = useState<number>(0);
  const [roi, setRoi] = useState<ROIResults | null>(null);

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
      lbsPerUnit,
    } = data;

    if (!acres || !seedingRate) return;

    const seedTreatmentResults = calculateSeedTreatmentData(
      seedType,
      Number(acres),
      Number(seedingRate),
      rateUnit,
      Number(dealerDiscount) || 0,
      Number(growerDiscount) || 0,
      seedTreatmentProducts,
      Number(seedsPerPoundOverride || 0),
      Number(lbsPerUnit)
    );

    const inFurrowFoliarResults = calculateAllFoliarProductCosts(
      Number(acres),
      Number(dealerDiscount) || 0,
      Number(growerDiscount) || 0,
      inFurrowFoliarProducts
    );

    const totalProgramCost = calculateProgramCost(
      seedTreatmentResults,
      inFurrowFoliarResults
    );

    const roiResult = marketPrice
      ? calculateROI(Number(marketPrice), totalProgramCost)
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
        seedResults={seedTreatmentResults}
        foliarResults={inFurrowFoliarResults}
        programCost={programCost}
        roi={roi}
        cropPriceUnit={formData?.cropPriceUnit || ''}
        growerName={formData?.growerName || ''}
        dealerRep={formData?.repName || ''}
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
