"use client";

import { useState, useEffect } from "react";
import {
  calculateSheetPlate,
  calculateCircularPipe,
  calculateSquareHSS,
  calculateRectangularHSS,
  calculateRoundBar,
  calculateSquareBar,
  calculateFlatBar,
  TMT_IS1786_STANDARDS,
  CalculationResult,
  GOST_CHANNELS,
  UPN_CHANNELS,
  IPN_BEAMS,
  IPE_BEAMS,
  HEA_BEAMS,
  HEB_BEAMS,
  calculateProfileLookup,
  calculateAnglesLookup,
  EQUAL_ANGLES_DATA,
  UNEQUAL_ANGLES_DATA
} from "@/lib/calculators";
import { Calculator, AlertTriangle, Layers, Grid, Weight, Box } from "lucide-react";

export type CalcType =
  | "round-bar"
  | "pipe"
  | "sheet"
  | "rebar-calc"
  | "concrete"
  | "equal-angle"
  | "circular-hss"
  | "square-hss"
  | "rect-hss"
  | "square-bar"
  | "flat-bar"
  | "unequal-angle"
  | "gost-channel"
  | "upn-channel"
  | "ipn-beam"
  | "ipe-beam"
  | "hea-beam"
  | "heb-beam";

export interface CalcMeta {
  id: CalcType;
  title: string;
  subtitle: string;
  category: string;
}

export const CALCULATORS: CalcMeta[] = [
  { id: "round-bar", title: "TMT & Round Steel Bars", subtitle: "Solid round steel bars & TMT rebars", category: "Solid Bars" },
  { id: "pipe", title: "Seamless Steel Pipes", subtitle: "Seamless steel circular pipes", category: "Pipes & Hollow" },
  { id: "sheet", title: "Steel Sheets & Plates", subtitle: "Flat plates, HR/CR/GI & roofing sheets", category: "Plates & Sheets" },
  { id: "rebar-calc", title: "Rebar Quantity Calculator", subtitle: "RCC slab, beam & column bar requirement", category: "Construction Tools" },
  { id: "concrete", title: "Concrete Volume Calculator", subtitle: "Slab, footing & column mix volume", category: "Construction Tools" },
  { id: "equal-angle", title: "Structural Equal Angles", subtitle: "MS Equal Leg Structural Angles", category: "Structural Steel" },
  { id: "circular-hss", title: "Hollow structural sections - circular", subtitle: "Circular hollow structural sections", category: "Pipes & Hollow" },
  { id: "square-hss", title: "Hollow structural sections - square", subtitle: "Square hollow structural sections", category: "Pipes & Hollow" },
  { id: "rect-hss", title: "Hollow structural sections - rectangular", subtitle: "Rectangular hollow structural sections", category: "Pipes & Hollow" },
  { id: "square-bar", title: "Square steel bars", subtitle: "Square steel solid bars", category: "Solid Bars" },
  { id: "flat-bar", title: "Flat bars", subtitle: "Mild Steel Flat Bars / Flats", category: "Solid Bars" },
  { id: "unequal-angle", title: "Unequal angles", subtitle: "MS Unequal Leg Structural Angles", category: "Structural Steel" },
  { id: "gost-channel", title: "Channels - GOST", subtitle: "GOST 8240 hot-rolled channels", category: "Structural Steel" },
  { id: "upn-channel", title: "Channels - UPN", subtitle: "EN 10279 tapered flange channels", category: "Structural Steel" },
  { id: "ipn-beam", title: "Beams - IPN", subtitle: "EN 10365 tapered flange I-beams", category: "Structural Steel" },
  { id: "ipe-beam", title: "Beams - IPE", subtitle: "EN 10365 parallel flange I-beams", category: "Structural Steel" },
  { id: "hea-beam", title: "Beams - HEA (IPBL)", subtitle: "EN 10365 wide flange light H-beams", category: "Structural Steel" },
  { id: "heb-beam", title: "Beams - HEB (IPB)", subtitle: "EN 10365 wide flange standard H-beams", category: "Structural Steel" },
];

interface SteelCalculatorsProps {
  activeTabProp?: CalcType;
  onTabChange?: (tab: CalcType) => void;
}

export function SteelCalculators({ activeTabProp, onTabChange }: SteelCalculatorsProps) {
  const [internalTab, setInternalTab] = useState<CalcType>("round-bar");
  const activeTab = activeTabProp !== undefined ? activeTabProp : internalTab;

  const handleTabChange = (newTab: CalcType) => {
    if (onTabChange) {
      onTabChange(newTab);
    } else {
      setInternalTab(newTab);
    }
  };

  // State for steel inputs
  const [lengthM, setLengthM] = useState<number>(6);
  const [thicknessMm, setThicknessMm] = useState<number>(2.0);
  const [outerDiaMm, setOuterDiaMm] = useState<number>(50);
  const [sideAMm, setSideAMm] = useState<number>(50);
  const [sideBMm, setSideBMm] = useState<number>(25);
  const [tmtDiaMm, setTmtDiaMm] = useState<number>(12);
  const [selectedProfileName, setSelectedProfileName] = useState<string>("UPN 100");
  const [sheetThicknessMm, setSheetThicknessMm] = useState<number>(1.0);
  const [sheetWidthMm, setSheetWidthMm] = useState<number>(1000);
  const [sheetLengthMm, setSheetLengthMm] = useState<number>(2000);
  const [sheetPieces, setSheetPieces] = useState<number>(1);
  const [selectedAngleSize, setSelectedAngleSize] = useState<string>("20");
  const [selectedAngleThickness, setSelectedAngleThickness] = useState<string>("3");

  // State for Rebar Quantity Calculator
  const [rebarMode, setRebarMode] = useState<"count" | "slab">("count");
  const [rebarDiaMm, setRebarDiaMm] = useState<number>(12);
  const [rebarLengthM, setRebarLengthM] = useState<number>(12);
  const [rebarPieces, setRebarPieces] = useState<number>(50);
  const [slabLengthM, setSlabLengthM] = useState<number>(10);
  const [slabWidthM, setSlabWidthM] = useState<number>(6);
  const [slabSpacingMm, setSlabSpacingMm] = useState<number>(150);
  const [slabMainDiaMm, setSlabMainDiaMm] = useState<number>(12);
  const [slabDistDiaMm, setSlabDistDiaMm] = useState<number>(10);

  // State for Concrete Calculator
  const [concreteType, setConcreteType] = useState<"slab" | "beam" | "column-rect" | "column-circ">("slab");
  const [concreteLengthM, setConcreteLengthM] = useState<number>(10);
  const [concreteWidthM, setConcreteWidthM] = useState<number>(6);
  const [concreteDepthM, setConcreteDepthM] = useState<number>(0.15); // 150mm slab
  const [concreteDiaM, setConcreteDiaM] = useState<number>(0.4); // 400mm circular col
  const [concreteUnits, setConcreteUnits] = useState<number>(1);
  const [concreteGrade, setConcreteGrade] = useState<"M20" | "M25" | "M15" | "M10">("M20");

  // Sync tab with URL if rendered standalone
  useEffect(() => {
    if (activeTabProp !== undefined) return;
    const handleUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab") || params.get("calc");
      const hash = window.location.hash.replace("#", "").toLowerCase();

      const aliasMap: Record<string, CalcType> = {
        "round-bar": "round-bar",
        "tmt": "round-bar",
        "tmt-calculator": "round-bar",
        "rebar": "rebar-calc",
        "rebar-calc": "rebar-calc",
        "rebar-calculator": "rebar-calc",
        "pipe": "pipe",
        "pipe-calculator": "pipe",
        "sheet": "sheet",
        "plate": "sheet",
        "plate-calculator": "sheet",
        "equal-angle": "equal-angle",
        "structural": "equal-angle",
        "structural-calculator": "equal-angle",
        "concrete": "concrete",
        "concrete-calculator": "concrete",
      };

      const match = (tabParam && aliasMap[tabParam]) || (hash && aliasMap[hash]);
      if (match) {
        setInternalTab(match);
      }
    };

    handleUrl();
    window.addEventListener("hashchange", handleUrl);
    window.addEventListener("popstate", handleUrl);
    return () => {
      window.removeEventListener("hashchange", handleUrl);
      window.removeEventListener("popstate", handleUrl);
    };
  }, [activeTabProp]);

  // Set standard defaults per tab
  useEffect(() => {
    if (activeTab === "pipe") {
      setOuterDiaMm(48.3);
      setThicknessMm(3.2);
      setLengthM(6);
    } else if (activeTab === "circular-hss") {
      setOuterDiaMm(21.3);
      setThicknessMm(2.0);
      setLengthM(6);
    } else if (activeTab === "square-hss") {
      setSideAMm(50);
      setThicknessMm(2.5);
      setLengthM(6);
    } else if (activeTab === "rect-hss") {
      setSideAMm(60);
      setSideBMm(40);
      setThicknessMm(2.5);
      setLengthM(6);
    } else if (activeTab === "round-bar") {
      setTmtDiaMm(12);
      setLengthM(12);
    } else if (activeTab === "square-bar") {
      setSideAMm(12);
      setLengthM(6);
    } else if (activeTab === "flat-bar") {
      setSideAMm(40);
      setThicknessMm(5);
      setLengthM(6);
    } else if (activeTab === "equal-angle") {
      setSelectedAngleSize("50");
      setSelectedAngleThickness("5");
      setLengthM(6);
    } else if (activeTab === "unequal-angle") {
      setSelectedAngleSize("65x50");
      setSelectedAngleThickness("5");
      setLengthM(6);
    } else if (activeTab === "gost-channel") {
      setSelectedProfileName("№ 10");
      setLengthM(6);
    } else if (activeTab === "upn-channel") {
      setSelectedProfileName("UPN 100");
      setLengthM(6);
    } else if (activeTab === "ipn-beam") {
      setSelectedProfileName("IPN 100");
      setLengthM(6);
    } else if (activeTab === "ipe-beam") {
      setSelectedProfileName("IPE 100");
      setLengthM(6);
    } else if (activeTab === "hea-beam") {
      setSelectedProfileName("HEA 100");
      setLengthM(6);
    } else if (activeTab === "heb-beam") {
      setSelectedProfileName("HEB 100");
      setLengthM(6);
    }
  }, [activeTab]);

  // Nominal weight lookup for TMT
  const getNominalWeight = (dia: number) => {
    const std = TMT_IS1786_STANDARDS.find((s) => s.dia === dia);
    return std ? std.weightPerMeter : Math.round(0.00785 * (Math.PI / 4) * dia * dia * 1000) / 1000;
  };

  // Bundles calculation for TMT
  const getPiecesPerBundle = (dia: number) => {
    if (dia <= 8) return 10;
    if (dia <= 10) return 7;
    if (dia <= 12) return 5;
    if (dia <= 16) return 3;
    if (dia <= 20) return 2;
    return 1;
  };

  // Main Calculation Logic
  let result: CalculationResult = { weightPerMeter: 0, totalWeight: 0 };

  switch (activeTab) {
    case "sheet":
      result = calculateSheetPlate(sheetThicknessMm, sheetWidthMm, sheetLengthMm, sheetPieces);
      break;
    case "pipe":
    case "circular-hss":
      result = calculateCircularPipe(outerDiaMm, thicknessMm, lengthM);
      break;
    case "square-hss":
      result = calculateSquareHSS(sideAMm, thicknessMm, lengthM);
      break;
    case "rect-hss":
      result = calculateRectangularHSS(sideAMm, sideBMm, thicknessMm, lengthM);
      break;
    case "round-bar":
      result = calculateRoundBar(tmtDiaMm, lengthM);
      break;
    case "square-bar":
      result = calculateSquareBar(sideAMm, lengthM);
      break;
    case "flat-bar":
      result = calculateFlatBar(sideAMm, thicknessMm, lengthM);
      break;
    case "equal-angle":
    case "unequal-angle":
      result = calculateAnglesLookup(activeTab, selectedAngleSize, selectedAngleThickness, lengthM);
      break;
    case "gost-channel":
    case "upn-channel":
    case "ipn-beam":
    case "ipe-beam":
    case "hea-beam":
    case "heb-beam":
      result = calculateProfileLookup(activeTab, selectedProfileName, lengthM);
      break;
    default:
      break;
  }

  // Rebar Quantity Calculation
  let rebarResult = {
    singleWeight: 0,
    totalWeight: 0,
    metricTonnes: 0,
    bundles: 0,
    mainBarsCount: 0,
    distBarsCount: 0,
    totalRunningM: 0,
  };

  if (activeTab === "rebar-calc") {
    if (rebarMode === "count") {
      const nomWt = getNominalWeight(rebarDiaMm);
      const single = Math.round(nomWt * rebarLengthM * 100) / 100;
      const tot = Math.round(single * rebarPieces * 100) / 100;
      rebarResult = {
        singleWeight: single,
        totalWeight: tot,
        metricTonnes: Math.round((tot / 1000) * 1000) / 1000,
        bundles: Math.ceil(rebarPieces / getPiecesPerBundle(rebarDiaMm)),
        mainBarsCount: rebarPieces,
        distBarsCount: 0,
        totalRunningM: rebarPieces * rebarLengthM,
      };
    } else {
      const mainCount = Math.ceil((slabLengthM * 1000) / slabSpacingMm) + 1;
      const mainRunning = mainCount * slabWidthM;
      const mainWt = mainRunning * getNominalWeight(slabMainDiaMm);

      const distCount = Math.ceil((slabWidthM * 1000) / slabSpacingMm) + 1;
      const distRunning = distCount * slabLengthM;
      const distWt = distRunning * getNominalWeight(slabDistDiaMm);

      const rawTot = (mainWt + distWt) * 1.05; // 5% lap allowance
      const tot = Math.round(rawTot * 10) / 10;
      rebarResult = {
        singleWeight: 0,
        totalWeight: tot,
        metricTonnes: Math.round((tot / 1000) * 1000) / 1000,
        bundles: Math.ceil(tot / (12 * getNominalWeight(slabMainDiaMm) * getPiecesPerBundle(slabMainDiaMm))),
        mainBarsCount: mainCount,
        distBarsCount: distCount,
        totalRunningM: Math.round(mainRunning + distRunning),
      };
    }
  }

  // Concrete Calculation
  let concreteResult = {
    wetVolumeM3: 0,
    wetVolumeCuFt: 0,
    dryVolumeM3: 0,
    cementBags: 0,
    cementKg: 0,
    sandTonnes: 0,
    sandM3: 0,
    aggregateTonnes: 0,
    aggregateM3: 0,
    waterLitres: 0,
  };

  if (activeTab === "concrete") {
    let unitVol = 0;
    if (concreteType === "column-circ") {
      unitVol = Math.PI * Math.pow(concreteDiaM / 2, 2) * concreteDepthM;
    } else {
      unitVol = concreteLengthM * concreteWidthM * concreteDepthM;
    }
    const wetVol = Math.round(unitVol * concreteUnits * 1000) / 1000;
    const dryVol = Math.round(wetVol * 1.54 * 1000) / 1000; // Standard 1.54 multiplier

    // Grade ratios: [Cement, Sand, Aggregate, Total]
    const ratios: Record<string, [number, number, number, number]> = {
      M20: [1, 1.5, 3, 5.5],
      M25: [1, 1, 2, 4.0],
      M15: [1, 2, 4, 7.0],
      M10: [1, 3, 6, 10.0],
    };
    const [cRatio, sRatio, aRatio, totalRatio] = ratios[concreteGrade] || ratios["M20"];

    const cementVol = dryVol * (cRatio / totalRatio);
    const cementKg = Math.round(cementVol * 1440);
    const cementBags = Math.ceil(cementKg / 50);

    const sandVol = Math.round(dryVol * (sRatio / totalRatio) * 100) / 100;
    const sandTonnes = Math.round(((sandVol * 1600) / 1000) * 100) / 100;

    const aggVol = Math.round(dryVol * (aRatio / totalRatio) * 100) / 100;
    const aggTonnes = Math.round(((aggVol * 1500) / 1000) * 100) / 100;

    const waterL = Math.round(cementBags * 28);

    concreteResult = {
      wetVolumeM3: wetVol,
      wetVolumeCuFt: Math.round(wetVol * 35.3147 * 10) / 10,
      dryVolumeM3: dryVol,
      cementBags,
      cementKg,
      sandTonnes,
      sandM3: sandVol,
      aggregateTonnes: aggTonnes,
      aggregateM3: aggVol,
      waterLitres: waterL,
    };
  }

  let activeProfile: any = null;
  if (activeTab === "gost-channel") activeProfile = GOST_CHANNELS.find((p) => p.name === selectedProfileName);
  else if (activeTab === "upn-channel") activeProfile = UPN_CHANNELS.find((p) => p.name === selectedProfileName);
  else if (activeTab === "ipn-beam") activeProfile = IPN_BEAMS.find((p) => p.name === selectedProfileName);
  else if (activeTab === "ipe-beam") activeProfile = IPE_BEAMS.find((p) => p.name === selectedProfileName);
  else if (activeTab === "hea-beam") activeProfile = HEA_BEAMS.find((p) => p.name === selectedProfileName);
  else if (activeTab === "heb-beam") activeProfile = HEB_BEAMS.find((p) => p.name === selectedProfileName);

  return (
    <div
      id="calculators-container"
      className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px] lg:items-start"
    >
      {/* Sidebar Navigation */}
      <div className="lg:col-span-4 bg-[#0B192C] text-white p-4 border-r border-slate-800">
        <div className="flex items-center gap-2 mb-4 p-2 border-b border-slate-800">
          <Calculator className="w-5 h-5 text-red-400" />
          <h3 className="font-sans font-bold text-lg text-white">Select Calculator</h3>
        </div>

        {/* Mobile Dropdown */}
        <div className="block lg:hidden mb-4">
          <select
            value={activeTab}
            onChange={(e) => handleTabChange(e.target.value as CalcType)}
            className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg text-sm focus:outline-none focus:border-red-500 font-bold"
          >
            {CALCULATORS.map((calc) => (
              <option key={calc.id} value={calc.id}>
                {calc.title}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop List */}
        <div className="hidden lg:flex flex-col space-y-1.5 max-h-[680px] overflow-y-auto pr-1">
          {CALCULATORS.map((calc) => {
            const isSelected = activeTab === calc.id;
            return (
              <button
                key={calc.id}
                type="button"
                onClick={() => handleTabChange(calc.id)}
                className={`text-left p-3 rounded-xl transition-all flex flex-col ${
                  isSelected
                    ? "bg-red-600 text-white font-bold shadow-md"
                    : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                }`}
              >
                <span className="font-sans text-sm font-bold">{calc.title}</span>
                <span className={`text-[11px] font-normal mt-0.5 ${isSelected ? "text-red-100" : "text-slate-400"}`}>
                  {calc.subtitle}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Calculator Working Panel */}
      <div className="lg:col-span-8 p-6 md:p-8 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Header */}
          <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-slate-900">
                {CALCULATORS.find((c) => c.id === activeTab)?.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {activeTab === "concrete"
                  ? "Standard IS 456 mix proportions & volumetric material estimation."
                  : activeTab === "rebar-calc"
                  ? "Standard IS 1786 nominal rebar weights and bar bending estimations."
                  : "Calculated using standard steel density 7,850 kg/m³ (constant 0.00785)."}
              </p>
            </div>
            <span className="text-xs sm:text-sm bg-red-50 text-red-700 border border-red-200 px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap">
              Live Calculation
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Inputs Form */}
            <div className="space-y-4">
              {/* 1. TMT ROUND BAR */}
              {activeTab === "round-bar" && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                      IS 1786 Standard TMT Sizes (mm)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {TMT_IS1786_STANDARDS.map((std) => (
                        <button
                          key={std.dia}
                          type="button"
                          onClick={() => setTmtDiaMm(std.dia)}
                          className={`px-3 py-1.5 text-xs rounded-lg border font-bold transition-all ${
                            tmtDiaMm === std.dia
                              ? "bg-[#0B192C] text-red-400 border-[#0B192C] shadow-sm"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300"
                          }`}
                        >
                          {std.dia} mm
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Diameter, D (mm)</label>
                    <input
                      type="number"
                      value={tmtDiaMm}
                      onChange={(e) => setTmtDiaMm(Number(e.target.value))}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>
                </>
              )}

              {/* 2. REBAR QUANTITY CALCULATOR */}
              {activeTab === "rebar-calc" && (
                <>
                  <div className="flex gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setRebarMode("count")}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                        rebarMode === "count" ? "bg-red-600 text-white shadow-sm" : "text-slate-700 hover:text-slate-900"
                      }`}
                    >
                      By Bar Count & Length
                    </button>
                    <button
                      type="button"
                      onClick={() => setRebarMode("slab")}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                        rebarMode === "slab" ? "bg-red-600 text-white shadow-sm" : "text-slate-700 hover:text-slate-900"
                      }`}
                    >
                      RCC Slab Grid Spacing
                    </button>
                  </div>

                  {rebarMode === "count" ? (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Bar Diameter (mm)</label>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {[8, 10, 12, 16, 20, 25, 32].map((d) => (
                            <button
                              key={d}
                              type="button"
                              onClick={() => setRebarDiaMm(d)}
                              className={`px-2.5 py-1 text-xs rounded border font-bold ${
                                rebarDiaMm === d
                                  ? "bg-[#0B192C] text-red-400 border-[#0B192C]"
                                  : "bg-white text-slate-700 border-slate-300"
                              }`}
                            >
                              {d}mm
                            </button>
                          ))}
                        </div>
                        <input
                          type="number"
                          value={rebarDiaMm}
                          onChange={(e) => setRebarDiaMm(Number(e.target.value))}
                          className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Length per Bar (m)</label>
                        <input
                          type="number"
                          step="0.5"
                          value={rebarLengthM}
                          onChange={(e) => setRebarLengthM(Number(e.target.value))}
                          className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        />
                        <span className="text-[11px] text-slate-500 mt-0.5 block">Standard mill length is 12.0 meters</span>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Total Number of Bars (Pieces)</label>
                        <input
                          type="number"
                          value={rebarPieces}
                          onChange={(e) => setRebarPieces(Number(e.target.value))}
                          className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Slab Length (m)</label>
                          <input
                            type="number"
                            step="0.1"
                            value={slabLengthM}
                            onChange={(e) => setSlabLengthM(Number(e.target.value))}
                            className="w-full border border-slate-300 rounded-lg p-2 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Slab Width (m)</label>
                          <input
                            type="number"
                            step="0.1"
                            value={slabWidthM}
                            onChange={(e) => setSlabWidthM(Number(e.target.value))}
                            className="w-full border border-slate-300 rounded-lg p-2 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Grid Bar Spacing c/c (mm)</label>
                        <select
                          value={slabSpacingMm}
                          onChange={(e) => setSlabSpacingMm(Number(e.target.value))}
                          className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        >
                          <option value={100}>100 mm (4 inches - Heavy Load)</option>
                          <option value={125}>125 mm (5 inches)</option>
                          <option value={150}>150 mm (6 inches - Standard RCC)</option>
                          <option value={175}>175 mm (7 inches)</option>
                          <option value={200}>200 mm (8 inches)</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Main Bar Dia (mm)</label>
                          <select
                            value={slabMainDiaMm}
                            onChange={(e) => setSlabMainDiaMm(Number(e.target.value))}
                            className="w-full border border-slate-300 rounded-lg p-2 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                          >
                            <option value={8}>8 mm</option>
                            <option value={10}>10 mm</option>
                            <option value={12}>12 mm</option>
                            <option value={16}>16 mm</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Distribution Dia (mm)</label>
                          <select
                            value={slabDistDiaMm}
                            onChange={(e) => setSlabDistDiaMm(Number(e.target.value))}
                            className="w-full border border-slate-300 rounded-lg p-2 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                          >
                            <option value={8}>8 mm</option>
                            <option value={10}>10 mm</option>
                            <option value={12}>12 mm</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              {/* 3. CONCRETE VOLUME CALCULATOR */}
              {activeTab === "concrete" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Structural Element Type</label>
                    <select
                      value={concreteType}
                      onChange={(e) => setConcreteType(e.target.value as any)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    >
                      <option value="slab">RCC Roof Slab / Foundation Raft</option>
                      <option value="beam">RCC Beam</option>
                      <option value="column-rect">Rectangular / Square Column</option>
                      <option value="column-circ">Circular RCC Column</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Concrete Mix Grade (IS 456)</label>
                    <select
                      value={concreteGrade}
                      onChange={(e) => setConcreteGrade(e.target.value as any)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    >
                      <option value="M20">M20 (1 : 1.5 : 3) - Standard Residential RCC</option>
                      <option value="M25">M25 (1 : 1 : 2) - Heavy Commercial & Foundation</option>
                      <option value="M15">M15 (1 : 2 : 4) - PCC Flooring & Bedding</option>
                      <option value="M10">M10 (1 : 3 : 6) - Lean Concrete Sub-base</option>
                    </select>
                  </div>

                  {concreteType === "column-circ" ? (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Diameter D (m)</label>
                        <input
                          type="number"
                          step="0.05"
                          value={concreteDiaM}
                          onChange={(e) => setConcreteDiaM(Number(e.target.value))}
                          className="w-full border border-slate-300 rounded-lg p-2 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Height H (m)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={concreteDepthM}
                          onChange={(e) => setConcreteDepthM(Number(e.target.value))}
                          className="w-full border border-slate-300 rounded-lg p-2 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Length L (m)</label>
                          <input
                            type="number"
                            step="0.1"
                            value={concreteLengthM}
                            onChange={(e) => setConcreteLengthM(Number(e.target.value))}
                            className="w-full border border-slate-300 rounded-lg p-2 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Width W (m)</label>
                          <input
                            type="number"
                            step="0.1"
                            value={concreteWidthM}
                            onChange={(e) => setConcreteWidthM(Number(e.target.value))}
                            className="w-full border border-slate-300 rounded-lg p-2 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          {concreteType === "slab" ? "Slab Thickness (m)" : "Depth / Height (m)"}
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={concreteDepthM}
                          onChange={(e) => setConcreteDepthM(Number(e.target.value))}
                          className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        />
                        <span className="text-[11px] text-slate-500 mt-0.5 block">e.g. 0.15m = 150mm (6 inches)</span>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Number of Identical Units</label>
                    <input
                      type="number"
                      value={concreteUnits}
                      onChange={(e) => setConcreteUnits(Number(e.target.value))}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>
                </>
              )}

              {/* 4. SHEET / PLATE */}
              {activeTab === "sheet" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Thickness t (mm)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={sheetThicknessMm}
                      onChange={(e) => setSheetThicknessMm(Number(e.target.value))}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Width W (mm)</label>
                    <input
                      type="number"
                      value={sheetWidthMm}
                      onChange={(e) => setSheetWidthMm(Number(e.target.value))}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Length L (mm)</label>
                    <input
                      type="number"
                      value={sheetLengthMm}
                      onChange={(e) => setSheetLengthMm(Number(e.target.value))}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Number of pieces</label>
                    <input
                      type="number"
                      value={sheetPieces}
                      onChange={(e) => setSheetPieces(Number(e.target.value))}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>
                </>
              )}

              {/* 5. PIPES & HOLLOW SECTIONS */}
              {(activeTab === "pipe" || activeTab === "circular-hss") && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Diameter, D (mm)</label>
                    <input
                      type="number"
                      value={outerDiaMm}
                      onChange={(e) => setOuterDiaMm(Number(e.target.value))}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Thickness, t (mm)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={thicknessMm}
                      onChange={(e) => setThicknessMm(Number(e.target.value))}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>
                </>
              )}

              {(activeTab === "square-hss" || activeTab === "square-bar") && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Side, A (mm)</label>
                  <input
                    type="number"
                    value={sideAMm}
                    onChange={(e) => setSideAMm(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              )}

              {activeTab === "rect-hss" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Side, A (mm)</label>
                    <input
                      type="number"
                      value={sideAMm}
                      onChange={(e) => setSideAMm(Number(e.target.value))}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Side, B (mm)</label>
                    <input
                      type="number"
                      value={sideBMm}
                      onChange={(e) => setSideBMm(Number(e.target.value))}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>
                </>
              )}

              {activeTab === "equal-angle" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Side, A (mm)</label>
                  <select
                    value={selectedAngleSize}
                    onChange={(e) => {
                      const newSize = e.target.value;
                      setSelectedAngleSize(newSize);
                      const thicknesses = Object.keys(EQUAL_ANGLES_DATA[newSize] || {});
                      if (thicknesses.length > 0) {
                        setSelectedAngleThickness(thicknesses[0]);
                      }
                    }}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  >
                    {Object.keys(EQUAL_ANGLES_DATA).map((size) => (
                      <option key={size} value={size}>
                        {size} mm
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {activeTab === "unequal-angle" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Side, A x B (mm)</label>
                  <select
                    value={selectedAngleSize}
                    onChange={(e) => {
                      const newSize = e.target.value;
                      setSelectedAngleSize(newSize);
                      const thicknesses = Object.keys(UNEQUAL_ANGLES_DATA[newSize] || {});
                      if (thicknesses.length > 0) {
                        setSelectedAngleThickness(thicknesses[0]);
                      }
                    }}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  >
                    {Object.keys(UNEQUAL_ANGLES_DATA).map((size) => (
                      <option key={size} value={size}>
                        {size} mm
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Beam & Channel Profiles */}
              {["gost-channel", "upn-channel", "ipn-beam", "ipe-beam", "hea-beam", "heb-beam"].includes(activeTab) && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Profile Section</label>
                  <select
                    value={selectedProfileName}
                    onChange={(e) => setSelectedProfileName(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  >
                    {activeTab === "gost-channel" &&
                      GOST_CHANNELS.map((p) => (
                        <option key={p.name} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                    {activeTab === "upn-channel" &&
                      UPN_CHANNELS.map((p) => (
                        <option key={p.name} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                    {activeTab === "ipn-beam" &&
                      IPN_BEAMS.map((p) => (
                        <option key={p.name} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                    {activeTab === "ipe-beam" &&
                      IPE_BEAMS.map((p) => (
                        <option key={p.name} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                    {activeTab === "hea-beam" &&
                      HEA_BEAMS.map((p) => (
                        <option key={p.name} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                    {activeTab === "heb-beam" &&
                      HEB_BEAMS.map((p) => (
                        <option key={p.name} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              {/* Thickness for angle & flats & HSS */}
              {(activeTab === "square-hss" || activeTab === "rect-hss" || activeTab === "flat-bar") && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Thickness, t (mm)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={thicknessMm}
                    onChange={(e) => setThicknessMm(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              )}

              {(activeTab === "equal-angle" || activeTab === "unequal-angle") && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Thickness, t (mm)</label>
                  <select
                    value={selectedAngleThickness}
                    onChange={(e) => setSelectedAngleThickness(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  >
                    {Object.keys(
                      (activeTab === "equal-angle"
                        ? EQUAL_ANGLES_DATA[selectedAngleSize]
                        : UNEQUAL_ANGLES_DATA[selectedAngleSize]) || {}
                    ).map((thick) => (
                      <option key={thick} value={thick}>
                        {thick} mm
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Length Input for profiles */}
              {!["sheet", "rebar-calc", "concrete"].includes(activeTab) && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Length, L (m)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={lengthM}
                    onChange={(e) => setLengthM(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* SVG Diagram & Shape Visualizer */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-center">
              <div className="w-36 h-36 relative mb-4 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
                  {activeTab === "sheet" && (
                    <rect x="10" y="30" width="80" height="40" rx="2" fill="#0B192C" stroke="#DC2626" strokeWidth="3" />
                  )}
                  {(activeTab === "pipe" || activeTab === "circular-hss") && (
                    <g>
                      <circle cx="50" cy="50" r="40" fill="#0B192C" stroke="#DC2626" strokeWidth="2" />
                      <circle cx="50" cy="50" r="30" fill="#F8FAFC" />
                    </g>
                  )}
                  {activeTab === "square-hss" && (
                    <g>
                      <rect x="15" y="15" width="70" height="70" fill="#0B192C" stroke="#DC2626" strokeWidth="2" />
                      <rect x="25" y="25" width="50" height="50" fill="#F8FAFC" />
                    </g>
                  )}
                  {activeTab === "rect-hss" && (
                    <g>
                      <rect x="10" y="25" width="80" height="50" fill="#0B192C" stroke="#DC2626" strokeWidth="2" />
                      <rect x="20" y="35" width="60" height="30" fill="#F8FAFC" />
                    </g>
                  )}
                  {activeTab === "round-bar" && (
                    <circle cx="50" cy="50" r="38" fill="#0B192C" stroke="#DC2626" strokeWidth="4" />
                  )}
                  {activeTab === "square-bar" && (
                    <rect x="15" y="15" width="70" height="70" fill="#0B192C" stroke="#DC2626" strokeWidth="3" />
                  )}
                  {activeTab === "flat-bar" && (
                    <rect x="10" y="40" width="80" height="20" fill="#0B192C" stroke="#DC2626" strokeWidth="2" />
                  )}
                  {(activeTab === "equal-angle" || activeTab === "unequal-angle") && (
                    <path d="M 20 15 L 35 15 L 35 70 L 85 70 L 85 85 L 20 85 Z" fill="#0B192C" stroke="#DC2626" strokeWidth="2" />
                  )}
                  {["gost-channel", "upn-channel"].includes(activeTab) && (
                    <path d="M 80 15 L 80 30 L 35 30 L 35 70 L 80 70 L 80 85 L 20 85 L 20 15 Z" fill="#0B192C" stroke="#DC2626" strokeWidth="2" />
                  )}
                  {["ipn-beam", "ipe-beam", "hea-beam", "heb-beam"].includes(activeTab) && (
                    <path d="M 20 15 L 80 15 L 80 30 L 58 30 L 58 70 L 80 70 L 80 85 L 20 85 L 20 70 L 42 70 L 42 30 L 20 30 Z" fill="#0B192C" stroke="#DC2626" strokeWidth="2" />
                  )}
                  {activeTab === "rebar-calc" && (
                    <g stroke="#DC2626" strokeWidth="3" fill="none">
                      <line x1="20" y1="30" x2="80" y2="30" />
                      <line x1="20" y1="50" x2="80" y2="50" />
                      <line x1="20" y1="70" x2="80" y2="70" />
                      <line x1="30" y1="20" x2="30" y2="80" stroke="#0B192C" strokeWidth="3" />
                      <line x1="50" y1="20" x2="50" y2="80" stroke="#0B192C" strokeWidth="3" />
                      <line x1="70" y1="20" x2="70" y2="80" stroke="#0B192C" strokeWidth="3" />
                    </g>
                  )}
                  {activeTab === "concrete" && (
                    <g fill="#0B192C">
                      <polygon points="50,15 90,35 50,55 10,35" fill="#1E293B" stroke="#DC2626" strokeWidth="2" />
                      <polygon points="10,35 50,55 50,90 10,70" fill="#0B192C" stroke="#DC2626" strokeWidth="2" />
                      <polygon points="50,55 90,35 90,70 50,90" fill="#334155" stroke="#DC2626" strokeWidth="2" />
                    </g>
                  )}
                </svg>
              </div>
              <div className="text-xs text-slate-900 font-bold uppercase tracking-wider mb-2">
                Cross-Section Diagram
              </div>
              {activeProfile && (
                <div className="w-full bg-white p-3 rounded-lg border border-slate-200 text-left text-[11px] space-y-1">
                  <div className="font-bold text-slate-900 uppercase border-b border-slate-100 pb-1 mb-1 flex justify-between items-center">
                    <span>Dimensions</span>
                    <span className="text-red-600 font-black text-[10px]">{activeProfile.weightPerMeter} kg/m</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-slate-600">
                    <div><strong>h:</strong> {activeProfile.h} mm</div>
                    <div><strong>b:</strong> {activeProfile.b} mm</div>
                    <div><strong>s:</strong> {activeProfile.s} mm</div>
                    <div><strong>t:</strong> {activeProfile.t} mm</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Error Banner */}
          {result.error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-xs font-semibold flex items-center gap-2 border border-red-200">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{result.error}</span>
            </div>
          )}

          {/* Results Output Cards */}
          {activeTab === "rebar-calc" ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 bg-[#0B192C] p-6 sm:p-7 rounded-2xl border border-slate-800 text-white mt-6 shadow-xl">
              <div className="space-y-1.5">
                <div className="text-xs sm:text-sm text-slate-300 font-medium">
                  {rebarMode === "count" ? "Single Bar Weight (12m)" : "Total Running Length"}
                </div>
                <div className="text-3xl sm:text-4xl font-sans font-black text-red-400">
                  {rebarMode === "count" ? rebarResult.singleWeight : rebarResult.totalRunningM}{" "}
                  <span className="text-sm sm:text-base font-normal text-slate-300">
                    {rebarMode === "count" ? "kg" : "meters"}
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  Nominal: {getNominalWeight(rebarDiaMm)} kg/m (IS 1786)
                </div>
              </div>

              <div className="space-y-1.5 sm:border-l sm:border-slate-800 sm:pl-6">
                <div className="text-xs sm:text-sm text-slate-300 font-medium">
                  Total Rebar Weight
                </div>
                <div className="text-3xl sm:text-4xl font-sans font-black text-white">
                  {rebarResult.totalWeight} <span className="text-sm sm:text-base font-normal text-slate-300">kg</span>
                </div>
                <div className="text-xs text-red-400 font-bold">
                  ≈ {rebarResult.metricTonnes} Metric Tonnes (MT)
                </div>
              </div>

              <div className="space-y-1.5 sm:border-l sm:border-slate-800 sm:pl-6">
                <div className="text-xs sm:text-sm text-slate-300 font-medium">
                  Estimated Bundles
                </div>
                <div className="text-3xl sm:text-4xl font-sans font-black text-white">
                  {rebarResult.bundles} <span className="text-sm sm:text-base font-normal text-slate-300">bundles</span>
                </div>
                <div className="text-xs text-slate-400">
                  {rebarMode === "slab"
                    ? `${rebarResult.mainBarsCount} Main + ${rebarResult.distBarsCount} Cross bars`
                    : `approx. ${getPiecesPerBundle(rebarDiaMm)} pcs / bundle`}
                </div>
              </div>
            </div>
          ) : activeTab === "concrete" ? (
            <div className="space-y-4 mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#0B192C] p-6 sm:p-7 rounded-2xl border border-slate-800 text-white shadow-xl">
                <div className="space-y-1">
                  <div className="text-xs sm:text-sm text-slate-300">Wet Concrete Volume</div>
                  <div className="text-3xl sm:text-4xl font-sans font-black text-red-400">
                    {concreteResult.wetVolumeM3}{" "}
                    <span className="text-sm font-normal text-slate-300">m³</span>
                  </div>
                  <div className="text-xs text-slate-400">≈ {concreteResult.wetVolumeCuFt} cu.ft</div>
                </div>

                <div className="space-y-1 sm:border-l sm:border-slate-800 sm:pl-6">
                  <div className="text-xs sm:text-sm text-slate-300">Cement Required</div>
                  <div className="text-3xl sm:text-4xl font-sans font-black text-white">
                    {concreteResult.cementBags}{" "}
                    <span className="text-sm font-normal text-slate-300">Bags</span>
                  </div>
                  <div className="text-xs text-slate-400">50kg bags ({concreteResult.cementKg} kg)</div>
                </div>

                <div className="space-y-1 sm:border-l sm:border-slate-800 sm:pl-6">
                  <div className="text-xs sm:text-sm text-slate-300">Water Needed</div>
                  <div className="text-3xl sm:text-4xl font-sans font-black text-white">
                    {concreteResult.waterLitres}{" "}
                    <span className="text-sm font-normal text-slate-300">Litres</span>
                  </div>
                  <div className="text-xs text-slate-400">w/c ratio approx 0.50</div>
                </div>
              </div>

              {/* Sand & Aggregate Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Fine Aggregate (Sand):</span>
                  <span className="font-extrabold text-slate-900">
                    {concreteResult.sandTonnes} Tonnes ({concreteResult.sandM3} m³)
                  </span>
                </div>
                <div className="flex justify-between items-center sm:border-l sm:border-slate-200 sm:pl-4">
                  <span className="text-slate-600 font-medium">Coarse Aggregate (10/20mm):</span>
                  <span className="font-extrabold text-slate-900">
                    {concreteResult.aggregateTonnes} Tonnes ({concreteResult.aggregateM3} m³)
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 bg-[#0B192C] p-6 sm:p-7 rounded-2xl border border-slate-800 text-white mt-6 shadow-xl">
              <div className="space-y-1.5">
                <div className="text-sm text-slate-300 font-medium">
                  {activeTab === "sheet" ? "Single Piece Weight" : "Weight per Meter (kg/m)"}
                </div>
                <div className="text-4xl sm:text-5xl font-sans font-black text-red-400">
                  {result.weightPerMeter}{" "}
                  <span className="text-base sm:text-lg font-normal text-slate-300">
                    {activeTab === "sheet" ? "kg" : "kg/m"}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 sm:border-l sm:border-slate-800 sm:pl-7">
                <div className="text-sm text-slate-300 font-medium">
                  {activeTab === "sheet" ? `Total Weight for ${sheetPieces} pcs` : `Total Weight for ${lengthM}m Length`}
                </div>
                <div className="text-4xl sm:text-5xl font-sans font-black text-white">
                  {result.totalWeight} <span className="text-base sm:text-lg font-normal text-slate-300">kg</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-semibold pt-1">
                  ≈ {(result.totalWeight / 1000).toFixed(3)} Metric Tonnes
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
