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
  const pluralize = (word: string, count: number) => (count === 1 ? word : `${word}s`);
  const unitLabel = marketPriceUnit.includes("/") ? marketPriceUnit.split("/")[1] : marketPriceUnit;

  const cardClass = "mb-8 grid grid-cols-2 gap-4 p-6 rounded-2xl shadow-lg bg-gray-100 dark:bg-[#13213c]";
  const labelClass = "font-bold text-yellow-600 dark:text-yellow-300 text-lg font-[Montserrat]";
  const valueClass = "font-bold text-black dark:text-white text-lg font-[Open_Sans]";

  const renderBasicSeedCalculations = () =>
    seedTreatmentResults.length > 0 && (
      <>
        <h2 className="text-2xl font-bold font-[Montserrat] text-blue-700 dark:text-blue-300 mb-2">
          Basic Seed Calculations
        </h2>
        <div className={cardClass}>
          <div className={labelClass}>Total Number of Units to Be Treated</div>
          <div className={valueClass}>{formatNumber(seedTreatmentResults[0].unitsToBeTreated)}</div>

          <div className={labelClass}>Number of Bushels to Be Treated</div>
          <div className={valueClass}>{formatNumber(seedTreatmentResults[0].totalBushels)}</div>

          <div className={labelClass}>Total Weight of Seeds to Be Treated (lbs)</div>
          <div className={valueClass}>{formatNumber(seedTreatmentResults[0].totalWeight)}</div>

          <div className={labelClass}>Number of Seeds per Unit</div>
          <div className={valueClass}>{formatNumber(seedTreatmentResults[0].seedsPerUnit)}</div>
        </div>
      </>
    );

  const renderSeedTreatmentCosts = () =>
    seedTreatmentResults.length > 0 &&
    seedTreatmentResults.map((product) => (
      <div key={product.productName + "-seedcost"}>
        <h2 className="text-2xl font-bold font-[Montserrat] text-blue-700 dark:text-blue-300 mb-2">
          Seed Treatment Costs
        </h2>
        <div className={cardClass}>
          <div className={labelClass}>Application Rate</div>
          <div className={valueClass}>
            {formatNumber(product.applicationRate)} {product.rateUnit}
          </div>

          <div className={labelClass}>Total Amount of Product Needed</div>
          <div className={valueClass}>
            {formatNumber(product.totalProductNeeded)} {product.rateUnit?.split("/")[0]}
          </div>

          <div className={labelClass}>Total Number of Product Packages</div>
          <div className={valueClass}>
            {formatNumber(product.totalProductUnits, 0)}{" "}
            {pluralize(product.packageType || "package", product.totalProductUnits || 0)}
          </div>

          <div className={labelClass}>Total Cost to the Grower</div>
          <div className={valueClass}>${formatNumber(product.discountedTotalCostToGrower)}</div>

          <div className={labelClass}>Product Cost per Ounce</div>
          <div className={valueClass}>${formatNumber(product.productCostPerOz)}</div>

          <div className={labelClass}>Product Cost per Unit of Treated Seed</div>
          <div className={valueClass}>${formatNumber(product.costPerUnitSeed)}</div>

          <div className={labelClass}>Product Cost per Acre</div>
          <div className={valueClass}>${formatNumber(product.individualCostPerAcre)}</div>
        </div>
      </div>
    ));

  const renderInFurrowFoliarCosts = () =>
    inFurrowFoliarResults.length > 0 &&
    inFurrowFoliarResults.map((product) => (
      <div key={product.productName + "-foliarcost"}>
        <h2 className="text-2xl font-bold font-[Montserrat] text-blue-700 dark:text-blue-300 mb-2">
          In-Furrow / Foliar Product Costs
        </h2>
        <div className={cardClass}>
          <div className={labelClass}>Product Name</div>
          <div className={valueClass}>
            {product.productName} ({product.applicationMethod})
          </div>

          <div className={labelClass}>Application Rate</div>
          <div className={valueClass}>
            {formatNumber(product.applicationRate)} {product.rateUnit}
          </div>

          <div className={labelClass}>Total Product Needed</div>
          <div className={valueClass}>
            {formatNumber(product.totalProductNeeded)} {product.rateUnit?.split("/")[0]}
          </div>

          <div className={labelClass}>Total Product Units to Order</div>
          <div className={valueClass}>
            {formatNumber(product.totalProductUnits, 0)}{" "}
            {pluralize(product.packageType || "package", product.totalProductUnits || 0)}
          </div>

          <div className={labelClass}>Product Cost per Unit</div>
          <div className={valueClass}>${formatNumber(product.productCostPerOz)}</div>

          <div className={labelClass}>Total MSRP</div>
          <div className={valueClass}>${formatNumber(product.originalTotalCostToGrower)}</div>

          <div className={labelClass}>Total Discounted Cost</div>
          <div className={valueClass}>${formatNumber(product.discountedTotalCostToGrower)}</div>

          <div className={labelClass}>Cost per Acre</div>
          <div className={valueClass}>${formatNumber(product.individualCostPerAcre)}</div>
        </div>
      </div>
    ));

  const renderTotalProgramCost = () => (
    <div>
      <h2 className="text-2xl font-bold font-[Montserrat] text-blue-700 dark:text-blue-300 mb-2">
        Total Program Cost
      </h2>
      <div className={cardClass}>
        <div className={labelClass}>Total Undiscounted Cost</div>
        <div className={valueClass}>${formatNumber(totalUndiscountedCost)}</div>

        <div className={labelClass}>Total Discounted Cost</div>
        <div className={valueClass}>${formatNumber(totalDiscountedCost)}</div>

        <div className={labelClass}>Cost per Acre</div>
        <div className={valueClass}>${formatNumber(totalCostPerAcre)}</div>
      </div>
    </div>
  );

  const renderROI = () => (
    <div>
      <h2 className="text-2xl font-bold font-[Montserrat] text-blue-700 dark:text-blue-300 mb-2">
        Breakeven ROI Calculations
      </h2>
      <div className={cardClass}>
        <div className={labelClass}>Yield Needed for 2:1 ROI</div>
        <div className={valueClass}>
          {formatNumber(roi2)} {unitLabel}
        </div>

        <div className={labelClass}>Yield Needed for 3:1 ROI</div>
        <div className={valueClass}>
          {formatNumber(roi3)} {unitLabel}
        </div>

        <div className={labelClass}>Yield Needed for 4:1 ROI</div>
        <div className={valueClass}>
          {formatNumber(roi4)} {unitLabel}
        </div>

        <div className={labelClass}>Yield Needed for 5:1 ROI</div>
        <div className={valueClass}>
          {formatNumber(roi5)} {unitLabel}
        </div>
      </div>
    </div>
  );

  return (
    <div className="text-black dark:text-white text-[1.1rem] font-[Open_Sans]">
      {renderBasicSeedCalculations()}
      {renderSeedTreatmentCosts()}
      {renderInFurrowFoliarCosts()}
      {renderTotalProgramCost()}
      {renderROI()}
    </div>
  );
};

export default ResultsDisplay;
