export interface SeedTreatmentResult {
  productName: string;
  applicationRate: number;
  unit: string;
  totalProductNeeded: number;
  totalProductUnits: number;
  packageSize: number;
  packageUnits: string;
  costPerOz: number;
  totalCostMSRP: number;
  totalCostDiscounted: number;
  costPerUnitSeed: number;
  costPerAcre: number;
  totalSeeds: number;
  totalWeight: number;
  totalUnits: number;
  seedsPerUnit: number;
}

export interface FoliarProductResult {
  productName: string;
  applicationType: string;
  applicationRate: number;
  unit: string;
  totalProductNeeded: number;
  totalProductUnits: number;
  packageSize: number;
  packageUnits: string;
  costPerOz: number;
  totalCostMSRP: number;
  totalCostDiscounted: number;
  costPerAcre: number;
}

export interface ROIResults {
  Breakeven: number;
  "2:1 ROI": number;
  "3:1 ROI": number;
  "4:1 ROI": number;
  "5:1 ROI": number;
}

import { ProductData } from "./data";

export function calculateSeedTreatmentData(
  seedType: string,
  acres: number,
  seedingRate: number,
  rateUnit: string,
  dealerDiscount: number,
  growerDiscount: number,
  seedTreatments: ProductData[],
  seedsPerLb: number,
  lbsPerUnit: number
): SeedTreatmentResult[] {
  const results: SeedTreatmentResult[] = [];

  const totalSeeds =
    rateUnit === "seeds/acre"
      ? seedingRate * acres
      : seedingRate * acres * seedsPerLb;

  const totalWeight =
    rateUnit === "lbs/acre"
      ? seedingRate * acres
      : totalSeeds / seedsPerLb;

  const totalUnits = totalWeight / lbsPerUnit;

  let seedsPerUnit: number = 0;
  if (seedType.toLowerCase() === "corn") {
    seedsPerUnit = 80000;
  } else if (seedType.toLowerCase() === "soybeans") {
    seedsPerUnit = 140000;
  } else {
    seedsPerUnit = seedsPerLb * lbsPerUnit;
  }

  for (const product of seedTreatments) {
    const rate = product["Application Rate in Ounces"] ?? 0;
    const unit = "oz";
    const packageSize = product["Package Size"];
    const packageUnits = product["Package Units"];
    const pricePerOz = parseFloat(product["Product Cost per oz"].replace("$", ""));

    const totalProductNeeded = totalUnits * rate;
    const totalProductUnits = Math.ceil(totalProductNeeded / packageSize);

    const totalCostMSRP = totalProductNeeded * pricePerOz;
    const discountFactor = (1 - dealerDiscount / 100) * (1 - growerDiscount / 100);
    const totalCostDiscounted = totalCostMSRP * discountFactor;

    const costPerUnitSeed = totalProductNeeded * pricePerOz / (totalSeeds || 1);
    const costPerAcre = totalCostDiscounted / acres;

    results.push({
      productName: product["Product Name"],
      applicationRate: rate,
      unit,
      totalProductNeeded,
      totalProductUnits,
      packageSize,
      packageUnits,
      costPerOz: pricePerOz,
      totalCostMSRP,
      totalCostDiscounted,
      costPerUnitSeed,
      costPerAcre,
      totalSeeds,
      totalWeight,
      totalUnits,
      seedsPerUnit,
    });
  }

  return results;
}

export function calculateAllFoliarProductCosts(
  acres: number,
  dealerDiscount: number,
  growerDiscount: number,
  foliarProducts: ProductData[]
): FoliarProductResult[] {
  return foliarProducts.map((product) => {
    const rate = product["Application Rate in Ounces"] ?? 0;
    const unit = "fl oz";
    const totalProductNeeded = acres * rate;
    const packageSize = product["Package Size"];
    const packageUnits = product["Package Units"];
    const totalProductUnits = Math.ceil(totalProductNeeded / packageSize);
    const pricePerOz = parseFloat(product["Product Cost per oz"].replace("$", ""));

    const totalCostMSRP = totalProductNeeded * pricePerOz;
    const discountFactor = (1 - dealerDiscount / 100) * (1 - growerDiscount / 100);
    const totalCostDiscounted = totalCostMSRP * discountFactor;

    const costPerAcre = totalCostDiscounted / acres;

    return {
      productName: product["Product Name"],
      applicationType: product["Product Packaging"],
      applicationRate: rate,
      unit,
      totalProductNeeded,
      totalProductUnits,
      packageSize,
      packageUnits,
      costPerOz: pricePerOz,
      totalCostMSRP,
      totalCostDiscounted,
      costPerAcre,
    };
  });
}

export function calculateProgramCost(
  seedResults: SeedTreatmentResult[],
  foliarResults: FoliarProductResult[]
): number {
  const seedCost = seedResults.reduce((sum, r) => sum + r.costPerAcre, 0);
  const foliarCost = foliarResults.reduce((sum, r) => sum + r.costPerAcre, 0);
  return seedCost + foliarCost;
}

export function calculateROI(
  marketPrice: number,
  programCost: number
): ROIResults {
  if (marketPrice === 0) {
    return {
      Breakeven: 0,
      "2:1 ROI": 0,
      "3:1 ROI": 0,
      "4:1 ROI": 0,
      "5:1 ROI": 0,
    };
  }

  return {
    Breakeven: programCost / marketPrice,
    "2:1 ROI": (2 * programCost) / marketPrice,
    "3:1 ROI": (3 * programCost) / marketPrice,
    "4:1 ROI": (4 * programCost) / marketPrice,
    "5:1 ROI": (5 * programCost) / marketPrice,
  };
}
