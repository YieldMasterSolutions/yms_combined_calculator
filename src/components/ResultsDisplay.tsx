// src/components/ResultsDisplay.tsx

"use client";

import React from "react";
import type { ProductCalculation } from "@/utils/calculations";

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
  const formatCurrency = (num: number) => `$${num.toFixed(2)}`;
  const formatNumber = (num: number) => num.toLocaleString();

  const renderDetailBox = (label: string, value: string | number) => (
    <div className="bg-zinc-900 text-white border border-zinc-700 rounded px-4 py-3 text-sm">
      <p className="text-yellow-400 font-bold mb-1">{label}</p>
      <p>{value}</p>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Seed Treatment Section */}
      {seedTreatmentResults.map((product, index) => (
        <div key={index} className="space-y-2">
          <h3 className="text-lg font-bold text-yellow-400">{product.productName}</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {renderDetailBox("Total Number of Seeds to be Treated", formatNumber(product.totalSeeds!))}
            {renderDetailBox("Total Weight of Seeds to be Treated", `${formatNumber(product.totalSeedWeight!)} lbs`)}
            {renderDetailBox("Total Number of Units to be Treated", formatNumber(product.totalUnits!))}
            {renderDetailBox("Number of Seeds per Unit", formatNumber(product.seedsPerUnit!))}
            {renderDetailBox("Application Rate", `${product.applicationRate!.toFixed(2)} oz per unit of seed`)}
            {renderDetailBox("Total Amount of Product Needed", `${product.totalProductNeeded!.toFixed(2)} oz`)}
            {renderDetailBox("Total Number of Product Packages", `${product.packagesNeeded} ${product.productPackageString.split(" - ")[2]}`)}
            {renderDetailBox("Product Cost per Package", formatCurrency(parseFloat(product.productPackageString.match(/\$(\d+(?:\.\d+)?)/)?.[1] || "0") || 0))}
            {renderDetailBox("Total Cost to the Grower", formatCurrency(product.originalTotalCostToGrower))}
            {renderDetailBox("Product Cost per Ounce", formatCurrency(product.costPerUnit!))}
            {renderDetailBox("Product Cost per Unit of Treated Seed", formatCurrency(product.costPerUnitOfSeed!))}
            {renderDetailBox("Product Cost per Acre", formatCurrency(product.individualCostPerAcre))}
          </div>
        </div>
      ))}

      {/* In-Furrow / Foliar Section */}
      {inFurrowFoliarResults.length > 0 && (
        <>
          <h3 className="text-lg font-bold text-yellow-400 mt-6">Individual Product Costs</h3>
          <div className="space-y-4">
            {inFurrowFoliarResults.map((product, index) => (
              <div key={index} className="bg-zinc-900 text-white border border-zinc-700 rounded px-4 py-4">
                <p className="text-yellow-400 font-bold text-md mb-2">{product.productName}</p>
                <p>Total Product Units to Order = {product.packagesNeeded} – {product.productPackageString}</p>
                <p>Total Cost to Grower (MSRP) = {formatCurrency(product.originalTotalCostToGrower)}</p>
                <p>Total Discounted Cost to Grower = {formatCurrency(product.discountedTotalCostToGrower)}</p>
                <p>Individual Cost of Product per Acre = {formatCurrency(product.individualCostPerAcre)}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Program Cost Section */}
      <div className="bg-zinc-900 text-white border border-zinc-700 rounded px-4 py-4">
        <h3 className="text-lg font-bold text-yellow-400 mb-2">Total YMS Biological Program Cost</h3>
        <p>Undiscounted Total Cost = {formatCurrency(totalUndiscountedCost)}</p>
        <p>Total Discounted Total Cost = {formatCurrency(totalDiscountedCost)}</p>
        <p>Total Program Cost per Acre = {formatCurrency(totalCostPerAcre)}</p>
      </div>

      {/* ROI Section */}
      <div className="bg-zinc-900 text-white border border-zinc-700 rounded px-4 py-4">
        <h3 className="text-lg font-bold text-yellow-400 mb-2">Breakeven ROI Calculation</h3>
        <p>Breakeven Yield per Acre = {breakevenYield?.toFixed(2) ?? "N/A"} {cropPriceUnit}/acre</p>
        <p>ROI Yield for 2:1 Investment = {roi2?.toFixed(2) ?? "N/A"} {cropPriceUnit}/acre</p>
        <p>ROI Yield for 3:1 Investment = {roi3?.toFixed(2) ?? "N/A"} {cropPriceUnit}/acre</p>
        <p>ROI Yield for 4:1 Investment = {roi4?.toFixed(2) ?? "N/A"} {cropPriceUnit}/acre</p>
        <p>ROI Yield for 5:1 Investment = {roi5?.toFixed(2) ?? "N/A"} {cropPriceUnit}/acre</p>
      </div>
    </div>
  );
};

export default ResultsDisplay;
