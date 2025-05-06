// src/components/PDFResults.tsx

import React from "react";
import { SeedTreatmentResult, FoliarProductResult, ROIResults } from "../utils/calculations";
import { formatNumber } from "../utils/formatNumber";

interface PDFResultsProps {
  seedResults: SeedTreatmentResult[];
  foliarResults: FoliarProductResult[];
  roi: ROIResults;
  programCost: number;
  cropPriceUnit: string;
  growerName: string;
  repName: string;
}

const PDFResults: React.FC<PDFResultsProps> = ({
  seedResults,
  foliarResults,
  roi,
  programCost,
  cropPriceUnit,
  growerName,
  repName,
}) => {
  return (
    <>
      <div className="p-6 text-xs">
        <div className="mb-4">
          <strong>Grower:</strong> {growerName} <br />
          <strong>Rep:</strong> {repName}
        </div>

        {seedResults.map((result, index) => (
          <div key={index} className="mb-4 border border-gray-400 p-2">
            <h3 className="font-semibold mb-1">Seed Treatment: {result.productName}</h3>
            <div>Total Seeds: {formatNumber(result.totalSeeds)}</div>
            <div>Total Weight (lbs): {formatNumber(result.totalWeight)}</div>
            <div>Total Units: {formatNumber(result.totalUnits)}</div>
            <div>Seeds per Unit: {formatNumber(result.seedsPerUnit)}</div>
            <div>Application Rate: {formatNumber(result.applicationRate)} {result.unit}</div>
            <div>Total Product Needed: {formatNumber(result.totalProductNeeded)} {result.unit}</div>
            <div>Product Units to Order: {result.totalProductUnits}</div>
            <div>Cost per Ounce: ${formatNumber(result.costPerOz)}</div>
            <div>Total MSRP: ${formatNumber(result.totalCostMSRP)}</div>
            <div>Total Discounted: ${formatNumber(result.totalCostDiscounted)}</div>
            <div>Cost per Unit of Seed: ${formatNumber(result.costPerUnitSeed)}</div>
            <div>Cost per Acre: ${formatNumber(result.costPerAcre)}</div>
          </div>
        ))}

        {foliarResults.map((result, index) => (
          <div key={index} className="mb-4 border border-gray-400 p-2">
            <h3 className="font-semibold mb-1">{result.productName} ({result.applicationType})</h3>
            <div>Application Rate: {formatNumber(result.applicationRate)} {result.unit}</div>
            <div>Total Product Needed: {formatNumber(result.totalProductNeeded)} {result.unit}</div>
            <div>Product Units to Order: {result.totalProductUnits}</div>
            <div>Cost per Ounce: ${formatNumber(result.costPerOz)}</div>
            <div>Total MSRP: ${formatNumber(result.totalCostMSRP)}</div>
            <div>Total Discounted: ${formatNumber(result.totalCostDiscounted)}</div>
            <div>Cost per Acre: ${formatNumber(result.costPerAcre)}</div>
          </div>
        ))}

        <div className="border-t border-black pt-2 mt-4">
          <strong>Total Program Cost per Acre:</strong> ${formatNumber(programCost)} <br />
          <strong>Breakeven Yield per Acre:</strong> {formatNumber(roi.Breakeven)} {cropPriceUnit}/acre<br />
          <strong>2:1 ROI Yield:</strong> {formatNumber(roi["2:1 ROI"])} {cropPriceUnit}/acre<br />
          <strong>3:1 ROI Yield:</strong> {formatNumber(roi["3:1 ROI"])} {cropPriceUnit}/acre<br />
          <strong>4:1 ROI Yield:</strong> {formatNumber(roi["4:1 ROI"])} {cropPriceUnit}/acre<br />
          <strong>5:1 ROI Yield:</strong> {formatNumber(roi["5:1 ROI"])} {cropPriceUnit}/acre
        </div>
      </div>
    </>
  );
};

export default PDFResults;
