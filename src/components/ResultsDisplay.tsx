"use client";

import React from "react";
import { SeedTreatmentResult, FoliarProductResult, ROIResults } from "../utils/calculations";
import { formatNumber } from "../utils/formatNumber";

interface ResultsDisplayProps {
  seedResults: SeedTreatmentResult[];
  foliarResults: FoliarProductResult[];
  roi: ROIResults | null;
  cropPriceUnit: string;
  growerName: string;
  dealerRep: string;
  programCost: number;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  seedResults,
  foliarResults,
  roi,
  cropPriceUnit,
  growerName,
  dealerRep,
  programCost
}) => {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-black">Calculation Results</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm bg-gray-100 p-4 rounded shadow">
        <div><span className="font-semibold text-yellow-600">Grower Name:</span> {growerName}</div>
        <div><span className="font-semibold text-yellow-600">Dealer/Rep Name:</span> {dealerRep}</div>
      </div>

      {/* Seed Treatment Results */}
      {seedResults.map((res, index) => (
        <div key={index} className="mt-6 border border-gray-400 p-4 bg-white shadow">
          <h3 className="text-md font-bold text-blue-700 mb-2">{res.productName} ({res.applicationMethod})</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="font-semibold text-yellow-600">Total Seeds to Treat:</span> {formatNumber(res.totalSeeds)}</div>
            <div><span className="font-semibold text-yellow-600">Total Weight of Seeds:</span> {formatNumber(res.totalWeight)} lbs</div>
            <div><span className="font-semibold text-yellow-600">Total Seed Units:</span> {formatNumber(res.totalUnits)}</div>
            <div><span className="font-semibold text-yellow-600">Seeds per Unit:</span> {formatNumber(res.seedsPerUnit)}</div>
            <div><span className="font-semibold text-yellow-600">Application Rate:</span> {res.applicationRate} {res.rateUnit}</div>
            <div><span className="font-semibold text-yellow-600">Total Product Needed:</span> {formatNumber(res.totalProductNeeded)}</div>
            <div><span className="font-semibold text-yellow-600">Total Product Units to Order:</span> {res.totalProductUnits} – {res.productPackageString}</div>
            <div><span className="font-semibold text-yellow-600">Product Cost per Ounce:</span> ${formatNumber(res.productCostPerOz)}</div>
            <div><span className="font-semibold text-yellow-600">Total Cost to Grower (MSRP):</span> ${formatNumber(res.totalCostToGrower)}</div>
            <div><span className="font-semibold text-yellow-600">Total Discounted Cost to Grower:</span> ${formatNumber(res.totalDiscountedCostToGrower)}</div>
            <div><span className="font-semibold text-yellow-600">Product Cost per Unit of Treated Seed:</span> ${formatNumber(res.productCostPerUnitSeed)}</div>
            <div><span className="font-semibold text-yellow-600">Individual Cost of Seed Treatment per Acre:</span> ${formatNumber(res.individualCostPerAcre)}</div>
          </div>
        </div>
      ))}

      {/* In-Furrow / Foliar Results */}
      {foliarResults.map((res, index) => (
        <div key={index} className="mt-6 border border-gray-400 p-4 bg-white shadow">
          <h3 className="text-md font-bold text-blue-700 mb-2">{res.productName} ({res.applicationMethod})</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="font-semibold text-yellow-600">Application Rate:</span> {res.applicationRate} {res.rateUnit}</div>
            <div><span className="font-semibold text-yellow-600">Total Product Needed:</span> {formatNumber(res.totalProductNeeded)}</div>
            <div><span className="font-semibold text-yellow-600">Total Product Units to Order:</span> {res.totalProductUnits} – {res.productPackageString}</div>
            <div><span className="font-semibold text-yellow-600">Product Cost per Ounce:</span> ${formatNumber(res.productCostPerOz)}</div>
            <div><span className="font-semibold text-yellow-600">Total Cost to Grower (MSRP):</span> ${formatNumber(res.totalCostToGrower)}</div>
            <div><span className="font-semibold text-yellow-600">Total Discounted Cost to Grower:</span> ${formatNumber(res.totalDiscountedCostToGrower)}</div>
            <div><span className="font-semibold text-yellow-600">Individual Cost per Acre:</span> ${formatNumber(res.individualCostPerAcre)}</div>
          </div>
        </div>
      ))}

      {/* Program Cost + ROI */}
      {roi && (
        <div className="mt-6 border border-gray-400 p-4 bg-white shadow">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="font-semibold text-yellow-600">Total Biological Program Cost per Acre:</span> ${formatNumber(programCost)}</div>
            <div><span className="font-semibold text-yellow-600">Breakeven Yield per Acre:</span> {formatNumber(roi.breakeven)} {cropPriceUnit}/acre</div>
            <div><span className="font-semibold text-yellow-600">Yield Needed for 2:1 ROI:</span> {formatNumber(roi.roi2)} {cropPriceUnit}/acre</div>
            <div><span className="font-semibold text-yellow-600">Yield Needed for 3:1 ROI:</span> {formatNumber(roi.roi3)} {cropPriceUnit}/acre</div>
            <div><span className="font-semibold text-yellow-600">Yield Needed for 4:1 ROI:</span> {formatNumber(roi.roi4)} {cropPriceUnit}/acre</div>
            <div><span className="font-semibold text-yellow-600">Yield Needed for 5:1 ROI:</span> {formatNumber(roi.roi5)} {cropPriceUnit}/acre</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;
