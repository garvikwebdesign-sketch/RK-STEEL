import { SteelCalculators } from "@/components/SteelCalculators";
import { Calculator, CheckCircle2, ChevronRight, ArrowRight, Phone, MessageSquare, BookOpen, Layers, Weight, Box, Grid, HelpCircle } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Steel Weight Calculators Online | IS Standard TMT, Pipe, Sheet & Rebar Weight",
  description: "Calculate weight of TMT rebars, structural pipes, RHS/SHS hollow sections, MS plates, angles, and flat bars online based on Indian Standard specifications.",
};

const CALCULATOR_TYPES = [
  {
    title: "TMT Weight Calculator",
    desc: "Calculate weight of TMT bars as per size, length and quantity.",
    icon: Weight,
    href: "#live-calculator-widget",
  },
  {
    title: "Structural Steel Weight",
    desc: "Calculate weight of Beams, Channels, Angles, Flats, Rounds & Squares.",
    icon: Box,
    href: "#live-calculator-widget",
  },
  {
    title: "Pipe Weight Calculator",
    desc: "Calculate weight of MS Pipes, GI Pipes, and Hollow Sections (RHS/SHS).",
    icon: Layers,
    href: "#live-calculator-widget",
  },
  {
    title: "Plate Weight Calculator",
    desc: "Calculate weight of MS Plates, Sheets & Coils by thickness and size.",
    icon: Grid,
    href: "#live-calculator-widget",
  },
  {
    title: "Rebar Quantity Calculator",
    desc: "Calculate number of bars required for RCC slab, beam, column & more.",
    icon: Calculator,
    href: "#live-calculator-widget",
  },
  {
    title: "Concrete Calculator",
    desc: "Calculate concrete volume for slab, beam, column, footing & wall.",
    icon: Box,
    href: "#live-calculator-widget",
  },
];

export default function CalculatorsPage() {
  return (
    <div className="space-y-0 bg-white">
      {/* Subpage Hero Header (Matching Image 5) */}
      <section className="relative bg-[#0B192C] text-white py-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071322] via-[#0B192C]/90 to-[#0B192C]/50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-red-400 font-bold">Calculators</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight font-sans">
            Smart Calculators <br />
            For Smart <span className="text-red-500">Estimation</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
            Use our easy-to-use steel calculators to get accurate weight, quantity and size calculations for your projects.
          </p>
        </div>
      </section>

      {/* Main Content & 6 Cards (Matching Image 5) */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center">
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500 font-sans heading-accent-center pb-2">
              Our Steel Calculators
            </h2>
          </div>

          {/* 6 Clean Calculator Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
            {CALCULATOR_TYPES.map((c, idx) => {
              const Icon = c.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-red-500 transition-all flex flex-col justify-between text-center space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[#0B192C] text-red-500 flex items-center justify-center mx-auto shadow group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-red-600 transition-colors font-sans">
                      {c.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{c.desc}</p>
                  </div>

                  <a
                    href={c.href}
                    className="w-full border border-red-200 hover:bg-red-600 hover:text-white hover:border-red-600 text-red-600 font-bold text-xs py-2 rounded-lg transition-colors block"
                  >
                    Use Calculator →
                  </a>
                </div>
              );
            })}
          </div>

          {/* Live Interactive Calculation Suite */}
          <div id="live-calculator-widget" className="pt-6">
            <SteelCalculators />
          </div>

          {/* Why Use Our Calculators Strip (Matching Image 5) */}
          <div className="bg-slate-50 p-6 sm:p-7 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-xs">
            <div className="font-extrabold text-slate-900 flex items-center gap-2.5 text-sm">
              <div className="w-9 h-9 rounded-xl bg-[#0B192C] text-white flex items-center justify-center flex-shrink-0">
                <Calculator className="w-4 h-4 text-red-400" />
              </div>
              <span>Why Use Our Calculators?</span>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                Accurate Results
              </div>
              <div className="text-slate-500 text-[11px]">Reliable calculations based on IS standards</div>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                Easy to Use
              </div>
              <div className="text-slate-500 text-[11px]">Simple inputs, quick real-time results</div>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                Save Time
              </div>
              <div className="text-slate-500 text-[11px]">Plan your project faster with zero waste</div>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                For Professionals
              </div>
              <div className="text-slate-500 text-[11px]">Engineers, contractors & builders</div>
            </div>
          </div>

          {/* Need Help in Estimation Banner (Matching Image 5) */}
          <div className="bg-[#0B192C] text-white p-6 sm:p-7 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white font-sans">Need Help in Estimation?</h4>
                <p className="text-xs text-slate-300">Visit our Knowledge Center for guides, tips & resources.</p>
              </div>
            </div>
            <Link
              href="/catalogues"
              className="bg-transparent hover:bg-white/10 text-white border border-white/20 font-bold text-xs px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              VISIT KNOWLEDGE CENTER →
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Requirement CTA Banner */}
      <section className="bg-[#0B192C] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
              <Phone className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-sans">
                Have a requirement?
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                Call us for best rates & quick support.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex flex-col text-right sm:text-left">
              <a href="tel:9810073557" className="text-base font-extrabold text-white hover:text-red-400 transition-colors">
                +91 98100 73557
              </a>
              <a href="tel:9910073557" className="text-base font-extrabold text-white hover:text-red-400 transition-colors">
                +91 99100 73557
              </a>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/919999307984?text=Hello%20RK%20Steel%2C%20I%20have%20a%20steel%20requirement."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl border border-slate-700 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-green-400" />
                WhatsApp Us
              </a>

              <Link
                href="/contact"
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-red-600/30"
              >
                Get Today's Rate
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
