// src/app/page.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import CalculatorForm from "../components/CalculatorForm";
import ResultsDisplay from "../components/ResultsDisplay";
import {
  calculateProductData,
  ProductCalculation,
} from "../utils/calculations";
import {
  seedTypes,
  productsSeedTreatment,
  productsInFurrowFoliar,
  ProductData,
} from "../utils/data";

export default function CombinedCalculator() {
  const [seedType, setSeedType] = useState("");
  const [acres, setAcres] = useState("");
  const [seedingRate, setSeedingRate] = useState("");
  const [seedingRateUnit, setSeedingRateUnit] = useState("seeds/acre");
  const [overrideSeeds, setOverrideSeeds] = useState("");
  const [seedsPerUnitOverride, setSeedsPerUnitOverride] = useState("");
  const [marketPrice, setMarketPrice] = useState("");
  const [marketPriceUnit, setMarketPriceUnit] = useState("$/acre");
  const [dealerDiscount, setDealerDiscount] = useState("");
  const [growerDiscount, setGrowerDiscount] = useState("");
  const [dealerName, setDealerName] = useState("");
  const [growerName, setGrowerName] = useState("");

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

  const [selectedSeedTreatmentProducts, setSelectedSeedTreatmentProducts] = useState(
    Array(2).fill({ product: {} as ProductData, applicationMethod: "" })
  );
  const [selectedFoliarProducts, setSelectedFoliarProducts] = useState(
    Array(4).fill({ product: {} as ProductData, applicationMethod: "" })
  );

  const resultRef = useRef<HTMLDivElement>(null);

  const handleProductChange = (
    index: number,
    productName: string,
    type: "seed" | "foliar"
  ) => {
    const target =
      type === "seed"
        ? [...selectedSeedTreatmentProducts]
        : [...selectedFoliarProducts];
    const match = [...productsSeedTreatment, ...productsInFurrowFoliar].find(
      (p) => p["Product Name"] === productName
    );
    if (match) target[index] = { ...target[index], product: match };
    if (type === "seed") {
      setSelectedSeedTreatmentProducts(target);
    } else {
      setSelectedFoliarProducts(target);
    }
  };

  const handleAppTypeChange = (
    index: number,
    method: string,
    type: "seed" | "foliar"
  ) => {
    const target =
      type === "seed"
        ? [...selectedSeedTreatmentProducts]
        : [...selectedFoliarProducts];
    target[index] = { ...target[index], applicationMethod: method };
    if (type === "seed") {
      setSelectedSeedTreatmentProducts(target);
    } else {
      setSelectedFoliarProducts(target);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!seedType || !acres || !seedingRate || !marketPrice) return;

    const acresNum = parseFloat(acres);
    const dealer = dealerDiscount ? parseFloat(dealerDiscount) : 0;
    const grower = growerDiscount ? parseFloat(growerDiscount) : 0;
    const sRate = parseFloat(seedingRate);

    const seedEntry = seedTypes.find((s) => s["Seed Type"] === seedType);
    const spp = overrideSeeds
      ? parseFloat(overrideSeeds)
      : seedEntry
      ? parseFloat(seedEntry["Seeds/lb"])
      : 0;
    const lpu = seedEntry ? seedEntry["Lbs/Unit"] : 0;

    const selectedSeedProducts = selectedSeedTreatmentProducts
      .filter((p) => p.product && p.product["Product Name"])
      .map((p) => p.product);

    const selectedFoliarProductsFiltered = selectedFoliarProducts
      .filter(
        (p) =>
          p.product &&
          p.product["Product Name"] &&
          (p.applicationMethod === "In-Furrow" ||
            p.applicationMethod === "Foliar")
      )
      .map((p) => p.product);

    const seedResultSetArray = selectedSeedProducts.map((product) =>
      calculateProductData(
        acresNum,
        product,
        dealer,
        grower,
        seedType,
        spp,
        lpu,
        sRate,
        seedingRateUnit
      )
    );

    const foliarResultSetArray = selectedFoliarProductsFiltered.map((product) =>
      calculateProductData(
        acresNum,
        product,
        dealer,
        grower,
        seedType,
        spp,
        lpu,
        sRate,
        seedingRateUnit
      )
    );

    const totalSeedCost = seedResultSetArray.reduce((sum, r) => sum + r.totalCostPerAcre, 0);
    const totalFoliarCost = foliarResultSetArray.reduce((sum, r) => sum + r.totalCostPerAcre, 0);
    const totalUndiscounted = seedResultSetArray.reduce((sum, r) => sum + r.totalUndiscountedCost, 0) +
                              foliarResultSetArray.reduce((sum, r) => sum + r.totalUndiscountedCost, 0);
    const totalDiscounted = seedResultSetArray.reduce((sum, r) => sum + r.totalDiscountedCost, 0) +
                            foliarResultSetArray.reduce((sum, r) => sum + r.totalDiscountedCost, 0);

    setSeedResults(seedResultSetArray);
    setFoliarResults(foliarResultSetArray);
    setTotalCostPerAcre(totalSeedCost + totalFoliarCost);
    setTotalUndiscountedCost(totalUndiscounted);
    setTotalDiscountedCost(totalDiscounted);

    const mp = parseFloat(marketPrice);
    const totalCost = totalSeedCost + totalFoliarCost;
    setBreakevenYield(mp > 0 ? totalCost / mp : null);
    setRoi2(mp > 0 ? (2 * totalCost) / mp : null);
    setRoi3(mp > 0 ? (3 * totalCost) / mp : null);
    setRoi4(mp > 0 ? (4 * totalCost) / mp : null);
    setRoi5(mp > 0 ? (5 * totalCost) / mp : null);
  };

  const downloadPDF = () => {
    if (!resultRef.current) return;
    setTimeout(() => {
      const htmlEl = document.documentElement;
      htmlEl.classList.remove("dark");
      html2canvas(resultRef.current!, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "pt", "a4");
        const pageWidth = pdf.internal.pageSize.getWidth();
        const margin = 20;
        const imgWidth = pageWidth - margin * 2;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);
        pdf.save("YieldMaster_CombinedCalculation.pdf");
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          htmlEl.classList.add("dark");
        }
      });
    }, 200);
  };

  return (
    <div
      className="max-w-5xl mx-auto p-6 space-y-8 bg-gradient-to-b from-zinc-950 to-zinc-900 text-white min-h-screen"
      ref={resultRef}
    >
      <div className="flex justify-between items-center">
        <img
          src="/yms_combined_calculator/YMSLogo5.PNG"
          alt="YMS Logo"
          width="160"
          height="80"
          className="mb-2"
        />
        <img
          src="/yms_combined_calculator/legendlogo1.png"
          alt="Legend Logo"
          width="160"
          height="80"
          className="mb-2"
        />
      </div>

      <div className="text-center mb-6">
        <h1 className="text-5xl font-bold text-yellow-400 tracking-tight">
          YieldMaster Solutions
        </h1>
        <p className="text-3xl font-bold text-zinc-400">Product Calculator</p>
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
        dealerName={dealerName}
        setDealerName={setDealerName}
        growerName={growerName}
        setGrowerName={setGrowerName}
        seedTypes={seedTypes}
        productsSeedTreatment={productsSeedTreatment}
        productsInFurrow={productsInFurrowFoliar}
        selectedSeedTreatmentProducts={selectedSeedTreatmentProducts}
        selectedFoliarProducts={selectedFoliarProducts}
        handleProductChange={handleProductChange}
        handleAppTypeChange={handleAppTypeChange}
        onSubmit={handleFormSubmit}
      />

      {(seedResults.length > 0 || foliarResults.length > 0) && (
        <ResultsDisplay
          seedTreatmentResults={seedResults}
          inFurrowFoliarResults={foliarResults}
          totalCostPerAcre={totalCostPerAcre}
          totalUndiscountedCost={totalUndiscountedCost}
          totalDiscountedCost={totalDiscountedCost}
          breakevenYield={breakevenYield}
          roi2={roi2}
          roi3={roi3}
          roi4={roi4}
          roi5={roi5}
          cropPriceUnit={marketPriceUnit}
        />
      )}

      <div className="text-center">
        <button
          onClick={downloadPDF}
          className="bg-green-700 hover:bg-green-600 px-6 py-2 rounded-full text-white"
        >
          Download Combined PDF
        </button>
      </div>
    </div>
  );
}
