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

const formatCurrency = (value: number) =>
  `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const formatNumber = (value: number) =>
  value.toLocaleString(undefined, { maximumFractionDigits: 0 });

const formatDecimal = (value: number, digits = 2) =>
  value.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits });

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
  const hasSeedTreatments = seedTreatmentResults.length > 0;

  return (
    <div className="space-y-10 text-white">
      {/* 🧪 Seed Treatment Section */}
      <h2 className="text-3xl font-bold text-yellow-400">Seed Treatment Calculations</h2>

      {hasSeedTreatments && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Seeding Information – shown once */}
          <div className="bg-zinc-900 border border-zinc-700 rounded-md p-6 space-y-2">
            <h3 className="text-xl font-bold text-yellow-400 mb-2">Seeding Information</h3>
            <div className="grid grid-cols-2 gap-4">
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
          </div>
        </div>
      )}

      <h3 className="text-2xl font-bold text-yellow-400">Seed Treatment Costs</h3>

      {hasSeedTreatments ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {seedTreatmentResults.map((res, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-700 rounded-md p-6 space-y-2">
              <h4 className="text-xl font-bold text-yellow-400">{res.productName}</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-yellow-400 font-bold">Application Rate</p>
                  <p>{formatDecimal(res.applicationRate || 0)} oz/unit</p>
                </div>
                <div>
                  <p className="text-yellow-400 font-bold">Total Amount of Product Needed</p>
                  <p>{formatDecimal(res.totalProductNeeded || 0)} oz</p>
                </div>
                <div>
                  <p className="text-yellow-400 font-bold">Total Product Units to Order</p>
                  <p>
                    {formatNumber(res.packagesNeeded)} – {res.productPackageString}
                  </p>
                </div>
                <div>
                  <p className="text-yellow-400 font-bold">Product Cost per Ounce</p>
                  <p>{formatCurrency(res.costPerUnit || 0)}</p>
                </div>
                <div>
                  <p className="text-yellow-400 font-bold">Total Cost to Grower (MSRP)</p>
                  <p>{formatCurrency(res.originalTotalCostToGrower)}</p>
                </div>
                <div>
                  <p className="text-yellow-400 font-bold">Total Discounted Cost to Grower</p>
                  <p>{formatCurrency(res.discountedTotalCostToGrower)}</p>
                </div>
                <div>
                  <p className="text-yellow-400 font-bold">Product Cost per Unit of Treated Seed</p>
                  <p>{formatCurrency(res.costPerUnitOfSeed || 0)}</p>
                </div>
                <div>
                  <p className="text-yellow-400 font-bold">Product Cost per Acre</p>
                  <p>{formatCurrency(res.individualCostPerAcre)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-700 rounded-md p-6 text-white">
          <p className="text-yellow-400 font-bold">No Seed Treatments Selected</p>
        </div>
      )}

      {/* 💧 In-Furrow/Foliar Output */}
      {inFurrowFoliarResults.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-yellow-400">In-Furrow / Foliar Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inFurrowFoliarResults.map((res, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-700 rounded-md p-6 space-y-2">
                <h4 className="text-xl font-bold text-yellow-400">{res.productName}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-yellow-400 font-bold">Product Package</p>
                    <p>{res.productPackageString}</p>
                  </div>
                  <div>
                    <p className="text-yellow-400 font-bold">Packages Needed</p>
                    <p>{formatNumber(res.packagesNeeded)}</p>
                  </div>
                  <div>
                    <p className="text-yellow-400 font-bold">Total Cost to Grower (MSRP)</p>
                    <p>{formatCurrency(res.originalTotalCostToGrower)}</p>
                  </div>
                  <div>
                    <p className="text-yellow-400 font-bold">Total Discounted Cost to Grower</p>
                    <p>{formatCurrency(res.discountedTotalCostToGrower)}</p>
                  </div>
                  <div>
                    <p className="text-yellow-400 font-bold">Product Cost per Acre</p>
                    <p>{formatCurrency(res.individualCostPerAcre)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 📊 Final Program Cost & ROI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 border border-zinc-700 rounded-md p-6">
          <h3 className="text-xl font-bold text-yellow-400 mb-2">Total YMS Biological Program Cost</h3>
          <div className="space-y-2">
            <p>
              <span className="text-yellow-400 font-bold">Total Undiscounted Cost:</span>{" "}
              {formatCurrency(totalUndiscountedCost)}
            </p>
            <p>
              <span className="text-yellow-400 font-bold">Total Discounted Cost:</span>{" "}
              {formatCurrency(totalDiscountedCost)}
            </p>
            <p>
              <span className="text-yellow-400 font-bold">Total Cost per Acre:</span>{" "}
              {formatCurrency(totalCostPerAcre)}
            </p>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-700 rounded-md p-6">
          <h3 className="text-xl font-bold text-yellow-400 mb-2">ROI Yield Calculations</h3>
          <div className="space-y-2">
            <p>
              <span className="text-yellow-400 font-bold">Breakeven Yield per Acre:</span>{" "}
              {breakevenYield ? `${formatDecimal(breakevenYield)} ${cropPriceUnit}/acre` : "N/A"}
            </p>
            <p>
              <span className="text-yellow-400 font-bold">ROI 2:1:</span>{" "}
              {roi2 ? `${formatDecimal(roi2)} ${cropPriceUnit}/acre` : "N/A"}
            </p>
            <p>
              <span className="text-yellow-400 font-bold">ROI 3:1:</span>{" "}
              {roi3 ? `${formatDecimal(roi3)} ${cropPriceUnit}/acre` : "N/A"}
            </p>
            <p>
              <span className="text-yellow-400 font-bold">ROI 4:1:</span>{" "}
              {roi4 ? `${formatDecimal(roi4)} ${cropPriceUnit}/acre` : "N/A"}
            </p>
            <p>
              <span className="text-yellow-400 font-bold">ROI 5:1:</span>{" "}
              {roi5 ? `${formatDecimal(roi5)} ${cropPriceUnit}/acre` : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
