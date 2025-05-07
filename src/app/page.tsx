// src/app/page.tsx

"use client";

import React, { useState } from "react";
import CalculatorForm from "../components/CalculatorForm";
import ResultsDisplay from "../components/ResultsDisplay";
import PDFDownloadButton from "../components/PDFDownloadButton";
import { calculateSeedTreatmentData, calculateAllFoliarProductCosts, calculateROI, SeedTreatmentResult, FoliarProductResult, ROIResults } from "../utils/calculations";
import { seedTypes, productsSeedTreatment, productsInFurrowFoliar, ProductData } from "../utils/data";

interface FormData {
  seedType: string;
  acres: number;
  seedingRate: number;
  rateUnit: string;
  dealerDiscount: number;
  growerDiscount: number;
  seedTreatmentProducts: { product: ProductData }[];
  foliarProducts: { product: ProductData; applicationMethod: string }[];
  marketPrice: number;
  priceUnit: string;
  seedsPerPoundOverride?: number;
  grower: string;
  rep: string;
}

export default function Home() {
  const [seedResults, setSeedResults] = useState<SeedTreatmentResult[]>([]);
  const [foliarResults, setFoliarResults] = useState<FoliarProductResult[]>([]);
  const [roiResults, setRoiResults] = useState<ROIResults | null>(null);
  const [cropPriceUnit, setCropPriceUnit] = useState("bu");
  const [growerName, setGrowerName] = useState("");
  const [dealerRep, setDealerRep] = useState("");
  const [programCost, setProgramCost] = useState(0);

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
    setDealerRep(rep);
    setCropPriceUnit(priceUnit);

    const seedTreatmentWithMethod = seedTreatmentProducts.map(p => ({
      ...p,
      applicationMethod: "Planter Box"
    }));

    const seedResults = calculateSeedTreatmentData(
      seedType,
      acres,
      seedingRate,
      rateUnit,
      dealerDiscount,
      growerDiscount,
      seedTreatmentWithMethod,
      seedsPerPoundOverride,
      "Planter Box"
    );

    const foliarResults = calculateAllFoliarProductCosts(
      acres,
      foliarProducts,
      dealerDiscount,
      growerDiscount
    );

    const totalSeedCost = seedResults.reduce((sum, item) => sum + item.individualCostPerAcre, 0);
    const totalFoliarCost = foliarResults.reduce((sum, item) => sum + item.individualCostPerAcre, 0);
    const totalProgramCost = totalSeedCost + totalFoliarCost;

    setSeedResults(seedResults);
    setFoliarResults(foliarResults);
    setProgramCost(totalProgramCost);

    const roi = calculateROI(totalProgramCost, marketPrice);
    setRoiResults(roi);
  };

  return (
    <main className="max-w-6xl mx-auto p-4 text-base bg-neutral-950 text-white min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-2 text-yellow-400">YMS Combined Calculator</h1>
      <h2 className="text-xl text-center mb-6 text-stone-300">Biological Program Calculator</h2>

      <CalculatorForm
        seedTypes={seedTypes}
        productsSeedTreatment={productsSeedTreatment}
        productsInFurrow={productsInFurrowFoliar}
        onCalculate={handleCalculate}
      />

      {(seedResults.length > 0 || foliarResults.length > 0) && roiResults && (
        <div className="mt-10">
          <PDFDownloadButton
            seedResults={seedResults}
            foliarResults={foliarResults}
            roi={roiResults}
            cropPriceUnit={cropPriceUnit}
            growerName={growerName}
            dealerRep={dealerRep}
            programCost={programCost}
          />
          <ResultsDisplay
            seedResults={seedResults}
            inFurrowFoliarResults={foliarResults}
            roi={roiResults}
            cropPriceUnit={cropPriceUnit}
            growerName={growerName}
            dealerRep={dealerRep}
            programCost={programCost}
          />
        </div>
      )}
    </main>
  );
}
