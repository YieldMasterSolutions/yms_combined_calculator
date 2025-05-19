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
  roi: {
    breakevenYield: number;
    roi2to1: number;
    roi3to1: number;
    roi4to1: number;
    roi5to1: number;
    unit: string;
  };
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  seedTreatmentResults,
  inFurrowFoliarResults,
  totalCostPerAcre,
  totalUndiscountedCost,
  totalDiscountedCost,
  roi,
}) => {
  return (
    <div className="mt-10 space-y-10">
      {/* Seed Treatment Results */}
      {seedTreatmentResults.map((result, index) => (
        <div key={index} className="border p-4 rounded shadow">
          <h2 className="section-header-blue">
            {result.productName} ({result.applicationMethod})
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="label-yellow">Total Number of Seeds to be Treated</div>
            <div>{formatNumber(result.totalSeeds ?? 0)}</div>

            <div className="label-yellow">Total Weight of Seeds to be Treated</div>
            <div>{formatNumber(result.totalWeight ?? 0)} lbs</div>

            <div className="label-yellow">Total Number of Units to be Treated</div>
            <div>{formatNumber(result.unitsToBeTreated ?? 0)}</div>

            <div className="label-yellow">Number of Seeds per Unit</div>
            <div>{formatNumber(result.seedsPerUnit ?? 0)}</div>

            <div className="label-yellow">Application Rate</div>
            <div>
              {result.applicationRate} {result.applicationRateUnit} / unit of seed
            </div>

            <div className="label-yellow">Total Amount of Product Needed</div>
            <div>
              {formatNumber(result.totalProductNeeded ?? 0)} {result.applicationRateUnit}
            </div>

            <div className="label-yellow">Total Product Units to Order</div>
            <div>
              {formatNumber(result.totalProductUnits ?? 0)} – {result.packageSize} {result.packageUnits} - {result.packageType}
            </div>

            <div className="label-yellow">Product Cost per Ounce</div>
            <div>${formatNumber(result.productCostPerOz ?? 0)}</div>

            <div className="label-yellow">Total Cost to Grower (MSRP)</div>
            <div>${formatNumber(result.originalTotalCostToGrower)}</div>

            <div className="label-yellow">Total Discounted Cost to Grower</div>
            <div>${formatNumber(result.discountedTotalCostToGrower)}</div>

            <div className="label-yellow">Product Cost per Unit of Treated Seed</div>
            <div>${formatNumber(result.productCostPerUnitSeed ?? 0)}</div>

            <div className="label-yellow">Individual Cost of Seed Treatment per Acre</div>
            <div>${formatNumber(result.individualCostPerAcre)}</div>
          </div>
        </div>
      ))}

      {/* In-Furrow / Foliar Results */}
      {inFurrowFoliarResults.map((result, index) => (
        <div key={index} className="border p-4 rounded shadow">
          <h2 className="section-header-blue">
            {result.productName} ({result.applicationMethod})
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="label-yellow">Application Rate</div>
            <div>
              {result.applicationRate} {result.applicationRateUnit} / acre
            </div>

            <div className="label-yellow">Total Amount of Product Needed</div>
            <div>
              {formatNumber(result.totalProductNeeded ?? 0)} {result.applicationRateUnit}
            </div>

            <div className="label-yellow">Total Product Units to Order</div>
            <div>
              {formatNumber(result.totalProductUnits ?? 0)} – {result.packageSize} {result.packageUnits} - {result.packageType}
            </div>

            <div className="label-yellow">Product Cost per Ounce</div>
            <div>${formatNumber(result.productCostPerOz ?? 0)}</div>

            <div className="label-yellow">Total Cost to Grower (MSRP)</div>
            <div>${formatNumber(result.originalTotalCostToGrower)}</div>

            <div className="label-yellow">Total Discounted Cost to Grower</div>
            <div>${formatNumber(result.discountedTotalCostToGrower)}</div>

            <div className="label-yellow">Individual Cost per Acre</div>
            <div>${formatNumber(result.individualCostPerAcre)}</div>
          </div>
        </div>
      ))}

      {/* Total Program Cost */}
      <div className="border p-4 rounded shadow">
        <h2 className="section-header-blue">Total Program Cost</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="label-yellow">Total Biological Program Cost per Acre</div>
          <div>${formatNumber(totalCostPerAcre)}</div>

          <div className="label-yellow">Total Undiscounted Program Cost</div>
          <div>${formatNumber(totalUndiscountedCost)}</div>

          <div className="label-yellow">Total Discounted Program Cost</div>
          <div>${formatNumber(totalDiscountedCost)}</div>
        </div>
      </div>

      {/* ROI Section */}
      <div className="border p-4 rounded shadow">
        <h2 className="section-header-blue">Breakeven ROI Calculations</h2>
        <div className="grid grid-cols-5 gap-4">
          <div>
            <div className="label-yellow">Breakeven Yield per Acre</div>
            <div>{formatNumber(roi.breakevenYield)} {roi.unit}</div>
          </div>
          <div>
            <div className="label-yellow">Yield Needed for 2:1 ROI</div>
            <div>{formatNumber(roi.roi2to1)} {roi.unit}</div>
          </div>
          <div>
            <div className="label-yellow">Yield Needed for 3:1 ROI</div>
            <div>{formatNumber(roi.roi3to1)} {roi.unit}</div>
          </div>
          <div>
            <div className="label-yellow">Yield Needed for 4:1 ROI</div>
            <div>{formatNumber(roi.roi4to1)} {roi.unit}</div>
          </div>
          <div>
            <div className="label-yellow">Yield Needed for 5:1 ROI</div>
            <div>{formatNumber(roi.roi5to1)} {roi.unit}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
