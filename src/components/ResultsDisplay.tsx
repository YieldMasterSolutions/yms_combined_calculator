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
  seedType: string;
  breakevenYield: number;
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
  seedType,
  breakevenYield,
}) => {
  const pluralize = (word: string, count: number) => {
    const lower = word.toLowerCase();
    if (count === 1) return word;
    switch (lower) {
      case "box": return "Boxes";
      case "pouch": return "Pouches";
      case "pail": return "Pails";
      case "jug": return "Jugs";
      case "case": return "Cases";
      case "unit": return "Units";
      default: return `${word}s`;
    }
  };

  const unitLabel =
    seedType.toLowerCase().includes("corn") || seedType.toLowerCase().includes("soy")
      ? "bu/acre"
      : marketPriceUnit.includes("/")
      ? marketPriceUnit
      : `${marketPriceUnit}/acre`;

  const sectionHeaderClass =
    "text-[1.5rem] font-bold font-[Montserrat] mb-2 text-black dark:text-yellow-400";

  const labelClass =
    "font-bold text-yellow-600 dark:text-yellow-300 text-lg font-[Montserrat]";
  const valueClass =
    "font-bold text-black dark:text-white text-lg font-[Open_Sans]";
  const cardClass =
    "mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 p-6 rounded-2xl shadow-lg card-light";

  const divider = <hr className="my-6 border-gray-300 dark:border-gray-600" />;

  const renderBasicSeedCalculations = () =>
    seedTreatmentResults.length > 0 && (
      <>
        <h2 className={sectionHeaderClass}>Basic Seed Calculations</h2>
        <div className={cardClass}>
          <div className={labelClass}>Number of Seeds per Unit</div>
          <div className={valueClass}>
            {formatNumber(seedTreatmentResults[0].seedsPerUnit)}
          </div>
          <div className={labelClass}>Total Number of Units to Be Treated</div>
          <div className={valueClass}>
            {formatNumber(seedTreatmentResults[0].unitsToBeTreated)}
          </div>
          <div className={labelClass}>Number of Bushels to Be Treated</div>
          <div className={valueClass}>
            {formatNumber(seedTreatmentResults[0].totalBushels)}
          </div>
          <div className={labelClass}>Total Weight of Seeds (lbs)</div>
          <div className={valueClass}>
            {formatNumber(seedTreatmentResults[0].totalWeight)}
          </div>
        </div>
        {divider}
      </>
    );

  const renderProductCard = (product: ProductCalculation, isSeed: boolean) => {
    const packageLabel = `${formatNumber(product.totalProductUnits || 0, 0)} ${pluralize(
      product.packageType || "package",
      product.totalProductUnits || 0
    )}`;

    const treatmentUnit = isSeed ? "units" : "acres";
    const treatmentCapacity = product.treatmentCapacity || "-";

    const header = `${product.productName} – ${product.applicationRate} ${product.rateUnit} – Treats ${treatmentCapacity} ${treatmentUnit}`;

    return (
      <div key={product.productName}>
        <h2 className={sectionHeaderClass}>{header}</h2>
        <div className={cardClass}>
          <div className={labelClass}>Total Product Needed</div>
          <div className={valueClass}>
            {formatNumber(product.totalProductNeeded)} {product.rateUnit?.split("/")[0]}
          </div>

          <div className={labelClass}>Total Product Units to Order</div>
          <div className={valueClass}>{packageLabel}</div>

          <div className={labelClass}>Product Cost per Package</div>
          <div className={valueClass}>
            ${formatNumber(product.productCostPerPackage, 2, true)}
          </div>

          <div className={labelClass}>Cost per Unit</div>
          <div className={valueClass}>
            ${formatNumber(product.productCostPerOz, 2, true)}
          </div>

          <div className={labelClass}>Total Undiscounted Cost</div>
          <div className={valueClass}>
            ${formatNumber(product.originalTotalCostToGrower, 2, true)}
          </div>

          <div className={labelClass}>Total Discounted Cost</div>
          <div className={valueClass}>
            ${formatNumber(product.discountedTotalCostToGrower, 2, true)}
          </div>

          {isSeed && (
            <>
              <div className={labelClass}>Cost per Treated Unit</div>
              <div className={valueClass}>
                ${formatNumber(product.costPerUnitSeed, 2, true)}
              </div>
            </>
          )}

          <div className={labelClass}>Product Cost per Acre</div>
          <div className={valueClass}>
            ${formatNumber(product.individualCostPerAcre, 2, true)}
          </div>
        </div>
        {divider}
      </div>
    );
  };

  const renderSeedTreatmentCosts = () =>
    seedTreatmentResults.map((product) => renderProductCard(product, true));

  const renderInFurrowFoliarCosts = () =>
    inFurrowFoliarResults.map((product) => renderProductCard(product, false));

  const renderTotalProgramCost = () => (
    <>
      <h2 className={sectionHeaderClass}>Total Program Cost</h2>
      <div className={cardClass}>
        <div className={labelClass}>Total Undiscounted Cost</div>
        <div className={valueClass}>${formatNumber(totalUndiscountedCost, 2, true)}</div>
        <div className={labelClass}>Total Discounted Cost</div>
        <div className={valueClass}>${formatNumber(totalDiscountedCost, 2, true)}</div>
        <div className={labelClass}>Cost per Acre</div>
        <div className={valueClass}>${formatNumber(totalCostPerAcre, 2, true)}</div>
      </div>
      {divider}
    </>
  );

  const renderROI = () => (
    <>
      <h2 className={sectionHeaderClass}>Breakeven ROI Calculations</h2>
      <div className={cardClass}>
        <div className={labelClass}>Yield Needed to Breakeven</div>
        <div className={valueClass}>
          {formatNumber(breakevenYield)} {unitLabel}
        </div>
        <div className={labelClass}>Yield for 2:1 ROI</div>
        <div className={valueClass}>{formatNumber(roi2)} {unitLabel}</div>
        <div className={labelClass}>Yield for 3:1 ROI</div>
        <div className={valueClass}>{formatNumber(roi3)} {unitLabel}</div>
        <div className={labelClass}>Yield for 4:1 ROI</div>
        <div className={valueClass}>{formatNumber(roi4)} {unitLabel}</div>
        <div className={labelClass}>Yield for 5:1 ROI</div>
        <div className={valueClass}>{formatNumber(roi5)} {unitLabel}</div>
      </div>
    </>
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
