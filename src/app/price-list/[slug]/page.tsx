import Link from "next/link";
import { Metadata } from "next";
import { TrendingDown, TrendingUp, Download, ArrowLeft, ShieldCheck, CheckCircle2 } from "lucide-react";
import { connectToDatabase } from "@/lib/db";
import { PriceList } from "@/models/PriceList";
import { WholesaleRate } from "@/models/WholesaleRate";
import { RateCardsGallery } from "@/components/RateCardsGallery";
import { BrandLogo } from "@/components/BrandLogo";

export const dynamic = "force-dynamic";

interface BrandConfig {
  brandName: string;
  category: string;
  todayPricePerMT: string;
  yesterdayPricePerMT?: string;
  changeVsPrev: number;
  unit: string;
  sizeHeader: string;
  specHeader?: string;
  rateHeader: string;
  whatsappMessage: string;
  sizesPrice: Array<{
    size: string;
    spec?: string;
    pricePerMT: string;
    piecePrice: string;
  }>;
  metaTitle: string;
  metaDescription: string;
}

const BRAND_CONFIGS: Record<string, BrandConfig> = {
  "tata-tiscon": {
    brandName: "Tata Tiscon Price List in Noida",
    category: "Fe 550SD Super Ductile TMT Rebars",
    todayPricePerMT: "54,500",
    yesterdayPricePerMT: "55,000",
    changeVsPrev: -500,
    unit: "MT",
    sizeHeader: "Diameter Size",
    rateHeader: "Price per 12m Piece (₹/Piece)",
    whatsappMessage: "Hello RK Steel, I want the latest price quote for Tata Tiscon 550SD TMT Rebars in Noida.",
    metaTitle: "Tata Tiscon Price List in Noida | RK Steel Company",
    metaDescription: "Check today's live Tata Tiscon 550SD TMT rebar price list in Noida & Delhi NCR at RK STEEL CO. Authorized dealer, official rate card, and instant delivery.",
    sizesPrice: [
      { size: "6 mm", spec: "IS 1786:2008", pricePerMT: "56,500", piecePrice: "245" },
      { size: "8 mm", spec: "IS 1786:2008", pricePerMT: "56,500", piecePrice: "417" },
      { size: "10 mm", spec: "IS 1786:2008", pricePerMT: "55,500", piecePrice: "635" },
      { size: "12 mm", spec: "IS 1786:2008", pricePerMT: "54,500", piecePrice: "891" },
      { size: "16 mm", spec: "IS 1786:2008", pricePerMT: "54,500", piecePrice: "1,586" },
      { size: "20 mm", spec: "IS 1786:2008", pricePerMT: "54,500", piecePrice: "2,479" },
      { size: "25 mm", spec: "IS 1786:2008", pricePerMT: "54,500", piecePrice: "3,864" },
      { size: "32 mm", spec: "IS 1786:2008", pricePerMT: "55,500", piecePrice: "6,379" },
    ],
  },
  "tata-structura": {
    brandName: "Tata Structura Price List in Noida",
    category: "Square & Rectangular Hollow Sections (SHS / RHS) & Steel Tubes",
    todayPricePerMT: "58,200",
    yesterdayPricePerMT: "58,200",
    changeVsPrev: 0,
    unit: "MT",
    sizeHeader: "Section Dimensions / Type",
    specHeader: "Wall Thickness (mm)",
    rateHeader: "Approx Price per 6m Length / Piece (₹)",
    whatsappMessage: "Hello RK Steel, I want the latest price quote for Tata Structura Hollow Sections in Noida.",
    metaTitle: "Tata Structura Price List in Noida | RK Steel Company",
    metaDescription: "Check today's live Tata Structura steel hollow sections and pipes price list in Noida & Delhi NCR at RK STEEL CO. Ex-stockyard prices, wall thickness options & fast delivery.",
    sizesPrice: [
      { size: "SHS 25 x 25 mm", spec: "1.6 mm - 2.0 mm", pricePerMT: "58,200", piecePrice: "510 - 620" },
      { size: "SHS 40 x 40 mm", spec: "2.0 mm - 2.5 mm", pricePerMT: "58,200", piecePrice: "1,020 - 1,240" },
      { size: "SHS 50 x 50 mm", spec: "2.0 mm - 3.2 mm", pricePerMT: "58,200", piecePrice: "1,320 - 2,050" },
      { size: "SHS 72 x 72 mm", spec: "2.5 mm - 4.0 mm", pricePerMT: "58,200", piecePrice: "2,550 - 3,950" },
      { size: "SHS 100 x 100 mm", spec: "3.0 mm - 5.0 mm", pricePerMT: "58,200", piecePrice: "4,300 - 6,800" },
      { size: "RHS 50 x 25 mm", spec: "1.6 mm - 2.5 mm", pricePerMT: "58,200", piecePrice: "790 - 1,180" },
      { size: "RHS 80 x 40 mm", spec: "2.0 mm - 3.2 mm", pricePerMT: "58,200", piecePrice: "1,620 - 2,510" },
      { size: "RHS 100 x 50 mm", spec: "2.5 mm - 4.0 mm", pricePerMT: "58,200", piecePrice: "2,680 - 4,150" },
      { size: "RHS 122 x 61 mm", spec: "3.0 mm - 5.0 mm", pricePerMT: "58,200", piecePrice: "3,950 - 6,300" },
      { size: "RHS 150 x 75 mm", spec: "3.2 mm - 6.0 mm", pricePerMT: "58,200", piecePrice: "5,100 - 9,200" },
    ],
  },
  "tata-durashine": {
    brandName: "Tata Durashine Roofing Sheets Price List in Noida",
    category: "Colour Coated Galvalume Profile Sheets, Corrugated & Accessories",
    todayPricePerMT: "68,500",
    yesterdayPricePerMT: "68,000",
    changeVsPrev: 500,
    unit: "MT",
    sizeHeader: "Profile Type & Description",
    specHeader: "Thickness (mm / Gauge)",
    rateHeader: "Rate (₹ / Sq.Ft or Piece)",
    whatsappMessage: "Hello RK Steel, I want the latest price quote for Tata Durashine Roofing Sheets in Noida.",
    metaTitle: "Tata Durashine Price List in Noida | RK Steel Company",
    metaDescription: "Get today's official Tata Durashine colour coated roofing sheets price list in Noida & Delhi NCR at RK STEEL CO. Genuine Galvalume profile sheets, color options & ready stock.",
    sizesPrice: [
      { size: "Trapezoidal Roof Profile", spec: "0.45 mm / 28G", pricePerMT: "68,500", piecePrice: "46 - 49 / sq.ft" },
      { size: "Trapezoidal Roof Profile", spec: "0.50 mm / 26G", pricePerMT: "68,500", piecePrice: "51 - 54 / sq.ft" },
      { size: "Trapezoidal Roof Profile", spec: "0.60 mm / 24G", pricePerMT: "68,500", piecePrice: "62 - 66 / sq.ft" },
      { size: "Liner Wall Cladding Profile", spec: "0.45 mm", pricePerMT: "68,500", piecePrice: "47 / sq.ft" },
      { size: "Tile Profile (Heritage Tile)", spec: "0.50 mm", pricePerMT: "69,500", piecePrice: "56 / sq.ft" },
      { size: "Barge Board / Ridge Flashing", spec: "0.50 mm (8 ft length)", pricePerMT: "68,500", piecePrice: "195 / pc" },
    ],
  },
  "tata-kosh": {
    brandName: "Tata Kosh GI Sheet Price List in Noida",
    category: "Tata Kosh Galvanised (GI) Plain & Corrugated Sheets",
    todayPricePerMT: "66,000",
    yesterdayPricePerMT: "66,000",
    changeVsPrev: 0,
    unit: "MT",
    sizeHeader: "Sheet Gauge & Thickness",
    specHeader: "Width & Dimensions",
    rateHeader: "Approx Rate (₹ / Sheet or MT)",
    whatsappMessage: "Hello RK Steel, I want the latest price quote for Tata Kosh GI Sheets in Noida.",
    metaTitle: "Tata Kosh GI Sheet Price List in Noida | RK Steel Company",
    metaDescription: "Today's live Tata Kosh Galvanised (GI) corrugated & plain sheets price list in Noida at RK STEEL CO. Authorized distribution, thickness & gauge options.",
    sizesPrice: [
      { size: "0.40 mm (28 Gauge)", spec: "Width: 900 mm / 1220 mm (3ft / 4ft)", pricePerMT: "67,500", piecePrice: "590 - 790 / pc" },
      { size: "0.50 mm (26 Gauge)", spec: "Width: 900 mm / 1220 mm (3ft / 4ft)", pricePerMT: "66,800", piecePrice: "720 - 960 / pc" },
      { size: "0.63 mm (24 Gauge)", spec: "Width: 900 mm / 1220 mm (3ft / 4ft)", pricePerMT: "66,000", piecePrice: "890 - 1,190 / pc" },
      { size: "0.80 mm (22 Gauge)", spec: "Width: 900 mm / 1220 mm (3ft / 4ft)", pricePerMT: "65,500", piecePrice: "1,120 - 1,490 / pc" },
      { size: "1.00 mm (20 Gauge)", spec: "Width: 900 mm / 1220 mm (3ft / 4ft)", pricePerMT: "65,000", piecePrice: "1,390 - 1,850 / pc" },
      { size: "1.25 mm (18 Gauge)", spec: "Width: 900 mm / 1220 mm (3ft / 4ft)", pricePerMT: "64,500", piecePrice: "1,720 - 2,290 / pc" },
      { size: "1.60 mm (16 Gauge)", spec: "Width: 900 mm / 1220 mm (3ft / 4ft)", pricePerMT: "64,500", piecePrice: "2,190 - 2,920 / pc" },
    ],
  },
  "sail-seqr": {
    brandName: "SAIL SEQR 550D Price List in Noida",
    category: "Integrated Primary Mill TMT Rebars",
    todayPricePerMT: "52,800",
    yesterdayPricePerMT: "53,000",
    changeVsPrev: -200,
    unit: "MT",
    sizeHeader: "Diameter Size",
    rateHeader: "Approx Price per 12m Piece (₹/Piece)",
    whatsappMessage: "Hello RK Steel, I want the latest price quote for SAIL SEQR 550D TMT in Noida.",
    metaTitle: "SAIL SEQR TMT Price List in Noida | RK Steel Company",
    metaDescription: "Check today's live SAIL SEQR 550D TMT rebar price list in Noida & Delhi NCR at RK STEEL CO. Ex-stockyard prices, bundle details & fast delivery.",
    sizesPrice: [
      { size: "8 mm", spec: "IS 1786:2008", pricePerMT: "54,800", piecePrice: "259" },
      { size: "10 mm", spec: "IS 1786:2008", pricePerMT: "53,800", piecePrice: "398" },
      { size: "12 mm", spec: "IS 1786:2008", pricePerMT: "52,800", piecePrice: "562" },
      { size: "16 mm", spec: "IS 1786:2008", pricePerMT: "52,800", piecePrice: "1,001" },
      { size: "20 mm", spec: "IS 1786:2008", pricePerMT: "52,800", piecePrice: "1,565" },
      { size: "25 mm", spec: "IS 1786:2008", pricePerMT: "52,800", piecePrice: "2,439" },
      { size: "32 mm", spec: "IS 1786:2008", pricePerMT: "53,800", piecePrice: "4,073" },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cfg = BRAND_CONFIGS[slug];

  let dbMetaTitle = "";
  let dbMetaDesc = "";

  try {
    await connectToDatabase();
    const dbCard = await PriceList.findOne({ brandSlug: slug, isActive: true })
      .select("metaTitle metaDescription title")
      .lean();
    if (dbCard?.metaTitle) dbMetaTitle = dbCard.metaTitle;
    if (dbCard?.metaDescription) dbMetaDesc = dbCard.metaDescription;
  } catch (e) {
    // Ignore DB fetch failure in metadata
  }

  const title =
    dbMetaTitle ||
    cfg?.metaTitle ||
    `${slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} Price List in Noida | RK Steel Company`;
  const description =
    dbMetaDesc ||
    cfg?.metaDescription ||
    `Check today's live steel price list for ${slug.replace(/-/g, " ")} in Noida & Delhi NCR at RK STEEL CO.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.rksteelcompany.in/price-list/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.rksteelcompany.in/price-list/${slug}`,
      siteName: "RK STEEL CO",
      type: "website",
    },
  };
}

export default async function SinglePriceListPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Retrieve base config or construct fallback
  const baseCfg: BrandConfig = BRAND_CONFIGS[slug] || {
    brandName: `${slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} Price List in Noida`,
    category: "Structural & Prime Steel Products",
    todayPricePerMT: "54,000",
    changeVsPrev: 0,
    unit: "MT",
    sizeHeader: "Size / Dimensions",
    rateHeader: "Price (₹ / Unit)",
    whatsappMessage: `Hello RK Steel, I want the latest price quote for ${slug.replace(/-/g, " ")} in Noida.`,
    metaTitle: `${slug.replace(/-/g, " ")} Price List in Noida | RK Steel Company`,
    metaDescription: `Live daily rates for ${slug.replace(/-/g, " ")} in Noida at RK STEEL CO.`,
    sizesPrice: [],
  };

  let rateCards: any[] = [];
  let dbWholesale: any = null;
  let historyRecords: any[] = [];

  try {
    await connectToDatabase();

    // 1. Fetch official rate cards / flyers for this brand
    const rawCards = await PriceList.find({
      isActive: true,
      $or: [
        { brandSlug: slug },
        { brandSlug: { $regex: slug.replace(/-/g, " "), $options: "i" } },
      ],
    })
      .sort({ createdAt: -1 })
      .lean();

    rateCards = rawCards.map((doc: any) => ({
      ...doc,
      _id: doc._id.toString(),
      createdAt: doc.createdAt?.toISOString() || new Date().toISOString(),
    }));

    // 2. Fetch live wholesale benchmark for this brand
    dbWholesale = await WholesaleRate.findOne({ brandSlug: slug }).lean();

    // 3. Extract actual saved history records ONLY if available in DB
    const primaryCard = rateCards[0];
    if (primaryCard?.priceHistory && primaryCard.priceHistory.length > 0) {
      historyRecords = primaryCard.priceHistory.map((h: any) => ({
        date: new Date(h.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
        price: h.pricePerMT,
        note: h.notes || "Recorded Rate",
      }));
    } else if (dbWholesale?.history && dbWholesale.history.length > 0) {
      historyRecords = dbWholesale.history.map((h: any) => ({
        date: h.day,
        price: h.price,
        note: "Volatility Benchmark",
      }));
    }
  } catch (err) {
    console.error("Failed to fetch brand rate data:", err);
  }

  // Use live DB wholesale price if configured
  const todayPrice = dbWholesale?.todayPrice || baseCfg.todayPricePerMT;
  const changeVsPrev = dbWholesale?.changeVsPrev ?? baseCfg.changeVsPrev;

  return (
    <div className="space-y-0 bg-gray-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-navy-950 text-white py-14 border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/price-list"
            className="inline-flex items-center gap-1 text-xs text-red-400 hover:underline mb-2 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Price Lists
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl sm:text-5xl font-black text-white">
                {baseCfg.brandName}
              </h1>
              <p className="text-gray-300 text-sm max-w-2xl mt-2 font-light">
                {baseCfg.category} • Official authorised distribution rates in Noida &amp; Delhi NCR.
              </p>
            </div>
            <div className="h-12 bg-white/10 p-2 rounded-xl flex items-center justify-center backdrop-blur-xs self-start md:self-auto">
              <BrandLogo brand={slug} className="max-h-9" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* 1. Official Rate Cards / Flyers if uploaded */}
          {rateCards.length > 0 && (
            <RateCardsGallery initialCards={rateCards} />
          )}

          {/* 2. Top Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-navy-950 text-white p-6 rounded-2xl border border-navy-800 shadow-lg space-y-2">
              <div className="text-xs text-gray-400 font-semibold uppercase">Today's Benchmark Base Price</div>
              <div className="font-heading text-4xl font-black text-red-500">
                ₹{todayPrice} <span className="text-sm font-normal text-gray-300">/ {baseCfg.unit}</span>
              </div>
              <div className="text-xs text-gray-300">
                Office: G-38, Sector-9 | Godown: B-26, Sector-9, Noida
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500 font-semibold uppercase">Daily Price Trend</div>
                <div className="mt-1">
                  {changeVsPrev < 0 ? (
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-green-700 bg-green-50 px-3 py-1 rounded-lg border border-green-200">
                      <TrendingDown className="w-4 h-4" />
                      ↓ ₹{Math.abs(changeVsPrev)} / MT vs Yesterday
                    </span>
                  ) : changeVsPrev > 0 ? (
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-red-700 bg-red-50 px-3 py-1 rounded-lg border border-red-200">
                      <TrendingUp className="w-4 h-4" />
                      ↑ ₹{changeVsPrev} / MT vs Yesterday
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
                      Stable Today
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div className="text-xs text-gray-500 font-semibold uppercase">Instant Delivery Inquiry</div>
              <a
                href={`https://wa.me/919999307984?text=${encodeURIComponent(baseCfg.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#128C7E] hover:bg-[#075E54] text-white font-bold text-xs py-3 rounded-lg text-center uppercase tracking-wider block transition-colors"
              >
                Send Requirements on WhatsApp
              </a>
            </div>
          </div>

          {/* 3. Product-Specific Size / Dimension Breakdown Table */}
          {baseCfg.sizesPrice && baseCfg.sizesPrice.length > 0 && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="font-heading text-2xl font-bold text-navy-950">
                  {baseCfg.brandName} — Size &amp; Rate Breakdown
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Official distributor rates for Noida, Greater Noida, Ghaziabad &amp; Delhi NCR.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-gray-700">
                  <thead className="bg-gray-100 text-navy-950 font-bold uppercase text-[11px] border-b border-gray-200">
                    <tr>
                      <th className="p-3">{baseCfg.sizeHeader}</th>
                      {baseCfg.specHeader && <th className="p-3">{baseCfg.specHeader}</th>}
                      <th className="p-3">Price per Metric Ton (₹/MT)</th>
                      <th className="p-3">{baseCfg.rateHeader}</th>
                      <th className="p-3">Availability</th>
                      <th className="p-3">Direct Quote</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {baseCfg.sizesPrice.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-bold text-navy-950 text-sm">{row.size}</td>
                        {baseCfg.specHeader && (
                          <td className="p-3 font-semibold text-slate-700">{row.spec || "—"}</td>
                        )}
                        <td className="p-3 font-extrabold text-red-600 text-sm">
                          ₹{row.pricePerMT} / MT
                        </td>
                        <td className="p-3 font-bold text-navy-950">
                          ₹{row.piecePrice}
                        </td>
                        <td className="p-3">
                          <span className="inline-flex items-center gap-1 text-green-700 font-semibold bg-green-50 px-2 py-0.5 rounded text-[11px]">
                            <CheckCircle2 className="w-3 h-3" /> Ready Stock
                          </span>
                        </td>
                        <td className="p-3">
                          <a
                            href={`https://wa.me/919999307984?text=${encodeURIComponent(
                              `Hello RK Steel, I am interested in ${row.size} (${baseCfg.brandName}). Please provide the best rate quote.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] px-3 py-1.5 rounded transition-colors inline-block"
                          >
                            Book Rate
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. Price Movement History — ONLY SHOWN IF ACTUAL RECORDS EXIST IN DATABASE */}
          {historyRecords.length > 0 && (
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-heading text-2xl font-bold text-navy-950">
                Price Movement History (₹ / MT)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-2">
                {historyRecords.map((h, hIdx) => (
                  <div key={hIdx} className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-center space-y-1">
                    <div className="text-xs text-gray-500 font-semibold">{h.date}</div>
                    <div className="font-heading text-lg font-black text-navy-950">
                      ₹{typeof h.price === "number" ? h.price.toLocaleString("en-IN") : h.price}
                    </div>
                    <div className="text-[10px] text-gray-500 italic">{h.note}</div>
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
