// src/utils/calculations.ts

import { ProductData, seedTypes } from "./data";

export interface ProductCalculation {
  applicationRateUnit?: string;
  productName: string;
  productForm?: string;
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
  treatmentCapacity?: number;
  totalBushels?: number;
  packageSize?: number;
  packageUnits?: string;
  packageType?: string;
  applicationMethod?: string;
}

export function calculateSeedTreatmentData(
  seedType: string,
  acres: number,
  seedingRate: number,
  seedingRateUnit: string,
  seedsPerPoundOverride: number | undefined,
  dealerDiscount: number,
  growerDiscount: number,
  selectedProducts: { product: ProductData; applicationMethod: string }[],
  seedsPerUnitOverride: number | undefined
): ProductCalculation[] {
  const seedDefaults = seedTypes.find((s) => s["Seed Type"].toLowerCase() === seedType.toLowerCase());
  const seedsPerPound = seedsPerPoundOverride || seedDefaults?.["Seeds per Pound"] || 2800;
  const seedsPerUnit = seedsPerUnitOverride || seedDefaults?.["Seeds per Unit"] || seedsPerPound * 50;
  const lbsPerUnit = 50;

  return selectedProducts
    .filter(({ product }) => product && product["Application Rate"] && product["Package Size"])
    .map(({ product, applicationMethod }) => {
      const base = calculateProductData(
        acres,
        product,
        dealerDiscount,
        growerDiscount,
        seedType,
        seedsPerPound,
        lbsPerUnit,
        seedingRate,
        seedingRateUnit,
        seedsPerUnit
      );
      return { ...base, applicationMethod };
    });
}

export function calculateAllFoliarProductCosts(
  acres: number,
  dealerDiscount: number,
  growerDiscount: number,
  selectedProducts: { product: ProductData; applicationMethod: string }[]
): ProductCalculation[] {
  const seedType = "corn";
  const seedsPerPound = 2800;
  const lbsPerUnit = 50;
  const seedingRate = 32000;
  const seedingRateUnit = "seeds/acre";

  return selectedProducts
    .filter(({ product }) => product && product["Application Rate"] && product["Package Size"])
    .map(({ product, applicationMethod }) => {
      const base = calculateProductData(
        acres,
        product,
        dealerDiscount,
        growerDiscount,
        seedType,
        seedsPerPound,
        lbsPerUnit,
        seedingRate,
        seedingRateUnit
      );
      return { ...base, applicationMethod };
    });
}

export function calculateROI(
  totalCostPerAcre: number,
  marketPrice: number,
  unit: string
): {
  breakevenYield: number;
  roi2to1: number;
  roi3to1: number;
  roi4to1: number;
  roi5to1: number;
  unit: string;
} {
  const breakevenYield = marketPrice > 0 ? totalCostPerAcre / marketPrice : 0;
  return {
    breakevenYield,
    roi2to1: breakevenYield * 2,
    roi3to1: breakevenYield * 3,
    roi4to1: breakevenYield * 4,
    roi5to1: breakevenYield * 5,
    unit,
  };
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
  seedingRateUnit: string,
  seedsPerUnit?: number
): ProductCalculation {
  let applicationRate: number | undefined;
  let costPerUnit: number | undefined;
  let rateUnit: string | undefined;
  let totalProductNeeded: number = 0;

  const finalSeedsPerUnit = seedsPerUnit || 2800 * lbsPerUnit;
  const totalSeeds =
    seedingRateUnit === "seeds/acre"
      ? seedingRate * acres
      : seedingRate * acres * seedsPerPound;

  const totalWeight = totalSeeds / seedsPerPound;
  const unitsToBeTreated = totalSeeds / finalSeedsPerUnit;

  const applicationRateUnit = product["Application Rate Unit"];
  if (applicationRateUnit === "fl oz/acre") {
    applicationRate = product["Application Rate"];
    costPerUnit = product["Product Cost per fl oz"] ?? 0;
    rateUnit = "fl oz/acre";
    totalProductNeeded = acres * (applicationRate ?? 0);
  } else if (applicationRateUnit === "oz/acre") {
    applicationRate = product["Application Rate"];
    costPerUnit = product["Product Cost per oz"] ?? 0;
    rateUnit = "oz/acre";
    totalProductNeeded = acres * (applicationRate ?? 0);
  } else if (applicationRateUnit === "g/acre") {
    applicationRate = product["Application Rate"];
    costPerUnit = product["Product Cost per gram"] ?? 0;
    rateUnit = "g/acre";
    totalProductNeeded = acres * (applicationRate ?? 0);
  } else if (applicationRateUnit === "oz/unit") {
    applicationRate = product["Application Rate"];
    costPerUnit = product["Product Cost per oz"] ?? product["Product Cost per fl oz"] ?? 0;
    rateUnit = "oz/unit";
    totalProductNeeded = unitsToBeTreated * (applicationRate ?? 0);
  } else if (applicationRateUnit === "fl oz/unit") {
    applicationRate = product["Application Rate"];
    costPerUnit = product["Product Cost per fl oz"] ?? product["Product Cost per oz"] ?? 0;
    rateUnit = "fl oz/unit";
    totalProductNeeded = unitsToBeTreated * (applicationRate ?? 0);
  }

  const packageSize = product["Package Size"];
  const packageUnits = product["Package Units"];
  const packageType = product["Package Type"];
  const pluralize = (word: string, count: number) => {
    if (word.toLowerCase() === "box") return count === 1 ? "Box" : "Boxes";
    if (word.toLowerCase() === "pouch") return count === 1 ? "Pouch" : "Pouches";
    if (word.toLowerCase() === "pail") return count === 1 ? "Pail" : "Pails";
    if (word.toLowerCase() === "jug") return count === 1 ? "Jug" : "Jugs";
    return count === 1 ? word : `${word}s`;
  };

  const productPackageString = `${product["Product Name"]} – ${packageSize} ${packageUnits} – ${pluralize(packageType, Math.ceil(totalProductNeeded / packageSize))} – ${applicationRate} ${rateUnit} – Treats ${packageSize && applicationRate ? Math.floor(packageSize / applicationRate) : "-"} acres`;
  const productCostPerPackage = (costPerUnit ?? 0) * packageSize;
  const packagesNeeded = Math.ceil(totalProductNeeded / packageSize);
  const totalCostToGrower = packagesNeeded * productCostPerPackage;
  const discountFactor = 1 - (dealerDiscount + growerDiscount) / 100;
  const discountedCostToGrower = totalCostToGrower * discountFactor;

  const individualCostPerAcre =
    rateUnit?.includes("/acre")
      ? (applicationRate ?? 0) * (costPerUnit ?? 0) * discountFactor
      : ((totalProductNeeded ?? 0) * (costPerUnit ?? 0)) / acres;

  const productCostPerUnitSeed = discountedCostToGrower / acres;

  const treatmentCapacity = applicationRate && packageSize
    ? Math.floor(packageSize / applicationRate)
    : undefined;

  const lbsPerBushel = seedType.toLowerCase() === "corn" ? 56 : 60;
  const totalBushels = totalWeight / lbsPerBushel;

  return {
    applicationRateUnit,
    productName: product["Product Name"],
    productForm: product["Product Form"],
    packagesNeeded,
    productPackageString,
    originalTotalCostToGrower: totalCostToGrower,
    discountedTotalCostToGrower: discountedCostToGrower,
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
    seedsPerUnit: finalSeedsPerUnit,
    treatmentCapacity,
    totalBushels,
    packageSize,
    packageUnits,
    packageType,
  };
}
