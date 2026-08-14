import { SteelCalculators } from "@/components/SteelCalculators";
import { ShieldCheck, Calculator } from "lucide-react";

export const metadata = {
  title: "Online Steel Weight Calculators | RK Steel Company Noida",
  description: "Calculate weight per meter and total weight for steel sheets, circular pipes, square & rectangular hollow sections, TMT rebars, angles, and flat bars.",
};

export default function CalculatorsPage() {
  return (
    <div className="space-y-0 bg-steel-100 min-h-screen">
      {/* Banner */}
      <section className="bg-navy-950 text-white py-14 border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-navy-900 text-gold-400 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-2 border border-navy-700">
            <Calculator className="w-4 h-4 text-gold-500" />
            ENGINEERING WEIGHT ESTIMATION SUITE
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-white">
            Steel Weight Calculators
          </h1>
          <p className="text-gray-300 text-sm max-w-2xl mt-2 font-light">
            Live weight calculation in kg/m and total kg for steel sheets, MS circular pipes, hollow structural sections (HSS), TMT bars, square bars, flat bars, and angles based on steel density 7,850 kg/m³.
          </p>
        </div>
      </section>

      {/* Main Interactive Suite */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SteelCalculators />
        </div>
      </section>
    </div>
  );
}
