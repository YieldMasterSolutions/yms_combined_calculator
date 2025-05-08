// src/components/CalculatorForm.tsx

import React, { useState } from "react";
import { ProductData, SeedType } from "../utils/data";

interface CalculatorFormProps {
  seedTypes: SeedType[];
  productsSeedTreatment: ProductData[];
  productsInFurrow: ProductData[];
  onSubmit: (data: any) => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  seedTypes,
  productsSeedTreatment,
  productsInFurrow,
  onSubmit,
}) => {
  const [formState, setFormState] = useState<any>({
    seedTreatmentProducts: [],
    inFurrowFoliarProducts: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (
    index: number,
    type: "seedTreatment" | "inFurrowFoliar",
    key: "product" | "applicationMethod",
    value: any
  ) => {
    setFormState((prev: any) => {
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
          <select
            name="seedType"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Seed Type</option>
            {seedTypes.map((seed) => (
              <option key={seed.name} value={seed.name}>{seed.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Acres</label>
          <input
            type="number"
            name="acres"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Seeding Rate</label>
          <input
            type="number"
            name="seedingRate"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Rate Unit</label>
          <select
            name="rateUnit"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Unit</option>
            <option value="seeds/acre">seeds/acre</option>
            <option value="lbs/acre">lbs/acre</option>
          </select>
        </div>
      </div>

      <button type="submit" className="mt-6 px-6 py-2 bg-blue-600 text-white rounded">
        Calculate
      </button>
    </form>
  );
};

export default CalculatorForm;
