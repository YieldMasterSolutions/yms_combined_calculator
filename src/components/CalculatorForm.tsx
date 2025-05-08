// src/components/CalculatorForm.tsx

import React, { useState } from "react";
import { ProductData, SeedType, FormData } from "../utils/data";

interface CalculatorFormProps {
  seedTypes: SeedType[];
  productsSeedTreatment: ProductData[];
  productsInFurrow: ProductData[];
  onSubmit: (data: FormData) => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  seedTypes,
  productsSeedTreatment,
  productsInFurrow,
  onSubmit,
}) => {
  const [formState, setFormState] = useState<FormData>({
    seedType: "",
    acres: 0,
    seedingRate: 0,
    rateUnit: "",
    dealerDiscount: 0,
    growerDiscount: 0,
    marketPrice: undefined,
    cropPriceUnit: "",
    seedsPerPoundOverride: 0,
    lbsPerUnit: 50,
    seedTreatmentProducts: [],
    inFurrowFoliarProducts: [],
    growerName: "",
    repName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: name === "acres" || name === "seedingRate" || name === "dealerDiscount" || name === "growerDiscount" || name === "seedsPerPoundOverride" || name === "lbsPerUnit"
        ? Number(value)
        : value,
    }));
  };

  const handleProductChange = (
    index: number,
    type: "seedTreatment" | "inFurrowFoliar",
    key: "product" | "applicationMethod",
    value: any
  ) => {
    setFormState((prev) => {
      const listKey = type === "seedTreatment" ? "seedTreatmentProducts" : "inFurrowFoliarProducts";
      const updatedList = [...(prev[listKey] || [])];
      updatedList[index] = { ...updatedList[index], [key]: value };
      return { ...prev, [listKey]: updatedList };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formState);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold text-yellow-600 mb-4">Crop Inputs</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold text-gray-700">Seed Type</label>
          <select name="seedType" onChange={handleChange} className="w-full border p-2 rounded" required>
            <option value="">Select Seed Type</option>
            {seedTypes.map((seed) => (
              <option key={seed["Seed Type"]} value={seed["Seed Type"]}>{seed["Seed Type"]}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Acres</label>
          <input type="number" name="acres" onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Seeding Rate</label>
          <input type="number" name="seedingRate" onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Rate Unit</label>
          <select name="rateUnit" onChange={handleChange} className="w-full border p-2 rounded" required>
            <option value="">Select Unit</option>
            <option value="seeds/acre">seeds/acre</option>
            <option value="lbs/acre">lbs/acre</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Seeds/lb Override</label>
          <input type="number" name="seedsPerPoundOverride" onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Lbs/Unit</label>
          <input type="number" name="lbsPerUnit" onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Dealer Discount (%)</label>
          <input type="number" name="dealerDiscount" onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Grower Discount (%)</label>
          <input type="number" name="growerDiscount" onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Market Price</label>
          <input type="number" name="marketPrice" onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Crop Price Unit</label>
          <select name="cropPriceUnit" onChange={handleChange} className="w-full border p-2 rounded">
            <option value="">Select Unit</option>
            <option value="$/bu">$/bu</option>
            <option value="$/lb">$/lb</option>
            <option value="$/cwt">$/cwt</option>
            <option value="$/ton">$/ton</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Grower Name</label>
          <input type="text" name="growerName" onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Dealer/Rep Name</label>
          <input type="text" name="repName" onChange={handleChange} className="w-full border p-2 rounded" />
        </div>
      </div>

      <h2 className="text-xl font-bold text-yellow-600 mt-6 mb-2">Seed Treatment Products</h2>
      {[0, 1].map((i) => (
        <div key={i} className="grid grid-cols-2 gap-4 mb-2">
          <select
            value={formState.seedTreatmentProducts[i]?.product?.["Product Name"] || ""}
            onChange={(e) => handleProductChange(i, "seedTreatment", "product", productsSeedTreatment.find(p => p["Product Name"] === e.target.value))}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Seed Treatment Product</option>
            {productsSeedTreatment.map((p) => (
              <option key={p["Product Name"]} value={p["Product Name"]}>{p["Product Name"]}</option>
            ))}
          </select>
          <select
            value={formState.seedTreatmentProducts[i]?.applicationMethod || ""}
            onChange={(e) => handleProductChange(i, "seedTreatment", "applicationMethod", e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Application Method</option>
            <option value="Seed Coating">Seed Coating</option>
            <option value="Planter Box Treatment">Planter Box Treatment</option>
          </select>
        </div>
      ))}

      <h2 className="text-xl font-bold text-yellow-600 mt-6 mb-2">In-Furrow / Foliar Products</h2>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="grid grid-cols-2 gap-4 mb-2">
          <select
            value={formState.inFurrowFoliarProducts[i]?.product?.["Product Name"] || ""}
            onChange={(e) => handleProductChange(i, "inFurrowFoliar", "product", productsInFurrow.find(p => p["Product Name"] === e.target.value))}
            className="w-full border p-2 rounded"
          >
            <option value="">Select In-Furrow / Foliar Product</option>
            {productsInFurrow.map((p) => (
              <option key={p["Product Name"]} value={p["Product Name"]}>{p["Product Name"]}</option>
            ))}
          </select>
          <select
            value={formState.inFurrowFoliarProducts[i]?.applicationMethod || ""}
            onChange={(e) => handleProductChange(i, "inFurrowFoliar", "applicationMethod", e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Application Method</option>
            <option value="In-Furrow">In-Furrow</option>
            <option value="Foliar">Foliar</option>
          </select>
        </div>
      ))}

      <button type="submit" className="mt-6 px-6 py-2 bg-blue-600 text-white rounded">
        Calculate
      </button>
    </form>
  );
};

export default CalculatorForm;
