import React from "react";
import type { Product, SeedType } from "../utils/types";

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
  dealerDiscount: string;
  setDealerDiscount: (value: string) => void;
  growerDiscount: string;
  setGrowerDiscount: (value: string) => void;
  seedTreatments: string[];
  setSeedTreatments: (value: string[]) => void;
  inFurrowFoliarProducts: { name: string; applicationType: string }[];
  setInFurrowFoliarProducts: (value: { name: string; applicationType: string }[]) => void;
  onSubmit: (e: React.FormEvent) => void;
  seedTypes: SeedType[];
  productsSeedTreatment: Product[];
  productsInFurrow: Product[];
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
  dealerDiscount,
  setDealerDiscount,
  growerDiscount,
  setGrowerDiscount,
  seedTreatments,
  setSeedTreatments,
  inFurrowFoliarProducts,
  setInFurrowFoliarProducts,
  onSubmit,
  seedTypes,
  productsSeedTreatment,
  productsInFurrow,
}) => {
  const handleSeedTreatmentChange = (index: number, value: string) => {
    const updated = [...seedTreatments];
    updated[index] = value;
    setSeedTreatments(updated);
  };

  const handleFoliarChange = (index: number, field: "name" | "applicationType", value: string) => {
    const updated = [...inFurrowFoliarProducts];
    updated[index] = { ...updated[index], [field]: value };
    setInFurrowFoliarProducts(updated);
  };

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 bg-zinc-800 p-4 rounded border border-zinc-700">

      {/* Mandatory Inputs */}
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
        <label className="block mb-1">Acres to be Planted</label>
        <input type="number" value={acres} onChange={(e) => setAcres(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-700 rounded" />
      </div>

      <div>
        <label className="block mb-1">Seeding Rate</label>
        <input type="number" value={seedingRate} onChange={(e) => setSeedingRate(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-700 rounded" />
      </div>

      <div>
        <label className="block mb-1">Seeding Rate Units</label>
        <select value={seedingRateUnit} onChange={(e) => setSeedingRateUnit(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-700 rounded">
          <option value="seeds/acre">seeds/acre</option>
          <option value="lbs/acre">lbs/acre</option>
          <option value="bu/acre">bu/acre</option>
        </select>
      </div>

      <div>
        <label className="block mb-1">Market Price for Crop</label>
        <input type="number" value={marketPrice} onChange={(e) => setMarketPrice(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-700 rounded" />
      </div>

      {/* Optional Inputs */}
      <div>
        <label className="block mb-1">Seeds per Pound Override</label>
        <input type="number" value={overrideSeeds} onChange={(e) => setOverrideSeeds(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-700 rounded" />
      </div>

      <div>
        <label className="block mb-1">Dealer Discount (%)</label>
        <input type="number" value={dealerDiscount} onChange={(e) => setDealerDiscount(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-700 rounded" />
      </div>

      <div>
        <label className="block mb-1">Grower Discount (%)</label>
        <input type="number" value={growerDiscount} onChange={(e) => setGrowerDiscount(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-700 rounded" />
      </div>

      {/* Seed Treatment Products */}
      {[0, 1].map((index) => (
        <div key={`seed-treatment-${index}`}>
          <label className="block mb-1">Seed Treatment Product {index + 1}</label>
          <select
            value={seedTreatments[index] || ""}
            onChange={(e) => handleSeedTreatmentChange(index, e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          >
            <option value="">-- Select Product --</option>
            {productsSeedTreatment.map((p, i) => (
              <option key={i} value={p["Product Name"]}>
                {`${p["Product Name"]} - ${p["Package Size"]} ${p["Package Units"]}`}
              </option>
            ))}
          </select>
        </div>
      ))}

      {/* In-Furrow/Foliar Products */}
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={`infurrow-${index}`} className="grid grid-cols-2 gap-2">
          <div>
            <label className="block mb-1">In-Furrow/Foliar Product {index + 1}</label>
            <select
              value={inFurrowFoliarProducts[index]?.name || ""}
              onChange={(e) => handleFoliarChange(index, "name", e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            >
              <option value="">-- Select Product --</option>
              {productsInFurrow.map((p, i) => (
                <option key={i} value={p["Product Name"]}>
                  {`${p["Product Name"]} - ${p["Package Size"]} ${p["Package Units"]}`}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Application Type</label>
            <select
              value={inFurrowFoliarProducts[index]?.applicationType || ""}
              onChange={(e) => handleFoliarChange(index, "applicationType", e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            >
              <option value="">-- Select --</option>
              <option value="In-Furrow">In-Furrow</option>
              <option value="Foliar">Foliar</option>
            </select>
          </div>
        </div>
      ))}

      <div className="text-center">
        <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full text-lg">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CalculatorForm;
