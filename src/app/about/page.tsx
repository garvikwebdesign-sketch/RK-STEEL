import { WhyUsStrip } from "@/components/WhyUsStrip";
import { BrandStrip } from "@/components/BrandStrip";
import { ShieldCheck, Target, Eye, Award, CheckCircle, MapPin, Phone, Building2, Users, PackageCheck, Globe } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About Us | RK Steel Company — 30+ Years of Steel Excellence in Noida",
  description: "Established in 1993, RK Steel Company is an authorized dealer of Tata Steel, SAIL, JSW, and AP Apollo lines with over three decades of trusted service.",
};

export default function AboutPage() {
  return (
    <div className="space-y-0 bg-gray-50">
      {/* Banner Header */}
      <section className="bg-navy-950 text-white py-14 border-b-4 border-red-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-xs font-bold text-red-400 uppercase tracking-widest bg-navy-900 px-3 py-1 rounded border border-navy-700">
            HERITAGE & TRUST SINCE 1993
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-white mt-3">
            About RK Steel Company
          </h1>
          <p className="text-gray-300 text-sm max-w-2xl mt-2 font-light">
            Over three decades of delivering high quality steel solutions, unmatched service, and long-lasting relationships across Delhi-NCR and India.
          </p>
        </div>
      </section>

      {/* Main Story & Clean Container Card Layout (Matching Screenshot 2) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Story Text */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider bg-red-50 px-3 py-1 rounded border border-red-200">
                <ShieldCheck className="w-4 h-4 text-red-600" />
                ESTABLISHED IN 1993 — NOIDA, UTTAR PRADESH
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl text-navy-950 font-bold tracking-tight">
                Building Strength. <span className="text-red-600">Delivering Trust.</span>
              </h2>

              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Established in <strong>1993</strong>, RK Steel Company has grown to become a trusted name in the steel industry. With 30+ years of experience, we are committed to providing premium quality steel products, competitive prices, and timely delivery to our valuable customers across India.
              </p>

              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Our strong relationships with leading manufacturers and a customer-first approach have helped us build long-term partnerships based on trust, transparency, and reliability.
              </p>

              {/* Stat Pills Grid (Exact screenshot match) */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-gray-100">
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-200">
                  <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center font-bold text-base">
                    1993
                  </div>
                  <div>
                    <div className="font-heading text-lg font-bold text-navy-950">1993</div>
                    <div className="text-[11px] text-gray-500 font-medium">Year of Establishment</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-200">
                  <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center font-bold text-base">
                    30+
                  </div>
                  <div>
                    <div className="font-heading text-lg font-bold text-navy-950">30+</div>
                    <div className="text-[11px] text-gray-500 font-medium">Years Experience</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-200">
                  <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center font-bold text-base">
                    5000+
                  </div>
                  <div>
                    <div className="font-heading text-lg font-bold text-navy-950">5,000+</div>
                    <div className="text-[11px] text-gray-500 font-medium">Happy Customers</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card with Yard Image & Overlay Badge (Screenshot 2 Match) */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80"
                  alt="RK Steel Company Stockyard"
                  className="w-full h-[380px] object-cover"
                />
                <div className="absolute inset-0 bg-navy-950/20" />

                {/* Floating Card Overlay */}
                <div className="absolute top-6 right-6 bg-navy-950/90 text-white p-5 rounded-xl border border-navy-700 shadow-xl space-y-3 max-w-xs backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-xs font-bold text-red-400">
                    <ShieldCheck className="w-4 h-4 text-red-500" />
                    30+ Years of Experience
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <Users className="w-4 h-4 text-gray-300" />
                    Thousands of Happy Clients
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <PackageCheck className="w-4 h-4 text-gray-300" />
                    Huge Ready Stock Inventory
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <Globe className="w-4 h-4 text-gray-300" />
                    Pan India Supply Network
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div>
              <div className="font-heading text-3xl font-black text-navy-950">1993</div>
              <div className="text-xs text-gray-500 font-medium">Year of Establishment</div>
            </div>
            <div>
              <div className="font-heading text-3xl font-black text-red-600">30+</div>
              <div className="text-xs text-gray-500 font-medium">Years of Experience</div>
            </div>
            <div>
              <div className="font-heading text-3xl font-black text-navy-950">5000+</div>
              <div className="text-xs text-gray-500 font-medium">Happy Customers</div>
            </div>
            <div>
              <div className="font-heading text-3xl font-black text-red-600">50,000+</div>
              <div className="text-xs text-gray-500 font-medium">MT Stock Ready</div>
            </div>
            <div>
              <div className="font-heading text-3xl font-black text-navy-950">Pan India</div>
              <div className="text-xs text-gray-500 font-medium">Supply Network</div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR VALUES CARDS (Screenshot 2 Match) */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1 rounded border border-red-200">
              OUR VALUES
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-navy-950 font-bold tracking-tight mt-2">
              Principles That Drive Us Forward
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center space-y-3 hover:border-red-500 transition-all">
              <div className="w-12 h-12 bg-navy-950 text-white rounded-full flex items-center justify-center mx-auto font-bold text-xl">
                🛡️
              </div>
              <h3 className="font-heading text-lg font-bold text-navy-950">Integrity</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                We believe in honest dealings and transparent business.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center space-y-3 hover:border-red-500 transition-all">
              <div className="w-12 h-12 bg-navy-950 text-white rounded-full flex items-center justify-center mx-auto font-bold text-xl">
                ⭐
              </div>
              <h3 className="font-heading text-lg font-bold text-navy-950">Quality</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                We provide only premium quality steel from trusted brands.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center space-y-3 hover:border-red-500 transition-all">
              <div className="w-12 h-12 bg-navy-950 text-white rounded-full flex items-center justify-center mx-auto font-bold text-xl">
                🤝
              </div>
              <h3 className="font-heading text-lg font-bold text-navy-950">Reliability</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Commitment to timely delivery and consistent service.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center space-y-3 hover:border-red-500 transition-all">
              <div className="w-12 h-12 bg-navy-950 text-white rounded-full flex items-center justify-center mx-auto font-bold text-xl">
                👤
              </div>
              <h3 className="font-heading text-lg font-bold text-navy-950">Customer First</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Our customers are at the heart of everything we do.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center space-y-3 hover:border-red-500 transition-all">
              <div className="w-12 h-12 bg-navy-950 text-white rounded-full flex items-center justify-center mx-auto font-bold text-xl">
                📈
              </div>
              <h3 className="font-heading text-lg font-bold text-navy-950">Growth</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Continuous growth through innovation and trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY RK STEEL STRIP */}
      <WhyUsStrip />

      {/* BRAND PARTNERSHIPS STRIP */}
      <BrandStrip />
    </div>
  );
}
