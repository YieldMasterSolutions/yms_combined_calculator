// src/utils/data.ts

export interface ProductData {
  "Product Name": string;
  "Application Rate": number;
  "Product Cost per fl oz"?: number;
  "Product Cost per oz"?: number;
  "Product Cost per gram"?: number;
  "Package Size": number;
  "Package Units": string;
  "Package Type": string;
  "Application Method"?: string; // e.g., "Seed Treatment", "In-Furrow", etc.
  "Product Form"?: "Liquid" | "Dry";
  "Application Rate Unit"?: "oz/unit" | "fl oz/unit" | "fl oz/acre" | "g/acre";
}

export interface SeedType {
  "Seed Type": string;
  "Seeds/lb": string;
  "Lbs/Unit": number;
}

export interface FoliarProductResult {
  productName: string;
  applicationRate: number;
  totalProductNeeded: number;
  totalProductUnits: number;
  productPackageString: string;
  productCostPerOz: number;
  totalCostToGrower: number;
  totalDiscountedCostToGrower: number;
  individualCostPerAcre: number;
  applicationMethod: string;
}

export const seedTypes: SeedType[] = [
  { "Seed Type": "Alfalfa", "Seeds/lb": "210000", "Lbs/Unit": 50 },
  { "Seed Type": "Barley", "Seeds/lb": "14500", "Lbs/Unit": 50 },
  { "Seed Type": "Canola", "Seeds/lb": "130000", "Lbs/Unit": 50 },
  { "Seed Type": "Corn", "Seeds/lb": "1778", "Lbs/Unit": 45 },
  { "Seed Type": "Flax", "Seeds/lb": "85000", "Lbs/Unit": 50 },
  { "Seed Type": "Lentils", "Seeds/lb": "16500", "Lbs/Unit": 50 },
  { "Seed Type": "Peas", "Seeds/lb": "4000", "Lbs/Unit": 50 },
  { "Seed Type": "Potatoes", "Seeds/lb": "6", "Lbs/Unit": 50 },
  { "Seed Type": "Edible Beans", "Seeds/lb": "1250", "Lbs/Unit": 50 },
  { "Seed Type": "Sorghum", "Seeds/lb": "15500", "Lbs/Unit": 50 },
  { "Seed Type": "Soybeans", "Seeds/lb": "2800", "Lbs/Unit": 50 },
  { "Seed Type": "Sugarbeets", "Seeds/lb": "2000", "Lbs/Unit": 50 },
  { "Seed Type": "Sunflower", "Seeds/lb": "6500", "Lbs/Unit": 50 },
  { "Seed Type": "Peanuts (Medium)", "Seeds/lb": "650", "Lbs/Unit": 50 },
  { "Seed Type": "Peanuts (Small)", "Seeds/lb": "1100", "Lbs/Unit": 50 },
  { "Seed Type": "Wheat", "Seeds/lb": "18000", "Lbs/Unit": 50 }
];

export const productsSeedTreatment: ProductData[] = [
  {
    "Product Name": "Soyfx ST",
    "Package Size": 120,
    "Package Units": "fl oz",
    "Package Type": "Jug",
    "Product Cost per oz": 9.16,
    "Application Rate": 1,
    "Application Method": "Seed Coating",
    "Product Form": "Liquid",
    "Application Rate Unit": "fl oz/unit"
  },
  {
    "Product Name": "OmniSync",
    "Package Size": 320,
    "Package Units": "oz",
    "Package Type": "Pail",
    "Product Cost per oz": 2.98,
    "Application Rate": 2,
    "Application Method": "Planter Box Treatment",
    "Product Form": "Dry",
    "Application Rate Unit": "oz/unit"
  },
  {
    "Product Name": "Nutriquire + Terrasym450 Corn",
    "Package Size": 12.5,
    "Package Units": "oz",
    "Package Type": "Pouch",
    "Product Cost per oz": 70.56,
    "Application Rate": 0.5,
    "Application Method": "Planter Box Treatment",
    "Product Form": "Dry",
    "Application Rate Unit": "oz/unit"
  },
  {
    "Product Name": "Nutriquire + Terrasym401 Soybean",
    "Package Size": 20,
    "Package Units": "oz",
    "Package Type": "Pouch",
    "Product Cost per oz": 70.56,
    "Application Rate": 0.5,
    "Application Method": "Planter Box Treatment",
    "Product Form": "Dry",
    "Application Rate Unit": "oz/unit"
  },
  {
    "Product Name": "Terrasym 450+DUST+TS201 CRW",
    "Package Size": 25,
    "Package Units": "oz",
    "Package Type": "Pouch",
    "Product Cost per oz": 69.60,
    "Application Rate": 0.5,
    "Application Method": "Planter Box Treatment",
    "Product Form": "Dry",
    "Application Rate Unit": "oz/unit"
  }
];

export const productsInFurrowFoliar: ProductData[] = [
  {
    "Product Name": "Soyfx SC",
    "Application Rate": 16,
    "Product Cost per fl oz": 0.75,
    "Package Size": 320,
    "Package Units": "fl oz",
    "Package Type": "Jug",
    "Application Method": "In-Furrow or Foliar",
    "Product Form": "Liquid",
    "Application Rate Unit": "fl oz/acre"
  },
  {
    "Product Name": "Podfx SC",
    "Application Rate": 16,
    "Product Cost per fl oz": 0.75,
    "Package Size": 320,
    "Package Units": "fl oz",
    "Package Type": "Jug",
    "Application Method": "In-Furrow or Foliar",
    "Product Form": "Liquid",
    "Application Rate Unit": "fl oz/acre"
  },
  {
    "Product Name": "N-Physis WG",
    "Application Rate": 5,
    "Product Cost per gram": 2.99,
    "Package Size": 200,
    "Package Units": "grams",
    "Package Type": "Box",
    "Application Method": "In-Furrow or Foliar",
    "Product Form": "Dry",
    "Application Rate Unit": "g/acre"
  },
  {
    "Product Name": "Envita WG",
    "Application Rate": 5,
    "Product Cost per gram": 2.99,
    "Package Size": 200,
    "Package Units": "grams",
    "Package Type": "Box",
    "Application Method": "In-Furrow or Foliar",
    "Product Form": "Dry",
    "Application Rate Unit": "g/acre"
  },
  {
    "Product Name": "Envita SC",
    "Application Rate": 0.8,
    "Product Cost per fl oz": 18.69,
    "Package Size": 32,
    "Package Units": "fl oz",
    "Package Type": "Jug",
    "Application Method": "In-Furrow or Foliar",
    "Product Form": "Liquid",
    "Application Rate Unit": "fl oz/acre"
  },
  {
    "Product Name": "Nutriquire Liquid",
    "Application Rate": 32,
    "Product Cost per fl oz": 0.44,
    "Package Size": 320,
    "Package Units": "fl oz",
    "Package Type": "Jug",
    "Application Method": "In-Furrow or Foliar",
    "Product Form": "Liquid",
    "Application Rate Unit": "fl oz/acre"
  },
  {
    "Product Name": "Nutriquire Liquid Tote",
    "Application Rate": 32,
    "Product Cost per fl oz": 0.44,
    "Package Size": 35200,
    "Package Units": "fl oz",
    "Package Type": "Tote",
    "Application Method": "In-Furrow or Foliar",
    "Product Form": "Liquid",
    "Application Rate Unit": "fl oz/acre"
  },
  {
    "Product Name": "NueNutri Liquid",
    "Application Rate": 32,
    "Product Cost per fl oz": 0.34,
    "Package Size": 320,
    "Package Units": "fl oz",
    "Package Type": "Jug",
    "Application Method": "In-Furrow or Foliar",
    "Product Form": "Liquid",
    "Application Rate Unit": "fl oz/acre"
  }
];
