import Link from "next/link";
import { ShieldCheck, TrendingUp, TrendingDown, Download, Phone, ArrowRight, FileText } from "lucide-react";
import { headers } from "next/headers";
import { BrandLogo } from "@/components/BrandLogo";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Daily Steel Price List & Market Updates Noida | Tata Tiscon, SAIL, JSW, Jindal | RK STEEL CO",
  description: "Check today's live steel price list in Noida & Delhi NCR for Tata Tiscon TMT, SAIL SEQR 550D, Tata Structura, Tata Durashine, JSW Neosteel, Jindal Panther, and APL Apollo at RK STEEL CO.",
};

const PRICE_HUB_DATA = [
  {
    brandSlug: "tata-tiscon",
    brandName: "TATA TISCON",
    category: "TMT Rebars (550SD)",
    todayPrice: "54,500",
    yesterdayPrice: "55,000",
    changeVsPrev: -500,
    unit: "MT",
    pdfUrl: "/catalogues",
    history: [
      { day: "Today", price: "54,500" },
      { day: "Yesterday", price: "55,000" },
      { day: "7 Days Ago", price: "55,200" },
      { day: "30 Days Ago", price: "56,000" },
    ],
  },
  {
    brandSlug: "sail-seqr",
    brandName: "SAIL SEQR 550D",
    category: "Integrated Mill TMT",
    todayPrice: "52,800",
    yesterdayPrice: "53,000",
    changeVsPrev: -200,
    unit: "MT",
    pdfUrl: "/catalogues",
    history: [
      { day: "Today", price: "52,800" },
      { day: "Yesterday", price: "53,000" },
      { day: "7 Days Ago", price: "53,500" },
      { day: "30 Days Ago", price: "54,200" },
    ],
  },
  {
    brandSlug: "tata-structura",
    brandName: "TATA STRUCTURA",
    category: "Hollow Sections & Pipes",
    todayPrice: "58,200",
    yesterdayPrice: "58,200",
    changeVsPrev: 0,
    unit: "MT",
    pdfUrl: "/catalogues",
    history: [
      { day: "Today", price: "58,200" },
      { day: "Yesterday", price: "58,200" },
      { day: "7 Days Ago", price: "58,500" },
      { day: "30 Days Ago", price: "59,000" },
    ],
  },
  {
    brandSlug: "tata-durashine",
    brandName: "TATA DURASHINE",
    category: "Colour Coated Sheets",
    todayPrice: "68,500",
    yesterdayPrice: "68,000",
    changeVsPrev: 500,
    unit: "MT",
    pdfUrl: "/catalogues",
    history: [
      { day: "Today", price: "68,500" },
      { day: "Yesterday", price: "68,000" },
      { day: "7 Days Ago", price: "68,000" },
      { day: "30 Days Ago", price: "69,200" },
    ],
  },
  {
    brandSlug: "tata-astrum",
    brandName: "TATA ASTRUM & STEELIUM",
    category: "HR / CR Sheets & Coils",
    todayPrice: "56,000",
    yesterdayPrice: "56,500",
    changeVsPrev: -500,
    unit: "MT",
    pdfUrl: "/catalogues",
    history: [
      { day: "Today", price: "56,000" },
      { day: "Yesterday", price: "56,500" },
      { day: "7 Days Ago", price: "57,000" },
      { day: "30 Days Ago", price: "57,800" },
    ],
  },
  {
    brandSlug: "jsw-neosteel",
    brandName: "JSW NEO STEEL",
    category: "Primary Grade TMT",
    todayPrice: "53,500",
    yesterdayPrice: "53,800",
    changeVsPrev: -300,
    unit: "MT",
    pdfUrl: "/catalogues",
    history: [
      { day: "Today", price: "53,500" },
      { day: "Yesterday", price: "53,800" },
      { day: "7 Days Ago", price: "54,000" },
      { day: "30 Days Ago", price: "55,100" },
    ],
  },
  {
    brandSlug: "apl-apollo",
    brandName: "APL APOLLO PIPES",
    category: "MS / GI Pipes & Tubes",
    todayPrice: "59,000",
    yesterdayPrice: "59,000",
    changeVsPrev: 0,
    unit: "MT",
    pdfUrl: "/catalogues",
    history: [
      { day: "Today", price: "59,000" },
      { day: "Yesterday", price: "59,000" },
      { day: "7 Days Ago", price: "59,500" },
      { day: "30 Days Ago", price: "60,200" },
    ],
  },
  {
    brandSlug: "jindal-panther",
    brandName: "JINDAL PANTHER (JE)",
    category: "High Yield TMT Bars",
    todayPrice: "53,200",
    yesterdayPrice: "53,500",
    changeVsPrev: -300,
    unit: "MT",
    pdfUrl: "/catalogues",
    history: [
      { day: "Today", price: "53,200" },
      { day: "Yesterday", price: "53,500" },
      { day: "7 Days Ago", price: "53,800" },
      { day: "30 Days Ago", price: "54,500" },
    ],
  },
];

export default async function PriceListHubPage() {
  await headers();
  return (
    <div className="space-y-0 bg-gray-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-navy-950 text-white py-14 border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-navy-900 text-red-400 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-2 border border-navy-700">
            <TrendingUp className="w-4 h-4 text-red-500" />
            DAILY MARKET UPDATES &amp; 30-DAY PRICE HISTORY • RK STEEL CO
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-white">
            Steel Price Lists &amp; Market Updates
          </h1>
          <p className="text-gray-300 text-sm max-w-2xl mt-2 font-light">
            Live today's steel price list for Tata Tiscon, SAIL SEQR, Tata Structura, JSW Steel, Jindal (JE), and AP Apollo in Noida &amp; Delhi NCR with historical trend tracking.
          </p>
          <div className="mt-3 inline-block bg-red-950/70 border border-red-500/40 text-red-300 text-xs font-bold px-3 py-1 rounded">
            TAGLINE: ALL STEEL AND IRON ITEMS UNDER ONE ROOF
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Price Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRICE_HUB_DATA.map((item) => (
              <div
                key={item.brandSlug}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-red-500/50 transition-all p-6 space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Card Brand Header */}
                  <div className="flex justify-between items-start border-b border-gray-100 pb-3">
                    <div className="h-8 flex items-center">
                      <BrandLogo brand={item.brandSlug} className="max-h-7" />
                    </div>
                    {item.changeVsPrev < 0 ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded border border-green-200">
                        <TrendingDown className="w-3.5 h-3.5" />
                        ↓ ₹{Math.abs(item.changeVsPrev)}/MT
                      </span>
                    ) : item.changeVsPrev > 0 ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded border border-red-200">
                        <TrendingUp className="w-3.5 h-3.5" />
                        ↑ ₹{item.changeVsPrev}/MT
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded">
                        Stable
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider bg-red-50 px-2 py-0.5 rounded border border-red-100">
                      {item.category}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-navy-950 mt-1">
                      {item.brandName}
                    </h3>
                  </div>

                  {/* Today Price Highlight */}
                  <div className="bg-navy-950 text-white p-4 rounded-xl space-y-1">
                    <div className="text-[11px] text-gray-400 font-semibold uppercase">Today's Estimated Rate</div>
                    <div className="font-heading text-3xl font-black text-red-500">
                      ₹{item.todayPrice} <span className="text-xs font-normal text-gray-300">/ {item.unit}</span>
                    </div>
                  </div>

                  {/* 30-Day Trend Table */}
                  <div className="space-y-1.5 pt-2">
                    <div className="text-xs font-bold text-navy-950 uppercase border-b border-gray-100 pb-1">
                      Price History Trend:
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {item.history.map((h, hIdx) => (
                        <div key={hIdx} className="flex justify-between bg-gray-50 p-2 rounded text-gray-700">
                          <span className="text-gray-500">{h.day}:</span>
                          <span className="font-bold text-navy-950">₹{h.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-2">
                  <Link
                    href={`/price-list/${item.brandSlug}`}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase py-2.5 rounded-lg text-center block shadow-sm transition-all"
                  >
                    View Detailed Price Chart →
                  </Link>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/catalogues"
                      className="bg-gray-100 hover:bg-gray-200 text-navy-950 font-bold text-[11px] py-2 rounded-lg text-center flex items-center justify-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5 text-red-600" />
                      PDF Catalogue
                    </Link>
                    <a
                      href={`https://wa.me/919999307984?text=Hello%20RK%20Steel%20Co%2C%20please%20send%20today%27s%20price%20list%20for%20${encodeURIComponent(item.brandName)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#128C7E] hover:bg-[#075E54] text-white font-bold text-[11px] py-2 rounded-lg text-center flex items-center justify-center gap-1"
                    >
                      WhatsApp Price
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

