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
  dealerDiscount: string;
  setDealerDiscount: (value: string) => void;
  growerDiscount: string;
  setGrowerDiscount: (value: string) => void;
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
  dealerDiscount,
  setDealerDiscount,
  growerDiscount,
  setGrowerDiscount,
  onSubmit,
  seedTypes,
  productsSeedTreatment,
  productsInFurrow,
  selectedSeedTreatmentProducts,
  selectedFoliarProducts,
  handleProductChange,
  handleAppTypeChange,
}) => {
  const getDefaultSeedsPerLb = (): string => {
    const found = seedTypes.find((s) => s["Seed Type"] === seedType);
    return found ? found["Seeds/lb"] : "N/A";
  };

  const getDefaultSeedsPerUnit = (): string => {
    if (seedType.toLowerCase() === "corn") return "80000";
    if (seedType.toLowerCase() === "soybeans") return "140000";
    const found = seedTypes.find((s) => s["Seed Type"] === seedType);
    if (!found) return "N/A";
    const seedsPerLb = parseFloat(found["Seeds/lb"]);
    const lbsPerUnit = parseFloat(String(found["Lbs/Unit"]));
    return seedsPerLb && lbsPerUnit ? Math.round(seedsPerLb * lbsPerUnit).toString() : "N/A";
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 text-white">
      <h2 className="text-xl font-bold text-blue-400">Crop Inputs</h2>
      <div className="grid grid-cols-2 gap-4 bg-zinc-800 p-4 rounded border border-zinc-700">
        <div>
          <label className="block mb-1 font-semibold">Seed Type</label>
          <select
            value={seedType}
            onChange={(e) => setSeedType(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            required
          >
            <option value="">Select Seed Type</option>
            {seedTypes.map((s, i) => (
              <option key={i} value={s["Seed Type"]}>{s["Seed Type"]}</option>
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
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Seeding Rate</label>
          <input
            type="number"
            value={seedingRate}
            onChange={(e) => setSeedingRate(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            required
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
        <div>
          <label className="block mb-1 font-semibold">Market Price ($/unit)</label>
          <input
            type="number"
            value={marketPrice}
            onChange={(e) => setMarketPrice(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
      </div>

      <h2 className="text-xl font-bold text-blue-400">Product Inputs</h2>
      <div className="grid grid-cols-2 gap-4 bg-zinc-800 p-4 rounded border border-zinc-700">
        {[0, 1].map((index) => (
          <div key={index} className="flex flex-col gap-2">
            <label className="block font-semibold">Seed Treatment Product {index + 1}</label>
            <div className="flex gap-2">
              <select
                value={selectedSeedTreatmentProducts[index]?.product?.["Product Name"] || ""}
                onChange={(e) => handleProductChange(index, e.target.value, "seed")}
                className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded"
              >
                <option value="">Select Product</option>
                {productsSeedTreatment.map((p, i) => (
                  <option key={i} value={p["Product Name"]}>
                    {`${p["Product Name"]} – ${p["Application Method"]} – ${p["Application Rate"]} ${p["Application Rate Unit"]}`}
                  </option>
                ))}
              </select>
              <select
                value={selectedSeedTreatmentProducts[index]?.applicationMethod || ""}
                onChange={(e) => handleAppTypeChange(index, e.target.value, "seed")}
                className="w-40 p-2 bg-gray-800 border border-gray-700 rounded"
              >
                <option value="">Method</option>
                <option value="Planter Box">Planter Box</option>
                <option value="Seed Coating">Seed Coating</option>
              </select>
            </div>
          </div>
        ))}

        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="flex flex-col gap-2">
            <label className="block font-semibold">In-Furrow / Foliar Product {index + 1}</label>
            <div className="flex gap-2">
              <select
                value={selectedFoliarProducts[index]?.product?.["Product Name"] || ""}
                onChange={(e) => handleProductChange(index, e.target.value, "foliar")}
                className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded"
              >
                <option value="">Select Product</option>
                {productsInFurrow.map((p, i) => (
                  <option key={i} value={p["Product Name"]}>
                    {`${p["Product Name"]} – ${p["Application Method"]} – ${p["Application Rate"]} ${p["Application Rate Unit"]}`}
                  </option>
                ))}
              </select>
              <select
                value={selectedFoliarProducts[index]?.applicationMethod || ""}
                onChange={(e) => handleAppTypeChange(index, e.target.value, "foliar")}
                className="w-40 p-2 bg-gray-800 border border-gray-700 rounded"
              >
                <option value="">Method</option>
                <option value="In-Furrow">In-Furrow</option>
                <option value="Foliar">Foliar</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-blue-400">Dealer and Grower Info (Optional)</h2>
      <div className="grid grid-cols-2 gap-4 bg-zinc-800 p-4 rounded border border-zinc-700">
        <div>
          <label className="block mb-1 font-semibold">Dealer Discount (%)</label>
          <input
            type="number"
            value={dealerDiscount}
            onChange={(e) => setDealerDiscount(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Grower Discount (%)</label>
          <input
            type="number"
            value={growerDiscount}
            onChange={(e) => setGrowerDiscount(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
      </div>
    </form>
  );
};

export default CalculatorForm;
