// src/utils/calculations.ts

import { ProductData } from "./data";

export interface SeedTreatmentResult {
  productName: string;
  applicationRate: number;
  totalProductNeeded: number;
  totalProductUnits: number;
  productPackageString: string;
  productCostPerOz: number;
  totalCostToGrower: number;
  totalDiscountedCostToGrower: number;
  costPerUnitSeed: number;
  costPerAcre: number;
  productForm: string;
  applicationMethod: string;
  totalUnits: number;
}

export interface FoliarProductResult {
  productName: string;
  applicationRate: number;
  totalProductNeeded: number;
  totalProductUnits: number;
  productPackageString: string;
  productCostPerOz: number;
  totalCostToGrower: number;
  totalDiscountedCostToGrower: number;
  individualCostPerAcre: number;
  applicationMethod: string;
}

export interface ROIResults {
  breakeven: number;
  roi2: number;
  roi3: number;
  roi4: number;
  roi5: number;
}

export function calculateSeedTreatmentData(
  seedType: string,
  acres: number,
  seedingRate: number,
  rateUnit: string,
  dealerDiscount: number,
  growerDiscount: number,
  selections: { product: ProductData; applicationMethod: string }[],
  seedsPerPound: number,
  lbsPerUnit: number
): SeedTreatmentResult[] {
  const totalSeeds =
    rateUnit === "seeds/acre" ? acres * seedingRate : acres * seedingRate * seedsPerPound;
  const totalWeight =
    rateUnit === "lbs/acre" ? acres * seedingRate : totalSeeds / seedsPerPound;
  const totalUnits = totalWeight / lbsPerUnit;

  return selections.map(({ product, applicationMethod }) => {
    const seedsPerUnit = seedType === "Corn" ? 80000 : seedType === "Soybeans" ? 140000 : seedsPerPound * lbsPerUnit;
    const unitsToTreat = totalSeeds / seedsPerUnit;
    const applicationRate = product["Application Rate"];
    const productCostPerOz = product["Product Cost per oz"] ?? product["Product Cost per fl oz"] ?? 0;
    const totalProductNeeded = applicationRate * unitsToTreat;
    const totalProductUnits = Math.ceil(totalProductNeeded / product["Package Size"]);
    const productPackageString = `${product["Package Size"]} ${product["Package Units"]} ${product["Package Type"]}`;
    const totalCostToGrower = totalProductNeeded * productCostPerOz;
    const totalDiscountedCostToGrower = totalCostToGrower * (1 - dealerDiscount / 100) * (1 - growerDiscount / 100);
    const costPerUnitSeed = totalDiscountedCostToGrower / totalSeeds;
    const costPerAcre = totalDiscountedCostToGrower / acres;

    return {
      productName: product["Product Name"],
      applicationRate,
      totalProductNeeded,
      totalProductUnits,
      productPackageString,
      productCostPerOz,
      totalCostToGrower,
      totalDiscountedCostToGrower,
      costPerUnitSeed,
      costPerAcre,
      productForm: product["Product Form"] || "",
      applicationMethod,
      totalUnits,
    };
  });
}

export function calculateAllFoliarProductCosts(
  acres: number,
  dealerDiscount: number,
  growerDiscount: number,
  selections: { product: ProductData; applicationMethod: string }[]
): FoliarProductResult[] {
  return selections.map(({ product, applicationMethod }) => {
    const rate = product["Application Rate"];
    const productCostPerOz = product["Product Cost per oz"] ?? product["Product Cost per fl oz"] ?? product["Product Cost per gram"] ?? 0;
    const totalProductNeeded = rate * acres;
    const totalProductUnits = Math.ceil(totalProductNeeded / product["Package Size"]);
    const productPackageString = `${product["Package Size"]} ${product["Package Units"]} ${product["Package Type"]}`;
    const totalCostToGrower = totalProductNeeded * productCostPerOz;
    const totalDiscountedCostToGrower = totalCostToGrower * (1 - dealerDiscount / 100) * (1 - growerDiscount / 100);
    const individualCostPerAcre = totalDiscountedCostToGrower / acres;

    return {
      productName: product["Product Name"],
      applicationRate: rate,
      totalProductNeeded,
      totalProductUnits,
      productPackageString,
      productCostPerOz,
      totalCostToGrower,
      totalDiscountedCostToGrower,
      individualCostPerAcre,
      applicationMethod,
    };
  });
}

export function calculateProgramCost(
  seedResults: SeedTreatmentResult[],
  foliarResults: FoliarProductResult[]
): number {
  const seedCost = seedResults.reduce((sum, p) => sum + p.costPerAcre, 0);
  const foliarCost = foliarResults.reduce((sum, p) => sum + p.individualCostPerAcre, 0);
  return seedCost + foliarCost;
}

export function calculateROI(marketPrice: number, programCost: number): ROIResults {
  const calculateYield = (multiplier: number) => programCost === 0 ? 0 : (programCost * multiplier) / marketPrice;
  return {
    breakeven: calculateYield(1),
    roi2: calculateYield(2),
    roi3: calculateYield(3),
    roi4: calculateYield(4),
    roi5: calculateYield(5),
  };
}
