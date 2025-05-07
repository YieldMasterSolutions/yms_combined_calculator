// src/components/PDFResults.tsx

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
  return (
    <div className="p-6 text-black">
      <h2 className="text-xl font-bold mb-2">YieldMaster Solutions - Biological Program Summary</h2>
      <p><strong>Grower:</strong> {growerName}</p>
      <p><strong>Rep:</strong> {dealerRep}</p>

      <h3 className="text-lg font-bold mt-4">Seed Treatment Products</h3>
      {seedResults.map((res, index) => (
        <div key={index} className="mb-4">
          <p><strong>{res.productName}</strong></p>
          <ul className="ml-4 list-disc">
            <li>Application Rate: {res.applicationRate} {res.productForm === "Liquid" ? "fl oz/unit" : "oz/unit"}</li>
            <li>Total Product Needed: {res.totalProductNeeded.toFixed(2)}</li>
            <li>Total Product Units to Order: {res.totalProductUnits} – {res.productPackageString}</li>
            <li>Product Cost per Ounce: ${res.productCostPerOz.toFixed(2)}</li>
            <li>Total Cost to Grower (MSRP): ${res.totalCostToGrower.toFixed(2)}</li>
            <li>Discounted Cost to Grower: ${res.totalDiscountedCostToGrower.toFixed(2)}</li>
            <li>Cost per Unit of Treated Seed: ${res.costPerUnitSeed.toFixed(4)}</li>
            <li>Individual Cost per Acre: ${res.costPerAcre.toFixed(2)}</li>
          </ul>
        </div>
      ))}

      <h3 className="text-lg font-bold mt-4">In-Furrow / Foliar Products</h3>
      {foliarResults.map((res, index) => (
        <div key={index} className="mb-4">
          <p><strong>{res.productName} ({res.applicationMethod})</strong></p>
          <ul className="ml-4 list-disc">
            <li>Application Rate: {res.applicationRate}</li>
            <li>Total Product Needed: {res.totalProductNeeded.toFixed(2)}</li>
            <li>Total Product Units to Order: {res.totalProductUnits} – {res.productPackageString}</li>
            <li>Product Cost per Ounce: ${res.productCostPerOz.toFixed(2)}</li>
            <li>Total Cost to Grower (MSRP): ${res.totalCostToGrower.toFixed(2)}</li>
            <li>Discounted Cost to Grower: ${res.totalDiscountedCostToGrower.toFixed(2)}</li>
            <li>Individual Cost per Acre: ${res.individualCostPerAcre.toFixed(2)}</li>
          </ul>
        </div>
      ))}

      <h3 className="text-lg font-bold mt-4">Program Summary</h3>
      <p><strong>Total Program Cost per Acre:</strong> ${programCost.toFixed(2)}</p>
      <ul className="ml-4 list-disc">
        <li>Breakeven Yield: {roi.breakeven.toFixed(2)} {cropPriceUnit}/acre</li>
        <li>2:1 ROI Yield: {roi.roi2.toFixed(2)} {cropPriceUnit}/acre</li>
        <li>3:1 ROI Yield: {roi.roi3.toFixed(2)} {cropPriceUnit}/acre</li>
        <li>4:1 ROI Yield: {roi.roi4.toFixed(2)} {cropPriceUnit}/acre</li>
        <li>5:1 ROI Yield: {roi.roi5.toFixed(2)} {cropPriceUnit}/acre</li>
      </ul>
    </div>
  );
};

export default PDFResults;