import Link from "next/link";
import { ShieldCheck, TrendingDown, TrendingUp, Download, Phone, ArrowLeft, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

const SINGLE_PRICE_DATA: Record<string, any> = {
  "tata-tiscon": {
    brandName: "Tata Tiscon TMT Rebars Today's Price in Noida",
    category: "Fe 550D Super Ductile Rebars",
    todayPricePerMT: "54,500",
    yesterdayPricePerMT: "55,000",
    changeVsPrev: -500,
    unit: "MT",
    sizesPrice: [
      { size: "8 mm", pricePerMT: "56,500", piecePrice: "267" },
      { size: "10 mm", pricePerMT: "55,500", piecePrice: "410" },
      { size: "12 mm", pricePerMT: "54,500", piecePrice: "581" },
      { size: "16 mm", pricePerMT: "54,500", piecePrice: "1,033" },
      { size: "20 mm", pricePerMT: "54,500", piecePrice: "1,615" },
      { size: "25 mm", pricePerMT: "54,500", piecePrice: "2,518" },
      { size: "32 mm", pricePerMT: "55,500", piecePrice: "4,202" },
    ],
    history30Days: [
      { date: "Today", price: 54500, note: "Dropped ₹500/MT" },
      { date: "Yesterday", price: 55000, note: "Stable" },
      { date: "3 Days Ago", price: 55000, note: "Stable" },
      { date: "7 Days Ago", price: 55200, note: "Slight drop" },
      { date: "15 Days Ago", price: 55800, note: "High demand" },
      { date: "30 Days Ago", price: 56000, note: "Monthly Peak" },
    ],
  },
  "sail-seqr": {
    brandName: "SAIL SEQR 550D Today's Price List Noida",
    category: "Integrated Primary Mill TMT",
    todayPricePerMT: "52,800",
    yesterdayPricePerMT: "53,000",
    changeVsPrev: -200,
    unit: "MT",
    sizesPrice: [
      { size: "8 mm", pricePerMT: "54,800", piecePrice: "259" },
      { size: "10 mm", pricePerMT: "53,800", piecePrice: "398" },
      { size: "12 mm", pricePerMT: "52,800", piecePrice: "562" },
      { size: "16 mm", pricePerMT: "52,800", piecePrice: "1,001" },
      { size: "20 mm", pricePerMT: "52,800", piecePrice: "1,565" },
      { size: "25 mm", pricePerMT: "52,800", piecePrice: "2,439" },
      { size: "32 mm", pricePerMT: "53,800", piecePrice: "4,073" },
    ],
    history30Days: [
      { date: "Today", price: 52800, note: "Dropped ₹200/MT" },
      { date: "Yesterday", price: 53000, note: "Stable" },
      { date: "7 Days Ago", price: 53500, note: "Moderate drop" },
      { date: "30 Days Ago", price: 54200, note: "Monthly Peak" },
    ],
  },
};

export default async function SinglePriceListPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = SINGLE_PRICE_DATA[slug] || SINGLE_PRICE_DATA["tata-tiscon"];

  return (
    <div className="space-y-0 bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-navy-950 text-white py-14 border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/price-list" className="inline-flex items-center gap-1 text-xs text-red-400 hover:underline mb-2 font-semibold">
            <ArrowLeft className="w-4 h-4" />
            Back to All Price Lists
          </Link>
          <h1 className="font-heading text-3xl sm:text-5xl font-black text-white">
            {data.brandName}
          </h1>
          <p className="text-gray-300 text-sm max-w-2xl mt-2 font-light">
            Live daily rates, size-wise breakups, piece price calculations, and 30-day historical movement analysis.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Top Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-navy-950 text-white p-6 rounded-2xl border border-navy-800 shadow-lg space-y-2">
              <div className="text-xs text-gray-400 font-semibold uppercase">Today's Benchmark Base Price</div>
              <div className="font-heading text-4xl font-black text-red-500">
                ₹{data.todayPricePerMT} <span className="text-sm font-normal text-gray-300">/ MT</span>
              </div>
              <div className="text-xs text-gray-300">Ex-Stockyard Noida (Park, G-38, opp. G Block, Sector 9)</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500 font-semibold uppercase">Daily Price Trend</div>
                <div className="mt-1">
                  {data.changeVsPrev < 0 ? (
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-green-700 bg-green-50 px-3 py-1 rounded-lg border border-green-200">
                      <TrendingDown className="w-4 h-4" />
                      ↓ ₹{Math.abs(data.changeVsPrev)} / MT vs Yesterday
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-red-700 bg-red-50 px-3 py-1 rounded-lg border border-red-200">
                      <TrendingUp className="w-4 h-4" />
                      ↑ ₹{data.changeVsPrev} / MT
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div className="text-xs text-gray-500 font-semibold uppercase">Instant Delivery Inquiry</div>
              <a
                href={`https://wa.me/919999307984?text=Hello%20RK%20Steel%2C%20I%20want%20the%20latest%20rate%20quote%20for%20${encodeURIComponent(data.brandName)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#128C7E] hover:bg-[#075E54] text-white font-bold text-xs py-3 rounded-lg text-center uppercase tracking-wider block"
              >
                Send Requirements on WhatsApp
              </a>
            </div>
          </div>

          {/* Size-wise Price Table */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-heading text-2xl font-bold text-navy-950">
              Size-Wise Price & Piece Rate Breakdown
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-gray-700">
                <thead className="bg-gray-100 text-navy-950 font-bold uppercase text-[11px] border-b border-gray-200">
                  <tr>
                    <th className="p-3">Diameter Size</th>
                    <th className="p-3">Price per Metric Ton (₹/MT)</th>
                    <th className="p-3">Approx Price per 12m Piece (₹/Piece)</th>
                    <th className="p-3">Availability</th>
                    <th className="p-3">Direct Quote</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.sizesPrice.map((row: any, rIdx: number) => (
                    <tr key={rIdx} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 font-bold text-navy-950 text-sm">{row.size}</td>
                      <td className="p-3 font-extrabold text-red-600 text-sm">₹{row.pricePerMT} / MT</td>
                      <td className="p-3 font-bold text-navy-950">₹{row.piecePrice} / pc</td>
                      <td className="p-3 text-green-700 font-semibold">Ready Stock</td>
                      <td className="p-3">
                        <a
                          href={`https://wa.me/919999307984?text=Hello%20RK%20Steel%2C%20I%20am%20interested%20in%20size%20${encodeURIComponent(row.size)}%20for%20${encodeURIComponent(data.brandName)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] px-3 py-1.5 rounded"
                        >
                          Book Size Rate
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 30-Day Historical Trend Bar */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-heading text-2xl font-bold text-navy-950">
              30-Day Price Movement History (₹ / MT)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-2">
              {data.history30Days.map((h: any, hIdx: number) => (
                <div key={hIdx} className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-center space-y-1">
                  <div className="text-xs text-gray-500 font-semibold">{h.date}</div>
                  <div className="font-heading text-lg font-black text-navy-950">₹{h.price.toLocaleString()}</div>
                  <div className="text-[10px] text-gray-500 italic">{h.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
