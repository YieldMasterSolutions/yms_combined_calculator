// src/components/CalculatorForm.tsx

import React, { useState } from 'react';
import { ProductData, SeedType } from '../utils/data';

export interface CalculatorFormProps {
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
    type: 'seedTreatment' | 'inFurrowFoliar',
    key: 'product' | 'applicationMethod',
    value: any
  ) => {
    setFormState((prev: any) => {
      const listKey = type === 'seedTreatment' ? 'seedTreatmentProducts' : 'inFurrowFoliarProducts';
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
          <label className="block font-semibold text-gray-700">Grower Name</label>
          <input
            type="text"
            name="growerName"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700">Rep Name</label>
          <input
            type="text"
            name="repName"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
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
              <option key={seed.name} value={seed.name}>
                {seed.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold text-gray-700">Seeds per Pound Override (Optional)</label>
          <input
            type="number"
            name="seedsPerPoundOverride"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700">Lbs per Unit</label>
          <input
            type="number"
            name="lbsPerUnit"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
      </div>

      <h2 className="text-xl font-bold text-yellow-600 mt-6 mb-4">Product Inputs</h2>

      {[0, 1].map((index) => (
        <div key={index} className="grid grid-cols-2 gap-4 mb-2">
          <div>
            <label className="block font-semibold text-gray-700">Seed Treatment Product {index + 1}</label>
            <select
              value={formState.seedTreatmentProducts?.[index]?.product || ''}
              onChange={(e) =>
                handleProductChange(index, 'seedTreatment', 'product', e.target.value)
              }
              className="w-full border p-2 rounded"
            >
              <option value="">Select Product</option>
              {productsSeedTreatment.map((product) => (
                <option key={product['Product Name']} value={product['Product Name']}>
                  {product['Product Name']}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Application Method</label>
            <select
              value={formState.seedTreatmentProducts?.[index]?.applicationMethod || ''}
              onChange={(e) =>
                handleProductChange(index, 'seedTreatment', 'applicationMethod', e.target.value)
              }
              className="w-full border p-2 rounded"
            >
              <option value="Seed Treatment">Seed Treatment</option>
            </select>
          </div>
        </div>
      ))}

      {[0, 1, 2, 3].map((index) => (
        <div key={index} className="grid grid-cols-2 gap-4 mb-2">
          <div>
            <label className="block font-semibold text-gray-700">In-Furrow / Foliar Product {index + 1}</label>
            <select
              value={formState.inFurrowFoliarProducts?.[index]?.product || ''}
              onChange={(e) =>
                handleProductChange(index, 'inFurrowFoliar', 'product', e.target.value)
              }
              className="w-full border p-2 rounded"
            >
              <option value="">Select Product</option>
              {productsInFurrow.map((product) => (
                <option key={product['Product Name']} value={product['Product Name']}>
                  {product['Product Name']}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Application Method</label>
            <select
              value={formState.inFurrowFoliarProducts?.[index]?.applicationMethod || ''}
              onChange={(e) =>
                handleProductChange(index, 'inFurrowFoliar', 'applicationMethod', e.target.value)
              }
              className="w-full border p-2 rounded"
            >
              <option value="In-Furrow">In-Furrow</option>
              <option value="Foliar">Foliar</option>
            </select>
          </div>
        </div>
      ))}

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <label className="block font-semibold text-gray-700">Dealer Discount (Optional)</label>
          <input
            type="number"
            name="dealerDiscount"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700">Grower Discount (Optional)</label>
          <input
            type="number"
            name="growerDiscount"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700">Market Price (Optional)</label>
          <input
            type="number"
            name="marketPrice"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700">Crop Price Unit</label>
          <select
            name="cropPriceUnit"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="$/bu">$/bu</option>
            <option value="$/lb">$/lb</option>
            <option value="$/cwt">$/cwt</option>
            <option value="$/ton">$/ton</option>
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
