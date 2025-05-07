// src/components/ResultsDisplay.tsx

"use client";

import React from "react";
import { SeedTreatmentResult, FoliarProductResult, ROIResults } from "../utils/calculations";
import formatNumber from "../utils/formatNumber";

interface ResultsDisplayProps {
  seedTreatmentResults: SeedTreatmentResult[];
  inFurrowFoliarResults: FoliarProductResult[];
  roiResults: ROIResults;
  cropPriceUnit: string;
  programCost: number;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  seedTreatmentResults,
  inFurrowFoliarResults,
  roiResults,
  cropPriceUnit,
  programCost,
}) => {
  return (
    <div className="space-y-8 text-sm text-white">
      {seedTreatmentResults.length > 0 && (
        <div>
          <h3 className="text-blue-600 text-lg font-bold mb-2">Seed Treatment Calculations</h3>
          {seedTreatmentResults.map((result, index) => (
            <div key={index} className="border border-gray-600 p-4 grid grid-cols-2 gap-4">
              <div><span className="font-bold text-yellow-400">Product:</span> {result.productName}</div>
              <div><span className="font-bold text-yellow-400">Application Method:</span> {result.applicationMethod}</div>
              <div><span className="font-bold text-yellow-400">Product Form:</span> {result.productForm}</div>
              <div><span className="font-bold text-yellow-400">Application Rate:</span> {result.applicationRate}</div>
              <div><span className="font-bold text-yellow-400">Total Product Needed:</span> {formatNumber(result.totalProductNeeded)} oz</div>
              <div><span className="font-bold text-yellow-400">Total Product Units to Order:</span> {formatNumber(result.totalProductUnits)} – {result.productPackageString}</div>
              <div><span className="font-bold text-yellow-400">Product Cost per oz:</span> ${formatNumber(result.productCostPerOz)}</div>
              <div><span className="font-bold text-yellow-400">Total Cost to Grower (MSRP):</span> ${formatNumber(result.totalCostToGrower)}</div>
              <div><span className="font-bold text-yellow-400">Total Discounted Cost to Grower:</span> ${formatNumber(result.totalDiscountedCostToGrower)}</div>
              <div><span className="font-bold text-yellow-400">Cost per Unit of Treated Seed:</span> ${formatNumber(result.costPerUnitSeed)}</div>
              <div><span className="font-bold text-yellow-400">Cost per Acre:</span> ${formatNumber(result.costPerAcre)}</div>
            </div>
          ))}
        </div>
      )}

      {inFurrowFoliarResults.length > 0 && (
        <div>
          <h3 className="text-blue-600 text-lg font-bold mb-2">In-Furrow / Foliar Product Costs</h3>
          {inFurrowFoliarResults.map((result, index) => (
            <div key={index} className="border border-gray-600 p-4 grid grid-cols-2 gap-4">
              <div><span className="font-bold text-yellow-400">Product:</span> {result.productName}</div>
              <div><span className="font-bold text-yellow-400">Application Method:</span> {result.applicationMethod}</div>
              <div><span className="font-bold text-yellow-400">Application Rate:</span> {result.applicationRate}</div>
              <div><span className="font-bold text-yellow-400">Total Product Needed:</span> {formatNumber(result.totalProductNeeded)}</div>
              <div><span className="font-bold text-yellow-400">Total Product Units to Order:</span> {formatNumber(result.totalProductUnits)} – {result.productPackageString}</div>
              <div><span className="font-bold text-yellow-400">Product Cost per oz:</span> ${formatNumber(result.productCostPerOz)}</div>
              <div><span className="font-bold text-yellow-400">Total Cost to Grower (MSRP):</span> ${formatNumber(result.totalCostToGrower)}</div>
              <div><span className="font-bold text-yellow-400">Total Discounted Cost to Grower:</span> ${formatNumber(result.totalDiscountedCostToGrower)}</div>
              <div><span className="font-bold text-yellow-400">Cost per Acre:</span> ${formatNumber(result.individualCostPerAcre)}</div>
            </div>
          ))}
        </div>
      )}

      <div>
        <h3 className="text-blue-600 text-lg font-bold mb-2">Total Program Cost</h3>
        <div className="border border-gray-600 p-4">
          <div><span className="font-bold text-yellow-400">Total Program Cost per Acre:</span> ${formatNumber(programCost)}</div>
        </div>
      </div>

      <div>
        <h3 className="text-blue-600 text-lg font-bold mb-2">Breakeven ROI Calculation</h3>
        <div className="border border-gray-600 p-4 grid grid-cols-2 gap-4">
          <div><span className="font-bold text-yellow-400">Breakeven Yield per Acre:</span> {formatNumber(roiResults.breakeven)} {cropPriceUnit}/acre</div>
          <div><span className="font-bold text-yellow-400">Yield Needed for 2:1 ROI:</span> {formatNumber(roiResults.roi2)} {cropPriceUnit}/acre</div>
          <div><span className="font-bold text-yellow-400">Yield Needed for 3:1 ROI:</span> {formatNumber(roiResults.roi3)} {cropPriceUnit}/acre</div>
          <div><span className="font-bold text-yellow-400">Yield Needed for 4:1 ROI:</span> {formatNumber(roiResults.roi4)} {cropPriceUnit}/acre</div>
          <div><span className="font-bold text-yellow-400">Yield Needed for 5:1 ROI:</span> {formatNumber(roiResults.roi5)} {cropPriceUnit}/acre</div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
