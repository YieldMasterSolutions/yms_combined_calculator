// src/components/CalculatorForm.tsx
import React from "react";

interface CalculatorFormProps {
  selectedSeedType: string;
  setSelectedSeedType: (val: string) => void;
  acres: string;
  setAcres: (val: string) => void;
  seedingRate: string;
  setSeedingRate: (val: string) => void;
  seedingRateUnit: string;
  setSeedingRateUnit: (val: string) => void;
  overrideSeeds: string;
  setOverrideSeeds: (val: string) => void;
  marketPrice: string;
  setMarketPrice: (val: string) => void;
  cropPriceUnit: string;
  setCropPriceUnit: (val: string) => void;
  dealerDiscount: string;
  setDealerDiscount: (val: string) => void;
  growerDiscount: string;
  setGrowerDiscount: (val: string) => void;
  seedTreatments: string[];
  setSeedTreatments: (val: string[]) => void;
  inFurrowFoliarProducts: { name: string; applicationType: string }[];
  setInFurrowFoliarProducts: (
    val: { name: string; applicationType: string }[]
  ) => void;
productsSeedTreatment: Product[];
productsInFurrow: Product[];
seedTypes: SeedType[];
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
  const selectedSeed = seedTypes.find((s) => s["Seed Type"] === selectedSeedType);

  return (
    <form onSubmit={onSubmit} className="bg-zinc-800 p-6 rounded-md shadow-md grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Title & Subtext */}
      <div className="md:col-span-2 text-center mb-2">
        <h2 className="text-2xl font-semibold text-white">YMS Combined Calculator</h2>
        <p className="text-yellow-400 font-medium">Biological Program Calculator</p>
      </div>

      {/* Top Inputs */}
      <div>
        <label className="block text-white">Crop Type</label>
        <select value={selectedSeedType} onChange={(e) => setSelectedSeedType(e.target.value)} className="w-full bg-zinc-700 text-white p-2 rounded">
          <option value="">-- Select Crop --</option>
          {seedTypes.map((s, idx) => (
            <option key={idx} value={s["Seed Type"]}>{s["Seed Type"]}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-white">Number of Acres</label>
        <input value={acres} onChange={(e) => setAcres(e.target.value)} className="w-full bg-zinc-700 text-white p-2 rounded" />
      </div>

      <div>
        <label className="block text-white">Seeding Rate</label>
        <input value={seedingRate} onChange={(e) => setSeedingRate(e.target.value)} className="w-full bg-zinc-700 text-white p-2 rounded" />
      </div>

      <div>
        <label className="block text-white">Rate Unit</label>
        <select value={seedingRateUnit} onChange={(e) => setSeedingRateUnit(e.target.value)} className="w-full bg-zinc-700 text-white p-2 rounded">
          <option value="seeds/acre">seeds/acre</option>
          <option value="lbs/acre">lbs/acre</option>
          <option value="bu/acre">bu/acre</option>
        </select>
      </div>

      <div>
        <label className="block text-white">Market Price for Crop</label>
        <input value={marketPrice} onChange={(e) => setMarketPrice(e.target.value)} className="w-full bg-zinc-700 text-white p-2 rounded" />
      </div>

      <div>
        <label className="block text-white">Crop Price Unit</label>
        <select value={cropPriceUnit} onChange={(e) => setCropPriceUnit(e.target.value)} className="w-full bg-zinc-700 text-white p-2 rounded">
          <option value="bu">$/bu</option>
          <option value="lb">$/lb</option>
          <option value="cwt">$/cwt</option>
          <option value="ton">$/ton</option>
        </select>
      </div>

      {/* Seeds per Pound override (FULL WIDTH) */}
      <div className="md:col-span-2">
        <label className="block text-white">Seeds per Pound (Optional)</label>
        <input value={overrideSeeds} onChange={(e) => setOverrideSeeds(e.target.value)} className="w-full bg-zinc-700 text-white p-2 rounded" />
        {selectedSeed && (
          <p className="text-sm text-gray-400 mt-1">Default: {parseFloat(selectedSeed["Seeds/lb"]).toLocaleString()} seeds/lb</p>
        )}
      </div>

      {/* Discounts side-by-side */}
      <div>
        <label className="block text-white">Dealer Discount (%) (Optional)</label>
        <input value={dealerDiscount} onChange={(e) => setDealerDiscount(e.target.value)} className="w-full bg-zinc-700 text-white p-2 rounded" />
      </div>
      <div>
        <label className="block text-white">Grower Discount (%) (Optional)</label>
        <input value={growerDiscount} onChange={(e) => setGrowerDiscount(e.target.value)} className="w-full bg-zinc-700 text-white p-2 rounded" />
      </div>

      {/* Seed Treatments */}
      {[0, 1].map((index) => (
        <div key={index}>
          <label className="block text-white">Seed Treatment Product {index + 1} (Optional)</label>
          <select value={seedTreatments[index]} onChange={(e) => {
            const updated = [...seedTreatments];
            updated[index] = e.target.value;
            setSeedTreatments(updated);
          }} className="w-full bg-zinc-700 text-white p-2 rounded">
            <option value="">-- Select Product --</option>
            {productsSeedTreatment.map((p, i) => (
              <option key={i} value={p["Product Name"]}>{p["Product Name"]}</option>
            ))}
          </select>
        </div>
      ))}

      {/* In-Furrow / Foliar Products */}
      {inFurrowFoliarProducts.map((product, index) => (
        <div className="md:col-span-2 flex gap-2" key={index}>
          <div className="w-2/3">
            <label className="block text-white">In-Furrow/Foliar Product {index + 1} (Optional)</label>
            <select value={product.name} onChange={(e) => {
              const updated = [...inFurrowFoliarProducts];
              updated[index].name = e.target.value;
              setInFurrowFoliarProducts(updated);
            }} className="w-full bg-zinc-700 text-white p-2 rounded">
              <option value="">-- Select Product --</option>
              {productsInFurrow.map((p, i) => (
                <option key={i} value={p["Product Name"]}>{p["Product Name"]}</option>
              ))}
            </select>
          </div>
          <div className="w-1/3">
            <label className="block text-white">Type</label>
            <select value={product.applicationType} onChange={(e) => {
              const updated = [...inFurrowFoliarProducts];
              updated[index].applicationType = e.target.value;
              setInFurrowFoliarProducts(updated);
            }} className="w-full bg-zinc-700 text-white p-2 rounded">
              <option value="">-- Type --</option>
              <option value="In-Furrow">In-Furrow</option>
              <option value="Foliar">Foliar</option>
            </select>
          </div>
        </div>
      ))}

      {/* Submit Button */}
      <div className="md:col-span-2 text-center mt-4">
        <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full">Submit</button>
      </div>
    </form>
  );
};

export default CalculatorForm;
