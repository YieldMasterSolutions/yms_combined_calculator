"use client";
import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import CalculatorForm from "../components/CalculatorForm";
import ResultsDisplay from "../components/ResultsDisplay";
import { seedTypes, productsSeedTreatment, productsInFurrowFoliar } from "@/utils/data";
import {
  calculateSeedTreatmentData,
  calculateAllFoliarProductCosts,
  ProductCalculation,
  Product,
} from "@/utils/calculations";

export default function CombinedCalculator() {
  const [selectedSeedType, setSelectedSeedType] = useState("");
  const [acres, setAcres] = useState("");
  const [seedingRate, setSeedingRate] = useState("");
  const [seedingRateUnit, setSeedingRateUnit] = useState("seeds/acre");
  const [overrideSeeds, setOverrideSeeds] = useState("");
  const [marketPrice, setMarketPrice] = useState("");
  const [cropPriceUnit, setCropPriceUnit] = useState("bu");
  const [dealerDiscount, setDealerDiscount] = useState("");
  const [growerDiscount, setGrowerDiscount] = useState("");

  const [seedTreatments, setSeedTreatments] = useState<string[]>(["", ""]);
  const [inFurrowFoliarProducts, setInFurrowFoliarProducts] = useState<
    { name: string; applicationType: string }[]
  >([
    { name: "", applicationType: "" },
    { name: "", applicationType: "" },
    { name: "", applicationType: "" },
    { name: "", applicationType: "" },
  ]);

  const [seedTreatmentResults, setSeedTreatmentResults] = useState<ProductCalculation[]>([]);
  const [foliarResults, setFoliarResults] = useState<ProductCalculation[]>([]);
  const [totalProgramCost, setTotalProgramCost] = useState({
    totalUndiscounted: 0,
    totalDiscounted: 0,
    costPerAcre: 0,
  });

  // ✅ Fix: allow number | null for ROI values
  const [roi, setRoi] = useState<{
    breakeven: number | null;
    roi2: number | null;
    roi3: number | null;
    roi4: number | null;
    roi5: number | null;
  }>({
    breakeven: null,
    roi2: null,
    roi3: null,
    roi4: null,
    roi5: null,
  });

  const resultRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const acresNum = parseFloat(acres);
    const rate = parseFloat(seedingRate);
    const cropPrice = parseFloat(marketPrice);
    const dealer = dealerDiscount ? parseFloat(dealerDiscount) : 0;
    const grower = growerDiscount ? parseFloat(growerDiscount) : 0;
    const override = overrideSeeds ? parseFloat(overrideSeeds) : undefined;

    const seedTypeObj = seedTypes.find((s) => s["Seed Type"] === selectedSeedType);
    if (!seedTypeObj || isNaN(acresNum) || isNaN(cropPrice) || isNaN(rate)) {
      console.error("Missing or invalid required values");
      return;
    }

    const seedTreatmentObjs = seedTreatments
      .filter(Boolean)
      .map((name) => productsSeedTreatment.find((p) => p["Product Name"] === name))
      .filter(Boolean) as Product[];

    const seedTreatmentOutputs = seedTreatmentObjs.map((product) =>
      calculateSeedTreatmentData(
        acresNum,
        rate,
        seedingRateUnit,
        seedTypeObj,
        override,
        product,
        dealer,
        grower
      )
    );

    const selectedFoliarObjs = inFurrowFoliarProducts
      .filter((p) => p.name)
      .map((p) => {
        const base = productsInFurrowFoliar.find((prod) => prod["Product Name"] === p.name);
        return base
          ? { ...base, "Product Name": `${base["Product Name"]} (${p.applicationType})` }
          : null;
      })
      .filter(Boolean) as Product[];

    const foliarOutput = calculateAllFoliarProductCosts(acresNum, selectedFoliarObjs, dealer, grower);

    setSeedTreatmentResults(seedTreatmentOutputs);
    setFoliarResults(foliarOutput.productsData);

    const totalUndiscounted =
      seedTreatmentOutputs.reduce((sum, p) => sum + p.originalTotalCostToGrower, 0) +
      foliarOutput.totalUndiscountedCost;
    const totalDiscounted =
      seedTreatmentOutputs.reduce((sum, p) => sum + p.discountedTotalCostToGrower, 0) +
      foliarOutput.totalDiscountedCost;
    const totalPerAcre =
      seedTreatmentOutputs.reduce((sum, p) => sum + p.individualCostPerAcre, 0) +
      foliarOutput.totalCostPerAcre;

    setTotalProgramCost({
      totalUndiscounted,
      totalDiscounted,
      costPerAcre: totalPerAcre,
    });

    setRoi(
      cropPrice > 0
        ? {
            breakeven: totalPerAcre / cropPrice,
            roi2: (2 * totalPerAcre) / cropPrice,
            roi3: (3 * totalPerAcre) / cropPrice,
            roi4: (4 * totalPerAcre) / cropPrice,
            roi5: (5 * totalPerAcre) / cropPrice,
          }
        : {
            breakeven: null,
            roi2: null,
            roi3: null,
            roi4: null,
            roi5: null,
          }
    );
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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <img src="/yms-logo.png" alt="YMS Logo" className="h-16 w-auto" />
          <div>
            <h1 className="text-5xl font-bold text-yellow-400 tracking-tight">YieldMaster Solutions</h1>
            <p className="text-2xl font-semibold text-[#D2B48C]">Biological Program Calculator</p>
          </div>
        </div>
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
        inFurrowFoliarProducts={inFurrowFoliarProducts}
        setInFurrowFoliarProducts={setInFurrowFoliarProducts}
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

      {(seedTreatmentResults.length || foliarResults.length) > 0 && (
        <ResultsDisplay
          seedTreatmentResults={seedTreatmentResults}
          inFurrowFoliarResults={foliarResults}
          totalCostPerAcre={totalProgramCost.costPerAcre}
          totalUndiscountedCost={totalProgramCost.totalUndiscounted}
          totalDiscountedCost={totalProgramCost.totalDiscounted}
          breakevenYield={roi.breakeven}
          roi2={roi.roi2}
          roi3={roi.roi3}
          roi4={roi.roi4}
          roi5={roi.roi5}
          cropPriceUnit={cropPriceUnit}
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
