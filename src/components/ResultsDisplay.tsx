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

  const renderProductResult = (result: ProductCalculation) => (
    <div className="mb-6 border border-zinc-700 bg-zinc-900 p-4 rounded">
      <h3 className="text-lg font-bold text-yellow-400 mb-2">{result.productName}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="min-h-[48px] px-4 py-2">
          <div className="text-yellow-600 font-semibold">Application Rate</div>
          <div className="text-white">{formatNumber(result.applicationRate ?? 0)} {result.rateUnit}</div>
        </div>
        <div className="min-h-[48px] px-4 py-2">
          <div className="text-yellow-600 font-semibold">Total Amount of Product Needed</div>
          <div className="text-white">{formatNumber(result.totalProductNeeded ?? 0)} {String(result.rateUnit ?? "").split("/")[0]}</div>
        </div>
        <div className="min-h-[48px] px-4 py-2">
          <div className="text-yellow-600 font-semibold">Total Product Units to Order</div>
          <div className="text-white">{result.totalProductUnits} – {result.productPackageString}</div>
        </div>
        <div className="min-h-[48px] px-4 py-2">
          <div className="text-yellow-600 font-semibold">Product Cost per Ounce</div>
          <div className="text-white">${formatNumber(result.productCostPerOz ?? 0)}</div>
        </div>
        <div className="min-h-[48px] px-4 py-2">
          <div className="text-yellow-600 font-semibold">Total Cost to Grower (MSRP)</div>
          <div className="text-white">${formatNumber(result.totalCostToGrower ?? 0)}</div>
        </div>
        <div className="min-h-[48px] px-4 py-2">
          <div className="text-yellow-600 font-semibold">Total Discounted Cost to Grower</div>
          <div className="text-white">${formatNumber(result.discountedCostToGrower ?? 0)}</div>
        </div>
        <div className="min-h-[48px] px-4 py-2">
          <div className="text-yellow-600 font-semibold">Individual Cost per Acre</div>
          <div className="text-white">${formatNumber(result.individualCostPerAcre ?? 0)}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div ref={resultRef} className="bg-zinc-800 p-6 mt-8 rounded border border-zinc-700 text-white">
      {seedTreatmentResults.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-blue-400 mb-4">Seed Calculations</h2>
          {seedTreatmentResults.map((result, idx) => (
            <div key={idx}>{renderProductResult(result)}</div>
          ))}
        </>
      )}

      {inFurrowFoliarResults.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-blue-400 mb-4">In-Furrow / Foliar Costs</h2>
          {inFurrowFoliarResults.map((result, idx) => (
            <div key={idx}>{renderProductResult(result)}</div>
          ))}
        </>
      )}

      <h2 className="text-xl font-bold text-blue-400 mt-8 mb-2">Total Program Costs</h2>
      <div className="grid grid-cols-2 gap-4 border border-zinc-700 bg-zinc-900 p-4 rounded">
        <div className="min-h-[48px] px-4 py-2">
          <div className="text-yellow-600 font-semibold">Undiscounted Total Cost</div>
          <div className="text-white">${formatNumber(totalUndiscountedCost)}</div>
        </div>
        <div className="min-h-[48px] px-4 py-2">
          <div className="text-yellow-600 font-semibold">Total Discounted Cost</div>
          <div className="text-white">${formatNumber(totalDiscountedCost)}</div>
        </div>
        <div className="min-h-[48px] px-4 py-2 col-span-2">
          <div className="text-yellow-600 font-semibold">Program Cost per Acre</div>
          <div className="text-white">${formatNumber(totalCostPerAcre)}</div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-blue-400 mt-8 mb-2">ROI Calculations</h2>
      <div className="grid grid-cols-5 gap-4 border border-zinc-700 bg-zinc-900 p-4 rounded text-center">
        <div className="min-h-[48px] px-4 py-2">
          <div className="text-yellow-600 font-semibold">Breakeven</div>
          <div className="text-white">{breakevenYield !== null ? formatNumber(breakevenYield) : "N/A"} {cropPriceUnit}</div>
        </div>
        <div className="min-h-[48px] px-4 py-2">
          <div className="text-yellow-600 font-semibold">ROI 2:1</div>
          <div className="text-white">{roi2 !== null ? formatNumber(roi2) : "N/A"} {cropPriceUnit}</div>
        </div>
        <div className="min-h-[48px] px-4 py-2">
          <div className="text-yellow-600 font-semibold">ROI 3:1</div>
          <div className="text-white">{roi3 !== null ? formatNumber(roi3) : "N/A"} {cropPriceUnit}</div>
        </div>
        <div className="min-h-[48px] px-4 py-2">
          <div className="text-yellow-600 font-semibold">ROI 4:1</div>
          <div className="text-white">{roi4 !== null ? formatNumber(roi4) : "N/A"} {cropPriceUnit}</div>
        </div>
        <div className="min-h-[48px] px-4 py-2">
          <div className="text-yellow-600 font-semibold">ROI 5:1</div>
          <div className="text-white">{roi5 !== null ? formatNumber(roi5) : "N/A"} {cropPriceUnit}</div>
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
