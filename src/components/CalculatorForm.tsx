// src/components/CalculatorForm.tsx

"use client";

import React, { useState } from "react";
import { SeedType, ProductData } from "../utils/data";

interface CalculatorFormProps {
  seedTypes: SeedType[];
  productsSeedTreatment: ProductData[];
  productsInFurrow: ProductData[];
  onCalculate: (formData: FormData) => void;
}

interface FormData {
  seedType: string;
  acres: number;
  seedingRate: number;
  rateUnit: string;
  dealerDiscount: number;
  growerDiscount: number;
  seedTreatmentProducts: ProductSelection[];
  foliarProducts: ProductSelection[];
  marketPrice: number;
  priceUnit: string;
  seedsPerPoundOverride?: number;
  grower: string;
  rep: string;
}

interface ProductSelection {
  product: ProductData;
  applicationMethod: string;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  seedTypes,
  productsSeedTreatment,
  productsInFurrow,
  onCalculate,
}) => {
  const [selectedSeedType, setSelectedSeedType] = useState<string>(seedTypes[0]?.["Seed Type"] || "");
  const [acres, setAcres] = useState<number>(0);
  const [seedingRate, setSeedingRate] = useState<number>(0);
  const [rateUnit, setRateUnit] = useState<string>("seeds/acre");
  const [overrideSeeds, setOverrideSeeds] = useState<number | undefined>(undefined);
  const [marketPrice, setMarketPrice] = useState<number>(0);
  const [priceUnit, setPriceUnit] = useState<string>("bu");
  const [dealerDiscount, setDealerDiscount] = useState<number>(0);
  const [growerDiscount, setGrowerDiscount] = useState<number>(0);
  const [grower, setGrower] = useState<string>("");
  const [rep, setRep] = useState<string>("");

  const [seedTreatmentSelections, setSeedTreatmentSelections] = useState<(ProductSelection | null)[]>([null, null]);
  const [foliarSelections, setFoliarSelections] = useState<(ProductSelection | null)[]>([null, null, null, null]);

  const handleCalculateClick = () => {
    const selectedSeedTreatments = seedTreatmentSelections.filter((p): p is ProductSelection => p !== null);
    const selectedFoliarProducts = foliarSelections.filter((p): p is ProductSelection => p !== null);

    const formData: FormData = {
      seedType: selectedSeedType,
      acres,
      seedingRate,
      rateUnit,
      dealerDiscount,
      growerDiscount,
      seedTreatmentProducts: selectedSeedTreatments,
      foliarProducts: selectedFoliarProducts,
      marketPrice,
      priceUnit,
      seedsPerPoundOverride: overrideSeeds,
      grower,
      rep,
    };

    onCalculate(formData);
  };

  const renderProductOption = (product: ProductData) => {
    const size = product["Package Size"].toString().replace(/\.0$/, "");
    const unit = product["Package Units"] || "oz";
    return `${product["Product Name"]} – ${product["Product Form"]} – ${size} ${unit} ${product["Package Type"]}`;
  };

  const appMethodsSeed = ["Seed Coating", "Planter Box Treatment"];
  const appMethodsFoliar = ["In-Furrow", "Foliar"];

  return (
    <form className="space-y-4 text-sm">
      <div className="grid grid-cols-2 gap-4">
        <label>
          Grower Name:
          <input type="text" className="w-full border p-1" value={grower} onChange={e => setGrower(e.target.value)} />
        </label>
        <label>
          Dealer/Rep Name:
          <input type="text" className="w-full border p-1" value={rep} onChange={e => setRep(e.target.value)} />
        </label>
        <label>
          Crop Type:
          <select className="w-full border p-1" value={selectedSeedType} onChange={e => setSelectedSeedType(e.target.value)}>
            {seedTypes.map(seed => (
              <option key={seed["Seed Type"]} value={seed["Seed Type"]}>{seed["Seed Type"]}</option>
            ))}
          </select>
        </label>
        <label>
          Acres:
          <input type="number" className="w-full border p-1" value={acres} onChange={e => setAcres(parseFloat(e.target.value))} />
        </label>
        <label>
          Seeding Rate:
          <input type="number" className="w-full border p-1" value={seedingRate} onChange={e => setSeedingRate(parseFloat(e.target.value))} />
        </label>
        <label>
          Rate Unit:
          <select className="w-full border p-1" value={rateUnit} onChange={e => setRateUnit(e.target.value)}>
            <option value="seeds/acre">seeds/acre</option>
            <option value="lbs/acre">lbs/acre</option>
          </select>
        </label>
        <label>
          Seeds/lb Override (Optional):
          <input type="number" className="w-full border p-1" value={overrideSeeds ?? ""} onChange={e => setOverrideSeeds(e.target.value ? parseFloat(e.target.value) : undefined)} />
        </label>
        <label>
          Market Price:
          <input type="number" className="w-full border p-1" value={marketPrice} onChange={e => setMarketPrice(parseFloat(e.target.value))} />
        </label>
        <label>
          Price Unit:
          <select className="w-full border p-1" value={priceUnit} onChange={e => setPriceUnit(e.target.value)}>
            <option value="bu">$/bu</option>
            <option value="lb">$/lb</option>
            <option value="cwt">$/cwt</option>
            <option value="ton">$/ton</option>
          </select>
        </label>
        <label>
          Dealer Discount (%):
          <input type="number" className="w-full border p-1" value={dealerDiscount} onChange={e => setDealerDiscount(parseFloat(e.target.value))} />
        </label>
        <label>
          Grower Discount (%):
          <input type="number" className="w-full border p-1" value={growerDiscount} onChange={e => setGrowerDiscount(parseFloat(e.target.value))} />
        </label>
      </div>

      <div>
        <h3 className="font-bold text-blue-700 text-base mt-4">Seed Treatment Products</h3>
        {seedTreatmentSelections.map((sel, i) => (
          <div key={i} className="flex gap-2 mt-2">
            <select
              className="w-2/3 border p-1"
              value={sel?.product["Product Name"] || ""}
              onChange={(e) => {
                const product = productsSeedTreatment.find(p => p["Product Name"] === e.target.value);
                const newSelections = [...seedTreatmentSelections];
                newSelections[i] = product ? { product, applicationMethod: appMethodsSeed[0] } : null;
                setSeedTreatmentSelections(newSelections);
              }}
            >
              <option value="">Select Product</option>
              {productsSeedTreatment.map(p => (
                <option key={p["Product Name"]} value={p["Product Name"]}>{renderProductOption(p)}</option>
              ))}
            </select>
            <select
              className="w-1/3 border p-1"
              value={sel?.applicationMethod || appMethodsSeed[0]}
              onChange={(e) => {
                const newSelections = [...seedTreatmentSelections];
                if (newSelections[i]) newSelections[i]!.applicationMethod = e.target.value;
                setSeedTreatmentSelections(newSelections);
              }}
            >
              {appMethodsSeed.map(method => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-bold text-blue-700 text-base mt-4">In-Furrow / Foliar Products</h3>
        {foliarSelections.map((sel, i) => (
          <div key={i} className="flex gap-2 mt-2">
            <select
              className="w-2/3 border p-1"
              value={sel?.product["Product Name"] || ""}
              onChange={(e) => {
                const product = productsInFurrow.find(p => p["Product Name"] === e.target.value);
                const newSelections = [...foliarSelections];
                newSelections[i] = product ? { product, applicationMethod: appMethodsFoliar[0] } : null;
                setFoliarSelections(newSelections);
              }}
            >
              <option value="">Select Product</option>
              {productsInFurrow.map(p => (
                <option key={p["Product Name"]} value={p["Product Name"]}>{renderProductOption(p)}</option>
              ))}
            </select>
            <select
              className="w-1/3 border p-1"
              value={sel?.applicationMethod || appMethodsFoliar[0]}
              onChange={(e) => {
                const newSelections = [...foliarSelections];
                if (newSelections[i]) newSelections[i]!.applicationMethod = e.target.value;
                setFoliarSelections(newSelections);
              }}
            >
              {appMethodsFoliar.map(method => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleCalculateClick}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded shadow"
      >
        Calculate
      </button>
    </form>
  );
};

export default CalculatorForm;
