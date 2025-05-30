// src/components/CalculatorForm.tsx

import React from "react";
import { ProductData, productsSeedTreatment, productsInFurrowFoliar, seedTypes } from "../utils/data";

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
  repName: string;
  setRepName: (value: string) => void;
  seedProducts: (ProductData | null)[];
  setSeedProducts: (products: (ProductData | null)[]) => void;
  foliarProducts: (ProductData | null)[];
  setFoliarProducts: (products: (ProductData | null)[]) => void;
  onCalculate: () => void;
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
  repName,
  setRepName,
  seedProducts,
  setSeedProducts,
  foliarProducts,
  setFoliarProducts,
  onCalculate,
}) => {
  const inputClass = "bg-black text-white border border-gray-400 px-2 py-1 rounded w-full";
  const labelClass = "text-yellow-500 font-semibold";
  const helperTextClass = "text-xs text-gray-300 italic mt-1";
  const sectionTitleClass = "text-xl font-bold text-blue-400 mt-6 mb-2 font-[Montserrat]";

  const renderProductDropdown = (
    products: ProductData[],
    selected: (ProductData | null)[],
    setSelected: (products: (ProductData | null)[]) => void,
    label: string,
    index: number
  ) => {
    const selectedProduct = selected[index];
    return (
      <div>
        <label className={labelClass}>{label}</label>
        <select
          className={inputClass}
          value={selectedProduct?.["Product Name"] || ""}
          onChange={(e) => {
            const product = products.find((p) => p["Product Name"] === e.target.value) || null;
            const updated = [...selected];
            updated[index] = product;
            setSelected(updated);
          }}
        >
          <option value="">-- Select Product --</option>
          {products.map((p) => (
            <option key={p["Product Name"]} value={p["Product Name"]}>
              {`${p["Product Name"]} – ${p["Package Size"]} ${p["Package Units"]} – ${p["Application Rate"]} ${p["Rate Unit"]} per ${p["Application Method"]}`}
            </option>
          ))}
        </select>
        {selectedProduct && (
          <div className={helperTextClass}>
            {`Treats ${selectedProduct["Treatment Capacity"]} ${selectedProduct["Application Method"] === "Planter Box Treatment" ? "units" : "acres"}, Rate: ${selectedProduct["Application Rate"]} ${selectedProduct["Rate Unit"]}`}
          </div>
        )}
      </div>
    );
  };

  const seedHelperText = seedType.toLowerCase().includes("corn")
    ? "Default Seeds/Unit: 80,000"
    : seedType.toLowerCase().includes("soy")
    ? "Default Seeds/Unit: 140,000"
    : "Calculated using Seeds/lb × Lbs/Unit";

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-2">
        <h2 className={sectionTitleClass}>Grower and Dealer Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Grower Name</label>
            <input className={inputClass} value={growerName} onChange={(e) => setGrowerName(e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Dealer or Account Manager Name</label>
            <input className={inputClass} value={repName} onChange={(e) => setRepName(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="md:col-span-2">
        <h2 className={sectionTitleClass}>Crop Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Seed Type</label>
            <select className={inputClass} value={seedType} onChange={(e) => setSeedType(e.target.value)}>
              <option value="">-- Select Seed Type --</option>
              {seedTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {seedType && <div className={helperTextClass}>{seedHelperText}</div>}
          </div>
          <div>
            <label className={labelClass}>Total Acres</label>
            <input className={inputClass} value={acres} onChange={(e) => setAcres(e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Seeding Rate</label>
            <input className={inputClass} value={seedingRate} onChange={(e) => setSeedingRate(e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Rate Unit</label>
            <select className={inputClass} value={seedingRateUnit} onChange={(e) => setSeedingRateUnit(e.target.value)}>
              <option value="seeds/acre">seeds/acre</option>
              <option value="lbs/acre">lbs/acre</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Override: Seeds per lb</label>
            <input className={inputClass} value={overrideSeeds} onChange={(e) => setOverrideSeeds(e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Seeds Per Unit (Override)</label>
            <input className={inputClass} value={seedsPerUnitOverride} onChange={(e) => setSeedsPerUnitOverride(e.target.value)} />
            <div className={helperTextClass}>Optional: overrides the default seeds/unit only if filled</div>
          </div>
        </div>
      </div>

      {/* Remaining layout unchanged */}
      {/* ... */}
    </form>
  );
};

export default CalculatorForm;
 