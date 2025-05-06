// src/components/ResultsDisplay.tsx

"use client";

import React from "react";
import { SeedTreatmentResult, FoliarProductResult, ROIResults } from "../utils/calculations";
import { formatNumber } from "../utils/formatNumber";

interface ResultsDisplayProps {
  seedResults: SeedTreatmentResult[];
  inFurrowFoliarResults: FoliarProductResult[];
  roi: ROIResults;
  cropPriceUnit: string;
  programCost: number;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  seedResults,
  inFurrowFoliarResults,
  roi,
  cropPriceUnit,
  programCost,
}) => {
  return (
    <div className="space-y-6 text-sm">
      {seedResults.map((result, index) => (
        <div key={index} className="border border-gray-300 rounded-xl p-4 bg-white">
          <h3 className="text-blue-500 font-bold mb-2">Seed Treatment: {result.productName}</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-yellow-600 font-semibold">Total Weight of Seeds to be Treated</div>
            <div>{formatNumber(result.totalSeedWeight)} lbs</div>

            <div className="text-yellow-600 font-semibold">Total Units of Seed to be Treated</div>
            <div>{formatNumber(result.totalUnits)}</div>

            <div className="text-yellow-600 font-semibold">Seeds per Unit</div>
            <div>{formatNumber(result.seedsPerUnit)}</div>

            <div className="text-yellow-600 font-semibold">Application Rate</div>
            <div>{result.applicationRate} oz/unit</div>

            <div className="text-yellow-600 font-semibold">Total Amount of Product Needed</div>
            <div>{formatNumber(result.totalProductNeeded)} oz</div>

            <div className="text-yellow-600 font-semibold">Total Product Units to Order</div>
            <div>{formatNumber(result.totalProductUnits)} – {result.packageSize} {result.packageUnit} {result.packageType}</div>

            <div className="text-yellow-600 font-semibold">Product Cost per Ounce</div>
            <div>${formatNumber(result.costPerOunce)}</div>

            <div className="text-yellow-600 font-semibold">Total Cost to Grower (MSRP)</div>
            <div>${formatNumber(result.totalMsrpCost)}</div>

            <div className="text-yellow-600 font-semibold">Total Discounted Cost to Grower</div>
            <div>${formatNumber(result.totalDiscountedCost)}</div>

            <div className="text-yellow-600 font-semibold">Product Cost per Unit of Treated Seed</div>
            <div>${formatNumber(result.costPerUnitSeed)}</div>

            <div className="text-yellow-600 font-semibold">Individual Cost of Seed Treatment per Acre</div>
            <div>${formatNumber(result.costPerAcre)}</div>
          </div>
        </div>
      ))}

      {inFurrowFoliarResults.map((result, index) => (
        <div key={index} className="border border-gray-300 rounded-xl p-4 bg-white">
          <h3 className="text-blue-500 font-bold mb-2">{result.productName} ({result.applicationType})</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-yellow-600 font-semibold">Application Rate</div>
            <div>{result.applicationRate} fl oz/acre</div>

            <div className="text-yellow-600 font-semibold">Total Amount of Product Needed</div>
            <div>{formatNumber(result.totalProductNeeded)} fl oz</div>

            <div className="text-yellow-600 font-semibold">Total Product Units to Order</div>
            <div>{formatNumber(result.totalProductUnits)} – {result.packageSize} {result.packageUnit} {result.packageType}</div>

            <div className="text-yellow-600 font-semibold">Product Cost per Ounce</div>
            <div>${formatNumber(result.costPerOunce)}</div>

            <div className="text-yellow-600 font-semibold">Total Cost to Grower (MSRP)</div>
            <div>${formatNumber(result.totalMsrpCost)}</div>

            <div className="text-yellow-600 font-semibold">Total Discounted Cost to Grower</div>
            <div>${formatNumber(result.totalDiscountedCost)}</div>

            <div className="text-yellow-600 font-semibold">Individual Cost per Acre</div>
            <div>${formatNumber(result.costPerAcre)}</div>
          </div>
        </div>
      ))}

      <div className="border border-gray-300 rounded-xl p-4 bg-white">
        <h3 className="text-blue-500 font-bold mb-2">Total Program Cost and ROI</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-yellow-600 font-semibold">Total Program Cost per Acre</div>
          <div>${formatNumber(programCost)}</div>

          <div className="text-yellow-600 font-semibold">Breakeven Yield per Acre</div>
          <div>{formatNumber(roi.breakeven)} {cropPriceUnit}/acre</div>

          <div className="text-yellow-600 font-semibold">Yield Needed for 2:1 ROI</div>
          <div>{formatNumber(roi.roi2x)} {cropPriceUnit}/acre</div>

          <div className="text-yellow-600 font-semibold">Yield Needed for 3:1 ROI</div>
          <div>{formatNumber(roi.roi3x)} {cropPriceUnit}/acre</div>

          <div className="text-yellow-600 font-semibold">Yield Needed for 4:1 ROI</div>
          <div>{formatNumber(roi.roi4x)} {cropPriceUnit}/acre</div>

          <div className="text-yellow-600 font-semibold">Yield Needed for 5:1 ROI</div>
          <div>{formatNumber(roi.roi5x)} {cropPriceUnit}/acre</div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
