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

// Register fonts
Font.register({
  family: "Open Sans",
  src: "https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFVZ0b.woff2",
});
Font.register({
  family: "Montserrat",
  src: "https://fonts.gstatic.com/s/montserrat/v15/JTUQjIg1_i6t8kCHKm45_Q.woff2",
});

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Open Sans",
    color: "#000",
  },
  header: {
    fontSize: 20,
    fontFamily: "Montserrat",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subheader: {
    fontSize: 14,
    fontFamily: "Montserrat",
    fontWeight: "bold",
    marginBottom: 6,
    marginTop: 20,
  },
  section: {
    marginBottom: 20,
    padding: 10,
    border: "2px solid black",
    backgroundColor: "#e0e0e0",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderColor: "#000",
    borderWidth: 1.5,
    borderStyle: "solid",
    borderRadius: 2,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginBottom: 6,
  },
  label: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    color: "#000",
    lineHeight: 1.4,
  },
  value: {
    fontFamily: "Open Sans",
    color: "#000",
    lineHeight: 1.4,
  },
});

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

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Biological Program Calculator Summary</Text>
        {renderRow("Grower", growerName || "—")}
        {renderRow("Dealer or Account Manager", repName || "—")}
        {renderRow("Total Acres", formatNumber(acres))}
        {renderRow("Seed Type", seedType)}

        {/* Seed Calculations */}
        {seedTreatmentResults.length > 0 && (
          <>
            <Text style={styles.subheader}>Basic Seed Calculations</Text>
            <View style={styles.section}>
              {renderRow(
                "Number of Seeds per Unit",
                formatNumber(seedTreatmentResults[0].seedsPerUnit)
              )}
              {renderRow(
                "Total Number of Units to Be Treated",
                formatNumber(seedTreatmentResults[0].unitsToBeTreated)
              )}
              {renderRow(
                "Number of Bushels to Be Treated",
                formatNumber(seedTreatmentResults[0].totalBushels)
              )}
              {renderRow(
                "Total Weight of Seeds (lbs)",
                formatNumber(seedTreatmentResults[0].totalWeight)
              )}
            </View>

            <Text style={styles.subheader}>Seed Treatment Costs</Text>
            <View style={styles.section}>
              {renderRow(
                "Total Amount of Product Needed",
                formatNumber(seedTreatmentResults[0].totalProductNeeded)
              )}
              {renderRow(
                "Total Product Units to Order",
                formatNumber(seedTreatmentResults[0].totalProductUnits)
              )}
              {renderRow(
                "Product Cost per Unit",
                `$${formatNumber(seedTreatmentResults[0].costPerUnit)}`
              )}
              {renderRow(
                "Total Cost to Grower (MSRP)",
                `$${formatNumber(seedTreatmentResults[0].totalMSRPCost)}`
              )}
              {renderRow(
                "Total Discounted Cost to Grower",
                `$${formatNumber(seedTreatmentResults[0].totalDiscountedCost)}`
              )}
              {renderRow(
                "Cost per Unit of Treated Seed",
                `$${formatNumber(seedTreatmentResults[0].costPerUnitTreatedSeed)}`
              )}
              {renderRow(
                "Individual Cost of Seed Treatment per Acre",
                `$${formatNumber(seedTreatmentResults[0].costPerAcre)}`
              )}
            </View>
          </>
        )}

        {/* In-Furrow / Foliar */}
        {inFurrowFoliarResults.length > 0 && (
          <>
            <Text style={styles.subheader}>In-Furrow / Foliar Product Costs</Text>
            <View style={styles.section}>
              {inFurrowFoliarResults.map((product, idx) => (
                <View key={idx}>
                  {renderRow("Product Name", `${product.name} (${product.applicationMethod})`)}
                  {renderRow(
                    "Total Product Needed",
                    `${formatNumber(product.totalProductNeeded)}`
                  )}
                  {renderRow(
                    "Total Product Units to Order",
                    `${formatNumber(product.totalProductUnits)}`
                  )}
                  {renderRow(
                    "Cost per Acre",
                    `$${formatNumber(product.costPerAcre)}`
                  )}
                  {renderRow(
                    "Total Cost (MSRP)",
                    `$${formatNumber(product.totalMSRPCost)}`
                  )}
                  {renderRow(
                    "Discounted Total Cost",
                    `$${formatNumber(product.totalDiscountedCost)}`
                  )}
                </View>
              ))}
            </View>
          </>
        )}

        {/* Total Program Cost */}
        <Text style={styles.subheader}>Total Program Cost</Text>
        <View style={styles.section}>
          {renderRow("Total Undiscounted Cost", `$${formatNumber(totalUndiscountedCost)}`)}
          {renderRow("Total Discounted Cost", `$${formatNumber(totalDiscountedCost)}`)}
          {renderRow("Total Cost per Acre", `$${formatNumber(totalCostPerAcre)}`)}
        </View>

        {/* ROI */}
        <Text style={styles.subheader}>Breakeven ROI Calculations</Text>
        <View style={styles.section}>
          {renderRow(`Breakeven Yield (${marketPriceUnit})`, formatNumber(roi.breakevenYield))}
          {renderRow(`Yield for 2:1 ROI`, formatNumber(roi.roi2to1))}
          {renderRow(`Yield for 3:1 ROI`, formatNumber(roi.roi3to1))}
          {renderRow(`Yield for 4:1 ROI`, formatNumber(roi.roi4to1))}
          {renderRow(`Yield for 5:1 ROI`, formatNumber(roi.roi5to1))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFResults;
