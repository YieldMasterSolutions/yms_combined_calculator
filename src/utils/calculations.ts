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
  // 🔢 Get seed parameters
  const seedsPerLb = overrideSeedsPerLb || parseFloat(seedType["Seeds/lb"]);
  const seedsPerUnit = parseFloat(seedType["Seeds/Unit"]);
  const lbsPerUnit = seedType["Lbs/Unit"];

  // 🧮 Derived quantities
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

  // 🧪 Application rate for seed treatment
  const applicationRate = product["Application Rate in Ounces"] || 0;
  const totalProductNeeded = applicationRate * totalUnits;

  // 💵 Cost per ounce (remove $ and commas)
  const costPerUnit = product["Product Cost per oz"]
    ? parseFloat(product["Product Cost per oz"].replace(/[^\d.-]/g, ""))
    : 0;

  const packageSize = product["Package Size"];
  const costPerPackage = parseFloat(product["Product Cost per Package"].replace(/[^\d.-]/g, ""));

  const packagesNeeded = Math.ceil(totalProductNeeded / packageSize);
  const originalTotalCostToGrower = packagesNeeded * costPerPackage;

  // 💸 Discounts
  const discountFactor = 1 - (dealerDiscount + growerDiscount) / 100;
  const discountedTotalCostToGrower = originalTotalCostToGrower * discountFactor;

  const productCostPerAcre = (totalProductNeeded / acres) * costPerUnit;
  const costPerUnitOfSeed = discountedTotalCostToGrower / totalUnits;

  const productPackageString = `${packageSize} ${product["Package Units"]} - ${product["Product Packaging"]}`;

  return {
    productName: product["Product Name"],
    packagesNeeded,
    productPackageString,
    originalTotalCostToGrower,
    discountedTotalCostToGrower,
    individualCostPerAcre: productCostPerAcre,
    applicationRate,
    costPerUnit,
    totalProductNeeded,
    seedsPerUnit,
    totalSeeds: Math.round(totalSeeds),
    totalSeedWeight: Math.round(totalSeedWeight),
    totalUnits: Math.round(totalUnits),
    costPerUnitOfSeed,
  };
}
