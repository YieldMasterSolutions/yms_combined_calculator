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
    breakevenYield: number;
    roi2to1: number;
    roi3to1: number;
    roi4to1: number;
    roi5to1: number;
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
      default: return count > 1 && lower.endsWith("s") ? word : `${word}s`;
    }
  };

  const getCostPerUnitLabel = (unit: string) => {
    if (unit.includes("g")) return "Product Cost per Gram";
    if (unit.includes("fl oz")) return "Product Cost per Fluid Ounce";
    return "Product Cost per Unit";
  };

  const unitLabel = marketPriceUnit.includes("/") ? marketPriceUnit.split("/")[1] : marketPriceUnit;

  const cardClass = "mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 p-6 rounded-2xl border font-bold text-[1.13rem] bg-white";
  const headerClass = "text-2xl font-bold font-[Montserrat] mb-2 text-yellow-600";
  const labelClass = "font-bold text-[1.09rem] font-[Montserrat] text-black";
  const valueClass = "font-bold text-[1.09rem] font-[Open_Sans] text-black";

  const renderBasicSeedCalculations = () =>
    seedTreatmentResults.length > 0 && (
      <>
        <h2 className={headerClass}>Basic Seed Calculations</h2>
        <div className={cardClass}>
          <div className={labelClass}>Total Number of Units to be Treated</div>
          <div className={valueClass}>{formatNumber(seedTreatmentResults[0].unitsToBeTreated)}</div>

          <div className={labelClass}>Number of Bushels to Be Treated</div>
          <div className={valueClass}>{formatNumber(seedTreatmentResults[0].totalBushels)}</div>

          <div className={labelClass}>Total Weight of Seeds to be Treated</div>
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
      <div key={product.productPackageString + (isSeed ? "-seedcost" : "-foliarcost")}> 
        <h2 className={headerClass}>{title} ({product.applicationMethod})</h2>
        <div className={cardClass}>
          <div className={labelClass}>Application Rate</div>
          <div className={valueClass}>{formatNumber(product.applicationRate)} {product.rateUnit}</div>

          <div className={labelClass}>Total Product Needed</div>
          <div className={valueClass}>{formatNumber(product.totalProductNeeded)} {product.rateUnit?.split("/")[0]}</div>

          <div className={labelClass}>Total Product Units to Order</div>
          <div className={valueClass}>{packageLabel}</div>

          <div className={labelClass}>Product Cost per Package</div>
          <div className={valueClass}>${formatNumber(product.productCostPerPackage, 2)}</div>

          <div className={labelClass}>{getCostPerUnitLabel(product.rateUnit || "")}</div>
          <div className={valueClass}>${formatNumber(product.productCostPerOz, 2)}</div>

          <div className={labelClass}>Total Undiscounted Cost</div>
          <div className={valueClass}>${formatNumber(product.originalTotalCostToGrower, 2)}</div>

          <div className={labelClass}>Total Discounted Cost</div>
          <div className={valueClass}>${formatNumber(product.discountedTotalCostToGrower, 2)}</div>

          {isSeed && (
            <>
              <div className={labelClass}>Product Cost per Unit of Treated Seed</div>
              <div className={valueClass}>${formatNumber(product.costPerUnitSeed, 2)}</div>
            </>
          )}

          <div className={labelClass}>Product Cost per Acre</div>
          <div className={valueClass}>${formatNumber(product.individualCostPerAcre, 2)}</div>
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
      <h2 className={headerClass}>Total Program Cost</h2>
      <div className={cardClass}>
        <div className={labelClass}>Total Undiscounted Cost</div>
        <div className={valueClass}>${formatNumber(totalUndiscountedCost, 2)}</div>

        <div className={labelClass}>Total Discounted Cost</div>
        <div className={valueClass}>${formatNumber(totalDiscountedCost, 2)}</div>

        <div className={labelClass}>Cost per Acre</div>
        <div className={valueClass}>${formatNumber(totalCostPerAcre, 2)}</div>
      </div>
    </div>
  );

  const renderROI = () => (
    <div>
      <h2 className={headerClass}>Breakeven ROI Calculations</h2>
      <div className={cardClass}>
        <div className={labelClass}>Yield Needed to Breakeven</div>
        <div className={valueClass}>{formatNumber(roi.breakevenYield)} {unitLabel}</div>

        <div className={labelClass}>Yield Needed for 2:1 ROI</div>
        <div className={valueClass}>{formatNumber(roi.roi2to1)} {unitLabel}</div>

        <div className={labelClass}>Yield Needed for 3:1 ROI</div>
        <div className={valueClass}>{formatNumber(roi.roi3to1)} {unitLabel}</div>

        <div className={labelClass}>Yield Needed for 4:1 ROI</div>
        <div className={valueClass}>{formatNumber(roi.roi4to1)} {unitLabel}</div>

        <div className={labelClass}>Yield Needed for 5:1 ROI</div>
        <div className={valueClass}>{formatNumber(roi.roi5to1)} {unitLabel}</div>
      </div>
    </div>
  );

  return (
    <div className="print-grayscale p-6 text-black bg-white text-[1.11rem] font-[Open_Sans] w-full max-w-[900px] mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-[Montserrat] font-bold mb-2 text-yellow-600">Biological Program Calculator Summary</h1>
        <p className="text-lg">
          Grower: <span className="font-bold">{growerName || "—"}</span>
        </p>
        <p className="text-lg">
          Dealer/Rep: <span className="font-bold">{repName || "—"}</span>
        </p>
      </div>
      {renderBasicSeedCalculations()}
      {renderSeedTreatmentCosts()}
      {renderInFurrowFoliarCosts()}
      {renderTotalProgramCost()}
      {renderROI()}
    </div>
  );
};

export default PDFResults;
