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
  dealerDiscount: string;
  setDealerDiscount: (value: string) => void;
  growerDiscount: string;
  setGrowerDiscount: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  seedTypes: SeedType[];
  productsSeedTreatment: ProductData[];
  productsInFurrow: ProductData[];
  selectedSeedTreatmentProducts: { product: ProductData; applicationMethod: string }[];
  selectedFoliarProducts: { product: ProductData; applicationMethod: string }[];
  handleProductChange: (index: number, productName: string, type: "seed" | "foliar") => void;
  handleAppTypeChange: (index: number, method: string, type: "seed" | "foliar") => void;
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
  dealerDiscount,
  setDealerDiscount,
  growerDiscount,
  setGrowerDiscount,
  onSubmit,
  seedTypes,
  productsSeedTreatment,
  productsInFurrow,
  selectedSeedTreatmentProducts,
  selectedFoliarProducts,
  handleProductChange,
  handleAppTypeChange,
}) => {
  const getDefaultSeedsPerLb = (): string => {
    const found = seedTypes.find((s) => s["Seed Type"] === seedType);
    return found ? found["Seeds/lb"] : "N/A";
  };

  const getDefaultSeedsPerUnit = (): string => {
    if (seedType.toLowerCase() === "corn") return "80000";
    if (seedType.toLowerCase() === "soybeans") return "140000";
    const found = seedTypes.find((s) => s["Seed Type"] === seedType);
    if (!found) return "N/A";
    const seedsPerLb = parseFloat(found["Seeds/lb"]);
    const lbsPerUnit = parseFloat(String(found["Lbs/Unit"]));
    return seedsPerLb && lbsPerUnit ? Math.round(seedsPerLb * lbsPerUnit).toString() : "N/A";
  };

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-2 gap-4 bg-zinc-800 p-6 rounded border border-zinc-700 text-white"
    >
      {/* All form JSX remains unchanged */}
    </form>
  );
};

export default CalculatorForm;
