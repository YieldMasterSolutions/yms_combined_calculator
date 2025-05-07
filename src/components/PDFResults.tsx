// src/components/PDFResults.tsx

"use client";

import React from "react";
import { SeedTreatmentResult, FoliarProductResult, ROIResults } from "../utils/calculations";

interface PDFResultsProps {
  seedResults: SeedTreatmentResult[];
  foliarResults: FoliarProductResult[];
  roi: ROIResults;
  cropPriceUnit: string;
  growerName: string;
  dealerRep: string;
  programCost: number;
}

const PDFResults: React.FC<PDFResultsProps> = ({
  seedResults,
  foliarResults,
  roi,
  cropPriceUnit,
  growerName,
  dealerRep,
  programCost,
}) => {
  const renderRow = (label: string, value: string | number) => (
    <div className="flex justify-between border-b border-gray-300 py-1 text-sm">
      <span className="font-semibold text-gray-800">{label}</span>
      <span className="text-black">{value}</span>
    </div>
  );

  return (
    <div className="p-6 text-black text-sm">
      <div className="mb-4">
        {renderRow("Grower Name", growerName)}
        {renderRow("Dealer/Rep Name", dealerRep)}
      </div>

      {seedResults.map((res, idx) => (
        <div key={idx} className="mb-6">
          <h2 className="font-bold text-gray-800 mb-2">Seed Treatment Product: {res.productName}</h2>
          {renderRow("Total Number of Seeds to be Treated", res.totalUnitsToTreat * 80000)}
          {renderRow("Total Weight of Seeds to be Treated", (res.totalUnitsToTreat * 50).toFixed(2))}
          {renderRow("Total Number of Units to be Treated", res.totalUnitsToTreat.toFixed(2))}
          {renderRow("Number of Seeds per Unit", "80,000")}  {/* Assumes fixed for corn */}
          {renderRow("Application Rate", `${res.applicationRate} ${res.rateUnit}`)}
          {renderRow("Total Amount of Product Needed", `${res.totalProductNeeded.toFixed(2)} oz`)}
          {renderRow("Total Number of Product Packages", `${res.totalProductUnits} ${res.productPackageString.split(" ")[2]}s`)}
          {renderRow("Product Cost per Package", `$${((res.productCostPerOz * res.totalProductNeeded) / res.totalProductUnits).toFixed(2)}`)}
          {renderRow("Total Cost to the Grower", `$${res.totalCostToGrower.toFixed(2)}`)}
          {renderRow("Product Cost per Ounce", `$${res.productCostPerOz.toFixed(2)}`)}
          {renderRow("Total Discounted Cost to Grower", `$${res.totalDiscountedCostToGrower.toFixed(2)}`)}
          {renderRow("Product Cost per Unit of Treated Seed", `$${res.costPerUnitSeed.toFixed(6)}`)}
          {renderRow("Product Cost per Acre", `$${res.costPerAcre.toFixed(2)}`)}
        </div>
      ))}

      {foliarResults.length > 0 && (
        <div className="mb-6">
          <h2 className="font-bold text-gray-800 mb-2">In-Furrow / Foliar Product Costs</h2>
          {foliarResults.map((res, idx) => (
            <div key={idx} className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-1">{res.productName} ({res.applicationMethod})</h3>
              {renderRow("Application Rate", `${res.applicationRate} ${res.productName.includes("WG") ? "g/acre" : "fl oz/acre"}`)}
              {renderRow("Total Amount of Product Needed", `${res.totalProductNeeded.toFixed(2)} ${res.productName.includes("WG") ? "g" : "fl oz"}`)}
              {renderRow("Total Product Units to Order", `${res.totalProductUnits} ${res.productPackageString.split(" ")[2]}s`)}
              {renderRow("Product Cost per Ounce", `$${res.productCostPerOz.toFixed(2)}`)}
              {renderRow("Total Cost to Grower (MSRP)", `$${res.totalCostToGrower.toFixed(2)}`)}
              {renderRow("Total Discounted Cost to Grower", `$${res.totalDiscountedCostToGrower.toFixed(2)}`)}
              {renderRow("Individual Cost per Acre", `$${res.individualCostPerAcre.toFixed(2)}`)}
            </div>
          ))}
        </div>
      )}

      <div className="mb-4">
        {renderRow("Total Program Cost", `$${programCost.toFixed(2)}`)}
      </div>

      <div className="grid grid-cols-5 gap-4">
        {renderRow("Breakeven", `${roi.breakeven.toFixed(2)} ${cropPriceUnit}/acre`)}
        {renderRow("2:1 ROI", `${roi.roi2.toFixed(2)} ${cropPriceUnit}/acre`)}
        {renderRow("3:1 ROI", `${roi.roi3.toFixed(2)} ${cropPriceUnit}/acre`)}
        {renderRow("4:1 ROI", `${roi.roi4.toFixed(2)} ${cropPriceUnit}/acre`)}
        {renderRow("5:1 ROI", `${roi.roi5.toFixed(2)} ${cropPriceUnit}/acre`)}
      </div>
    </div>
  );
};

export default PDFResults;
