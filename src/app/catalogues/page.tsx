import Link from "next/link";
import { Download } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { connectToDatabase } from "@/lib/db";
import { Catalogue } from "@/models/Catalogue";
import { initialCatalogues } from "@/lib/seedData";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Official Steel Product Catalogues PDF 2026 | Tata Steel, SAIL, JSW, APL Apollo, Jindal | RK STEEL CO",
  description: "View and download official product catalogues and weight charts for Tata Tiscon, SAIL SEQR, Tata Structura, Tata Durashine, JSW Neosteel, APL Apollo, Jindal Panther, and RK STEEL CO Master Catalogue 2026.",
};

export default async function CataloguesPage() {
  let cataloguesList: Array<{
    id?: string;
    title: string;
    brand: string;
    brandKey: string;
    desc: string;
    pdfUrl: string;
    isMaster: boolean;
    fileSize: string;
  }> = initialCatalogues.map((c, i) => ({
    id: `seed-${i}`,
    title: c.title,
    brand: c.brand,
    brandKey: c.brandKey,
    desc: c.desc,
    pdfUrl: c.pdfUrl,
    isMaster: !!c.isMaster,
    fileSize: c.fileSize || "PDF",
  }));

  try {
    await connectToDatabase();
    const dbCatalogues = await Catalogue.find({ isActive: true })
      .sort({ isMaster: -1, order: 1, createdAt: -1 })
      .lean();

    if (dbCatalogues && dbCatalogues.length > 0) {
      cataloguesList = dbCatalogues.map((cat: any) => ({
        id: String(cat._id),
        title: cat.title,
        brand: cat.brand,
        brandKey: cat.brandKey || "tata-steel",
        desc: cat.desc || "",
        pdfUrl: cat.pdfUrl,
        isMaster: !!cat.isMaster,
        fileSize: cat.fileSize || "PDF",
      }));
    }
  } catch (error) {
    console.error("Error loading dynamic catalogues from MongoDB:", error);
  }

  return (
    <div className="space-y-0 bg-gray-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-navy-950 text-white py-16 border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-navy-900 text-red-400 px-3.5 py-1.5 rounded text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 border border-navy-700">
            <Download className="w-4 h-4 text-red-500" />
            DIGITAL PRODUCT CATALOGUES &amp; WEIGHT CHARTS • RK STEEL CO
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
            Steel Catalogues Download Center
          </h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mt-3 font-normal leading-relaxed">
            Download official mill technical brochures and RK STEEL CO's Complete Master Product Catalogue 2026 in high-resolution PDF format.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="inline-block bg-red-950/70 border border-red-500/40 text-red-300 text-xs sm:text-sm font-bold px-4 py-2 rounded-lg font-sans">
              ALL STEEL AND IRON ITEMS UNDER ONE ROOF
            </span>
            <span className="inline-block bg-navy-900 border border-slate-700 text-slate-300 text-xs sm:text-sm font-medium px-3.5 py-2 rounded-lg">
              Showing {cataloguesList.length} Official Catalogues
            </span>
          </div>
        </div>
      </section>

      {/* Catalogues Grid */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cataloguesList.map((cat, idx) => (
              <div
                key={cat.id || idx}
                className={`bg-white rounded-2xl border p-7 shadow-sm hover:shadow-xl transition-all space-y-5 flex flex-col justify-between ${
                  cat.isMaster ? "border-2 border-red-600 ring-4 ring-red-100 bg-gradient-to-br from-white to-red-50/20" : "border-gray-200"
                }`}
              >
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3.5">
                    <div className="h-9 flex items-center">
                      {!cat.isMaster ? (
                        <BrandLogo brand={cat.brandKey} className="max-h-8" />
                      ) : (
                        <span className="font-extrabold text-xs sm:text-sm text-red-600 uppercase tracking-widest font-sans">
                          RK STEEL CO MASTER
                        </span>
                      )}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500 font-bold">{cat.fileSize}</span>
                  </div>

                  <h3 className="font-heading text-2xl font-bold text-navy-950">
                    {cat.title}
                  </h3>

                  <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3.5">
                  <a
                    href={cat.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm uppercase px-5 py-3 rounded-xl flex items-center gap-2 shadow-sm transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF Brochure
                  </a>

                  <a
                    href={`https://wa.me/919999307984?text=Hello%20RK%20Steel%20Co%2C%20please%20send%20the%20PDF%20catalogue%20for%20${encodeURIComponent(cat.title)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-[#128C7E] hover:underline flex items-center gap-1.5"
                  >
                    Request via WhatsApp →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
