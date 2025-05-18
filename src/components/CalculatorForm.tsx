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
      {/* Crop & Discount Inputs (omitted for brevity — already implemented) */}

      <div>
        <h2 className="text-blue-400 text-lg font-bold mb-2">Seed Treatment Products</h2>
        {[0, 1].map((index) => (
          <div key={index} className="mb-4">
            <select
              className="w-full p-2 mb-2 rounded"
              value={selectedSeedTreatmentProducts[index]?.product?.["Product Name"] || ""}
              onChange={(e) =>
                handleProductChange(index, e.target.value, "seed")
              }
            >
              <option value="">Select Product</option>
              {productsSeedTreatment.map((p) => (
                <option key={p["Product Name"]} value={p["Product Name"]}>
                  {p["Product Name"]}
                </option>
              ))}
            </select>
            <select
              className="w-full p-2 rounded"
              value={selectedSeedTreatmentProducts[index]?.applicationMethod || ""}
              onChange={(e) =>
                handleAppTypeChange(index, e.target.value, "seed")
              }
            >
              <option value="">Select Method</option>
              <option value="Seed Treatment">Seed Treatment</option>
            </select>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-blue-400 text-lg font-bold mb-2">In-Furrow / Foliar Products</h2>
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="mb-4">
            <select
              className="w-full p-2 mb-2 rounded"
              value={selectedFoliarProducts[index]?.product?.["Product Name"] || ""}
              onChange={(e) =>
                handleProductChange(index, e.target.value, "foliar")
              }
            >
              <option value="">Select Product</option>
              {productsInFurrow.map((p) => (
                <option key={p["Product Name"]} value={p["Product Name"]}>
                  {p["Product Name"]}
                </option>
              ))}
            </select>
            <select
              className="w-full p-2 rounded"
              value={selectedFoliarProducts[index]?.applicationMethod || ""}
              onChange={(e) =>
                handleAppTypeChange(index, e.target.value, "foliar")
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
