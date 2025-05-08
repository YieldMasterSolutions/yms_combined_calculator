// src/app/page.tsx
"use client";

import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Image from "next/image";

import CalculatorForm from "../components/CalculatorForm";
import ResultsDisplay from "../components/ResultsDisplay";
import { calculateProductCosts, ProductCalculation } from "../utils/calculations";
import { seedTypes, productsSeedTreatment, productsInFurrowFoliar } from "../utils/data";

export default function CombinedCalculator() {
  const [seedType, setSeedType] = useState("");
  const [acres, setAcres] = useState("");
  const [seedingRate, setSeedingRate] = useState("");
  const [seedingRateUnit, setSeedingRateUnit] = useState("seeds/acre");
  const [overrideSeeds, setOverrideSeeds] = useState("");
  const [marketPrice, setMarketPrice] = useState("");
  const [dealerDiscount, setDealerDiscount] = useState("");
  const [growerDiscount, setGrowerDiscount] = useState("");

  const [seedResults, setSeedResults] = useState<ProductCalculation[]>([]);
  const [foliarResults, setFoliarResults] = useState<ProductCalculation[]>([]);
  const [totalCostPerAcre, setTotalCostPerAcre] = useState(0);
  const [totalUndiscountedCost, setTotalUndiscountedCost] = useState(0);
  const [totalDiscountedCost, setTotalDiscountedCost] = useState(0);
  const [breakevenYield, setBreakevenYield] = useState<number | null>(null);
  const [roi2, setRoi2] = useState<number | null>(null);
  const [roi3, setRoi3] = useState<number | null>(null);
  const [roi4, setRoi4] = useState<number | null>(null);
  const [roi5, setRoi5] = useState<number | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!seedType || !acres || !seedingRate || !marketPrice) {
      console.error("Missing required inputs.");
      return;
    }

    const acresNum = parseFloat(acres);
    const dealer = dealerDiscount ? parseFloat(dealerDiscount) : 0;
    const grower = growerDiscount ? parseFloat(growerDiscount) : 0;

    const getSeedsPerPound = (): number => {
      if (overrideSeeds) return parseFloat(overrideSeeds);
      const seedEntry = seedTypes.find((s) => s["Seed Type"] === seedType);
      return seedEntry ? parseFloat(seedEntry["Seeds/lb"]) : 0;
    };

    const getLbsPerUnit = (): number => {
      const seedEntry = seedTypes.find((s) => s["Seed Type"] === seedType);
      return seedEntry ? seedEntry["Lbs/Unit"] : 0;
    };

    const spp = getSeedsPerPound();
    const lpu = getLbsPerUnit();

    const seedResultSet = calculateProductCosts(
      acresNum,
      productsSeedTreatment,
      dealer,
      grower,
      seedType,
      spp,
      lpu
    );

    const foliarResultSet = calculateProductCosts(
      acresNum,
      productsInFurrowFoliar,
      dealer,
      grower,
      seedType,
      spp,
      lpu
    );

    setSeedResults(seedResultSet.productsData);
    setFoliarResults(foliarResultSet.productsData);

    const totalCost = seedResultSet.totalCostPerAcre + foliarResultSet.totalCostPerAcre;
    const totalUndiscounted = seedResultSet.totalUndiscountedCost + foliarResultSet.totalUndiscountedCost;
    const totalDiscounted = seedResultSet.totalDiscountedCost + foliarResultSet.totalDiscountedCost;

    setTotalCostPerAcre(totalCost);
    setTotalUndiscountedCost(totalUndiscounted);
    setTotalDiscountedCost(totalDiscounted);

    const mp = parseFloat(marketPrice);
    setBreakevenYield(mp > 0 ? totalCost / mp : null);
    setRoi2(mp > 0 ? (2 * totalCost) / mp : null);
    setRoi3(mp > 0 ? (3 * totalCost) / mp : null);
    setRoi4(mp > 0 ? (4 * totalCost) / mp : null);
    setRoi5(mp > 0 ? (5 * totalCost) / mp : null);
  };

  const downloadPDF = () => {
    if (!resultRef.current) return;
    html2canvas(resultRef.current, { scale: window.devicePixelRatio || 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);
      pdf.save("YieldMaster_CombinedCalculation.pdf");
    });
  };

  return (
    <div
      className="max-w-5xl mx-auto p-6 space-y-8 bg-gradient-to-b from-zinc-950 to-zinc-900 text-white min-h-screen"
      ref={resultRef}
    >
      <div className="text-center mb-6">
        <Image src="/YMSLogo5.png" alt="YMS Logo" width={160} height={80} className="mx-auto mb-4" />
        <h1 className="text-5xl font-bold text-yellow-400 tracking-tight">YieldMaster Solutions</h1>
        <p className="text-3xl font-bold text-zinc-400">YMS Combined Calculator</p>
      </div>
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
        seedTypes={seedTypes}
        productsSeedTreatment={productsSeedTreatment}
        productsInFurrow={productsInFurrowFoliar}
        onSubmit={handleFormSubmit}
      />
      <div className="text-center">
        <button onClick={handleFormSubmit} className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-full text-lg">
          Calculate Combined Results
        </button>
      </div>
      {(seedResults.length > 0 || foliarResults.length > 0) && (
        <ResultsDisplay
          productsData={[...seedResults, ...foliarResults]}
          totalCostPerAcre={totalCostPerAcre}
          totalUndiscountedCost={totalUndiscountedCost}
          totalDiscountedCost={totalDiscountedCost}
          breakevenYield={breakevenYield}
          roi2={roi2}
          roi3={roi3}
          roi4={roi4}
          roi5={roi5}
          cropPriceUnit={marketPrice ? "/acre" : ""}
        />
      )}
      <div className="text-center">
        <button onClick={downloadPDF} className="bg-green-700 hover:bg-green-600 px-6 py-2 rounded-full text-white">
          Download Combined PDF
        </button>
      </div>
    </div>
  );
}