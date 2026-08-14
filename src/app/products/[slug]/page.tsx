import { connectToDatabase } from "@/lib/db";
import { Product } from "@/models/Product";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, ArrowLeft, Phone, Mail } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectToDatabase();
  const product = await Product.findOne({ slug }).lean();
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} | RK Steel Company Noida`,
    description: product.description ? product.description.substring(0, 160) : "",
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectToDatabase();
  const product = await Product.findOne({ slug }).lean();

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-steel-100 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 hover:text-red-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Product Catalogue
        </Link>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column Image */}
          <div className="lg:col-span-5 bg-navy-950 p-6 flex flex-col justify-between relative min-h-[350px]">
            {product.images?.[0]?.url ? (
              <div
                className="w-full h-full bg-cover bg-center rounded-xl min-h-[300px]"
                style={{ backgroundImage: `url('${product.images[0].url}')` }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 font-heading text-2xl">
                RK STEEL
              </div>
            )}

            {product.authorisedDealer && (
              <div className="absolute top-8 left-8 bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded shadow flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                Authorised Dealer Guaranteed
              </div>
            )}
          </div>

          {/* Right Column Details */}
          <div className="lg:col-span-7 p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider bg-red-50 text-red-600 px-3 py-1 rounded border border-red-200">
                  {product.category}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider bg-navy-900 text-gold-400 px-3 py-1 rounded border border-navy-700">
                  {product.brand}
                </span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy-900">
                {product.name}
              </h1>

              {product.gradeStandard && (
                <div className="text-xs font-semibold text-gray-700 bg-steel-100 p-2.5 rounded border border-gray-200">
                  <span className="text-navy-900 font-bold">Standard / Grade:</span> {product.gradeStandard}
                </div>
              )}

              {product.sizeRange && (
                <div className="text-xs font-semibold text-gray-700 bg-steel-100 p-2.5 rounded border border-gray-200">
                  <span className="text-navy-900 font-bold">Available Size Range:</span> {product.sizeRange}
                </div>
              )}

              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed border-t border-gray-100 pt-4">
                {product.description}
              </p>

              {/* Technical Highlights */}
              {product.specs && product.specs.length > 0 && (
                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <h3 className="font-heading text-base font-bold text-navy-900 uppercase tracking-wider">
                    Technical Specs & Key Features
                  </h3>
                  <div className="space-y-1.5">
                    {product.specs.map((spec: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="bg-navy-950 p-5 rounded-xl border border-navy-800 text-white space-y-3 mt-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <div className="text-xs text-gold-400 font-bold uppercase tracking-wider">Direct Order / Inquiries</div>
                  <div className="text-sm font-bold text-white">Noida Stockyard Dispatches</div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <a
                    href={`https://wa.me/919999307984?text=Hello%20RK%20Steel%2C%20I%20am%20interested%20in%20inquiring%20about%20the%20product%3A%20${encodeURIComponent(product.name)}.%20Please%20provide%20the%20latest%20rates%20and%20specifications.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#128C7E] text-white font-heading font-bold text-xs uppercase px-5 py-2.5 rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Order on WhatsApp
                  </a>
                  <Link
                    href={`/contact?product=${encodeURIComponent(product.name)}`}
                    className="bg-red-600 hover:bg-red-700 text-white font-heading font-bold text-xs uppercase px-5 py-2.5 rounded-lg shadow-md transition-all flex items-center justify-center"
                  >
                    Request Rate Quote
                  </Link>
                </div>
              </div>

              <div className="border-t border-navy-800 pt-2 flex flex-wrap gap-4 text-[11px] text-gray-300">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-gold-500" />
                  Call Sales: 9999307984 / 9953364645
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-red-500" />
                  sn_rksteel@yahoo.co.in
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
