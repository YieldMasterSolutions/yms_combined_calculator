"use client";
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
  productsSeedTreatment: any[];
  productsInFurrow: any[];
  seedTypes: any[];
  onSubmit: (e: React.FormEvent) => void;
}

export default function CalculatorForm({
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
  productsSeedTreatment,
  productsInFurrow,
  seedTypes,
  onSubmit,
}: CalculatorFormProps) {
  const defaultSeedsPerLb =
    seedTypes.find((s) => s["Seed Type"] === selectedSeedType)?.["Seeds/lb"] ||
    "";

  const handleProductChange = (
    index: number,
    value: string,
    type: "seed" | "foliar"
  ) => {
    if (type === "seed") {
      const newList = [...seedTreatments];
      newList[index] = value;
      setSeedTreatments(newList);
    } else {
      const newList = [...inFurrowFoliarProducts];
      newList[index].name = value;
      setInFurrowFoliarProducts(newList);
    }
  };

  const handleAppTypeChange = (index: number, value: string) => {
    const newList = [...inFurrowFoliarProducts];
    newList[index].applicationType = value;
    setInFurrowFoliarProducts(newList);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-white mb-2">Biological Program Calculator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>Crop Type</label>
          <select
            value={selectedSeedType}
            onChange={(e) => setSelectedSeedType(e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          >
            <option value="">-- Select --</option>
            {seedTypes.map((seed, i) => (
              <option key={i} value={seed["Seed Type"]}>
                {seed["Seed Type"]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Number of Acres</label>
          <input
            type="number"
            value={acres}
            onChange={(e) => setAcres(e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          />
        </div>

        <div>
          <label>Seeding Rate</label>
          <input
            type="number"
            value={seedingRate}
            onChange={(e) => setSeedingRate(e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          />
        </div>

        <div>
          <label>Rate Unit</label>
          <select
            value={seedingRateUnit}
            onChange={(e) => setSeedingRateUnit(e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          >
            <option value="seeds/acre">seeds/acre</option>
            <option value="lbs/acre">lbs/acre</option>
            <option value="bu/acre">bu/acre</option>
          </select>
        </div>

        <div>
          <label>Market Price for Crop</label>
          <input
            type="number"
            value={marketPrice}
            onChange={(e) => setMarketPrice(e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          />
        </div>

        <div>
          <label>Crop Price Unit</label>
          <select
            value={cropPriceUnit}
            onChange={(e) => setCropPriceUnit(e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          >
            <option value="bu">$/bu</option>
            <option value="lb">$/lb</option>
            <option value="cwt">$/cwt</option>
            <option value="ton">$/ton</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label>Seeds per Pound Override (Optional)</label>
          <input
            type="number"
            value={overrideSeeds}
            onChange={(e) => setOverrideSeeds(e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          />
          {selectedSeedType && (
            <p className="text-sm text-gray-400 mt-1">
              Default: {defaultSeedsPerLb} seeds/lb
            </p>
          )}
        </div>

        <div>
          <label>Dealer Discount (%) (Optional)</label>
          <input
            type="number"
            value={dealerDiscount}
            onChange={(e) => setDealerDiscount(e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          />
        </div>

        <div>
          <label>Grower Discount (%) (Optional)</label>
          <input
            type="number"
            value={growerDiscount}
            onChange={(e) => setGrowerDiscount(e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded"
          />
        </div>

        {seedTreatments.map((val, i) => (
          <div key={i} className="col-span-1">
            <label>Seed Treatment Product {i + 1} (Optional)</label>
            <select
              value={val}
              onChange={(e) => handleProductChange(i, e.target.value, "seed")}
              className="w-full p-2 bg-zinc-800 text-white rounded"
            >
              <option value="">-- Select Product --</option>
              {productsSeedTreatment.map((product, idx) => (
                <option key={idx} value={product["Product Name"]}>
                  {product["Product Name"]}
                </option>
              ))}
            </select>
          </div>
        ))}

        {inFurrowFoliarProducts.map((item, i) => (
          <div key={i} className="flex gap-2">
            <div className="flex-grow">
              <label>In-Furrow/Foliar Product {i + 1} (Optional)</label>
              <select
                value={item.name}
                onChange={(e) => handleProductChange(i, e.target.value, "foliar")}
                className="w-full p-2 bg-zinc-800 text-white rounded"
              >
                <option value="">-- Select Product --</option>
                {productsInFurrow.map((product, idx) => (
                  <option key={idx} value={product["Product Name"]}>
                    {product["Product Name"]}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-32">
              <label>&nbsp;</label>
              <select
                value={item.applicationType}
                onChange={(e) => handleAppTypeChange(i, e.target.value)}
                className="w-full p-2 bg-zinc-800 text-white rounded"
              >
                <option value="">-- Type --</option>
                <option value="In-Furrow">In-Furrow</option>
                <option value="Foliar">Foliar</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </form>
  );
}
