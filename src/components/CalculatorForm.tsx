// src/components/CalculatorForm.tsx
"use client";

import React from "react";
import { getDefaultSeedsPerUnit } from "../utils/calculations";

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
  onSubmit: (e: React.FormEvent) => void;
  seedTypes: { "Seed Type": string; "Seeds/lb": number }[];
  productsSeedTreatment: { [key: string]: string | number }[];
  productsInFurrow: { [key: string]: string | number }[];
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
  onSubmit,
  seedTypes,
  productsSeedTreatment,
  productsInFurrow,
}: CalculatorFormProps) {
  const defaultSeedsPerLb =
    seedTypes.find((s) => s["Seed Type"] === selectedSeedType)?.["Seeds/lb"] || "";

  const handleProductChange = (index: number, value: string, type: "seed" | "foliar") => {
    if (type === "seed") {
      const updated = [...seedTreatments];
      updated[index] = value;
      setSeedTreatments(updated);
    } else {
      const updated = [...inFurrowFoliarProducts];
      updated[index].name = value;
      setInFurrowFoliarProducts(updated);
    }
  };

  const handleRateChange = (index: number, value: string, type: "seed" | "foliar") => {
    if (type === "seed") {
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
      {/* Crop Inputs */}
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
            Seeds/lb Override <span className="text-white text-sm">(Optional)</span>
          </label>
          <input
            type="number"
            value={overrideSeeds}
            onChange={(e) => setOverrideSeeds(e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          />
          <p className="text-sm text-gray-400 mt-1">Default: {defaultSeedsPerLb}</p>
        </div>
        <div>
          <label className="text-yellow-400 font-bold">Dealer Discount (%)</label>
          <input
            type="number"
            value={dealerDiscount}
            onChange={(e) => setDealerDiscount(e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          />
        </div>
        <div>
          <label className="text-yellow-400 font-bold">Grower Discount (%)</label>
          <input
            type="number"
            value={growerDiscount}
            onChange={(e) => setGrowerDiscount(e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          />
        </div>
        <div>
          <label className="text-yellow-400 font-bold">Market Price (Optional)</label>
          <input
            type="number"
            value={marketPrice}
            onChange={(e) => setMarketPrice(e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          />
        </div>
        <div>
          <label className="text-yellow-400 font-bold">Price Unit</label>
          <select
            value={cropPriceUnit}
            onChange={(e) => setCropPriceUnit(e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          >
            <option value="bu">$ / bu</option>
            <option value="lb">$ / lb</option>
            <option value="cwt">$ / cwt</option>
            <option value="ton">$ / ton</option>
          </select>
        </div>
      </div>

      {/* Seed Treatment Products */}
      <h2 className="text-blue-400 text-xl font-bold mt-6 mb-2">Seed Treatments</h2>
      {seedTreatments.map((treatment, i) => (
        <div key={i} className="grid grid-cols-2 gap-2">
          <select
            value={treatment}
            onChange={(e) => handleProductChange(i, e.target.value, "seed")}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          >
            <option value="">-- Select Product --</option>
            {productsSeedTreatment.map((product, index) => (
              <option key={index} value={product["Product Name"] as string}>
                {product["Product Name"]}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Rate Override (oz/unit)"
            value={seedTreatmentRateOverrides[i]}
            onChange={(e) => handleRateChange(i, e.target.value, "seed")}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          />
        </div>
      ))}

      {/* In-Furrow / Foliar Products */}
      <h2 className="text-blue-400 text-xl font-bold mt-6 mb-2">In-Furrow / Foliar</h2>
      {inFurrowFoliarProducts.map((product, i) => (
        <div key={i} className="grid grid-cols-3 gap-2">
          <select
            value={product.name}
            onChange={(e) => handleProductChange(i, e.target.value, "foliar")}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          >
            <option value="">-- Select Product --</option>
            {productsInFurrow.map((p, index) => (
              <option key={index} value={p["Product Name"] as string}>
                {p["Product Name"]}
              </option>
            ))}
          </select>
          <select
            value={product.applicationType}
            onChange={(e) => handleAppTypeChange(i, e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          >
            <option value="">-- Application Type --</option>
            <option value="In-Furrow">In-Furrow</option>
            <option value="Foliar">Foliar</option>
          </select>
          <input
            type="number"
            placeholder="Rate Override (fl oz/acre)"
            value={foliarRateOverrides[i]}
            onChange={(e) => handleRateChange(i, e.target.value, "foliar")}
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
