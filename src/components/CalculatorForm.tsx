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
  handleProductChange: (
    index: number,
    type: "seed" | "foliar",
    product: ProductData
  ) => void;
  handleAppTypeChange: (
    index: number,
    type: "seed" | "foliar",
    method: string
  ) => void;
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
            <select
              value={seedType}
              onChange={(e) => setSeedType(e.target.value)}
              className="w-full border p-2"
            >
              <option value="">Select a crop...</option>
              {seedTypes.map((type) => (
                <option key={type.name} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold">Acres</label>
            <input
              type="number"
              value={acres}
              onChange={(e) => setAcres(e.target.value)}
              className="w-full border p-2"
            />
          </div>
          <div>
            <label className="block font-semibold">Seeding Rate</label>
            <input
              type="number"
              value={seedingRate}
              onChange={(e) => setSeedingRate(e.target.value)}
              className="w-full border p-2"
            />
          </div>
          <div>
            <label className="block font-semibold">Rate Unit</label>
            <select
              value={seedingRateUnit}
              onChange={(e) => setSeedingRateUnit(e.target.value)}
              className="w-full border p-2"
            >
              <option value="seeds/acre">seeds/acre</option>
              <option value="lbs/acre">lbs/acre</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">Seeds per Pound (Override)</label>
            <input
              type="number"
              value={overrideSeeds}
              onChange={(e) => setOverrideSeeds(e.target.value)}
              className="w-full border p-2"
              placeholder="Optional"
            />
          </div>
          <div>
            <label className="block font-semibold">Seeds per Unit (Override)</label>
            <input
              type="number"
              value={seedsPerUnitOverride}
              onChange={(e) => setSeedsPerUnitOverride(e.target.value)}
              className="w-full border p-2"
              placeholder="Optional"
            />
          </div>
        </div>
      </div>

      {/* ROI Inputs */}
      <div>
        <h2 className="text-blue-700 text-lg font-bold mb-2">Discount & Market Price Inputs</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Dealer/Rep Name (Optional)"
            value={dealerName}
            onChange={(e) => setDealerName(e.target.value)}
            className="w-full border p-2"
          />
          <input
            type="text"
            placeholder="Grower Name (Optional)"
            value={growerName}
            onChange={(e) => setGrowerName(e.target.value)}
            className="w-full border p-2"
          />
          <input
            type="number"
            placeholder="Dealer Discount %"
            value={dealerDiscount}
            onChange={(e) => setDealerDiscount(e.target.value)}
            className="w-full border p-2"
          />
          <input
            type="number"
            placeholder="Grower Discount %"
            value={growerDiscount}
            onChange={(e) => setGrowerDiscount(e.target.value)}
            className="w-full border p-2"
          />
          <input
            type="number"
            placeholder="Market Price"
            value={marketPrice}
            onChange={(e) => setMarketPrice(e.target.value)}
            className="w-full border p-2"
          />
          <select
            value={marketPriceUnit}
            onChange={(e) => setMarketPriceUnit(e.target.value)}
            className="w-full border p-2"
          >
            <option value="">Select Price Unit</option>
            <option value="$/bu">$/bu</option>
            <option value="$/cwt">$/cwt</option>
            <option value="$/ton">$/ton</option>
          </select>
        </div>
      </div>

      {/* Seed Treatment Products */}
      <div>
        <h2 className="text-blue-700 text-lg font-bold mb-2">Seed Treatment Products</h2>
        {selectedSeedTreatmentProducts.map((entry, index) => (
          <div key={index} className="mb-4">
            <select
              className="w-full border p-2 mb-2"
              value={entry.product.name}
              onChange={(e) =>
                handleProductChange(
                  index,
                  "seed",
                  productsSeedTreatment.find((p) => p.name === e.target.value)!
                )
              }
            >
              <option value="">Select a seed treatment product...</option>
              {productsSeedTreatment.map((product) => (
                <option key={product.name} value={product.name}>
                  {`${product.name} – ${product.packageSize} ${product.packageUnit} – ${product.applicationRate} ${product.applicationRateUnit} – ${product.treatmentCapacity}`}
                </option>
              ))}
            </select>
            <select
              className="w-full border p-2"
              value={entry.applicationMethod}
              onChange={(e) => handleAppTypeChange(index, "seed", e.target.value)}
            >
              <option value="">Select Application Method</option>
              <option value="Seed Treatment">Seed Treatment</option>
              <option value="Planter Box Treatment">Planter Box Treatment</option>
            </select>
          </div>
        ))}
      </div>

      {/* In-Furrow / Foliar Products */}
      <div>
        <h2 className="text-blue-700 text-lg font-bold mb-2">In-Furrow / Foliar Products</h2>
        {selectedFoliarProducts.map((entry, index) => (
          <div key={index} className="mb-4">
            <select
              className="w-full border p-2 mb-2"
              value={entry.product.name}
              onChange={(e) =>
                handleProductChange(
                  index,
                  "foliar",
                  productsInFurrowFoliar.find((p) => p.name === e.target.value)!
                )
              }
            >
              <option value="">Select a foliar or in-furrow product...</option>
              {productsInFurrowFoliar.map((product) => (
                <option key={product.name} value={product.name}>
                  {`${product.name} – ${product.packageSize} ${product.packageUnit} – ${product.applicationRate} ${product.applicationRateUnit} – ${product.treatmentCapacity}`}
                </option>
              ))}
            </select>
            <select
              className="w-full border p-2"
              value={entry.applicationMethod}
              onChange={(e) => handleAppTypeChange(index, "foliar", e.target.value)}
            >
              <option value="">Select Application Method</option>
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