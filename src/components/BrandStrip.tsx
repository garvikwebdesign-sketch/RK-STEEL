import Link from "next/link";
import { CheckCircle2, ShieldCheck } from "lucide-react";

export function BrandStrip() {
  const brandLines = [
    {
      brand: "Tata Steel",
      tagline: "Authorised Dealer",
      subBrands: ["Tata Tiscon", "Tata Structura", "Tata Durashine", "Tata Astrum", "Tata Kosh", "Tata Steelium"],
      color: "from-blue-900 to-navy-900",
      badge: "Authorised Dealer",
    },
    {
      brand: "SAIL (सेल)",
      tagline: "Steel Authority of India Ltd.",
      subBrands: ["SAIL SEQR 550D", "SAIL NEX Heavy Structural", "Plates & Coils"],
      color: "from-blue-950 to-navy-950",
      badge: "Authorised Dealer",
    },
    {
      brand: "JSW Steel",
      tagline: '"Better Everyday"',
      subBrands: ["JSW Neosteel TMT", "Structural Steel", "Sheets & Plates"],
      color: "from-navy-900 to-red-950",
      badge: "Prime Stockist",
    },
    {
      brand: "AP Apollo",
      tagline: "Steel Piping Solutions",
      subBrands: ["MS Pipes & Tubes", "GI Galvanised Pipes", "Structural Piping"],
      color: "from-charcoal-900 to-navy-900",
      badge: "Authorised Stockist",
    },
  ];

  return (
    <section className="bg-navy-950 py-12 text-white border-y border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-gold-500" />
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">
              OFFICIAL BRAND PARTNERSHIPS
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl text-white font-bold tracking-tight heading-accent-center">
            Authorised Dealer Of India's Top Steel Mills
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto mt-4">
            We deliver original factory-guaranteed material directly from Tata Steel, SAIL, JSW, and AP Apollo stocklines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {brandLines.map((b, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-b ${b.color} p-6 rounded-xl border border-navy-700/60 shadow-lg relative overflow-hidden group hover:border-gold-500 transition-all`}
            >
              <div className="absolute top-3 right-3 bg-red-600/90 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded shadow">
                {b.badge}
              </div>

              <div className="font-heading text-2xl font-black text-white group-hover:text-gold-400 transition-colors">
                {b.brand}
              </div>
              <div className="text-xs text-gold-400 font-medium tracking-wide mb-4 italic">
                {b.tagline}
              </div>

              <div className="space-y-1.5 border-t border-white/10 pt-3">
                {b.subBrands.map((sb, sbIdx) => (
                  <div key={sbIdx} className="flex items-center gap-2 text-xs text-gray-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" />
                    <span>{sb}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-2">
                <Link
                  href="/products"
                  className="text-xs text-gold-400 hover:text-white font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  View Product Catalogue →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
