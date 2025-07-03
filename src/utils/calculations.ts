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
  const seedDefaults = seedTypes.find(
    (s) => s["Seed Type"].toLowerCase() === seedType.toLowerCase()
  );
  const seedsPerPound = seedsPerPoundOverride || parseFloat(seedDefaults?.["Seeds/lb"] || "2800");
  const seedsPerUnit = seedsPerUnitOverride || seedsPerPound * (seedDefaults?.["Lbs/Unit"] || 50);
  const lbsPerUnit = seedDefaults?.["Lbs/Unit"] || 50;

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
  return selectedProducts
    .filter(({ product }) => product && product["Application Rate"] && product["Package Size"])
    .map(({ product, applicationMethod }) => {
      const base = calculateProductData(
        acres,
        product,
        dealerDiscount,
        growerDiscount,
        "corn",
        2800,
        50,
        32000,
        "seeds/acre"
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
    roi2to1: (2 * totalCostPerAcre) / marketPrice,
    roi3to1: (3 * totalCostPerAcre) / marketPrice,
    roi4to1: (4 * totalCostPerAcre) / marketPrice,
    roi5to1: (5 * totalCostPerAcre) / marketPrice,
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
  let totalProductNeeded = 0;

  const finalSeedsPerUnit = seedsPerUnit || 2800 * lbsPerUnit;
  const totalSeeds =
    seedingRateUnit === "seeds/acre"
      ? seedingRate * acres
      : seedingRateUnit === "lbs/acre"
      ? seedingRate * acres * seedsPerPound
      : 0;

  const totalWeight = totalSeeds / seedsPerPound;
  const unitsToBeTreated = totalSeeds / finalSeedsPerUnit;

  const applicationRateUnit = product["Application Rate Unit"];
  if (applicationRateUnit === "fl oz/acre") {
    applicationRate = product["Application Rate"] ?? 0;
    costPerUnit = product["Product Cost per fl oz"] ?? 0;
    rateUnit = "fl oz/acre";
    totalProductNeeded = acres * applicationRate;
  } else if (applicationRateUnit === "oz/acre") {
    applicationRate = product["Application Rate"] ?? 0;
    costPerUnit = product["Product Cost per oz"] ?? 0;
    rateUnit = "oz/acre";
    totalProductNeeded = acres * applicationRate;
  } else if (applicationRateUnit === "g/acre") {
    applicationRate = product["Application Rate"] ?? 0;
    costPerUnit = product["Product Cost per gram"] ?? 0;
    rateUnit = "g/acre";
    totalProductNeeded = acres * applicationRate;
  } else if (applicationRateUnit === "oz/unit") {
    applicationRate = product["Application Rate"] ?? 0;
    costPerUnit = product["Product Cost per oz"] ?? 0;
    rateUnit = "oz/unit";
    totalProductNeeded = unitsToBeTreated * applicationRate;
  } else if (applicationRateUnit === "fl oz/unit") {
    applicationRate = product["Application Rate"] ?? 0;
    costPerUnit = product["Product Cost per fl oz"] ?? 0;
    rateUnit = "fl oz/unit";
    totalProductNeeded = unitsToBeTreated * applicationRate;
  }

  const packageSize = product["Package Size"];
  const packageUnits = product["Package Units"];
  const packageType = product["Package Type"];

  const pluralize = (word: string, count: number) => {
    const lower = word.toLowerCase();
    if (lower === "box") return count === 1 ? "Box" : "Boxes";
    if (lower === "pouch") return count === 1 ? "Pouch" : "Pouches";
    if (lower === "pail") return count === 1 ? "Pail" : "Pails";
    if (lower === "jug") return count === 1 ? "Jug" : "Jugs";
    if (lower === "case") return count === 1 ? "Case" : "Cases";
    return count === 1 ? word : `${word}s`;
  };

  const treatmentCapacity =
    applicationRate && packageSize ? Math.floor(packageSize / applicationRate) : undefined;

  const productPackageString = `${product["Product Name"]} – ${packageSize} ${packageUnits} – ${pluralize(
    packageType,
    Math.ceil(totalProductNeeded / packageSize)
  )} – ${applicationRate ?? "-"} ${rateUnit} – Treats ${treatmentCapacity || "-"} ${
    rateUnit?.includes("/unit") ? "units" : "acres"
  }`;

  const productCostPerPackage = (costPerUnit ?? 0) * packageSize;
  const packagesNeeded = Math.ceil(totalProductNeeded / packageSize);
  const totalCostToGrower = packagesNeeded * productCostPerPackage;
  const discountFactor = 1 - (dealerDiscount + growerDiscount) / 100;
  const discounted = totalCostToGrower * discountFactor;

  const individualCostPerAcre = rateUnit?.includes("/acre")
    ? (applicationRate ?? 0) * (costPerUnit ?? 0) * discountFactor
    : ((totalProductNeeded ?? 0) * (costPerUnit ?? 0)) / acres;

  const productCostPerUnitSeed =
    unitsToBeTreated > 0 ? discounted / unitsToBeTreated : 0;

  const lbsPerBushel = seedType.toLowerCase() === "corn" ? 56 : 60;
  const totalBushels = totalWeight / lbsPerBushel;

  return {
    applicationRateUnit,
    productName: product["Product Name"],
    productForm: product["Product Form"],
    packagesNeeded,
    productPackageString,
    originalTotalCostToGrower: totalCostToGrower,
    discountedTotalCostToGrower: discounted,
    individualCostPerAcre,
    applicationRate,
    rateUnit,
    totalProductNeeded,
    totalProductUnits: packagesNeeded,
    productCostPerOz: costPerUnit,
    totalCostToGrower,
    costPerUnitSeed: productCostPerUnitSeed,
    discountedCostToGrower: discounted,
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
