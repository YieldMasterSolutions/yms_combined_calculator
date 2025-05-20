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
  /* eslint-disable @typescript-eslint/no-unused-vars */
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
  /* eslint-enable @typescript-eslint/no-unused-vars */

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
      {/* ...Crop Inputs and Discount Inputs Unchanged... */}

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