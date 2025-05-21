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
  const type = product["Package Type"];
  const rate = product["Application Rate"];
  const rateUnit = product["Application Rate Unit"];
  const capacity = getTreatmentCapacity(product);
  return `${name} – ${size} ${units} ${type} – ${rate} ${rateUnit} – ${capacity}`;
};

const CalculatorForm: React.FC<CalculatorFormProps> = (props) => {
  const {
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
  } = props;

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
    <form onSubmit={onSubmit} className="space-y-8 text-white">
      <h2 className="text-xl font-bold text-blue-600">Crop Inputs</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label-yellow mb-1 block">Seed Type</label>
          <select value={seedType} onChange={(e) => setSeedType(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-600 rounded">
            <option value="">Select Seed Type</option>
            {seedTypes.map((s) => (
              <option key={s["Seed Type"]} value={s["Seed Type"]}>{s["Seed Type"]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-yellow mb-1 block">Total Acres</label>
          <input type="number" value={acres} onChange={(e) => setAcres(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-600 rounded" />
        </div>
        <div>
          <label className="label-yellow mb-1 block">Seeding Rate</label>
          <input type="number" value={seedingRate} onChange={(e) => setSeedingRate(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-600 rounded" />
        </div>
        <div>
          <label className="label-yellow mb-1 block">Rate Unit</label>
          <select value={seedingRateUnit} onChange={(e) => setSeedingRateUnit(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-600 rounded">
            <option value="seeds/acre">seeds/acre</option>
            <option value="lbs/acre">lbs/acre</option>
          </select>
        </div>
        <div>
          <label className="label-yellow mb-1 block">Override Seeds/lb</label>
          <input type="number" value={overrideSeeds} onChange={(e) => setOverrideSeeds(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-600 rounded" />
          <p className="text-xs text-gray-400 mt-1">Default: {getDefaultSeedsPerLb()}</p>
        </div>
        <div>
          <label className="label-yellow mb-1 block">Override Seeds/Unit</label>
          <input type="number" value={seedsPerUnitOverride} onChange={(e) => setSeedsPerUnitOverride(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-600 rounded" />
          <p className="text-xs text-gray-400 mt-1">Default: {getDefaultSeedsPerUnit()}</p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-blue-600">Market and ROI Inputs</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label-yellow mb-1 block">Grower Name</label>
          <input type="text" value={growerName} onChange={(e) => setGrowerName(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-600 rounded" />
        </div>
        <div>
          <label className="label-yellow mb-1 block">Rep Name</label>
          <input type="text" value={dealerName} onChange={(e) => setDealerName(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-600 rounded" />
        </div>
        <div>
          <label className="label-yellow mb-1 block">Dealer Discount (%)</label>
          <input type="number" value={dealerDiscount} onChange={(e) => setDealerDiscount(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-600 rounded" />
        </div>
        <div>
          <label className="label-yellow mb-1 block">Grower Discount (%)</label>
          <input type="number" value={growerDiscount} onChange={(e) => setGrowerDiscount(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-600 rounded" />
        </div>
        <div>
          <label className="label-yellow mb-1 block">Market Price</label>
          <input type="number" value={marketPrice} onChange={(e) => setMarketPrice(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-600 rounded" />
        </div>
        <div>
          <label className="label-yellow mb-1 block">Market Price Unit</label>
          <select value={marketPriceUnit} onChange={(e) => setMarketPriceUnit(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-600 rounded">
            <option value="$/acre">$/acre</option>
            <option value="$/bushel">$/bushel</option>
            <option value="$/ton">$/ton</option>
          </select>
        </div>
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
