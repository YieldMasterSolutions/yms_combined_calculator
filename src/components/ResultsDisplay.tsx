// src/components/ResultsDisplay.tsx

"use client";

import React from "react";
import { SeedTreatmentResult, FoliarProductResult, ROIResults } from "../utils/calculations";
import formatNumber from "../utils/formatNumber";

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
    <section className="space-y-6">
      {/* Seed Treatment Section */}
      {seedResults.map((result, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-xl p-4 shadow bg-white"
        >
          <h3 className="text-blue-600 text-lg font-semibold mb-2">
            Seed Treatment: {result.productName}
          </h3>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="font-bold text-yellow-600">Total Weight of Seeds to be Treated</div>
            <div className="flex items-center min-h-[32px]">{formatNumber(result.totalWeight)} lbs</div>

            <div className="font-bold text-yellow-600">Total Number of Units to be Treated</div>
            <div className="flex items-center min-h-[32px]">{formatNumber(result.totalUnits)}</div>

            <div className="font-bold text-yellow-600">Seeds per Unit</div>
            <div className="flex items-center min-h-[32px]">{formatNumber(result.seedsPerUnit)}</div>

            <div className="font-bold text-yellow-600">Application Rate</div>
            <div className="flex items-center min-h-[32px]">{result.applicationRate} oz/unit</div>

            <div className="font-bold text-yellow-600">Total Amount of Product Needed</div>
            <div className="flex items-center min-h-[32px]">{formatNumber(result.totalProductNeeded)} oz</div>

            <div className="font-bold text-yellow-600">Total Product Units to Order</div>
            <div className="flex items-center min-h-[32px]">{formatNumber(result.totalProductUnits)} – {result.productPackageString}</div>

            <div className="font-bold text-yellow-600">Product Cost per Ounce</div>
            <div className="flex items-center min-h-[32px]">${formatNumber(result.costPerOunce)}</div>

            <div className="font-bold text-yellow-600">Total Cost to Grower (MSRP)</div>
            <div className="flex items-center min-h-[32px]">${formatNumber(result.totalCostMSRP)}</div>

            <div className="font-bold text-yellow-600">Total Discounted Cost to Grower</div>
            <div className="flex items-center min-h-[32px]">${formatNumber(result.totalCostDiscounted)}</div>

            <div className="font-bold text-yellow-600">Product Cost per Unit of Treated Seed</div>
            <div className="flex items-center min-h-[32px]">${formatNumber(result.costPerUnitOfSeed)}</div>

            <div className="font-bold text-yellow-600">Individual Cost of Seed Treatment per Acre</div>
            <div className="flex items-center min-h-[32px]">${formatNumber(result.costPerAcre)}</div>
          </div>
        </div>
      ))}

      {/* In-Furrow / Foliar Products Section */}
      {inFurrowFoliarResults.map((result, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-xl p-4 shadow bg-white"
        >
          <h3 className="text-blue-600 text-lg font-semibold mb-2">
            {result.productName} ({result.applicationType})
          </h3>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="font-bold text-yellow-600">Application Rate</div>
            <div className="flex items-center min-h-[32px]">{result.applicationRate} {result.rateUnits}</div>

            <div className="font-bold text-yellow-600">Total Amount of Product Needed</div>
            <div className="flex items-center min-h-[32px]">{formatNumber(result.totalProductNeeded)} {result.rateUnits}</div>

            <div className="font-bold text-yellow-600">Total Product Units to Order</div>
            <div className="flex items-center min-h-[32px]">{formatNumber(result.totalProductUnits)} – {result.productPackageString}</div>

            <div className="font-bold text-yellow-600">Product Cost per Ounce</div>
            <div className="flex items-center min-h-[32px]">${formatNumber(result.costPerOunce)}</div>

            <div className="font-bold text-yellow-600">Total Cost to Grower (MSRP)</div>
            <div className="flex items-center min-h-[32px]">${formatNumber(result.totalCostMSRP)}</div>

            <div className="font-bold text-yellow-600">Total Discounted Cost to Grower</div>
            <div className="flex items-center min-h-[32px]">${formatNumber(result.totalCostDiscounted)}</div>

            <div className="font-bold text-yellow-600">Individual Cost per Acre</div>
            <div className="flex items-center min-h-[32px]">${formatNumber(result.costPerAcre)}</div>
          </div>
        </div>
      ))}

      {/* Program Cost and ROI Section */}
      <div className="border border-gray-300 rounded-xl p-4 shadow bg-white">
        <h3 className="text-blue-600 text-lg font-semibold mb-2">Total Program Cost and ROI</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="font-bold text-yellow-600">Total Biological Program Cost</div>
          <div className="flex items-center min-h-[32px]">${formatNumber(programCost)}</div>

          <div className="font-bold text-yellow-600">Breakeven Yield per Acre</div>
          <div className="flex items-center min-h-[32px]">{formatNumber(roi.breakeven)} {cropPriceUnit}/acre</div>

          <div className="font-bold text-yellow-600">Yield Needed for 2:1 ROI</div>
          <div className="flex items-center min-h-[32px]">{formatNumber(roi.twoToOne)} {cropPriceUnit}/acre</div>

          <div className="font-bold text-yellow-600">Yield Needed for 3:1 ROI</div>
          <div className="flex items-center min-h-[32px]">{formatNumber(roi.threeToOne)} {cropPriceUnit}/acre</div>

          <div className="font-bold text-yellow-600">Yield Needed for 4:1 ROI</div>
          <div className="flex items-center min-h-[32px]">{formatNumber(roi.fourToOne)} {cropPriceUnit}/acre</div>

          <div className="font-bold text-yellow-600">Yield Needed for 5:1 ROI</div>
          <div className="flex items-center min-h-[32px]">{formatNumber(roi.fiveToOne)} {cropPriceUnit}/acre</div>
        </div>
      </div>
    </section>
  );
};

export default ResultsDisplay;