// src/app/page.tsx

"use client";

import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import CalculatorForm from "../components/CalculatorForm";
import ResultsDisplay from "../components/ResultsDisplay";
import {
  calculateSeedTreatmentData,
  calculateAllFoliarProductCosts,
  calculateROI
} from "../utils/calculations";
import {
  seedTypes,
  productsSeedTreatment,
  productsInFurrowFoliar
} from "../utils/data";
import { ProductData } from "../utils/data";

export default function CombinedCalculator() {
  const [seedType, setSeedType] = useState("");
  const [acres, setAcres] = useState("");
  const [seedingRate, setSeedingRate] = useState("");
  const [seedingRateUnit, setSeedingRateUnit] = useState("seeds/acre");
  const [overrideSeeds, setOverrideSeeds] = useState("");
  const [seedsPerUnitOverride, setSeedsPerUnitOverride] = useState("");
  const [marketPrice, setMarketPrice] = useState("");
  const [marketPriceUnit, setMarketPriceUnit] = useState("");
  const [dealerDiscount, setDealerDiscount] = useState("");
  const [growerDiscount, setGrowerDiscount] = useState("");
  const [growerName, setGrowerName] = useState("");
  const [dealerName, setDealerName] = useState("");

  const [selectedSeedTreatmentProducts, setSelectedSeedTreatmentProducts] = useState([
    { product: productsSeedTreatment[0], applicationMethod: "" }
  ]);

  const [selectedFoliarProducts, setSelectedFoliarProducts] = useState([
    { product: productsInFurrowFoliar[0], applicationMethod: "" }
  ]);

  const resultsRef = useRef<HTMLDivElement>(null);
  const [seedTreatmentResults, setSeedTreatmentResults] = useState<any[]>([]);
  const [inFurrowFoliarResults, setInFurrowFoliarResults] = useState<any[]>([]);
  const [totalProgramCost, setTotalProgramCost] = useState(0);
  const [roi, setRoi] = useState({
    breakevenYield: 0,
    roi2to1: 0,
    roi3to1: 0,
    roi4to1: 0,
    roi5to1: 0,
    unit: ""
  });

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  const handleProductChange = (
    index: number,
    type: "seed" | "foliar",
    product: ProductData
  ) => {
    const updated = type === "seed"
      ? [...selectedSeedTreatmentProducts]
      : [...selectedFoliarProducts];
    updated[index].product = product;
    if (type === "seed") {
      setSelectedSeedTreatmentProducts(updated);
    } else {
      setSelectedFoliarProducts(updated);
    }
  };

  const handleAppTypeChange = (
    index: number,
    type: "seed" | "foliar",
    method: string
  ) => {
    const updated = type === "seed"
      ? [...selectedSeedTreatmentProducts]
      : [...selectedFoliarProducts];
    updated[index].applicationMethod = method;
    if (type === "seed") {
      setSelectedSeedTreatmentProducts(updated);
    } else {
      setSelectedFoliarProducts(updated);
    }
  };

  const generatePDF = async () => {
    const input = resultsRef.current;
    if (!input) return;

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      scrollY: -window.scrollY
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    if (pdfHeight > pdf.internal.pageSize.getHeight()) {
      pdf.addPage();
    }

    pdf.save("YMS_Calculator_Report.pdf");
  };

  const handleSubmit = () => {
    const seedResults = calculateSeedTreatmentData(
      seedType,
      Number(acres),
      Number(seedingRate),
      seedingRateUnit,
      overrideSeeds ? Number(overrideSeeds) : undefined,
      Number(dealerDiscount),
      Number(growerDiscount),
      selectedSeedTreatmentProducts,
      seedsPerUnitOverride ? Number(seedsPerUnitOverride) : undefined
    );

    const foliarResults = calculateAllFoliarProductCosts(
      Number(acres),
      Number(dealerDiscount),
      Number(growerDiscount),
      selectedFoliarProducts
    );

    const allCosts = [...seedResults, ...foliarResults];
    const totalCost = allCosts.reduce((sum, r) => sum + r.individualCostPerAcre, 0);

    const roiResult = marketPrice
      ? calculateROI(totalCost, Number(marketPrice), marketPriceUnit)
      : {
          breakevenYield: 0,
          roi2to1: 0,
          roi3to1: 0,
          roi4to1: 0,
          roi5to1: 0,
          unit: ""
        };

    setSeedTreatmentResults(seedResults);
    setInFurrowFoliarResults(foliarResults);
    setTotalProgramCost(totalCost);
    setRoi(roiResult);
  };

  return (
    <main className="p-4">
      <div className="flex justify-between items-center mb-6">
        <img src="/yms_combined_calculator/YMSLogo5.PNG" alt="YMS Logo" className="h-16" />
        <h1 className="text-2xl font-bold text-center flex-1 -ml-16">Product Calculator</h1>
        <img src="/yms_combined_calculator/LegendSeedsLogo.png" alt="Legend Logo" className="h-16" />
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded border text-sm bg-gray-100 dark:bg-gray-800 dark:text-white"
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
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
        seedTypes={seedTypes}
        productsSeedTreatment={productsSeedTreatment}
        productsInFurrowFoliar={productsInFurrowFoliar}
        handleProductChange={handleProductChange}
        handleAppTypeChange={handleAppTypeChange}
      />

      <div className="mt-6 flex justify-between">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Calculate
        </button>

        <button
          className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600"
          onClick={generatePDF}
        >
          Download PDF
        </button>
      </div>

      <div ref={resultsRef} className="mt-10">
        <ResultsDisplay
          seedTreatmentResults={seedTreatmentResults}
          inFurrowFoliarResults={inFurrowFoliarResults}
          totalProgramCost={totalProgramCost}
          roi={roi}
        />
      </div>
    </main>
  );
}
