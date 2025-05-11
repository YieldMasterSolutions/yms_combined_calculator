// src/components/ResultsDisplay.tsx

import React from "react";
import { ProductCalculation } from "../utils/calculations";
import { formatNumber } from "../utils/formatNumber";

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
  const displayUnit = cropPriceUnit.replace("/", "");

  const getProductLabel = (result: ProductCalculation) => {
    const rate = result.applicationRate || 0;
    const size = result.totalProductUnits && result.totalProductUnits > 0 ? result.packagesNeeded * (rate > 0 ? result.totalProductNeeded! / rate : 1) : 0;
    const unit = result.rateUnit || "";
    const capacity = rate > 0 ? Math.floor((result.packagesNeeded * (result.totalProductNeeded! / rate)) / 1) : "N/A";
    const scope = unit.includes("unit") ? "units" : "acres";
    return `${result.productName} – ${rate} ${unit} – treats ${capacity} ${scope}`;
  };

  return (
    <div className="space-y-8">
      {seedTreatmentResults.length > 0 && (
        <div className="p-4 rounded border border-gray-700 bg-zinc-800">
          <h3 className="text-xl font-bold text-[#39803c] mb-4">Seed Treatment Calculations</h3>
          {seedTreatmentResults.map((result, index) => (
            <div key={index} className="mb-6">
              <h4 className="text-lg font-bold text-[#49a248] mb-2">{getProductLabel(result)}</h4>
              <div className="grid grid-cols-2 gap-4 text-white">
                <div><span className="text-[#b3b5b8] font-semibold">Total Number of Seeds to be Treated:</span> {formatNumber(result.totalSeeds ?? 0, 2)}</div>
                <div><span className="text-[#b3b5b8] font-semibold">Total Weight of Seeds to be Treated:</span> {formatNumber(result.totalWeight ?? 0, 2)} lbs</div>
                <div><span className="text-[#b3b5b8] font-semibold">Total Number of Units to be Treated:</span> {formatNumber(result.unitsToBeTreated ?? 0, 2)}</div>
                <div><span className="text-[#b3b5b8] font-semibold">Number of Seeds per Unit:</span> {formatNumber(result.seedsPerUnit ?? 0, 2)}</div>
                <div><span className="text-[#b3b5b8] font-semibold">Application Rate:</span> {formatNumber(result.applicationRate ?? 0, 2)} {result.rateUnit}</div>
                <div><span className="text-[#b3b5b8] font-semibold">Total Amount of Product Needed:</span> {formatNumber(result.totalProductNeeded ?? 0, 2)}</div>
                <div><span className="text-[#b3b5b8] font-semibold">Total Product Units to Order:</span> {result.packagesNeeded} – {result.productPackageString}</div>
                <div><span className="text-[#b3b5b8] font-semibold">Product Cost per Ounce:</span> ${formatNumber(result.productCostPerOz ?? 0, 2)}</div>
                <div><span className="text-[#b3b5b8] font-semibold">Total Cost to Grower (MSRP):</span> ${formatNumber(result.totalCostToGrower ?? 0, 2)}</div>
                <div><span className="text-[#b3b5b8] font-semibold">Total Discounted Cost to Grower:</span> ${formatNumber(result.discountedCostToGrower ?? 0, 2)}</div>
                <div><span className="text-[#b3b5b8] font-semibold">Product Cost per Unit of Treated Seed:</span> ${formatNumber(result.productCostPerUnitSeed ?? 0, 2)}</div>
                <div><span className="text-[#b3b5b8] font-semibold">Individual Cost of Seed Treatment per Acre:</span> ${formatNumber(result.individualCostPerAcre ?? 0, 2)}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {inFurrowFoliarResults.length > 0 && (
        <div className="p-4 rounded border border-gray-700 bg-zinc-800">
          <h3 className="text-xl font-bold text-[#39803c] mb-4">In-Furrow / Foliar Product Costs</h3>
          {inFurrowFoliarResults.map((result, index) => (
            <div key={index} className="mb-6">
              <h4 className="text-lg font-bold text-[#49a248] mb-2">{getProductLabel(result)}</h4>
              <div className="grid grid-cols-2 gap-4 text-white">
                <div><span className="text-[#b3b5b8] font-semibold">Application Rate:</span> {formatNumber(result.applicationRate ?? 0, 2)} {result.rateUnit}</div>
                <div><span className="text-[#b3b5b8] font-semibold">Total Amount of Product Needed:</span> {formatNumber(result.totalProductNeeded ?? 0, 2)}</div>
                <div><span className="text-[#b3b5b8] font-semibold">Total Product Units to Order:</span> {result.packagesNeeded} – {result.productPackageString}</div>
                <div><span className="text-[#b3b5b8] font-semibold">Product Cost per Ounce:</span> ${formatNumber(result.productCostPerOz ?? 0, 2)}</div>
                <div><span className="text-[#b3b5b8] font-semibold">Total Cost to Grower (MSRP):</span> ${formatNumber(result.totalCostToGrower ?? 0, 2)}</div>
                <div><span className="text-[#b3b5b8] font-semibold">Total Discounted Cost to Grower:</span> ${formatNumber(result.discountedCostToGrower ?? 0, 2)}</div>
                <div><span className="text-[#b3b5b8] font-semibold">Individual Cost per Acre:</span> ${formatNumber(result.individualCostPerAcre ?? 0, 2)}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="p-4 rounded border border-gray-700 bg-zinc-800 text-white">
        <h3 className="text-xl font-bold text-[#39803c] mb-4">Total Program Cost</h3>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-[#b3b5b8] font-semibold">Total MSRP Cost to Grower:</span> ${formatNumber(totalUndiscountedCost, 2)}</div>
          <div><span className="text-[#b3b5b8] font-semibold">Total Discounted Cost to Grower:</span> ${formatNumber(totalDiscountedCost, 2)}</div>
          <div><span className="text-[#b3b5b8] font-semibold">Total Cost Per Acre:</span> ${formatNumber(totalCostPerAcre, 2)}</div>
        </div>
      </div>

      <div className="p-4 rounded border border-gray-700 bg-zinc-800 text-white">
        <h3 className="text-xl font-bold text-[#39803c] mb-4">Breakeven ROI Calculation</h3>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-[#b3b5b8] font-semibold">Breakeven Yield per Acre:</span> {formatNumber(breakevenYield ?? 0, 2)} {displayUnit}</div>
          <div><span className="text-[#b3b5b8] font-semibold">Yield Needed for 2:1 ROI:</span> {formatNumber(roi2 ?? 0, 2)} {displayUnit}</div>
          <div><span className="text-[#b3b5b8] font-semibold">Yield Needed for 3:1 ROI:</span> {formatNumber(roi3 ?? 0, 2)} {displayUnit}</div>
          <div><span className="text-[#b3b5b8] font-semibold">Yield Needed for 4:1 ROI:</span> {formatNumber(roi4 ?? 0, 2)} {displayUnit}</div>
          <div><span className="text-[#b3b5b8] font-semibold">Yield Needed for 5:1 ROI:</span> {formatNumber(roi5 ?? 0, 2)} {displayUnit}</div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
