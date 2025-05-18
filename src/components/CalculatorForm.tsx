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
}) => {
  const handleSeedTreatmentChange = (index: number, field: string, value: any) => {
    const updated = [...selectedSeedTreatmentProducts];
    if (field === "product") {
      updated[index].product = value;
    } else if (field === "applicationMethod") {
      updated[index].applicationMethod = value;
    }
    setSelectedSeedTreatmentProducts(updated);
  };

  const handleFoliarProductChange = (index: number, field: string, value: any) => {
    const updated = [...selectedFoliarProducts];
    if (field === "product") {
      updated[index].product = value;
    } else if (field === "applicationMethod") {
      updated[index].applicationMethod = value;
    }
    setSelectedFoliarProducts(updated);
  };

  const getDefaultSeedsPerLb = () => {
    const match = seedTypes.find((s) => s.label === seedType);
    return match ? match.seedsPerPound : "N/A";
  };

  const getDefaultSeedsPerUnit = () => {
    if (seedType.toLowerCase() === "corn") return 80000;
    if (seedType.toLowerCase() === "soybeans") return 140000;
    const match = seedTypes.find((s) => s.label === seedType);
    return match && match.lbsPerUnit && match.seedsPerPound
      ? match.lbsPerUnit * match.seedsPerPound
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
                <option key={type.label} value={type.label}>
                  {type.label}
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

      {/* Seed Treatment Products */}
      <div>
        <h2 className="text-blue-400 text-lg font-bold mb-2">Seed Treatment Products</h2>
        {[0, 1].map((index) => (
          <div key={index} className="mb-4">
            <select
              className="w-full p-2 mb-2 rounded"
              value={selectedSeedTreatmentProducts[index]?.product?.name || ""}
              onChange={(e) => {
                const selected = e.target.value;
                const product = selected
                  ? require("../utils/data").productsSeedTreatment.find((p) => p.name === selected)
                  : null;
                handleSeedTreatmentChange(index, "product", product);
              }}
            >
              <option value="">Select Product</option>
              {require("../utils/data").productsSeedTreatment.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
            <select
              className="w-full p-2 rounded"
              value={selectedSeedTreatmentProducts[index]?.applicationMethod || ""}
              onChange={(e) =>
                handleSeedTreatmentChange(index, "applicationMethod", e.target.value)
              }
            >
              <option value="">Select Method</option>
              <option value="Seed Treatment">Seed Treatment</option>
            </select>
          </div>
        ))}
      </div>

      {/* In-Furrow / Foliar Products */}
      <div>
        <h2 className="text-blue-400 text-lg font-bold mb-2">In-Furrow / Foliar Products</h2>
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="mb-4">
            <select
              className="w-full p-2 mb-2 rounded"
              value={selectedFoliarProducts[index]?.product?.name || ""}
              onChange={(e) => {
                const selected = e.target.value;
                const product = selected
                  ? require("../utils/data").productsInFurrowFoliar.find((p) => p.name === selected)
                  : null;
                handleFoliarProductChange(index, "product", product);
              }}
            >
              <option value="">Select Product</option>
              {require("../utils/data").productsInFurrowFoliar.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
            <select
              className="w-full p-2 rounded"
              value={selectedFoliarProducts[index]?.applicationMethod || ""}
              onChange={(e) =>
                handleFoliarProductChange(index, "applicationMethod", e.target.value)
              }
            >
              <option value="">Select Method</option>
              <option value="In-Furrow">In-Furrow</option>
              <option value="Foliar">Foliar</option>
            </select>
          </div>
        ))}
      </div>

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
