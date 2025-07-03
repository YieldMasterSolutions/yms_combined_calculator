// src/utils/calculations.ts

export interface ProductData {
  "Product Name": string;
  "Application Rate": number;
  "Rate Unit": string;
  "Application Method": string;
  "Package Size": number;
  "Package Units": string;
  "Cost Per Unit": number;
  "Units Per Package": number;
}

export interface ProductCalculation {
  productName: string;
  applicationRate: number;
  rateUnit: string;
  applicationMethod: string;
  totalProductNeeded: number;
  totalProductUnits: number;
  productCostPerPackage: number;
  productCostPerUnit: number;
  totalUndiscountedCost: number;
  totalDiscountedCost: number;
  costPerTreatedUnit: number;
  costPerAcre: number;
  packageType: string;
}

export function calculateSeedTreatmentData(
  seedTreatmentProducts: (ProductData | null)[],
  acres: number,
  seedingRate: number,
  rateUnit: string,
  seedsPerUnit: number,
  dealerDiscount: number,
  growerDiscount: number
): ProductCalculation[] {
  const totalUnitsToTreat = (acres * seedingRate) / seedsPerUnit;

  return seedTreatmentProducts
    .filter((product): product is ProductData => product !== null)
    .map((product) => {
      const {
        "Product Name": productName,
        "Application Rate": applicationRate,
        "Rate Unit": rateUnit,
        "Application Method": applicationMethod,
        "Package Size": packageSize,
        "Package Units": packageUnits,
        "Cost Per Unit": costPerUnit,
        "Units Per Package": unitsPerPackage,
      } = product;

      const totalProductNeeded = totalUnitsToTreat * applicationRate;
      const totalProductUnits = Math.ceil(totalProductNeeded / unitsPerPackage);
      const productCostPerPackage = costPerUnit * unitsPerPackage;
      const totalUndiscountedCost = totalProductUnits * productCostPerPackage;
      const discountFactor = 1 - dealerDiscount - growerDiscount;
      const totalDiscountedCost = totalUndiscountedCost * discountFactor;

      const costPerTreatedUnit = totalDiscountedCost / totalUnitsToTreat;
      const costPerAcre = totalDiscountedCost / acres;

      return {
        productName: `${productName} – ${applicationRate} ${rateUnit}/unit – Treats ${unitsPerPackage / applicationRate} units`,
        applicationRate,
        rateUnit,
        applicationMethod,
        totalProductNeeded,
        totalProductUnits,
        productCostPerPackage,
        productCostPerUnit: costPerUnit,
        totalUndiscountedCost,
        totalDiscountedCost,
        costPerTreatedUnit,
        costPerAcre,
        packageType: packageUnits,
      };
    });
}

export function calculateAllFoliarProductCosts(
  foliarProducts: (ProductData | null)[],
  acres: number,
  dealerDiscount: number,
  growerDiscount: number
): ProductCalculation[] {
  return foliarProducts
    .filter((product): product is ProductData => product !== null)
    .map((product) => {
      const {
        "Product Name": productName,
        "Application Rate": applicationRate,
        "Rate Unit": rateUnit,
        "Application Method": applicationMethod,
        "Package Size": packageSize,
        "Package Units": packageUnits,
        "Cost Per Unit": costPerUnit,
        "Units Per Package": unitsPerPackage,
      } = product;

      const totalProductNeeded = acres * applicationRate;
      const totalProductUnits = Math.ceil(totalProductNeeded / unitsPerPackage);
      const productCostPerPackage = costPerUnit * unitsPerPackage;
      const totalUndiscountedCost = totalProductUnits * productCostPerPackage;
      const discountFactor = 1 - dealerDiscount - growerDiscount;
      const totalDiscountedCost = totalUndiscountedCost * discountFactor;

      const costPerTreatedUnit = totalDiscountedCost / acres;
      const costPerAcre = totalDiscountedCost / acres;

      return {
        productName: `${productName} – ${applicationRate} ${rateUnit}/acre`,
        applicationRate,
        rateUnit,
        applicationMethod,
        totalProductNeeded,
        totalProductUnits,
        productCostPerPackage,
        productCostPerUnit: costPerUnit,
        totalUndiscountedCost,
        totalDiscountedCost,
        costPerTreatedUnit,
        costPerAcre,
        packageType: packageUnits,
      };
    });
}

export function calculateROI(
  totalCostPerAcre: number,
  marketPrice: number
): {
  breakevenYield: number;
  roi2to1: number;
  roi3to1: number;
  roi4to1: number;
  roi5to1: number;
} {
  const breakevenYield = totalCostPerAcre / marketPrice;
  return {
    breakevenYield,
    roi2to1: breakevenYield * 2,
    roi3to1: breakevenYield * 3,
    roi4to1: breakevenYield * 4,
    roi5to1: breakevenYield * 5,
  };
}
