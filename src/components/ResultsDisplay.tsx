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
  const formatCurrency = (value: number) =>
    `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const formatNumber = (value: number) => value.toLocaleString();

  const hasSeedTreatments = seedTreatmentResults.length > 0;
  const firstSeed = hasSeedTreatments ? seedTreatmentResults[0] : null;

  return (
    <div className="space-y-10">
      {/* ✅ Seed Treatment Section */}
      <h2 className="text-2xl font-bold text-yellow-400">Seed Treatment Calculations</h2>

      {/* ✅ Seeding Info Card (shown only once) */}
      {firstSeed && (
        <div className="border p-4 rounded-md grid grid-cols-2 gap-4 bg-zinc-900">
          <div>
            <div className="font-bold text-yellow-400">Total Number of Seeds to be Treated</div>
            <div>{formatNumber(firstSeed.totalSeeds || 0)}</div>
          </div>
          <div>
            <div className="font-bold text-yellow-400">Total Weight of Seeds to be Treated</div>
            <div>{formatNumber(firstSeed.totalSeedWeight || 0)} lbs</div>
          </div>
          <div>
            <div className="font-bold text-yellow-400">Total Number of Units to be Treated</div>
            <div>{formatNumber(firstSeed.totalUnits || 0)}</div>
          </div>
          <div>
            <div className="font-bold text-yellow-400">Number of Seeds per Unit</div>
            <div>{formatNumber(firstSeed.seedsPerUnit || 0)}</div>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold text-yellow-400">Seed Treatment Costs</h2>

      {/* ✅ Seed Treatment Cards */}
      {hasSeedTreatments ? (
        seedTreatmentResults.map((result, index) => (
          <div key={index} className="border p-4 rounded-md grid grid-cols-2 gap-4 bg-zinc-900">
            <h3 className="col-span-2 text-yellow-400 font-bold text-lg">
              {result.productName}
            </h3>
            <div>
              <div className="font-bold text-yellow-400">Application Rate</div>
              <div>{result.applicationRate} oz per unit of seed</div>
            </div>
            <div>
              <div className="font-bold text-yellow-400">Total Amount of Product Needed</div>
              <div>{result.totalProductNeeded?.toFixed(2)} oz</div>
            </div>
            <div>
              <div className="font-bold text-yellow-400">Total Number of Product Packages</div>
              <div>
                {result.packagesNeeded} {result.productPackageString.split(" - ")[1]}
              </div>
            </div>
            <div>
              <div className="font-bold text-yellow-400">Product Cost per Package</div>
              <div>{formatCurrency(result.originalTotalCostToGrower / result.packagesNeeded)}</div>
            </div>
            <div>
              <div className="font-bold text-yellow-400">Total Cost to the Grower</div>
              <div>{formatCurrency(result.originalTotalCostToGrower)}</div>
            </div>
            <div>
              <div className="font-bold text-yellow-400">Product Cost per Ounce</div>
              <div>{formatCurrency(result.costPerUnit || 0)}</div>
            </div>
            <div>
              <div className="font-bold text-yellow-400">Total Discounted Cost to Grower</div>
              <div>{formatCurrency(result.discountedTotalCostToGrower)}</div>
            </div>
            <div>
              <div className="font-bold text-yellow-400">Product Cost per Unit of Treated Seed</div>
              <div>{formatCurrency(result.costPerUnitOfSeed || 0)}</div>
            </div>
            <div>
              <div className="font-bold text-yellow-400">Product Cost per Acre</div>
              <div>{formatCurrency(result.individualCostPerAcre)}</div>
            </div>
          </div>
        ))
      ) : (
        <div className="border p-4 rounded-md bg-zinc-900 text-yellow-400 text-center">
          No Seed Treatments Selected
        </div>
      )}

      {/* ✅ In-Furrow/Foliar Output */}
      {inFurrowFoliarResults.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-yellow-400">Individual Product Costs</h2>
          {inFurrowFoliarResults.map((result, index) => (
            <div key={index} className="border p-4 rounded-md bg-zinc-900">
              <h3 className="text-yellow-400 font-bold">{result.productName}</h3>
              <p>Total Product Units to Order = {result.packagesNeeded} – {result.productPackageString}</p>
              <p>Total Cost to Grower (MSRP) = {formatCurrency(result.originalTotalCostToGrower)}</p>
              <p>Total Discounted Cost to Grower = {formatCurrency(result.discountedTotalCostToGrower)}</p>
              <p>Individual Cost of Product per Acre = {formatCurrency(result.individualCostPerAcre)}</p>
            </div>
          ))}
        </>
      )}

      {/* ✅ Program Cost + ROI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border p-4 rounded-md bg-zinc-900">
          <h3 className="text-yellow-400 font-bold text-lg">Total YMS Biological Program Cost</h3>
          <p>Undiscounted Total Cost = {formatCurrency(totalUndiscountedCost)}</p>
          <p>Total Discounted Total Cost = {formatCurrency(totalDiscountedCost)}</p>
          <p>Total Program Cost per Acre = {formatCurrency(totalCostPerAcre)}</p>
        </div>

        <div className="border p-4 rounded-md bg-zinc-900">
          <h3 className="text-yellow-400 font-bold text-lg">Breakeven ROI Calculation</h3>
          {breakevenYield !== null && (
            <>
              <p>Breakeven Yield per Acre = {breakevenYield.toFixed(2)} {cropPriceUnit}/acre</p>
              <p>ROI Yield for 2:1 Investment = {(roi2 || 0).toFixed(2)} {cropPriceUnit}/acre</p>
              <p>ROI Yield for 3:1 Investment = {(roi3 || 0).toFixed(2)} {cropPriceUnit}/acre</p>
              <p>ROI Yield for 4:1 Investment = {(roi4 || 0).toFixed(2)} {cropPriceUnit}/acre</p>
              <p>ROI Yield for 5:1 Investment = {(roi5 || 0).toFixed(2)} {cropPriceUnit}/acre</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
