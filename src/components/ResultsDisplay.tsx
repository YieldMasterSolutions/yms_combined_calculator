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

const formatCurrency = (value: number) =>
  `$${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

const formatNumber = (value: number) =>
  value.toLocaleString(undefined, { maximumFractionDigits: 0 });

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
  const hasSeedTreatments = seedTreatmentResults.length > 0;
  const firstSeed = hasSeedTreatments ? seedTreatmentResults[0] : null;

  return (
    <div className="space-y-8 mt-8">
      {hasSeedTreatments && firstSeed && (
        <>
          <h2 className="text-2xl font-bold text-yellow-400 border-b border-yellow-400 pb-1">
            Seed Treatment Calculations
          </h2>

          {/* Seeding Info (shared) */}
          <div className="grid grid-cols-2 gap-6 bg-zinc-900 border rounded-md p-6">
            <div>
              <p className="text-yellow-400 font-bold">Total Number of Seeds to be Treated</p>
              <p>{formatNumber(firstSeed.totalSeeds || 0)}</p>
            </div>
            <div>
              <p className="text-yellow-400 font-bold">Total Weight of Seeds to be Treated</p>
              <p>{formatNumber(firstSeed.totalSeedWeight || 0)} lbs</p>
            </div>
            <div>
              <p className="text-yellow-400 font-bold">Number of Seeds per Unit</p>
              <p>{formatNumber(firstSeed.seedsPerUnit || 0)}</p>
            </div>
            <div>
              <p className="text-yellow-400 font-bold">Total Number of Units to be Treated</p>
              <p>{formatNumber(firstSeed.totalUnits || 0)}</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-yellow-400 border-b border-yellow-400 pb-1">
            Seed Treatment Costs
          </h2>

          {seedTreatmentResults.map((p, i) => (
            <div key={`seed-${i}`} className="bg-zinc-900 border rounded-md p-6 space-y-2">
              <h3 className="text-xl font-bold text-yellow-400">{p.productName}</h3>
              <p>Application Rate: {p.applicationRate?.toFixed(2)} oz/unit</p>
              <p>Total Amount of Product Needed: {p.totalProductNeeded?.toFixed(2)} oz</p>
              <p>Total Number of Product Packages: {p.packagesNeeded} – {p.productPackageString}</p>
              <p>Product Cost per Package: {formatCurrency(p.packagesNeeded * (p.costPerUnit || 0) * (p.applicationRate || 0))}</p>
              <p>Total Cost to the Grower: {formatCurrency(p.originalTotalCostToGrower)}</p>
              <p>Product Cost per Ounce: {formatCurrency(p.costPerUnit || 0)}</p>
              <p>Total Discounted Cost to Grower: {formatCurrency(p.discountedTotalCostToGrower)}</p>
              <p>Product Cost per Unit of Treated Seed: {formatCurrency(p.costPerUnitOfSeed || 0)}</p>
              <p>Product Cost per Acre: {formatCurrency(p.individualCostPerAcre)}</p>
            </div>
          ))}
        </>
      )}

      {inFurrowFoliarResults.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-yellow-400 border-b border-yellow-400 pb-1">
            In-Furrow / Foliar Product Costs
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {inFurrowFoliarResults.map((product, i) => (
              <div key={`foliar-${i}`} className="bg-zinc-900 border rounded-md p-6 space-y-2">
                <h3 className="text-xl font-bold text-yellow-400">{product.productName}</h3>
                <p>Total Product Units to Order: {product.packagesNeeded} – {product.productPackageString}</p>
                <p>Total Cost to Grower (MSRP): {formatCurrency(product.originalTotalCostToGrower)}</p>
                <p>Total Discounted Cost to Grower: {formatCurrency(product.discountedTotalCostToGrower)}</p>
                <p>Individual Cost of Product per Acre: {formatCurrency(product.individualCostPerAcre)}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 border rounded-md p-6 space-y-2">
          <h3 className="text-xl font-bold text-yellow-400">Total YMS Biological Program Cost</h3>
          <p>Undiscounted Total Cost: {formatCurrency(totalUndiscountedCost)}</p>
          <p>Total Discounted Cost: {formatCurrency(totalDiscountedCost)}</p>
          <p>Total Program Cost per Acre: {formatCurrency(totalCostPerAcre)}</p>
        </div>
        <div className="bg-zinc-900 border rounded-md p-6 space-y-2">
          <h3 className="text-xl font-bold text-yellow-400">Breakeven ROI Calculation</h3>
          <p>Breakeven Yield per Acre: {breakevenYield !== null ? `${breakevenYield.toFixed(2)} ${cropPriceUnit}/acre` : "N/A"}</p>
          <p>ROI Yield for 2:1 Investment: {roi2 !== null ? `${roi2.toFixed(2)} ${cropPriceUnit}/acre` : "N/A"}</p>
          <p>ROI Yield for 3:1 Investment: {roi3 !== null ? `${roi3.toFixed(2)} ${cropPriceUnit}/acre` : "N/A"}</p>
          <p>ROI Yield for 4:1 Investment: {roi4 !== null ? `${roi4.toFixed(2)} ${cropPriceUnit}/acre` : "N/A"}</p>
          <p>ROI Yield for 5:1 Investment: {roi5 !== null ? `${roi5.toFixed(2)} ${cropPriceUnit}/acre` : "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
