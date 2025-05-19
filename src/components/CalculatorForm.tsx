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

const getTreatmentCapacity = (product: ProductData): string => {
  const rate = product["Application Rate"] ?? 0;
  const size = product["Package Size"] ?? 0;
  if (!rate || !size) return "";
  const capacity = Math.floor(size / rate);
  const unitLabel = product["Application Rate Unit"]?.includes("/acre") ? "acres" : "units";
  return `Treats ${capacity} ${unitLabel}`;
};

const formatProductLabel = (product: ProductData): string => {
  const name = product["Product Name"];
  const size = product["Package Size"];
  const units = product["Package Units"];
  const rate = product["Application Rate"];
  const rateUnit = product["Application Rate Unit"];
  const capacity = getTreatmentCapacity(product);
  return `${name} – ${size} ${units} – ${rate} ${rateUnit} – ${capacity}`;
};

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
  const getDefaultSeedsPerLb = (): string => {
    const found = seedTypes.find((s) => s["Seed Type"] === seedType);
    return found ? String(found["Seeds/lb"]) : "";
  };

  const getDefaultSeedsPerUnit = (): string => {
    if (seedType.toLowerCase() === "corn") return "80000";
    if (seedType.toLowerCase() === "soybeans") return "140000";
    const found = seedTypes.find((s) => s["Seed Type"] === seedType);
    const seedsPerLb = found ? parseFloat(found["Seeds/lb"]) : 0;
    const lbsPerUnit = found ? found["Lbs/Unit"] : 0;
    return seedsPerLb && lbsPerUnit ? String(seedsPerLb * lbsPerUnit) : "";
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 text-white">
      <h2 className="text-xl font-bold text-blue-600">Crop Inputs</h2>
      <div className="grid grid-cols-2 gap-4 bg-zinc-800 p-4 rounded">
        <div>
          <label className="block font-semibold">Seed Type</label>
          <select
            value={seedType}
            onChange={(e) => setSeedType(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
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
          <label className="block font-semibold">Acres</label>
          <input
            type="number"
            value={acres}
            onChange={(e) => setAcres(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Seeding Rate</label>
          <input
            type="number"
            value={seedingRate}
            onChange={(e) => setSeedingRate(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Seeding Rate Unit</label>
          <select
            value={seedingRateUnit}
            onChange={(e) => setSeedingRateUnit(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
          >
            <option value="seeds/acre">Seeds/acre</option>
            <option value="lbs/acre">Lbs/acre</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold">Override Seeds/lb (optional)</label>
          <input
            type="number"
            value={overrideSeeds}
            onChange={(e) => setOverrideSeeds(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
          />
          <div className="text-sm text-gray-400 mt-1">Default: {getDefaultSeedsPerLb()}</div>
        </div>
        <div>
          <label className="block font-semibold">Override Seeds/unit (optional)</label>
          <input
            type="number"
            value={seedsPerUnitOverride}
            onChange={(e) => setSeedsPerUnitOverride(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
          />
          <div className="text-sm text-gray-400 mt-1">Default: {getDefaultSeedsPerUnit()}</div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-blue-600">Discount & Market Price Inputs</h2>
      <div className="grid grid-cols-2 gap-4 bg-zinc-800 p-4 rounded">
        <input type="text" placeholder="Dealer / Rep Name" value={dealerName} onChange={(e) => setDealerName(e.target.value)} className="p-2 bg-gray-800 border border-gray-600 rounded" />
        <input type="text" placeholder="Grower Name" value={growerName} onChange={(e) => setGrowerName(e.target.value)} className="p-2 bg-gray-800 border border-gray-600 rounded" />
        <input type="number" placeholder="Dealer Discount (%)" value={dealerDiscount} onChange={(e) => setDealerDiscount(e.target.value)} className="p-2 bg-gray-800 border border-gray-600 rounded" />
        <input type="number" placeholder="Grower Discount (%)" value={growerDiscount} onChange={(e) => setGrowerDiscount(e.target.value)} className="p-2 bg-gray-800 border border-gray-600 rounded" />
        <input type="number" placeholder="Market Price ($)" value={marketPrice} onChange={(e) => setMarketPrice(e.target.value)} className="p-2 bg-gray-800 border border-gray-600 rounded" />
        <select value={marketPriceUnit} onChange={(e) => setMarketPriceUnit(e.target.value)} className="p-2 bg-gray-800 border border-gray-600 rounded">
          <option value="$/acre">$/acre</option>
          <option value="$/bu">$/bu</option>
          <option value="$/ton">$/ton</option>
          <option value="$/cwt">$/cwt</option>
        </select>
      </div>

      <h2 className="text-xl font-bold text-blue-600">Seed Treatment Products</h2>
      {[0, 1].map((index) => (
        <div key={index} className="bg-zinc-800 p-4 rounded">
          <select
            value={selectedSeedTreatmentProducts[index]?.product?.["Product Name"] || ""}
            onChange={(e) => handleProductChange(index, e.target.value, "seed")}
            className="w-full mb-2 p-2 bg-gray-800 border border-gray-600 rounded"
          >
            <option value="">Select Seed Treatment Product</option>
            {productsSeedTreatment.map((p) => (
              <option key={p["Product Name"]} value={p["Product Name"]}>
                {formatProductLabel(p)}
              </option>
            ))}
          </select>
          <select
            value={selectedSeedTreatmentProducts[index]?.applicationMethod || ""}
            onChange={(e) => handleAppTypeChange(index, e.target.value, "seed")}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
          >
            <option value="">Select Method</option>
            <option value="Seed Treatment">Seed Treatment</option>
            <option value="Planter Box Treatment">Planter Box Treatment</option>
          </select>
        </div>
      ))}

      <h2 className="text-xl font-bold text-blue-600">In-Furrow / Foliar Products</h2>
      {[0, 1, 2, 3].map((index) => (
        <div key={index} className="bg-zinc-800 p-4 rounded">
          <select
            value={selectedFoliarProducts[index]?.product?.["Product Name"] || ""}
            onChange={(e) => handleProductChange(index, e.target.value, "foliar")}
            className="w-full mb-2 p-2 bg-gray-800 border border-gray-600 rounded"
          >
            <option value="">Select In-Furrow / Foliar Product</option>
            {productsInFurrow.map((p) => (
              <option key={p["Product Name"]} value={p["Product Name"]}>
                {formatProductLabel(p)}
              </option>
            ))}
          </select>
          <select
            value={selectedFoliarProducts[index]?.applicationMethod || ""}
            onChange={(e) => handleAppTypeChange(index, e.target.value, "foliar")}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
          >
            <option value="">Select Method</option>
            <option value="In-Furrow">In-Furrow</option>
            <option value="Foliar">Foliar</option>
          </select>
        </div>
      ))}

      <div className="text-center">
        <button type="submit" className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded text-white">
          Calculate
        </button>
      </div>
    </form>
  );
};

export default CalculatorForm;
