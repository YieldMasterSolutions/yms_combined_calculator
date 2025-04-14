// src/app/page.tsx
"use client";

import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import CalculatorForm from "../components/CalculatorForm";
import ResultsDisplay from "../components/ResultsDisplay";
import { calculateProductCosts } from "@/utils/calculations";
import { seedTypes, productsSeedTreatment, productsInFurrowFoliar } from "@/utils/data";
import type { Product, SeedType } from "@/utils/types";

export default function CombinedCalculator() {
  const [selectedSeedType, setSelectedSeedType] = useState<string>("");
  const [selectedSeedTreatment, setSelectedSeedTreatment] = useState<string>("");
  const [selectedInFurrowProduct, setSelectedInFurrowProduct] = useState<string>("");

  const [acres, setAcres] = useState<string>("");
  const [seedingRate, setSeedingRate] = useState<string>("");
  const [seedingRateUnit, setSeedingRateUnit] = useState<string>("seeds/acre");
  const [overrideSeeds, setOverrideSeeds] = useState<string>("");

  const [marketPrice, setMarketPrice] = useState<string>("");
  const [dealerDiscount, setDealerDiscount] = useState<string>("");
  const [growerDiscount, setGrowerDiscount] = useState<string>("");

  const [inFurrowFoliarResults, setInFurrowFoliarResults] = useState<ReturnType<typeof calculateProductCosts> | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSeedType || !acres || !seedingRate || !marketPrice) {
      console.error("Missing required inputs.");
      return;
    }

    const acresNum = parseFloat(acres);
    const dealer = dealerDiscount ? parseFloat(dealerDiscount) : 0;
    const grower = growerDiscount ? parseFloat(growerDiscount) : 0;

    // Look up selected products
    const selectedInFurrowProductObj = productsInFurrowFoliar.find(
      (p) => p["Product Name"] === selectedInFurrowProduct
    );
    const selectedSeedTreatmentObj = productsSeedTreatment.find(
      (p) => p["Product Name"] === selectedSeedTreatment
    );

    // Only include valid products
    const selectedProducts: Product[] = [selectedSeedTreatmentObj, selectedInFurrowProductObj].filter(Boolean) as Product[];

    const productCosts = calculateProductCosts(acresNum, selectedProducts, dealer, grower);
    setInFurrowFoliarResults(productCosts);
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

      {inFurrowFoliarResults && (
        <ResultsDisplay
          productsData={inFurrowFoliarResults.productsData}
          totalCostPerAcre={inFurrowFoliarResults.totalCostPerAcre}
          totalUndiscountedCost={inFurrowFoliarResults.totalUndiscountedCost}
          totalDiscountedCost={inFurrowFoliarResults.totalDiscountedCost}
          breakevenYield={null}
          roi2={null}
          roi3={null}
          roi4={null}
          roi5={null}
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
