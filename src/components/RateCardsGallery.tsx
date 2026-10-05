"use client";

import { useState } from "react";
import {
  Download,
  Eye,
  Calendar,
  MapPin,
  CheckCircle2,
  Phone,
  MessageSquare,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  X,
  FileText,
  Tag,
} from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

export interface RateCardItem {
  size: string;
  pricePerPiece?: number;
  pricePerMT?: number;
  unit?: string;
}

export interface RateCardRecord {
  _id: string;
  title: string;
  brand: string;
  brandSlug: string;
  category: string;
  effectiveDate: string;
  validityRegion?: string;
  flyerUrl?: string;
  pdfUrl?: string;
  items: RateCardItem[];
  notes: string[];
  isActive: boolean;
  isFeatured: boolean;
  currentPricePerMT?: number;
  unit: string;
  createdAt: string;
}

export function RateCardsGallery({ initialCards }: { initialCards: RateCardRecord[] }) {
  const [cards] = useState<RateCardRecord[]>(initialCards || []);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [activeModalFlyer, setActiveModalFlyer] = useState<{ url: string; title: string } | null>(
    null
  );
  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({});

  const brands = [
    "All",
    ...Array.from(new Set(cards.map((c) => c.brand || (c as any).brandName).filter(Boolean))),
  ];

  const filteredCards = cards.filter((c) => {
    const bName = c.brand || (c as any).brandName || "";
    if (selectedBrand === "All") return true;
    return bName.toLowerCase() === selectedBrand.toLowerCase();
  });

  const toggleExpand = (id: string) => {
    setExpandedDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename || "RK-Steel-Price-List.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      // Fallback
      window.open(url, "_blank");
    }
  };

  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider mb-2 border border-red-100">
            <Tag className="w-3.5 h-3.5" />
            Official Brand Rate Cards &amp; Circulars
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
            Latest Consumer Price Lists &amp; Flyers
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Download and view official manufacturer price circulars updated periodically with effective dates and size-wise consumer rates.
          </p>
        </div>

        {/* Brand Filters */}
        <div className="flex flex-wrap gap-2">
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBrand(b)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedBrand === b
                  ? "bg-red-600 text-white shadow-sm"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Rate Cards Showcase Grid */}
      <div className="space-y-10">
        {filteredCards.map((card) => {
          const brand = card.brand || (card as any).brandName || "Tata Tiscon";
          const brandSlug = card.brandSlug || brand.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          const effectiveDate = card.effectiveDate || "Latest";
          const title = card.title || (card as any).productName || `${brand} Recommended Price List`;
          const isDetailsOpen = expandedDetails[card._id] ?? true;
          const downloadFilename = `${brand.replace(/\s+/g, "_")}_Price_List_${effectiveDate.replace(/\s+/g, "_")}.jpg`;

          return (
            <div
              key={card._id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Card Top Banner */}
              <div className="bg-[#0B192C] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white p-1.5 flex items-center justify-center flex-shrink-0">
                    <BrandLogo brand={brandSlug} className="max-h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-sans">{title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-0.5">
                      <span className="flex items-center gap-1 font-semibold text-amber-400">
                        <Calendar className="w-3.5 h-3.5" />
                        With Effect From: <strong>{effectiveDate}</strong>
                      </span>
                      {card.validityRegion && (
                        <span className="flex items-center gap-1 text-slate-400">
                          <MapPin className="w-3.5 h-3.5" />
                          {card.validityRegion}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-300 border border-green-500/30 text-[11px] font-bold px-3 py-1 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    Current Active Rate
                  </span>
                </div>
              </div>

              {/* Main Content Layout: Flyer Image (Left) + Structured Price Table (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 items-start">
                {/* Left: Flyer Preview Poster */}
                <div className="lg:col-span-5 flex flex-col items-center">
                  <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md bg-slate-900 group">
                    {card.flyerUrl ? (
                      <>
                        <img
                          src={card.flyerUrl}
                          alt={title}
                          className="w-full h-auto max-h-[500px] object-cover object-top group-hover:scale-102 transition-transform duration-300 cursor-pointer"
                          onClick={() =>
                            setActiveModalFlyer({ url: card.flyerUrl!, title })
                          }
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                          <button
                            onClick={() =>
                              setActiveModalFlyer({ url: card.flyerUrl!, title })
                            }
                            className="bg-white text-slate-900 font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-lg hover:bg-slate-100 cursor-pointer"
                          >
                            <Eye className="w-4 h-4 text-red-600" />
                            Zoom Flyer
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="py-24 text-center text-slate-400 space-y-2">
                        <FileText className="w-12 h-12 mx-auto text-slate-600" />
                        <p className="text-xs">Official Rate Card Document</p>
                      </div>
                    )}
                  </div>

                  {/* Flyer action buttons */}
                  <div className="w-full max-w-sm flex items-center gap-2 mt-4">
                    {card.flyerUrl && (
                      <button
                        onClick={() => handleDownload(card.flyerUrl!, downloadFilename)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        Download Flyer
                      </button>
                    )}
                    {card.flyerUrl && (
                      <button
                        onClick={() =>
                          setActiveModalFlyer({ url: card.flyerUrl!, title })
                        }
                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        title="View Full Resolution"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    )}
                  </div>
                </div>

                {/* Right: Structured Table & Details */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                        {brand} • {card.category || "TMT Bars"}
                      </span>
                      <h4 className="text-xl font-bold text-slate-900 mt-0.5 font-sans">
                        Recommended Consumer Price List
                      </h4>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      Effective: <strong className="text-slate-900">{effectiveDate}</strong>
                    </span>
                  </div>

                  {/* Size-wise table */}
                  {card.items && card.items.length > 0 ? (
                    <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-amber-400 text-slate-950 text-xs sm:text-sm font-extrabold uppercase font-sans">
                            <th className="py-3 px-4 border-b border-amber-500">Sizes (in mm)</th>
                            <th className="py-3 px-4 border-b border-amber-500 text-right">
                              Recommended Price ({card.items[0]?.unit || "Per Piece"})
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-sans">
                          {card.items.map((row, rIdx) => (
                            <tr
                              key={rIdx}
                              className={rIdx % 2 === 0 ? "bg-white hover:bg-amber-50/40" : "bg-slate-50/70 hover:bg-amber-50/40"}
                            >
                              <td className="py-3 px-4 font-bold text-slate-800 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-600 flex-shrink-0" />
                                {row.size}
                              </td>
                              <td className="py-3 px-4 font-black text-slate-950 text-right font-heading text-sm sm:text-base">
                                ₹{row.pricePerPiece ? row.pricePerPiece.toLocaleString("en-IN") : row.pricePerMT ? row.pricePerMT.toLocaleString("en-IN") : "-"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-6 bg-slate-50 rounded-2xl text-slate-500 text-xs text-center border border-slate-200">
                      Please refer to the attached flyer above for detailed pricing dimensions.
                    </div>
                  )}

                  {/* Disclaimers & Notes */}
                  {card.notes && card.notes.length > 0 && (
                    <div className="bg-amber-50/60 rounded-2xl p-4 border border-amber-200/80 space-y-2">
                      <div className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-amber-700" />
                        Important Notes &amp; Delivery Terms:
                      </div>
                      <ul className="text-xs text-amber-900 space-y-1 pl-4 list-disc marker:text-amber-600 font-sans">
                        {card.notes.map((note, nIdx) => (
                          <li key={nIdx}>{note}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Immediate Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://wa.me/919999307984?text=Hello%20RK%20Steel%20Company%2C%20I%20am%20referring%20to%20the%20${encodeURIComponent(card.title)}%20(Effective%20${encodeURIComponent(card.effectiveDate)}).%20Please%20quote%20for%20my%20requirement.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      Order at this Rate on WhatsApp
                    </a>

                    <a
                      href="tel:9999307984"
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <Phone className="w-4 h-4" />
                      Call Desk: 9999307984
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {activeModalFlyer && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setActiveModalFlyer(null)}
        >
          <div
            className="relative max-w-3xl max-h-[92vh] bg-white rounded-3xl p-3 shadow-2xl overflow-hidden flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="w-full flex items-center justify-between pb-3 px-3 border-b border-slate-100">
              <span className="font-bold text-sm text-slate-800 line-clamp-1">
                {activeModalFlyer.title}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    handleDownload(activeModalFlyer.url, `${activeModalFlyer.title}.jpg`)
                  }
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
                <button
                  onClick={() => setActiveModalFlyer(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Flyer Image Container */}
            <div className="overflow-y-auto max-h-[80vh] p-2 flex justify-center">
              <img
                src={activeModalFlyer.url}
                alt={activeModalFlyer.title}
                className="max-h-[78vh] w-auto object-contain rounded-xl shadow"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
