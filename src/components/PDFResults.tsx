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

  // Card/grid styling, bold/large font for PDF
  const cardClass = "mb-8 grid grid-cols-2 gap-4 p-6 rounded-2xl border font-bold text-[1.13rem] bg-gray-100";
  const headerClass = "text-2xl font-bold font-[Montserrat] mb-2 text-black";
  const labelClass = "font-bold text-[1.09rem] font-[Montserrat] text-black";
  const valueClass = "font-bold text-[1.09rem] font-[Open_Sans] text-black";

  // ---- Basic Seed Calculations ----
  const renderBasicSeedCalculations = () =>
    seedTreatmentResults.length > 0 && (
      <>
        <h2 className={headerClass}>Basic Seed Calculations</h2>
        <div className={cardClass}>
          <div className={labelClass}>Total Number of Seeds to be Treated</div>
          <div className={valueClass}>{formatNumber(seedTreatmentResults[0].totalSeeds)}</div>
          <div className={labelClass}>Total Weight of Seeds to be Treated</div>
          <div className={valueClass}>{formatNumber(seedTreatmentResults[0].totalWeight)}</div>
          <div className={labelClass}>Total Number of Units to be Treated</div>
          <div className={valueClass}>{formatNumber(seedTreatmentResults[0].unitsToBeTreated)}</div>
          <div className={labelClass}>Number of Seeds per Unit</div>
          <div className={valueClass}>{formatNumber(seedTreatmentResults[0].seedsPerUnit)}</div>
        </div>
      </>
    );

  // ---- Seed Treatment Costs ----
  const renderSeedTreatmentCosts = () =>
    seedTreatmentResults.length > 0 &&
    seedTreatmentResults.map((product) => (
      <div key={product.productName + "-seedcost"}>
        <h2 className={headerClass}>Seed Treatment Costs</h2>
        <div className={cardClass}>
          <div className={labelClass}>Application Rate</div>
          <div className={valueClass}>{formatNumber(product.applicationRate)} {product.rateUnit}</div>
          <div className={labelClass}>Total Amount of Product Needed</div>
          <div className={valueClass}>{formatNumber(product.totalProductNeeded)} {product.rateUnit?.split("/")[0]}</div>
          <div className={labelClass}>Total Number of Product Packages</div>
          <div className={valueClass}>
            {formatNumber(product.totalProductUnits, 0)} {pluralize(product.packageType || "package", product.totalProductUnits || 0)}
          </div>
          <div className={labelClass}>Product Cost per Ounce</div>
          <div className={valueClass}>${formatNumber(product.productCostPerOz)}</div>
          <div className={labelClass}>Total Cost to the Grower</div>
          <div className={valueClass}>${formatNumber(product.discountedTotalCostToGrower)}</div>
          <div className={labelClass}>Product Cost per Unit of Treated Seed</div>
          <div className={valueClass}>${formatNumber(product.costPerUnitSeed)}</div>
          <div className={labelClass}>Product Cost per Acre</div>
          <div className={valueClass}>${formatNumber(product.individualCostPerAcre)}</div>
        </div>
      </div>
    ));

  // ---- In-Furrow / Foliar Costs ----
  const renderInFurrowFoliarCosts = () =>
    inFurrowFoliarResults.length > 0 &&
    inFurrowFoliarResults.map((product) => (
      <div key={product.productName + "-foliarcost"}>
        <h2 className={headerClass}>In-Furrow / Foliar Product Costs</h2>
        <div className={cardClass}>
          <div className={labelClass}>Product Name</div>
          <div className={valueClass}>{product.productName} ({product.applicationMethod})</div>
          <div className={labelClass}>Application Rate</div>
          <div className={valueClass}>{formatNumber(product.applicationRate)} {product.rateUnit}</div>
          <div className={labelClass}>Total Product Needed</div>
          <div className={valueClass}>{formatNumber(product.totalProductNeeded)} {product.rateUnit?.split("/")[0]}</div>
          <div className={labelClass}>Total Product Units to Order</div>
          <div className={valueClass}>
            {formatNumber(product.totalProductUnits, 0)} {pluralize(product.packageType || "package", product.totalProductUnits || 0)}
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

  // ---- Total Program Cost Card ----
  const renderTotalProgramCost = () => (
    <div>
      <h2 className={headerClass}>Total Program Cost</h2>
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

  // ---- ROI Card ----
  const renderROI = () => (
    <div>
      <h2 className={headerClass}>Breakeven ROI Calculations</h2>
      <div className={cardClass}>
        <div className={labelClass}>Yield Needed for 2:1 ROI</div>
        <div className={valueClass}>{formatNumber(roi.roi2x)} {unitLabel}</div>
        <div className={labelClass}>Yield Needed for 3:1 ROI</div>
        <div className={valueClass}>{formatNumber(roi.roi3x)} {unitLabel}</div>
        <div className={labelClass}>Yield Needed for 4:1 ROI</div>
        <div className={valueClass}>{formatNumber(roi.roi4x)} {unitLabel}</div>
        <div className={labelClass}>Yield Needed for 5:1 ROI</div>
        <div className={valueClass}>{formatNumber(roi.roi5x)} {unitLabel}</div>
      </div>
    </div>
  );

  // ---- RENDER ALL ----
  return (
    <div className="print-grayscale p-6 text-black bg-white text-[1.11rem] font-[Open_Sans] w-full max-w-[900px] mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-[Montserrat] font-bold mb-2">YMS Program Calculator Summary</h1>
        <p className="text-lg">Grower: <span className="font-bold">{growerName || "—"}</span></p>
        <p className="text-lg">Rep: <span className="font-bold">{repName || "—"}</span></p>
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
