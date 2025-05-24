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
    if (word.toLowerCase() === "box") return count === 1 ? "Box" : "Boxes";
    if (word.toLowerCase() === "pouch") return count === 1 ? "Pouch" : "Pouches";
    return count === 1 ? word : `${word}s`;
  };

  const formatProductLabel = (product: ProductData): string => {
    const rate = product["Application Rate"];
    const rateUnit = product["Application Rate Unit"];
    const size = product["Package Size"];
    const units = product["Package Units"];
    const type = product["Package Type"];
    const capacity = rate && size ? Math.floor(size / rate) : 1;
    return `${product["Product Name"]} – ${size} ${units} – ${pluralize(type, capacity)} – ${rate} ${rateUnit} – Treats ${capacity} acres`;
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
      <div>
        <h2 className="text-blue-600 text-2xl font-bold font-[Montserrat] mb-2 dark:text-blue-300">Crop Inputs</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Seed Type</label>
            <select
              value={seedType}
              onChange={(e) => setSeedType(e.target.value)}
              className="w-full border rounded px-3 py-2 text-lg text-black dark:text-white bg-white dark:bg-[#1f2937]"
            >
              <option value="">Select seed type</option>
              {seedTypes.map((seed, index) => (
                <option key={index} value={seed["Seed Type"]}>
                  {seed["Seed Type"]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Total Acres</label>
            <input
              type="number"
              value={acres}
              onChange={(e) => setAcres(e.target.value)}
              className="w-full border rounded px-3 py-2 text-lg text-black dark:text-white bg-white dark:bg-[#1f2937]"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Seeding Rate</label>
            <input
              type="number"
              value={seedingRate}
              onChange={(e) => setSeedingRate(e.target.value)}
              className="w-full border rounded px-3 py-2 text-lg text-black dark:text-white bg-white dark:bg-[#1f2937]"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Rate Unit</label>
            <select
              value={seedingRateUnit}
              onChange={(e) => setSeedingRateUnit(e.target.value)}
              className="w-full border rounded px-3 py-2 text-lg text-black dark:text-white bg-white dark:bg-[#1f2937]"
            >
              <option value="seeds/acre">seeds/acre</option>
              <option value="lbs/acre">lbs/acre</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Seeds Per Pound (Override)</label>
            <input
              type="number"
              value={overrideSeeds}
              onChange={(e) => setOverrideSeeds(e.target.value)}
              className="w-full border rounded px-3 py-2 text-lg text-black dark:text-white bg-white dark:bg-[#1f2937]"
              placeholder="Optional"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Seeds Per Unit (Override)</label>
            <input
              type="number"
              value={seedsPerUnitOverride}
              onChange={(e) => setSeedsPerUnitOverride(e.target.value)}
              className="w-full border rounded px-3 py-2 text-lg text-black dark:text-white bg-white dark:bg-[#1f2937]"
              placeholder="Optional"
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-blue-600 text-2xl font-bold font-[Montserrat] mt-8 mb-2 dark:text-blue-300">Market and ROI Inputs</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Grower Name</label>
            <input
              type="text"
              value={growerName}
              onChange={(e) => setGrowerName(e.target.value)}
              className="w-full border rounded px-3 py-2 text-lg text-black dark:text-white bg-white dark:bg-[#1f2937]"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Dealer/Rep Name</label>
            <input
              type="text"
              value={repName}
              onChange={(e) => setRepName(e.target.value)}
              className="w-full border rounded px-3 py-2 text-lg text-black dark:text-white bg-white dark:bg-[#1f2937]"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Market Price</label>
            <input
              type="number"
              value={marketPrice}
              onChange={(e) => setMarketPrice(e.target.value)}
              className="w-full border rounded px-3 py-2 text-lg text-black dark:text-white bg-white dark:bg-[#1f2937]"
              placeholder="Optional"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Market Price Unit</label>
            <select
              value={marketPriceUnit}
              onChange={(e) => setMarketPriceUnit(e.target.value)}
              className="w-full border rounded px-3 py-2 text-lg text-black dark:text-white bg-white dark:bg-[#1f2937]"
            >
              <option value="$/bu">$/bu</option>
              <option value="$/lb">$/lb</option>
              <option value="$/cwt">$/cwt</option>
              <option value="$/ton">$/ton</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Dealer Discount (%)</label>
            <input
              type="number"
              value={dealerDiscount}
              onChange={(e) => setDealerDiscount(e.target.value)}
              className="w-full border rounded px-3 py-2 text-lg text-black dark:text-white bg-white dark:bg-[#1f2937]"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Grower Discount (%)</label>
            <input
              type="number"
              value={growerDiscount}
              onChange={(e) => setGrowerDiscount(e.target.value)}
              className="w-full border rounded px-3 py-2 text-lg text-black dark:text-white bg-white dark:bg-[#1f2937]"
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-blue-600 text-2xl font-bold font-[Montserrat] mt-8 mb-2 dark:text-blue-300">Product Inputs</h2>
        <div className="grid grid-cols-2 gap-4">
          {renderProductSelector(
            productsSeedTreatment,
            seedProducts,
            setSeedProducts,
            "Seed Treatment Products",
            2,
            ["Liquid ST", "Planter Box"]
          )}
          {renderProductSelector(
            productsInFurrowFoliar,
            foliarProducts,
            setFoliarProducts,
            "In-Furrow / Foliar Products",
            4,
            ["In-Furrow", "Foliar"]
          )}
        </div>
      </div>

      <div className="text-center mt-4">
        <button
          type="button"
          onClick={handleCalculate}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded text-lg"
        >
          Calculate
        </button>
      </div>
    </form>
  );
};

export default CalculatorForm;
