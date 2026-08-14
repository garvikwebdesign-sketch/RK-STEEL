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
  calculateEqualAngle,
  calculateUnequalAngle,
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
import { Calculator, Info, CheckCircle, AlertTriangle } from "lucide-react";

type CalcType =
  | "sheet"
  | "pipe"
  | "circular-hss"
  | "square-hss"
  | "rect-hss"
  | "round-bar"
  | "square-bar"
  | "flat-bar"
  | "equal-angle"
  | "unequal-angle"
  | "gost-channel"
  | "upn-channel"
  | "ipn-beam"
  | "ipe-beam"
  | "hea-beam"
  | "heb-beam";

interface CalcMeta {
  id: CalcType;
  title: string;
  subtitle: string;
  category: string;
}

const CALCULATORS: CalcMeta[] = [
  { id: "sheet", title: "Steel Sheets & Plates", subtitle: "Flat plates, HR/CR/GI & roofing sheets", category: "Plates & Sheets" },
  { id: "pipe", title: "Seamless Steel Pipes", subtitle: "Seamless steel circular pipes", category: "Pipes & Hollow" },
  { id: "circular-hss", title: "Hollow structural sections - circular", subtitle: "Circular hollow structural sections", category: "Pipes & Hollow" },
  { id: "square-hss", title: "Hollow structural sections - square", subtitle: "Square hollow structural sections", category: "Pipes & Hollow" },
  { id: "rect-hss", title: "Hollow structural sections - rectangular", subtitle: "Rectangular hollow structural sections", category: "Pipes & Hollow" },
  { id: "round-bar", title: "Round steel bars", subtitle: "Solid round steel bars & TMT rebars", category: "Solid Bars" },
  { id: "square-bar", title: "Square steel bars", subtitle: "Square steel solid bars", category: "Solid Bars" },
  { id: "flat-bar", title: "Flat bars", subtitle: "Mild Steel Flat Bars / Flats", category: "Solid Bars" },
  { id: "equal-angle", title: "Equal angles", subtitle: "MS Equal Leg Structural Angles", category: "Structural Steel" },
  { id: "unequal-angle", title: "Unequal angles", subtitle: "MS Unequal Leg Structural Angles", category: "Structural Steel" },
  { id: "gost-channel", title: "Channels - GOST", subtitle: "GOST 8240 hot-rolled channels", category: "Structural Steel" },
  { id: "upn-channel", title: "Channels - UPN", subtitle: "EN 10279 tapered flange channels", category: "Structural Steel" },
  { id: "ipn-beam", title: "Beams - IPN", subtitle: "EN 10365 tapered flange I-beams", category: "Structural Steel" },
  { id: "ipe-beam", title: "Beams - IPE", subtitle: "EN 10365 parallel flange I-beams", category: "Structural Steel" },
  { id: "hea-beam", title: "Beams - HEA (IPBL)", subtitle: "EN 10365 wide flange light H-beams", category: "Structural Steel" },
  { id: "heb-beam", title: "Beams - HEB (IPB)", subtitle: "EN 10365 wide flange standard H-beams", category: "Structural Steel" },
];

export function SteelCalculators() {
  const [activeTab, setActiveTab] = useState<CalcType>("round-bar");

  // State for all inputs
  const [lengthM, setLengthM] = useState<number>(6);
  const [widthM, setWidthM] = useState<number>(1.25);
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

  useEffect(() => {
    if (activeTab === "pipe") {
      setOuterDiaMm(8);
      setThicknessMm(1.5);
      setLengthM(1);
    } else if (activeTab === "circular-hss") {
      setOuterDiaMm(21.3);
      setThicknessMm(2.0);
      setLengthM(1);
    } else if (activeTab === "square-hss") {
      setSideAMm(15);
      setThicknessMm(1.5);
      setLengthM(1);
    } else if (activeTab === "rect-hss") {
      setSideAMm(30);
      setSideBMm(20);
      setThicknessMm(1.5);
      setLengthM(1);
    } else if (activeTab === "round-bar") {
      setTmtDiaMm(8);
      setLengthM(1);
    } else if (activeTab === "square-bar") {
      setSideAMm(10);
      setLengthM(1);
    } else if (activeTab === "flat-bar") {
      setSideAMm(10);
      setThicknessMm(3);
      setLengthM(1);
    } else if (activeTab === "equal-angle") {
      setSelectedAngleSize("20");
      setSelectedAngleThickness("3");
      setLengthM(1);
    } else if (activeTab === "unequal-angle") {
      setSelectedAngleSize("30x20");
      setSelectedAngleThickness("3");
      setLengthM(1);
    } else if (activeTab === "gost-channel") {
      setSelectedProfileName("№ 6.5");
      setLengthM(1);
    } else if (activeTab === "upn-channel") {
      setSelectedProfileName("UPN 50 x 25");
      setLengthM(1);
    } else if (activeTab === "ipn-beam") {
      setSelectedProfileName("IPN 80");
      setLengthM(1);
    } else if (activeTab === "ipe-beam") {
      setSelectedProfileName("IPE 80");
      setLengthM(1);
    } else if (activeTab === "hea-beam") {
      setSelectedProfileName("HEA 100");
      setLengthM(1);
    } else if (activeTab === "heb-beam") {
      setSelectedProfileName("HEB 100");
      setLengthM(1);
    }
  }, [activeTab]);

  // Scroll to calculator section top when activeTab changes
  useEffect(() => {
    const container = document.getElementById("calculators-container");
    if (container) {
      const rect = container.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetY = rect.top + scrollTop - 100; // 100px offset for headers
      window.scrollTo({
        top: targetY,
        behavior: "smooth"
      });
    }
  }, [activeTab]);

  // Calculate based on active tab
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

  let activeProfile: any = null;
  if (activeTab === "gost-channel") activeProfile = GOST_CHANNELS.find((p) => p.name === selectedProfileName);
  else if (activeTab === "upn-channel") activeProfile = UPN_CHANNELS.find((p) => p.name === selectedProfileName);
  else if (activeTab === "ipn-beam") activeProfile = IPN_BEAMS.find((p) => p.name === selectedProfileName);
  else if (activeTab === "ipe-beam") activeProfile = IPE_BEAMS.find((p) => p.name === selectedProfileName);
  else if (activeTab === "hea-beam") activeProfile = HEA_BEAMS.find((p) => p.name === selectedProfileName);
  else if (activeTab === "heb-beam") activeProfile = HEB_BEAMS.find((p) => p.name === selectedProfileName);

  return (
    <div id="calculators-container" className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[600px] lg:items-start">
      {/* Sidebar Navigation */}
      <div className="lg:col-span-4 bg-navy-950 text-white p-4 border-r border-navy-800">
        <div className="flex items-center gap-2 mb-4 p-2 border-b border-navy-800">
          <Calculator className="w-5 h-5 text-gold-500" />
          <h3 className="font-heading font-bold text-lg text-white">Select Calculator</h3>
        </div>

        {/* Mobile Dropdown */}
        <div className="block lg:hidden mb-4">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value as CalcType)}
            className="w-full bg-navy-900 border border-navy-700 text-white p-3 rounded-lg text-sm focus:outline-none focus:border-red-500"
          >
            {CALCULATORS.map((calc) => (
              <option key={calc.id} value={calc.id}>
                {calc.title}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop List */}
        <div className="hidden lg:flex flex-col space-y-1">
          {CALCULATORS.map((calc) => {
            const isSelected = activeTab === calc.id;
            return (
              <button
                key={calc.id}
                onClick={() => setActiveTab(calc.id)}
                className={`text-left p-3 rounded-lg transition-all text-xs flex flex-col ${
                  isSelected
                    ? "bg-red-600 text-white font-bold shadow-md translate-x-1"
                    : "text-gray-300 hover:bg-navy-900 hover:text-white"
                }`}
              >
                <span className="font-heading text-sm">{calc.title}</span>
                <span className={`text-[11px] font-normal ${isSelected ? "text-red-100" : "text-gray-400"}`}>
                  {calc.subtitle}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Calculator Working Panel */}
      <div className="lg:col-span-8 p-6 md:p-8 flex flex-col justify-between lg:sticky lg:top-[100px]">
          <div className="space-y-6">
            {/* Header */}
            <div className="border-b border-gray-200 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h3 className="font-heading text-2xl font-bold text-navy-900">
                  {CALCULATORS.find((c) => c.id === activeTab)?.title}
                </h3>
                <p className="text-xs text-gray-500">
                  Calculated using standard steel density <span className="font-semibold text-navy-900">7,850 kg/m³</span> (constant 0.00785).
                </p>
              </div>
              <span className="text-xs bg-navy-100 text-navy-900 px-3 py-1 rounded-full font-bold">
                Live Calculation
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Inputs Form */}
              <div className="space-y-4">
                {/* TMT Rebar nominal size quick select */}
                {activeTab === "round-bar" && (
                  <div>
                    <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
                      IS 1786 Standard TMT Sizes (mm)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {TMT_IS1786_STANDARDS.map((std) => (
                        <button
                          key={std.dia}
                          type="button"
                          onClick={() => setTmtDiaMm(std.dia)}
                          className={`px-2.5 py-1 text-xs rounded border font-semibold transition-all ${
                            tmtDiaMm === std.dia
                              ? "bg-navy-900 text-gold-400 border-navy-900 shadow-sm"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
                          }`}
                        >
                          {std.dia} mm
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Fields based on activeTab */}
                {activeTab === "round-bar" && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Diameter, D (mm)
                    </label>
                    <input
                      type="number"
                      value={tmtDiaMm}
                      onChange={(e) => setTmtDiaMm(Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-sm font-bold text-navy-900 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                    />
                  </div>
                )}

                {activeTab === "sheet" && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Thickness t (mm)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={sheetThicknessMm}
                        onChange={(e) => setSheetThicknessMm(Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-sm font-bold text-navy-900 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Width W (mm)</label>
                      <input
                        type="number"
                        value={sheetWidthMm}
                        onChange={(e) => setSheetWidthMm(Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-sm font-bold text-navy-900 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Length L (mm)</label>
                      <input
                        type="number"
                        value={sheetLengthMm}
                        onChange={(e) => setSheetLengthMm(Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-sm font-bold text-navy-900 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Number of pieces</label>
                      <input
                        type="number"
                        value={sheetPieces}
                        onChange={(e) => setSheetPieces(Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-sm font-bold text-navy-900 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                      />
                    </div>
                  </>
                )}

                {(activeTab === "pipe" || activeTab === "circular-hss") && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Diameter, D (mm)</label>
                      <input
                        type="number"
                        value={outerDiaMm}
                        onChange={(e) => setOuterDiaMm(Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-sm font-bold text-navy-900 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Thickness, t (mm)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={thicknessMm}
                        onChange={(e) => setThicknessMm(Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-sm font-bold text-navy-900 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                      />
                    </div>
                  </>
                )}

                {(activeTab === "square-hss" || activeTab === "square-bar") && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Side, A (mm)</label>
                    <input
                      type="number"
                      value={sideAMm}
                      onChange={(e) => setSideAMm(Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-sm font-bold text-navy-900 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                    />
                  </div>
                )}

                {activeTab === "rect-hss" && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Side, A (mm)</label>
                      <input
                        type="number"
                        value={sideAMm}
                        onChange={(e) => setSideAMm(Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-sm font-bold text-navy-900 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Side, B (mm)</label>
                      <input
                        type="number"
                        value={sideBMm}
                        onChange={(e) => setSideBMm(Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-sm font-bold text-navy-900 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                      />
                    </div>
                  </>
                )}

                {activeTab === "equal-angle" && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Side, A (mm)</label>
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
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-sm font-bold text-navy-900 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                    >
                      {Object.keys(EQUAL_ANGLES_DATA).map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {activeTab === "unequal-angle" && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Side, A x B (mm)</label>
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
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-sm font-bold text-navy-900 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                    >
                      {Object.keys(UNEQUAL_ANGLES_DATA).map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {activeTab === "flat-bar" && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Side, W (mm)</label>
                    <input
                      type="number"
                      value={sideAMm}
                      onChange={(e) => setSideAMm(Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-sm font-bold text-navy-900 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                    />
                  </div>
                )}

                {["gost-channel", "upn-channel", "ipn-beam", "ipe-beam", "hea-beam", "heb-beam"].includes(activeTab) && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Select Standard Profile Size
                    </label>
                    <select
                      value={selectedProfileName}
                      onChange={(e) => setSelectedProfileName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-sm font-bold text-navy-900 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                    >
                      {activeTab === "gost-channel" && GOST_CHANNELS.map((p) => <option key={p.name} value={p.name}>{p.name}</option>)}
                      {activeTab === "upn-channel" && UPN_CHANNELS.map((p) => <option key={p.name} value={p.name}>{p.name}</option>)}
                      {activeTab === "ipn-beam" && IPN_BEAMS.map((p) => <option key={p.name} value={p.name}>{p.name}</option>)}
                      {activeTab === "ipe-beam" && IPE_BEAMS.map((p) => <option key={p.name} value={p.name}>{p.name}</option>)}
                      {activeTab === "hea-beam" && HEA_BEAMS.map((p) => <option key={p.name} value={p.name}>{p.name}</option>)}
                      {activeTab === "heb-beam" && HEB_BEAMS.map((p) => <option key={p.name} value={p.name}>{p.name}</option>)}
                    </select>
                  </div>
                )}

                {/* Common Thickness for HSS & Flat */}
                {["square-hss", "rect-hss", "flat-bar"].includes(activeTab) && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Thickness, t (mm)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={thicknessMm}
                      onChange={(e) => setThicknessMm(Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-sm font-bold text-navy-900 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                    />
                  </div>
                )}

                {/* Dynamic Thickness for Angles */}
                {["equal-angle", "unequal-angle"].includes(activeTab) && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Thickness, t (mm)</label>
                    <select
                      value={selectedAngleThickness}
                      onChange={(e) => setSelectedAngleThickness(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-sm font-bold text-navy-900 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                    >
                      {Object.keys(
                        (activeTab === "equal-angle"
                          ? EQUAL_ANGLES_DATA[selectedAngleSize]
                          : UNEQUAL_ANGLES_DATA[selectedAngleSize]) || {}
                      ).map((thick) => (
                        <option key={thick} value={thick}>
                          {thick}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Length Input for all except sheet */}
                {activeTab !== "sheet" && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Length, L (m)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={lengthM}
                      onChange={(e) => setLengthM(Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-sm font-bold text-navy-900 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* SVG Diagram & Shape Visualizer */}
              <div className="bg-steel-100 p-6 rounded-xl border border-gray-200 flex flex-col items-center justify-center text-center">
                <div className="w-36 h-36 relative mb-4 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
                    {activeTab === "sheet" && (
                      <rect x="10" y="30" width="80" height="40" rx="2" fill="#0F2A4A" stroke="#A11D1D" strokeWidth="3" />
                    )}
                    {(activeTab === "pipe" || activeTab === "circular-hss") && (
                      <g>
                        <circle cx="50" cy="50" r="40" fill="#0F2A4A" />
                        <circle cx="50" cy="50" r="30" fill="#FAFBFD" />
                      </g>
                    )}
                    {activeTab === "square-hss" && (
                      <g>
                        <rect x="15" y="15" width="70" height="70" fill="#0F2A4A" />
                        <rect x="25" y="25" width="50" height="50" fill="#FAFBFD" />
                      </g>
                    )}
                    {activeTab === "rect-hss" && (
                      <g>
                        <rect x="10" y="25" width="80" height="50" fill="#0F2A4A" />
                        <rect x="20" y="35" width="60" height="30" fill="#FAFBFD" />
                      </g>
                    )}
                    {activeTab === "round-bar" && (
                      <circle cx="50" cy="50" r="38" fill="#0F2A4A" stroke="#D9A429" strokeWidth="4" />
                    )}
                    {activeTab === "square-bar" && (
                      <rect x="15" y="15" width="70" height="70" fill="#0F2A4A" stroke="#D9A429" strokeWidth="3" />
                    )}
                    {activeTab === "flat-bar" && (
                      <rect x="10" y="40" width="80" height="20" fill="#0F2A4A" stroke="#D9A429" strokeWidth="2" />
                    )}
                    {(activeTab === "equal-angle" || activeTab === "unequal-angle") && (
                      <path d="M 20 15 L 35 15 L 35 70 L 85 70 L 85 85 L 20 85 Z" fill="#0F2A4A" stroke="#A11D1D" strokeWidth="2" />
                    )}
                    {["gost-channel", "upn-channel"].includes(activeTab) && (
                      <path d="M 80 15 L 80 30 L 35 30 L 35 70 L 80 70 L 80 85 L 20 85 L 20 15 Z" fill="#0F2A4A" stroke="#A11D1D" strokeWidth="2" />
                    )}
                    {["ipn-beam", "ipe-beam", "hea-beam", "heb-beam"].includes(activeTab) && (
                      <path d="M 20 15 L 80 15 L 80 30 L 58 30 L 58 70 L 80 70 L 80 85 L 20 85 L 20 70 L 42 70 L 42 30 L 20 30 Z" fill="#0F2A4A" stroke="#A11D1D" strokeWidth="2" />
                    )}
                  </svg>
                </div>
                <div className="text-xs text-navy-900 font-bold uppercase tracking-wider mb-2">
                  Cross-Section Diagram
                </div>
                {activeProfile && (
                  <div className="w-full bg-white p-3 rounded-lg border border-gray-200 text-left text-[11px] space-y-1">
                    <div className="font-bold text-navy-900 uppercase border-b border-gray-100 pb-1 mb-1 flex justify-between items-center">
                      <span>Dimensions</span>
                      <span className="text-red-600 font-black text-[10px]">{activeProfile.weightPerMeter} kg/m</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-gray-600">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-navy-950 p-5 rounded-xl border border-navy-800 text-white mt-6">
              <div className="space-y-1">
                <div className="text-xs text-gray-400 font-medium">
                  {activeTab === "sheet" ? "Single Piece Weight" : "Weight per Meter (kg/m)"}
                </div>
                <div className="text-3xl font-heading font-black text-gold-400">
                  {result.weightPerMeter} <span className="text-sm font-sans font-normal text-gray-300">{activeTab === "sheet" ? "kg" : "kg/m"}</span>
                </div>
              </div>

              <div className="space-y-1 sm:border-l sm:border-navy-800 sm:pl-6">
                <div className="text-xs text-gray-400 font-medium">
                  {activeTab === "sheet" ? `Total Weight for ${sheetPieces} pcs` : `Total Weight for ${lengthM}m Length`}
                </div>
                <div className="text-3xl font-heading font-black text-white">
                  {result.totalWeight} <span className="text-sm font-sans font-normal text-gray-300">kg</span>
                </div>
                <div className="text-[11px] text-gray-400">
                  ≈ {(result.totalWeight / 1000).toFixed(3)} Metric Tonnes
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
