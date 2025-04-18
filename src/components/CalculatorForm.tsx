// src/components/CalculatorForm.tsx
"use client";
import React from "react";
import type { Product, SeedType } from "../utils/calculations";

interface CalculatorFormProps {
  selectedSeedType: string;
  setSelectedSeedType: (value: string) => void;
  acres: string;
  setAcres: (value: string) => void;
  seedingRate: string;
  setSeedingRate: (value: string) => void;
  seedingRateUnit: string;
  setSeedingRateUnit: (value: string) => void;
  overrideSeeds: string;
  setOverrideSeeds: (value: string) => void;
  marketPrice: string;
  setMarketPrice: (value: string) => void;
  cropPriceUnit: string;
  setCropPriceUnit: (value: string) => void;
  dealerDiscount: string;
  setDealerDiscount: (value: string) => void;
  growerDiscount: string;
  setGrowerDiscount: (value: string) => void;
  seedTreatments: string[];
  setSeedTreatments: (value: string[]) => void;
  seedTreatmentRateOverrides: string[];
  setSeedTreatmentRateOverrides: (value: string[]) => void;
  inFurrowFoliarProducts: { name: string; applicationType: string }[];
  setInFurrowFoliarProducts: (value: { name: string; applicationType: string }[]) => void;
  foliarRateOverrides: string[];
  setFoliarRateOverrides: (value: string[]) => void;
  productsSeedTreatment: Product[];
  productsInFurrow: Product[];
  seedTypes: SeedType[];
  onSubmit: (e: React.FormEvent) => void;
}

export default function CalculatorForm({
  selectedSeedType,
  setSelectedSeedType,
  acres,
  setAcres,
  seedingRate,
  setSeedingRate,
  seedingRateUnit,
  setSeedingRateUnit,
  overrideSeeds,
  setOverrideSeeds,
  marketPrice,
  setMarketPrice,
  cropPriceUnit,
  setCropPriceUnit,
  dealerDiscount,
  setDealerDiscount,
  growerDiscount,
  setGrowerDiscount,
  seedTreatments,
  setSeedTreatments,
  seedTreatmentRateOverrides,
  setSeedTreatmentRateOverrides,
  inFurrowFoliarProducts,
  setInFurrowFoliarProducts,
  foliarRateOverrides,
  setFoliarRateOverrides,
  productsSeedTreatment,
  productsInFurrow,
  seedTypes,
  onSubmit,
}: CalculatorFormProps) {
  const defaultSeedsPerLb =
    seedTypes.find((s) => s["Seed Type"] === selectedSeedType)?.["Seeds/lb"] || "";

  const handleSeedTreatmentChange = (index: number, value: string) => {
    const updated = [...seedTreatments];
    updated[index] = value;
    setSeedTreatments(updated);
  };

  const handleSeedRateOverride = (index: number, value: string) => {
    const updated = [...seedTreatmentRateOverrides];
    updated[index] = value;
    setSeedTreatmentRateOverrides(updated);
  };

  const handleFoliarProductChange = (index: number, field: "name" | "applicationType", value: string) => {
    const updated = [...inFurrowFoliarProducts];
    updated[index][field] = value;
    setInFurrowFoliarProducts(updated);
  };

  const handleFoliarOverride = (index: number, value: string) => {
    const updated = [...foliarRateOverrides];
    updated[index] = value;
    setFoliarRateOverrides(updated);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <h2 className="text-blue-400 text-xl font-bold mb-2">Crop Inputs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-yellow-400 font-bold">Crop Type</label>
          <select
            value={selectedSeedType}
            onChange={(e) => setSelectedSeedType(e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          >
            <option value="">-- Select --</option>
            {seedTypes.map((seed, i) => (
              <option key={i} value={seed["Seed Type"]}>
                {seed["Seed Type"]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-yellow-400 font-bold">Number of Acres</label>
          <input
            type="number"
            value={acres}
            onChange={(e) => setAcres(e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          />
        </div>

        <div>
          <label className="text-yellow-400 font-bold">Seeding Rate</label>
          <input
            type="number"
            value={seedingRate}
            onChange={(e) => setSeedingRate(e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          />
        </div>

        <div>
          <label className="text-yellow-400 font-bold">Rate Unit</label>
          <select
            value={seedingRateUnit}
            onChange={(e) => setSeedingRateUnit(e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          >
            <option value="seeds/acre">seeds/acre</option>
            <option value="lbs/acre">lbs/acre</option>
            <option value="bu/acre">bu/acre</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="text-yellow-400 font-bold">
            Seeds per Pound Override <span className="text-sm text-white">(Optional)</span>
          </label>
          <input
            type="number"
            value={overrideSeeds}
            onChange={(e) => setOverrideSeeds(e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          />
          {selectedSeedType && (
            <p className="text-sm text-gray-400 mt-1">
              Default: {defaultSeedsPerLb} seeds/lb
            </p>
          )}
        </div>

        <div>
          <label className="text-yellow-400 font-bold">Dealer Discount (%) <span className="text-sm text-white">(Optional)</span></label>
          <input
            type="number"
            value={dealerDiscount}
            onChange={(e) => setDealerDiscount(e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          />
        </div>

        <div>
          <label className="text-yellow-400 font-bold">Grower Discount (%) <span className="text-sm text-white">(Optional)</span></label>
          <input
            type="number"
            value={growerDiscount}
            onChange={(e) => setGrowerDiscount(e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-yellow-400 font-bold">Market Price for Crop <span className="text-sm text-white">(Optional)</span></label>
          <input
            type="number"
            value={marketPrice}
            onChange={(e) => setMarketPrice(e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-yellow-400 font-bold">Crop Price Unit</label>
          <select
            value={cropPriceUnit}
            onChange={(e) => setCropPriceUnit(e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          >
            <option value="bu">$/bu</option>
            <option value="lb">$/lb</option>
            <option value="cwt">$/cwt</option>
            <option value="ton">$/ton</option>
          </select>
        </div>
      </div>

      <h2 className="text-blue-400 text-xl font-bold mt-6 mb-2">Product Inputs</h2>
      <div className="grid grid-cols-1 gap-4">
        {seedTreatments.map((val, i) => {
          const product = productsSeedTreatment.find((p) => p["Product Name"] === val);
          const defaultRate = product?.["Application Rate in Ounces"] ?? "";
          return (
            <div key={i} className="flex items-center gap-4">
              <select
                value={val}
                onChange={(e) => handleSeedTreatmentChange(i, e.target.value)}
                className="flex-1 p-2 bg-zinc-800 text-white rounded"
              >
                <option value="">-- Select Seed Treatment Product --</option>
                {productsSeedTreatment.map((product, idx) => (
                  <option key={idx} value={product["Product Name"]}>
                    {product["Product Name"]}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder={`Rate Override (${defaultRate} oz/unit seed)`}
                value={seedTreatmentRateOverrides[i]}
                onChange={(e) => handleSeedRateOverride(i, e.target.value)}
                className="w-48 p-2 bg-zinc-800 text-white rounded"
              />
            </div>
          );
        })}

        {inFurrowFoliarProducts.map((item, i) => {
          const product = productsInFurrow.find((p) => p["Product Name"] === item.name);
          const defaultRate =
            product?.["Application Rate in Fluid Ounces"] ??
            product?.["Application Rate in Ounces"] ??
            product?.["Application Rate in Grams"] ??
            "";
          return (
            <div key={i} className="flex flex-col md:flex-row md:items-center gap-4">
              <select
                value={item.name}
                onChange={(e) => handleFoliarProductChange(i, "name", e.target.value)}
                className="flex-1 p-2 bg-zinc-800 text-white rounded"
              >
                <option value="">-- Select In-Furrow / Foliar Product --</option>
                {productsInFurrow.map((product, idx) => (
                  <option key={idx} value={product["Product Name"]}>
                    {product["Product Name"]}
                  </option>
                ))}
              </select>

              <select
                value={item.applicationType}
                onChange={(e) => handleFoliarProductChange(i, "applicationType", e.target.value)}
                className="w-40 p-2 bg-zinc-800 text-white rounded"
              >
                <option value="">-- Type --</option>
                <option value="In-Furrow">In-Furrow</option>
                <option value="Foliar">Foliar</option>
              </select>

              <input
                type="number"
                placeholder={`Rate Override (${defaultRate} oz/acre)`}
                value={foliarRateOverrides[i]}
                onChange={(e) => handleFoliarOverride(i, e.target.value)}
                className="w-48 p-2 bg-zinc-800 text-white rounded"
              />
            </div>
          );
        })}
      </div>
    </form>
  );
}
