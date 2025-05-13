// src/app/page.tsx
"use client";

import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import CalculatorForm from "../components/CalculatorForm";
import ResultsDisplay from "../components/ResultsDisplay";
import { calculateProductCosts, ProductCalculation } from "../utils/calculations";
import { seedTypes, productsSeedTreatment, productsInFurrowFoliar } from "../utils/data";
import { ProductData } from "../utils/data";

export default function CombinedCalculator() {
  const [seedType, setSeedType] = useState("");
  const [acres, setAcres] = useState("");
  const [seedingRate, setSeedingRate] = useState("");
  const [seedingRateUnit, setSeedingRateUnit] = useState("seeds/acre");
  const [overrideSeeds, setOverrideSeeds] = useState("");
  const [seedsPerUnitOverride, setSeedsPerUnitOverride] = useState("");
  const [marketPrice, setMarketPrice] = useState("");
  const [marketPriceUnit, setMarketPriceUnit] = useState("/acre");
  const [dealerDiscount, setDealerDiscount] = useState("");
  const [growerDiscount, setGrowerDiscount] = useState("");
  const [dealerName, setDealerName] = useState("");
  const [growerName, setGrowerName] = useState("");

  const [seedResults, setSeedResults] = useState<ProductCalculation[]>([]);
  const [foliarResults, setFoliarResults] = useState<ProductCalculation[]>([]);
  const [totalCostPerAcre, setTotalCostPerAcre] = useState(0);
  const [totalUndiscountedCost, setTotalUndiscountedCost] = useState(0);
  const [totalDiscountedCost, setTotalDiscountedCost] = useState(0);
  const [breakevenYield, setBreakevenYield] = useState<number | null>(null);
  const [roi2, setRoi2] = useState<number | null>(null);
  const [roi3, setRoi3] = useState<number | null>(null);
  const [roi4, setRoi4] = useState<number | null>(null);
  const [roi5, setRoi5] = useState<number | null>(null);

  const [selectedSeedTreatmentProducts, setSelectedSeedTreatmentProducts] = useState(
    Array(2).fill({ product: {} as ProductData, applicationMethod: "" })
  );
  const [selectedFoliarProducts, setSelectedFoliarProducts] = useState(
    Array(4).fill({ product: {} as ProductData, applicationMethod: "" })
  );

  const resultRef = useRef<HTMLDivElement>(null);

  const handleProductChange = (index: number, productName: string, type: "seed" | "foliar") => {
    const target = type === "seed" ? [...selectedSeedTreatmentProducts] : [...selectedFoliarProducts];
    const match = [...productsSeedTreatment, ...productsInFurrowFoliar].find(p => p["Product Name"] === productName);
    if (match) target[index] = { ...target[index], product: match };
    if (type === "seed") {
      setSelectedSeedTreatmentProducts(target);
    } else {
      setSelectedFoliarProducts(target);
    }
  };

  const handleAppTypeChange = (index: number, method: string, type: "seed" | "foliar") => {
    const target = type === "seed" ? [...selectedSeedTreatmentProducts] : [...selectedFoliarProducts];
    target[index] = { ...target[index], applicationMethod: method };
    if (type === "seed") {
      setSelectedSeedTreatmentProducts(target);
    } else {
      setSelectedFoliarProducts(target);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!seedType || !acres || !seedingRate || !marketPrice) {
      console.warn("Missing required inputs");
      return;
    }

    const acresNum = parseFloat(acres);
    const dealer = dealerDiscount ? parseFloat(dealerDiscount) : 0;
    const grower = growerDiscount ? parseFloat(growerDiscount) : 0;
    const sRate = parseFloat(seedingRate);

    const getSeedsPerPound = (): number => {
      if (overrideSeeds) return parseFloat(overrideSeeds);
      const seedEntry = seedTypes.find((s) => s["Seed Type"] === seedType);
      return seedEntry ? parseFloat(seedEntry["Seeds/lb"]) : 0;
    };

    const getLbsPerUnit = (): number => {
      const seedEntry = seedTypes.find((s) => s["Seed Type"] === seedType);
      return seedEntry ? seedEntry["Lbs/Unit"] : 0;
    };

    const spp = getSeedsPerPound();
    const lpu = getLbsPerUnit();

    const selectedSeedProducts = selectedSeedTreatmentProducts
      .filter(p => p.product && p.product["Product Name"])
      .map(p => p.product);

    const selectedFoliarProductsFiltered = selectedFoliarProducts
      .filter(p => p.product && p.product["Product Name"] && (p.applicationMethod === "In-Furrow" || p.applicationMethod === "Foliar"))
      .map(p => p.product);

    const seedResultSet = calculateProductCosts(acresNum, selectedSeedProducts, dealer, grower, seedType, spp, lpu, sRate, seedingRateUnit);
    const foliarResultSet = calculateProductCosts(acresNum, selectedFoliarProductsFiltered, dealer, grower, seedType, spp, lpu, sRate, seedingRateUnit);

    setSeedResults(seedResultSet.productsData);
    setFoliarResults(foliarResultSet.productsData);

    const totalCost = seedResultSet.totalCostPerAcre + foliarResultSet.totalCostPerAcre;
    const totalUndiscounted = seedResultSet.totalUndiscountedCost + foliarResultSet.totalUndiscountedCost;
    const totalDiscounted = seedResultSet.totalDiscountedCost + foliarResultSet.totalDiscountedCost;

    setTotalCostPerAcre(totalCost);
    setTotalUndiscountedCost(totalUndiscounted);
    setTotalDiscountedCost(totalDi