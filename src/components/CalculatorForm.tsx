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
  dealerRep: string;
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
  const [dealerRep, setDealerRep] = useState<string>("");

  const [seedTreatmentSelections, setSeedTreatmentSelections] = useState<string[]>(["", ""]);
  const [foliarSelections, setFoliarSelections] = useState<string[]>(["", "", "", ""]);

  const handleCalculateClick = () => {
    const selectedSeedTreatments = seedTreatmentSelections
      .map((name) => productsSeedTreatment.find((p) => p["Product Name"] === name))
      .filter((p): p is ProductData => !!p);

    const selectedFoliarProducts = foliarSelections
      .map((name) => productsInFurrow.find((p) => p["Product Name"] === name))
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
      dealerRep,
    };

    onCalculate(formData);
  };

  const formatLabel = (product: ProductData) => {
    const size = product["Package Size"].toString().replace(/\.0$/, "");
    const unit = product["Package Units"]?.toLowerCase().includes("gram")
      ? "g"
      : product["Package Units"] || "oz";
    return `${product["Product Name"]} – ${size} ${unit} ${product["Package Type"]}`;
  };

  return (
    <form className="space-y-4 text-sm">
      <div>
        <h3 className="font-bold text-blue-700 text-base mb-2">Crop Inputs</h3>
        <div className="grid grid-cols-5 gap-4">
          <label className="font-bold text-yellow-600">
            Crop Type:
            <select className="w-full border p-1 text-black" value={selectedSeedType} onChange={e => setSelectedSeedType(e.target.value)}>
              {seedTypes.map(seed => (
                <option key={seed["Seed Type"]} value={seed["Seed Type"]}>{seed["Seed Type"]}</option>
              ))}
            </select>
          </label>
          <label className="font-bold text-yellow-600">
            Acres:
            <input type="number" className="w-full border p-1" value={acres} onChange={e => setAcres(parseFloat(e.target.value))} />
          </label>
          <label className="font-bold text-yellow-600">
            Seeding Rate:
            <input type="number" className="w-full border p-1" value={seedingRate} onChange={e => setSeedingRate(parseFloat(e.target.value))} />
          </label>
          <label className="font-bold text-yellow-600">
            Rate Unit:
            <select className="w-full border p-1 text-black" value={rateUnit} onChange={e => setRateUnit(e.target.value)}>
              <option value="seeds/acre">seeds/acre</option>
              <option value="lbs/acre">lbs/acre</option>
            </select>
          </label>
          <label className="font-bold text-yellow-600">
            Seeds/lb Override (Optional):
            <input type="number" className="w-full border p-1" value={overrideSeeds ?? ""} onChange={e => setOverrideSeeds(e.target.value ? parseFloat(e.target.value) : undefined)} />
          </label>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-blue-700 text-base mt-6 mb-2">Pricing & Contact Info</h3>
        <div className="grid grid-cols-4 gap-4">
          <label className="font-bold text-yellow-600">
            Market Price:
            <input type="number" className="w-full border p-1" value={marketPrice} onChange={e => setMarketPrice(parseFloat(e.target.value))} />
          </label>
          <label className="font-bold text-yellow-600">
            Price Unit:
            <select className="w-full border p-1 text-black" value={priceUnit} onChange={e => setPriceUnit(e.target.value)}>
              <option value="bu">$/bu</option>
              <option value="lb">$/lb</option>
              <option value="cwt">$/cwt</option>
              <option value="ton">$/ton</option>
            </select>
          </label>
          <label className="font-bold text-yellow-600">
            Grower Name:
            <input type="text" className="w-full border p-1" value={grower} onChange={e => setGrower(e.target.value)} />
          </label>
          <label className="font-bold text-yellow-600">
            Dealer/Rep Name:
            <input type="text" className="w-full border p-1" value={dealerRep} onChange={e => setDealerRep(e.target.value)} />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <label className="font-bold text-yellow-600">
            Dealer Discount (%):
            <input type="number" className="w-full border p-1" value={dealerDiscount} onChange={e => setDealerDiscount(parseFloat(e.target.value))} />
          </label>
          <label className="font-bold text-yellow-600">
            Grower Discount (%):
            <input type="number" className="w-full border p-1" value={growerDiscount} onChange={e => setGrowerDiscount(parseFloat(e.target.value))} />
          </label>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-blue-700 text-base mt-6">Seed Treatment Products</h3>
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
            {productsSeedTreatment.map(p => (
              <option key={p["Product Name"]} value={p["Product Name"]}>{formatLabel(p)}</option>
            ))}
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
            {productsInFurrow.map(p => (
              <option key={p["Product Name"]} value={p["Product Name"]}>{formatLabel(p)}</option>
            ))}
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
