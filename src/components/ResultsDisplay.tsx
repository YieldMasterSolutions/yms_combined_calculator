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
  marketPriceUnit: string;
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
  marketPriceUnit,
}) => {
  const pluralize = (word: string, count: number) =>
    count === 1 ? word : `${word}s`;

  const unitLabel = marketPriceUnit.includes("/")
    ? marketPriceUnit.split("/")[1]
    : marketPriceUnit;

  const renderProduct = (product: ProductCalculation) => (
    <div
      key={product.productName}
      className="mb-6 border p-4 rounded shadow-sm bg-white dark:bg-gray-900 dark:text-white"
    >
      <div className="grid grid-cols-2 gap-y-2 text-[1rem]">
        <div className="font-semibold text-yellow-600 dark:text-yellow-400">Product Name</div>
        <div>
          {product.productName} ({product.applicationMethod})
        </div>

        <div className="font-semibold text-yellow-600 dark:text-yellow-400">Application Rate</div>
        <div>
          {formatNumber(product.applicationRate)} {product.rateUnit}
        </div>

        <div className="font-semibold text-yellow-600 dark:text-yellow-400">
          Total Product Needed
        </div>
        <div>
          {formatNumber(product.totalProductNeeded)} {product.rateUnit?.split("/")[0]}
        </div>

        <div className="font-semibold text-yellow-600 dark:text-yellow-400">
          Total Product Units to Order
        </div>
        <div>
          {formatNumber(product.totalProductUnits, 0)} – {product.packageSize} {product.packageUnits} – {pluralize(product.packageType || "", product.totalProductUnits || 0)}
        </div>

        <div className="font-semibold text-yellow-600 dark:text-yellow-400">
          Product Cost per Unit
        </div>
        <div>${formatNumber(product.productCostPerOz)}</div>

        <div className="font-semibold text-yellow-600 dark:text-yellow-400">Total MSRP</div>
        <div>${formatNumber(product.originalTotalCostToGrower)}</div>

        <div className="font-semibold text-yellow-600 dark:text-yellow-400">
          Total Discounted Cost
        </div>
        <div>${formatNumber(product.discountedTotalCostToGrower)}</div>

        <div className="font-semibold text-yellow-600 dark:text-yellow-400">Cost per Acre</div>
        <div>${formatNumber(product.individualCostPerAcre)}</div>
      </div>
    </div>
  );

  return (
    <div className="text-black dark:text-white text-[1rem] font-[Open_Sans] space-y-8">
      {seedTreatmentResults.length > 0 && (
        <>
          <h2 className="text-blue-600 dark:text-blue-300 text-lg font-[Montserrat]">
            Basic Seed Calculations
          </h2>
          <div className="mb-4 border p-4 rounded shadow-sm bg-white dark:bg-gray-900 grid grid-cols-2 gap-y-2 text-[1rem]">
            <div className="font-semibold text-yellow-600 dark:text-yellow-400">
              Number of Bushels to Be Treated
            </div>
            <div>{formatNumber(seedTreatmentResults[0].totalBushels)}</div>

            <div className="font-semibold text-yellow-600 dark:text-yellow-400">
              Total Weight of Seed (lbs)
            </div>
            <div>{formatNumber(seedTreatmentResults[0].totalWeight)}</div>

            <div className="font-semibold text-yellow-600 dark:text-yellow-400">
              Units to Be Treated
            </div>
            <div>{formatNumber(seedTreatmentResults[0].unitsToBeTreated)}</div>

            <div className="font-semibold text-yellow-600 dark:text-yellow-400">
              Seeds per Unit
            </div>
            <div>{formatNumber(seedTreatmentResults[0].seedsPerUnit)}</div>
          </div>
        </>
      )}

      {seedTreatmentResults.length > 0 && (
        <>
          <h2 className="text-blue-600 dark:text-blue-300 text-lg font-[Montserrat]">
            Seed Treatment Costs
          </h2>
          {seedTreatmentResults.map(renderProduct)}
        </>
      )}

      {inFurrowFoliarResults.length > 0 && (
        <>
          <h2 className="text-blue-600 dark:text-blue-300 text-lg font-[Montserrat]">
            In-Furrow / Foliar Product Costs
          </h2>
          {inFurrowFoliarResults.map(renderProduct)}
        </>
      )}

      <div className="border-t pt-4">
        <h2 className="text-blue-600 dark:text-blue-300 text-lg font-[Montserrat]">
          Total Program Cost
        </h2>
        <div className="grid grid-cols-2 gap-y-2 text-[1rem]">
          <div className="font-semibold text-yellow-600 dark:text-yellow-400">
            Total Undiscounted Cost
          </div>
          <div>${formatNumber(totalUndiscountedCost)}</div>

          <div className="font-semibold text-yellow-600 dark:text-yellow-400">
            Total Discounted Cost
          </div>
          <div>${formatNumber(totalDiscountedCost)}</div>

          <div className="font-semibold text-yellow-600 dark:text-yellow-400">Cost per Acre</div>
          <div>${formatNumber(totalCostPerAcre)}</div>
        </div>
      </div>

      {marketPriceUnit && marketPriceUnit.length > 0 && (
        <div className="border-t pt-4">
          <h2 className="text-blue-600 dark:text-blue-300 text-lg font-[Montserrat]">
            Breakeven ROI Calculations
          </h2>
          <div className="grid grid-cols-2 gap-y-2 text-[1rem]">
            <div className="font-semibold text-yellow-600 dark:text-yellow-400">
              Yield Needed for 2:1 ROI
            </div>
            <div>{formatNumber(roi2)} {unitLabel}</div>

            <div className="font-semibold text-yellow-600 dark:text-yellow-400">
              Yield Needed for 3:1 ROI
            </div>
            <div>{formatNumber(roi3)} {unitLabel}</div>

            <div className="font-semibold text-yellow-600 dark:text-yellow-400">
              Yield Needed for 4:1 ROI
            </div>
            <div>{formatNumber(roi4)} {unitLabel}</div>

            <div className="font-semibold text-yellow-600 dark:text-yellow-400">
              Yield Needed for 5:1 ROI
            </div>
            <div>{formatNumber(roi5)} {unitLabel}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;
