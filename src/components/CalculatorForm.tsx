// src/components/CalculatorForm.tsx

import React from "react";
import {
  ProductData,
  seedTypes,
  productsSeedTreatment,
  productsInFurrowFoliar,
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
  return (
    <form className="space-y-6">
      {/* Grower & Rep Info */}
      <div>
        <label className="block">Grower Name</label>
        <input type="text" value={growerName} onChange={(e) => setGrowerName(e.target.value)} />
        <label className="block">Rep Name</label>
        <input type="text" value={repName} onChange={(e) => setRepName(e.target.value)} />
      </div>

      {/* Crop Inputs */}
      <div>
        <h2 className="section-header-blue">Crop Inputs</h2>
        <label className="block">Seed Type</label>
        <select value={seedType} onChange={(e) => setSeedType(e.target.value)}>
          <option value="">-- Select Seed Type --</option>
          {seedTypes.map((seed) => (
            <option key={seed["Seed Type"]} value={seed["Seed Type"]}>
              {seed["Seed Type"]}
            </option>
          ))}
        </select>

        <label className="block">Total Acres</label>
        <input type="number" value={acres} onChange={(e) => setAcres(e.target.value)} />

        <label className="block">Seeding Rate</label>
        <input type="number" value={seedingRate} onChange={(e) => setSeedingRate(e.target.value)} />

        <label className="block">Rate Unit</label>
        <select value={seedingRateUnit} onChange={(e) => setSeedingRateUnit(e.target.value)}>
          <option value="seeds/acre">seeds/acre</option>
          <option value="lbs/acre">lbs/acre</option>
        </select>

        <label className="block">Override: Seeds per lb</label>
        <input type="number" value={overrideSeeds} onChange={(e) => setOverrideSeeds(e.target.value)} />

        <label className="block">Seeds Per Unit (Override)</label>
        <input
          type="number"
          value={seedsPerUnitOverride}
          onChange={(e) => setSeedsPerUnitOverride(e.target.value)}
        />
      </div>

      {/* Market & ROI Inputs */}
      <div>
        <h2 className="section-header-blue">Market and ROI Inputs</h2>
        <label className="block">Market Price</label>
        <input type="number" value={marketPrice} onChange={(e) => setMarketPrice(e.target.value)} />

        <label className="block">Market Unit</label>
        <select value={marketPriceUnit} onChange={(e) => setMarketPriceUnit(e.target.value)}>
          <option value="bu">bu</option>
          <option value="cwt">cwt</option>
          <option value="ton">ton</option>
        </select>

        <label className="block">Dealer Discount %</label>
        <input type="number" value={dealerDiscount} onChange={(e) => setDealerDiscount(e.target.value)} />

        <label className="block">Grower Discount %</label>
        <input type="number" value={growerDiscount} onChange={(e) => setGrowerDiscount(e.target.value)} />
      </div>

      {/* Product Inputs */}
      <div>
        <h2 className="section-header-blue">Product Inputs</h2>
        <h3 className="label-yellow">Seed Treatment Products</h3>
        {seedProducts.map((_, idx) => (
          <div key={idx}>
            <label>Seed Treatment Product {idx + 1}</label>
            <select
              value={seedProducts[idx]?.Name || ""}
              onChange={(e) => {
                const selected = productsSeedTreatment.find((p) => p.Name === e.target.value) || null;
                const updated = [...seedProducts];
                updated[idx] = selected;
                setSeedProducts(updated);
              }}
            >
              <option value="">-- Select Product --</option>
              {productsSeedTreatment.map((product) => (
                <option key={product.Name} value={product.Name}>
                  {`${product.Name} – ${product["Package Size"]} ${product["Package Units"]} – ${product["Application Rate"]} ${product["Application Rate Unit"]} per ${product["Application Method"]}`}
                </option>
              ))}
            </select>
          </div>
        ))}

        <h3 className="label-yellow">In-Furrow / Foliar Products</h3>
        {foliarProducts.map((_, idx) => (
          <div key={idx}>
            <label>Foliar/In-Furrow Product {idx + 1}</label>
            <select
              value={foliarProducts[idx]?.Name || ""}
              onChange={(e) => {
                const selected = productsInFurrowFoliar.find((p) => p.Name === e.target.value) || null;
                const updated = [...foliarProducts];
                updated[idx] = selected;
                setFoliarProducts(updated);
              }}
            >
              <option value="">-- Select Product --</option>
              {productsInFurrowFoliar.map((product) => (
                <option key={product.Name} value={product.Name}>
                  {`${product.Name} – ${product["Package Size"]} ${product["Package Units"]} – ${product["Application Rate"]} ${product["Application Rate Unit"]} per ${product["Application Method"]}`}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <button type="button" onClick={onCalculate} className="bg-blue-600 text-white px-4 py-2 rounded">
        Calculate
      </button>
    </form>
  );
};

export default CalculatorForm;
