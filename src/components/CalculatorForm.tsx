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
  const handleSeedProductChange = (index: number, value: string) => {
    const selectedProduct = productsSeedTreatment.find((p) => p["Product Name"] === value) || null;
    const updated = [...seedProducts];
    updated[index] = selectedProduct;
    setSeedProducts(updated);
  };

  const handleFoliarProductChange = (index: number, value: string) => {
    const selectedProduct = productsInFurrowFoliar.find((p) => p["Product Name"] === value) || null;
    const updated = [...foliarProducts];
    updated[index] = selectedProduct;
    setFoliarProducts(updated);
  };

  const formatProductLabel = (product: ProductData) => {
    return `${product["Product Name"]} – ${product["Package Size"]} ${product["Package Units"]} ${product["Package Type"]} – ${product["Application Rate"]} ${product["Application Rate Unit"]}`;
  };

  return (
    <form className="space-y-6 text-base font-[Open_Sans]">
      {/* Grower & Rep Info */}
      <div>
        <h2 className="text-blue-600 text-lg font-[Montserrat]">Grower & Rep Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Grower Name"
            value={growerName}
            onChange={(e) => setGrowerName(e.target.value)}
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Rep Name"
            value={repName}
            onChange={(e) => setRepName(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
      </div>

      {/* Crop Inputs */}
      <div>
        <h2 className="text-blue-600 text-lg font-[Montserrat]">Crop Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={seedType}
            onChange={(e) => setSeedType(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="">Select Seed Type</option>
            {seedTypes.map((type) => (
              <option key={type["Seed Type"]} value={type["Seed Type"]}>
                {type["Seed Type"]}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Acres"
            value={acres}
            onChange={(e) => setAcres(e.target.value)}
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Seeding Rate"
            value={seedingRate}
            onChange={(e) => setSeedingRate(e.target.value)}
            className="border p-2 w-full"
          />
          <select
            value={seedingRateUnit}
            onChange={(e) => setSeedingRateUnit(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="seeds/acre">seeds/acre</option>
            <option value="lbs/acre">lbs/acre</option>
          </select>
          <input
            type="text"
            placeholder="Seeds Per Pound (optional)"
            value={overrideSeeds}
            onChange={(e) => setOverrideSeeds(e.target.value)}
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Seeds Per Unit (override)"
            value={seedsPerUnitOverride}
            onChange={(e) => setSeedsPerUnitOverride(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
      </div>

      {/* Market and ROI Inputs */}
      <div>
        <h2 className="text-blue-600 text-lg font-[Montserrat]">Market and ROI Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Market Price"
            value={marketPrice}
            onChange={(e) => setMarketPrice(e.target.value)}
            className="border p-2 w-full"
          />
          <select
            value={marketPriceUnit}
            onChange={(e) => setMarketPriceUnit(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="bu">bu</option>
            <option value="ton">ton</option>
            <option value="cwt">cwt</option>
          </select>
          <input
            type="text"
            placeholder="Dealer Discount (%)"
            value={dealerDiscount}
            onChange={(e) => setDealerDiscount(e.target.value)}
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Grower Discount (%)"
            value={growerDiscount}
            onChange={(e) => setGrowerDiscount(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
      </div>

      {/* Seed Treatment Products */}
      <div>
        <h2 className="text-blue-600 text-lg font-[Montserrat]">Seed Treatment Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[0, 1].map((index) => (
            <select
              key={index}
              value={seedProducts[index]?.["Product Name"] || ""}
              onChange={(e) => handleSeedProductChange(index, e.target.value)}
              className="border p-2 w-full"
            >
              <option value="">Select Seed Treatment Product</option>
              {productsSeedTreatment.map((product) => (
                <option key={product["Product Name"]} value={product["Product Name"]}>
                  {formatProductLabel(product)}
                </option>
              ))}
            </select>
          ))}
        </div>
      </div>

      {/* In-Furrow / Foliar Products */}
      <div>
        <h2 className="text-blue-600 text-lg font-[Montserrat]">In-Furrow / Foliar Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[0, 1, 2, 3].map((index) => (
            <select
              key={index}
              value={foliarProducts[index]?.["Product Name"] || ""}
              onChange={(e) => handleFoliarProductChange(index, e.target.value)}
              className="border p-2 w-full"
            >
              <option value="">Select Product</option>
              {productsInFurrowFoliar.map((product) => (
                <option key={product["Product Name"]} value={product["Product Name"]}>
                  {formatProductLabel(product)}
                </option>
              ))}
            </select>
          ))}
        </div>
      </div>

      {/* Calculate Button */}
      <div className="text-center pt-4">
        <button
          type="button"
          onClick={onCalculate}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-semibold"
        >
          Calculate
        </button>
      </div>
    </form>
  );
};

export default CalculatorForm;
