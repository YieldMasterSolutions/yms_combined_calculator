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
  const getProductLabel = (p: ProductData) => {
    return `${p["Product Name"]} – ${p["Product Form"]} – ${p["Application Rate"]} ${p["Application Rate Unit"]}`;
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
        </div>
        <div>
          <label className="block mb-1 font-semibold">Override Seeds/unit (optional)</label>
          <input
            type="number"
            value={seedsPerUnitOverride}
            onChange={(e) => setSeedsPerUnitOverride(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
      </div>

      <h2 className="text-xl font-bold text-blue-400">Discount & Market Price Inputs</h2>
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
          <label className="block mb-1 font-semibold">Dealer / Rep Name</label>
          <input
            type="text"
            value={dealerName}
            onChange={(e) => setDealerName(e.target.value)}
            placeholder="Optional"
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
        <div>
          <label className="block mb-1 font-semibold">Grower Name</label>
          <input
            type="text"
            value={growerName}
            onChange={(e) => setGrowerName(e.target.value)}
            placeholder="Optional"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Market Price ($)</label>
          <input
            type="number"
            value={marketPrice}
            onChange={(e) => setMarketPrice(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Price Unit</label>
          <select
            value={marketPriceUnit}
            onChange={(e) => setMarketPriceUnit(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          >
            <option value="/acre">$/acre</option>
            <option value="/bu">$/bu</option>
            <option value="/cwt">$/cwt</option>
          </select>
        </div>
      </div>

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
              <option value="">Application</option>
              <option value="Seed Treatment">Seed Treatment</option>
              <option value="Planter Box">Planter Box</option>
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
              <option value="">Application</option>
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
