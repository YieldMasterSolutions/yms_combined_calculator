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
    <div className="p-6 text-sm filter print:grayscale">
      <h1 className="text-2xl font-bold mb-2">YMS Biological Program Summary</h1>
      <p><strong>Grower Name:</strong> {growerName}</p>
      <p><strong>Dealer/Rep:</strong> {dealerRep}</p>
      <p className="mb-4"><strong>Total Program Cost per Acre:</strong> ${programCost.toFixed(2)}</p>

      <h2 className="text-xl font-bold mt-4 mb-2">Seed Treatment Products</h2>
      {seedResults.map((res, index) => (
        <div key={index} className="mb-4">
          <p><strong>{res.productName}</strong></p>
          <ul className="ml-4 list-disc">
            <li>Application Rate: {res.applicationRate} {res.rateUnit}</li>
            <li>Total Product Needed: {res.totalProductNeeded.toFixed(2)}</li>
            <li>Total Product Units to Order: {res.totalProductUnits} – {res.productPackageString}</li>
            <li>Product Cost per Ounce: ${res.productCostPerOz.toFixed(2)}</li>
            <li>Total Cost to Grower (MSRP): ${res.totalCostToGrower.toFixed(2)}</li>
            <li>Total Discounted Cost to Grower: ${res.totalDiscountedCostToGrower.toFixed(2)}</li>
            <li>Product Cost per Unit of Treated Seed: ${res.productCostPerUnitSeed.toFixed(4)}</li>
            <li>Individual Cost per Acre: ${res.individualCostPerAcre.toFixed(2)}</li>
          </ul>
        </div>
      ))}

      <h2 className="text-xl font-bold mt-4 mb-2">In-Furrow / Foliar Products</h2>
      {foliarResults.map((res, index) => (
        <div key={index} className="mb-4">
          <p><strong>{res.productName} ({res.applicationType})</strong></p>
          <ul className="ml-4 list-disc">
            <li>Application Rate: {res.applicationRate} {res.rateUnit}</li>
            <li>Total Product Needed: {res.totalProductNeeded.toFixed(2)}</li>
            <li>Total Product Units to Order: {res.totalProductUnits} – {res.productPackageString}</li>
            <li>Product Cost per Ounce: ${res.productCostPerOz.toFixed(2)}</li>
            <li>Total Cost to Grower (MSRP): ${res.totalCostToGrower.toFixed(2)}</li>
            <li>Total Discounted Cost to Grower: ${res.totalDiscountedCostToGrower.toFixed(2)}</li>
            <li>Individual Cost per Acre: ${res.individualCostPerAcre.toFixed(2)}</li>
          </ul>
        </div>
      ))}

      <h2 className="text-xl font-bold mt-4 mb-2">ROI Summary</h2>
      <ul className="ml-4 list-disc">
        <li>Breakeven Yield per Acre: {roi.breakevenYield.toFixed(2)} {cropPriceUnit}/acre</li>
        <li>Yield Needed for 2:1 ROI: {roi.roi2x.toFixed(2)} {cropPriceUnit}/acre</li>
        <li>Yield Needed for 3:1 ROI: {roi.roi3x.toFixed(2)} {cropPriceUnit}/acre</li>
        <li>Yield Needed for 4:1 ROI: {roi.roi4x.toFixed(2)} {cropPriceUnit}/acre</li>
        <li>Yield Needed for 5:1 ROI: {roi.roi5x.toFixed(2)} {cropPriceUnit}/acre</li>
      </ul>
    </div>
  );
};

export default PDFResults;
