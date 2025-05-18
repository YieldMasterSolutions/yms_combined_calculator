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
  dealerName: string;
  setDealerName: (value: string) => void;
  selectedSeedTreatmentProducts: { product: ProductData; applicationMethod: string }[];
  setSelectedSeedTreatmentProducts: (value: { product: ProductData; applicationMethod: string }[]) => void;
  selectedFoliarProducts: { product: ProductData; applicationMethod: string }[];
  setSelectedFoliarProducts: (value: { product: ProductData; applicationMethod: string }[]) => void;
  seedTypes: SeedType[];
  productsSeedTreatment: ProductData[];
  productsInFurrowFoliar: ProductData[];
  handleProductChange: (index: number, type: "seed" | "foliar", product: ProductData) => void;
  handleAppTypeChange: (index: number, type: "seed" | "foliar", method: string) => void;
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
  dealerName,
  setDealerName,
  selectedSeedTreatmentProducts,
  setSelectedSeedTreatmentProducts,
  selectedFoliarProducts,
  setSelectedFoliarProducts,
  seedTypes,
  productsSeedTreatment,
  productsInFurrowFoliar,
  handleProductChange,
  handleAppTypeChange,
}) => {
  return (
    <form className="space-y-6">
      <div>
        <h2 className="text-blue-700 text-lg font-bold mb-2">Crop Inputs</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Seed Type</label>
            <select
              value={seedType}
              onChange={(e) => setSeedType(e.target.value)}
              className="w-full border p-2"
            >
              <option value="">Select a crop...</option>
              {seedTypes.map((type) => (
                <option key={type["Seed Type"]} value={type["Seed Type"]}>
                  {type["Seed Type"]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold">Acres</label>
            <input
              type="number"
              value={acres}
              onChange={(e) => setAcres(e.target.value)}
              className="w-full border p-2"
            />
          </div>
          <div>
            <label className="block font-semibold">Seeding Rate</label>
            <input
              type="number"
              value={seedingRate}
              onChange={(e) => setSeedingRate(e.target.value)}
              className="w-full border p-2"
            />
          </div>
          <div>
            <label className="block font-semibold">Rate Unit</label>
            <select
              value={seedingRateUnit}
              onChange={(e) => setSeedingRateUnit(e.target.value)}
              className="w-full border p-2"
            >
              <option value="seeds/acre">seeds/acre</option>
              <option value="lbs/acre">lbs/acre</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">Seeds/lb Override</label>
            <input
              type="number"
              value={overrideSeeds}
              onChange={(e) => setOverrideSeeds(e.target.value)}
              className="w-full border p-2"
              placeholder="Optional"
            />
          </div>
          <div>
            <label className="block font-semibold">Seeds/Unit Override</label>
            <input
              type="number"
              value={seedsPerUnitOverride}
              onChange={(e) => setSeedsPerUnitOverride(e.target.value)}
              className="w-full border p-2"
              placeholder="Optional"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default CalculatorForm;
