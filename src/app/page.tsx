"use client";

import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import CalculatorForm from "../components/CalculatorForm";
import ResultsDisplay from "../components/ResultsDisplay";
import { calculateProductCosts } from "@/utils/calculations";
import { seedTypes, productsSeedTreatment, productsInFurrowFoliar } from "@/utils/data";
import type { Product } from "@/utils/types";

export default function CombinedCalculator() {
  const [selectedSeedType, setSelectedSeedType] = useState("");
  const [selectedSeedTreatment, setSelectedSeedTreatment] = useState("");
  const [selectedInFurrowProduct, setSelectedInFurrowProduct] = useState("");

  const [acres, setAcres] = useState("");
  const [seedingRate, setSeedingRate] = useState("");
  const [seedingRateUnit, setSeedingRateUnit] = useState("seeds/acre");
  const [overrideSeeds, setOverrideSeeds] = useState("");
  const [marketPrice, setMarketPrice] = useState("");
  const [dealerDiscount, setDealerDiscount] = useState("");
  const [growerDiscount, setGrowerDiscount] = useState("");

  const [results, setResults] = useState<ReturnType<typeof calculateProductCosts> | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSeedType || !acres || !seedingRate || !marketPrice) {
      console.error("Missing required inputs.");
      return;
    }

    const acresNum = parseFloat(acres);
    const cropPrice = parseFloat(marketPrice);
    const dealer = dealerDiscount ? parseFloat(dealerDiscount) : 0;
    const grower = growerDiscount ? parseFloat(growerDiscount) : 0;

    const selectedProducts: Product[] = [];

    const seedProduct = productsSeedTreatment.find((p) => p["Product Name"] === selectedSeedTreatment);
    if (seedProduct) selectedProducts.push(seedProduct);

    const inFurrowProduct = productsInFurrowFoliar.find((p) => p["Product Name"] === selectedInFurrowProduct);
    if (inFurrowProduct) selectedProducts.push(inFurrowProduct);

    const result = calculateProductCosts(acresNum, selectedProducts, dealer, grower, cropPrice);
    setResults(result);
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
        <h1 className="text-5xl font-bold text-yellow-400 tracking-tight">YieldMaster Solutions</h1>
        <p className="text-3xl font-bold text-zinc-400">YMS Combined Calculator</p>
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
        dealerDiscount={dealerDiscount}
        setDealerDiscount={setDealerDiscount}
        growerDiscount={growerDiscount}
        setGrowerDiscount={setGrowerDiscount}
        selectedSeedTreatment={selectedSeedTreatment}
        setSelectedSeedTreatment={setSelectedSeedTreatment}
        selectedInFurrowProduct={selectedInFurrowProduct}
        setSelectedInFurrowProduct={setSelectedInFurrowProduct}
        seedTypes={seedTypes}
        productsSeedTreatment={productsSeedTreatment}
        productsInFurrow={productsInFurrowFoliar}
        onSubmit={handleFormSubmit}
      />

      <div className="text-center">
        <button
          onClick={handleFormSubmit}
          className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-full text-lg"
        >
          Calculate Combined Results
        </button>
      </div>

      {results && (
        <ResultsDisplay
          productsData={results.productsData}
          totalCostPerAcre={results.totalCostPerAcre}
          totalUndiscountedCost={results.totalUndiscountedCost}
          totalDiscountedCost={results.totalDiscountedCost}
          breakevenYield={results.breakevenYield}
          roi2={results.roi2}
          roi3={results.roi3}
          roi4={results.roi4}
          roi5={results.roi5}
          cropPriceUnit="bu"
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
