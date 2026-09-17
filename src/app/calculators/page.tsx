import { CalculatorsClient } from "@/components/CalculatorsClient";
import { ChevronRight, ArrowRight, Phone, MessageSquare } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Steel Weight & Quantity Calculators Online | IS Standard TMT, Pipe, Sheet & Concrete",
  description: "Calculate weight and quantity of TMT rebars, structural pipes, RHS/SHS hollow sections, MS plates, angles, flat bars, rebar grids, and concrete volume online based on Indian Standards.",
};

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
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-slate-500" />
            <span className="text-red-400 font-bold">Calculators</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight font-sans">
            Smart Calculators <br />
            For Smart <span className="text-red-500">Estimation</span>
          </h1>

          <p className="text-slate-200 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
            Use our easy-to-use steel calculators to get accurate weight, quantity and size calculations for your projects.
          </p>
        </div>
      </section>

      {/* Main Content & Interactive Calculators Suite */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center">
            <h2 className="text-sm sm:text-base font-bold uppercase tracking-[0.15em] text-slate-700 font-sans heading-accent-center pb-2">
              Our Steel Calculators
            </h2>
          </div>

          <CalculatorsClient />
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
              <a href="tel:9999307984" className="text-base font-extrabold text-white hover:text-red-400 transition-colors">
                +91 99993 07984
              </a>
              <div className="text-xs text-slate-300 font-semibold flex gap-2">
                <a href="tel:9953364645" className="hover:text-white">9953364645</a>
                <span>|</span>
                <a href="tel:9811364645" className="hover:text-white">9811364645</a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/919999307984?text=Hello%20RK%20Steel%20Co%2C%20I%20have%20a%20steel%20requirement."
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
