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
  seedTypes: SeedType[];
  productsSeedTreatment: ProductData[];
  productsInFurrow: ProductData[];
  handleProductChange: (index: number, productName: string, type: "seed" | "foliar") => void;
  handleAppTypeChange: (index: number, method: string, type: "seed" | "foliar") => void;
  onSubmit: (e: React.FormEvent) => void;
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
  productsInFurrow,
  handleProductChange,
  handleAppTypeChange,
  onSubmit,
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
    <form onSubmit={onSubmit} className="space-y-8">
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

      <div>
        <h2 className="text-blue-400 text-lg font-bold mb-2">Discount & Market Price Inputs</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Dealer / Rep Name</label>
            <input
              type="text"
              value={dealerName}
              onChange={(e) => setDealerName(e.target.value)}
              className="w-full p-2 rounded"
              placeholder="Optional"
            />
          </div>
          <div>
            <label>Grower Name</label>
            <input
              type="text"
              value={growerName}
              onChange={(e) => setGrowerName(e.target.value)}
              className="w-full p-2 rounded"
              placeholder="Optional"
            />
          </div>
          <div>
            <label>Dealer Discount (%)</label>
            <input
              type="number"
              value={dealerDiscount}
              onChange={(e) => setDealerDiscount(e.target.value)}
              className="w-full p-2 rounded"
            />
          </div>
          <div>
            <label>Grower Discount (%)</label>
            <input
              type="number"
              value={growerDiscount}
              onChange={(e) => setGrowerDiscount(e.target.value)}
              className="w-full p-2 rounded"
            />
          </div>
          <div>
            <label>Market Price ($)</label>
            <input
              type="number"
              value={marketPrice}
              onChange={(e) => setMarketPrice(e.target.value)}
              className="w-full p-2 rounded"
            />
          </div>
          <div>
            <label>Price Unit</label>
            <select
              value={marketPriceUnit}
              onChange={(e) => setMarketPriceUnit(e.target.value)}
              className="w-full p-2 rounded"
            >
              <option value="$/acre">$/acre</option>
              <option value="$/bu">$/bu</option>
              <option value="$USD/ton">$USD/ton</option>
              <option value="$/cwt">$/cwt</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
        >
          Calculate
        </button>
      </div>
    </form>
  );
};

export default CalculatorForm;
