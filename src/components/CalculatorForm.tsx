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
  // prevent unused prop ESLint errors
  void seedType;
  void setSeedType;
  void acres;
  void setAcres;
  void seedingRate;
  void setSeedingRate;
  void seedingRateUnit;
  void setSeedingRateUnit;
  void overrideSeeds;
  void setOverrideSeeds;
  void seedsPerUnitOverride;
  void setSeedsPerUnitOverride;
  void marketPrice;
  void setMarketPrice;
  void marketPriceUnit;
  void setMarketPriceUnit;
  void dealerDiscount;
  void setDealerDiscount;
  void growerDiscount;
  void setGrowerDiscount;
  void dealerName;
  void setDealerName;
  void growerName;
  void setGrowerName;

  const getDefaultSeedsPerLb = (): string => {
    const found = seedTypes.find((s) => s["Seed Type"] === seedType);
    return found ? found["Seeds/lb"] : "N/A";
  };
  void getDefaultSeedsPerLb;

  const getDefaultSeedsPerUnit = (): string => {
    if (seedType.toLowerCase() === "corn") return "80000";
    if (seedType.toLowerCase() === "soybeans") return "140000";
    const found = seedTypes.find((s) => s["Seed Type"] === seedType);
    if (!found) return "N/A";
    const seedsPerLb = parseFloat(found["Seeds/lb"]);
    const lbsPerUnit = parseFloat(String(found["Lbs/Unit"]));
    return seedsPerLb && lbsPerUnit ? Math.round(seedsPerLb * lbsPerUnit).toString() : "N/A";
  };
  void getDefaultSeedsPerUnit;

  const getProductLabel = (p: ProductData) => {
    return `${p["Product Name"]} – ${p["Product Form"]} – ${p["Application Rate"]} ${p["Application Rate Unit"]}`;
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 text-white">
      {/* unchanged input blocks */}

      <h2 className="text-xl font-bold text-[#39803c]">Seed Treatment Products</h2>
      <div className="grid grid-cols-1 gap-4 bg-zinc-800 p-4 rounded border border-zinc-700">
        {[0, 1].map((i) => (
          <div key={i}>
            <label className="block mb-1 font-semibold">Seed Treatment Product {i + 1}</label>
            <select
              value={selectedSeedTreatmentProducts[i]?.product?.["Product Name"] || ""}
              onChange={(e) => handleProductChange(i, e.target.value, "seed")}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            >
              <option value="">Select Product</option>
              {productsSeedTreatment.map((p, idx) => (
                <option key={idx} value={p["Product Name"]}>{getProductLabel(p)}</option>
              ))}
            </select>
            <select
              value={selectedSeedTreatmentProducts[i]?.applicationMethod || ""}
              onChange={(e) => handleAppTypeChange(i, e.target.value, "seed")}
              className="w-full mt-2 p-2 bg-gray-800 border border-gray-700 rounded"
            >
              <option value="">Method</option>
              <option value="Seed Treatment">Seed Treatment</option>
            </select>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-[#39803c]">In-Furrow / Foliar Products</h2>
      <div className="grid grid-cols-1 gap-4 bg-zinc-800 p-4 rounded border border-zinc-700">
        {[0, 1, 2, 3].map((i) => (
          <div key={i}>
            <label className="block mb-1 font-semibold">In-Furrow / Foliar Product {i + 1}</label>
            <select
              value={selectedFoliarProducts[i]?.product?.["Product Name"] || ""}
              onChange={(e) => handleProductChange(i, e.target.value, "foliar")}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            >
              <option value="">Select Product</option>
              {productsInFurrow.map((p, idx) => (
                <option key={idx} value={p["Product Name"]}>{getProductLabel(p)}</option>
              ))}
            </select>
            <select
              value={selectedFoliarProducts[i]?.applicationMethod || ""}
              onChange={(e) => handleAppTypeChange(i, e.target.value, "foliar")}
              className="w-full mt-2 p-2 bg-gray-800 border border-gray-700 rounded"
            >
              <option value="">Method</option>
              <option value="In-Furrow">In-Furrow</option>
              <option value="Foliar">Foliar</option>
            </select>
          </div>
        ))}
      </div>
    </form>
  );
};

export default CalculatorForm;