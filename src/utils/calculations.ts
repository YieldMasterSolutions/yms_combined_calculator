
// src/utils/calculations.ts

export interface Product {
  "Product Name": string;
  "Package Size": number;
  "Package Units": string;
  "Product Packaging": string;
  "Product Cost per Package": string;
  "Product Cost per fl oz"?: string;
  "Product Cost per oz"?: string;
  "Product Cost per gram"?: string;
  "Application Rate in Fluid Ounces"?: number;
  "Application Rate in Ounces"?: number;
  "Application Rate in Grams"?: number;
  _override?: number;
}

export interface SeedType {
  "Seed Type": string;
  "Seeds/lb": string;
  "Seeds/Unit": string;
  "Lbs/Unit": number;
}

export interface ProductCalculation {
  productName: string;
  packagesNeeded: number;
  productPackageString: string;
  originalTotalCostToGrower: number;
  discountedTotalCostToGrower: number;
  individualCostPerAcre: number;
  applicationRate?: number;
  costPerUnit?: number;
  totalProductNeeded?: number;
  seedsPerUnit?: number;
  totalSeeds?: number;
  totalSeedWeight?: number;
  totalUnits?: number;
  costPerUnitOfSeed?: number;
}

// ✅ Utility function
function parsePrice(value: string | undefined): number {
  return value ? parseFloat(value.replace(/[^\d.-]/g, "")) : 0;
}

// ✅ SEED TREATMENT CALCULATIONS
export function calculateSeedTreatmentData(
  acres: number,
  seedingRate: number,
  seedingRateUnit: string,
  seedType: SeedType,
  overrideSeedsPerLb: number | undefined,
  product: Product,
  dealerDiscount: number = 0,
  growerDiscount: number = 0,
  rateOverride?: number
): ProductCalculation {
  const crop = seedType["Seed Type"].toLowerCase();
  const seedsPerLb = overrideSeedsPerLb || parseFloat(seedType["Seeds/lb"]);
  const lbsPerUnit = seedType["Lbs/Unit"];

  let seedsPerUnit: number =
    crop === "corn" ? 80000 :
    crop === "soybeans" ? 140000 :
    seedsPerLb * lbsPerUnit;

  let totalSeeds = 0;
  let totalSeedWeight = 0;
  let totalUnits = 0;

  switch (seedingRateUnit) {
    case "seeds/acre":
      totalSeeds = seedingRate * acres;
      totalSeedWeight = totalSeeds / seedsPerLb;
      totalUnits = totalSeeds / seedsPerUnit;
      break;
    case "lbs/acre":
      totalSeedWeight = seedingRate * acres;
      totalSeeds = totalSeedWeight * seedsPerLb;
      totalUnits = totalSeedWeight / lbsPerUnit;
      break;
    case "bu/acre":
      const lbsPerBushel = 60;
      totalSeedWeight = seedingRate * acres * lbsPerBushel;
      totalSeeds = totalSeedWeight * seedsPerLb;
      totalUnits = totalSeedWeight / lbsPerUnit;
      break;
  }

  const applicationRate = rateOverride ?? (product["Application Rate in Ounces"] || 0);
  const totalProductNeeded = applicationRate * totalUnits;
  const costPerUnit = parsePrice(product["Product Cost per oz"]);
  const packageSize = product["Package Size"];
  const costPerPackage = parsePrice(product["Product Cost per Package"]);
  const packagesNeeded = Math.ceil(totalProductNeeded / packageSize);
  const discountFactor = 1 - (dealerDiscount + growerDiscount) / 100;
  const discountedCostPerOunce = costPerUnit * discountFactor;

  const originalTotalCostToGrower = packagesNeeded * costPerPackage;
  const discountedTotalCostToGrower = originalTotalCostToGrower * discountFactor;

  const costPerUnitOfSeed = (totalProductNeeded * discountedCostPerOunce) / totalUnits;
  const individualCostPerAcre = (totalProductNeeded * discountedCostPerOunce) / acres;

  return {
    productName: product["Product Name"],
    packagesNeeded,
    productPackageString: `${packageSize} ${product["Package Units"] || "units"} - ${product["Product Packaging"] || ""}`,
    originalTotalCostToGrower,
    discountedTotalCostToGrower,
    individualCostPerAcre,
    applicationRate,
    costPerUnit,
    totalProductNeeded,
    seedsPerUnit: Math.round(seedsPerUnit),
    totalSeeds: Math.round(totalSeeds),
    totalSeedWeight: Math.round(totalSeedWeight),
    totalUnits: Math.round(totalUnits),
    costPerUnitOfSeed,
  };
}

// ✅ IN-FURROW / FOLIAR PRODUCT CALCULATIONS
export function calculateProductData(
  acres: number,
  product: Product,
  dealerDiscount: number = 0,
  growerDiscount: number = 0
): ProductCalculation {
  const applicationRate =
    product._override ??
    product["Application Rate in Fluid Ounces"] ??
    product["Application Rate in Ounces"] ??
    product["Application Rate in Grams"] ?? 0;

  const costPerUnit =
    parsePrice(product["Product Cost per fl oz"]) ||
    parsePrice(product["Product Cost per oz"]) ||
    parsePrice(product["Product Cost per gram"]) || 0;

  const totalProductNeeded = applicationRate * acres;
  const packageSize = product["Package Size"];
  const costPerPackage = parsePrice(product["Product Cost per Package"]);
  const packagesNeeded = Math.ceil(totalProductNeeded / packageSize);
  const discountFactor = 1 - (dealerDiscount + growerDiscount) / 100;

  const originalTotalCostToGrower = packagesNeeded * costPerPackage;
  const discountedTotalCostToGrower = originalTotalCostToGrower * discountFactor;
  const discountedIndividualCostPerAcre = totalProductNeeded * costPerUnit * discountFactor / acres;

  return {
    productName: product["Product Name"],
    packagesNeeded,
    productPackageString: `${packageSize} ${product["Package Units"] || "units"} - ${product["Product Packaging"] || ""}`,
    originalTotalCostToGrower,
    discountedTotalCostToGrower,
    individualCostPerAcre: discountedIndividualCostPerAcre,
    applicationRate,
    costPerUnit,
    totalProductNeeded,
  };
}

// ✅ MULTI-PRODUCT COSTS SUMMARY
export function calculateAllFoliarProductCosts(
  acres: number,
  selectedProducts: Product[],
  dealerDiscount: number = 0,
  growerDiscount: number = 0
): {
  productsData: ProductCalculation[];
  totalCostPerAcre: number;
  totalUndiscountedCost: number;
  totalDiscountedCost: number;
} {
  const productsData = selectedProducts.map((product) =>
    calculateProductData(acres, product, dealerDiscount, growerDiscount)
  );

  const totalCostPerAcre = productsData.reduce((sum, p) => sum + p.individualCostPerAcre, 0);
  const totalUndiscountedCost = productsData.reduce((sum, p) => sum + p.originalTotalCostToGrower, 0);
  const totalDiscountedCost = productsData.reduce((sum, p) => sum + p.discountedTotalCostToGrower, 0);

  return { productsData, totalCostPerAcre, totalUndiscountedCost, totalDiscountedCost };
}

// ✅ Utility functions
export function getCalculatedSeedsPerUnit(seedType: SeedType, overrideSeedsPerLb?: number): number {
  const crop = seedType["Seed Type"].toLowerCase();
  const seedsPerLb = overrideSeedsPerLb || parseFloat(seedType["Seeds/lb"]);
  const lbsPerUnit = seedType["Lbs/Unit"];

  if (crop === "corn") return 80000;
  if (crop === "soybeans") return 140000;

  return seedsPerLb * lbsPerUnit;
}

export function getDefaultSeedsPerUnit(seedType: SeedType): number {
  const seedsPerLb = parseFloat(seedType["Seeds/lb"]);
  const lbsPerUnit = seedType["Lbs/Unit"];
  return seedsPerLb * lbsPerUnit;
}
