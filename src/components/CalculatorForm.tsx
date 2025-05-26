// src/components/CalculatorForm.tsx

import React from "react";
import {
  ProductData,
  productsSeedTreatment,
  productsInFurrowFoliar,
  seedTypes,
} from "../utils/data";

const emptyProduct: ProductData = {
  "Product Name": "",
  "Package Size": 0,
  "Package Units": "",
  "Package Type": "",
  "Application Rate": 0,
  "Application Rate Unit": undefined,
  "Application Method": "",
};

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
  onCalculate: () => void;
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
  onCalculate,
}) => {
  const selectedSeedDefaults = seedTypes.find(
    (s) => s["Seed Type"].toLowerCase() === seedType.toLowerCase()
  );

  const handleSeedProductChange = (index: number, value: string) => {
    const selectedProduct =
      productsSeedTreatment.find((p) => p["Product Name"] === value) || null;
    const updated = [...seedProducts];
    updated[index] = selectedProduct;
    setSeedProducts(updated);
  };

  const handleFoliarProductChange = (index: number, value: string) => {
    const selectedProduct =
      productsInFurrowFoliar.find((p) => p["Product Name"] === value) || null;
    const updated = [...foliarProducts];
    updated[index] = selectedProduct;
    setFoliarProducts(updated);
  };

  const formatProductLabel = (product: ProductData) => {
    const name = product["Product Name"];
    const size = product["Package Size"];
    const units = product["Package Units"];
    const type = product["Package Type"];
    const rate = product["Application Rate"];
    const rateUnit = product["Application Rate Unit"];
    const method = product["Application Method"] || "Seed Treatment";
    const capacity = rate && size ? Math.floor(size / rate) : "-";
    const treatedUnit = rateUnit?.includes("/unit") ? "units" : "acres";
    return `${name} (${method}) – ${size} ${units} ${type} – ${rate} ${rateUnit} – Treats ${capacity} ${treatedUnit}`;
  };

  return (
    <form className="space-y-6 text-[1rem] font-[Open_Sans]">
      <div>
        <h2 className="section-header-blue">Grower & Rep Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Grower Name</label>
            <input
              type="text"
              value={growerName}
              onChange={(e) => setGrowerName(e.target.value)}
              className="border p-2 w-full dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Rep Name</label>
            <input
              type="text"
              value={repName}
              onChange={(e) => setRepName(e.target.value)}
              className="border p-2 w-full dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="section-header-blue">Crop Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Seed Type</label>
            <select
              value={seedType}
              onChange={(e) => setSeedType(e.target.value)}
              className="border p-2 w-full truncate dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select Seed Type</option>
              {seedTypes.map((type) => (
                <option key={type["Seed Type"]} value={type["Seed Type"]}>
                  {type["Seed Type"]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Acres</label>
            <input
              type="text"
              value={acres}
              onChange={(e) => setAcres(e.target.value)}
              className="border p-2 w-full dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Seeding Rate</label>
            <input
              type="text"
              value={seedingRate}
              onChange={(e) => setSeedingRate(e.target.value)}
              className="border p-2 w-full dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Rate Unit</label>
            <select
              value={seedingRateUnit}
              onChange={(e) => setSeedingRateUnit(e.target.value)}
              className="border p-2 w-full dark:bg-gray-800 dark:text-white"
            >
              <option value="seeds/acre">seeds/acre</option>
              <option value="lbs/acre">lbs/acre</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Seeds Per Unit Override <span className="text-gray-500">(Optional)</span></label>
            <input
              type="text"
              value={seedsPerUnitOverride}
              onChange={(e) => setSeedsPerUnitOverride(e.target.value)}
              className="border p-2 w-full dark:bg-gray-800 dark:text-white"
            />
            <small className="text-gray-500">
              Default: {selectedSeedDefaults?.["Seeds/lb"] && selectedSeedDefaults?.["Lbs/Unit"] ? formatNumber(parseFloat(selectedSeedDefaults["Seeds/lb"]) * selectedSeedDefaults["Lbs/Unit"], 0) : "N/A"} seeds/unit
            </small>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Seeds Per Pound Override <span className="text-gray-500">(Optional)</span></label>
            <input
              type="text"
              value={overrideSeeds}
              onChange={(e) => setOverrideSeeds(e.target.value)}
              className="border p-2 w-full dark:bg-gray-800 dark:text-white"
            />
            <small className="text-gray-500">
              Default: {selectedSeedDefaults?.["Seeds/lb"] || "N/A"} seeds/lb
            </small>
          </div>
        </div>
      </div>

      <div>
        <h2 className="section-header-blue">Market and ROI Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Market Price</label>
            <input
              type="text"
              value={marketPrice}
              onChange={(e) => setMarketPrice(e.target.value)}
              className="border p-2 w-full dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Price Unit</label>
            <select
              value={marketPriceUnit}
              onChange={(e) => setMarketPriceUnit(e.target.value)}
              className="border p-2 w-full dark:bg-gray-800 dark:text-white"
            >
              <option value="bu">bu</option>
              <option value="ton">ton</option>
              <option value="cwt">cwt</option>
              <option value="lbs">lbs</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Dealer Discount (%)</label>
            <input
              type="text"
              value={dealerDiscount}
              onChange={(e) => setDealerDiscount(e.target.value)}
              className="border p-2 w-full dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Grower Discount (%)</label>
            <input
              type="text"
              value={growerDiscount}
              onChange={(e) => setGrowerDiscount(e.target.value)}
              className="border p-2 w-full dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="section-header-blue">Seed Treatment Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[0, 1].map((index) => (
            <div key={index}>
              <label className="block mb-1 font-semibold">Seed Product {index + 1}</label>
              <select
                value={seedProducts[index]?.["Product Name"] || ""}
                onChange={(e) => handleSeedProductChange(index, e.target.value)}
                className="border p-2 w-full truncate dark:bg-gray-800 dark:text-white"
                title={formatProductLabel(seedProducts[index] || emptyProduct)}
              >
                <option value="">Select Seed Treatment Product</option>
                {productsSeedTreatment.map((product) => (
                  <option key={product["Product Name"]} value={product["Product Name"]}>
                    {formatProductLabel(product)}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="section-header-blue">In-Furrow / Foliar Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[0, 1, 2, 3].map((index) => (
            <div key={index}>
              <label className="block mb-1 font-semibold">Product {index + 1}</label>
              <select
                value={foliarProducts[index]?.["Product Name"] || ""}
                onChange={(e) => handleFoliarProductChange(index, e.target.value)}
                className="border p-2 w-full truncate dark:bg-gray-800 dark:text-white"
                title={formatProductLabel(foliarProducts[index] || emptyProduct)}
              >
                <option value="">Select Product</option>
                {productsInFurrowFoliar.map((product) => (
                  <option key={product["Product Name"]} value={product["Product Name"]}>
                    {formatProductLabel(product)}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center pt-4">
        <button
          type="button"
          onClick={onCalculate}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-semibold shadow"
        >
          Calculate
        </button>
      </div>
    </form>
  );
};

export default CalculatorForm;
