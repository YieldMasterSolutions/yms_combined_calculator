// src/app/page.tsx
"use client";

import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import CalculatorForm from "../components/CalculatorForm";
import ResultsDisplay from "../components/ResultsDisplay";
import { calculateProductCosts, ProductCalculation } from "../utils/calculations";
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
  const [growerName, setGrowerName] = useState("");
  const [dealerName, setDealerName] = useState("");
  const [selectedSeedTreatmentProducts, setSelectedSeedTreatmentProducts] = useState<
    { product: ProductData; applicationMethod: string }[]
  >([]);
  const [selectedFoliarProducts, setSelectedFoliarProducts] = useState<
    { product: ProductData; applicationMethod: string }[]
  >([]);
  const [seedTreatmentResults, setSeedTreatmentResults] = useState<ProductCalculation[]>([]);
  const [inFurrowFoliarResults, setInFurrowFoliarResults] = useState<ProductCalculation[]>([]);
  const [programCost, setProgramCost] = useState<number>(0);
  const [roi, setRoi] = useState({
    breakeven: 0,
    roi2: 0,
    roi3: 0,
    roi4: 0,
    roi5: 0,
  });

  const resultRef = useRef(null);

  const handleCalculate = () => {
    const {
      productsData,
      totalCostPerAcre,
      totalUndiscountedCost,
      totalDiscountedCost,
    } = calculateProductCosts(
      seedType, // ✅ string passed directly
      Number(seedingRate),
      seedingRateUnit,
      Number(acres),
      overrideSeeds ? Number(overrideSeeds) : undefined,
      seedsPerUnitOverride ? Number(seedsPerUnitOverride) : undefined,
      dealerDiscount ? Number(dealerDiscount) : undefined,
      growerDiscount ? Number(growerDiscount) : undefined,
      marketPrice ? Number(marketPrice) : undefined
    );

    setSeedTreatmentResults(productsData);
    setProgramCost(totalCostPerAcre);
    setRoi({
      breakeven: 0,
      roi2: 0,
      roi3: 0,
      roi4: 0,
      roi5: 0,
    });
  };

  const downloadPDF = async () => {
    const htmlEl = document.documentElement;
    const wasDark = htmlEl.classList.contains("dark");
    if (wasDark) htmlEl.classList.remove("dark");

    const input = document.getElementById("pdf-container");
    if (!input) return;

    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "pt", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("yms-calculator.pdf");

    if (wasDark) htmlEl.classList.add("dark");
  };

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <main className="min-h-screen px-4 py-6 md:px-12 lg:px-32 bg-[var(--yms-body-bg)] text-[var(--yms-body-fg)]">
      <button
        onClick={toggleDarkMode}
        className="mb-4 rounded border px-4 py-2 bg-gray-700 text-white dark:bg-gray-200 dark:text-black"
      >
        Switch to Dark Mode
      </button>

      <div className="text-center mb-4">
        <img src="/yms_combined_calculator/YMSLogo5.PNG" alt="YMS Logo" className="mx-auto h-16" />
        <h1 className="text-3xl font-bold text-[var(--yms-yellow)]">YieldMaster Solutions</h1>
        <h2 className="text-xl font-semibold text-[var(--yms-body-fg)]">Product Calculator</h2>
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
        growerName={growerName}
        setGrowerName={setGrowerName}
        dealerName={dealerName}
        setDealerName={setDealerName}
        selectedSeedTreatmentProducts={selectedSeedTreatmentProducts}
        setSelectedSeedTreatmentProducts={setSelectedSeedTreatmentProducts}
        selectedFoliarProducts={selectedFoliarProducts}
        setSelectedFoliarProducts={setSelectedFoliarProducts}
        handleCalculate={handleCalculate}
      />

      <div id="pdf-container" ref={resultRef}>
        <ResultsDisplay
          seedTreatmentResults={seedTreatmentResults}
          inFurrowFoliarResults={inFurrowFoliarResults}
          programCost={programCost}
          roi={roi}
        />
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={downloadPDF}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
        >
          Download Combined PDF
        </button>
      </div>
    </main>
  );
}
