// src/app/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import CalculatorForm from "../components/CalculatorForm";
import ResultsDisplay from "../components/ResultsDisplay";
import {
  seedTypes,
  productsSeedTreatment,
  productsInFurrowFoliar,
} from "../utils/data";
import {
  ProductCalculation,
  calculateSeedTreatmentData,
  calculateAllFoliarProductCosts,
  calculateTotalProgramCost,
  calculateROI,
} from "../utils/calculations";

export default function Home() {
  const [selectedSeedType, setSelectedSeedType] = useState("");
  const [acres, setAcres] = useState("");
  const [seedingRate, setSeedingRate] = useState("");
  const [seedingRateUnit, setSeedingRateUnit] = useState("seeds/acre");
  const [overrideSeeds, setOverrideSeeds] = useState("");
  const [marketPrice, setMarketPrice] = useState("");
  const [cropPriceUnit, setCropPriceUnit] = useState("bu");
  const [dealerDiscount, setDealerDiscount] = useState("");
  const [growerDiscount, setGrowerDiscount] = useState("");

  const [seedTreatments, setSeedTreatments] = useState(["", ""]);
  const [seedTreatmentRateOverrides, setSeedTreatmentRateOverrides] = useState(["", ""]);

  const [inFurrowFoliarProducts, setInFurrowFoliarProducts] = useState([
    { name: "", applicationType: "" },
    { name: "", applicationType: "" },
    { name: "", applicationType: "" },
    { name: "", applicationType: "" },
  ]);
  const [foliarRateOverrides, setFoliarRateOverrides] = useState(["", "", "", ""]);

  const [seedTreatmentResults, setSeedTreatmentResults] = useState<ProductCalculation[]>([]);
  const [inFurrowFoliarResults, setInFurrowFoliarResults] = useState<ProductCalculation[]>([]);
  const [programCost, setProgramCost] = useState<number | null>(null);
  const [roi, setRoi] = useState<ReturnType<typeof calculateROI> | null>(null);
  const [totalUndiscountedCost, setTotalUndiscountedCost] = useState(0);
  const [totalDiscountedCost, setTotalDiscountedCost] = useState(0);
  const [totalCostPerAcre, setTotalCostPerAcre] = useState(0);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const acresNum = parseFloat(acres);
    const seedingRateNum = parseFloat(seedingRate);
    const overrideSeedsNum = overrideSeeds ? parseFloat(overrideSeeds) : undefined;
    const dealerDiscountNum = parseFloat(dealerDiscount) || 0;
    const growerDiscountNum = parseFloat(growerDiscount) || 0;
    const marketPriceNum = marketPrice ? parseFloat(marketPrice) : undefined;

    const selectedSeedData = seedTypes.find((s) => s["Seed Type"] === selectedSeedType);
    if (!selectedSeedData) return;

    const seedResults = seedTreatments.map((productName, index) => {
      const product = productsSeedTreatment.find((p) => p["Product Name"] === productName);
      if (!product) return null;

      const rateOverride = seedTreatmentRateOverrides[index]
        ? parseFloat(seedTreatmentRateOverrides[index])
        : undefined;

      return calculateSeedTreatmentData(
        acresNum,
        seedingRateNum,
        seedingRateUnit,
        selectedSeedData,
        overrideSeedsNum,
        product,
        dealerDiscountNum,
        growerDiscountNum,
        rateOverride
      );
    }).filter((r): r is ProductCalculation => r !== null);

    setSeedTreatmentResults(seedResults);

    const selectedFoliarProducts = inFurrowFoliarProducts.map((p, index) => {
      const matchedProduct = productsInFurrowFoliar.find((prod) => prod["Product Name"] === p.name);
      if (matchedProduct) {
        return {
          ...matchedProduct,
          _override: foliarRateOverrides[index]
            ? parseFloat(foliarRateOverrides[index])
            : undefined,
          applicationType: p.applicationType,
        };
      }
      return null;
}).filter((p): p is NonNullable<typeof p> => p !== null);
    const { productsData: foliarResults } = calculateAllFoliarProductCosts(
      acresNum,
      selectedFoliarProducts,
      dealerDiscountNum,
      growerDiscountNum
    );

    setInFurrowFoliarResults(foliarResults);

    const totalCost = calculateTotalProgramCost(seedResults, foliarResults);
    setProgramCost(totalCost);

    const totalUndiscounted = seedResults.reduce((acc, item) => acc + item.originalTotalCostToGrower, 0)
      + foliarResults.reduce((acc, item) => acc + item.originalTotalCostToGrower, 0);

    const totalDiscounted = seedResults.reduce((acc, item) => acc + item.discountedTotalCostToGrower, 0)
      + foliarResults.reduce((acc, item) => acc + item.discountedTotalCostToGrower, 0);

    const costPerAcre = seedResults.reduce((acc, item) => acc + item.individualCostPerAcre, 0)
      + foliarResults.reduce((acc, item) => acc + item.individualCostPerAcre, 0);

    setTotalUndiscountedCost(totalUndiscounted);
    setTotalDiscountedCost(totalDiscounted);
    setTotalCostPerAcre(costPerAcre);

    if (marketPriceNum !== undefined && !isNaN(totalCost)) {
      const roiResults = calculateROI(totalCost, marketPriceNum);
      setRoi(roiResults);
    } else {
      setRoi(null);
    }
  };

  return (
    <main className="max-w-5xl mx-auto p-6 text-white">
      <div className="text-center mb-10">
        <Image src="/yms-logo.png" alt="YMS Logo" width={200} height={100} />
        <h1 className="text-3xl font-bold text-yellow-400">YMS Combined Calculator</h1>
        <h2 className="text-lg text-tan-300 mt-2">Biological Program Calculator</h2>
      </div>

      <CalculatorForm
        selectedSeedType={selectedSeedType}
        setSelectedSeedType={setSelectedSeedType}
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
        cropPriceUnit={cropPriceUnit}
        setCropPriceUnit={setCropPriceUnit}
        dealerDiscount={dealerDiscount}
        setDealerDiscount={setDealerDiscount}
        growerDiscount={growerDiscount}
        setGrowerDiscount={setGrowerDiscount}
        seedTreatments={seedTreatments}
        setSeedTreatments={setSeedTreatments}
        seedTreatmentRateOverrides={seedTreatmentRateOverrides}
        setSeedTreatmentRateOverrides={setSeedTreatmentRateOverrides}
        inFurrowFoliarProducts={inFurrowFoliarProducts}
        setInFurrowFoliarProducts={setInFurrowFoliarProducts}
        foliarRateOverrides={foliarRateOverrides}
        setFoliarRateOverrides={setFoliarRateOverrides}
        onSubmit={handleFormSubmit}
        seedTypes={seedTypes}
        productsSeedTreatment={productsSeedTreatment}
        productsInFurrow={productsInFurrowFoliar}
      />

      {programCost !== null && (
        <ResultsDisplay
          seedTreatmentResults={seedTreatmentResults}
          inFurrowFoliarResults={inFurrowFoliarResults}
          programCost={programCost}
          roi={roi}
          cropPriceUnit={cropPriceUnit}
          totalUndiscountedCost={totalUndiscountedCost}
          totalDiscountedCost={totalDiscountedCost}
          totalCostPerAcre={totalCostPerAcre}
        />
      )}
    </main>
  );
}
