// src/components/PDFResults.tsx

import React from "react";
import { ProductCalculation } from "../utils/calculations";
import { formatNumber } from "../utils/formatNumber";

interface PDFResultsProps {
  growerName: string;
  repName: string;
  seedTreatmentResults: ProductCalculation[];
  inFurrowFoliarResults: ProductCalculation[];
  totalCostPerAcre: number;
  totalUndiscountedCost: number;
  totalDiscountedCost: number;
  roi: {
    roi2x: number;
    roi3x: number;
    roi4x: number;
    roi5x: number;
  };
}

const PDFResults: React.FC<PDFResultsProps> = ({
  growerName,
  repName,
  seedTreatmentResults,
  inFurrowFoliarResults,
  totalCostPerAcre,
  totalUndiscountedCost,
  totalDiscountedCost,
  roi,
}) => {
  const renderProduct = (product: ProductCalculation) => (
    <div key={product.productName} className="mb-4 border-b pb-2">
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="font-semibold">Product Name</div>
        <div>{product.productName} ({product.applicationType})</div>

        <div className="font-semibold">Application Rate</div>
        <div>{product.applicationRate} {product.applicationUnit} / acre</div>

        <div className="font-semibold">Total Product Needed</div>
        <div>{formatNumber(product.totalProductNeeded)} {product.applicationUnit}</div>

        <div className="font-semibold">Total Product Units to Order</div>
        <div>{formatNumber(product.totalProductUnits, 0)}</div>

        <div className="font-semibold">Product Cost per Unit</div>
        <div>${formatNumber(product.costPerUnit)}</div>

        <div className="font-semibold">Total MSRP</div>
        <div>${formatNumber(product.totalMSRP)}</div>

        <div className="font-semibold">Total Discounted Cost</div>
        <div>${formatNumber(product.totalDiscountedCost)}</div>

        <div className="font-semibold">Cost per Acre</div>
        <div>${formatNumber(product.costPerAcre)}</div>
      </div>
    </div>
  );

  return (
    <div className="p-6 text-black bg-white text-sm font-[Open_Sans] w-full max-w-[900px] mx-auto">
      <div className="mb-4 text-center">
        <h1 className="text-xl font-[Montserrat] text-blue-700 mb-2">YMS Product Calculator Summary</h1>
        <p>Grower: <span className="font-semibold">{growerName || "—"}</span></p>
        <p>Rep: <span className="font-semibold">{repName || "—"}</span></p>
      </div>

      {/* Seed Treatment Results */}
      {seedTreatmentResults.length > 0 && (
        <>
          <h2 className="text-lg font-[Montserrat] text-blue-700 mb-2">Seed Treatment: Basic Calculations</h2>
          {renderProduct(seedTreatmentResults[0])}

          <h2 className="text-lg font-[Montserrat] text-blue-700 mt-6 mb-2">Seed Treatment: Cost Breakdown</h2>
          {seedTreatmentResults.slice(1).map(renderProduct)}
        </>
      )}

      {/* In-Furrow / Foliar Results */}
      {inFurrowFoliarResults.length > 0 && (
        <>
          <h2 className="text-lg font-[Montserrat] text-blue-700 mt-6 mb-2">In-Furrow / Foliar Product Costs</h2>
          {inFurrowFoliarResults.map(renderProduct)}
        </>
      )}

      {/* Total Program Cost Summary */}
      <div className="mt-8 border-t pt-4">
        <h2 className="text-lg font-[Montserrat] text-blue-700 mb-2">Total Program Cost Summary</h2>
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
      <div className="mt-6 border-t pt-4">
        <h2 className="text-lg font-[Montserrat] text-blue-700 mb-2">Breakeven ROI Calculations</h2>
        <div className="grid grid-cols-2 gap-y-2">
          <div className="font-semibold">2:1 ROI Threshold</div>
          <div>{formatNumber(roi.roi2x)} bu/acre</div>

          <div className="font-semibold">3:1 ROI Threshold</div>
          <div>{formatNumber(roi.roi3x)} bu/acre</div>

          <div className="font-semibold">4:1 ROI Threshold</div>
          <div>{formatNumber(roi.roi4x)} bu/acre</div>

          <div className="font-semibold">5:1 ROI Threshold</div>
          <div>{formatNumber(roi.roi5x)} bu/acre</div>
        </div>
      </div>
    </div>
  );
};

export default PDFResults;
