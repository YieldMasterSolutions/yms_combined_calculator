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
  marketPriceUnit: string;
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
  marketPriceUnit,
}) => {
  const pluralize = (word: string, count: number) => (count === 1 ? word : `${word}s`);
  const unitLabel = marketPriceUnit.includes("/") ? marketPriceUnit.split("/")[1] : marketPriceUnit;

  const renderSeedCalcBlock = (product: ProductCalculation) => (
    <div key={product.productName + "-seed"} className="mb-4 border-b pb-2">
      <div className="grid grid-cols-2 gap-2 text-[1rem] text-black">
        <div className="font-semibold">Product Name</div>
        <div>{product.productName} ({product.applicationMethod})</div>

        <div className="font-semibold">Number of Bushels to Be Treated</div>
        <div>{formatNumber(product.totalBushels)}</div>

        <div className="font-semibold">Total Weight of Seeds to Be Treated</div>
        <div>{formatNumber(product.totalWeight)} lbs</div>

        <div className="font-semibold">Total Units to Be Treated</div>
        <div>{formatNumber(product.unitsToBeTreated)}</div>

        <div className="font-semibold">Seeds per Unit</div>
        <div>{formatNumber(product.seedsPerUnit, 0)}</div>

        <div className="font-semibold">Application Rate</div>
        <div>{formatNumber(product.applicationRate)} {product.rateUnit}</div>

        <div className="font-semibold">Total Amount of Product Needed</div>
        <div>{formatNumber(product.totalProductNeeded)} {product.rateUnit?.split("/")[0]}</div>

        <div className="font-semibold">Total Product Units to Order</div>
        <div>
          {formatNumber(product.totalProductUnits, 0)} – {product.packageSize} {product.packageUnits} – {pluralize(product.packageType || "", product.totalProductUnits || 0)}
        </div>
      </div>
    </div>
  );

  const renderProductCostBlock = (product: ProductCalculation) => (
    <div key={product.productName + "-cost"} className="mb-4 border-b pb-2">
      <div className="grid grid-cols-2 gap-2 text-[1rem] text-black">
        <div className="font-semibold">Product Name</div>
        <div>{product.productName} ({product.applicationMethod})</div>

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
    <div className="print-grayscale p-6 text-black bg-white text-[1rem] font-[Open_Sans] w-full max-w-[900px] mx-auto">
      <div className="mb-4 text-center">
        <h1 className="text-xl font-[Montserrat] font-bold mb-2">YMS Program Calculator Summary</h1>
        <p>Grower: <span className="font-semibold">{growerName || "—"}</span></p>
        <p>Rep: <span className="font-semibold">{repName || "—"}</span></p>
      </div>

      {seedTreatmentResults.length > 0 && (
        <>
          <h2 className="text-lg font-[Montserrat] font-bold mb-2">Basic Seed Calculations</h2>
          {renderSeedCalcBlock(seedTreatmentResults[0])}
        </>
      )}

      {seedTreatmentResults.length > 1 && (
        <>
          <h2 className="text-lg font-[Montserrat] font-bold mt-6 mb-2">Seed Treatment Costs</h2>
          {seedTreatmentResults.slice(1).map(renderProductCostBlock)}
        </>
      )}

      {inFurrowFoliarResults.length > 0 && (
        <>
          <h2 className="text-lg font-[Montserrat] font-bold mt-6 mb-2">In-Furrow / Foliar Product Costs</h2>
          {inFurrowFoliarResults.map(renderProductCostBlock)}
        </>
      )}

      <div className="mt-8 border-t pt-4">
        <h2 className="text-lg font-[Montserrat] font-bold mb-2">Total Program Cost Summary</h2>
        <div className="grid grid-cols-2 gap-y-2 text-[1rem]">
          <div className="font-semibold">Total Undiscounted Cost</div>
          <div>${formatNumber(totalUndiscountedCost)}</div>

          <div className="font-semibold">Total Discounted Cost</div>
          <div>${formatNumber(totalDiscountedCost)}</div>

          <div className="font-semibold">Cost per Acre</div>
          <div>${formatNumber(totalCostPerAcre)}</div>
        </div>
      </div>

      {(marketPriceUnit && marketPriceUnit.length > 0) && (
        <div className="mt-6 border-t pt-4">
          <h2 className="text-lg font-[Montserrat] font-bold mb-2">Breakeven ROI Calculations</h2>
          <div className="grid grid-cols-2 gap-y-2 text-[1rem]">
            <div className="font-semibold">2:1 ROI Threshold</div>
            <div>{formatNumber(roi.roi2x)} {unitLabel}/acre</div>

            <div className="font-semibold">3:1 ROI Threshold</div>
            <div>{formatNumber(roi.roi3x)} {unitLabel}/acre</div>

            <div className="font-semibold">4:1 ROI Threshold</div>
            <div>{formatNumber(roi.roi4x)} {unitLabel}/acre</div>

            <div className="font-semibold">5:1 ROI Threshold</div>
            <div>{formatNumber(roi.roi5x)} {unitLabel}/acre</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFResults;
