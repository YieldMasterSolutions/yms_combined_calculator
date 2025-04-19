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

  const seedsPerUnit =
    crop === "corn"
      ? 80000
      : crop === "soybeans"
      ? 140000
      : seedsPerLb * lbsPerUnit;

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

  const applicationRate = (rateOverride ?? product["Application Rate in Ounces"]) || 0;
  const totalProductNeeded = applicationRate * totalUnits;

  const costPerUnit = product["Product Cost per oz"]
    ? parseFloat(product["Product Cost per oz"].replace(/[^\d.-]/g, ""))
    : 0;

  const packageSize = product["Package Size"];
  const costPerPackage = parseFloat(product["Product Cost per Package"].replace(/[^\d.-]/g, ""));
  const packagesNeeded = Math.ceil(totalProductNeeded / packageSize);

  const discountFactor = 1 - (dealerDiscount + growerDiscount) / 100;
  const discountedCostPerOunce = costPerUnit * discountFactor;

  const originalTotalCostToGrower = packagesNeeded * costPerPackage;
  const discountedTotalCostToGrower = originalTotalCostToGrower * discountFactor;

  const costPerUnitOfSeed = (totalProductNeeded * discountedCostPerOunce) / totalUnits;
  const individualCostPerAcre = (totalProductNeeded * discountedCostPerOunce) / acres;

  const productPackageString = `${packageSize} ${product["Package Units"]} - ${product["Product Packaging"]}`;

  return {
    productName: product["Product Name"],
    packagesNeeded,
    productPackageString,
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
    product["Application Rate in Grams"] ??
    0;

  const costPerUnit =
    parseFloat(
      product["Product Cost per fl oz"]?.replace(/[^\d.-]/g, "") ||
      product["Product Cost per oz"]?.replace(/[^\d.-]/g, "") ||
      product["Product Cost per gram"]?.replace(/[^\d.-]/g, "") ||
      "0"
    );

  const totalProductNeeded = applicationRate * acres;
  const packageSize = product["Package Size"];
  const costPerPackage = parseFloat(product["Product Cost per Package"].replace(/[^\d.-]/g, ""));
  const packagesNeeded = Math.ceil(totalProductNeeded / packageSize);

  const discountFactor = 1 - (dealerDiscount + growerDiscount) / 100;

  const originalTotalCostToGrower = packagesNeeded * costPerPackage;
  const discountedTotalCostToGrower = originalTotalCostToGrower * discountFactor;

  const individualCostPerAcre = applicationRate * costPerUnit * discountFactor;

  const productPackageString = `${packageSize} ${product["Package Units"]} - ${product["Product Packaging"]}`;

  return {
    productName: product["Product Name"],
    packagesNeeded,
    productPackageString,
    originalTotalCostToGrower,
    discountedTotalCostToGrower,
    individualCostPerAcre,
    applicationRate,
    costPerUnit,
    totalProductNeeded,
  };
}

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

export function calculateTotalProgramCost(
  seedResults: ProductCalculation[],
  foliarResults: ProductCalculation[]
): number {
  const seedCost = seedResults.reduce((sum, s) => sum + (s.discountedTotalCostToGrower || 0), 0);
  const foliarCost = foliarResults.reduce((sum, f) => sum + (f.discountedTotalCostToGrower || 0), 0);
  return seedCost + foliarCost;
}

export function calculateROI(totalCost: number, marketPrice: number) {
  const breakeven = totalCost / marketPrice;
  return {
    breakeven,
    twoToOne: (2 * totalCost) / marketPrice,
    threeToOne: (3 * totalCost) / marketPrice,
    fourToOne: (4 * totalCost) / marketPrice,
    fiveToOne: (5 * totalCost) / marketPrice,
  };
}

export function getDefaultSeedsPerUnit(seedType: SeedType): number {
  const crop = seedType["Seed Type"].toLowerCase();
  if (crop === "corn") return 80000;
  if (crop === "soybeans") return 140000;

  const seedsPerLb = parseFloat(seedType["Seeds/lb"]);
  const lbsPerUnit = seedType["Lbs/Unit"];
  return seedsPerLb * lbsPerUnit;
}
