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
  setSelectedSeedTreatmentProducts: (
    value: { product: ProductData; applicationMethod: string }[]
  ) => void;
  selectedFoliarProducts: { product: ProductData; applicationMethod: string }[];
  setSelectedFoliarProducts: (
    value: { product: ProductData; applicationMethod: string }[]
  ) => void;
  handleCalculate: () => void;
  seedTypes: SeedType[]; // ✅ RESTORED PROP
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
  handleCalculate,
  seedTypes, // ✅ Used as prop
}) => {
  const getDefaultSeedsPerLb = () => {
    const match = seedTypes.find((s) => s["Seed Type"] === seedType);
    return match ? match["Seeds/lb"] : "N/A";
  };

  const getDefaultSeedsPerUnit = () => {
    if (seedType.toLowerCase() === "corn") return 80000;
    if (seedType.toLowerCase() === "soybeans") return 140000;
    const match = seedTypes.find((s) => s["Seed Type"] === seedType);
    return match && match["Lbs/Unit"] && match["Seeds/lb"]
      ? match["Lbs/Unit"] * parseFloat(match["Seeds/lb"])
      : "N/A";
  };

  return (
    <form className="space-y-8">
      {/* Crop Inputs */}
      <div>
        <h2 className="text-blue-400 text-lg font-bold mb-2">Crop Inputs</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Seed Type</label>
            <select
              value={seedType}
              onChange={(e) => setSeedType(e.target.value)}
              className="w-full p-2 rounded bg-white text-black"
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
            <label>Acres</label>
            <input
              type="number"
              value={acres}
              onChange={(e) => setAcres(e.target.value)}
              className="w-full p-2 rounded"
            />
          </div>
          <div>
            <label>Seeding Rate</label>
            <input
              type="number"
              value={seedingRate}
              onChange={(e) => setSeedingRate(e.target.value)}
              className="w-full p-2 rounded"
            />
          </div>
          <div>
            <label>Seeding Rate Unit</label>
            <select
              value={seedingRateUnit}
              onChange={(e) => setSeedingRateUnit(e.target.value)}
              className="w-full p-2 rounded"
            >
              <option value="seeds/acre">Seeds/acre</option>
              <option value="lbs/acre">Lbs/acre</option>
            </select>
          </div>
          <div>
            <label>Override Seeds/lb (optional)</label>
            <input
              type="number"
              value={overrideSeeds}
              onChange={(e) => setOverrideSeeds(e.target.value)}
              className="w-full p-2 rounded"
            />
            <div className="text-sm text-gray-400 mt-1">
              Default: {getDefaultSeedsPerLb()}
            </div>
          </div>
          <div>
            <label>Override Seeds/unit (optional)</label>
            <input
              type="number"
              value={seedsPerUnitOverride}
              onChange={(e) => setSeedsPerUnitOverride(e.target.value)}
              className="w-full p-2 rounded"
            />
            <div className="text-sm text-gray-400 mt-1">
              Default: {getDefaultSeedsPerUnit()}
            </div>
          </div>
        </div>
      </div>

      {/* Discount & Market Price Inputs */}
      {/* [unchanged: skip for brevity] */}

      {/* Seed Treatment Products / Foliar Products */}
      {/* [unchanged: skip for brevity] */}

      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleCalculate}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
        >
          Calculate
        </button>
      </div>
    </form>
  );
};

export default CalculatorForm;
