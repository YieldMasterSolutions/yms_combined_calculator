// src/utils/data.ts

export interface ProductData {
  "Product Name": string;
  "Product Form"?: "Liquid" | "Dry";
  "Application Method"?: string;
  "Application Rate"?: number;
  "Product Cost per fl oz"?: number;
  "Product Cost per oz"?: number;
  "Product Cost per gram"?: number;
  "Package Size": number;
  "Package Units": string;
  "Package Type": string;
  "Application Rate Unit"?: "oz/unit" | "fl oz/unit" | "fl oz/acre" | "oz/acre" | "g/acre";
}

export interface SeedType {
  "Seed Type": string;
  "Seeds/lb": string;
  "Lbs/Unit": number;
  "Seeds per Unit"?: number;
}

export interface FormData {
  seedType: string;
  acres: number;
  seedingRate: number;
  rateUnit: string;
  dealerDiscount: number;
  growerDiscount: number;
  marketPrice?: number;
  cropPriceUnit?: string;
  seedsPerPoundOverride: number;
  lbsPerUnit: number;
  seedTreatmentProducts: { product: ProductData; applicationMethod: string }[];
  inFurrowFoliarProducts: { product: ProductData; applicationMethod: string }[];
  growerName?: string;
  repName?: string;
}

export const seedTypes: SeedType[] = [
  { "Seed Type": "Alfalfa", "Seeds/lb": "210000", "Lbs/Unit": 50, "Seeds per Unit": 10500000 },
  { "Seed Type": "Barley", "Seeds/lb": "14500", "Lbs/Unit": 50, "Seeds per Unit": 725000 },
  { "Seed Type": "Canola", "Seeds/lb": "130000", "Lbs/Unit": 50, "Seeds per Unit": 6500000 },
  { "Seed Type": "Corn", "Seeds/lb": "1778", "Lbs/Unit": 45, "Seeds per Unit": 80000 },
  { "Seed Type": "Flax", "Seeds/lb": "85000", "Lbs/Unit": 50, "Seeds per Unit": 4250000 },
  { "Seed Type": "Lentils", "Seeds/lb": "16500", "Lbs/Unit": 50, "Seeds per Unit": 825000 },
  { "Seed Type": "Peas", "Seeds/lb": "4000", "Lbs/Unit": 50, "Seeds per Unit": 200000 },
  { "Seed Type": "Potatoes", "Seeds/lb": "6", "Lbs/Unit": 50, "Seeds per Unit": 300 },
  { "Seed Type": "Edible Beans", "Seeds/lb": "1250", "Lbs/Unit": 50, "Seeds per Unit": 62500 },
  { "Seed Type": "Sorghum", "Seeds/lb": "15500", "Lbs/Unit": 50, "Seeds per Unit": 775000 },
  { "Seed Type": "Soybeans", "Seeds/lb": "2800", "Lbs/Unit": 50, "Seeds per Unit": 140000 },
  { "Seed Type": "Sugarbeets", "Seeds/lb": "2000", "Lbs/Unit": 50, "Seeds per Unit": 100000 },
  { "Seed Type": "Sunflower", "Seeds/lb": "6500", "Lbs/Unit": 50, "Seeds per Unit": 325000 },
  { "Seed Type": "Peanuts (Medium)", "Seeds/lb": "650", "Lbs/Unit": 50, "Seeds per Unit": 32500 },
  { "Seed Type": "Peanuts (Small)", "Seeds/lb": "1100", "Lbs/Unit": 50, "Seeds per Unit": 55000 },
  { "Seed Type": "Wheat", "Seeds/lb": "18000", "Lbs/Unit": 50, "Seeds per Unit": 900000 }
];

export const productsSeedTreatment: ProductData[] = [
  {
    "Product Name": "Soyfx ST",
    "Package Size": 120,
    "Package Units": "fl oz",
    "Package Type": "Jugs",
    "Product Cost per fl oz": 9.16,
    "Application Rate": 1,
    "Application Method": "Seed Coating",
    "Product Form": "Liquid",
    "Application Rate Unit": "fl oz/unit"
  },
  {
    "Product Name": "OmniSync",
    "Package Size": 320,
    "Package Units": "oz",
    "Package Type": "Pails",
    "Product Cost per oz": 2.98,
    "Application Rate": 2,
    "Application Method": "Planter Box Treatment",
    "Product Form": "Dry",
    "Application Rate Unit": "oz/unit"
  },
  {
    "Product Name": "Nutriquire + Terrasym 450 Corn",
    "Package Size": 12.5,
    "Package Units": "oz",
    "Package Type": "Pouches",
    "Product Cost per oz": 70.56,
    "Application Rate": 0.5,
    "Application Method": "Planter Box Treatment",
    "Product Form": "Dry",
    "Application Rate Unit": "oz/unit"
  },
  {
    "Product Name": "Nutriquire + Terrasym 401 Soybean",
    "Package Size": 20,
    "Package Units": "oz",
    "Package Type": "Pouches",
    "Product Cost per oz": 29.90,
    "Application Rate": 0.5,
    "Application Method": "Planter Box Treatment",
    "Product Form": "Dry",
    "Application Rate Unit": "oz/unit"
  },
  {
    "Product Name": "Terrasym 450 + DUST + TS201",
    "Package Size": 25,
    "Package Units": "oz",
    "Package Type": "Pouches",
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
    "Package Type": "Jugs",
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
    "Package Type": "Jugs",
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
    "Package Type": "Boxes",
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
    "Package Type": "Boxes",
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
    "Package Type": "Jugs",
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
    "Package Type": "Jugs",
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
    "Package Type": "Totes",
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
    "Package Type": "Jugs",
    "Application Method": "In-Furrow or Foliar",
    "Product Form": "Liquid",
    "Application Rate Unit": "fl oz/acre"
  }
];
