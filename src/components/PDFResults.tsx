// src/components/PDFResults.tsx

import React, { forwardRef } from "react";
import { SeedTreatmentResult, FoliarProductResult, ROIResults } from "../utils/calculations";
import { formatNumber } from "../utils/formatNumber";

interface PDFResultsProps {
  formData: any;
  seedTreatmentResults: SeedTreatmentResult[];
  inFurrowFoliarResults: FoliarProductResult[];
  programCost: number;
  roi: ROIResults | null;
}

const PDFResults = forwardRef<HTMLDivElement, PDFResultsProps>(
  ({ formData, seedTreatmentResults, inFurrowFoliarResults, programCost, roi }, ref) => {
    return (
      <div ref={ref} className="p-6 text-sm">
        <h1 className="text-lg font-bold mb-4">YMS Combined Calculator – PDF Summary</h1>

        <div className="mb-4">
          <p><strong>Grower Name:</strong> {formData?.growerName}</p>
          <p><strong>Rep Name:</strong> {formData?.repName}</p>
          <p><strong>Seed Type:</strong> {formData?.seedType}</p>
          <p><strong>Rate Unit:</strong> {formData?.rateUnit}</p>
          <p><strong>Seeding Rate:</strong> {formData?.seedingRate}</p>
          <p><strong>Acres:</strong> {formData?.acres}</p>
        </div>

        {seedTreatmentResults.map((res, idx) => (
          <div key={idx} className="mb-4">
            <h2 className="font-bold text-blue-700">{res.productName} ({res.applicationMethod})</h2>
            <ul>
              <li>Application Rate: {res.applicationRate}</li>
              <li>Total Product Needed: {formatNumber(res.totalProductNeeded)}</li>
              <li>Total Product Units to Order: {res.totalProductUnits} – {res.productPackageString}</li>
              <li>Product Cost per Ounce: ${formatNumber(res.productCostPerOz)}</li>
              <li>Total Cost to Grower (MSRP): ${formatNumber(res.totalCostToGrower)}</li>
              <li>Total Discounted Cost to Grower: ${formatNumber(res.totalDiscountedCostToGrower)}</li>
              <li>Cost per Unit of Treated Seed: ${formatNumber(res.costPerUnitSeed)}</li>
              <li>Cost per Acre: ${formatNumber(res.costPerAcre)}</li>
            </ul>
          </div>
        ))}

        {inFurrowFoliarResults.map((res, idx) => (
          <div key={idx} className="mb-4">
            <h2 className="font-bold text-blue-700">{res.productName} ({res.applicationMethod})</h2>
            <ul>
              <li>Application Rate: {res.applicationRate} {res.rateUnit}</li>
              <li>Total Product Needed: {formatNumber(res.totalProductNeeded)}</li>
              <li>Total Product Units to Order: {res.totalProductUnits} – {res.productPackageString}</li>
              <li>Product Cost per Ounce: ${formatNumber(res.productCostPerOz)}</li>
              <li>Total Cost to Grower (MSRP): ${formatNumber(res.totalCostToGrower)}</li>
              <li>Total Discounted Cost to Grower: ${formatNumber(res.totalDiscountedCostToGrower)}</li>
              <li>Cost per Acre: ${formatNumber(res.individualCostPerAcre)}</li>
            </ul>
          </div>
        ))}

        {roi && (
          <div className="mt-6">
            <h2 className="font-bold text-blue-700">ROI Summary</h2>
            <ul>
              <li>Total Program Cost per Acre: ${formatNumber(programCost)}</li>
              <li>Breakeven Yield: {formatNumber(roi.breakeven)} {formData?.cropPriceUnit}/acre</li>
              <li>2:1 ROI: {formatNumber(roi.roi2)} {formData?.cropPriceUnit}/acre</li>
              <li>3:1 ROI: {formatNumber(roi.roi3)} {formData?.cropPriceUnit}/acre</li>
              <li>4:1 ROI: {formatNumber(roi.roi4)} {formData?.cropPriceUnit}/acre</li>
              <li>5:1 ROI: {formatNumber(roi.roi5)} {formData?.cropPriceUnit}/acre</li>
            </ul>
          </div>
        )}
      </div>
    );
  }
);

export default PDFResults;
