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

  const getCorrectRateUnit = (rateUnit: string | undefined, productName: string): string => {
    if (!rateUnit) return "";
    if (rateUnit.toLowerCase().includes("unit")) return "oz/unit";
    if (productName.toLowerCase().includes("wg") || productName.toLowerCase().includes("n-phys")) return "g/acre";
    return rateUnit;
  };

  const getProductLabel = (p: ProductCalculation, isSeed: boolean) => {
    const capacity = p.treatmentCapacity ? `${formatNumber(p.treatmentCapacity, 0)} ${isSeed ? "units" : "acres"}` : "-";
    return `${p.productName} – ${p.productPackageString} – ${p.applicationRate} ${getCorrectRateUnit(p.rateUnit, p.productName)} – Treats ${capacity}`;
  };

  const renderGridItem = (label: string, value: string | number) => (
    <div className="flex justify-between items-center min-h-[48px]">
      <span className="text-yellow-300 font-semibold whitespace-nowrap">{label}</span>
      <span className="text-white text-right ml-4 whitespace-nowrap">{value}</span>
    </div>
  );

  return (
    <div className="space-y-8">
      {seedTreatmentResults.length > 0 && (
        <div className="p-4 rounded border border-gray-700 bg-zinc-800">
          <h3 className="text-xl font-bold text-blue-400 mb-4">Seed Treatment Calculations</h3>
          {seedTreatmentResults.map((result, index) => (
            <div key={index} className="mb-6">
              <h4 className="text-lg font-bold text-white mb-2">{getProductLabel(result, true)}</h4>

              <div className="grid grid-cols-2 gap-4 p-4 border border-gray-600 rounded mb-4">
                <h5 className="col-span-2 text-md font-bold text-blue-400">Seeding Information</h5>
                {renderGridItem("Total Number of Seeds to be Treated:", formatNumber(result.totalSeeds ?? 0, 2))}
                {renderGridItem("Total Weight of Seeds to be Treated:", `${formatNumber(result.totalWeight ?? 0, 2)} lbs`)}
                {renderGridItem("Total Number of Units to be Treated:", formatNumber(result.unitsToBeTreated ?? 0, 2))}
                {renderGridItem("Number of Seeds per Unit:", formatNumber(result.seedsPerUnit ?? 0, 2))}
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 border border-gray-600 rounded">
                <h5 className="col-span-2 text-md font-bold text-blue-400">Seed Treatment Costs</h5>
                {renderGridItem("Application Rate:", `${formatNumber(result.applicationRate ?? 0, 2)} ${getCorrectRateUnit(result.rateUnit, result.productName)}`)}
                {renderGridItem("Total Amount of Product Needed:", formatNumber(result.totalProductNeeded ?? 0, 2))}
                {renderGridItem("Total Product Units to Order:", `${result.packagesNeeded} – ${result.productPackageString}`)}
                {renderGridItem("Treatment Capacity per Package:", `${formatNumber(result.treatmentCapacity ?? 0, 0)} units`)}
                {renderGridItem("Product Cost per Ounce:", `$${formatNumber(result.productCostPerOz ?? 0, 2)}`)}
                {renderGridItem("Total Cost to Grower (MSRP):", `$${formatNumber(result.totalCostToGrower ?? 0, 2)}`)}
                {renderGridItem("Total Discounted Cost to Grower:", `$${formatNumber(result.discountedCostToGrower ?? 0, 2)}`)}
                {renderGridItem("Product Cost per Unit of Treated Seed:", `$${formatNumber(result.productCostPerUnitSeed ?? 0, 2)}`)}
                {renderGridItem("Individual Cost of Seed Treatment per Acre:", `$${formatNumber(result.individualCostPerAcre ?? 0, 2)}`)}
              </div>
            </div>
          ))}
        </div>
      )}

      {inFurrowFoliarResults.length > 0 && (
        <div className="p-4 rounded border border-gray-700 bg-zinc-800">
          <h3 className="text-xl font-bold text-blue-400 mb-4">In-Furrow / Foliar Product Costs</h3>
          {inFurrowFoliarResults.map((result, index) => (
            <div key={index} className="mb-6">
              <h4 className="text-lg font-bold text-white mb-2">{getProductLabel(result, false)}</h4>
              <div className="grid grid-cols-2 gap-4 p-4 border border-gray-600 rounded">
                {renderGridItem("Application Rate:", `${formatNumber(result.applicationRate ?? 0, 2)} ${getCorrectRateUnit(result.rateUnit, result.productName)}`)}
                {renderGridItem("Total Amount of Product Needed:", formatNumber(result.totalProductNeeded ?? 0, 2))}
                {renderGridItem("Total Product Units to Order:", `${result.packagesNeeded} – ${result.productPackageString}`)}
                {renderGridItem("Treatment Capacity per Package:", `${formatNumber(result.treatmentCapacity ?? 0, 0)} acres`)}
                {renderGridItem("Product Cost per Ounce:", `$${formatNumber(result.productCostPerOz ?? 0, 2)}`)}
                {renderGridItem("Total Cost to Grower (MSRP):", `$${formatNumber(result.totalCostToGrower ?? 0, 2)}`)}
                {renderGridItem("Total Discounted Cost to Grower:", `$${formatNumber(result.discountedCostToGrower ?? 0, 2)}`)}
                {renderGridItem("Individual Cost per Acre:", `$${formatNumber(result.individualCostPerAcre ?? 0, 2)}`)}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="p-4 rounded border border-gray-700 bg-zinc-800">
        <h3 className="text-xl font-bold text-blue-400 mb-4">Total Program Cost</h3>
        <div className="grid grid-cols-2 gap-4 p-4 border border-gray-600 rounded">
          {renderGridItem("Total MSRP Cost to Grower:", `$${formatNumber(totalUndiscountedCost, 2)}`)}
          {renderGridItem("Total Discounted Cost to Grower:", `$${formatNumber(totalDiscountedCost, 2)}`)}
          {renderGridItem("Total Cost Per Acre:", `$${formatNumber(totalCostPerAcre, 2)}`)}
        </div>
      </div>

      <div className="p-4 rounded border border-gray-700 bg-zinc-800">
        <h3 className="text-xl font-bold text-blue-400 mb-4">Breakeven ROI Calculation</h3>
        <div className="grid grid-cols-5 gap-4 text-center text-white">
          <div className="bg-zinc-700 p-4 rounded">
            <div className="text-yellow-300 font-semibold mb-1">Breakeven Yield per Acre</div>
            <div>{formatNumber(breakevenYield ?? 0, 2)} {displayUnit}</div>
          </div>
          <div className="bg-zinc-700 p-4 rounded">
            <div className="text-yellow-300 font-semibold mb-1">Yield Needed for 2:1 ROI</div>
            <div>{formatNumber(roi2 ?? 0, 2)} {displayUnit}</div>
          </div>
          <div className="bg-zinc-700 p-4 rounded">
            <div className="text-yellow-300 font-semibold mb-1">Yield Needed for 3:1 ROI</div>
            <div>{formatNumber(roi3 ?? 0, 2)} {displayUnit}</div>
          </div>
          <div className="bg-zinc-700 p-4 rounded">
            <div className="text-yellow-300 font-semibold mb-1">Yield Needed for 4:1 ROI</div>
            <div>{formatNumber(roi4 ?? 0, 2)} {displayUnit}</div>
          </div>
          <div className="bg-zinc-700 p-4 rounded">
            <div className="text-yellow-300 font-semibold mb-1">Yield Needed for 5:1 ROI</div>
            <div>{formatNumber(roi5 ?? 0, 2)} {displayUnit}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
