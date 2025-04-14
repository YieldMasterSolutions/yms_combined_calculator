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
  "Application Rate in Grams"?: number;
  "Application Rate in Ounces"?: number;
}

export interface ProductCalculation {
  productName: string;
  packagesNeeded: number;
  productPackageString: string;
  originalTotalCostToGrower: number;
  discountedTotalCostToGrower: number;
  individualCostPerAcre: number; // discounted cost per acre
}

export interface FullCalculationResult {
  productsData: ProductCalculation[];
  totalCostPerAcre: number;
  totalUndiscountedCost: number;
  totalDiscountedCost: number;
  breakevenYield: number | null;
  roi2: number | null;
  roi3: number | null;
  roi4: number | null;
  roi5: number | null;
}

export function calculateProductData(
  acres: number,
  product: Product,
  dealerDiscount: number = 0,
  growerDiscount: number = 0
): ProductCalculation {
  let applicationRate: number | undefined;
  let costPerUnit: number | undefined;

  // Determine application rate
  if (product["Application Rate in Fluid Ounces"]) {
    applicationRate = product["Application Rate in Fluid Ounces"];
    costPerUnit = parseFloat(
      (product["Product Cost per fl oz"] || product["Product Cost per oz"] || "0").replace(/[^\d.-]/g, "")
    );
  } else if (product["Application Rate in Ounces"]) {
    applicationRate = product["Application Rate in Ounces"];
    costPerUnit = parseFloat(
      (product["Product Cost per oz"] || "0").replace(/[^\d.-]/g, "")
    );
  } else if (product["Application Rate in Grams"]) {
    applicationRate = product["Application Rate in Grams"];
    costPerUnit = parseFloat(
      (product["Product Cost per gram"] || "0").replace(/[^\d.-]/g, "")
    );
  }

  const packageSize = product["Package Size"];
  const costPerPackage = parseFloat(product["Product Cost per Package"].replace(/[^\d.-]/g, ""));
  const requiredTotal = acres * (applicationRate || 0);
  const packagesNeeded = Math.ceil(requiredTotal / packageSize);
  const originalTotalCostToGrower = packagesNeeded * costPerPackage;

  const discountFactor = 1 - ((dealerDiscount + growerDiscount) / 100);
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

export function calculateProductCosts(
  acres: number,
  selectedProducts: Product[],
  dealerDiscount: number = 0,
  growerDiscount: number = 0,
  cropPrice?: number
): FullCalculationResult {
  const productsData = selectedProducts.map(product =>
    calculateProductData(acres, product, dealerDiscount, growerDiscount)
  );

  const totalCostPerAcre = productsData.reduce((sum, p) => sum + p.individualCostPerAcre, 0);
  const totalUndiscountedCost = productsData.reduce((sum, p) => sum + p.originalTotalCostToGrower, 0);
  const totalDiscountedCost = productsData.reduce((sum, p) => sum + p.discountedTotalCostToGrower, 0);

  let breakevenYield: number | null = null;
  let roi2: number | null = null;
  let roi3: number | null = null;
  let roi4: number | null = null;
  let roi5: number | null = null;

  if (cropPrice && cropPrice > 0 && totalCostPerAcre > 0) {
    breakevenYield = totalCostPerAcre / cropPrice;
    roi2 = (2 * totalCostPerAcre) / cropPrice;
    roi3 = (3 * totalCostPerAcre) / cropPrice;
    roi4 = (4 * totalCostPerAcre) / cropPrice;
    roi5 = (5 * totalCostPerAcre) / cropPrice;
  }

  return {
    productsData,
    totalCostPerAcre,
    totalUndiscountedCost,
    totalDiscountedCost,
    breakevenYield,
    roi2,
    roi3,
    roi4,
    roi5,
  };
}
