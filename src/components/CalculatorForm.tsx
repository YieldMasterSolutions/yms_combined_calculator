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
  inFurrowFoliarProducts: { name: string; applicationType: string }[];
  setInFurrowFoliarProducts: (value: { name: string; applicationType: string }[]) => void;
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
  inFurrowFoliarProducts,
  setInFurrowFoliarProducts,
  productsSeedTreatment,
  productsInFurrow,
  seedTypes,
  onSubmit,
}: CalculatorFormProps) {
  const defaultSeedsPerLb =
    seedTypes.find((s) => s["Seed Type"] === selectedSeedType)?.["Seeds/lb"] || "";

  const handleProductChange = (
    index: number,
    value: string,
    type: "seed" | "foliar"
  ) => {
    if (type === "seed") {
      const newList = [...seedTreatments];
      newList[index] = value;
      setSeedTreatments(newList);
    } else {
      const newList = [...inFurrowFoliarProducts];
      newList[index].name = value;
      setInFurrowFoliarProducts(newList);
    }
  };

  const handleAppTypeChange = (index: number, value: string) => {
    const newList = [...inFurrowFoliarProducts];
    newList[index].applicationType = value;
    setInFurrowFoliarProducts(newList);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">

      {/* Crop Inputs Section */}
      <div>
        <h2 className="text-blue-400 text-xl font-bold mb-2">Crop Inputs</h2>
      </div>

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
          <label className="text-yellow-400 font-bold">
            Dealer Discount (%) <span className="text-sm text-white">(Optional)</span>
          </label>
          <input
            type="number"
            value={dealerDiscount}
            onChange={(e) => setDealerDiscount(e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          />
        </div>

        <div>
          <label className="text-yellow-400 font-bold">
            Grower Discount (%) <span className="text-sm text-white">(Optional)</span>
          </label>
          <input
            type="number"
            value={growerDiscount}
            onChange={(e) => setGrowerDiscount(e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          />
        </div>

        <div>
          <label className="text-yellow-400 font-bold">
            Market Price for Crop <span className="text-sm text-white">(Optional)</span>
          </label>
          <input
            type="number"
            value={marketPrice}
            onChange={(e) => setMarketPrice(e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          />
        </div>

        <div>
          <label className="text-yellow-400 font-bold">
            Crop Price Unit <span className="text-sm text-white">(Optional)</span>
          </label>
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

      {/* Product Inputs Section */}
      <div className="pt-2">
        <h2 className="text-blue-400 text-xl font-bold mt-6 mb-2">Product Inputs</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {seedTreatments.map((val, i) => (
            <div key={i}>
              <label className="text-yellow-400 font-bold">
                Seed Treatment Product {i + 1} <span className="text-sm text-white">(Optional)</span>
              </label>
              <select
                value={val}
                onChange={(e) => handleProductChange(i, e.target.value, "seed")}
                className="w-full p-2 bg-zinc-800 text-white rounded"
              >
                <option value="">-- Select Product --</option>
                {productsSeedTreatment.map((product, idx) => (
                  <option key={idx} value={product["Product Name"]}>
                    {product["Product Name"]}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {inFurrowFoliarProducts.map((item, i) => (
            <div key={i} className="flex gap-2">
              <div className="flex-grow">
                <label className="text-yellow-400 font-bold">
                  In-Furrow/Foliar Product {i + 1} <span className="text-sm text-white">(Optional)</span>
                </label>
                <select
                  value={item.name}
                  onChange={(e) => handleProductChange(i, e.target.value, "foliar")}
                  className="w-full p-2 bg-zinc-800 text-white rounded"
                >
                  <option value="">-- Select Product --</option>
                  {productsInFurrow.map((product, idx) => (
                    <option key={idx} value={product["Product Name"]}>
                      {product["Product Name"]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-32">
                <label className="text-yellow-400 font-bold">&nbsp;</label>
                <select
                  value={item.applicationType}
                  onChange={(e) => handleAppTypeChange(i, e.target.value)}
                  className="w-full p-2 bg-zinc-800 text-white rounded"
                >
                  <option value="">-- Type --</option>
                  <option value="In-Furrow">In-Furrow</option>
                  <option value="Foliar">Foliar</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
