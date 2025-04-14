// src/components/ResultsDisplay.tsx
"use client";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import type { ProductCalculation } from "../utils/calculations";

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

  const unitLabel = cropPriceUnit ? `${cropPriceUnit}/acre` : "";

  return (
    <div ref={resultRef} className="mt-6 space-y-6">
      {/* Seed Treatment Section */}
      {seedTreatmentResults.map((p, i) => (
        <div key={i} className="bg-gray-900 border border-gray-700 rounded-xl p-4">
          <strong className="block text-xl font-bold text-yellow-400 mb-2">{p.productName}</strong>
          <p>Total Number of Seeds to be Treated = {p.totalSeeds?.toLocaleString()}</p>
          <p>Total Weight of Seeds to be Treated = {p.totalSeedWeight?.toLocaleString()} lbs</p>
          <p>Total Number of Units to be Treated = {p.totalUnits?.toLocaleString()}</p>
          <p>Number of Seeds per Unit = {p.seedsPerUnit?.toLocaleString()}</p>
          <p>Application Rate = {p.applicationRate ?? 0} oz/unit</p>
          <p>Total Amount of Product Needed = {p.totalProductNeeded?.toFixed(2)} oz</p>
          <p>Total Product Units to Order = {p.packagesNeeded} – {p.productPackageString}</p>
          <p>Product Cost per Ounce = ${p.costPerUnit?.toFixed(2)}</p>
          <p>Total Cost to Grower (MSRP) = ${p.originalTotalCostToGrower.toFixed(2)}</p>
          <p>Total Discounted Cost to Grower = ${p.discountedTotalCostToGrower.toFixed(2)}</p>
          <p>Product Cost per Unit of Treated Seed = ${p.costPerUnitOfSeed?.toFixed(4)}</p>
          <p>Individual Cost of Seed Treatment per Acre = ${p.individualCostPerAcre.toFixed(2)}</p>
        </div>
      ))}

      {/* In-Furrow / Foliar Product Section */}
      {inFurrowFoliarResults.map((p, i) => (
        <div key={i} className="bg-gray-900 border border-gray-700 rounded-xl p-4">
          <strong className="block text-xl font-bold text-yellow-400 mb-2">{p.productName}</strong>
          <p>Total Product Units to Order = {p.packagesNeeded} – {p.productPackageString}</p>
          <p>Total Cost to Grower (MSRP) = ${p.originalTotalCostToGrower.toFixed(2)}</p>
          <p>Total Discounted Cost to Grower = ${p.discountedTotalCostToGrower.toFixed(2)}</p>
          <p>Individual Cost of Product per Acre = ${p.individualCostPerAcre.toFixed(2)}</p>
        </div>
      ))}

      {/* Total Program Cost Summary */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
        <strong className="block text-2xl font-bold text-yellow-400 mb-1">Total YMS Biological Program Cost</strong>
        <p>Undiscounted Total Cost = ${totalUndiscountedCost.toFixed(2)}</p>
        <p>Total Discounted Total Cost = ${totalDiscountedCost.toFixed(2)}</p>
        <p>Total Program Cost per Acre = ${totalCostPerAcre.toFixed(2)}</p>
      </div>

      {/* ROI Breakdown */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
        <strong className="block text-2xl font-bold text-yellow-400 mb-1">Breakeven ROI Calculation</strong>
        <p>Breakeven Yield per Acre = {breakevenYield?.toFixed(2) ?? "N/A"} {unitLabel}</p>
        <p>ROI Yield for 2:1 Investment = {roi2?.toFixed(2) ?? "N/A"} {unitLabel}</p>
        <p>ROI Yield for 3:1 Investment = {roi3?.toFixed(2) ?? "N/A"} {unitLabel}</p>
        <p>ROI Yield for 4:1 Investment = {roi4?.toFixed(2) ?? "N/A"} {unitLabel}</p>
        <p>ROI Yield for 5:1 Investment = {roi5?.toFixed(2) ?? "N/A"} {unitLabel}</p>
      </div>

      {/* Download PDF */}
      <div className="text-center my-4">
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
