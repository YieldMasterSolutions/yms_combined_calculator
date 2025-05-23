/* eslint-disable @typescript-eslint/no-unused-vars */

// src/components/CalculatorForm.tsx

import React from "react";
import { ProductData, seedTypes } from "../utils/data";

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
  seedProducts: ProductData[];
  setSeedProducts: (products: ProductData[]) => void;
  foliarProducts: ProductData[];
  setFoliarProducts: (products: ProductData[]) => void;
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
  seedProducts: _seedProducts,
  setSeedProducts: _setSeedProducts,
  foliarProducts: _foliarProducts,
  setFoliarProducts: _setFoliarProducts,
  handleCalculate: _handleCalculate,
}) => {
  return (
    <form className="grid gap-6 text-sm">
      {/* Crop Inputs */}
      <div>
        <h2 className="text-blue-600 text-lg font-[Montserrat] mb-2">Crop Inputs</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Seed Type</label>
            <select value={seedType} onChange={(e) => setSeedType(e.target.value)} className="w-full border rounded px-3 py-2">
              <option value="">Select seed type</option>
              {seedTypes.map((seed, index) => (
                <option key={index} value={seed["Seed Type"]}>{seed["Seed Type"]}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Total Acres</label>
            <input type="number" value={acres} onChange={(e) => setAcres(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block mb-1">Seeding Rate</label>
            <input type="number" value={seedingRate} onChange={(e) => setSeedingRate(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block mb-1">Rate Unit</label>
            <select value={seedingRateUnit} onChange={(e) => setSeedingRateUnit(e.target.value)} className="w-full border rounded px-3 py-2">
              <option value="seeds/acre">seeds/acre</option>
              <option value="lbs/acre">lbs/acre</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Seeds Per Pound (Override)</label>
            <input type="number" value={overrideSeeds} onChange={(e) => setOverrideSeeds(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Optional" />
          </div>
          <div>
            <label className="block mb-1">Seeds Per Unit (Override)</label>
            <input type="number" value={seedsPerUnitOverride} onChange={(e) => setSeedsPerUnitOverride(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Optional" />
          </div>
        </div>
      </div>

      {/* Market and ROI Inputs */}
      <div>
        <h2 className="text-blue-600 text-lg font-[Montserrat] mt-8 mb-2">Market and ROI Inputs</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Grower Name</label>
            <input type="text" value={growerName} onChange={(e) => setGrowerName(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block mb-1">Rep Name</label>
            <input type="text" value={repName} onChange={(e) => setRepName(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block mb-1">Market Price</label>
            <input type="number" value={marketPrice} onChange={(e) => setMarketPrice(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Enter price" />
          </div>
          <div>
            <label className="block mb-1">Market Price Unit</label>
            <select value={marketPriceUnit} onChange={(e) => setMarketPriceUnit(e.target.value)} className="w-full border rounded px-3 py-2">
              <option value="$/bu">$/bu</option>
              <option value="$/lb">$/lb</option>
              <option value="$/cwt">$/cwt</option>
              <option value="$/ton">$/ton</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Dealer Discount (%)</label>
            <input type="number" value={dealerDiscount} onChange={(e) => setDealerDiscount(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block mb-1">Grower Discount (%)</label>
            <input type="number" value={growerDiscount} onChange={(e) => setGrowerDiscount(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>
        </div>
      </div>

      {/* Product Inputs */}
      <div>
        <h2 className="text-blue-600 text-lg font-[Montserrat] mt-8 mb-2">Product Inputs</h2>
        <p className="text-gray-600 italic mb-2">(Product selectors will appear here in future builds)</p>
      </div>

      {/* Calculate Button */}
      <div className="text-center mt-4">
        <button
          type="button"
          onClick={() => _handleCalculate()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
        >
          Calculate
        </button>
      </div>
    </form>
  );
};

export default CalculatorForm;
