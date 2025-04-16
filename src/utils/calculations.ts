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

// ✅ SEED TREATMENT CALCULATIONS
export function calculateSeedTreatmentData(
  acres: number,
  seedingRate: number,
  seedingRateUnit: string,
  seedType: SeedType,
  overrideSeedsPerLb: number | undefined,
  product: Product,
  dealerDiscount: number = 0,
  growerDiscount: number = 0
): ProductCalculation {
  const isCorn = seedType["Seed Type"].toLowerCase() === "corn";
  const isSoybean = seedType["Seed Type"].toLowerCase() === "soybeans";

  const seedsPerLb = overrideSeedsPerLb || parseFloat(seedType["Seeds/lb"]);
  const lbsPerUnit = seedType["Lbs/Unit"];

  const calculatedSeedsPerUnit = seedsPerLb / lbsPerUnit;
  const seedsPerUnit = isCorn ? 80000 : isSoybean ? 140000 : calculatedSeedsPerUnit;

  let totalSeeds = 0;
  let totalSeedWeight = 0;
  let totalUnits = 0;

  switch (seedingRateUnit) {
    case "seeds/acre":
      totalSeeds = seedingRate * acres;
      totalSeedWeight = totalSeeds / seedsPerLb;
      totalUnits = isCorn || isSoybean
        ? totalSeeds / seedsPerUnit
        : totalSeedWeight / lbsPerUnit;
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

  const applicationRate = product["Application Rate in Ounces"] || 0;
  const totalProductNeeded = applicationRate * totalUnits;

  const costPerUnit = product["Product Cost per oz"]
    ? parseFloat(product["Product Cost per oz"].replace(/[^\d.-]/g, ""))
    : 0;

  const packageSize = product["Package Size"];
  const costPerPackage = parseFloat(product["Product Cost per Package"].replace(/[^\d.-]/g, ""));
  const packagesNeeded = Math.ceil(totalProductNeeded / packageSize);

  const discountFactor = 1 - (dealerDiscount + growerDiscount) / 100;
  const originalTotalCostToGrower = packagesNeeded * costPerPackage;
  const discountedTotalCostToGrower = originalTotalCostToGrower * discountFactor;

  const costPerUnitOfSeed = discountedTotalCostToGrower / totalUnits;
  const individualCostPerAcre = discountedTotalCostToGrower / acres;

  const packageUnits = product["Package Units"] || "units";
  const productPackaging = product["Product Packaging"] || "";
  const productPackageString = `${packageSize} ${packageUnits} - ${productPackaging}`;

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

// ✅ IN-FURROW / FOLIAR PRODUCT CALCULATIONS
export function calculateProductData(
  acres: number,
  product: Product,
  dealerDiscount: number = 0,
  growerDiscount: number = 0
): ProductCalculation {
  let applicationRate: number | undefined;
  let costPerUnit: number | undefined;

  if (product["Application Rate in Fluid Ounces"]) {
    applicationRate = product["Application Rate in Fluid Ounces"];
    if (product["Product Cost per fl oz"]) {
      costPerUnit = parseFloat(product["Product Cost per fl oz"].replace(/[^\d.-]/g, ""));
    } else if (product["Product Cost per oz"]) {
      costPerUnit = parseFloat(product["Product Cost per oz"].replace(/[^\d.-]/g, ""));
    }
  } else if (product["Application Rate in Grams"]) {
    applicationRate = product["Application Rate in Grams"];
    if (product["Product Cost per gram"]) {
      costPerUnit = parseFloat(product["Product Cost per gram"].replace(/[^\d.-]/g, ""));
    }
  }

  const packageSize = product["Package Size"];
  const costPerPackage = parseFloat(product["Product Cost per Package"].replace(/[^\d.-]/g, ""));

  const requiredTotal = acres * (applicationRate || 0);
  const packagesNeeded = Math.ceil(requiredTotal / packageSize);
  const originalTotalCostToGrower = packagesNeeded * costPerPackage;

  const discountFactor = 1 - (dealerDiscount + growerDiscount) / 100;
  const discountedTotalCostToGrower = originalTotalCostToGrower * discountFactor;

  const originalIndividualCostPerAcre = (applicationRate || 0) * (costPerUnit || 0);
  const discountedIndividualCostPerAcre = originalIndividualCostPerAcre * discountFactor;

  const productPackageString = `${packageSize} ${product["Package Units"]} - ${product["Product Packaging"]}`;

  return {
    productName: product["Product Name"],
    packagesNeeded,
    productPackageString,
    originalTotalCostToGrower,
    discountedTotalCostToGrower,
    individualCostPerAcre: discountedIndividualCostPerAcre,
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
