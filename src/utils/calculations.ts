// src/utils/calculations.ts

import { ProductData } from "./data";

export interface ProductCalculation {
  productName: string;
  packagesNeeded: number;
  productPackageString: string;
  originalTotalCostToGrower: number;
  discountedTotalCostToGrower: number;
  individualCostPerAcre: number;
  applicationRate?: number;
  rateUnit?: string;
  totalProductNeeded?: number;
  totalProductUnits?: number;
  productCostPerOz?: number;
  totalCostToGrower?: number;
  costPerUnitSeed?: number;
  discountedCostToGrower?: number;
}

export function calculateProductData(
  acres: number,
  product: ProductData,
  dealerDiscount: number = 0,
  growerDiscount: number = 0,
  seedType: string,
  seedsPerPound: number,
  lbsPerUnit: number
): ProductCalculation {
  let applicationRate: number | undefined;
  let costPerUnit: number | undefined;
  let rateUnit: string | undefined;

  if (product["Application Rate in Fluid Ounces"]) {
    applicationRate = product["Application Rate in Fluid Ounces"];
    costPerUnit = product["Product Cost per fl oz"];
    rateUnit = "fl oz/acre";
  } else if (product["Application Rate in Ounces"]) {
    applicationRate = product["Application Rate in Ounces"];
    costPerUnit = product["Product Cost per oz"];
    rateUnit = "oz/acre";
  } else if (product["Application Rate in Grams"]) {
    applicationRate = product["Application Rate in Grams"];
    costPerUnit = product["Product Cost per gram"];
    rateUnit = "g/acre";
  } else if (product["Application Rate in Ounces per Unit"]) {
    let seedsPerUnit: number;
    const seed = seedType.toLowerCase();
    if (seed === "corn") {
      seedsPerUnit = 80000;
    } else if (seed === "soybeans") {
      seedsPerUnit = 140000;
    } else {
      seedsPerUnit = seedsPerPound * lbsPerUnit;
    }
    const totalUnits = (acres * seedingRatePerAcre(seedType, seedsPerPound, lbsPerUnit)) / seedsPerUnit;
    applicationRate = product["Application Rate in Ounces per Unit"] * totalUnits;
    costPerUnit = product["Product Cost per oz"];
    rateUnit = "oz/unit";
  }

  const packageSize = product["Package Size"];
  const costPerPackage = (costPerUnit ?? 0) * packageSize;
  const totalProductNeeded = acres * (applicationRate || 0);
  const packagesNeeded = Math.ceil(totalProductNeeded / packageSize);
  const originalTotalCostToGrower = packagesNeeded * costPerPackage;
  const discountFactor = 1 - ((dealerDiscount + growerDiscount) / 100);
  const discountedTotalCostToGrower = originalTotalCostToGrower * discountFactor;
  const individualCostPerAcre = ((applicationRate || 0) * (costPerUnit || 0)) * discountFactor;
  const productPackageString = `${packageSize} ${product["Package Units"]} - ${product["Package Type"]}`;

  return {
  productName: product["Product Name"],
  packagesNeeded,
  productPackageString,
  originalTotalCostToGrower,
  discountedTotalCostToGrower,
  individualCostPerAcre,
  applicationRate,
  rateUnit,
  totalProductNeeded,
  totalProductUnits: packagesNeeded,
  productCostPerOz: costPerUnit,
  totalCostToGrower: originalTotalCostToGrower,
  costPerUnitSeed: individualCostPerAcre,
  discountedCostToGrower: discountedTotalCostToGrower
};
}

function seedingRatePerAcre(
  seedType: string,
  seedsPerPound: number,
  lbsPerUnit: number
): number {
  const seed = seedType.toLowerCase();
  if (seed === "corn") return 80000;
  if (seed === "soybeans") return 140000;
  return seedsPerPound * lbsPerUnit;
}

export function calculateProductCosts(
  acres: number,
  selectedProducts: ProductData[],
  dealerDiscount: number = 0,
  growerDiscount: number = 0,
  seedType: string,
  seedsPerPound: number,
  lbsPerUnit: number
): {
  productsData: ProductCalculation[];
  totalCostPerAcre: number;
  totalUndiscountedCost: number;
  totalDiscountedCost: number;
} {
  const productsData = selectedProducts.map(product =>
    calculateProductData(acres, product, dealerDiscount, growerDiscount, seedType, seedsPerPound, lbsPerUnit)
  );

  const totalCostPerAcre = productsData.reduce((sum, p) => sum + p.individualCostPerAcre, 0);
  const totalUndiscountedCost = productsData.reduce((sum, p) => sum + p.originalTotalCostToGrower, 0);
  const totalDiscountedCost = productsData.reduce((sum, p) => sum + p.discountedTotalCostToGrower, 0);

  return {
    productsData,
    totalCostPerAcre,
    totalUndiscountedCost,
    totalDiscountedCost
  };
}
