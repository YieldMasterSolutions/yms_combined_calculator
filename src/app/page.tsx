// Force deploy

"use client";

import React, { useState } from "react";
import CalculatorForm from "../components/CalculatorForm";
import ResultsDisplay from "../components/ResultsDisplay";
import PDFDownloadButton from "../components/PDFDownloadButton";
import {
  seedTypes,
  productsSeedTreatment,
  productsInFurrowFoliar,
  ProductData,
} from "../utils/data";
import {
  calculateSeedTreatmentData,
  calculateAllFoliarProductCosts,
  calculateROI,
  calculateProgramCost,
  SeedTreatmentResult,
  FoliarProductResult,
  ROIResults,
} from "../utils/calculations";

interface FormData {
  seedType: string;
  acres: number;
  seedingRate: number;
  rateUnit: string;
  dealerDiscount: number;
  growerDiscount: number;
  seedTreatmentProducts: ProductData[];
  foliarProducts: ProductData[];
  marketPrice: number;
  priceUnit: string;
  seedsPerPoundOverride?: number;
  grower: string;
  rep: string;
}

const Page = () => {
  const [seedResults, setSeedResults] = useState<SeedTreatmentResult[]>([]);
  const [foliarResults, setFoliarResults] = useState<FoliarProductResult[]>([]);
  const [roi, setRoi] = useState<ROIResults | null>(null);
  const [cropPriceUnit, setCropPriceUnit] = useState<string>("bu");
  const [growerName, setGrowerName] = useState<string>("");
  const [repName, setRepName] = useState<string>("");
  const [programCost, setProgramCost] = useState<number>(0);

  const handleCalculate = (formData: FormData) => {
    const {
      seedType,
      acres,
      seedingRate,
      rateUnit,
      dealerDiscount,
      growerDiscount,
      seedTreatmentProducts,
      foliarProducts,
      marketPrice,
      priceUnit,
      seedsPerPoundOverride,
      grower,
      rep,
    } = formData;

    setGrowerName(grower);
    setRepName(rep);
    setCropPriceUnit(priceUnit);

    const selectedSeed = seedTypes.find((s) => s["Seed Type"] === seedType);
    const seedsPerPound = seedsPerPoundOverride
      ? seedsPerPoundOverride
      : selectedSeed
      ? parseFloat(selectedSeed["Seeds/lb"])
      : 0;
    const lbsPerUnit = selectedSeed ? selectedSeed["Lbs/Unit"] : 0;

    const seedOutput = calculateSeedTreatmentData(
      seedType,
      acres,
      seedingRate,
      rateUnit,
      dealerDiscount,
      growerDiscount,
      seedTreatmentProducts,
      seedsPerPound,
      lbsPerUnit
    );

    const foliarOutput = calculateAllFoliarProductCosts(
      acres,
      dealerDiscount,
      growerDiscount,
      foliarProducts
    );

    const totalCost = calculateProgramCost(seedOutput, foliarOutput);
    const roiOutput = calculateROI(marketPrice, totalCost);

    setSeedResults(seedOutput);
    setFoliarResults(foliarOutput);
    setProgramCost(totalCost);
    setRoi(roiOutput);
  };

  return (
    <main className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">YMS Product Calculator</h1>
      <CalculatorForm
        seedTypes={seedTypes}
        productsSeedTreatment={productsSeedTreatment}
        productsInFurrow={productsInFurrowFoliar}
        onCalculate={handleCalculate}
      />

      {seedResults.length > 0 || foliarResults.length > 0 ? (
        <>
          <div className="flex justify-end mb-4">
            <PDFDownloadButton
              seedResults={seedResults}
              foliarResults={foliarResults}
              roi={roi!}
              cropPriceUnit={cropPriceUnit}
              growerName={growerName}
              repName={repName}
              programCost={programCost}
            />
          </div>
          <ResultsDisplay
            seedResults={seedResults}
            inFurrowFoliarResults={foliarResults}
            roi={roi!}
            cropPriceUnit={cropPriceUnit}
            programCost={programCost}
          />
        </>
      ) : null}
    </main>
  );
};

export default Page;
