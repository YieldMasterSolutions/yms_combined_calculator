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

  return (
    <div ref={resultRef} className="bg-zinc-800 p-6 mt-8 rounded border border-zinc-700 text-white">
      {seedTreatmentResults.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-blue-400 mb-4">Seed Treatment Calculations</h2>
          {seedTreatmentResults.map((result, idx) => (
            <div key={idx} className="mb-6 border border-zinc-700 bg-zinc-900 p-4 rounded">
              <h3 className="text-lg font-bold text-yellow-400 mb-2">{result.productName}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="min-h-[48px] flex items-center"><span className="text-yellow-600 font-semibold">Application Rate:</span> &nbsp; {result.applicationRate} {result.rateUnit}</div>
                <div className="min-h-[48px] flex items-center"><span className="text-yellow-600 font-semibold">Total Amount of Product Needed:</span> &nbsp; {formatNumber(result.totalProductNeeded)} {String(result.rateUnit).split("/")[0]}</div>
                <div className="min-h-[48px] flex items-center"><span className="text-yellow-600 font-semibold">Total Product Units to Order:</span> &nbsp; {result.totalProductUnits} – {result.productPackageString}</div>
                <div className="min-h-[48px] flex items-center"><span className="text-yellow-600 font-semibold">Product Cost per Ounce:</span> &nbsp; ${formatNumber(result.productCostPerOz)}</div>
                <div className="min-h-[48px] flex items-center"><span className="text-yellow-600 font-semibold">Total Cost to Grower (MSRP):</span> &nbsp; ${formatNumber(result.totalCostToGrower)}</div>
                <div className="min-h-[48px] flex items-center"><span className="text-yellow-600 font-semibold">Total Discounted Cost to Grower:</span> &nbsp; ${formatNumber(result.discountedCostToGrower)}</div>
                <div className="min-h-[48px] flex items-center"><span className="text-yellow-600 font-semibold">Individual Cost per Acre:</span> &nbsp; ${formatNumber(result.costPerAcre)}</div>
              </div>
            </div>
          ))}
        </>
      )}

      {inFurrowFoliarResults.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-blue-400 mb-4">In-Furrow / Foliar Product Costs</h2>
          {inFurrowFoliarResults.map((result, idx) => (
            <div key={idx} className="mb-6 border border-zinc-700 bg-zinc-900 p-4 rounded">
              <h3 className="text-lg font-bold text-yellow-400 mb-2">{result.productName}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="min-h-[48px] flex items-center"><span className="text-yellow-600 font-semibold">Application Rate:</span> &nbsp; {result.applicationRate} {result.rateUnit}</div>
                <div className="min-h-[48px] flex items-center"><span className="text-yellow-600 font-semibold">Total Amount of Product Needed:</span> &nbsp; {formatNumber(result.totalProductNeeded)} {String(result.rateUnit).split("/")[0]}</div>
                <div className="min-h-[48px] flex items-center"><span className="text-yellow-600 font-semibold">Total Product Units to Order:</span> &nbsp; {result.totalProductUnits} – {result.productPackageString}</div>
                <div className="min-h-[48px] flex items-center"><span className="text-yellow-600 font-semibold">Product Cost per Ounce:</span> &nbsp; ${formatNumber(result.productCostPerOz)}</div>
                <div className="min-h-[48px] flex items-center"><span className="text-yellow-600 font-semibold">Total Cost to Grower (MSRP):</span> &nbsp; ${formatNumber(result.totalCostToGrower)}</div>
                <div className="min-h-[48px] flex items-center"><span className="text-yellow-600 font-semibold">Total Discounted Cost to Grower:</span> &nbsp; ${formatNumber(result.discountedCostToGrower)}</div>
                <div className="min-h-[48px] flex items-center"><span className="text-yellow-600 font-semibold">Individual Cost per Acre:</span> &nbsp; ${formatNumber(result.costPerAcre)}</div>
              </div>
            </div>
          ))}
        </>
      )}

      <h2 className="text-xl font-bold text-blue-400 mt-8 mb-2">Total YMS Biological Program Cost</h2>
      <div className="grid grid-cols-2 gap-4 border border-zinc-700 bg-zinc-900 p-4 rounded">
        <div className="min-h-[48px] flex items-center"><span className="text-yellow-600 font-semibold">Undiscounted Total Cost:</span> &nbsp; ${formatNumber(totalUndiscountedCost)}</div>
        <div className="min-h-[48px] flex items-center"><span className="text-yellow-600 font-semibold">Total Discounted Cost:</span> &nbsp; ${formatNumber(totalDiscountedCost)}</div>
        <div className="min-h-[48px] flex items-center col-span-2"><span className="text-yellow-600 font-semibold">Program Cost per Acre:</span> &nbsp; ${formatNumber(totalCostPerAcre)}</div>
      </div>

      <h2 className="text-xl font-bold text-blue-400 mt-8 mb-2">ROI Calculations</h2>
      <div className="grid grid-cols-5 gap-4 border border-zinc-700 bg-zinc-900 p-4 rounded text-center">
        <div className="min-h-[48px] flex flex-col justify-center">
          <span className="text-yellow-600 font-semibold">Breakeven</span>
          {breakevenYield !== null ? formatNumber(breakevenYield) : "N/A"} {cropPriceUnit}
        </div>
        <div className="min-h-[48px] flex flex-col justify-center">
          <span className="text-yellow-600 font-semibold">ROI 2:1</span>
          {roi2 !== null ? formatNumber(roi2) : "N/A"} {cropPriceUnit}
        </div>
        <div className="min-h-[48px] flex flex-col justify-center">
          <span className="text-yellow-600 font-semibold">ROI 3:1</span>
          {roi3 !== null ? formatNumber(roi3) : "N/A"} {cropPriceUnit}
        </div>
        <div className="min-h-[48px] flex flex-col justify-center">
          <span className="text-yellow-600 font-semibold">ROI 4:1</span>
          {roi4 !== null ? formatNumber(roi4) : "N/A"} {cropPriceUnit}
        </div>
        <div className="min-h-[48px] flex flex-col justify-center">
          <span className="text-yellow-600 font-semibold">ROI 5:1</span>
          {roi5 !== null ? formatNumber(roi5) : "N/A"} {cropPriceUnit}
        </div>
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
