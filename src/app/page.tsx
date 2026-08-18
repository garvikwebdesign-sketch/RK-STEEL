import Link from "next/link";
import { HeroSlider } from "@/components/HeroSlider";
import { WhyUsStrip } from "@/components/WhyUsStrip";
import { BrandStrip } from "@/components/BrandStrip";
import { ShieldCheck, ArrowRight, Calculator, Award, Phone, CheckCircle, ChevronRight, Layers, TrendingUp, Download, FileText, PackageCheck } from "lucide-react";
import { connectToDatabase } from "@/lib/db";
import { Product } from "@/models/Product";
import { BlogPost } from "@/models/BlogPost";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

async function getFeaturedData() {
  try {
    await connectToDatabase();
    const products = await Product.find({ authorisedDealer: true }).limit(6).lean();
    const posts = await BlogPost.find({ published: true }).limit(3).lean();
    return { products, posts };
  } catch {
    return { products: [], posts: [] };
  }
}

export default async function HomePage() {
  await headers();
  const { products, posts } = await getFeaturedData();

  const categories = [
    { title: "TMT Rebars", brand: "Tata Tiscon & SAIL SEQR", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80", link: "/products?category=TMT+Bars" },
    { title: "Pipes & Hollow Sections", brand: "Tata Structura & AP Apollo", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80", link: "/products?category=Pipes+%26+Hollow+Sections" },
    { title: "Roofing & Colour Sheets", brand: "Tata Durashine Galvalume", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80", link: "/products?category=Colour+Coated+%26+Roofing+Sheets" },
    { title: "HR / CR / GI Sheets", brand: "Tata Astrum, Kosh & Steelium", image: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=600&q=80", link: "/products?category=MS%2FHR%2FCR%2FGI+Sheets+%26+Plates" },
  ];

  return (
    <div className="space-y-0 bg-gray-50">
      {/* 1. HERO SLIDER WITH ROTATING BACKGROUND IMAGES */}
      <HeroSlider />

      {/* 2. REUSABLE WHY US STRIP */}
      <WhyUsStrip />

      {/* 3. BRAND PARTNERSHIPS STRIP */}
      <BrandStrip />

      {/* 4. DAILY PRICE HIGHLIGHT & TREND PROMO BANNER (CLIENT REQUIREMENT) */}
      <section className="py-12 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy-950 text-white rounded-2xl p-8 shadow-xl border-2 border-red-600 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 uppercase tracking-widest bg-navy-900 px-3 py-1 rounded border border-navy-800">
                <TrendingUp className="w-4 h-4 text-red-500" />
                DAILY MARKET RATES & 30-DAY PRICE HISTORY
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Track Today's Steel Prices in Noida & Delhi NCR
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                Stay updated with daily rate movements for Tata Tiscon, SAIL SEQR, Tata Structura, and APL Apollo pipes. View historical price graphs to time your project procurement efficiently.
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-4 w-full lg:w-auto">
              <Link
                href="/price-list"
                className="w-full sm:w-auto text-center bg-red-600 hover:bg-red-700 text-white font-bold text-sm uppercase px-6 py-3.5 rounded-lg tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                View Daily Price List
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/catalogues"
                className="w-full sm:w-auto text-center bg-navy-900 hover:bg-navy-800 text-gray-200 border border-navy-700 font-bold text-sm px-6 py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-4 h-4 text-red-400" />
                PDF Catalogues
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED CATEGORIES GRID */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1 rounded border border-red-200">
                CORE PRODUCT RANGE
              </span>
              <h2 className="font-heading text-3xl md:text-4xl text-navy-950 font-bold tracking-tight mt-2">
                Primary Steel Categories
              </h2>
            </div>
            <Link
              href="/products"
              className="mt-4 md:mt-0 text-sm font-bold text-red-600 hover:text-navy-950 flex items-center gap-1 transition-colors"
            >
              View Full Product Catalog ({products.length > 0 ? products.length : "13+"} Products) →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.link}
                className="group relative rounded-xl overflow-hidden shadow-md border border-gray-200 bg-navy-950 flex flex-col h-80 transition-transform duration-300 hover:-translate-y-1.5"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 opacity-70"
                  style={{ backgroundImage: `url('${cat.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />

                <div className="relative mt-auto p-6 z-10 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 bg-navy-900/80 px-2 py-0.5 rounded border border-navy-700">
                    {cat.brand}
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-white group-hover:text-red-400 transition-colors">
                    {cat.title}
                  </h3>
                  <div className="text-xs text-gray-300 flex items-center gap-1 font-medium group-hover:translate-x-1 transition-transform">
                    Explore Inventory
                    <ChevronRight className="w-3.5 h-3.5 text-red-500" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALCULATOR PROMO SECTION */}
      <section className="bg-[#0B1E36] text-white py-16 relative overflow-hidden border-y border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="space-y-4 max-w-xl">
            <span className="text-xs font-bold text-red-400 uppercase tracking-widest bg-navy-900 px-3 py-1 rounded border border-navy-700">
              ENGINEERING UTILITY
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-white font-bold tracking-tight">
              Instant Steel Weight Calculators
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Planning your structural steel procurement? Use our suite of 9 live weight calculators for steel sheets, seamless circular pipes, square & rectangular hollow sections, TMT rebars, angles, and flat bars based on IS standards.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/calculators"
                className="bg-red-600 hover:bg-red-700 text-white font-heading font-bold text-sm px-6 py-3 rounded-lg uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg"
              >
                <Calculator className="w-4 h-4" />
                Open Weight Calculators
              </Link>
            </div>
          </div>

          <div className="bg-navy-900 border border-navy-700 p-6 rounded-xl shadow-xl w-full max-w-md space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-navy-800 pb-3">
              <span className="font-bold text-red-400">Sample Calculation (Tata Tiscon 12mm)</span>
              <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded">IS 1786</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Standard Diameter:</span>
                <span className="font-bold text-white">12 mm</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Standard Stock Length:</span>
                <span className="font-bold text-white">12.0 meters</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Nominal Weight per Meter:</span>
                <span className="font-bold text-red-400">0.888 kg/m</span>
              </div>
              <div className="pt-2 border-t border-navy-800 flex justify-between text-sm font-bold">
                <span>Total Piece Weight:</span>
                <span className="text-red-400">10.66 kg</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PULL QUOTE BANNER */}
      <section className="bg-white py-16 text-center border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <Award className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <blockquote className="font-heading text-2xl sm:text-3xl md:text-4xl text-navy-950 font-bold italic leading-tight">
            "From strong foundations to iconic structures, our steel builds the future."
          </blockquote>
          <div className="mt-4 text-xs font-bold uppercase tracking-widest text-red-600">
            RK Steel Company — Noida, Est. 1993
          </div>
        </div>
      </section>

      {/* 8. LATEST NEWS & ARTICLES */}
      {posts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-10">
              <div>
                <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1 rounded border border-red-200">
                  INSIGHTS & GUIDES
                </span>
                <h2 className="font-heading text-3xl text-navy-950 font-bold tracking-tight mt-2">
                  Latest Steel News & Technical Guides
                </h2>
              </div>
              <Link href="/blog" className="text-sm font-bold text-red-600 hover:text-navy-950">
                View All Articles →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((post: any) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md hover:border-red-500/50 transition-all flex flex-col group"
                >
                  {post.coverImage?.url && (
                    <div
                      className="h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                      style={{ backgroundImage: `url('${post.coverImage.url}')` }}
                    />
                  )}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {post.tags?.map((t: string, tidx: number) => (
                          <span key={tidx} className="text-[10px] bg-red-50 text-red-600 font-semibold px-2 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-heading text-xl font-bold text-navy-950 group-hover:text-red-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="text-xs font-bold text-red-600 flex items-center gap-1 pt-2">
                      Read Full Article
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. CONTACT CTA BANNER */}
      <section className="bg-navy-950 text-white py-12 border-t-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading text-3xl font-bold text-white">Need Genuine Steel Rates for Your Project?</h3>
            <p className="text-gray-400 text-sm mt-1">
              Call our sales team at Noida Head Office for immediate availability and wholesale quotes.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="tel:9999307984"
              className="bg-red-600 hover:bg-red-700 text-white font-heading font-bold text-base px-6 py-3 rounded-lg flex items-center gap-2 shadow-md"
            >
              <Phone className="w-5 h-5" />
              Call 9999307984
            </a>
            <Link
              href="/contact"
              className="bg-navy-800 hover:bg-navy-700 text-red-400 border border-red-500/50 font-heading font-bold text-base px-6 py-3 rounded-lg uppercase shadow-md"
            >
              Request Price Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
