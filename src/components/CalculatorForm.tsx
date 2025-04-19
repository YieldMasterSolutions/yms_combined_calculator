"use client";

import React from "react";
import { SeedType, Product } from "../utils/calculations";

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
  seedTypes: SeedType[];
  productsSeedTreatment: Product[];
  productsInFurrow: Product[];
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
  seedTypes,
  productsSeedTreatment,
  productsInFurrow,
  onSubmit,
}: CalculatorFormProps) {
  const defaultSeedsPerLb =
    seedTypes.find((s) => s["Seed Type"] === selectedSeedType)?.["Seeds/lb"] || "";

  const handleProductChange = (
    group: "seed" | "foliar",
    index: number,
    value: string
  ) => {
    if (group === "seed") {
      const updated = [...seedTreatments];
      updated[index] = value;
      setSeedTreatments(updated);
    } else {
      const updated = [...inFurrowFoliarProducts];
      updated[index].name = value;
      setInFurrowFoliarProducts(updated);
    }
  };

  const handleRateChange = (
    group: "seed" | "foliar",
    index: number,
    value: string
  ) => {
    if (group === "seed") {
      const updated = [...seedTreatmentRateOverrides];
      updated[index] = value;
      setSeedTreatmentRateOverrides(updated);
    } else {
      const updated = [...foliarRateOverrides];
      updated[index] = value;
      setFoliarRateOverrides(updated);
    }
  };

  const handleAppTypeChange = (index: number, value: string) => {
    const updated = [...inFurrowFoliarProducts];
    updated[index].applicationType = value;
    setInFurrowFoliarProducts(updated);
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

        <div>
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
            <p className="text-sm text-gray-400 mt-1">Default: {defaultSeedsPerLb} seeds/lb</p>
          )}
        </div>
      </div>

      <h2 className="text-blue-400 text-xl font-bold mt-6">Product Inputs</h2>
      {/* Seed Treatments */}
      {seedTreatments.map((val, i) => (
        <div key={i} className="grid md:grid-cols-2 gap-4 items-center mb-2">
          <select
            value={val}
            onChange={(e) => handleProductChange("seed", i, e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          >
            <option value="">-- Select Seed Treatment Product --</option>
            {productsSeedTreatment.map((prod, j) => (
              <option key={j} value={prod["Product Name"]}>
                {prod["Product Name"]}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Override Rate (oz/unit)"
            value={seedTreatmentRateOverrides[i] || ""}
            onChange={(e) => handleRateChange("seed", i, e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          />
        </div>
      ))}

      {/* In-Furrow / Foliar Products */}
      {inFurrowFoliarProducts.map((item, i) => (
        <div key={i} className="grid md:grid-cols-3 gap-4 items-center mb-2">
          <select
            value={item.name}
            onChange={(e) => handleProductChange("foliar", i, e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          >
            <option value="">-- Select Product --</option>
            {productsInFurrow.map((prod, j) => (
              <option key={j} value={prod["Product Name"]}>
                {prod["Product Name"]}
              </option>
            ))}
          </select>
          <select
            value={item.applicationType}
            onChange={(e) => handleAppTypeChange(i, e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          >
            <option value="">-- Application Type --</option>
            <option value="In-Furrow">In-Furrow</option>
            <option value="Foliar">Foliar</option>
          </select>
          <input
            type="number"
            placeholder="Override Rate (fl oz/acre)"
            value={foliarRateOverrides[i] || ""}
            onChange={(e) => handleRateChange("foliar", i, e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          />
        </div>
      ))}

      <div className="text-center pt-6">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-full text-lg"
        >
          Calculate Combined Results
        </button>
      </div>
    </form>
  );
}
