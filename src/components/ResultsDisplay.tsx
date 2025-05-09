// src/components/ResultsDisplay.tsx
"use client";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { formatNumber } from "../utils/formatNumber";
import { ProductCalculation } from "../utils/calculations";

interface ResultsDisplayProps {
  seedTreatmentResults: ProductCalculation[];
  inFurrowFoliarResults: ProductCalculation[];
  totalCostPerAcre: number;
  totalUndiscountedCost: number;
  totalDiscountedCost: number;
  breakevenYield: number | null;
  roi2: number | null;
  roi3: number | null;
  roi4: number | null;
  roi5: number | null;
  cropPriceUnit: string;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  seedTreatmentResults,
  inFurrowFoliarResults,
  totalCostPerAcre,
  totalUndiscountedCost,
  totalDiscountedCost,
  breakevenYield,
  roi2,
  roi3,
  roi4,
  roi5,
  cropPriceUnit,
}) => {
  const resultRef = useRef<HTMLDivElement>(null);

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
      pdf.save("YieldMaster_Calculation.pdf");
    });
  };

  const renderSeedCalcBlock = (result: ProductCalculation) => (
    <div className="mb-6 border border-zinc-700 bg-zinc-900 p-4 rounded">
      <h3 className="text-lg font-bold text-yellow-400 mb-4">Seed Treatment Calculations</h3>
      <div className="grid grid-cols-2 gap-4 text-white">
        <div><span className="text-yellow-500 font-semibold">Total Number of Seeds to be Treated:</span> {formatNumber(result.totalSeeds ?? 0)}</div>
        <div><span className="text-yellow-500 font-semibold">Total Weight of Seeds to be Treated:</span> {formatNumber(result.totalWeight ?? 0)} lbs</div>
        <div><span className="text-yellow-500 font-semibold">Total Number of Units to be Treated:</span> {formatNumber(result.unitsToBeTreated ?? 0)}</div>
        <div><span className="text-yellow-500 font-semibold">Number of Seeds per Unit:</span> {formatNumber(result.seedsPerUnit ?? 0)}</div>
        <div><span className="text-yellow-500 font-semibold">Application Rate:</span> {formatNumber(result.applicationRate ?? 0)} {result.rateUnit}</div>
        <div><span className="text-yellow-500 font-semibold">Total Amount of Product Needed:</span> {formatNumber(result.totalProductNeeded ?? 0)} oz</div>
        <div><span className="text-yellow-500 font-semibold">Total Number of Product Packages:</span> {Math.ceil(result.totalProductUnits ?? 0)} {result.productPackageString?.split(" – ")[1] || ""}</div>
        <div><span className="text-yellow-500 font-semibold">Product Cost per Package:</span> ${formatNumber(result.productCostPerPackage ?? 0)}</div>
        <div><span className="text-yellow-500 font-semibold">Product Cost per Ounce:</span> ${formatNumber(result.productCostPerOz ?? 0)}</div>
        <div><span className="text-yellow-500 font-semibold">Total Cost to the Grower:</span> ${formatNumber(result.totalCostToGrower ?? 0)}</div>
        <div><span className="text-yellow-500 font-semibold">Total Discounted Cost to Grower:</span> ${formatNumber(result.discountedCostToGrower ?? 0)}</div>
        <div><span className="text-yellow-500 font-semibold">Product Cost per Unit of Treated Seed:</span> ${formatNumber(result.productCostPerUnitSeed ?? 0)}</div>
        <div><span className="text-yellow-500 font-semibold">Product Cost per Acre:</span> ${formatNumber(result.individualCostPerAcre ?? 0)}</div>
      </div>
    </div>
  );

  const renderProductResult = (result: ProductCalculation) => (
    <div className="mb-6 border border-zinc-700 bg-zinc-900 p-4 rounded">
      <h3 className="text-lg font-bold text-yellow-400 mb-2">{result.productName}</h3>
      <div className="grid grid-cols-2 gap-4 text-white">
        <div><span className="text-yellow-500 font-semibold">Application Rate:</span> {formatNumber(result.applicationRate ?? 0)} {result.rateUnit}</div>
        <div><span className="text-yellow-500 font-semibold">Total Amount of Product Needed:</span> {formatNumber(result.totalProductNeeded ?? 0)} {String(result.rateUnit ?? "").split("/")[0]}</div>
        <div><span className="text-yellow-500 font-semibold">Total Product Units to Order:</span> {Math.ceil(result.totalProductUnits ?? 0)} – {result.productPackageString}</div>
        <div><span className="text-yellow-500 font-semibold">Product Cost per Ounce:</span> ${formatNumber(result.productCostPerOz ?? 0)}</div>
        <div><span className="text-yellow-500 font-semibold">Total Cost to Grower (MSRP):</span> ${formatNumber(result.totalCostToGrower ?? 0)}</div>
        <div><span className="text-yellow-500 font-semibold">Total Discounted Cost to Grower:</span> ${formatNumber(result.discountedCostToGrower ?? 0)}</div>
        <div><span className="text-yellow-500 font-semibold">Individual Cost per Acre:</span> ${formatNumber(result.individualCostPerAcre ?? 0)}</div>
      </div>
    </div>
  );

  return (
    <div ref={resultRef} className="bg-zinc-800 p-6 mt-8 rounded border border-zinc-700 text-white">
      {seedTreatmentResults.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-blue-400 mb-4">Seed Calculations</h2>
          {seedTreatmentResults.map((result, idx) => (
            <div key={idx}>{renderSeedCalcBlock(result)}</div>
          ))}
        </>
      )}

      {seedTreatmentResults.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-blue-400 mb-4">Seed Treatment Costs</h2>
          {seedTreatmentResults.map((result, idx) => (
            <div key={idx}>{renderProductResult(result)}</div>
          ))}
        </>
      )}

      {inFurrowFoliarResults.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-blue-400 mb-4">In-Furrow / Foliar Product Costs</h2>
          {inFurrowFoliarResults.map((result, idx) => (
            <div key={idx}>{renderProductResult(result)}</div>
          ))}
        </>
      )}

      <h2 className="text-xl font-bold text-blue-400 mt-8 mb-2">Total Program Costs</h2>
      <div className="grid grid-cols-2 gap-4 border border-zinc-700 bg-zinc-900 p-4 rounded">
        <div><span className="text-yellow-500 font-semibold">Undiscounted Total Cost:</span> ${formatNumber(totalUndiscountedCost)}</div>
        <div><span className="text-yellow-500 font-semibold">Total Discounted Cost:</span> ${formatNumber(totalDiscountedCost)}</div>
        <div className="col-span-2"><span className="text-yellow-500 font-semibold">Program Cost per Acre:</span> ${formatNumber(totalCostPerAcre)}</div>
      </div>

      <h2 className="text-xl font-bold text-blue-400 mt-8 mb-2">ROI Calculations</h2>
      <div className="grid grid-cols-5 gap-4 border border-zinc-700 bg-zinc-900 p-4 rounded text-center">
        <div><span className="text-yellow-500 font-semibold">Breakeven</span><div>{breakevenYield !== null ? formatNumber(breakevenYield) : "N/A"} {cropPriceUnit}</div></div>
        <div><span className="text-yellow-500 font-semibold">ROI 2:1</span><div>{roi2 !== null ? formatNumber(roi2) : "N/A"} {cropPriceUnit}</div></div>
        <div><span className="text-yellow-500 font-semibold">ROI 3:1</span><div>{roi3 !== null ? formatNumber(roi3) : "N/A"} {cropPriceUnit}</div></div>
        <div><span className="text-yellow-500 font-semibold">ROI 4:1</span><div>{roi4 !== null ? formatNumber(roi4) : "N/A"} {cropPriceUnit}</div></div>
        <div><span className="text-yellow-500 font-semibold">ROI 5:1</span><div>{roi5 !== null ? formatNumber(roi5) : "N/A"} {cropPriceUnit}</div></div>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={downloadPDF}
          className="bg-green-700 hover:bg-green-600 px-6 py-2 rounded-full text-white"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
