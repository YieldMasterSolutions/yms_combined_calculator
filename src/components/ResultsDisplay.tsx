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
    <div className="space-y-12">
      {/* Seed Treatment Section */}
      {seedResults.length > 0 && (
        <div>
          <h3 className="text-blue-400 text-lg font-semibold mb-4">Seed Treatment Calculations</h3>
          {seedResults.map((result, index) => (
            <div
              key={index}
              className="border border-gray-600 rounded-lg p-4 grid grid-cols-2 gap-4 bg-gray-900"
            >
              <div className="text-yellow-400 font-semibold">Seed Type</div>
              <div>{result.seedType}</div>
              <div className="text-yellow-400 font-semibold">Total Weight of Seeds</div>
              <div>{formatNumber(result.totalWeight)} lbs</div>
              <div className="text-yellow-400 font-semibold">Total Units to be Treated</div>
              <div>{formatNumber(result.totalUnits)}</div>
              <div className="text-yellow-400 font-semibold">Seeds per Unit</div>
              <div>{formatNumber(result.seedsPerUnit)}</div>
              <div className="text-yellow-400 font-semibold">Application Rate</div>
              <div>{formatNumber(result.applicationRate)} oz/unit</div>
              <div className="text-yellow-400 font-semibold">Total Amount of Product Needed</div>
              <div>{formatNumber(result.totalProductNeeded)} oz</div>
              <div className="text-yellow-400 font-semibold">Total Product Units to Order</div>
              <div>{formatNumber(result.totalProductUnits)} – {result.packageDescription}</div>
              <div className="text-yellow-400 font-semibold">Product Cost per Ounce</div>
              <div>${formatNumber(result.costPerOunce)}</div>
              <div className="text-yellow-400 font-semibold">Total Cost to Grower (MSRP)</div>
              <div>${formatNumber(result.totalCostMSRP)}</div>
              <div className="text-yellow-400 font-semibold">Total Discounted Cost to Grower</div>
              <div>${formatNumber(result.totalCostDiscounted)}</div>
              <div className="text-yellow-400 font-semibold">Product Cost per Unit of Treated Seed</div>
              <div>${formatNumber(result.costPerUnitSeed)}</div>
              <div className="text-yellow-400 font-semibold">Individual Cost of Seed Treatment per Acre</div>
              <div>${formatNumber(result.costPerAcre)}</div>
            </div>
          ))}
        </div>
      )}

      {/* In-Furrow / Foliar Section */}
      {inFurrowFoliarResults.length > 0 && (
        <div>
          <h3 className="text-blue-400 text-lg font-semibold mb-4">In-Furrow / Foliar Product Costs</h3>
          {inFurrowFoliarResults.map((result, index) => (
            <div
              key={index}
              className="border border-gray-600 rounded-lg p-4 grid grid-cols-2 gap-4 bg-gray-900"
            >
              <div className="text-yellow-400 font-semibold">Product Name</div>
              <div>{result.productName} {result.packageDescription}</div>
              <div className="text-yellow-400 font-semibold">Application Rate</div>
              <div>{formatNumber(result.applicationRate)} fl oz/acre</div>
              <div className="text-yellow-400 font-semibold">Total Amount of Product Needed</div>
              <div>{formatNumber(result.totalProductNeeded)} fl oz</div>
              <div className="text-yellow-400 font-semibold">Total Product Units to Order</div>
              <div>{formatNumber(result.totalProductUnits)} – {result.packageDescription}</div>
              <div className="text-yellow-400 font-semibold">Product Cost per Ounce</div>
              <div>${formatNumber(result.costPerOunce)}</div>
              <div className="text-yellow-400 font-semibold">Total Cost to Grower (MSRP)</div>
              <div>${formatNumber(result.totalCostMSRP)}</div>
              <div className="text-yellow-400 font-semibold">Total Discounted Cost to Grower</div>
              <div>${formatNumber(result.totalCostDiscounted)}</div>
              <div className="text-yellow-400 font-semibold">Individual Cost per Acre</div>
              <div>${formatNumber(result.costPerAcre)}</div>
            </div>
          ))}
        </div>
      )}

      {/* Total Cost & ROI Section */}
      <div>
        <h3 className="text-blue-400 text-lg font-semibold mb-4">Total Program Cost and ROI</h3>
        <div className="border border-gray-600 rounded-lg p-4 grid grid-cols-2 gap-4 bg-gray-900">
          <div className="text-yellow-400 font-semibold">Total Program Cost per Acre</div>
          <div>${formatNumber(programCost)}</div>
          <div className="text-yellow-400 font-semibold">Breakeven Yield per Acre</div>
          <div>{formatNumber(roi.breakeven)} {cropPriceUnit}/acre</div>
          <div className="text-yellow-400 font-semibold">Yield Needed for 2:1 ROI</div>
          <div>{formatNumber(roi.roi2x)} {cropPriceUnit}/acre</div>
          <div className="text-yellow-400 font-semibold">Yield Needed for 3:1 ROI</div>
          <div>{formatNumber(roi.roi3x)} {cropPriceUnit}/acre</div>
          <div className="text-yellow-400 font-semibold">Yield Needed for 4:1 ROI</div>
          <div>{formatNumber(roi.roi4x)} {cropPriceUnit}/acre</div>
          <div className="text-yellow-400 font-semibold">Yield Needed for 5:1 ROI</div>
          <div>{formatNumber(roi.roi5x)} {cropPriceUnit}/acre</div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
