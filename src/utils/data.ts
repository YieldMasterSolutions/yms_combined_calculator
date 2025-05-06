// src/utils/data.ts

export type ProductData = {
  "Product Name": string;
  "Package Size": number;
  "Package Units": string;
  "Product Packaging": string;
  "Product Cost per Package": string;
  "Product Cost per oz": string;
  "Application Rate in Ounces"?: number;
  "Application Rate in Grams"?: number;
};

export type SeedType = {
  "Seed Type": string;
  "Seeds/lb": string;
  "Seeds/Unit": string;
  "Lbs/Unit": number;
};

export const seedTypes: SeedType[] = [
  { "Seed Type": "Alfalfa", "Seeds/lb": "210000", "Seeds/Unit": "10500000", "Lbs/Unit": 50 },
  { "Seed Type": "Barley", "Seeds/lb": "14500", "Seeds/Unit": "725000", "Lbs/Unit": 50 },
  { "Seed Type": "Canola", "Seeds/lb": "130000", "Seeds/Unit": "6500000", "Lbs/Unit": 50 },
  { "Seed Type": "Corn", "Seeds/lb": "1778", "Seeds/Unit": "80000", "Lbs/Unit": 45 },
  { "Seed Type": "Flax", "Seeds/lb": "85000", "Seeds/Unit": "4250000", "Lbs/Unit": 50 },
  { "Seed Type": "Lentils", "Seeds/lb": "16500", "Seeds/Unit": "825000", "Lbs/Unit": 50 },
  { "Seed Type": "Peas", "Seeds/lb": "4000", "Seeds/Unit": "200000", "Lbs/Unit": 50 },
  { "Seed Type": "Sorghum", "Seeds/lb": "15500", "Seeds/Unit": "775000", "Lbs/Unit": 50 },
  { "Seed Type": "Soybeans", "Seeds/lb": "2800", "Seeds/Unit": "140000", "Lbs/Unit": 50 },
  { "Seed Type": "Sugarbeets", "Seeds/lb": "2000", "Seeds/Unit": "100000", "Lbs/Unit": 50 },
  { "Seed Type": "Sunflower", "Seeds/lb": "6500", "Seeds/Unit": "325000", "Lbs/Unit": 50 },
  { "Seed Type": "Peanuts (Medium)", "Seeds/lb": "650", "Seeds/Unit": "32500", "Lbs/Unit": 50 },
  { "Seed Type": "Peanuts (Small)", "Seeds/lb": "1100", "Seeds/Unit": "55000", "Lbs/Unit": 50 },
  { "Seed Type": "Wheat", "Seeds/lb": "18000", "Seeds/Unit": "900000", "Lbs/Unit": 50 }
];

export const productsSeedTreatment: ProductData[] = [
  {
    "Product Name": "Soyfx ST",
    "Package Size": 120,
    "Package Units": "fl oz",
    "Product Packaging": "Jug",
    "Product Cost per oz": "$9.16",
    "Product Cost per Package": "$1,099.20",
    "Application Rate in Ounces": 1
  },
  {
    "Product Name": "OmniSync",
    "Package Size": 320,
    "Package Units": "oz",
    "Product Packaging": "Pail",
    "Product Cost per oz": "$2.98",
    "Product Cost per Package": "$952.00",
    "Application Rate in Ounces": 2
  },
  {
    "Product Name": "Nutriquire + Terrasym450 Corn",
    "Package Size": 12.5,
    "Package Units": "oz",
    "Product Packaging": "Pouch",
    "Product Cost per oz": "$70.56",
    "Product Cost per Package": "$882.00",
    "Application Rate in Ounces": 0.5
  },
  {
    "Product Name": "Nutriquire + Terrasym401 Soybean",
    "Package Size": 20,
    "Package Units": "oz",
    "Product Packaging": "Pouch",
    "Product Cost per oz": "$70.56",
    "Product Cost per Package": "$1411.20",
    "Application Rate in Ounces": 0.5
  },
  {
    "Product Name": "Terrasym 450+DUST+TS201",
    "Package Size": 25,
    "Package Units": "oz",
    "Product Packaging": "Pouch",
    "Product Cost per oz": "$69.60",
    "Product Cost per Package": "$1740.00",
    "Application Rate in Ounces": 0.5
  }
];

export const productsInFurrowFoliar: ProductData[] = [
  {
    "Product Name": "Soyfx SC",
    "Package Size": 320,
    "Package Units": "fl oz",
    "Product Packaging": "Jug",
    "Product Cost per Package": "$240.60",
    "Product Cost per oz": "$0.75",
    "Application Rate in Ounces": 16
  },
  {
    "Product Name": "Podfx SC",
    "Package Size": 320,
    "Package Units": "fl oz",
    "Product Packaging": "Jug",
    "Product Cost per Package": "$240.60",
    "Product Cost per oz": "$0.75",
    "Application Rate in Ounces": 16
  },
  {
    "Product Name": "N-Physis WG",
    "Package Size": 200,
    "Package Units": "grams",
    "Product Packaging": "Box",
    "Product Cost per Package": "$598.00",
    "Product Cost per oz": "$2.99",
    "Application Rate in Grams": 5
  },
  {
    "Product Name": "Envita SC",
    "Package Size": 32,
    "Package Units": "fl oz",
    "Product Packaging": "Jug",
    "Product Cost per Package": "$598.00",
    "Product Cost per oz": "$18.69",
    "Application Rate in Ounces": 0.8
  },
  {
    "Product Name": "Nutriquire Liquid",
    "Package Size": 320,
    "Package Units": "fl oz",
    "Product Packaging": "Jug",
    "Product Cost per Package": "$139.50",
    "Product Cost per oz": "$0.44",
    "Application Rate in Ounces": 32
  },
  {
    "Product Name": "Nutriquire Liquid Tote",
    "Package Size": 35200,
    "Package Units": "fl oz",
    "Product Packaging": "Tote",
    "Product Cost per Package": "$15,345.00",
    "Product Cost per oz": "$0.44",
    "Application Rate in Ounces": 32
  },
  {
    "Product Name": "NueNutri Liquid",
    "Package Size": 320,
    "Package Units": "fl oz",
    "Product Packaging": "Jug",
    "Product Cost per Package": "$107.50",
    "Product Cost per oz": "$0.34",
    "Application Rate in Ounces": 32
  }
];
