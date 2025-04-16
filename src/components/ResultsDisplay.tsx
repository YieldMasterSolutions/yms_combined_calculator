"use client";
import React from "react";
import type { ProductCalculation } from "../utils/calculations";
import { formatNumber } from "../utils/formatNumber";

// ✅ Local helpers for formatting
const formatCurrency = (n: number) => `$${formatNumber(n, 2)}`;
const formatYield = (n: number) => formatNumber(n, 2);

interface ResultsDisplayProps {
  seedTreatmentResults: ProductCalculation[];
  inFurrowFoliarResults: ProductCalculation[];
  totalUndiscountedCost: number;
  totalDiscountedCost: number;
  totalCostPerAcre: number;
  breakevenYield: number | null;
  roi2: number | null;
  roi3: number | null;
  roi4: number | null;
  roi5: number | null;
  cropPriceUnit: string;
}

export default function ResultsDisplay({
  seedTreatmentResults,
  inFurrowFoliarResults,
  totalUndiscountedCost,
  totalDiscountedCost,
  totalCostPerAcre,
  breakevenYield,
  roi2,
  roi3,
  roi4,
  roi5,
  cropPriceUnit,
}: ResultsDisplayProps) {
  const formatYieldUnit = (value: number | null) =>
    value !== null ? `${formatYield(value)} ${cropPriceUnit}/acre` : "-";

  return (
    <div className="space-y-6 mt-8 text-white">
      {/* 🟨 Seed Treatment Section */}
      {seedTreatmentResults.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-blue-400">Seed Treatment Calculations</h2>

          {/* Seeding Info (1 card only) */}
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
    <p className="text-yellow-400 font-bold">Number of Seeds per Unit</p>
    <p>{formatNumber(seedTreatmentResults[0].seedsPerUnit || 0)}</p>
  </div>
  <div>
    <p className="text-yellow-400 font-bold">Total Number of Units to be Treated</p>
    <p>{formatNumber(seedTreatmentResults[0].totalUnits || 0)}</p>
  </div>
</div>

          <h2 className="text-2xl font-bold text-blue-400">Seed Treatment Costs</h2>
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

    {/* 🟩 In-Furrow/Foliar Products */}
{inFurrowFoliarResults.length > 0 && (
  <>
    <h2 className="text-2xl font-bold text-blue-400">In-Furrow / Foliar Product Costs</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {inFurrowFoliarResults.map((product, i) => (
        <div key={i} className="bg-zinc-900 border rounded-md p-4">
          <h3 className="text-yellow-400 font-bold mb-2">{product.productName}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-yellow-400 font-bold">Number of Units to Order</p>
              <p>{`${product.packagesNeeded} – ${product.productPackageString}`}</p>
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

      {/* 🧾 Program Cost + ROI Side-by-Side */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="bg-zinc-900 border rounded-md p-4">
          <h2 className="text-xl font-bold text-yellow-400">Total YMS Biological Program Cost</h2>
          <p>Undiscounted Total Cost = {formatCurrency(totalUndiscountedCost)}</p>
          <p>Total Discounted Cost = {formatCurrency(totalDiscountedCost)}</p>
          <p>Total Program Cost per Acre = {formatCurrency(totalCostPerAcre)}</p>
        </div>
        <div className="bg-zinc-900 border rounded-md p-4">
          <h2 className="text-xl font-bold text-yellow-400">Breakeven ROI Calculation</h2>
          <p>Breakeven Yield per Acre = {formatYieldUnit(breakevenYield)}</p>
          <p>ROI Yield for 2:1 Investment = {formatYieldUnit(roi2)}</p>
          <p>ROI Yield for 3:1 Investment = {formatYieldUnit(roi3)}</p>
          <p>ROI Yield for 4:1 Investment = {formatYieldUnit(roi4)}</p>
          <p>ROI Yield for 5:1 Investment = {formatYieldUnit(roi5)}</p>
        </div>
      </div>
    </div>
  );
}

