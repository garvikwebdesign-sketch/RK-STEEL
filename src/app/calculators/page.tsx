import { SteelCalculators } from "@/components/SteelCalculators";
import { Calculator, ShieldCheck, CheckCircle2, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Steel Weight Calculators Online | IS Standard TMT, Pipe, Sheet & Rebar Weight",
  description: "Calculate weight of TMT rebars, structural pipes, RHS/SHS hollow sections, MS plates, angles, and flat bars online based on Indian Standard specifications.",
};

const CALCULATOR_TYPES = [
  { title: "TMT Weight Calculator", desc: "Calculate weight of TMT bars as per size, length and quantity." },
  { title: "Structural Steel Weight", desc: "Calculate weight of Beams, Channels, Angles, Flats, Rounds & Squares." },
  { title: "Pipe Weight Calculator", desc: "Calculate weight of MS Pipes, GI Pipes, and Hollow Sections (RHS/SHS)." },
  { title: "Plate Weight Calculator", desc: "Calculate weight of MS Plates, Sheets & Coils by thickness and size." },
  { title: "Rebar Quantity Calculator", desc: "Calculate number of bars required for RCC slab, beam, column & more." },
  { title: "Concrete Calculator", desc: "Calculate concrete volume for slab, beam, column, footing & wall." },
];

export default function CalculatorsPage() {
  return (
    <div className="space-y-0 bg-gray-50">
      {/* Banner (Matching Screenshot 4) */}
      <section className="bg-navy-950 text-white py-14 border-b-4 border-red-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-xs font-bold text-red-400 uppercase tracking-widest bg-navy-900 px-3 py-1 rounded inline-block border border-navy-700 mb-2">
            ENGINEERING UTILITY TOOLS
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-white">
            Smart Calculators For <span className="text-red-500">Smart Estimation</span>
          </h1>
          <p className="text-gray-300 text-sm max-w-2xl mt-2 font-light">
            Use our easy-to-use steel calculators to get accurate weight, quantity and size calculations for your projects.
          </p>
        </div>
      </section>

      {/* Main Calculators Suite */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Top 6 Calculator Type Cards (Matching Screenshot 4) */}
          <div className="text-center">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1 rounded border border-red-200">
              ESTIMATION TOOLS
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-navy-950 font-bold tracking-tight mt-2">
              Our Steel Calculators
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CALCULATOR_TYPES.map((c, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-red-500 transition-all flex flex-col justify-between text-center space-y-3 group"
              >
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-navy-950 text-white rounded-full flex items-center justify-center mx-auto font-bold text-lg group-hover:bg-red-600 transition-colors">
                    ⚖️
                  </div>
                  <h3 className="font-heading text-base font-bold text-navy-950 group-hover:text-red-600 transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{c.desc}</p>
                </div>

                <a
                  href="#live-calculator-widget"
                  className="w-full bg-red-50 hover:bg-red-600 hover:text-white text-red-600 font-bold text-[11px] py-1.5 rounded-lg border border-red-200 transition-colors block"
                >
                  Use Calculator →
                </a>
              </div>
            ))}
          </div>

          {/* Interactive Calculator Component */}
          <div id="live-calculator-widget" className="pt-6">
            <SteelCalculators />
          </div>

          {/* Why Use Our Calculators Strip (Matching Screenshot 4) */}
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 grid grid-cols-1 md:grid-cols-5 gap-4 text-xs">
            <div className="font-bold text-navy-950 flex items-center gap-2 border-b md:border-b-0 md:border-r border-gray-200 pb-2 md:pb-0 pr-2">
              <Calculator className="w-5 h-5 text-red-600" />
              <span>Why Use Our Calculators?</span>
            </div>

            <div className="space-y-0.5">
              <div className="font-bold text-navy-950 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
                Accurate Results
              </div>
              <div className="text-gray-500 text-[11px]">Reliable calculations based on IS standards</div>
            </div>

            <div className="space-y-0.5">
              <div className="font-bold text-navy-950 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
                Easy To Use
              </div>
              <div className="text-gray-500 text-[11px]">Simple inputs, instant live output</div>
            </div>

            <div className="space-y-0.5">
              <div className="font-bold text-navy-950 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
                Save Time & Cost
              </div>
              <div className="text-gray-500 text-[11px]">Reduce material waste & over-procurement</div>
            </div>

            <div className="space-y-0.5">
              <div className="font-bold text-navy-950 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
                For Professionals
              </div>
              <div className="text-gray-500 text-[11px]">Tailored for engineers & contractors</div>
            </div>
          </div>

          {/* Bottom Banner (Matching Screenshot 4 bottom) */}
          <div className="bg-navy-950 text-white p-6 rounded-2xl border border-navy-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-red-500 flex-shrink-0" />
              <div>
                <h4 className="font-heading text-lg font-bold">Need Help in Estimation?</h4>
                <p className="text-xs text-gray-300">Visit our Catalogues and Technical Guides for standard size tables.</p>
              </div>
            </div>
            <Link
              href="/catalogues"
              className="bg-navy-900 hover:bg-navy-800 text-white border border-navy-700 font-bold text-xs px-5 py-2.5 rounded-lg flex items-center gap-1"
            >
              Download PDF Catalogues →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
