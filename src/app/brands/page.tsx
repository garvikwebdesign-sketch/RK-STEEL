import { connectToDatabase } from "@/lib/db";
import { BrandPageModel } from "@/models/BrandPage";
import { PriceList } from "@/models/PriceList";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, ArrowRight, Download, Phone, FileText, ChevronRight, Calculator } from "lucide-react";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Authorised Steel Brands Hub | Tata Steel, SAIL, JSW, AP Apollo | RK Steel Noida",
  description: "Explore dedicated brand hubs for Tata Tiscon, SAIL SEQR, Tata Structura, Tata Durashine, Tata Astrum, JSW Neosteel, and APL Apollo pipes.",
};

const BRANDS_LIST = [
  {
    slug: "tata-tiscon",
    name: "Tata Tiscon TMT Bars",
    parent: "Tata Steel",
    desc: "Fe 550D Super Ductile TMT rebars engineered with GreenPro certification for earthquake-resistant high-rise construction.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
    badge: "Authorised Main Dealer",
    sizes: "8mm - 32mm",
    grades: "Fe 500D, Fe 550D, Super Ductile",
  },
  {
    slug: "sail-seqr",
    name: "SAIL SEQR 550D TMT",
    parent: "SAIL (Steel Authority of India)",
    desc: "Primary integrated mill certified TMT rebars offering superior bendability, thermal resistance, and high yield strength.",
    image: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=600&q=80",
    badge: "Premier Stockist",
    sizes: "8mm - 36mm",
    grades: "Fe 500D, Fe 550D",
  },
  {
    slug: "tata-structura",
    name: "Tata Structura Hollow Tubes",
    parent: "Tata Steel",
    desc: "Square and rectangular hollow structural steel sections (YST 310) designed for PEB industrial sheds, airports, and towers.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    badge: "Authorised Distributor",
    sizes: "25x25mm - 300x300mm",
    grades: "YST 210, YST 310",
  },
  {
    slug: "tata-durashine",
    name: "Tata Durashine Roofing Sheets",
    parent: "Tata Steel",
    desc: "Premium Galvalume colour-coated trapezoidal roofing sheets, wall cladding, and accessories for residential & commercial roofs.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
    badge: "Authorised Dealer",
    sizes: "0.45mm - 0.60mm thickness",
    grades: "AZ150 Galvalume",
  },
  {
    slug: "tata-astrum",
    name: "Tata Astrum & Steelium",
    parent: "Tata Steel",
    desc: "Hot rolled (HR) & cold rolled (CR) steel sheets, plates, and coils processed with tight gauge tolerances for fabrication.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
    badge: "Authorised Stockist",
    sizes: "1.2mm - 20mm thickness",
    grades: "IS 2062 E250 / E350",
  },
  {
    slug: "jsw-neosteel",
    name: "JSW Neosteel TMT Bars",
    parent: "JSW Steel",
    desc: "Pure steel TMT rebars produced from virgin iron ore with lowest level of tramp elements for maximum structural strength.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    badge: "Direct Yard Partner",
    sizes: "8mm - 32mm",
    grades: "Fe 550D",
  },
  {
    slug: "apl-apollo",
    name: "APL Apollo MS & GI Pipes",
    parent: "APL Apollo Tubes Ltd.",
    desc: "Black MS ERW pipes, galvanised (GI) tubes, and hollow sections for plumbing, fire-fighting sprinklers, and structural framing.",
    image: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=600&q=80",
    badge: "Authorised Stockist",
    sizes: "15mm NB - 300mm NB",
    grades: "IS 1239 / IS 3589",
  },
];

export default async function BrandsPage() {
  await headers();
  return (
    <div className="space-y-0 bg-gray-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-navy-950 text-white py-14 border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-navy-900 text-red-400 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-2 border border-navy-700">
            <ShieldCheck className="w-4 h-4 text-red-500" />
            DIRECT AUTHORISED MILL DISTRIBUTOR HUB
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-white">
            Authorised Steel Brands
          </h1>
          <p className="text-gray-300 text-sm max-w-2xl mt-2 font-light">
            Dedicated brand landing hubs for Tata Steel, SAIL, JSW Steel, and APL Apollo with ready stock availability, weight charts, and today's mill pricing.
          </p>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BRANDS_LIST.map((b) => (
              <div
                key={b.slug}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-red-500/50 transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  <div className="relative h-48 bg-navy-950 overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500 opacity-80"
                      style={{ backgroundImage: `url('${b.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow">
                      {b.badge}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                      <span className="text-xs font-bold text-gray-200 uppercase tracking-wide">
                        {b.parent}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-heading text-2xl font-bold text-navy-950 group-hover:text-red-600 transition-colors">
                      {b.name}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {b.desc}
                    </p>

                    <div className="border-t border-gray-100 pt-3 space-y-1.5 text-xs text-gray-700">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-500">Available Sizes:</span>
                        <span className="font-bold text-navy-900">{b.sizes}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-500">Primary Grades:</span>
                        <span className="font-bold text-navy-900">{b.grades}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-2">
                  <Link
                    href={`/brands/${b.slug}`}
                    className="w-full bg-navy-950 hover:bg-red-600 text-white font-bold text-xs uppercase px-4 py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    Explore Brand Landing Page
                    <ChevronRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/price-list/${b.slug}`}
                    className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs px-4 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors border border-red-200"
                  >
                    View Today's Rate & Trend
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
