// src/app/page.tsx

"use client";

import React, { useRef, useState } from "react";
import CalculatorForm from "../components/CalculatorForm";
import ResultsDisplay from "../components/ResultsDisplay";
import PDFDownloadButton from "../components/PDFDownloadButton";
import PDFResults from "../components/PDFResults";
import { ProductCalculation, calculateSeedTreatmentData, calculateProductData, calculateROI } from "../utils/calculations";
import { productsSeedTreatment, productsInFurrowFoliar } from "../utils/data";

export default function Home() {
  const pdfRef = useRef<HTMLDivElement | null>(null);

  // Crop inputs
  const [seedType, setSeedType] = useState("");
  const [acres, setAcres] = useState("");
  const [seedingRate, setSeedingRate] = useState("");
  const [seedingRateUnit, setSeedingRateUnit] = useState("seeds/acre");
  const [overrideSeeds, setOverrideSeeds] = useState("");

  // Market inputs
  const [marketPrice, setMarketPrice] = useState("");

  // Discounts
  const [dealerDiscount, setDealerDiscount] = useState("");
  const [growerDiscount, setGrowerDiscount] = useState("");

  // Grower/rep
  const [growerName, setGrowerName] = useState("");
  const [repName, setRepName] = useState("");

  // Products
  const [seedProducts, setSeedProducts] = useState(productsSeedTreatment.slice(0, 2));
  const [foliarProducts, setFoliarProducts] = useState(productsInFurrowFoliar.slice(0, 4));

  const [seedResults, setSeedResults] = useState<ProductCalculation[]>([]);
  const [foliarResults, setFoliarResults] = useState<ProductCalculation[]>([]);
  const [totalCostPerAcre, setTotalCostPerAcre] = useState(0);
  const [totalUndiscountedCost, setTotalUndiscountedCost] = useState(0);
  const [totalDiscountedCost, setTotalDiscountedCost] = useState(0);
  const [roi2, setROI2] = useState(0);
  const [roi3, setROI3] = useState(0);
  const [roi4, setROI4] = useState(0);
  const [roi5, setROI5] = useState(0);

  const handleCalculate = () => {
    const seedData = calculateSeedTreatmentData(
      seedType,
      seedProducts,
      acres,
      seedingRate,
      seedingRateUnit,
      overrideSeeds,
      dealerDiscount,
      growerDiscount,
      marketPrice // ✅ Included as 9th argument
    );

    const foliarData = calculateProductData(foliarProducts, acres, dealerDiscount, growerDiscount);

    const totalCost = seedData.reduce((sum, p) => sum + p.costPerAcre, 0) + foliarData.reduce((sum, p) => sum + p.costPerAcre, 0);
    const totalMSRP = seedData.reduce((sum, p) => sum + p.totalMSRP, 0) + foliarData.reduce((sum, p) => sum + p.totalMSRP, 0);
    const totalDiscounted = seedData.reduce((sum, p) => sum + p.totalDiscountedCost, 0) + foliarData.reduce((sum, p) => sum + p.totalDiscountedCost, 0);

    const roi = calculateROI(totalCost, marketPrice);

    setSeedResults(seedData);
    setFoliarResults(foliarData);
    setTotalCostPerAcre(totalCost);
    setTotalUndiscountedCost(totalMSRP);
    setTotalDiscountedCost(totalDiscounted);
    setROI2(roi.roi2x);
    setROI3(roi.roi3x);
    setROI4(roi.roi4x);
    setROI5(roi.roi5x);
  };

  return (
    <main className="min-h-screen bg-white text-black px-4 py-6 font-[Open_Sans]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <img src="/legendlogo1.png" alt="Legend Seed Logo" className="h-12" />
          <img src="/ymslogo3.png" alt="YMS Logo" className="h-12" />
        </div>

        <h1 className="text-2xl font-[Montserrat] text-blue-700 mb-4">YMS Program Calculator</h1>

        <CalculatorForm
          seedType={seedType}
          setSeedType={setSeedType}
          acres={acres}
          setAcres={setAcres}
          seedingRate={seedingRate}
          setSeedingRate={setSeedingRate}
          seedingRateUnit={seedingRateUnit}
          setSeedingRateUnit={setSeedingRateUnit}
          overrideSeeds={overrideSeeds}
          setOverrideSeeds={setOverrideSeeds}
          marketPrice={marketPrice}
          setMarketPrice={setMarketPrice}
          dealerDiscount={dealerDiscount}
          setDealerDiscount={setDealerDiscount}
          growerDiscount={growerDiscount}
          setGrowerDiscount={setGrowerDiscount}
          growerName={growerName}
          setGrowerName={setGrowerName}
          repName={repName}
          setRepName={setRepName}
          seedProducts={seedProducts}
          setSeedProducts={setSeedProducts}
          foliarProducts={foliarProducts}
          setFoliarProducts={setFoliarProducts}
          handleCalculate={handleCalculate}
        />

        <div className="my-8">
          <ResultsDisplay
            seedTreatmentResults={seedResults}
            inFurrowFoliarResults={foliarResults}
            totalCostPerAcre={totalCostPerAcre}
            totalUndiscountedCost={totalUndiscountedCost}
            totalDiscountedCost={totalDiscountedCost}
            roi2={roi2}
            roi3={roi3}
            roi4={roi4}
            roi5={roi5}
          />
        </div>

        <div className="text-center mb-4">
          <PDFDownloadButton targetRef={pdfRef} />
        </div>

        <div className="hidden">
          <PDFResults
            growerName={growerName}
            repName={repName}
            seedTreatmentResults={seedResults}
            inFurrowFoliarResults={foliarResults}
            totalCostPerAcre={totalCostPerAcre}
            totalUndiscountedCost={totalUndiscountedCost}
            totalDiscountedCost={totalDiscountedCost}
            roi={{
              roi2x: roi2 ?? 0,
              roi3x: roi3 ?? 0,
              roi4x: roi4 ?? 0,
              roi5x: roi5 ?? 0,
            }}
          />
        </div>
      </div>
    </main>
  );
}
