// src/components/ResultsDisplay.tsx

import React, { useState } from "react";
import { FoliarProductResult } from "../utils/data";
import { formatNumber } from "../utils/formatNumber";
import PDFDownloadButton from "./PDFDownloadButton";

interface SeedTreatmentResults {
  productName: string;
  productForm: string;
  applicationMethod: string;
  totalSeeds: number;
  totalWeight: number;
  totalUnits: number;
  seedsPerUnit: number;
  applicationRate: number;
  totalProductNeeded: number;
  totalProductUnits: number;
  productCostPerOz: number;
  totalCostToGrower: number;
  totalDiscountedCostToGrower: number;
  costPerUnitOfTreatedSeed: number;
  individualCostPerAcre: number;
}

interface ROIResults {
  programCost: number;
  roi2x: number;
  roi3x: number;
  roi4x: number;
  roi5x: number;
  roiUnit: string;
}

interface ResultsDisplayProps {
  seedTreatmentResults: SeedTreatmentResults[];
  inFurrowFoliarResults: FoliarProductResult[];
  roiResults: ROIResults;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  seedTreatmentResults,
  inFurrowFoliarResults,
  roiResults,
}) => {
  const seedAppMethodOptions = ["Liquid Seed Coating", "Planter Box Treatment"];
  const foliarAppMethodOptions = ["In-Furrow", "Foliar"];

  const [seedAppMethods, setSeedAppMethods] = useState(
    seedTreatmentResults.map((p) => p.applicationMethod)
  );
  const [foliarAppMethods, setFoliarAppMethods] = useState(
    inFurrowFoliarResults.map((p) => p.applicationType)
  );

  const handleSeedAppMethodChange = (index: number, value: string) => {
    const updated = [...seedAppMethods];
    updated[index] = value;
    setSeedAppMethods(updated);
  };

  const handleFoliarAppMethodChange = (index: number, value: string) => {
    const updated = [...foliarAppMethods];
    updated[index] = value;
    setFoliarAppMethods(updated);
  };

  return (
    <div className="px-4 pb-16">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-700">Results</h2>
        <PDFDownloadButton />
      </div>

      <h3 className="text-lg font-bold text-blue-700 mb-2">Seed Treatment Calculations</h3>
      {seedTreatmentResults.map((result, index) => (
        <div key={index} className="border border-gray-300 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-md font-semibold">
              {result.productName} ({result.productForm})
            </h4>
            <select
              className="border rounded px-2 py-1 text-sm print:hidden"
              value={seedAppMethods[index]}
              onChange={(e) => handleSeedAppMethodChange(index, e.target.value)}
            >
              {seedAppMethodOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="font-bold text-yellow-600">Total Number of Seeds to be Treated</div>
            <div>{formatNumber(result.totalSeeds)}</div>
            <div className="font-bold text-yellow-600">Total Weight of Seeds to be Treated (lbs)</div>
            <div>{formatNumber(result.totalWeight)}</div>
            <div className="font-bold text-yellow-600">Total Number of Units to be Treated</div>
            <div>{formatNumber(result.totalUnits)}</div>
            <div className="font-bold text-yellow-600">Number of Seeds per Unit</div>
            <div>{formatNumber(result.seedsPerUnit)}</div>
            <div className="font-bold text-yellow-600">Application Rate</div>
            <div>{formatNumber(result.applicationRate)}</div>
            <div className="font-bold text-yellow-600">Total Amount of Product Needed (oz)</div>
            <div>{formatNumber(result.totalProductNeeded)}</div>
            <div className="font-bold text-yellow-600">Total Product Units to Order</div>
            <div>{formatNumber(result.totalProductUnits)}</div>
            <div className="font-bold text-yellow-600">Product Cost per Ounce</div>
            <div>${formatNumber(result.productCostPerOz)}</div>
            <div className="font-bold text-yellow-600">Total Cost to Grower (MSRP)</div>
            <div>${formatNumber(result.totalCostToGrower)}</div>
            <div className="font-bold text-yellow-600">Total Discounted Cost to Grower</div>
            <div>${formatNumber(result.totalDiscountedCostToGrower)}</div>
            <div className="font-bold text-yellow-600">Product Cost per Unit of Treated Seed</div>
            <div>${formatNumber(result.costPerUnitOfTreatedSeed)}</div>
            <div className="font-bold text-yellow-600">Individual Cost of Seed Treatment per Acre</div>
            <div>${formatNumber(result.individualCostPerAcre)}</div>
          </div>
        </div>
      ))}

      <h3 className="text-lg font-bold text-blue-700 mb-2">In-Furrow / Foliar Product Costs</h3>
      {inFurrowFoliarResults.map((result, index) => (
        <div key={index} className="border border-gray-300 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-md font-semibold">
              {result.productName} ({result.applicationType === "Dry" ? "Dry" : "Liquid"})
            </h4>
            <select
              className="border rounded px-2 py-1 text-sm print:hidden"
              value={foliarAppMethods[index]}
              onChange={(e) => handleFoliarAppMethodChange(index, e.target.value)}
            >
              {foliarAppMethodOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="font-bold text-yellow-600">Application Rate</div>
            <div>{formatNumber(result.applicationRate)}</div>
            <div className="font-bold text-yellow-600">Total Amount of Product Needed (oz)</div>
            <div>{formatNumber(result.totalProductNeeded)}</div>
            <div className="font-bold text-yellow-600">Total Product Units to Order</div>
            <div>{result.totalProductUnits} – {result.productPackageString}</div>
            <div className="font-bold text-yellow-600">Product Cost per Ounce</div>
            <div>${formatNumber(result.productCostPerOz)}</div>
            <div className="font-bold text-yellow-600">Total Cost to Grower (MSRP)</div>
            <div>${formatNumber(result.totalCostToGrower)}</div>
            <div className="font-bold text-yellow-600">Total Discounted Cost to Grower</div>
            <div>${formatNumber(result.totalDiscountedCostToGrower)}</div>
            <div className="font-bold text-yellow-600">Individual Cost per Acre</div>
            <div>${formatNumber(result.individualCostPerAcre)}</div>
          </div>
        </div>
      ))}

      <h3 className="text-lg font-bold text-blue-700 mb-2">ROI Yield Thresholds</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="font-bold text-yellow-600">Breakeven Yield per Acre</div>
        <div>{formatNumber(roiResults.programCost / 1)} {roiResults.roiUnit}/acre</div>
        <div className="font-bold text-yellow-600">Yield Needed for 2:1 ROI</div>
        <div>{formatNumber(roiResults.roi2x)} {roiResults.roiUnit}/acre</div>
        <div className="font-bold text-yellow-600">Yield Needed for 3:1 ROI</div>
        <div>{formatNumber(roiResults.roi3x)} {roiResults.roiUnit}/acre</div>
        <div className="font-bold text-yellow-600">Yield Needed for 4:1 ROI</div>
        <div>{formatNumber(roiResults.roi4x)} {roiResults.roiUnit}/acre</div>
        <div className="font-bold text-yellow-600">Yield Needed for 5:1 ROI</div>
        <div>{formatNumber(roiResults.roi5x)} {roiResults.roiUnit}/acre</div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
