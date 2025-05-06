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
  seedTreatmentProducts: ProductData[];
  foliarProducts: ProductData[];
  marketPrice: number;
  priceUnit: string;
  seedsPerPoundOverride?: number;
  grower: string;
  rep: string;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  seedTypes,
  productsSeedTreatment,
  productsInFurrow,
  onCalculate,
}) => {
  const [selectedSeedType, setSelectedSeedType] = useState<string>(
    seedTypes[0]?.["Seed Type"] || ""
  );
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

  const [seedTreatmentSelections, setSeedTreatmentSelections] = useState<string[]>(["", ""]);
  const [foliarSelections, setFoliarSelections] = useState<string[]>(["", "", "", ""]);

  const formatLabel = (product: ProductData) => {
    const size = product["Package Size"].toString().replace(/\.0$/, "");
    const unit = product["Unit"].includes("gram") ? "g" : product["Unit"];
    return `${product["Product Name"]} – ${size} ${unit} ${product["Package Type"]}`;
  };

  const handleCalculateClick = () => {
    const selectedSeedTreatments = seedTreatmentSelections
      .map(name => productsSeedTreatment.find(p => formatLabel(p) === name))
      .filter((p): p is ProductData => !!p);

    const selectedFoliarProducts = foliarSelections
      .map(name => productsInFurrow.find(p => formatLabel(p) === name))
      .filter((p): p is ProductData => !!p);

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

  return (
    <form className="space-y-4 text-sm">
      <div className="grid grid-cols-2 gap-4">
        <label>
          Grower Name:
          <input type="text" className="w-full border p-1" value={grower} onChange={e => setGrower(e.target.value)} />
        </label>
        <label>
          Rep Name:
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
          <select
            key={i}
            className="w-full border p-1 mt-1"
            value={sel}
            onChange={(e) => {
              const newSelections = [...seedTreatmentSelections];
              newSelections[i] = e.target.value;
              setSeedTreatmentSelections(newSelections);
            }}
          >
            <option value="">Select Product</option>
            {productsSeedTreatment.map(p => {
              const label = formatLabel(p);
              return (
                <option key={label} value={label}>{label}</option>
              );
            })}
          </select>
        ))}
      </div>

      <div>
        <h3 className="font-bold text-blue-700 text-base mt-4">In-Furrow / Foliar Products</h3>
        {foliarSelections.map((sel, i) => (
          <select
            key={i}
            className="w-full border p-1 mt-1"
            value={sel}
            onChange={(e) => {
              const newSelections = [...foliarSelections];
              newSelections[i] = e.target.value;
              setFoliarSelections(newSelections);
            }}
          >
            <option value="">Select Product</option>
            {productsInFurrow.map(p => {
              const label = formatLabel(p);
              return (
                <option key={label} value={label}>{label}</option>
              );
            })}
          </select>
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