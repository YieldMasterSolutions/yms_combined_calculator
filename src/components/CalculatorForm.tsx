/* eslint-disable @typescript-eslint/no-unused-vars */

// src/components/CalculatorForm.tsx

import React from "react";
import {
  ProductData,
  productsSeedTreatment,
  productsInFurrowFoliar,
  seedTypes,
} from "../utils/data";

interface CalculatorFormProps {
  seedType: string;
  setSeedType: (value: string) => void;
  acres: string;
  setAcres: (value: string) => void;
  seedingRate: string;
  setSeedingRate: (value: string) => void;
  seedingRateUnit: string;
  setSeedingRateUnit: (value: string) => void;
  overrideSeeds: string;
  setOverrideSeeds: (value: string) => void;
  seedsPerUnitOverride: string;
  setSeedsPerUnitOverride: (value: string) => void;
  marketPrice: string;
  setMarketPrice: (value: string) => void;
  marketPriceUnit: string;
  setMarketPriceUnit: (value: string) => void;
  dealerDiscount: string;
  setDealerDiscount: (value: string) => void;
  growerDiscount: string;
  setGrowerDiscount: (value: string) => void;
  growerName: string;
  setGrowerName: (value: string) => void;
  repName: string;
  setRepName: (value: string) => void;
  seedProducts: (ProductData | null)[];
  setSeedProducts: (products: (ProductData | null)[]) => void;
  foliarProducts: (ProductData | null)[];
  setFoliarProducts: (products: (ProductData | null)[]) => void;
  handleCalculate: () => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  seedType,
  setSeedType,
  acres,
  setAcres,
  seedingRate,
  setSeedingRate,
  seedingRateUnit,
  setSeedingRateUnit,
  overrideSeeds,
  setOverrideSeeds,
  seedsPerUnitOverride,
  setSeedsPerUnitOverride,
  marketPrice,
  setMarketPrice,
  marketPriceUnit,
  setMarketPriceUnit,
  dealerDiscount,
  setDealerDiscount,
  growerDiscount,
  setGrowerDiscount,
  growerName,
  setGrowerName,
  repName,
  setRepName,
  seedProducts,
  setSeedProducts,
  foliarProducts,
  setFoliarProducts,
  handleCalculate,
}) => {
  const pluralize = (word: string, count: number) => {
    const lower = word.toLowerCase();
    if (count === 1) return word;
    switch (lower) {
      case "box": return "Boxes";
      case "pouch": return "Pouches";
      case "pail": return "Pails";
      case "jug": return "Jugs";
      case "case": return "Cases";
      case "unit": return "Units";
      case "package": return "Packages";
      default: return `${word}s`;
    }
  };

  const formatProductLabel = (product: ProductData): string => {
    const rate = product["Application Rate"];
    const rateUnit = product["Application Rate Unit"];
    const size = product["Package Size"];
    const units = product["Package Units"];
    const type = product["Package Type"];
    const method = product["Application Method"];
    const capacity = rate && size ? Math.floor(size / rate) : 1;
    const capacityLabel = method === "Planter Box" || rateUnit?.includes("unit") ? `${capacity} units` : `${capacity} acres`;
    return `${product["Product Name"]} – ${size} ${units} – ${pluralize(type, capacity)} – ${rate} ${rateUnit} – Treats ${capacityLabel}`;
  };

  const renderProductSelector = (
    productList: ProductData[],
    products: (ProductData | null)[],
    setProducts: (p: (ProductData | null)[]) => void,
    title: string,
    count: number,
    methodOptions: string[]
  ) => (
    <div>
      <h3 className="font-semibold mt-2 mb-1 text-blue-600 text-xl font-[Montserrat] dark:text-blue-300">{title}</h3>
      {[...Array(count)].map((_, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <select
            value={products[index] ? formatProductLabel(products[index]!) : ""}
            onChange={(e) => {
              const selected = productList.find(
                (p) => formatProductLabel(p) === e.target.value
              );
              const updated = [...products];
              updated[index] = selected ? { ...selected, "Application Method": products[index]?.["Application Method"] || methodOptions[0] } : null;
              setProducts(updated);
            }}
            className="w-3/4 border rounded px-3 py-2 text-lg text-black dark:text-white bg-white dark:bg-[#1f2937]"
          >
            <option value="">Select a product</option>
            {productList.map((product, i) => (
              <option key={i} value={formatProductLabel(product)}>
                {formatProductLabel(product)}
              </option>
            ))}
          </select>
          <select
            value={products[index]?.["Application Method"] || methodOptions[0]}
            onChange={(e) => {
              const updated = [...products];
              if (updated[index]) {
                updated[index]!["Application Method"] = e.target.value;
                setProducts(updated);
              }
            }}
            className="w-1/4 border rounded px-3 py-2 text-lg text-black dark:text-white bg-white dark:bg-[#1f2937]"
          >
            {methodOptions.map((opt, idx) => (
              <option key={idx} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );

  return (
    <form className="grid gap-8 text-[1.15rem]">
      {/* rest of form unchanged */}
    </form>
  );
};

export default CalculatorForm;
