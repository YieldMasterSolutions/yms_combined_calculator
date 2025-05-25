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
      case "package": return "Packages";
      default:
        return count > 1 && lower.endsWith("s") ? word : `${word}s`;
    }
  };

  const getCostPerUnitLabel = (unit: string) => {
    if (unit.includes("g")) return "Product Cost per Gram";
    if (unit.includes("fl oz")) return "Product Cost per Fluid Ounce";
    return "Product Cost per Unit";
  };

  const unitLabel =
    seedType.toLowerCase().includes("corn") ? "bu/acre" :
    seedType.toLowerCase().includes("soy") ? "bu/acre" :
    marketPriceUnit.includes("/") ? marketPriceUnit : `${marketPriceUnit}/acre`;

  const cardClass = "mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 p-6 rounded-2xl shadow-lg bg-gray-100 dark:bg-[#13213c]";
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

  const renderProductCard = (product: ProductCalculation, isSeed: boolean) => {
    const isJug = product.packageType?.toLowerCase() === "jug" && product.packageSize === 320;
    const packageLabel = `${formatNumber(product.totalProductUnits || 0, 0)} ${pluralize(product.packageType || "package", product.totalProductUnits || 0)}` +
      (isJug ? ` (${Math.ceil((product.totalProductUnits || 0) / 2)} Cases)` : "");

    const treatmentUnit = isSeed ? "units" : "acres";
    const title = `${product.productName} – ${product.packageSize} ${product.packageUnits} – ${pluralize(product.packageType || "package", product.treatmentCapacity || 0)} – ${product.applicationRate} ${product.rateUnit} – Treats ${product.treatmentCapacity || "-"} ${treatmentUnit}`;

    return (
      <div key={product.productName + (isSeed ? "-seedcost" : "-foliarcost")}>
        <h2 className="text-2xl font-bold font-[Montserrat] text-blue-700 dark:text-blue-300 mb-2">
          {title}
        </h2>
        <div className={cardClass}>
          <div className={labelClass}>Application Rate</div>
          <div className={valueClass}>{formatNumber(product.applicationRate)} {product.rateUnit}</div>

          <div className={labelClass}>Total Product Needed</div>
          <div className={valueClass}>{formatNumber(product.totalProductNeeded)} {product.rateUnit?.split("/")[0]}</div>

          <div className={labelClass}>Total Product Units to Order</div>
          <div className={valueClass}>{packageLabel}</div>

          <div className={labelClass}>Product Cost per Package</div>
          <div className={valueClass}>${formatNumber(product.productCostPerPackage, 2, true)}</div>

          <div className={labelClass}>{getCostPerUnitLabel(product.rateUnit || "")}</div>
          <div className={valueClass}>${formatNumber(product.productCostPerOz, 2, true)}</div>

          <div className={labelClass}>Total Undiscounted Cost</div>
          <div className={valueClass}>${formatNumber(product.originalTotalCostToGrower, 2, true)}</div>

          <div className={labelClass}>Total Discounted Cost</div>
          <div className={valueClass}>${formatNumber(product.discountedTotalCostToGrower, 2, true)}</div>

          {isSeed && (
            <>
              <div className={labelClass}>Product Cost per Unit of Treated Seed</div>
              <div className={valueClass}>${formatNumber(product.costPerUnitSeed, 2, true)}</div>
            </>
          )}

          <div className={labelClass}>Product Cost per Acre</div>
          <div className={valueClass}>${formatNumber(product.individualCostPerAcre, 2, true)}</div>
        </div>
      </div>
    );
  };

  const renderSeedTreatmentCosts = () =>
    seedTreatmentResults.length > 0 && seedTreatmentResults.map((product) => renderProductCard(product, true));

  const renderInFurrowFoliarCosts = () =>
    inFurrowFoliarResults.length > 0 && inFurrowFoliarResults.map((product) => renderProductCard(product, false));

  const renderTotalProgramCost = () => (
    <div>
      <h2 className="text-2xl font-bold font-[Montserrat] text-blue-700 dark:text-blue-300 mb-2">
        Total Program Cost
      </h2>
      <div className={cardClass}>
        <div className={labelClass}>Total Undiscounted Cost</div>
        <div className={valueClass}>${formatNumber(totalUndiscountedCost, 2, true)}</div>

        <div className={labelClass}>Total Discounted Cost</div>
        <div className={valueClass}>${formatNumber(totalDiscountedCost, 2, true)}</div>

        <div className={labelClass}>Cost per Acre</div>
        <div className={valueClass}>${formatNumber(totalCostPerAcre, 2, true)}</div>
      </div>
    </div>
  );

  const renderROI = () => (
    <div>
      <h2 className="text-2xl font-bold text-yellow-600 dark:text-yellow-300 font-[Montserrat] mb-2">
        Breakeven ROI Calculations
      </h2>
      <div className={cardClass}>
        <div className={labelClass}>Yield Needed to Breakeven</div>
        <div className={valueClass}>{formatNumber(totalCostPerAcre)} {unitLabel}</div>

        <div className={labelClass}>Yield Needed for 2:1 ROI</div>
        <div className={valueClass}>{formatNumber(roi2)} {unitLabel}</div>

        <div className={labelClass}>Yield Needed for 3:1 ROI</div>
        <div className={valueClass}>{formatNumber(roi3)} {unitLabel}</div>

        <div className={labelClass}>Yield Needed for 4:1 ROI</div>
        <div className={valueClass}>{formatNumber(roi4)} {unitLabel}</div>

        <div className={labelClass}>Yield Needed for 5:1 ROI</div>
        <div className={valueClass}>{formatNumber(roi5)} {unitLabel}</div>
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
