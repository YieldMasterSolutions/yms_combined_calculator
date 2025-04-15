// src/components/ResultsDisplay.tsx

"use client";
import React from "react";
import type { ProductCalculation } from "@/utils/calculations";

interface ResultsProps {
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

const formatCurrency = (value: number) => `$${value.toFixed(2)}`;
const formatNumber = (value: number) => value.toLocaleString();

const ResultsDisplay: React.FC<ResultsProps> = ({
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
  return (
    <div className="space-y-8 mt-10">
      {/* Seed Treatment Output */}
      {seedTreatmentResults.map((result, index) => (
        <div key={index} className="bg-zinc-900 border border-zinc-700 p-4 rounded">
          <h3 className="text-lg font-bold text-yellow-400 mb-4">{result.productName}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><strong>Total Number of Seeds to be Treated</strong><br />{formatNumber(result.totalSeeds ?? 0)}</div>
            <div><strong>Total Weight of Seeds to be Treated</strong><br />{formatNumber(result.totalSeedWeight ?? 0)} lbs</div>
            <div><strong>Total Number of Units to be Treated</strong><br />{formatNumber(result.totalUnits ?? 0)}</div>
            <div><strong>Number of Seeds per Unit</strong><br />{formatNumber(result.seedsPerUnit ?? 0)}</div>
            <div><strong>Application Rate</strong><br />{(result.applicationRate ?? 0).toFixed(2)} oz per unit of seed</div>
            <div><strong>Total Amount of Product Needed</strong><br />{(result.totalProductNeeded ?? 0).toFixed(2)} oz</div>
            <div><strong>Total Number of Product Packages</strong><br />{result.packagesNeeded} {result.productPackageString.split(" - ")[2]}</div>
            <div><strong>Product Cost per Package</strong><br />{formatCurrency(parseFloat(result.productPackageString.split(" - ")[0]) || 0)}</div>
            <div><strong>Total Cost to the Grower</strong><br />{formatCurrency(result.originalTotalCostToGrower)}</div>
            <div><strong>Product Cost per Ounce</strong><br />{formatCurrency(result.costPerUnit ?? 0)}</div>
            <div><strong>Product Cost per Unit of Treated Seed</strong><br />{formatCurrency(result.costPerUnitOfSeed ?? 0)}</div>
            <div><strong>Product Cost per Acre</strong><br />{formatCurrency(result.individualCostPerAcre)}</div>
          </div>
        </div>
      ))}

      {/* In-Furrow/Foliar Products */}
      {inFurrowFoliarResults.length > 0 && (
        <>
          <h3 className="text-lg font-bold text-yellow-400 mt-8">Individual Product Costs</h3>
          {inFurrowFoliarResults.map((product, index) => (
            <div key={index} className="bg-zinc-900 border border-zinc-700 p-4 rounded">
              <h4 className="text-md font-bold text-yellow-300 mb-2">{product.productName}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><strong>Total Product Units to Order</strong><br />{product.packagesNeeded} – {product.productPackageString}</div>
                <div><strong>Total Cost to Grower (MSRP)</strong><br />{formatCurrency(product.originalTotalCostToGrower)}</div>
                <div><strong>Total Discounted Cost to Grower</strong><br />{formatCurrency(product.discountedTotalCostToGrower)}</div>
                <div><strong>Individual Cost of Product per Acre</strong><br />{formatCurrency(product.individualCostPerAcre)}</div>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Total Program Cost */}
      <div className="bg-zinc-900 border border-zinc-700 p-4 rounded">
        <h3 className="text-lg font-bold text-yellow-400">Total YMS Biological Program Cost</h3>
        <p className="mt-2">Undiscounted Total Cost = {formatCurrency(totalUndiscountedCost)}</p>
        <p>Total Discounted Total Cost = {formatCurrency(totalDiscountedCost)}</p>
        <p>Total Program Cost per Acre = {formatCurrency(totalCostPerAcre)}</p>
      </div>

      {/* ROI */}
      {breakevenYield !== null && (
        <div className="bg-zinc-900 border border-zinc-700 p-4 rounded">
          <h3 className="text-lg font-bold text-yellow-400">Breakeven ROI Calculation</h3>
          <p className="mt-2">Breakeven Yield per Acre = {breakevenYield.toFixed(2)} {cropPriceUnit}/acre</p>
          <p>ROI Yield for 2:1 Investment = {(roi2 ?? 0).toFixed(2)} {cropPriceUnit}/acre</p>
          <p>ROI Yield for 3:1 Investment = {(roi3 ?? 0).toFixed(2)} {cropPriceUnit}/acre</p>
          <p>ROI Yield for 4:1 Investment = {(roi4 ?? 0).toFixed(2)} {cropPriceUnit}/acre</p>
          <p>ROI Yield for 5:1 Investment = {(roi5 ?? 0).toFixed(2)} {cropPriceUnit}/acre</p>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;
