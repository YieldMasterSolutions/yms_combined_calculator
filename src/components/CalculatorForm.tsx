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
  dealerName: string;
  setDealerName: (value: string) => void;
  growerName: string;
  setGrowerName: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  seedTypes: SeedType[];
  productsSeedTreatment: ProductData[];
  productsInFurrow: ProductData[];
  selectedSeedTreatmentProducts: { product: ProductData; applicationMethod: string }[];
  selectedFoliarProducts: { product: ProductData; applicationMethod: string }[];
  handleProductChange: (index: number, productName: string, type: "seed" | "foliar") => void;
  handleAppTypeChange: (index: number, method: string, type: "seed" | "foliar") => void;
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
  dealerName,
  setDealerName,
  growerName,
  setGrowerName,
  onSubmit,
  seedTypes,
  productsSeedTreatment,
  productsInFurrow,
  selectedSeedTreatmentProducts,
  selectedFoliarProducts,
  handleProductChange,
  handleAppTypeChange,
}) => {
  const getProductLabel = (p: ProductData, type: "seed" | "foliar") => {
    const rate = p["Application Rate"];
    const size = p["Package Size"];
    const capacity = rate && size && rate > 0 ? Math.floor(size / rate) : "-";
    const labelUnit = type === "seed" ? "units" : "acres";
    return `${p["Product Name"]} – ${size} ${p["Package Units"]} ${p["Package Type"]} – ${rate} ${p["Application Rate Unit"]} – Treats ${capacity} ${labelUnit}`;
  };

  const getDefaultSeedsPerLb = (): string => {
    const found = seedTypes.find(s => s["Seed Type"] === seedType);
    return found ? String(found["Seeds/lb"]) : "";
  };

  const getDefaultSeedsPerUnit = (): string => {
    const found = seedTypes.find(s => s["Seed Type"] === seedType);
    const seedsPerLb = found ? found["Seeds/lb"] : 0;
    const lbsPerUnit = found ? found["Lbs/Unit"] : 0;
    return seedsPerLb && lbsPerUnit ? String(seedsPerLb * lbsPerUnit) : "";
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 text-white">
      <h2 className="text-xl font-bold text-blue-600 mb-2">Crop Inputs</h2>
      <div className="grid grid-cols-2 gap-4 bg-zinc-800 p-4 rounded border border-zinc-700">
        <div>
          <label className="block mb-1 font-semibold">Seed Type</label>
          <select
            value={seedType}
            onChange={(e) => setSeedType(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          >
            <option value="">Select Seed Type</option>
            {seedTypes.map((s, idx) => (
              <option key={idx} value={s["Seed Type"]}>{s["Seed Type"]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Acres</label>
          <input
            type="number"
            value={acres}
            onChange={(e) => setAcres(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Seeding Rate</label>
          <input
            type="number"
            value={seedingRate}
            onChange={(e) => setSeedingRate(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Seeding Rate Unit</label>
          <select
            value={seedingRateUnit}
            onChange={(e) => setSeedingRateUnit(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          >
            <option value="seeds/acre">Seeds/acre</option>
            <option value="lbs/acre">Lbs/acre</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Override Seeds/lb (optional)</label>
          <input
            type="number"
            value={overrideSeeds}
            onChange={(e) => setOverrideSeeds(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
          <p className="text-sm text-gray-400 mt-1">Default: {getDefaultSeedsPerLb()}</p>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Override Seeds/unit (optional)</label>
          <input
            type="number"
            value={seedsPerUnitOverride}
            onChange={(e) => setSeedsPerUnitOverride(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
          <p className="text-sm text-gray-400 mt-1">Default: {getDefaultSeedsPerUnit()}</p>
        </div>
      </div>

      {/* Additional input sections remain unchanged */}
    </form>
  );
};

export default CalculatorForm;
