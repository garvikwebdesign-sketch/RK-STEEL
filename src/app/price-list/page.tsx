import Link from "next/link";
import { ShieldCheck, TrendingUp, TrendingDown, Download, Phone, ArrowRight, FileText } from "lucide-react";
import { headers } from "next/headers";
import { BrandLogo } from "@/components/BrandLogo";
import { connectToDatabase } from "@/lib/db";
import { PriceList } from "@/models/PriceList";
import { WholesaleRate } from "@/models/WholesaleRate";
import { SiteSetting } from "@/models/SiteSetting";
import { initialWholesaleRates } from "@/lib/seedData";
import { RateCardsGallery } from "@/components/RateCardsGallery";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Daily Steel Price List & Market Updates Noida | Tata Tiscon, SAIL, JSW, Jindal | RK STEEL CO",
  description: "Check today's live steel price list in Noida & Delhi NCR for Tata Tiscon TMT, SAIL SEQR 550D, Tata Structura, Tata Durashine, JSW Neosteel, Jindal Panther, and APL Apollo at RK STEEL CO.",
};

export default async function PriceListHubPage() {
  await headers();
  let rateCards: any[] = [];
  let wholesaleRates: any[] = [];
  let showWholesaleSection = true;

  try {
    await connectToDatabase();

    // 1. Fetch Rate Cards
    const rawCards = await PriceList.find({
      isActive: true,
      $or: [
        { flyerUrl: { $exists: true, $ne: "" } },
        { "items.0": { $exists: true } },
      ],
    })
      .sort({ isFeatured: -1, createdAt: -1 })
      .lean();

    rateCards = rawCards.map((doc: any) => ({
      ...doc,
      _id: doc._id.toString(),
      createdAt: doc.createdAt?.toISOString() || new Date().toISOString(),
    }));

    // 2. Check Wholesale Section Visibility Toggle
    const settingDoc = await SiteSetting.findOne({ key: "showWholesaleRatesSection" }).lean();
    if (settingDoc && settingDoc.value === false) {
      showWholesaleSection = false;
    }

    // 3. Fetch Wholesale Rates if Section is Active
    if (showWholesaleSection) {
      const dbWholesale = await WholesaleRate.find({ isActive: true })
        .sort({ order: 1, createdAt: 1 })
        .lean();

      if (dbWholesale && dbWholesale.length > 0) {
        wholesaleRates = dbWholesale;
      } else {
        wholesaleRates = initialWholesaleRates;
      }
    }
  } catch (err) {
    console.error("Failed to fetch price list data:", err);
    wholesaleRates = initialWholesaleRates;
  }

  return (
    <div className="space-y-0 bg-gray-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-navy-950 text-white py-16 border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-navy-900 text-red-400 px-3.5 py-1.5 rounded text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 border border-navy-700">
            <TrendingUp className="w-4 h-4 text-red-500" />
            DAILY MARKET UPDATES &amp; 30-DAY PRICE HISTORY • RK STEEL CO
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
            Steel Price Lists &amp; Market Updates
          </h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mt-3 font-normal leading-relaxed">
            Live today's steel price list for Tata Tiscon, SAIL SEQR, Tata Structura, JSW Steel, Jindal Panther, and APL Apollo in Noida &amp; Delhi NCR with historical trend tracking.
          </p>
          <div className="mt-4 inline-block bg-red-950/70 border border-red-500/40 text-red-300 text-xs sm:text-sm font-bold px-4 py-2 rounded-lg font-sans">
            ALL STEEL AND IRON ITEMS UNDER ONE ROOF
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* 1. Official Uploaded Rate Cards & Circular Flyers */}
          {rateCards.length > 0 && (
            <RateCardsGallery initialCards={rateCards} />
          )}

          {/* 2. Benchmark Metric Ton (MT) Price Overview (Toggleable & Manageable via Admin) */}
          {showWholesaleSection && wholesaleRates.length > 0 && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider bg-red-50 px-3 py-1 rounded-md border border-red-100">
                  Metric Ton Benchmarks
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-sans">
                  Live Wholesale Ex-Stockyard Rates (Per MT)
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Comparative wholesale baseline pricing with 30-day volatility index for bulk procurement.
                </p>
              </div>

              {/* Price Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wholesaleRates.map((item: any) => (
                <div
                  key={item.brandSlug || item._id}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-red-500/50 transition-all p-7 space-y-6 flex flex-col justify-between"
                >
                <div className="space-y-4">
                  {/* Card Brand Header */}
                  <div className="flex justify-between items-start border-b border-gray-100 pb-3.5">
                    <div className="h-9 flex items-center">
                      <BrandLogo brand={item.brandSlug} className="max-h-8" />
                    </div>
                    {item.changeVsPrev < 0 ? (
                      <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-green-700 bg-green-50 px-3 py-1 rounded-lg border border-green-200">
                        <TrendingDown className="w-4 h-4" />
                        ↓ ₹{Math.abs(item.changeVsPrev)}/MT
                      </span>
                    ) : item.changeVsPrev > 0 ? (
                      <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-red-700 bg-red-50 px-3 py-1 rounded-lg border border-red-200">
                        <TrendingUp className="w-4 h-4" />
                        ↑ ₹{item.changeVsPrev}/MT
                      </span>
                    ) : (
                      <span className="text-xs sm:text-sm font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
                        Stable
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider bg-red-50 px-2.5 py-1 rounded border border-red-100">
                      {item.category}
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-navy-950 mt-1.5">
                      {item.brandName}
                    </h3>
                  </div>

                  {/* Today Price Highlight */}
                  <div className="bg-navy-950 text-white p-5 rounded-2xl space-y-1 shadow-md">
                    <div className="text-xs text-gray-300 font-semibold uppercase tracking-wider">Today's Estimated Rate</div>
                    <div className="font-heading text-3xl sm:text-4xl font-black text-red-500">
                      ₹{item.todayPrice} <span className="text-sm font-sans font-normal text-gray-300">/ {item.unit}</span>
                    </div>
                  </div>

                  {/* 30-Day Trend Table */}
                  <div className="space-y-2 pt-2">
                    <div className="text-xs sm:text-sm font-bold text-navy-950 uppercase border-b border-gray-100 pb-1.5">
                      Price History Trend:
                    </div>
                    <div className="grid grid-cols-2 gap-2.5 text-xs sm:text-sm">
                      {item.history.map((h: any, hIdx: number) => (
                        <div key={hIdx} className="flex justify-between bg-gray-50 p-2.5 rounded-lg text-gray-700">
                          <span className="text-gray-500">{h.day}:</span>
                          <span className="font-bold text-navy-950">₹{h.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2.5 pt-2">
                  <Link
                    href={`/price-list/${item.brandSlug}`}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm uppercase py-3 rounded-xl text-center block shadow-md transition-all"
                  >
                    View Detailed Price Chart →
                  </Link>

                  <div className="grid grid-cols-2 gap-2.5">
                    <Link
                      href="/catalogues"
                      className="bg-gray-100 hover:bg-gray-200 text-navy-950 font-bold text-xs sm:text-sm py-2.5 rounded-xl text-center flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-4 h-4 text-red-600" />
                      PDF Catalogue
                    </Link>
                    <a
                      href={`https://wa.me/919999307984?text=Hello%20RK%20Steel%20Co%2C%20please%20send%20today%27s%20price%20list%20for%20${encodeURIComponent(item.brandName)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#128C7E] hover:bg-[#075E54] text-white font-bold text-xs sm:text-sm py-2.5 rounded-xl text-center flex items-center justify-center gap-1.5"
                    >
                      WhatsApp Price
                    </a>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        )}
      </div>
    </section>
    </div>
  );
}

