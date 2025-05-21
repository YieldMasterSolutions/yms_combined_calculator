// src/components/PDFResults.tsx

import React from "react";
import { ProductCalculation } from "../utils/calculations";
import { formatNumber } from "../utils/formatNumber";

interface PDFResultsProps {
  seedTreatmentResults: ProductCalculation[];
  inFurrowFoliarResults: ProductCalculation[];
  totalCostPerAcre: number;
  totalUndiscountedCost: number;
  totalDiscountedCost: number;
  roi: {
    breakevenYield: number;
    roi2to1: number;
    roi3to1: number;
    roi4to1: number;
    roi5to1: number;
    unit: string;
  };
  growerName: string;
  repName: string;
}

const formatProductLabel = (product: ProductCalculation): string => {
  const name = product.productName;
  const size = product.packageSize;
  const units = product.packageUnits;
  const type = product.packageType;
  const rate = product.applicationRate;
  const rateUnit = product.applicationRateUnit;
  const capacity = product.treatmentCapacity;
  return `${name} – ${size} ${units} – ${type} – ${rate} ${rateUnit} – Treats ${capacity} units`;
};

const PDFResults: React.FC<PDFResultsProps> = ({
  seedTreatmentResults,
  inFurrowFoliarResults,
  totalCostPerAcre,
  totalUndiscountedCost,
  totalDiscountedCost,
  roi,
  growerName,
  repName,
}) => {
  return (
    <div className="space-y-10 text-black p-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">YieldMaster Solutions – Summary Report</h1>
        <p className="text-md">Grower: {growerName} | Rep: {repName}</p>
      </div>

      {seedTreatmentResults.map((result, index) => (
        <div key={index} className="border p-4 rounded space-y-6">
          <h2 className="text-lg font-bold">{formatProductLabel(result)}</h2>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="col-span-2 font-semibold">Seed Treatment Calculations</div>

            <div>Total Number of Bushels to be Treated</div>
            <div>{formatNumber(result.totalBushels ?? 0)}</div>

            <div>Total Weight of Seeds to be Treated</div>
            <div>{formatNumber(result.totalWeight ?? 0)} lbs</div>

            <div>Total Number of Units to be Treated</div>
            <div>{formatNumber(result.unitsToBeTreated ?? 0)}</div>

            <div>Number of Seeds per Unit</div>
            <div>{formatNumber(result.seedsPerUnit ?? 0)}</div>

            <div className="col-span-2 font-semibold mt-4">Seed Treatment Costs</div>

            <div>Application Rate</div>
            <div>{result.applicationRate} {result.applicationRateUnit}</div>

            <div>Total Amount of Product Needed</div>
            <div>{formatNumber(result.totalProductNeeded ?? 0)} {result.packageUnits}</div>

            <div>Total Product Units to Order</div>
            <div>{Math.ceil(result.totalProductUnits ?? 0)} – {result.packageSize} {result.packageUnits} - {result.packageType}</div>

            <div>Product Cost per Ounce</div>
            <div>${formatNumber(result.productCostPerOz ?? 0)}</div>

            <div>Total Cost to Grower (MSRP)</div>
            <div>${formatNumber(result.originalTotalCostToGrower)}</div>

            <div>Total Discounted Cost to Grower</div>
            <div>${formatNumber(result.discountedTotalCostToGrower)}</div>

            <div>Product Cost per Unit of Treated Seed</div>
            <div>${formatNumber(result.productCostPerUnitSeed ?? 0)}</div>

            <div>Individual Cost of Seed Treatment per Acre</div>
            <div>${formatNumber(result.individualCostPerAcre)}</div>
          </div>
        </div>
      ))}

      {inFurrowFoliarResults.map((result, index) => (
        <div key={index} className="border p-4 rounded">
          <h2 className="text-lg font-bold">{formatProductLabel(result)}</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>Application Rate</div>
            <div>{result.applicationRate} {result.applicationRateUnit}</div>

            <div>Total Amount of Product Needed</div>
            <div>{formatNumber(result.totalProductNeeded ?? 0)} {result.packageUnits}</div>

            <div>Total Product Units to Order</div>
            <div>{Math.ceil(result.totalProductUnits ?? 0)} – {result.packageSize} {result.packageUnits} - {result.packageType}</div>

            <div>Product Cost per Ounce</div>
            <div>${formatNumber(result.productCostPerOz ?? 0)}</div>

            <div>Total Cost to Grower (MSRP)</div>
            <div>${formatNumber(result.originalTotalCostToGrower)}</div>

            <div>Total Discounted Cost to Grower</div>
            <div>${formatNumber(result.discountedTotalCostToGrower)}</div>

            <div>Individual Cost per Acre</div>
            <div>${formatNumber(result.individualCostPerAcre)}</div>
          </div>
        </div>
      ))}

      <div className="border p-4 rounded space-y-4">
        <h2 className="text-lg font-bold">Breakeven ROI Calculations</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
          <div className="border rounded p-2">
            <div>Breakeven ROI</div>
            <div>{formatNumber(roi.breakevenYield)} {roi.unit}/acre</div>
          </div>
          <div className="border rounded p-2">
            <div>Yield Needed for</div>
            <div>2:1 ROI – {formatNumber(roi.roi2to1)} {roi.unit}/acre</div>
          </div>
          <div className="border rounded p-2">
            <div>Yield Needed for</div>
            <div>3:1 ROI – {formatNumber(roi.roi3to1)} {roi.unit}/acre</div>
          </div>
          <div className="border rounded p-2">
            <div>Yield Needed for</div>
            <div>4:1 ROI – {formatNumber(roi.roi4to1)} {roi.unit}/acre</div>
          </div>
          <div className="border rounded p-2">
            <div>Yield Needed for</div>
            <div>5:1 ROI – {formatNumber(roi.roi5to1)} {roi.unit}/acre</div>
          </div>
        </div>
      </div>

      <div className="border p-4 rounded">
        <h2 className="text-lg font-bold">Total Program Cost</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>Total Undiscounted Program Cost</div>
          <div>${formatNumber(totalUndiscountedCost)}</div>

          <div>Total Discounted Program Cost</div>
          <div>${formatNumber(totalDiscountedCost)}</div>

          <div>Total Biological Program Cost per Acre</div>
          <div>${formatNumber(totalCostPerAcre)}</div>
        </div>
      </div>
    </div>
  );
};

export default PDFResults;
