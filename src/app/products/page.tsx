import { connectToDatabase } from "@/lib/db";
import { Product } from "@/models/Product";
import Link from "next/link";
import { ShieldCheck, CheckCircle, ArrowRight, Tag, Search, Filter } from "lucide-react";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Steel Products Catalogue | RK STEEL CO Noida",
  description: "Browse Tata Tiscon, Tata Structura, Tata Durashine, SAIL SEQR, JSW Neosteel, Jindal Panther, AP Apollo pipes, MS Weldmesh, and Structural Steel at RK STEEL CO. All steel and iron items under one roof.",
};

const CATEGORIES = [
  "All",
  "TMT Bars",
  "Pipes & Hollow Sections",
  "Structural Steel",
  "Colour Coated & Roofing Sheets",
  "MS/HR/CR/GI Sheets & Plates",
  "Weldmesh",
  "Chain Link & Accessories",
];

const BRANDS = ["All", "Tata Steel", "Tata Tiscon", "Tata Structura", "Tata Durashine", "SAIL", "JSW Steel", "Jindal Steel", "AP Apollo"];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; brand?: string; search?: string }>;
}) {
  await headers();
  const params = await searchParams;
  const activeCategory = params.category || "All";
  const activeBrand = params.brand || "All";
  const searchQuery = params.search || "";

  const query: any = {};
  if (activeCategory !== "All") {
    query.category = activeCategory;
  }
  if (activeBrand !== "All") {
    query.brand = { $regex: activeBrand, $options: "i" };
  }
  if (searchQuery) {
    query.$or = [
      { name: { $regex: searchQuery, $options: "i" } },
      { description: { $regex: searchQuery, $options: "i" } },
      { category: { $regex: searchQuery, $options: "i" } },
    ];
  }

  let products: any[] = [];
  try {
    await connectToDatabase();
    products = await Product.find(query).lean();
  } catch (err) {
    console.error("Failed to fetch products:", err);
  }

  return (
    <div className="space-y-0">
      {/* Header Banner */}
      <section className="bg-navy-950 text-white py-16 border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-navy-900 text-gold-400 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-2 border border-navy-700">
            <ShieldCheck className="w-4 h-4 text-gold-500" />
            DIRECT AUTHORISED MILL DISTRIBUTOR CATALOGUE • RK STEEL CO
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-white">
            Steel Product Catalogue
          </h1>
          <p className="text-gray-300 text-sm max-w-2xl mt-2 font-light">
            Search our comprehensive inventory of TMT bars, structural pipes, roofing sheets, hot/cold rolled plates, weldmesh, and chain link fencing.
          </p>
          <div className="mt-3 inline-block bg-red-950/70 border border-red-500/40 text-red-300 text-xs font-bold px-3 py-1 rounded">
            TAGLINE: ALL STEEL AND IRON ITEMS UNDER ONE ROOF
          </div>
        </div>
      </section>

      {/* Main Catalog View */}
      <section className="py-12 bg-steel-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Filter Bar */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 space-y-6">
            {/* Category Filter Chips */}
            <div>
              <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-red-600" />
                Filter By Category:
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => {
                  const isSelected = activeCategory === cat;
                  const href = `/products?category=${encodeURIComponent(cat)}&brand=${encodeURIComponent(activeBrand)}`;
                  return (
                    <Link
                      key={cat}
                      href={href}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        isSelected
                          ? "bg-red-600 text-white shadow-sm"
                          : "bg-steel-100 text-navy-900 hover:bg-navy-900 hover:text-white"
                      }`}
                    >
                      {cat}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="border-t border-gray-200 pt-4 flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-navy-900 uppercase tracking-wider mr-2">Brand:</span>
                {BRANDS.map((b) => {
                  const isSelected = activeBrand === b;
                  const href = `/products?category=${encodeURIComponent(activeCategory)}&brand=${encodeURIComponent(b)}`;
                  return (
                    <Link
                      key={b}
                      href={href}
                      className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                        isSelected
                          ? "bg-navy-900 text-gold-400 border border-navy-900"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {b}
                    </Link>
                  );
                })}
              </div>

              {/* Total Count */}
              <div className="text-xs font-bold text-gray-500">
                Showing <span className="text-navy-900 font-extrabold">{products.length}</span> Products
              </div>
            </div>
          </div>

          {/* Product Cards Grid */}
          {products.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-xl border border-gray-200 space-y-3">
              <Tag className="w-12 h-12 text-gray-400 mx-auto" />
              <h3 className="font-heading text-xl font-bold text-navy-900">No products match this filter</h3>
              <p className="text-xs text-gray-500">Try clearing filters to see our full catalogue.</p>
              <Link href="/products" className="inline-block text-xs font-bold text-red-600 uppercase">
                Reset All Filters →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod: any) => (
                <div
                  key={prod._id}
                  className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-gold-500/50 transition-all group"
                >
                  {/* Card Image */}
                  <div className="relative h-48 bg-navy-950 overflow-hidden">
                    {prod.images?.[0]?.url ? (
                      <div
                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500 opacity-90"
                        style={{ backgroundImage: `url('${prod.images[0].url}')` }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-navy-700 font-heading text-xl">
                        RK STEEL CO
                      </div>
                    )}

                    {prod.authorisedDealer && (
                      <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-gold-400" />
                        Authorised Dealer
                      </div>
                    )}

                    <div className="absolute bottom-3 right-3 bg-navy-900/90 text-gold-400 text-[10px] font-bold px-2 py-0.5 rounded border border-navy-700">
                      {prod.brand}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="text-[11px] font-bold text-red-600 uppercase tracking-wider">
                        {prod.category}
                      </div>
                      <h3 className="font-heading text-xl font-bold text-navy-900 group-hover:text-red-600 transition-colors">
                        {prod.name}
                      </h3>
                      {prod.gradeStandard && (
                        <div className="text-xs text-gray-600 font-medium">
                          <strong>Standard:</strong> {prod.gradeStandard}
                        </div>
                      )}
                      <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                        {prod.description}
                      </p>
                    </div>

                    {/* Specs Pills */}
                    {prod.specs && prod.specs.length > 0 && (
                      <div className="border-t border-gray-100 pt-3 space-y-1">
                        {prod.specs.slice(0, 2).map((spec: string, sIdx: number) => (
                          <div key={sIdx} className="flex items-center gap-1.5 text-[11px] text-gray-700">
                            <CheckCircle className="w-3 h-3 text-gold-500 flex-shrink-0" />
                            <span className="truncate">{spec}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Footer Button */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-1.5">
                      <Link
                        href={`/products/${prod.slug}`}
                        className="text-xs font-bold text-red-600 hover:text-navy-900 flex items-center gap-0.5 transition-colors"
                      >
                        View Specs
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <div className="flex items-center gap-1.5">
                        <a
                          href={`https://wa.me/919999307984?text=Hello%20RK%20Steel%20Co%2C%20I%20am%20interested%20in%20inquiring%20about%20the%20product%3A%20${encodeURIComponent(prod.name)}.%20Please%20provide%20the%20latest%20rates.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#25D366] hover:bg-[#128C7E] text-white p-2 rounded transition-colors flex items-center justify-center shadow-sm"
                          title="Inquire on WhatsApp"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                        </a>
                        <Link
                          href={`/contact?product=${encodeURIComponent(prod.name)}`}
                          className="bg-navy-900 text-gold-400 text-[10px] font-bold px-2.5 py-1.5 rounded hover:bg-red-600 hover:text-white transition-colors"
                        >
                          Inquire Price
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
