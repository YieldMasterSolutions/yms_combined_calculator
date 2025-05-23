// src/components/ResultsDisplay.tsx

import React from "react";
import { ProductCalculation } from "../utils/calculations";
import { formatNumber } from "../utils/formatNumber";

interface ResultsDisplayProps {
  seedTreatmentResults: ProductCalculation[];
  inFurrowFoliarResults: ProductCalculation[];
  totalCostPerAcre: number;
  totalUndiscountedCost: number;
  totalDiscountedCost: number;
  roi2: number;
  roi3: number;
  roi4: number;
  roi5: number;
  seedType: string;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  seedTreatmentResults,
  inFurrowFoliarResults,
  totalCostPerAcre,
  totalUndiscountedCost,
  totalDiscountedCost,
  roi2,
  roi3,
  roi4,
  roi5,
  seedType,
}) => {
  const pluralize = (word: string, count: number) => (count === 1 ? word : `${word}s`);
  const unitLabel = ["Corn", "Soybeans", "Wheat", "Sorghum"].includes(seedType) ? "bu/acre" : "lbs/acre";

  const renderProduct = (product: ProductCalculation) => (
    <div key={product.productName} className="mb-6 border p-4 rounded shadow-sm bg-white">
      <div className="grid grid-cols-2 gap-y-2 text-sm">
        <div className="font-semibold text-yellow-600">Product Name</div>
        <div>{product.productName} ({product.applicationMethod})</div>

        <div className="font-semibold text-yellow-600">Application Rate</div>
        <div>{formatNumber(product.applicationRate)} {product.rateUnit}</div>

        <div className="font-semibold text-yellow-600">Total Product Needed</div>
        <div>{formatNumber(product.totalProductNeeded)} {product.rateUnit?.split("/")[0]}</div>

        <div className="font-semibold text-yellow-600">Total Product Units to Order</div>
        <div>
          {formatNumber(product.totalProductUnits, 0)} – {product.packageSize} {product.packageUnits} – {pluralize(product.packageType || "", product.totalProductUnits || 0)}
        </div>

        <div className="font-semibold text-yellow-600">Product Cost per Unit</div>
        <div>${formatNumber(product.productCostPerOz)}</div>

        <div className="font-semibold text-yellow-600">Total MSRP</div>
        <div>${formatNumber(product.originalTotalCostToGrower)}</div>

        <div className="font-semibold text-yellow-600">Total Discounted Cost</div>
        <div>${formatNumber(product.discountedTotalCostToGrower)}</div>

        <div className="font-semibold text-yellow-600">Cost per Acre</div>
        <div>${formatNumber(product.individualCostPerAcre)}</div>
      </div>
    </div>
  );

  return (
    <div className="text-black text-sm font-[Open_Sans] space-y-8">
      {/* Seed Treatment: Basic Calculations */}
      {seedTreatmentResults.length > 0 && (
        <>
          <h2 className="text-blue-600 text-lg font-[Montserrat]">Basic Seed Calculations</h2>
          <div className="mb-4 border p-4 rounded shadow-sm bg-white grid grid-cols-2 gap-y-2 text-sm">
            <div className="font-semibold text-yellow-600">Number of Bushels to Be Treated</div>
            <div>{formatNumber(seedTreatmentResults[0].totalBushels)}</div>

            <div className="font-semibold text-yellow-600">Total Weight of Seed (lbs)</div>
            <div>{formatNumber(seedTreatmentResults[0].totalWeight)}</div>

            <div className="font-semibold text-yellow-600">Units to Be Treated</div>
            <div>{formatNumber(seedTreatmentResults[0].unitsToBeTreated)}</div>

            <div className="font-semibold text-yellow-600">Seeds per Unit</div>
            <div>{formatNumber(seedTreatmentResults[0].seedsPerUnit)}</div>
          </div>
        </>
      )}

      {/* Seed Treatment: Cost Breakdown */}
      {seedTreatmentResults.length > 0 && (
        <>
          <h2 className="text-blue-600 text-lg font-[Montserrat]">Seed Treatment Costs</h2>
          {seedTreatmentResults.map(renderProduct)}
        </>
      )}

      {/* In-Furrow / Foliar Products */}
      {inFurrowFoliarResults.length > 0 && (
        <>
          <h2 className="text-blue-600 text-lg font-[Montserrat]">In-Furrow / Foliar Product Costs</h2>
          {inFurrowFoliarResults.map(renderProduct)}
        </>
      )}

      {/* Total Program Cost */}
      <div className="border-t pt-4">
        <h2 className="text-blue-600 text-lg font-[Montserrat]">Total Program Cost</h2>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <div className="font-semibold text-yellow-600">Total Undiscounted Cost</div>
          <div>${formatNumber(totalUndiscountedCost)}</div>

          <div className="font-semibold text-yellow-600">Total Discounted Cost</div>
          <div>${formatNumber(totalDiscountedCost)}</div>

          <div className="font-semibold text-yellow-600">Cost per Acre</div>
          <div>${formatNumber(totalCostPerAcre)}</div>
        </div>
      </div>

      {/* ROI Calculations */}
      <div className="border-t pt-4">
        <h2 className="text-blue-600 text-lg font-[Montserrat]">Breakeven ROI Calculations</h2>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <div className="font-semibold text-yellow-600">Yield Needed for 2:1 ROI</div>
          <div>{formatNumber(roi2)} {unitLabel}</div>

          <div className="font-semibold text-yellow-600">Yield Needed for 3:1 ROI</div>
          <div>{formatNumber(roi3)} {unitLabel}</div>

          <div className="font-semibold text-yellow-600">Yield Needed for 4:1 ROI</div>
          <div>{formatNumber(roi4)} {unitLabel}</div>

          <div className="font-semibold text-yellow-600">Yield Needed for 5:1 ROI</div>
          <div>{formatNumber(roi5)} {unitLabel}</div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
