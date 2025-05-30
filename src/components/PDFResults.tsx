// src/components/PDFResults.tsx

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { ProductCalculation } from "../utils/calculations";
import { formatNumber } from "../utils/formatNumber";

// Register fonts (must use .ttf for react-pdf)
Font.register({
  family: "Open Sans",
  src: "https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFUZ0ef8pkAg.ttf",
});
Font.register({
  family: "Montserrat",
  src: "https://fonts.gstatic.com/s/montserrat/v15/JTUQjIg1_i6t8kCHKm45xW4.ttf",
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Open Sans",
    color: "#000",
  },
  header: {
    fontSize: 20,
    fontFamily: "Montserrat",
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 16,
    padding: 10,
    border: "1pt solid #999",
    borderRadius: 4,
    backgroundColor: "#f9f9f9",
  },
  subheader: {
    fontSize: 14,
    fontFamily: "Montserrat",
    marginBottom: 6,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  label: {
    fontFamily: "Montserrat",
    fontSize: 11,
    fontWeight: "bold",
    color: "#333",
  },
  value: {
    fontFamily: "Open Sans",
    fontSize: 11,
    color: "#000",
  },
});

const pluralize = (word: string, count: number) => {
  if (count === 1) return word;
  switch (word.toLowerCase()) {
    case "box": return "Boxes";
    case "pail": return "Pails";
    case "pouch": return "Pouches";
    case "jug": return "Jugs";
    case "case": return "Cases";
    case "unit": return "Units";
    default: return word.endsWith("s") ? word : `${word}s`;
  }
};

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
  };
  marketPriceUnit: string;
  seedType: string;
  acres: number;
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
  seedType,
  acres,
}) => {
  const renderRow = (label: string, value: string | number) => (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  const unitLabel = seedType.toLowerCase().includes("corn") || seedType.toLowerCase().includes("soy")
    ? "bu/acre"
    : marketPriceUnit.includes("/")
    ? marketPriceUnit
    : `${marketPriceUnit}/acre`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Biological Program Calculator Summary</Text>

        <View style={styles.section}>
          {renderRow("Grower", growerName || "—")}
          {renderRow("Rep or Dealer", repName || "—")}
          {renderRow("Total Acres", formatNumber(acres))}
          {renderRow("Seed Type", seedType)}
        </View>

        {seedTreatmentResults.length > 0 && (
          <>
            <Text style={styles.subheader}>Basic Seed Calculations</Text>
            <View style={styles.section}>
              {renderRow("Number of Seeds per Unit", formatNumber(seedTreatmentResults[0].seedsPerUnit))}
              {renderRow("Total Units to Be Treated", formatNumber(seedTreatmentResults[0].unitsToBeTreated))}
              {renderRow("Number of Bushels to Be Treated", formatNumber(seedTreatmentResults[0].totalBushels))}
              {renderRow("Total Seed Weight (lbs)", formatNumber(seedTreatmentResults[0].totalWeight))}
            </View>

            <Text style={styles.subheader}>Seed Treatment Costs</Text>
            {seedTreatmentResults.map((p, i) => (
              <View style={styles.section} key={i}>
                {renderRow("Product Name", p.productName)}
                {renderRow("Application Rate", `${p.applicationRate} ${p.rateUnit}`)}
                {renderRow("Total Product Needed", `${formatNumber(p.totalProductNeeded)} ${p.rateUnit?.split("/")[0]}`)}
                {renderRow("Total Product Units to Order", `${formatNumber(p.totalProductUnits)} ${pluralize(p.packageType || "Unit", p.totalProductUnits || 0)}`)}
                {renderRow("Product Cost per Package", `$${formatNumber(p.productCostPerPackage)}`)}
                {renderRow("Total Cost (MSRP)", `$${formatNumber(p.originalTotalCostToGrower)}`)}
                {renderRow("Discounted Total Cost", `$${formatNumber(p.discountedTotalCostToGrower)}`)}
                {renderRow("Cost per Unit Treated", `$${formatNumber(p.productCostPerUnitSeed)}`)}
                {renderRow("Cost per Acre", `$${formatNumber(p.individualCostPerAcre)}`)}
              </View>
            ))}
          </>
        )}

        {inFurrowFoliarResults.length > 0 && (
          <>
            <Text style={styles.subheader}>In-Furrow / Foliar Product Costs</Text>
            {inFurrowFoliarResults.map((p, i) => (
              <View style={styles.section} key={i}>
                {renderRow("Product Name", `${p.productName} (${p.applicationMethod})`)}
                {renderRow("Application Rate", `${p.applicationRate} ${p.rateUnit}`)}
                {renderRow("Total Product Needed", `${formatNumber(p.totalProductNeeded)} ${p.rateUnit?.split("/")[0]}`)}
                {renderRow("Total Product Units to Order", `${formatNumber(p.totalProductUnits)} ${pluralize(p.packageType || "Unit", p.totalProductUnits || 0)}`)}
                {renderRow("Product Cost per Package", `$${formatNumber(p.productCostPerPackage)}`)}
                {renderRow("Total Cost (MSRP)", `$${formatNumber(p.originalTotalCostToGrower)}`)}
                {renderRow("Discounted Total Cost", `$${formatNumber(p.discountedTotalCostToGrower)}`)}
                {renderRow("Cost per Acre", `$${formatNumber(p.individualCostPerAcre)}`)}
              </View>
            ))}
          </>
        )}

        <Text style={styles.subheader}>Total Program Cost</Text>
        <View style={styles.section}>
          {renderRow("Total Undiscounted Cost", `$${formatNumber(totalUndiscountedCost)}`)}
          {renderRow("Total Discounted Cost", `$${formatNumber(totalDiscountedCost)}`)}
          {renderRow("Total Cost per Acre", `$${formatNumber(totalCostPerAcre)}`)}
        </View>

        <Text style={styles.subheader}>Breakeven ROI Calculations</Text>
        <View style={styles.section}>
          {renderRow(`Breakeven Yield (${unitLabel})`, formatNumber(roi.breakevenYield))}
          {renderRow("Yield for 2:1 ROI", formatNumber(roi.roi2to1))}
          {renderRow("Yield for 3:1 ROI", formatNumber(roi.roi3to1))}
          {renderRow("Yield for 4:1 ROI", formatNumber(roi.roi4to1))}
          {renderRow("Yield for 5:1 ROI", formatNumber(roi.roi5to1))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFResults;
