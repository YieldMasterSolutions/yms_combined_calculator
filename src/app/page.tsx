// src/app/page.tsx
"use client";

import React, { useState } from "react";
import CalculatorForm from "../components/CalculatorForm";
import ResultsDisplay from "../components/ResultsDisplay";
import {
  seedTypes,
  productsSeedTreatment,
  productsInFurrowFoliar,
} from "../utils/data";
import {
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

  const [seedTreatmentResults, setSeedTreatmentResults] = useState<any[]>([]);
  const [inFurrowFoliarResults, setInFurrowFoliarResults] = useState<any[]>([]);
  const [programCost, setProgramCost] = useState<number | null>(null);
  const [roi, setRoi] = useState<{
    breakeven: number;
    twoToOne: number;
    threeToOne: number;
    fourToOne: number;
    fiveToOne: number;
  } | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const acresNum = parseFloat(acres);
    const seedingRateNum = parseFloat(seedingRate);
    const overrideSeedsNum = overrideSeeds ? parseFloat(overrideSeeds) : undefined;
    const dealerDiscountNum = dealerDiscount ? parseFloat(dealerDiscount) : 0;
    const growerDiscountNum = growerDiscount ? parseFloat(growerDiscount) : 0;
    const marketPriceNum = marketPrice ? parseFloat(marketPrice) : undefined;

    const seedResults = calculateSeedTreatmentData(
      seedTreatments,
      seedTreatmentRateOverrides,
      selectedSeedType,
      seedingRateNum,
      seedingRateUnit,
      acresNum,
      overrideSeedsNum,
      dealerDiscountNum,
      growerDiscountNum
    );
    setSeedTreatmentResults(seedResults);

    const foliarResults = calculateAllFoliarProductCosts(
      inFurrowFoliarProducts,
      foliarRateOverrides,
      acresNum,
      dealerDiscountNum,
      growerDiscountNum
    );
    setInFurrowFoliarResults(foliarResults);

    const totalCost = calculateTotalProgramCost(seedResults, foliarResults);
    setProgramCost(totalCost);

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
        <img src="/yms-logo.png" alt="YMS Logo" className="mx-auto mb-4 w-48" />
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
        />
      )}
    </main>
  );
}
