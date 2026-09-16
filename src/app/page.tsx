import Link from "next/link";
import { HeroSlider } from "@/components/HeroSlider";
import { WhyUsStrip } from "@/components/WhyUsStrip";
import { BrandStrip } from "@/components/BrandStrip";
import { ArrowRight, Calculator, Phone, ChevronRight, TrendingUp, Download, MessageSquare } from "lucide-react";
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
    {
      title: "TMT Rebars (550SD & 500D)",
      brand: "Tata Tiscon & SAIL SEQR",
      desc: "Earthquake resistant thermo-mechanically treated steel bars with high bendability & elongation.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
      link: "/products?category=TMT+Bars",
    },
    {
      title: "Structural Pipes & Tubes",
      brand: "Tata Structura & APL Apollo",
      desc: "Square (SHS), Rectangular (RHS) and Circular MS pipes for heavy industrial infrastructure.",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
      link: "/products?category=Pipes+%26+Hollow+Sections",
    },
    {
      title: "Roofing & Colour Sheets",
      brand: "Tata Durashine Galvalume",
      desc: "Corrosion-resistant colour coated roofing sheets and wall cladding solutions.",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
      link: "/products?category=Colour+Coated+%26+Roofing+Sheets",
    },
    {
      title: "HR / CR / GI Sheets & Plates",
      brand: "Tata Astrum & Steelium",
      desc: "High precision hot rolled and cold rolled sheets and plates for laser cutting and fabrication.",
      image: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=600&q=80",
      link: "/products?category=MS%2FHR%2FCR%2FGI+Sheets+%26+Plates",
    },
  ];

  return (
    <div className="space-y-0 bg-white">
      {/* 1. HERO SLIDER */}
      <HeroSlider />

      {/* 2. AUTHORISED DEALER BRAND STRIP */}
      <BrandStrip />

      {/* 3. WHY PARTNER VALUE PROPOSITIONS */}
      <WhyUsStrip />

      {/* 4. PRODUCTS RANGE SECTION */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <span className="text-xs sm:text-sm font-bold text-red-600 uppercase tracking-widest bg-red-50 px-3.5 py-1.5 rounded-md border border-red-100 font-sans">
                Our Products
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] text-slate-900 font-extrabold tracking-tight mt-2.5 font-sans">
                Complete Range of Steel Products
              </h2>
            </div>
            <Link
              href="/products"
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm uppercase tracking-wider px-7 py-3.5 rounded-xl flex items-center gap-2 shadow-sm transition-all"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.link}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 bg-slate-900 overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                    />
                    <div className="absolute top-3.5 left-3.5 bg-[#0B192C]/90 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-md backdrop-blur-sm">
                      {cat.brand}
                    </div>
                  </div>
                  <div className="p-6 space-y-2.5">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-red-600 transition-colors font-sans">
                      {cat.title}
                    </h3>
                    <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center text-sm font-bold text-red-600 group-hover:translate-x-1 transition-transform">
                  Explore Products
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DAILY PRICE HIGHLIGHT & TREND PROMO */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0B192C] text-white rounded-2xl p-8 sm:p-12 shadow-xl border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-red-400 uppercase tracking-widest bg-slate-900/80 px-3.5 py-1.5 rounded-md border border-slate-800">
                <TrendingUp className="w-4 h-4 text-red-500" />
                Live Daily Market Rates &amp; Stock Updates
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-white tracking-tight font-sans">
                Track Today's Steel Prices in Noida &amp; NCR
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Stay updated with real-time rate changes for Tata Tiscon, SAIL SEQR, Tata Structura, and APL Apollo pipes. Direct wholesale quotes for contractors and infrastructure developers.
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-4 w-full lg:w-auto">
              <Link
                href="/price-list"
                className="w-full sm:w-auto text-center bg-red-600 hover:bg-red-700 text-white font-bold text-base uppercase tracking-wider px-8 py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all"
              >
                View Daily Price List
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/catalogues"
                className="w-full sm:w-auto text-center bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-base px-7 py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-5 h-5 text-red-400" />
                Download Catalogues
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. STEEL CALCULATOR PROMO */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-5 max-w-xl">
            <span className="text-xs sm:text-sm font-bold text-red-600 uppercase tracking-widest bg-red-50 px-3.5 py-1.5 rounded-md border border-red-100 font-sans">
              Engineering Utility Tools
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] text-slate-900 font-extrabold tracking-tight font-sans">
              Smart Calculators For <span className="text-red-600">Smart Estimation</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Planning your structural steel procurement? Use our suite of live weight calculators for TMT rebars, square &amp; rectangular hollow sections, circular pipes, MS plates, and sheets based on IS standards.
            </p>
            <div className="pt-2">
              <Link
                href="/calculators"
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-base px-8 py-4 rounded-xl uppercase tracking-wider inline-flex items-center gap-2.5 shadow-lg transition-all"
              >
                <Calculator className="w-5 h-5" />
                Open Weight Calculators
              </Link>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl shadow-sm w-full max-w-md space-y-5 text-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="font-bold text-slate-900 text-base">Sample Calculation (Tata Tiscon 12mm)</span>
              <span className="text-xs bg-red-600 text-white font-bold px-2.5 py-1 rounded">IS 1786</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-slate-600">
                <span>Standard Diameter:</span>
                <span className="font-bold text-slate-900">12 mm</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Standard Length:</span>
                <span className="font-bold text-slate-900">12.0 meters</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Nominal Weight per Meter:</span>
                <span className="font-bold text-red-600">0.888 kg/m</span>
              </div>
              <div className="pt-3 border-t border-slate-200 flex justify-between text-base font-bold">
                <span className="text-slate-900">Piece Weight:</span>
                <span className="text-red-600 text-lg font-black">10.66 kg</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LATEST INSIGHTS & TECHNICAL GUIDES */}
      {posts.length > 0 && (
        <section className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-10">
              <div>
                <span className="text-xs sm:text-sm font-bold text-red-600 uppercase tracking-widest bg-red-50 px-3.5 py-1.5 rounded-md border border-red-100 font-sans">
                  Insights &amp; Guides
                </span>
                <h2 className="text-3xl sm:text-4xl text-slate-900 font-extrabold tracking-tight mt-2.5 font-sans">
                  Latest Steel News &amp; Technical Guides
                </h2>
              </div>
              <Link href="/blog" className="text-base font-bold text-red-600 hover:text-slate-900">
                View All Articles →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((post: any) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col group"
                >
                  {post.coverImage?.url && (
                    <div
                      className="h-52 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                      style={{ backgroundImage: `url('${post.coverImage.url}')` }}
                    />
                  )}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-3.5">
                    <div className="space-y-2.5">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors font-sans leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-sm sm:text-[15px] text-slate-600 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="text-sm font-bold text-red-600 flex items-center gap-1.5 pt-2">
                      Read Full Article
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. REQUIREMENT CTA BANNER (MATCHING REFERENCE MOCKUP BOTTOM BAR) */}
      <section className="bg-[#0B192C] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-red-600/30">
              <Phone className="w-7 h-7 fill-current" />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
                Have a requirement?
              </h3>
              <p className="text-slate-300 text-sm sm:text-base mt-1">
                Call us for best rates &amp; quick support.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex flex-col text-right sm:text-left">
              <a href="tel:9999307984" className="text-lg sm:text-xl font-black text-white hover:text-red-400 transition-colors">
                +91 99993 07984
              </a>
              <div className="text-xs sm:text-sm text-slate-300 font-semibold flex gap-2 mt-0.5">
                <a href="tel:9953364645" className="hover:text-white">9953364645</a>
                <span>|</span>
                <a href="tel:9811364645" className="hover:text-white">9811364645</a>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <a
                href="https://wa.me/919999307984?text=Hello%20RK%20Steel%20Co%2C%20I%20have%20a%20steel%20requirement."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl border border-slate-700 flex items-center gap-2.5 transition-all shadow-md"
              >
                <MessageSquare className="w-5 h-5 text-green-400" />
                WhatsApp Us
              </a>

              <Link
                href="/contact"
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm sm:text-base uppercase tracking-wider px-7 py-3.5 rounded-xl flex items-center gap-2.5 shadow-xl shadow-red-600/30 transition-all hover:bg-red-500"
              >
                Get Today's Rate
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
