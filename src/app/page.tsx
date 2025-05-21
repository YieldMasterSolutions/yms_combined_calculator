// src/app/page.tsx

"use client";

import React, { useRef, useState } from "react";
import CalculatorForm from "../components/CalculatorForm";
import ResultsDisplay from "../components/ResultsDisplay";
import PDFDownloadButton from "../components/PDFDownloadButton";
import PDFResults from "../components/PDFResults";
import {
  ProductCalculation,
  calculateSeedTreatmentData,
  calculateAllFoliarProductCosts,
  calculateROI,
} from "../utils/calculations";
import {
  productsSeedTreatment,
  productsInFurrowFoliar,
  seedTypes,
} from "../utils/data";

export default function Home() {
  const pdfRef = useRef<HTMLDivElement | null>(null);

  const [seedType, setSeedType] = useState("");
  const [acres, setAcres] = useState("");
  const [seedingRate, setSeedingRate] = useState("");
  const [seedingRateUnit, setSeedingRateUnit] = useState("seeds/acre");
  const [overrideSeeds, setOverrideSeeds] = useState("");
  const [marketPrice, setMarketPrice] = useState("");
  const [dealerDiscount, setDealerDiscount] = useState("");
  const [growerDiscount, setGrowerDiscount] = useState("");
  const [growerName, setGrowerName] = useState("");
  const [repName, setRepName] = useState("");

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
    const selectedSeedProducts = seedProducts.map((product) => ({
      product,
      applicationMethod: "Seed Treatment",
    }));

    const selectedFoliarProducts = foliarProducts.map((product) => ({
      product,
      applicationMethod: product.ApplicationMethod || "In-Furrow",
    }));

    const seedData = calculateSeedTreatmentData(
      seedType,
      parseFloat(acres),
      parseFloat(seedingRate),
      seedingRateUnit,
      overrideSeeds ? parseFloat(overrideSeeds) : undefined,
      parseFloat(dealerDiscount) || 0,
      parseFloat(growerDiscount) || 0,
      selectedSeedProducts,
      undefined
    );

    const foliarData = calculateAllFoliarProductCosts(
      parseFloat(acres),
      parseFloat(dealerDiscount) || 0,
      parseFloat(growerDiscount) || 0,
      selectedFoliarProducts
    );

    const totalCost = seedData.reduce((sum, p) => sum + p.individualCostPerAcre, 0) +
                      foliarData.reduce((sum, p) => sum + p.individualCostPerAcre, 0);

    const totalMSRP = seedData.reduce((sum, p) => sum + p.originalTotalCostToGrower, 0) +
                      foliarData.reduce((sum, p) => sum + p.originalTotalCostToGrower, 0);

    const totalDiscounted = seedData.reduce((sum, p) => sum + p.discountedTotalCostToGrower, 0) +
                            foliarData.reduce((sum, p) => sum + p.discountedTotalCostToGrower, 0);

    const roi = calculateROI(totalCost, parseFloat(marketPrice), "bu/acre");

    setSeedResults(seedData);
    setFoliarResults(foliarData);
    setTotalCostPerAcre(totalCost);
    setTotalUndiscountedCost(totalMSRP);
    setTotalDiscountedCost(totalDiscounted);
    setROI2(roi.roi2to1);
    setROI3(roi.roi3to1);
    setROI4(roi.roi4to1);
    setROI5(roi.roi5to1);
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
              roi2x: roi2,
              roi3x: roi3,
              roi4x: roi4,
              roi5x: roi5,
            }}
          />
        </div>
      </div>
    </main>
  );
}
