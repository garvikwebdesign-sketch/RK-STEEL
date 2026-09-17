"use client";

import { useState, useEffect } from "react";
import { SteelCalculators, CalcType } from "@/components/SteelCalculators";
import { Calculator, CheckCircle2, BookOpen, Layers, Weight, Box, Grid } from "lucide-react";

interface CalculatorCard {
  id: CalcType;
  title: string;
  desc: string;
  icon: any;
}

const CALCULATOR_CARDS: CalculatorCard[] = [
  {
    id: "round-bar",
    title: "TMT Weight Calculator",
    desc: "Calculate weight of TMT bars as per size, length and quantity.",
    icon: Weight,
  },
  {
    id: "equal-angle",
    title: "Structural Steel Weight",
    desc: "Calculate weight of Beams, Channels, Angles, Flats, Rounds & Squares.",
    icon: Box,
  },
  {
    id: "pipe",
    title: "Pipe Weight Calculator",
    desc: "Calculate weight of MS Pipes, GI Pipes, and Hollow Sections (RHS/SHS).",
    icon: Layers,
  },
  {
    id: "sheet",
    title: "Plate Weight Calculator",
    desc: "Calculate weight of MS Plates, Sheets & Coils by thickness and size.",
    icon: Grid,
  },
  {
    id: "rebar-calc",
    title: "Rebar Quantity Calculator",
    desc: "Calculate number of bars required for RCC slab, beam, column & more.",
    icon: Calculator,
  },
  {
    id: "concrete",
    title: "Concrete Calculator",
    desc: "Calculate concrete volume for slab, beam, column, footing & wall.",
    icon: Box,
  },
];

export function CalculatorsClient() {
  const [activeTab, setActiveTab] = useState<CalcType>("round-bar");

  // Sync tab from URL params or hash on initial load & navigation
  useEffect(() => {
    const parseUrlTab = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get("tab") || urlParams.get("calc");
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
        "pipes": "pipe",
        "sheet": "sheet",
        "plate": "sheet",
        "plate-calculator": "sheet",
        "equal-angle": "equal-angle",
        "structural": "equal-angle",
        "structural-calculator": "equal-angle",
        "concrete": "concrete",
        "concrete-calculator": "concrete",
        "circular-hss": "circular-hss",
        "square-hss": "square-hss",
        "rect-hss": "rect-hss",
        "square-bar": "square-bar",
        "flat-bar": "flat-bar",
        "unequal-angle": "unequal-angle",
        "gost-channel": "gost-channel",
        "upn-channel": "upn-channel",
        "ipn-beam": "ipn-beam",
        "ipe-beam": "ipe-beam",
        "hea-beam": "hea-beam",
        "heb-beam": "heb-beam",
      };

      const matched = (tabParam && aliasMap[tabParam]) || (hash && aliasMap[hash]);
      if (matched) {
        setActiveTab(matched);
      }
    };

    parseUrlTab();
    window.addEventListener("popstate", parseUrlTab);
    window.addEventListener("hashchange", parseUrlTab);
    return () => {
      window.removeEventListener("popstate", parseUrlTab);
      window.removeEventListener("hashchange", parseUrlTab);
    };
  }, []);

  const handleSelectCalculator = (tabId: CalcType) => {
    setActiveTab(tabId);
    if (typeof window !== "undefined") {
      const newUrl = `${window.location.pathname}?tab=${tabId}#live-calculator-widget`;
      window.history.replaceState(null, "", newUrl);

      // Smooth scroll to calculator widget
      setTimeout(() => {
        const widget = document.getElementById("live-calculator-widget");
        if (widget) {
          const yOffset = -90;
          const y = widget.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 50);
    }
  };

  return (
    <div className="space-y-12">
      {/* 6 Clean Calculator Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
        {CALCULATOR_CARDS.map((c) => {
          const Icon = c.icon;
          const isSelected = activeTab === c.id;
          return (
            <div
              key={c.id}
              onClick={() => handleSelectCalculator(c.id)}
              className={`bg-white p-5 rounded-2xl border transition-all flex flex-col justify-between text-center space-y-4 group cursor-pointer ${
                isSelected
                  ? "border-red-500 shadow-md ring-2 ring-red-500/20"
                  : "border-slate-200 shadow-sm hover:shadow-md hover:border-red-400"
              }`}
            >
              <div className="space-y-3">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto shadow transition-transform group-hover:scale-105 ${
                    isSelected ? "bg-red-600 text-white" : "bg-[#0B192C] text-red-500"
                  }`}
                >
                  <Icon className="w-6 h-6 stroke-[1.75]" />
                </div>
                <h3
                  className={`text-base font-extrabold transition-colors font-sans ${
                    isSelected ? "text-red-600" : "text-slate-900 group-hover:text-red-600"
                  }`}
                >
                  {c.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">{c.desc}</p>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectCalculator(c.id);
                }}
                className={`w-full font-bold text-xs sm:text-sm py-2.5 rounded-lg transition-colors block ${
                  isSelected
                    ? "bg-red-600 text-white border border-red-600 shadow-sm"
                    : "border border-red-200 hover:bg-red-600 hover:text-white hover:border-red-600 text-red-600"
                }`}
              >
                Use Calculator →
              </button>
            </div>
          );
        })}
      </div>

      {/* Live Interactive Calculation Suite */}
      <div id="live-calculator-widget" className="pt-6">
        <SteelCalculators activeTabProp={activeTab} onTabChange={(t) => setActiveTab(t)} />
      </div>

      {/* Why Use Our Calculators Strip */}
      <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-sm">
        <div className="font-extrabold text-slate-900 flex items-center gap-3 text-base">
          <div className="w-10 h-10 rounded-xl bg-[#0B192C] text-white flex items-center justify-center flex-shrink-0">
            <Calculator className="w-5 h-5 text-red-400" />
          </div>
          <span>Why Use Our Calculators?</span>
        </div>

        <div className="space-y-1">
          <div className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
            <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
            Accurate Results
          </div>
          <div className="text-slate-600 text-xs sm:text-[13px]">Reliable calculations based on IS standards</div>
        </div>

        <div className="space-y-1">
          <div className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
            <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
            Easy to Use
          </div>
          <div className="text-slate-600 text-xs sm:text-[13px]">Simple inputs, quick real-time results</div>
        </div>

        <div className="space-y-1">
          <div className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
            <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
            Save Time
          </div>
          <div className="text-slate-600 text-xs sm:text-[13px]">Plan your project faster with zero waste</div>
        </div>

        <div className="space-y-1">
          <div className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
            <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
            For Professionals
          </div>
          <div className="text-slate-600 text-xs sm:text-[13px]">Engineers, contractors &amp; builders</div>
        </div>
      </div>

      {/* Need Help in Estimation Banner */}
      <div className="bg-[#0B192C] text-white p-7 sm:p-8 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-red-500/15 text-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white font-sans">Need Help in Estimation?</h4>
            <p className="text-sm text-slate-300 mt-0.5">Visit our Knowledge Center for guides, tips &amp; resources.</p>
          </div>
        </div>
        <a
          href="/catalogues"
          className="bg-transparent hover:bg-white/10 text-white border border-white/20 font-bold text-sm px-6 py-3 rounded-xl flex items-center gap-2 transition-colors whitespace-nowrap"
        >
          VISIT KNOWLEDGE CENTER →
        </a>
      </div>
    </div>
  );
}
