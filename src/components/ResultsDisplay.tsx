"use client";
import React from "react";
import type { ProductCalculation } from "../utils/calculations";
import { formatNumber, formatCurrency, formatYield } from "../utils/formatters";

interface ROI {
  breakeven: number;
  roi2: number;
  roi3: number;
  roi4: number;
  roi5: number;
}

interface ResultsDisplayProps {
  seedTreatmentResults: ProductCalculation[];
  foliarResults: ProductCalculation[];
  totalProgramCost: number;
  totalDiscountedCost: number;
  totalCostPerAcre: number;
  roi: ROI;
  cropPriceUnit: string;
}

export default function ResultsDisplay({
  seedTreatmentResults,
  foliarResults,
  totalProgramCost,
  totalDiscountedCost,
  totalCostPerAcre,
  roi,
  cropPriceUnit,
}: ResultsDisplayProps) {
  const formatYieldUnit = (value: number) => `${formatYield(value)} ${cropPriceUnit}/acre`;

  return (
    <div className="space-y-6 mt-8 text-white">
      {/* Seed Treatment Calculations */}
      {seedTreatmentResults.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-yellow-400">Seed Treatment Calculations</h2>

          {/* Seeding Information Card */}
          <div className="grid grid-cols-2 gap-4 bg-zinc-900 border rounded-md p-4">
            <div>
              <p className="text-yellow-400 font-bold">Total Number of Seeds to be Treated</p>
              <p>{formatNumber(seedTreatmentResults[0].totalSeeds || 0)}</p>
            </div>
            <div>
              <p className="text-yellow-400 font-bold">Total Weight of Seeds to be Treated</p>
              <p>{formatNumber(seedTreatmentResults[0].totalSeedWeight || 0)} lbs</p>
            </div>
            <div>
              <p className="text-yellow-400 font-bold">Total Number of Units to be Treated</p>
              <p>{formatNumber(seedTreatmentResults[0].totalUnits || 0)}</p>
            </div>
            <div>
              <p className="text-yellow-400 font-bold">Number of Seeds per Unit</p>
              <p>{formatNumber(seedTreatmentResults[0].seedsPerUnit || 0)}</p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-yellow-400">Seed Treatment Costs</h2>
          {seedTreatmentResults.map((result, i) => (
            <div key={i} className="bg-zinc-900 border rounded-md p-4">
              <h3 className="text-yellow-400 font-bold mb-2">{result.productName}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-yellow-400 font-bold">Application Rate</p>
                  <p>{result.applicationRate} oz per unit of seed</p>
                </div>
                <div>
                  <p className="text-yellow-400 font-bold">Total Amount of Product Needed</p>
                  <p>{formatNumber(result.totalProductNeeded || 0)} oz</p>
                </div>
                <div>
                  <p className="text-yellow-400 font-bold">Total Product Units to Order</p>
                  <p>{result.packagesNeeded} – {result.productPackageString}</p>
                </div>
                <div>
                  <p className="text-yellow-400 font-bold">Product Cost per Ounce</p>
                  <p>{formatCurrency(result.costPerUnit || 0)}</p>
                </div>
                <div>
                  <p className="text-yellow-400 font-bold">Total Cost to Grower (MSRP)</p>
                  <p>{formatCurrency(result.originalTotalCostToGrower)}</p>
                </div>
                <div>
                  <p className="text-yellow-400 font-bold">Total Discounted Cost to Grower</p>
                  <p>{formatCurrency(result.discountedTotalCostToGrower)}</p>
                </div>
                <div>
                  <p className="text-yellow-400 font-bold">Product Cost per Unit of Treated Seed</p>
                  <p>{formatCurrency(result.costPerUnitOfSeed || 0)}</p>
                </div>
                <div>
                  <p className="text-yellow-400 font-bold">Individual Cost of Seed Treatment per Acre</p>
                  <p>{formatCurrency(result.individualCostPerAcre || 0)}</p>
                </div>
              </div>
            </div>
          ))}
        </>
      )}

      {/* In-Furrow/Foliar Products */}
      {foliarResults.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-yellow-400">In-Furrow / Foliar Product Costs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {foliarResults.map((product, i) => (
              <div key={i} className="bg-zinc-900 border rounded-md p-4">
                <h3 className="text-yellow-400 font-bold mb-2">{product.productName}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-yellow-400 font-bold">Product Package</p>
                    <p>{product.productPackageString}</p>
                  </div>
                  <div>
                    <p className="text-yellow-400 font-bold">Packages Needed</p>
                    <p>{formatNumber(product.packagesNeeded)}</p>
                  </div>
                  <div>
                    <p className="text-yellow-400 font-bold">Total Cost to Grower (MSRP)</p>
                    <p>{formatCurrency(product.originalTotalCostToGrower)}</p>
                  </div>
                  <div>
                    <p className="text-yellow-400 font-bold">Total Discounted Cost to Grower</p>
                    <p>{formatCurrency(product.discountedTotalCostToGrower)}</p>
                  </div>
                  <div>
                    <p className="text-yellow-400 font-bold">Product Cost per Acre</p>
                    <p>{formatCurrency(product.individualCostPerAcre)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Program Cost + ROI Calculations (Side-by-side) */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="bg-zinc-900 border rounded-md p-4">
          <h2 className="text-xl font-bold text-yellow-400">Total YMS Biological Program Cost</h2>
          <p>Undiscounted Total Cost = {formatCurrency(totalProgramCost)}</p>
          <p>Total Discounted Cost = {formatCurrency(totalDiscountedCost)}</p>
          <p>Total Program Cost per Acre = {formatCurrency(totalCostPerAcre)}</p>
        </div>
        <div className="bg-zinc-900 border rounded-md p-4">
          <h2 className="text-xl font-bold text-yellow-400">Breakeven ROI Calculation</h2>
          <p>Breakeven Yield per Acre = {formatYieldUnit(roi.breakeven)}</p>
          <p>ROI Yield for 2:1 Investment = {formatYieldUnit(roi.roi2)}</p>
          <p>ROI Yield for 3:1 Investment = {formatYieldUnit(roi.roi3)}</p>
          <p>ROI Yield for 4:1 Investment = {formatYieldUnit(roi.roi4)}</p>
          <p>ROI Yield for 5:1 Investment = {formatYieldUnit(roi.roi5)}</p>
        </div>
      </div>
    </div>
  );
}
