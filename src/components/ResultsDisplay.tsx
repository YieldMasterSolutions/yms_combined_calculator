// src/components/ResultsDisplay.tsx
import React from "react";
import type { ProductCalculation } from "@/utils/calculations";

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
  return (
    <div className="space-y-12 text-white">
      {seedTreatmentResults.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-yellow-400 mt-8">Seed Treatment Costs</h2>
          {seedTreatmentResults.map((result, idx) => (
            <div key={idx} className="grid grid-cols-2 gap-4 bg-zinc-900 border border-zinc-700 p-6 rounded-md">
              <h3 className="col-span-2 text-lg font-bold text-yellow-400">{result.productName}</h3>
              <div><span className="font-semibold text-yellow-400">Total Number of Seeds to be Treated</span><br />{result.totalSeeds?.toLocaleString()}</div>
              <div><span className="font-semibold text-yellow-400">Total Weight of Seeds to be Treated</span><br />{result.totalSeedWeight?.toLocaleString()} lbs</div>
              <div><span className="font-semibold text-yellow-400">Total Number of Units to be Treated</span><br />{result.totalUnits?.toLocaleString()}</div>
              <div><span className="font-semibold text-yellow-400">Number of Seeds per Unit</span><br />{result.seedsPerUnit?.toLocaleString()}</div>
              <div><span className="font-semibold text-yellow-400">Application Rate</span><br />{result.applicationRate?.toFixed(2)} oz per unit of seed</div>
              <div><span className="font-semibold text-yellow-400">Total Amount of Product Needed</span><br />{result.totalProductNeeded?.toFixed(2)} oz</div>
              <div><span className="font-semibold text-yellow-400">Total Number of Product Packages</span><br />{result.packagesNeeded} {result.productPackageString?.split(" - ")[1]}</div>
              <div><span className="font-semibold text-yellow-400">Product Cost per Package</span><br />${result.originalTotalCostToGrower > 0 ? (result.originalTotalCostToGrower / result.packagesNeeded).toFixed(2) : "0.00"}</div>
              <div><span className="font-semibold text-yellow-400">Total Cost to the Grower</span><br />${result.originalTotalCostToGrower.toFixed(2)}</div>
              <div><span className="font-semibold text-yellow-400">Product Cost per Ounce</span><br />${result.costPerUnit?.toFixed(2)}</div>
              <div><span className="font-semibold text-yellow-400">Total Discounted Cost to Grower</span><br />${result.discountedTotalCostToGrower.toFixed(2)}</div>
              <div><span className="font-semibold text-yellow-400">Product Cost per Unit of Treated Seed</span><br />${result.costPerUnitOfSeed?.toFixed(2)}</div>
              <div><span className="font-semibold text-yellow-400">Product Cost per Acre</span><br />${result.individualCostPerAcre.toFixed(2)}</div>
            </div>
          ))}
        </>
      )}

      {inFurrowFoliarResults.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-yellow-400 mt-10">Individual Product Costs</h2>
          {inFurrowFoliarResults.map((product, idx) => (
            <div key={idx} className="grid grid-cols-2 gap-4 bg-zinc-900 border border-zinc-700 p-6 rounded-md mt-4">
              <h3 className="col-span-2 text-lg font-bold text-yellow-400">{product.productName}</h3>
              <div><span className="font-semibold text-yellow-400">Total Product Units to Order</span><br />{product.packagesNeeded} – {product.productPackageString}</div>
              <div><span className="font-semibold text-yellow-400">Product Cost per Package</span><br />${(product.originalTotalCostToGrower / product.packagesNeeded).toFixed(2)}</div>
              <div><span className="font-semibold text-yellow-400">Total Cost to Grower (MSRP)</span><br />${product.originalTotalCostToGrower.toFixed(2)}</div>
              <div><span className="font-semibold text-yellow-400">Total Discounted Cost to Grower</span><br />${product.discountedTotalCostToGrower.toFixed(2)}</div>
              <div><span className="font-semibold text-yellow-400">Individual Cost of Product per Acre</span><br />${product.individualCostPerAcre.toFixed(2)}</div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-md">
        <h3 className="text-lg font-bold text-yellow-400">Total YMS Biological Program Cost</h3>
        <p>Undiscounted Total Cost = ${totalUndiscountedCost.toFixed(2)}</p>
        <p>Total Discounted Total Cost = ${totalDiscountedCost.toFixed(2)}</p>
        <p>Total Program Cost per Acre = ${totalCostPerAcre.toFixed(2)}</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-md">
        <h3 className="text-lg font-bold text-yellow-400">Breakeven ROI Calculation</h3>
        <p>Breakeven Yield per Acre = {breakevenYield?.toFixed(2)} {cropPriceUnit}/acre</p>
        <p>ROI Yield for 2:1 Investment = {roi2?.toFixed(2)} {cropPriceUnit}/acre</p>
        <p>ROI Yield for 3:1 Investment = {roi3?.toFixed(2)} {cropPriceUnit}/acre</p>
        <p>ROI Yield for 4:1 Investment = {roi4?.toFixed(2)} {cropPriceUnit}/acre</p>
        <p>ROI Yield for 5:1 Investment = {roi5?.toFixed(2)} {cropPriceUnit}/acre</p>
      </div>
    </div>
  );
}
