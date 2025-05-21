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
}) => {
  const renderProduct = (product: ProductCalculation) => (
    <div key={product.productName} className="mb-4 border-b pb-2">
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="font-semibold">Product Name</div>
        <div>{product.productName} ({product.applicationMethod})</div>

        <div className="font-semibold">Application Rate</div>
        <div>{product.applicationRate} {product.rateUnit}</div>

        <div className="font-semibold">Total Product Needed</div>
        <div>{formatNumber(product.totalProductNeeded)} {product.rateUnit?.split("/")[0]}</div>

        <div className="font-semibold">Total Product Units to Order</div>
        <div>{formatNumber(product.totalProductUnits, 0)}</div>

        <div className="font-semibold">Product Cost per Unit</div>
        <div>${formatNumber(product.productCostPerOz)}</div>

        <div className="font-semibold">Total MSRP</div>
        <div>${formatNumber(product.originalTotalCostToGrower)}</div>

        <div className="font-semibold">Total Discounted Cost</div>
        <div>${formatNumber(product.discountedTotalCostToGrower)}</div>

        <div className="font-semibold">Cost per Acre</div>
        <div>${formatNumber(product.individualCostPerAcre)}</div>
      </div>
    </div>
  );

  return (
    <div className="text-black text-sm font-[Open_Sans] space-y-8">
      {/* Seed Treatment: Basic Calculations */}
      {seedTreatmentResults.length > 0 && (
        <>
          <h2 className="text-blue-600 text-lg font-[Montserrat]">Seed Treatment Calculations</h2>
          {renderProduct(seedTreatmentResults[0])}
        </>
      )}

      {/* Seed Treatment: Cost Breakdown */}
      {seedTreatmentResults.length > 1 && (
        <>
          <h2 className="text-blue-600 text-lg font-[Montserrat]">Seed Treatment Costs</h2>
          {seedTreatmentResults.slice(1).map(renderProduct)}
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
        <div className="grid grid-cols-2 gap-y-2">
          <div className="font-semibold">Total Undiscounted Cost</div>
          <div>${formatNumber(totalUndiscountedCost)}</div>

          <div className="font-semibold">Total Discounted Cost</div>
          <div>${formatNumber(totalDiscountedCost)}</div>

          <div className="font-semibold">Cost per Acre</div>
          <div>${formatNumber(totalCostPerAcre)}</div>
        </div>
      </div>

      {/* ROI Calculations */}
      <div className="border-t pt-4">
        <h2 className="text-blue-600 text-lg font-[Montserrat]">Breakeven ROI Calculations</h2>
        <div className="grid grid-cols-2 gap-y-2">
          <div className="font-semibold">2:1 ROI Threshold</div>
          <div>{formatNumber(roi2)} bu/acre</div>

          <div className="font-semibold">3:1 ROI Threshold</div>
          <div>{formatNumber(roi3)} bu/acre</div>

          <div className="font-semibold">4:1 ROI Threshold</div>
          <div>{formatNumber(roi4)} bu/acre</div>

          <div className="font-semibold">5:1 ROI Threshold</div>
          <div>{formatNumber(roi5)} bu/acre</div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
