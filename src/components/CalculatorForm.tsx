// src/components/CalculatorForm.tsx

import React from "react";
import { ProductData, SeedType } from "../utils/data";

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
  marketPrice: string;
  setMarketPrice: (value: string) => void;
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
  marketPrice,
  setMarketPrice,
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
  return (
    <form className="grid gap-6 text-sm">
      {/* Crop Inputs */}
      <div>
        <h2 className="text-blue-600 text-lg font-[Montserrat] mb-2">Crop Inputs</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Grower Name</label>
            <input
              type="text"
              value={growerName}
              onChange={(e) => setGrowerName(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1">Rep Name</label>
            <input
              type="text"
              value={repName}
              onChange={(e) => setRepName(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1">Seed Type</label>
            <select
              value={seedType}
              onChange={(e) => setSeedType(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select seed type</option>
              <option value="Corn">Corn</option>
              <option value="Soybeans">Soybeans</option>
              <option value="Wheat">Wheat</option>
              <option value="Alfalfa">Alfalfa</option>
              <option value="Sorghum">Sorghum</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Total Acres</label>
            <input
              type="number"
              value={acres}
              onChange={(e) => setAcres(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1">Seeding Rate</label>
            <input
              type="number"
              value={seedingRate}
              onChange={(e) => setSeedingRate(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1">Rate Unit</label>
            <select
              value={seedingRateUnit}
              onChange={(e) => setSeedingRateUnit(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="seeds/acre">seeds/acre</option>
              <option value="lbs/acre">lbs/acre</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Seeds Per Pound (Override)</label>
            <input
              type="number"
              value={overrideSeeds}
              onChange={(e) => setOverrideSeeds(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Optional"
            />
          </div>
        </div>
      </div>

      {/* Market and ROI Inputs */}
      <div>
        <h2 className="text-blue-600 text-lg font-[Montserrat] mb-2">Market and ROI Inputs</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Market Price ($/bu)</label>
            <input
              type="number"
              value={marketPrice}
              onChange={(e) => setMarketPrice(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1">Dealer Discount (%)</label>
            <input
              type="number"
              value={dealerDiscount}
              onChange={(e) => setDealerDiscount(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1">Grower Discount (%)</label>
            <input
              type="number"
              value={growerDiscount}
              onChange={(e) => setGrowerDiscount(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
      </div>

      {/* Seed Treatment Products */}
      <div>
        <h2 className="text-blue-600 text-lg font-[Montserrat] mb-2">Seed Treatment Products</h2>
        <p className="text-xs mb-2">Select up to 2 seed treatment products.</p>
        <div className="grid grid-cols-1 gap-4">
          {/* You may later expand this to show product name, rate, etc. */}
          {/* Logic for rendering seed products already selected */}
        </div>
      </div>

      {/* In-Furrow / Foliar Products */}
      <div>
        <h2 className="text-blue-600 text-lg font-[Montserrat] mb-2">In-Furrow / Foliar Products</h2>
        <p className="text-xs mb-2">Select up to 4 products with application type.</p>
        <div className="grid grid-cols-1 gap-4">
          {/* You may later expand this to show product name, rate, and dropdown for method */}
        </div>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={handleCalculate}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Calculate Program
        </button>
      </div>
    </form>
  );
};

export default CalculatorForm;
