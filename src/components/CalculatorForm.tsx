// src/components/CalculatorForm.tsx
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
  setSeedTreatments: (values: string[]) => void;
  inFurrowFoliarProducts: { name: string; applicationType: string }[];
  setInFurrowFoliarProducts: (values: { name: string; applicationType: string }[]) => void;
  seedTypes: SeedType[];
  productsSeedTreatment: Product[];
  productsInFurrow: Product[];
  onSubmit: (e: React.FormEvent) => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({
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
  seedTypes,
  productsSeedTreatment,
  productsInFurrow,
  onSubmit,
}) => {
  const selectedSeedObj = seedTypes.find((s) => s["Seed Type"] === selectedSeedType);
  const defaultSeedsPerPound = selectedSeedObj ? selectedSeedObj["Seeds/lb"] : "";

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-800 p-4 rounded border border-zinc-700">
      {/* Crop and Acreage Inputs */}
      <div>
        <label className="block mb-1">Crop Type</label>
        <select
          value={selectedSeedType}
          onChange={(e) => setSelectedSeedType(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
        >
          <option value="">-- Select Crop --</option>
          {seedTypes.map((s, i) => (
            <option key={i} value={s["Seed Type"]}>
              {s["Seed Type"]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1">Acres</label>
        <input
          type="number"
          value={acres}
          onChange={(e) => setAcres(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
        />
      </div>

      {/* Seeding Rate and Unit */}
      <div>
        <label className="block mb-1">Seeding Rate</label>
        <input
          type="number"
          value={seedingRate}
          onChange={(e) => setSeedingRate(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Rate Unit</label>
        <select
          value={seedingRateUnit}
          onChange={(e) => setSeedingRateUnit(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
        >
          <option value="seeds/acre">seeds/acre</option>
          <option value="lbs/acre">lbs/acre</option>
          <option value="bu/acre">bu/acre</option>
        </select>
      </div>

      {/* Market Price and Unit */}
      <div>
        <label className="block mb-1">Market Price for Crop</label>
        <input
          type="number"
          value={marketPrice}
          onChange={(e) => setMarketPrice(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Crop Price Unit</label>
        <select
          value={cropPriceUnit}
          onChange={(e) => setCropPriceUnit(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
        >
          <option value="bu">$/bu</option>
          <option value="lb">$/lb</option>
          <option value="cwt">$/cwt</option>
          <option value="ton">$/ton</option>
        </select>
      </div>

      {/* Optional Inputs */}
      <div>
        <label className="block mb-1">Seeds per Pound (Optional)</label>
        <input
          type="number"
          value={overrideSeeds}
          onChange={(e) => setOverrideSeeds(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
        />
        {selectedSeedType && (
          <p className="text-sm text-zinc-400 mt-1">
            Default: {defaultSeedsPerPound.toLocaleString()} seeds/lb
          </p>
        )}
      </div>

      <div>
        <label className="block mb-1">Dealer Discount (%) (Optional)</label>
        <input
          type="number"
          value={dealerDiscount}
          onChange={(e) => setDealerDiscount(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Grower Discount (%) (Optional)</label>
        <input
          type="number"
          value={growerDiscount}
          onChange={(e) => setGrowerDiscount(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
        />
      </div>

      {/* Seed Treatment Inputs */}
      {seedTreatments.map((product, index) => (
        <div key={index}>
          <label className="block mb-1">Seed Treatment Product {index + 1} (Optional)</label>
          <select
            value={product}
            onChange={(e) => {
              const updated = [...seedTreatments];
              updated[index] = e.target.value;
              setSeedTreatments(updated);
            }}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          >
            <option value="">-- Select Product --</option>
            {productsSeedTreatment.map((p, i) => (
              <option key={i} value={p["Product Name"]}>
                {`${p["Product Name"]} – ${p["Package Size"]} ${p["Package Units"]}`}
              </option>
            ))}
          </select>
        </div>
      ))}

      {/* In-Furrow / Foliar Product Inputs */}
      {inFurrowFoliarProducts.map((product, index) => (
        <div key={index}>
          <label className="block mb-1">
            In-Furrow/Foliar Product {index + 1} (Optional)
          </label>
          <div className="flex space-x-2">
            <select
              value={product.name}
              onChange={(e) => {
                const updated = [...inFurrowFoliarProducts];
                updated[index].name = e.target.value;
                setInFurrowFoliarProducts(updated);
              }}
              className="w-2/3 p-2 bg-gray-800 border border-gray-700 rounded"
            >
              <option value="">-- Select Product --</option>
              {productsInFurrow.map((p, i) => (
                <option key={i} value={p["Product Name"]}>
                  {`${p["Product Name"]} – ${p["Package Size"]} ${p["Package Units"]}`}
                </option>
              ))}
            </select>
            <select
              value={product.applicationType}
              onChange={(e) => {
                const updated = [...inFurrowFoliarProducts];
                updated[index].applicationType = e.target.value;
                setInFurrowFoliarProducts(updated);
              }}
              className="w-1/3 p-2 bg-gray-800 border border-gray-700 rounded"
            >
              <option value="">-- Type --</option>
              <option value="In-Furrow">In-Furrow</option>
              <option value="Foliar">Foliar</option>
            </select>
          </div>
        </div>
      ))}

      <div className="col-span-1 md:col-span-2 text-center mt-4">
        <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full text-lg">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CalculatorForm;
