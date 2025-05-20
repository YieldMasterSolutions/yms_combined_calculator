// src/components/PDFResults.tsx
/* eslint-disable @next/next/no-img-element */

import React from "react";
import { ProductCalculation } from "../utils/calculations";

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
    unit: string;
  };
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
}) => {
  const renderTable = (rows: [string, string | number][]) => (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem', fontSize: '11px' }}>
      <tbody>
        {rows.map(([label, value], index) => (
          <tr key={index}>
            <td style={{ border: '1px solid #888', padding: '4px', fontWeight: 600 }}>{label}</td>
            <td style={{ border: '1px solid #888', padding: '4px' }}>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div style={{ fontFamily: 'sans-serif', fontSize: '12px', color: '#111', padding: '1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src="/yms_combined_calculator/ymslogo3.png"
          alt="YMS Logo"
          style={{ height: '40px', marginBottom: '0.5rem' }}
        />
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '0.25rem' }}>YieldMaster Solutions</h2>
        <p style={{ fontSize: '14px', fontWeight: 500 }}>Biological Product Summary</p>
      </div>

      <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '0.25rem' }}>Grower Information</h3>
      {renderTable([
        ["Grower Name", growerName],
        ["Sales Rep", repName],
        ["Date", new Date().toLocaleDateString()]
      ])}

      {seedTreatmentResults.map((result, i) => (
        <div key={i} style={{ marginBottom: '1rem' }}>
          <h4 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '0.25rem' }}>{result.productName} (Seed Treatment)</h4>
          {renderTable([
            ["Application Rate", `${result.applicationRate} ${result.applicationRateUnit}`],
            ["Total Product Needed", `${result.totalProductNeeded?.toFixed(2)} ${result.packageUnits}`],
            ["Total Units to Order", `${Math.ceil(result.totalProductUnits ?? 0)} – ${result.packageSize} ${result.packageUnits}`],
            ["Product Cost per Ounce", `$${result.productCostPerOz?.toFixed(2)}`],
            ["Total MSRP", `$${result.originalTotalCostToGrower.toFixed(2)}`],
            ["Total Discounted Cost", `$${result.discountedTotalCostToGrower.toFixed(2)}`],
            ["Cost per Unit of Seed", `$${result.productCostPerUnitSeed?.toFixed(4)}`],
            ["Cost per Acre", `$${result.individualCostPerAcre.toFixed(2)}`],
          ])}
        </div>
      ))}

      {inFurrowFoliarResults.map((result, i) => (
        <div key={i} style={{ marginBottom: '1rem' }}>
          <h4 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '0.25rem' }}>{result.productName} ({result.applicationMethod})</h4>
          {renderTable([
            ["Application Rate", `${result.applicationRate} ${result.applicationRateUnit}`],
            ["Total Product Needed", `${result.totalProductNeeded?.toFixed(2)} ${result.packageUnits}`],
            ["Total Units to Order", `${Math.ceil(result.totalProductUnits ?? 0)} – ${result.packageSize} ${result.packageUnits}`],
            ["Product Cost per Ounce", `$${result.productCostPerOz?.toFixed(2)}`],
            ["Total MSRP", `$${result.originalTotalCostToGrower.toFixed(2)}`],
            ["Total Discounted Cost", `$${result.discountedTotalCostToGrower.toFixed(2)}`],
            ["Cost per Acre", `$${result.individualCostPerAcre.toFixed(2)}`],
          ])}
        </div>
      ))}

      <h4 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '0.25rem' }}>Total Program Cost</h4>
      {renderTable([
        ["Total Program Cost per Acre", `$${totalCostPerAcre.toFixed(2)}`],
        ["Total Undiscounted Cost", `$${totalUndiscountedCost.toFixed(2)}`],
        ["Total Discounted Cost", `$${totalDiscountedCost.toFixed(2)}`],
      ])}

      <h4 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '0.25rem' }}>Breakeven ROI Table</h4>
      {renderTable([
        ["Breakeven Yield", `${roi.breakevenYield.toFixed(2)} ${roi.unit}`],
        ["2:1 ROI", `${roi.roi2to1.toFixed(2)} ${roi.unit}`],
        ["3:1 ROI", `${roi.roi3to1.toFixed(2)} ${roi.unit}`],
        ["4:1 ROI", `${roi.roi4to1.toFixed(2)} ${roi.unit}`],
        ["5:1 ROI", `${roi.roi5to1.toFixed(2)} ${roi.unit}`],
      ])}
    </div>
  );
};

export default PDFResults;
