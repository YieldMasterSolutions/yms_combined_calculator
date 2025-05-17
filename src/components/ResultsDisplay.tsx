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
  breakevenYield: number | null;
  roi2: number | null;
  roi3: number | null;
  roi4: number | null;
  roi5: number | null;
  cropPriceUnit: string;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  seedTreatmentResults,
  inFurrowFoliarResults,
  totalCostPerAcre,
  totalUndiscountedCost,
  totalDiscountedCost,
  breakevenYield,
  roi2,
  roi3,
  roi4,
  roi5,
  cropPriceUnit,
}) => {
  const gridCell = "flex justify-between min-h-[48px] px-2 py-1 border-b border-zinc-600";
  const label = "label-yellow font-semibold";
  const value = "text-right";

  const renderProductCard = (product: ProductCalculation, isSeed: boolean) => (
    <div className="bg-white dark:bg-zinc-900 text-black dark:text-white border border-zinc-300 dark:border-zinc-700 rounded p-4">
      <h3 className="text-lg font-bold mb-2 text-blue-500">
        {product.productName} – {product.applicationRate ?? 0} {product.applicationRateUnit}
      </h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        {isSeed && (
          <>
            <div className={gridCell}><span className={label}>Total Bushels to be Treated:</span><span className={value}>{formatNumber(product.totalBushels ?? 0)} bu</span></div>
            <div className={gridCell}><span className={label}>Total Weight of Seeds to be Treated:</span><span className={value}>{formatNumber(product.totalWeight ?? 0)} lbs</span></div>
            <div className={gridCell}><span className={label}>Total Number of Units to be Treated:</span><span className={value}>{formatNumber(product.unitsToBeTreated ?? 0)}</span></div>
            <div className={gridCell}><span className={label}>Number of Seeds per Unit:</span><span className={value}>{formatNumber(product.seedsPerUnit ?? 0)}</span></div>
          </>
        )}

        <div className={gridCell}><span className={label}>Application Rate:</span><span className={value}>{product.applicationRate ?? 0} {product.applicationRateUnit}</span></div>
        <div className={gridCell}><span className={label}>Total Amount of Product Needed:</span><span className={value}>{formatNumber(product.totalProductNeeded ?? 0)}</span></div>
        <div className={gridCell}><span className={label}>Total Product Units to Order:</span><span className={value}>{formatNumber(product.packagesNeeded ?? 0)} – {product.productPackageString}</span></div>
        <div className={gridCell}><span className={label}>Treatment Capacity per Package:</span><span className={value}>{formatNumber(product.treatmentCapacity ?? 0)} {isSeed ? "units" : "acres"}</span></div>
        <div className={gridCell}><span className={label}>Product Cost per Ounce:</span><span className={value}>${formatNumber(product.productCostPerOz ?? 0)}</span></div>
        <div className={gridCell}><span className={label}>Total Cost to Grower (MSRP):</span><span className={value}>${formatNumber(product.totalMsrpCost ?? 0)}</span></div>
        <div className={gridCell}><span className={label}>Total Discounted Cost to Grower:</span><span className={value}>${formatNumber(product.totalDiscountedCost ?? 0)}</span></div>
        {isSeed ? (
          <>
            <div className={gridCell}><span className={label}>Product Cost per Unit of Treated Seed:</span><span className={value}>${formatNumber(product.productCostPerUnitSeed ?? 0)}</span></div>
            <div className={gridCell}><span className={label}>Individual Cost of Seed Treatment per Acre:</span><span className={value}>${formatNumber(product.individualCostPerAcre ?? 0)}</span></div>
          </>
        ) : (
          <div className={gridCell}><span className={label}>Individual Cost per Acre:</span><span className={value}>${formatNumber(product.individualCostPerAcre ?? 0)}</span></div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {seedTreatmentResults.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-blue-600 mb-2">Seed Treatment Calculations</h2>
          {seedTreatmentResults.map((product, i) => (
            <div key={i}>{renderProductCard(product, true)}</div>
          ))}
        </div>
      )}

      {inFurrowFoliarResults.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-blue-600 mb-2">In-Furrow / Foliar Product Costs</h2>
          {inFurrowFoliarResults.map((product, i) => (
            <div key={i}>{renderProductCard(product, false)}</div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 bg-white dark:bg-zinc-900 text-black dark:text-white border border-zinc-300 dark:border-zinc-700 rounded p-4">
        <div><span className={label}>Total Program Cost per Acre:</span> ${formatNumber(totalCostPerAcre ?? 0)}</div>
        <div><span className={label}>Total Discounted Program Cost:</span> ${formatNumber(totalDiscountedCost ?? 0)}</div>
        <div><span className={label}>Total MSRP Program Cost:</span> ${formatNumber(totalUndiscountedCost ?? 0)}</div>
      </div>

      <div className="grid grid-cols-5 gap-4 bg-white dark:bg-zinc-900 text-black dark:text-white border border-zinc-300 dark:border-zinc-700 rounded p-4">
        <div><span className={label}>Breakeven Yield per Acre:</span><br />{formatNumber(breakevenYield ?? 0)} {cropPriceUnit.replace("/", "")}</div>
        <div><span className={label}>Yield Needed for 2:1 ROI:</span><br />{formatNumber(roi2 ?? 0)} {cropPriceUnit.replace("/", "")}</div>
        <div><span className={label}>Yield Needed for 3:1 ROI:</span><br />{formatNumber(roi3 ?? 0)} {cropPriceUnit.replace("/", "")}</div>
        <div><span className={label}>Yield Needed for 4:1 ROI:</span><br />{formatNumber(roi4 ?? 0)} {cropPriceUnit.replace("/", "")}</div>
        <div><span className={label}>Yield Needed for 5:1 ROI:</span><br />{formatNumber(roi5 ?? 0)} {cropPriceUnit.replace("/", "")}</div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
