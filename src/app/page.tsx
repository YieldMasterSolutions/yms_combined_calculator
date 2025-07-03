// src/app/page.tsx

"use client";

import React, { useState } from "react";
import Image from "next/image";
import CalculatorForm from "../components/CalculatorForm";
import ResultsDisplay from "../components/ResultsDisplay";
import PDFDownloadButton from "../components/PDFDownloadButton";
import {
  ProductCalculation,
  calculateSeedTreatmentData,
  calculateAllFoliarProductCosts,
  calculateROI,
} from "../utils/calculations";
import { ProductData } from "../utils/data";

export default function Home() {
  const [seedType, setSeedType] = useState("");
  const [acres, setAcres] = useState("");
  const [seedingRate, setSeedingRate] = useState("");
  const [seedingRateUnit, setSeedingRateUnit] = useState("seeds/acre");
  const [overrideSeeds, setOverrideSeeds] = useState("");
  const [seedsPerUnitOverride, setSeedsPerUnitOverride] = useState("");

  const [marketPrice, setMarketPrice] = useState("");
  const [marketPriceUnit, setMarketPriceUnit] = useState("bushel");
  const [dealerDiscount, setDealerDiscount] = useState("");
  const [growerDiscount, setGrowerDiscount] = useState("");

  const [growerName, setGrowerName] = useState("");
  const [repName, setRepName] = useState("");

  const [seedProducts, setSeedProducts] = useState<(ProductData | null)[]>([null, null]);
  const [foliarProducts, setFoliarProducts] = useState<(ProductData | null)[]>([null, null, null, null]);

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
    const selectedSeedProducts = seedProducts
      .filter((p): p is ProductData => p !== null)
      .map((product) => ({
        product,
        applicationMethod: product["Application Method"] || "Seed Treatment",
      }));

    const selectedFoliarProducts = foliarProducts
      .filter((p): p is ProductData => p !== null)
      .map((product) => ({
        product,
        applicationMethod: product["Application Method"] || "In-Furrow",
      }));

    const parsedAcres = parseFloat(acres || "0");
    const parsedMarketPrice = parseFloat(marketPrice || "0");

    const seedData = calculateSeedTreatmentData({
      seedType,
      acres: parsedAcres,
      seedingRate: parseFloat(seedingRate),
      seedingRateUnit,
      overrideSeeds: overrideSeeds ? parseFloat(overrideSeeds) : undefined,
      dealerDiscount: parseFloat(dealerDiscount || "0"),
      growerDiscount: parseFloat(growerDiscount || "0"),
      selectedSeedProducts,
      seedsPerUnitOverride: seedsPerUnitOverride ? parseFloat(seedsPerUnitOverride) : undefined,
    });

    const foliarData = calculateAllFoliarProductCosts(
      parsedAcres,
      parseFloat(dealerDiscount || "0"),
      parseFloat(growerDiscount || "0"),
      selectedFoliarProducts
    );

    const totalCost =
      seedData.reduce((sum, p) => sum + p.individualCostPerAcre, 0) +
      foliarData.reduce((sum, p) => sum + p.individualCostPerAcre, 0);

    const totalMSRP =
      seedData.reduce((sum, p) => sum + p.originalTotalCostToGrower, 0) +
      foliarData.reduce((sum, p) => sum + p.originalTotalCostToGrower, 0);

    const totalDiscounted =
      seedData.reduce((sum, p) => sum + p.discountedTotalCostToGrower, 0) +
      foliarData.reduce((sum, p) => sum + p.discountedTotalCostToGrower, 0);

    const roi = parsedAcres && parsedMarketPrice
      ? calculateROI(totalCost, parsedMarketPrice, marketPriceUnit)
      : {
          breakevenYield: 0,
          roi2to1: 0,
          roi3to1: 0,
          roi4to1: 0,
          roi5to1: 0,
          unit: marketPriceUnit,
        };

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

  const breakevenYield =
    marketPrice && totalCostPerAcre
      ? totalCostPerAcre / parseFloat(marketPrice)
      : 0;

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-4 py-6 font-[Open_Sans]">
      <div className="max-w-6xl mx-auto relative">
        <div className="flex items-center justify-between mb-6">
          <Image
            src="/yms_combined_calculator/ymslogo3.png"
            alt="YMS Logo"
            width={180}
            height={52}
          />
          <Image
            src="/yms_combined_calculator/legendlogo1.png"
            alt="Legend Seed Logo"
            width={180}
            height={52}
          />
        </div>

        <h1 className="text-3xl font-bold font-[Montserrat] mb-4 text-yellow-600 dark:text-[--yms-tan]">
          Biological Program Calculator
        </h1>

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
          seedsPerUnitOverride={seedsPerUnitOverride}
          setSeedsPerUnitOverride={setSeedsPerUnitOverride}
          marketPrice={marketPrice}
          setMarketPrice={setMarketPrice}
          marketPriceUnit={marketPriceUnit}
          setMarketPriceUnit={setMarketPriceUnit}
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
          onCalculate={handleCalculate}
        />

        {(seedResults.length > 0 || foliarResults.length > 0) && (
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
              marketPriceUnit={marketPriceUnit}
              seedType={seedType}
              breakevenYield={breakevenYield}
            />
          </div>
        )}

        {(seedResults.length > 0 || foliarResults.length > 0) && (
          <div className="text-center mb-4">
            <PDFDownloadButton
              growerName={growerName}
              repName={repName}
              seedTreatmentResults={seedResults}
              inFurrowFoliarResults={foliarResults}
              totalCostPerAcre={totalCostPerAcre}
              totalUndiscountedCost={totalUndiscountedCost}
              totalDiscountedCost={totalDiscountedCost}
              roi={{
                breakevenYield,
                roi2to1: roi2,
                roi3to1: roi3,
                roi4to1: roi4,
                roi5to1: roi5,
              }}
              marketPriceUnit={marketPriceUnit}
              seedType={seedType}
              acres={parseFloat(acres || "0")}
            />
          </div>
        )}
      </div>
    </main>
  );
}
