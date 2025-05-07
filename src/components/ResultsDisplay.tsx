// src/components/ResultsDisplay.tsx

"use client";

import React from "react";
import { SeedTreatmentResult, FoliarProductResult, ROIResults } from "../utils/calculations";
import formatNumber from "../utils/formatNumber";
import PDFDownloadButton from "./PDFDownloadButton";

interface ResultsDisplayProps {
  seedResults: SeedTreatmentResult[];
  inFurrowFoliarResults: FoliarProductResult[];
  roi: ROIResults;
  cropPriceUnit: string;
  growerName: string;
  repName: string;
  programCost: number;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  seedResults,
  inFurrowFoliarResults,
  roi,
  cropPriceUnit,
  growerName,
  repName,
  programCost,
}) => {
  if (!seedResults.length && !inFurrowFoliarResults.length) return null;

  const labelClass = "text-yellow-400 font-bold text-sm";
  const valueClass = "text-white text-base";
  const boxClass = "bg-slate-900 rounded p-4 border border-slate-700 flex flex-col justify-center min-h-[64px]";

  const renderGridItem = (label: string, value: string | number) => (
    <div className={boxClass}>
      <div className={labelClass}>{label}</div>
      <div className={valueClass}>{value}</div>
    </div>
  );

  return (
    <div className="mt-10">
      <div className="flex justify-end mb-4">
        <PDFDownloadButton
          seedResults={seedResults}
          foliarResults={inFurrowFoliarResults}
          roi={roi}
          cropPriceUnit={cropPriceUnit}
          growerName={growerName}
          dealerRep={repName}
          programCost={programCost}
        />
      </div>

      {seedResults.map((res, idx) => (
        <div key={idx} className="mb-10">
          <h2 className="text-blue-500 text-lg font-bold mb-2">Seed Treatment Product: {res.productName}</h2>
          <div className="grid grid-cols-2 gap-4">
            {renderGridItem("Total Number of Seeds to be Treated", formatNumber(res.totalUnitsToTreat * (res.productForm === "Dry" ? (res.rateUnit === "oz/unit" ? 1 : 0) : 1) * (res.applicationRate / (res.productForm === "Dry" ? 1 : 1))))}
            {renderGridItem("Total Weight of Seeds to be Treated", formatNumber(res.totalUnitsToTreat * 50))}
            {renderGridItem("Total Number of Units to be Treated", formatNumber(res.totalUnitsToTreat))}
            {renderGridItem("Number of Seeds per Unit", formatNumber(res.totalUnitsToTreat !== 0 ? (res.totalUnitsToTreat * res.applicationRate) / res.totalUnitsToTreat : 0))}
            {renderGridItem("Application Rate", `${res.applicationRate} ${res.rateUnit}`)}
            {renderGridItem("Total Amount of Product Needed", `${formatNumber(res.totalProductNeeded)} oz`)}
            {renderGridItem("Total Number of Product Packages", `${formatNumber(res.totalProductUnits)} ${res.productPackageString.split(" ")[2].toLowerCase()}s`)}
            {renderGridItem("Product Cost per Package", `$${formatNumber(res.productCostPerOz * res.totalProductNeeded / res.totalProductUnits)}`)}
            {renderGridItem("Total Cost to the Grower", `$${formatNumber(res.totalCostToGrower)}`)}
            {renderGridItem("Product Cost per Ounce", `$${formatNumber(res.productCostPerOz)}`)}
            {renderGridItem("Total Discounted Cost to Grower", `$${formatNumber(res.totalDiscountedCostToGrower)}`)}
            {renderGridItem("Product Cost per Unit of Treated Seed", `$${formatNumber(res.costPerUnitSeed)}`)}
            {renderGridItem("Product Cost per Acre", `$${formatNumber(res.costPerAcre)}`)}
          </div>
        </div>
      ))}

      {inFurrowFoliarResults.length > 0 && (
        <div className="mb-10">
          <h2 className="text-blue-500 text-lg font-bold mb-2">In-Furrow / Foliar Product Costs</h2>
          {inFurrowFoliarResults.map((res, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="text-yellow-400 font-semibold mb-2">{res.productName} ({res.applicationMethod})</h3>
              <div className="grid grid-cols-2 gap-4">
                {renderGridItem("Application Rate", `${res.applicationRate} ${res.productName.includes("WG") ? "g/acre" : "fl oz/acre"}`)}
                {renderGridItem("Total Amount of Product Needed", `${formatNumber(res.totalProductNeeded)} ${res.productName.includes("WG") ? "g" : "fl oz"}`)}
                {renderGridItem("Total Product Units to Order", `${formatNumber(res.totalProductUnits)} ${res.productPackageString.split(" ")[2].toLowerCase()}s`)}
                {renderGridItem("Product Cost per Ounce", `$${formatNumber(res.productCostPerOz)}`)}
                {renderGridItem("Total Cost to Grower (MSRP)", `$${formatNumber(res.totalCostToGrower)}`)}
                {renderGridItem("Total Discounted Cost to Grower", `$${formatNumber(res.totalDiscountedCostToGrower)}`)}
                {renderGridItem("Individual Cost per Acre", `$${formatNumber(res.individualCostPerAcre)}`)}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-10">
        {renderGridItem("Total Program Cost", `$${formatNumber(programCost)}`)}
      </div>

      <div className="grid grid-cols-5 gap-4 mb-10">
        {renderGridItem("Breakeven Yield per Acre", `${formatNumber(roi.breakeven)} ${cropPriceUnit}/acre`)}
        {renderGridItem("Yield Needed for 2:1 ROI", `${formatNumber(roi.roi2)} ${cropPriceUnit}/acre`)}
        {renderGridItem("Yield Needed for 3:1 ROI", `${formatNumber(roi.roi3)} ${cropPriceUnit}/acre`)}
        {renderGridItem("Yield Needed for 4:1 ROI", `${formatNumber(roi.roi4)} ${cropPriceUnit}/acre`)}
        {renderGridItem("Yield Needed for 5:1 ROI", `${formatNumber(roi.roi5)} ${cropPriceUnit}/acre`)}
      </div>
    </div>
  );
};

export default ResultsDisplay;
