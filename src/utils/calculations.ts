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
  productCostPerPackage?: number;
  productCostPerUnitSeed?: number;
  totalSeeds?: number;
  totalWeight?: number;
  unitsToBeTreated?: number;
  seedsPerUnit?: number;
}

export function calculateProductData(
  acres: number,
  product: ProductData,
  dealerDiscount: number = 0,
  growerDiscount: number = 0,
  seedType: string,
  seedsPerPound: number,
  lbsPerUnit: number,
  seedingRate: number,
  seedingRateUnit: string
): ProductCalculation {
  let applicationRate: number | undefined;
  let costPerUnit: number | undefined;
  let rateUnit: string | undefined;
  let totalProductNeeded: number = 0;

  // Determine seedsPerUnit
  let seedsPerUnit: number;
  if (seedType.toLowerCase() === "corn") {
    seedsPerUnit = 80000;
  } else if (seedType.toLowerCase() === "soybeans") {
    seedsPerUnit = 140000;
  } else {
    seedsPerUnit = seedsPerPound * lbsPerUnit;
  }

  // Calculate totalSeeds and totalWeight based on unit
  let totalSeeds: number;
  let totalWeight: number;
  if (seedingRateUnit === "seeds/acre") {
    totalSeeds = seedingRate * acres;
    totalWeight = totalSeeds / seedsPerPound;
  } else {
    totalWeight = seedingRate * acres;
    totalSeeds = totalWeight * seedsPerPound;
  }

  const unitsToBeTreated = totalSeeds / seedsPerUnit;

  // Determine application rate and total product needed
  const applicationRateUnit = product["Application Rate Unit"];
  if (applicationRateUnit === "fl oz/acre") {
    applicationRate = product["Application Rate"];
    costPerUnit = product["Product Cost per fl oz"];
    rateUnit = "fl oz/acre";
    totalProductNeeded = acres * (applicationRate ?? 0);
  } else if (applicationRateUnit === "oz/acre") {
    applicationRate = product["Application Rate"];
    costPerUnit = product["Product Cost per oz"];
    rateUnit = "oz/acre";
    totalProductNeeded = acres * (applicationRate ?? 0);
  } else if (applicationRateUnit === "g/acre") {
    applicationRate = product["Application Rate"];
    costPerUnit = product["Product Cost per gram"];
    rateUnit = "g/acre";
    totalProductNeeded = acres * (applicationRate ?? 0);
  } else if (applicationRateUnit === "oz/unit") {
    applicationRate = product["Application Rate"];
    costPerUnit = product["Product Cost per oz"];
    rateUnit = "oz/unit";
    totalProductNeeded = unitsToBeTreated * (applicationRate ?? 0);
  } else if (applicationRateUnit === "fl oz/unit") {
    applicationRate = product["Application Rate"];
    costPerUnit = product["Product Cost per fl oz"];
    rateUnit = "fl oz/unit";
    totalProductNeeded = unitsToBeTreated * (applicationRate ?? 0);
  }

  // Pricing
  const packageSize = product["Package Size"];
  const productPackageString = `${packageSize} ${product["Package Units"]} - ${product["Package Type"]}`;
  const productCostPerPackage = (costPerUnit ?? 0) * packageSize;
  const packagesNeeded = Math.ceil(totalProductNeeded / packageSize);

  const totalCostToGrower = packagesNeeded * productCostPerPackage;
  const discountFactor = 1 - (dealerDiscount + growerDiscount) / 100;
  const discountedCostToGrower = totalCostToGrower * discountFactor;
  const individualCostPerAcre = ((applicationRate ?? 0) * (costPerUnit ?? 0)) * discountFactor;
  const productCostPerUnitSeed = (discountedCostToGrower / acres) || 0;

  return {
    productName: product["Product Name"],
    packagesNeeded,
    productPackageString,
    originalTotalCostToGrower: totalCostToGrower,
    discountedTotalCostToGrower,
    individualCostPerAcre,
    applicationRate,
    rateUnit,
    totalProductNeeded,
    totalProductUnits: packagesNeeded,
    productCostPerOz: costPerUnit,
    totalCostToGrower,
    costPerUnitSeed: productCostPerUnitSeed,
    discountedCostToGrower,
    productCostPerPackage,
    productCostPerUnitSeed,
    totalSeeds,
    totalWeight,
    unitsToBeTreated,
    seedsPerUnit,
  };
}

export function calculateProductCosts(
  acres: number,
  selectedProducts: ProductData[],
  dealerDiscount: number = 0,
  growerDiscount: number = 0,
  seedType: string,
  seedsPerPound: number,
  lbsPerUnit: number,
  seedingRate: number,
  seedingRateUnit: string
): {
  productsData: ProductCalculation[];
  totalCostPerAcre: number;
  totalUndiscountedCost: number;
  totalDiscountedCost: number;
} {
  const productsData = selectedProducts.map((product) =>
    calculateProductData(
      acres,
      product,
      dealerDiscount,
      growerDiscount,
      seedType,
      seedsPerPound,
      lbsPerUnit,
      seedingRate,
      seedingRateUnit
    )
  );

  const totalCostPerAcre = productsData.reduce((sum, p) => sum + p.individualCostPerAcre, 0);
  const totalUndiscountedCost = productsData.reduce((sum, p) => sum + p.originalTotalCostToGrower, 0);
  const totalDiscountedCost = productsData.reduce((sum, p) => sum + p.discountedTotalCostToGrower, 0);

  return {
    productsData,
    totalCostPerAcre,
    totalUndiscountedCost,
    totalDiscountedCost,
  };
}
