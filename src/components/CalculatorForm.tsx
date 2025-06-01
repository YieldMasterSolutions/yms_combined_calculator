// src/components/CalculatorForm.tsx

import React from "react";
import {
  ProductData,
  productsSeedTreatment,
  productsInFurrowFoliar,
  seedTypes,
} from "../utils/data";

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
  const labelClass = "text-gray-300 font-semibold text-sm";
  const helperClass = "text-sm italic mt-1 text-black dark:text-gray-400";
  const sectionTitleClass = "text-2xl font-bold text-yellow-400 mt-6 mb-2 font-[Montserrat]";

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
              {`${p["Product Name"]} – ${p["Package Size"]} ${p["Package Units"]} – ${p["Application Rate"]} ${p["Application Rate Unit"]}`}
            </option>
          ))}
        </select>
        {selectedProduct && (
          <div className={helperClass}>
            {`Treats approximately ${(parseFloat(String(selectedProduct["Package Size"])) /
              parseFloat(String(selectedProduct["Application Rate"])) || 0).toFixed(1)} ${
              selectedProduct["Application Method"] === "Planter Box Treatment" ? "units" : "acres"
            }`}
          </div>
        )}
      </div>
    );
  };

  return (
    <form className="space-y-6">
      <div>
        <h2 className={sectionTitleClass}>Grower and Dealer Information</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Grower Name (Optional)</label>
            <input className={inputClass} value={growerName} onChange={(e) => setGrowerName(e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Dealer or Account Manager Name (Optional)</label>
            <input className={inputClass} value={repName} onChange={(e) => setRepName(e.target.value)} />
          </div>
        </div>
      </div>

      <div>
        <h2 className={sectionTitleClass}>Crop Inputs</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Seed Type</label>
            <select className={inputClass} value={seedType} onChange={(e) => setSeedType(e.target.value)}>
              <option value="">-- Select Seed Type --</option>
              {seedTypes.map((type) => (
                <option key={type["Seed Type"]} value={type["Seed Type"]}>
                  {type["Seed Type"]}
                </option>
              ))}
            </select>
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
            <label className={labelClass}>Override: Seeds per lb (Optional)</label>
            <input className={inputClass} value={overrideSeeds} onChange={(e) => setOverrideSeeds(e.target.value)} />
            <div className={helperClass}>Default: Based on crop — e.g. Soybeans = 2800, Wheat = 18000</div>
          </div>
          <div>
            <label className={labelClass}>Seeds Per Unit (Override) (Optional)</label>
            <input className={inputClass} value={seedsPerUnitOverride} onChange={(e) => setSeedsPerUnitOverride(e.target.value)} />
            <div className={helperClass}>Optional: Default varies — e.g. Corn = 80000, Soy = 140000</div>
          </div>
        </div>
      </div>

      <div>
        <h2 className={sectionTitleClass}>Market and ROI Inputs</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Market Price (Optional)</label>
            <input className={inputClass} value={marketPrice} onChange={(e) => setMarketPrice(e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Market Unit (Optional)</label>
            <select className={inputClass} value={marketPriceUnit} onChange={(e) => setMarketPriceUnit(e.target.value)}>
              <option value="bushel">bushel</option>
              <option value="cwt">cwt</option>
              <option value="ton">ton</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Dealer Discount % (Optional)</label>
            <input className={inputClass} value={dealerDiscount} onChange={(e) => setDealerDiscount(e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Grower Discount % (Optional)</label>
            <input className={inputClass} value={growerDiscount} onChange={(e) => setGrowerDiscount(e.target.value)} />
          </div>
        </div>
      </div>

      <div>
        <h2 className={sectionTitleClass}>Product Inputs</h2>
        <div className="text-yellow-400 font-bold mb-2">Seed Treatment Products</div>
        <div className="grid md:grid-cols-2 gap-4">
          {renderProductDropdown(productsSeedTreatment, seedProducts, setSeedProducts, "Seed Treatment Product 1", 0)}
          {renderProductDropdown(productsSeedTreatment, seedProducts, setSeedProducts, "Seed Treatment Product 2", 1)}
        </div>
        <div className="text-yellow-400 font-bold mt-4 mb-2">In-Furrow / Foliar Products</div>
        <div className="grid md:grid-cols-2 gap-4">
          {renderProductDropdown(productsInFurrowFoliar, foliarProducts, setFoliarProducts, "In-Furrow/Foliar Product 1", 0)}
          {renderProductDropdown(productsInFurrowFoliar, foliarProducts, setFoliarProducts, "In-Furrow/Foliar Product 2", 1)}
          {renderProductDropdown(productsInFurrowFoliar, foliarProducts, setFoliarProducts, "In-Furrow/Foliar Product 3", 2)}
          {renderProductDropdown(productsInFurrowFoliar, foliarProducts, setFoliarProducts, "In-Furrow/Foliar Product 4", 3)}
        </div>
      </div>

      <div className="text-center pt-6">
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded text-lg shadow"
          onClick={onCalculate}
        >
          Calculate
        </button>
      </div>
    </form>
  );
};

export default CalculatorForm;