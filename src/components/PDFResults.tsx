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

Font.register({ family: 'Open Sans', src: 'https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFVZ0b.woff2' });
Font.register({ family: 'Montserrat', src: 'https://fonts.gstatic.com/s/montserrat/v15/JTUQjIg1_i6t8kCHKm45_Q.woff2' });

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Open Sans',
    color: '#000000',
  },
  header: {
    fontSize: 20,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 14,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 20,
  },
  section: {
    marginBottom: 20,
    padding: 10,
    border: '2px solid black',
    backgroundColor: '#e0e0e0',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    border: '1px solid black',
    padding: 4,
  },
  label: {
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  value: {
    fontFamily: 'Open Sans',
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

const PDFResults: React.FC<PDFResultsProps> = (props) => {
  const {
    growerName,
    repName,
    seedTreatmentResults,
    acres
  } = props;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Biological Program Calculator Summary</Text>
        <Text>Grower: {growerName || '—'}</Text>
        <Text>Dealer or Account Manager: {repName || '—'}</Text>
        <Text>Total Acres: {formatNumber(acres)}</Text>

        {seedTreatmentResults.length > 0 && (
          <>
            <Text style={styles.subheader}>Basic Seed Calculations</Text>
            <View style={styles.section}>
              <View style={styles.row}>
                <Text style={styles.label}>Number of Seeds per Unit</Text>
                <Text style={styles.value}>{formatNumber(seedTreatmentResults[0].seedsPerUnit)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Total Number of Units to Be Treated</Text>
                <Text style={styles.value}>{formatNumber(seedTreatmentResults[0].unitsToBeTreated)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Number of Bushels to Be Treated</Text>
                <Text style={styles.value}>{formatNumber(seedTreatmentResults[0].totalBushels)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Total Weight of Seeds (lbs)</Text>
                <Text style={styles.value}>{formatNumber(seedTreatmentResults[0].totalWeight)}</Text>
              </View>
            </View>
          </>
        )}
      </Page>
    </Document>
  );
};

export default PDFResults;