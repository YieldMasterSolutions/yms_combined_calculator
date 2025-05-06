// src/components/ResultsDisplay.tsx

import React from "react";
import { formatNumber } from "../utils/formatNumber";
import { ProductData } from "../utils/data";

interface SeedTreatmentOutput {
  seedType: string;
  totalWeight: number;
  totalUnits: number;
  seedsPerUnit: number;
  results: {
    product: ProductData;
    totalProductNeeded: number;
    totalProductUnits: number;
    totalCost: number;
    totalDiscountedCost: number;
    costPerUnitOfSeed: number;
    costPerAcre: number;
  }[];
}

interface FoliarProductCost {
  product: ProductData;
  applicationType: string;
  totalProductNeeded: number;
  totalProductUnits: number;
  totalCost: number;
  totalDiscountedCost: number;
  costPerAcre: number;
}

interface ROIResults {
  breakeven: number;
  roi2to1: number;
  roi3to1: number;
  roi4to1: number;
  roi5to1: number;
  unit: string;
}

interface ResultsDisplayProps {
  seedTreatmentOutput?: SeedTreatmentOutput;
  inFurrowFoliarResults?: FoliarProductCost[];
  totalProgramCost?: number;
  roi?: ROIResults;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  seedTreatmentOutput,
  inFurrowFoliarResults,
  totalProgramCost,
  roi,
}) => {
  return (
    <div className="space-y-8 mt-6">
      {seedTreatmentOutput && (
        <div>
          <h2 className="text-lg font-bold text-blue-700 mb-2">Seed Treatment Calculations</h2>
          <div className="grid grid-cols-2 gap-4 border p-4 rounded-lg shadow bg-white">
            <div className="flex flex-col justify-center min-h-[48px]">
              <span className="text-yellow-600 font-semibold">Total Weight of Seeds to be Treated</span>
              <span>{formatNumber(seedTreatmentOutput.totalWeight)} lbs</span>
            </div>
            <div className="flex flex-col justify-center min-h-[48px]">
              <span className="text-yellow-600 font-semibold">Total Units of Seed to be Treated</span>
              <span>{formatNumber(seedTreatmentOutput.totalUnits)}</span>
            </div>
            <div className="flex flex-col justify-center min-h-[48px]">
              <span className="text-yellow-600 font-semibold">Seeds per Unit</span>
              <span>{formatNumber(seedTreatmentOutput.seedsPerUnit)}</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-blue-700 mt-6 mb-2">Seed Treatment Costs</h3>
          {seedTreatmentOutput.results.map((result, index) => (
            <div
              key={index}
              className="grid grid-cols-2 gap-4 border p-4 rounded-lg shadow bg-white mb-4"
            >
              <div className="flex flex-col justify-center min-h-[48px]">
                <span className="text-yellow-600 font-semibold">Product</span>
                <span>
                  {result.product["Product Name"]} – {result.product["Package Size"]}{" "}
                  {result.product["Package Units"]} {result.product["Package Type"]}
                </span>
              </div>
              <div className="flex flex-col justify-center min-h-[48px]">
                <span className="text-yellow-600 font-semibold">Application Rate</span>
                <span>{result.product["Application Rate"]} {result.product["Package Units"]}/unit seed</span>
              </div>
              <div className="flex flex-col justify-center min-h-[48px]">
                <span className="text-yellow-600 font-semibold">Total Product Needed</span>
                <span>{formatNumber(result.totalProductNeeded)} {result.product["Package Units"]}</span>
              </div>
              <div className="flex flex-col justify-center min-h-[48px]">
                <span className="text-yellow-600 font-semibold">Total Product Units to Order</span>
                <span>{formatNumber(result.totalProductUnits)}</span>
              </div>
              <div className="flex flex-col justify-center min-h-[48px]">
                <span className="text-yellow-600 font-semibold">Total Cost to Grower (MSRP)</span>
                <span>${formatNumber(result.totalCost)}</span>
              </div>
              <div className="flex flex-col justify-center min-h-[48px]">
                <span className="text-yellow-600 font-semibold">Total Discounted Cost to Grower</span>
                <span>${formatNumber(result.totalDiscountedCost)}</span>
              </div>
              <div className="flex flex-col justify-center min-h-[48px]">
                <span className="text-yellow-600 font-semibold">Product Cost per Unit of Treated Seed</span>
                <span>${formatNumber(result.costPerUnitOfSeed)}</span>
              </div>
              <div className="flex flex-col justify-center min-h-[48px]">
                <span className="text-yellow-600 font-semibold">Individual Cost of Seed Treatment per Acre</span>
                <span>${formatNumber(result.costPerAcre)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {inFurrowFoliarResults && inFurrowFoliarResults.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-blue-700 mb-2">In-Furrow / Foliar Product Costs</h2>
          {inFurrowFoliarResults.map((result, index) => (
            <div
              key={index}
              className="grid grid-cols-2 gap-4 border p-4 rounded-lg shadow bg-white mb-4"
            >
              <div className="flex flex-col justify-center min-h-[48px]">
                <span className="text-yellow-600 font-semibold">Product</span>
                <span>
                  {result.product["Product Name"]} – {result.product["Package Size"]}{" "}
                  {result.product["Package Units"]} {result.product["Package Type"]}
                </span>
              </div>
              <div className="flex flex-col justify-center min-h-[48px]">
                <span className="text-yellow-600 font-semibold">Application Type</span>
                <span>{result.applicationType}</span>
              </div>
              <div className="flex flex-col justify-center min-h-[48px]">
                <span className="text-yellow-600 font-semibold">Application Rate</span>
                <span>{result.product["Application Rate"]} {result.product["Package Units"]}/acre</span>
              </div>
              <div className="flex flex-col justify-center min-h-[48px]">
                <span className="text-yellow-600 font-semibold">Total Product Needed</span>
                <span>{formatNumber(result.totalProductNeeded)} {result.product["Package Units"]}</span>
              </div>
              <div className="flex flex-col justify-center min-h-[48px]">
                <span className="text-yellow-600 font-semibold">Total Product Units to Order</span>
                <span>{formatNumber(result.totalProductUnits)}</span>
              </div>
              <div className="flex flex-col justify-center min-h-[48px]">
                <span className="text-yellow-600 font-semibold">Total Cost to Grower (MSRP)</span>
                <span>${formatNumber(result.totalCost)}</span>
              </div>
              <div className="flex flex-col justify-center min-h-[48px]">
                <span className="text-yellow-600 font-semibold">Total Discounted Cost to Grower</span>
                <span>${formatNumber(result.totalDiscountedCost)}</span>
              </div>
              <div className="flex flex-col justify-center min-h-[48px]">
                <span className="text-yellow-600 font-semibold">Individual Cost per Acre</span>
                <span>${formatNumber(result.costPerAcre)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {typeof totalProgramCost === "number" && (
        <div className="grid grid-cols-2 gap-4 border p-4 rounded-lg shadow bg-white">
          <div className="flex flex-col justify-center min-h-[48px]">
            <span className="text-yellow-600 font-semibold">Total Program Cost per Acre</span>
            <span>${formatNumber(totalProgramCost)}</span>
          </div>
        </div>
      )}

      {roi && (
        <div className="mt-6">
          <h2 className="text-lg font-bold text-blue-700 mb-2">Breakeven ROI Calculations</h2>
          <div className="grid grid-cols-2 gap-4 border p-4 rounded-lg shadow bg-white">
            <div className="flex flex-col justify-center min-h-[48px]">
              <span className="text-yellow-600 font-semibold">Breakeven Yield per Acre</span>
              <span>{formatNumber(roi.breakeven)} {roi.unit}/acre</span>
            </div>
            <div className="flex flex-col justify-center min-h-[48px]">
              <span className="text-yellow-600 font-semibold">Yield Needed for 2:1 ROI</span>
              <span>{formatNumber(roi.roi2to1)} {roi.unit}/acre</span>
            </div>
            <div className="flex flex-col justify-center min-h-[48px]">
              <span className="text-yellow-600 font-semibold">Yield Needed for 3:1 ROI</span>
              <span>{formatNumber(roi.roi3to1)} {roi.unit}/acre</span>
            </div>
            <div className="flex flex-col justify-center min-h-[48px]">
              <span className="text-yellow-600 font-semibold">Yield Needed for 4:1 ROI</span>
              <span>{formatNumber(roi.roi4to1)} {roi.unit}/acre</span>
            </div>
            <div className="flex flex-col justify-center min-h-[48px]">
              <span className="text-yellow-600 font-semibold">Yield Needed for 5:1 ROI</span>
              <span>{formatNumber(roi.roi5to1)} {roi.unit}/acre</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;
