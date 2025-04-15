// src/components/ResultsDisplay.tsx

"use client";
import React from "react";
import { ProductCalculation } from "@/utils/calculations";

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

const formatCurrency = (num: number | undefined) =>
  num !== undefined ? `$${num.toFixed(2)}` : "N/A";
const formatNumber = (num: number | undefined) =>
  num !== undefined ? num.toLocaleString() : "N/A";

export default function ResultsDisplay({
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
}: ResultsDisplayProps) {
  return (
    <div className="space-y-12">
      {/* Seed Treatment Outputs */}
      {seedTreatmentResults.map((result, i) => (
        <div key={i}>
          <h2 className="text-lg font-bold text-yellow-400 mb-2">{result.productName}</h2>
          <div className="grid grid-cols-2 gap-4 bg-zinc-900 p-4 border border-zinc-700 rounded">
            <div>
              <strong className="text-yellow-400 block">Total Number of Seeds to be Treated</strong>
              {formatNumber(result.totalSeeds)}
            </div>
            <div>
              <strong className="text-yellow-400 block">Total Weight of Seeds to be Treated</strong>
              {formatNumber(result.totalSeedWeight)} lbs
            </div>
            <div>
              <strong className="text-yellow-400 block">Total Number of Units to be Treated</strong>
              {formatNumber(result.totalUnits)}
            </div>
            <div>
              <strong className="text-yellow-400 block">Number of Seeds per Unit</strong>
              {formatNumber(result.seedsPerUnit)}
            </div>
            <div>
              <strong className="text-yellow-400 block">Application Rate</strong>
              {result.applicationRate?.toFixed(2)} oz per unit of seed
            </div>
            <div>
              <strong className="text-yellow-400 block">Total Amount of Product Needed</strong>
              {result.totalProductNeeded?.toFixed(2)} oz
            </div>
            <div>
              <strong className="text-yellow-400 block">Total Number of Product Packages</strong>
              {formatNumber(result.packagesNeeded)} {result.productPackageString?.split(" - ")[2]}
            </div>
            <div>
              <strong className="text-yellow-400 block">Product Cost per Package</strong>
              {formatCurrency(
                parseFloat(result.productPackageString?.split(" - ")[0]) *
                  (result.costPerUnit || 0)
              )}
            </div>
            <div>
              <strong className="text-yellow-400 block">Total Cost to the Grower</strong>
              {formatCurrency(result.originalTotalCostToGrower)}
            </div>
            <div>
              <strong className="text-yellow-400 block">Product Cost per Ounce</strong>
              {formatCurrency(result.costPerUnit)}
            </div>
            <div>
              <strong className="text-yellow-400 block">Product Cost per Unit of Treated Seed</strong>
              {formatCurrency(result.costPerUnitOfSeed)}
            </div>
            <div>
              <strong className="text-yellow-400 block">Product Cost per Acre</strong>
              {formatCurrency(result.individualCostPerAcre)}
            </div>
          </div>
        </div>
      ))}

      {/* In-Furrow / Foliar Product Outputs */}
      {inFurrowFoliarResults.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-yellow-400">Individual Product Costs</h2>
          {inFurrowFoliarResults.map((result, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-700 rounded p-4 space-y-2">
              <h3 className="font-bold text-yellow-400">{result.productName}</h3>
              <p>
                <strong>Total Product Units to Order</strong> = {formatNumber(result.packagesNeeded)} – {result.productPackageString}
              </p>
              <p>
                <strong>Total Cost to Grower (MSRP)</strong> = {formatCurrency(result.originalTotalCostToGrower)}
              </p>
              <p>
                <strong>Total Discounted Cost to Grower</strong> = {formatCurrency(result.discountedTotalCostToGrower)}
              </p>
              <p>
                <strong>Individual Cost of Product per Acre</strong> = {formatCurrency(result.individualCostPerAcre)}
              </p>
            </div>
          ))}
        </>
      )}

      {/* Program Summary */}
      <div className="bg-zinc-900 border border-zinc-700 rounded p-4">
        <h3 className="text-yellow-400 font-bold text-lg mb-2">Total YMS Biological Program Cost</h3>
        <p>Undiscounted Total Cost = {formatCurrency(totalUndiscountedCost)}</p>
        <p>Total Discounted Total Cost = {formatCurrency(totalDiscountedCost)}</p>
        <p>Total Program Cost per Acre = {formatCurrency(totalCostPerAcre)}</p>
      </div>

      {/* ROI */}
      <div className="bg-zinc-900 border border-zinc-700 rounded p-4">
        <h3 className="text-yellow-400 font-bold text-lg mb-2">Breakeven ROI Calculation</h3>
        <p>Breakeven Yield per Acre = {breakevenYield?.toFixed(2)} {cropPriceUnit}/acre</p>
        <p>ROI Yield for 2:1 Investment = {(roi2 || 0).toFixed(2)} {cropPriceUnit}/acre</p>
        <p>ROI Yield for 3:1 Investment = {(roi3 || 0).toFixed(2)} {cropPriceUnit}/acre</p>
        <p>ROI Yield for 4:1 Investment = {(roi4 || 0).toFixed(2)} {cropPriceUnit}/acre</p>
        <p>ROI Yield for 5:1 Investment = {(roi5 || 0).toFixed(2)} {cropPriceUnit}/acre</p>
      </div>
    </div>
  );
}
