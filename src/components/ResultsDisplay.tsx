// src/components/ResultsDisplay.tsx

import React from "react";
import { SeedTreatmentResult, FoliarProductResult, ROIResults } from "../utils/calculations";
import { formatNumber } from "../utils/formatNumber";

interface ResultsDisplayProps {
  seedResults: SeedTreatmentResult[];
  inFurrowFoliarResults: FoliarProductResult[];
  roi: ROIResults;
  programCost: number;
  cropPriceUnit: string;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  seedResults,
  inFurrowFoliarResults,
  roi,
  programCost,
  cropPriceUnit,
}) => {
  return (
    <div className="space-y-6">
      {/* Seed Treatment Section */}
      {seedResults.map((result, index) => (
        <div
          key={index}
          className="border border-yellow-400 rounded-lg p-4 bg-white shadow"
        >
          <h2 className="text-lg font-semibold text-blue-700 mb-2">
            Seed Treatment: {result.productName}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-yellow-500 font-semibold">Total Seeds to be Treated:</span> {formatNumber(result.totalSeeds)}</div>
            <div><span className="text-yellow-500 font-semibold">Total Weight of Seeds:</span> {formatNumber(result.totalWeight)} lbs</div>
            <div><span className="text-yellow-500 font-semibold">Total Units of Seed:</span> {formatNumber(result.totalUnits)}</div>
            <div><span className="text-yellow-500 font-semibold">Seeds per Unit:</span> {formatNumber(result.seedsPerUnit)}</div>
            <div><span className="text-yellow-500 font-semibold">Application Rate:</span> {formatNumber(result.applicationRate)} {result.unit}</div>
            <div><span className="text-yellow-500 font-semibold">Total Amount of Product Needed:</span> {formatNumber(result.totalProductNeeded)} {result.unit}</div>
            <div><span className="text-yellow-500 font-semibold">Total Product Units to Order:</span> {result.totalProductUnits}</div>
            <div><span className="text-yellow-500 font-semibold">Product Cost per Ounce:</span> ${formatNumber(result.costPerOz)}</div>
            <div><span className="text-yellow-500 font-semibold">Total Cost to Grower (MSRP):</span> ${formatNumber(result.totalCostMSRP)}</div>
            <div><span className="text-yellow-500 font-semibold">Total Discounted Cost to Grower:</span> ${formatNumber(result.totalCostDiscounted)}</div>
            <div><span className="text-yellow-500 font-semibold">Product Cost per Unit of Seed:</span> ${formatNumber(result.costPerUnitSeed)}</div>
            <div><span className="text-yellow-500 font-semibold">Individual Cost of Seed Treatment per Acre:</span> ${formatNumber(result.costPerAcre)}</div>
          </div>
        </div>
      ))}

      {/* In-Furrow/Foliar Products Section */}
      {inFurrowFoliarResults.map((result, index) => (
        <div
          key={index}
          className="border border-yellow-400 rounded-lg p-4 bg-white shadow"
        >
          <h2 className="text-lg font-semibold text-blue-700 mb-2">
            {result.productName} ({result.applicationType})
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-yellow-500 font-semibold">Application Rate:</span> {formatNumber(result.applicationRate)} {result.unit}</div>
            <div><span className="text-yellow-500 font-semibold">Total Amount of Product Needed:</span> {formatNumber(result.totalProductNeeded)} {result.unit}</div>
            <div><span className="text-yellow-500 font-semibold">Total Product Units to Order:</span> {result.totalProductUnits}</div>
            <div><span className="text-yellow-500 font-semibold">Product Cost per Ounce:</span> ${formatNumber(result.costPerOz)}</div>
            <div><span className="text-yellow-500 font-semibold">Total Cost to Grower (MSRP):</span> ${formatNumber(result.totalCostMSRP)}</div>
            <div><span className="text-yellow-500 font-semibold">Total Discounted Cost to Grower:</span> ${formatNumber(result.totalCostDiscounted)}</div>
            <div><span className="text-yellow-500 font-semibold">Individual Cost per Acre:</span> ${formatNumber(result.costPerAcre)}</div>
          </div>
        </div>
      ))}

      {/* Program Cost & ROI Section */}
      <div className="border border-blue-500 rounded-lg p-4 bg-white shadow">
        <h2 className="text-lg font-semibold text-blue-700 mb-2">Total Program Summary</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-yellow-500 font-semibold">Total Program Cost per Acre:</span> ${formatNumber(programCost)}</div>
          <div><span className="text-yellow-500 font-semibold">Breakeven Yield per Acre:</span> {formatNumber(roi.Breakeven)} {cropPriceUnit}/acre</div>
          <div><span className="text-yellow-500 font-semibold">Yield Needed for 2:1 ROI:</span> {formatNumber(roi["2:1 ROI"])} {cropPriceUnit}/acre</div>
          <div><span className="text-yellow-500 font-semibold">Yield Needed for 3:1 ROI:</span> {formatNumber(roi["3:1 ROI"])} {cropPriceUnit}/acre</div>
          <div><span className="text-yellow-500 font-semibold">Yield Needed for 4:1 ROI:</span> {formatNumber(roi["4:1 ROI"])} {cropPriceUnit}/acre</div>
          <div><span className="text-yellow-500 font-semibold">Yield Needed for 5:1 ROI:</span> {formatNumber(roi["5:1 ROI"])} {cropPriceUnit}/acre</div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
