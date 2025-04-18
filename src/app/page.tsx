// src/app/page.tsx
"use client";

import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Image from "next/image";

import CalculatorForm from "../components/CalculatorForm";
import ResultsDisplay from "../components/ResultsDisplay";
import {
  seedTypes,
  productsSeedTreatment,
  productsInFurrowFoliar,
} from "@/utils/data";
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
  const [seedTreatmentRateOverrides, setSeedTreatmentRateOverrides] = useState<string[]>(["", ""]);

  const [inFurrowFoliarProducts, setInFurrowFoliarProducts] = useState<{ name: string; applicationType: string }[]>(
    Array(4).fill({ name: "", applicationType: "" })
  );
  const [foliarRateOverrides, setFoliarRateOverrides] = useState<string[]>(["", "", "", ""]);

  const [seedTreatmentResults, setSeedTreatmentResults] = useState<ProductCalculation[]>([]);
  const [foliarResults, setFoliarResults] = useState<ProductCalculation[]>([]);
  const [totalProgramCost, setTotalProgramCost] = useState({
    totalUndiscounted: 0,
    totalDiscounted: 0,
    costPerAcre: 0,
  });

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
    if (!seedTypeObj || isNaN(acresNum) || isNaN(rate)) {
      console.error("Missing or invalid required values");
      return;
    }

    const seedTreatmentObjs = seedTreatments
      .map((name) => productsSeedTreatment.find((p) => p["Product Name"] === name))
      .filter(Boolean) as Product[];

    const seedTreatmentOutputs = seedTreatmentObjs.map((product, i) =>
      calculateSeedTreatmentData(
        acresNum,
        rate,
        seedingRateUnit,
        seedTypeObj,
        override,
        product,
        dealer,
        grower,
        seedTreatmentRateOverrides[i] ? parseFloat(seedTreatmentRateOverrides[i]) : undefined
      )
    );

    const selectedFoliarObjs = inFurrowFoliarProducts
      .map((p, i) => {
        const base = productsInFurrowFoliar.find((prod) => prod["Product Name"] === p.name);
        return base
          ? {
              ...base,
              "Product Name": `${base["Product Name"]} (${p.applicationType})`,
              _override: foliarRateOverrides[i] ? parseFloat(foliarRateOverrides[i]) : undefined,
            }
          : null;
      })
      .filter(Boolean) as (Product & { _override?: number })[];

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
      !isNaN(cropPrice) && cropPrice > 0
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

    html2canvas(resultRef.current, {
      scale: 2,
      useCORS: true,
      scrollY: -window.scrollY,
      backgroundColor: "#111",
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 20;
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = margin;

      pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - margin * 2;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight + margin * 2;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight - margin * 2;
      }

      pdf.save("YieldMaster_CombinedCalculation.pdf");
    });
  };

  return (
    <div
      className="max-w-5xl mx-auto p-6 space-y-8 bg-gradient-to-b from-zinc-950 to-zinc-900 text-white min-h-screen"
      ref={resultRef}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex-shrink-0">
          <Image
            src="/yms_combined_calculator/yms-logo.png"
            alt="YMS Logo"
            width={160}
            height={160}
            priority
          />
        </div>
        <div className="flex-grow text-center">
          <h1 className="text-5xl font-bold text-yellow-400 tracking-tight">YieldMaster Solutions</h1>
          <p className="text-2xl font-semibold text-[#D2B48C]">Biological Program Calculator</p>
        </div>
        <div className="w-[160px]" />
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
        seedTypes={seedTypes}
        productsSeedTreatment={productsSeedTreatment}
        productsInFurrow={productsInFurrowFoliar}
        onSubmit={handleFormSubmit}
      />

      {seedTreatmentResults.length > 0 || foliarResults.length > 0 ? (
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
      ) : null}

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
