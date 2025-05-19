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
  growerName: string;
  setGrowerName: (value: string) => void;
  dealerName: string;
  setDealerName: (value: string) => void;
  selectedSeedTreatmentProducts: { product: ProductData; applicationMethod: string }[];
  setSelectedSeedTreatmentProducts: (value: { product: ProductData; applicationMethod: string }[]) => void;
  selectedFoliarProducts: { product: ProductData; applicationMethod: string }[];
  setSelectedFoliarProducts: (value: { product: ProductData; applicationMethod: string }[]) => void;
  seedTypes: SeedType[];
  productsSeedTreatment: ProductData[];
  productsInFurrowFoliar: ProductData[];
  handleProductChange: (index: number, type: "seed" | "foliar", product: ProductData) => void;
  handleAppTypeChange: (index: number, type: "seed" | "foliar", method: string) => void;
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
  dealerName,
  setDealerName,
  selectedSeedTreatmentProducts,
  setSelectedSeedTreatmentProducts,
  selectedFoliarProducts,
  setSelectedFoliarProducts,
  seedTypes,
  productsSeedTreatment,
  productsInFurrowFoliar,
  handleProductChange,
  handleAppTypeChange,
}) => {
  return (
    <form className="space-y-6">
      {/* Crop Inputs */}
      <div>
        <h2 className="text-blue-700 text-lg font-bold mb-2">Crop Inputs</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Seed Type</label>
            <select value={seedType} onChange={(e) => setSeedType(e.target.value)} className="w-full border p-2">
              <option value="">Select a crop...</option>
              {seedTypes.map((type) => (
                <option key={type["Seed Type"]} value={type["Seed Type"]}>{type["Seed Type"]}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold">Acres</label>
            <input type="number" value={acres} onChange={(e) => setAcres(e.target.value)} className="w-full border p-2" />
          </div>
          <div>
            <label className="block font-semibold">Seeding Rate</label>
            <input type="number" value={seedingRate} onChange={(e) => setSeedingRate(e.target.value)} className="w-full border p-2" />
          </div>
          <div>
            <label className="block font-semibold">Rate Unit</label>
            <select value={seedingRateUnit} onChange={(e) => setSeedingRateUnit(e.target.value)} className="w-full border p-2">
              <option value="seeds/acre">seeds/acre</option>
              <option value="lbs/acre">lbs/acre</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">Seeds per Pound (Override)</label>
            <input type="number" value={overrideSeeds} onChange={(e) => setOverrideSeeds(e.target.value)} className="w-full border p-2" placeholder="Optional" />
          </div>
          <div>
            <label className="block font-semibold">Seeds per Unit (Override)</label>
            <input type="number" value={seedsPerUnitOverride} onChange={(e) => setSeedsPerUnitOverride(e.target.value)} className="w-full border p-2" placeholder="Optional" />
          </div>
        </div>
      </div>

      {/* Discount & Market Price Inputs */}
      <div>
        <h2 className="text-blue-700 text-lg font-bold mb-2">Discount & Market Price Inputs</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Dealer/Rep Name</label>
            <input type="text" value={dealerName} onChange={(e) => setDealerName(e.target.value)} className="w-full border p-2" placeholder="Optional" />
          </div>
          <div>
            <label className="block font-semibold">Grower Name</label>
            <input type="text" value={growerName} onChange={(e) => setGrowerName(e.target.value)} className="w-full border p-2" placeholder="Optional" />
          </div>
          <div>
            <label className="block font-semibold">Dealer Discount (%)</label>
            <input type="number" value={dealerDiscount} onChange={(e) => setDealerDiscount(e.target.value)} className="w-full border p-2" placeholder="Optional" />
          </div>
          <div>
            <label className="block font-semibold">Grower Discount (%)</label>
            <input type="number" value={growerDiscount} onChange={(e) => setGrowerDiscount(e.target.value)} className="w-full border p-2" placeholder="Optional" />
          </div>
          <div>
            <label className="block font-semibold">Market Price</label>
            <input type="number" value={marketPrice} onChange={(e) => setMarketPrice(e.target.value)} className="w-full border p-2" placeholder="Optional" />
          </div>
          <div>
            <label className="block font-semibold">Price Unit</label>
            <select value={marketPriceUnit} onChange={(e) => setMarketPriceUnit(e.target.value)} className="w-full border p-2">
              <option value="">Select unit...</option>
              <option value="bu">$/bu</option>
              <option value="cwt">$/cwt</option>
              <option value="ton">$/ton</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Inputs */}
      <div>
        <h2 className="text-blue-700 text-lg font-bold mb-2">Product Inputs</h2>

        {/* Seed Treatment Products */}
        {selectedSeedTreatmentProducts.map((entry, index) => (
          <div key={index} className="mb-4">
            <label className="block font-semibold">Seed Treatment Product {index + 1}</label>
            <select
              className="w-full border p-2 mb-2"
              value={entry.product["Product Name"]}
              onChange={(e) => {
                const selected = productsSeedTreatment.find(p => p["Product Name"] === e.target.value);
                if (selected) handleProductChange(index, "seed", selected);
              }}
            >
              <option value="">Select a product...</option>
              {productsSeedTreatment.map((product) => (
                <option key={product["Product Name"]} value={product["Product Name"]}>
                  {product["Product Name"]} – {product["Package Size"]} {product["Package Units"]} – {product["Application Rate"]} {product["Application Rate Unit"]}
                </option>
              ))}
            </select>
            <select
              className="w-full border p-2"
              value={entry.applicationMethod}
              onChange={(e) => handleAppTypeChange(index, "seed", e.target.value)}
            >
              <option value="">Select application method...</option>
              <option value="Seed Treatment">Seed Treatment</option>
              <option value="Planter Box Treatment">Planter Box Treatment</option>
            </select>
          </div>
        ))}

        {/* In-Furrow / Foliar Products */}
        {selectedFoliarProducts.map((entry, index) => (
          <div key={index} className="mb-4">
            <label className="block font-semibold">In-Furrow / Foliar Product {index + 1}</label>
            <select
              className="w-full border p-2 mb-2"
              value={entry.product["Product Name"]}
              onChange={(e) => {
                const selected = productsInFurrowFoliar.find(p => p["Product Name"] === e.target.value);
                if (selected) handleProductChange(index, "foliar", selected);
              }}
            >
              <option value="">Select a product...</option>
              {productsInFurrowFoliar.map((product) => (
                <option key={product["Product Name"]} value={product["Product Name"]}>
                  {product["Product Name"]} – {product["Package Size"]} {product["Package Units"]} – {product["Application Rate"]} {product["Application Rate Unit"]}
                </option>
              ))}
            </select>
            <select
              className="w-full border p-2"
              value={entry.applicationMethod}
              onChange={(e) => handleAppTypeChange(index, "foliar", e.target.value)}
            >
              <option value="">Select application method...</option>
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
