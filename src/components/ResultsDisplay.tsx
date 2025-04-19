"use client";
import React from "react";
import type { ProductCalculation } from "../utils/calculations";
import { formatNumber } from "../utils/formatNumber";

const formatCurrency = (n: number) => `$${formatNumber(n, 2)}`;
const formatYield = (n: number) => formatNumber(n, 2);

interface ROI {
  breakeven: number;
  twoToOne: number;
  threeToOne: number;
  fourToOne: number;
  fiveToOne: number;
}

interface ResultsDisplayProps {
  seedTreatmentResults: ProductCalculation[];
  inFurrowFoliarResults: ProductCalculation[];
  totalUndiscountedCost: number;
  totalDiscountedCost: number;
  totalCostPerAcre: number;
  roi: ROI | null;
  cropPriceUnit: string;
}

export default function ResultsDisplay({
  seedTreatmentResults,
  inFurrowFoliarResults,
  totalUndiscountedCost,
  totalDiscountedCost,
  totalCostPerAcre,
  programCost,
  roi,
  cropPriceUnit,
}: ResultsDisplayProps) {
  const formatYieldUnit = (value: number | null) =>
    value !== null ? `${formatYield(value)} ${cropPriceUnit}/acre` : "-";

  const gridItemClass = "flex flex-col justify-center min-h-[48px] px-1";

  return (
    <div className="space-y-6 mt-8 text-white">
      {/* Seed Treatment Section */}
      {seedTreatmentResults.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-blue-400">Seed Treatment Calculations</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 bg-zinc-900 border rounded-md p-4">
            <div className={gridItemClass}>
              <p className="text-yellow-400 font-bold">Total Number of Seeds to be Treated</p>
              <p>{formatNumber(seedTreatmentResults[0].totalSeeds || 0)}</p>
            </div>
            <div className={gridItemClass}>
              <p className="text-yellow-400 font-bold">Total Weight of Seeds to be Treated</p>
              <p>{formatNumber(seedTreatmentResults[0].totalSeedWeight || 0)} lbs</p>
            </div>
            <div className={gridItemClass}>
              <p className="text-yellow-400 font-bold">Total Number of Units to be Treated</p>
              <p>{formatNumber(seedTreatmentResults[0].totalUnits || 0)}</p>
            </div>
            <div className={gridItemClass}>
              <p className="text-yellow-400 font-bold">Number of Seeds per Unit</p>
              <p>{formatNumber(seedTreatmentResults[0].seedsPerUnit || 0)}</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-blue-400">Seed Treatment Costs</h2>
          {seedTreatmentResults.map((result, i) => (
            <div key={i} className="bg-zinc-900 border rounded-md p-4">
              <h3 className="text-yellow-400 font-bold mb-2">{result.productName}</h3>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <div className={gridItemClass}>
                  <p className="text-yellow-400 font-bold">Application Rate</p>
                  <p>{result.applicationRate} oz per unit of seed</p>
                </div>
                <div className={gridItemClass}>
                  <p className="text-yellow-400 font-bold">Total Amount of Product Needed</p>
                  <p>{formatNumber(result.totalProductNeeded || 0)} oz</p>
                </div>
                <div className={gridItemClass}>
                  <p className="text-yellow-400 font-bold">Total Product Units to Order</p>
                  <p>{result.packagesNeeded} – {result.productPackageString}</p>
                </div>
                <div className={gridItemClass}>
                  <p className="text-yellow-400 font-bold">Product Cost per Ounce</p>
                  <p>{formatCurrency(result.costPerUnit || 0)}</p>
                </div>
                <div className={gridItemClass}>
                  <p className="text-yellow-400 font-bold">Total Cost to Grower (MSRP)</p>
                  <p>{formatCurrency(result.originalTotalCostToGrower)}</p>
                </div>
                <div className={gridItemClass}>
                  <p className="text-yellow-400 font-bold">Total Discounted Cost to Grower</p>
                  <p>{formatCurrency(result.discountedTotalCostToGrower)}</p>
                </div>
                <div className={gridItemClass}>
                  <p className="text-yellow-400 font-bold">Product Cost per Unit of Treated Seed</p>
                  <p>{formatCurrency(result.costPerUnitOfSeed || 0)}</p>
                </div>
                <div className={gridItemClass}>
                  <p className="text-yellow-400 font-bold">Individual Cost of Seed Treatment per Acre</p>
                  <p>{formatCurrency(result.individualCostPerAcre || 0)}</p>
                </div>
              </div>
            </div>
          ))}
        </>
      )}

      {/* In-Furrow / Foliar Products */}
      {inFurrowFoliarResults.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-blue-400">In-Furrow / Foliar Product Costs</h2>
          <div className="grid grid-cols-1 gap-4">
            {inFurrowFoliarResults.map((product, i) => (
              <div key={i} className="bg-zinc-900 border rounded-md p-4">
                <h3 className="text-yellow-400 font-bold mb-2">{product.productName}</h3>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                  <div className={gridItemClass}>
                    <p className="text-yellow-400 font-bold">Application Rate</p>
                    <p>{formatNumber(product.applicationRate || 0)} oz/acre</p>
                  </div>
                  <div className={gridItemClass}>
                    <p className="text-yellow-400 font-bold">Total Amount of Product Needed</p>
                    <p>{formatNumber(product.totalProductNeeded || 0)} oz</p>
                  </div>
                  <div className={gridItemClass}>
                    <p className="text-yellow-400 font-bold">Total Product Units to Order</p>
                    <p>{formatNumber(product.packagesNeeded)} – {product.productPackageString}</p>
                  </div>
                  <div className={gridItemClass}>
                    <p className="text-yellow-400 font-bold">Product Cost per Ounce</p>
                    <p>{formatCurrency(product.costPerUnit || 0)}</p>
                  </div>
                  <div className={gridItemClass}>
                    <p className="text-yellow-400 font-bold">Total Cost to Grower (MSRP)</p>
                    <p>{formatCurrency(product.originalTotalCostToGrower)}</p>
                  </div>
                  <div className={gridItemClass}>
                    <p className="text-yellow-400 font-bold">Total Discounted Cost to Grower</p>
                    <p>{formatCurrency(product.discountedTotalCostToGrower)}</p>
                  </div>
                  <div className={gridItemClass}>
                    <p className="text-yellow-400 font-bold">Individual Cost per Acre</p>
                    <p>{formatCurrency(product.individualCostPerAcre)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Summary: Total + ROI */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="bg-zinc-900 border rounded-md p-4">
          <h2 className="text-lg font-bold text-yellow-400">Total YMS Biological Program Cost</h2>
          <p>Undiscounted Total Cost = {formatCurrency(totalUndiscountedCost)}</p>
          <p>Total Discounted Cost = {formatCurrency(totalDiscountedCost)}</p>
          <p>Total Program Cost per Acre = {formatCurrency(totalCostPerAcre)}</p>
        </div>

        <div className="bg-zinc-900 border rounded-md p-4">
          <h2 className="text-lg font-bold text-yellow-400">Breakeven ROI Calculation</h2>
          <p>Breakeven Yield per Acre = {roi ? formatYieldUnit(roi.breakeven) : "-"}</p>
          <p>Yield Needed for 2:1 ROI = {roi ? formatYieldUnit(roi.twoToOne) : "-"}</p>
          <p>Yield Needed for 3:1 ROI = {roi ? formatYieldUnit(roi.threeToOne) : "-"}</p>
          <p>Yield Needed for 4:1 ROI = {roi ? formatYieldUnit(roi.fourToOne) : "-"}</p>
          <p>Yield Needed for 5:1 ROI = {roi ? formatYieldUnit(roi.fiveToOne) : "-"}</p>
        </div>
      </div>
    </div>
  );
}
